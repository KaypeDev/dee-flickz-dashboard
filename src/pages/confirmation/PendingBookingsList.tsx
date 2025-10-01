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
  const [cursor, setCursor] = useState<any>(null);
  const [previousCursors, setPreviousCursors] = useState<any[]>([]);
  const bookingsPage = useQuery(api.bookings.getPendingBookings, {
    sortBy,
    cursor,
  });
  const [bookingsWithClients, setBookingsWithClients] = useState<BookingWithClient[]>([]);



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
    setCursor(null);
    setPreviousCursors([]);
  };

 
  const handleNext = () => {
    if (bookingsPage && bookingsPage.continueCursor) {
      setPreviousCursors((prev) => [...prev, cursor]); 
      setCursor(bookingsPage.continueCursor);
    }
  };

  const handlePrevious = () => {
    if (previousCursors.length > 0) {
      const prev = [...previousCursors];
      const lastCursor = prev.pop();
      setPreviousCursors(prev);
      setCursor(lastCursor ?? null);
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
        width: 340,
      }}

    >
      <Typography sx={{ paddingTop: { xs: 1, md: 2 }, fontWeight: 700, textAlign: 'start', fontSize: '32px' }}>
        Pending Bookings
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

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
          />
        ))}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 1, pb: 1, position: "sticky", }}>
        <IconButton
          onClick={handlePrevious}
          disabled={previousCursors.length === 0}
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
