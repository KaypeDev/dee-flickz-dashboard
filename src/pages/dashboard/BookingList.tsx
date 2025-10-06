import { useEffect, useState } from "react";
import { useConvex, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { BookingCard } from "../../components/BookingCard";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import type { Id } from "../../../convex/_generated/dataModel";

type Props = {
  title: string;
  direction: "after" | "before"; 
};

type Booking = {
  _id: string;
  clientId: string;
  scheduledAt: number;
  eventLocation: string;
  message: string;
  status: string;
};

type BookingWithClient = Booking & {
  clientName: string;
  clientPhone: string;
  clientEmail: string;
};

export default function BookingList({ title, direction }: Props) {
  const convex = useConvex();
  const [timestampStack, setTimestampStack] = useState<number[]>([]);
  const [currentTimestamp, setCurrentTimestamp] = useState<number | null>(
    Date.now()
  );
  const [bookingsWithClients, setBookingsWithClients] = useState<BookingWithClient[]>([]);

  const bookingsPage = useQuery(api.bookings.getBookingByTimeStamp, {
    direction,
    timestamp: currentTimestamp ?? undefined,
  });

  useEffect(() => {
    return () => {
      // Clean up when unmounting
      setTimestampStack([]);
      setCurrentTimestamp(Date.now());
    };
  }, []);

  useEffect(() => {
    if (!bookingsPage) {
      setBookingsWithClients([]);
      return;
    }

    async function fetchClients() {
      const bookings = bookingsPage ?? [];
      const enriched = await Promise.all(
        bookings.map(async (booking: Booking) => {
          const client = await convex.query(api.clients.getClientById, {
            id: booking.clientId as Id<"clients">,
          });
          return {
            ...booking,
            clientName: client?.name ?? "Unknown",
            clientPhone: client?.phone ?? "Unknown",
            clientEmail: client?.email ?? "Unknown",
          };
        })
      );
      setBookingsWithClients(enriched);
    }

    fetchClients();
  }, [bookingsPage, convex]);

  const handleNext = () => {
    if (bookingsWithClients.length > 0) {
      setTimestampStack((prev) => [...prev, currentTimestamp ?? Date.now()]);
      const lastBooking = bookingsWithClients[bookingsWithClients.length - 1];
      setCurrentTimestamp(lastBooking.scheduledAt);
    }
  };

  const handlePrevious = () => {
    const prev = [...timestampStack];
    const lastTimestamp = prev.pop();
    setTimestampStack(prev);
    setCurrentTimestamp(lastTimestamp ?? Date.now());
  };

  if (!bookingsPage) return <Typography>Loading...</Typography>;

  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundColor: "#1C1D24",
        borderRadius: "10px",
        marginTop: { xs: 1, md: 0 },
        width: 330,
      }}
    >
      <Typography
        sx={{
          paddingTop: { xs: 1, md: 2 },
          fontWeight: 700,
          textAlign: "start",
          fontSize: "32px",
          pb:1,
        }}
      >
        {title}
      </Typography>

      {bookingsWithClients.length === 0 && (
        <Typography>No {title.toLowerCase()}.</Typography>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {bookingsWithClients.map((booking) => (
          <BookingCard
            key={booking._id}
            bookingId={booking._id}
            scheduledAt={booking.scheduledAt}
            clientName={booking.clientName}
            clientPhone={booking.clientPhone}
            clientEmail={booking.clientEmail}
            eventLocation={booking.eventLocation}
            message={booking.message}
            status="confirmed"
          />
        ))}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 2 }}>
        <IconButton
          onClick={handlePrevious}
          disabled={timestampStack.length === 0}
          sx={{ color: "white", width: 40, height: 40 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <IconButton
          onClick={handleNext}
          disabled={bookingsWithClients.length < 5}
          sx={{ color: "white", width: 40, height: 40 }}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Container>
  );
}
