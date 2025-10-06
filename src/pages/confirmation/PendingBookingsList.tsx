import { useEffect, useState } from "react";
import { useQuery, useConvex } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { BookingCard } from "../../components/BookingCard";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { FilterMenu } from "../../components/FilterMenu";
import type { Id } from "../../../convex/_generated/dataModel";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from "@mui/material/IconButton";

type Booking = {
  _id: string;
  clientId: string;
  scheduledAt: number;
  eventLocation: string;
  message: string;
  status: string;
};

type BookingWithClient = Booking & { clientName: string; clientPhone: string; clientEmail: string; };
type SortBy = "soonestToLatest" | "latestToSoonest" | "recentToOld" | "oldToRecent";

const sortOption: { label: string; value: SortBy }[] = [
  { label: "Soonest To Latest", value: 'soonestToLatest' },
  { label: "Latest To Soonest", value: 'latestToSoonest' },
  { label: "Recent To Old", value: 'recentToOld' },
  { label: "Old To Recent", value: 'oldToRecent' },
]

export default function PendingBookingList() {
  const convex = useConvex();
  const [sortBy, setSortBy] = useState<"soonestToLatest" | "latestToSoonest" | "recentToOld" | "oldToRecent">("soonestToLatest");
  const [pendingCursor, setPendingCursor] = useState<any>(null);
  const [pendingPreviousCursors, setPendingPreviousCursors] = useState<any[]>([]);
  const bookingsPage = useQuery(api.bookings.getPendingBookings, {
    sortBy,
    cursor: pendingCursor,
  });
  const [bookingsWithClients, setBookingsWithClients] = useState<BookingWithClient[]>([]);


  useEffect(() => {
    return () => {
      setPendingCursor(null);
      setPendingPreviousCursors([]);
    };
  }, []);

  useEffect(() => {
    if (!bookingsPage || !bookingsPage.page) {
      setBookingsWithClients([]);
      return;
    }

    const page = bookingsPage.page;

    async function fetchClients() {
      const enriched = await Promise.all(
        page.map(async (booking: Booking) => {
          const client = await convex.query(api.clients.getClientById, { id: booking.clientId as Id<"clients"> });
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


  const handleSortChange = (newSort: SortBy) => {
    setSortBy(newSort);
    setPendingCursor(null);
    setPendingPreviousCursors([]);
  };


  const handleNext = () => {
    if (bookingsPage && bookingsPage.continueCursor) {
      setPendingPreviousCursors((prev) => [...prev, pendingCursor]);
      setPendingCursor(bookingsPage.continueCursor);
    }
  };

  const handlePrevious = () => {
    if (pendingPreviousCursors.length > 0) {
      const prev = [...pendingPreviousCursors];
      const lastCursor = prev.pop();
      setPendingPreviousCursors(prev);
      setPendingCursor(lastCursor ?? null);
    }
  };

  if (!bookingsPage) return <Typography variant="h6">Loading...</Typography>;

  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundColor: "#1C1D24",
        borderRadius: '10px',
        marginTop: { xs: 1, md: 0 },
        width: 330,
      }}

    >
      <Typography sx={{ paddingTop: { xs: 1, md: 2 }, fontWeight: 700, textAlign: 'start', fontSize: '32px' }}>
        Pending
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 1,
        }}
      >

        <FilterMenu
          selected={sortBy}
          options={sortOption}
          onChange={handleSortChange}
        />
      </Box>

      {bookingsWithClients.length === 0 && <Typography>No pending bookings.</Typography>}

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
            status="pending"
          />
        ))}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 1, pb: 1, position: "sticky", }}>
        <IconButton
          onClick={handlePrevious}
          disabled={pendingPreviousCursors.length === 0}
          sx={{
            color: "white",
            width: 40,
            height: 40,
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        <IconButton
          onClick={handleNext}
          disabled={!bookingsPage?.continueCursor}
          sx={{
            color: "white",
            width: 40,
            height: 40,
          }}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>

    </Container >
  );
}
