import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useConvex } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { BookingCard } from "../../components/BookingCard";
import type { Id } from "../../../convex/_generated/dataModel";

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

type Props = {
  bookings: Booking[];
};

export function SelectedDate({ bookings }: Props) {
  const convex = useConvex();
  const [enrichedBookings, setEnrichedBookings] = useState<BookingWithClient[]>([]);

  useEffect(() => {
    async function fetchClients() {
      const enriched = await Promise.all(
        bookings.map(async (booking) => {
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
      setEnrichedBookings(enriched);
    }

    if (bookings.length > 0) {
      fetchClients();
    } else {
      setEnrichedBookings([]);
    }
  }, [bookings, convex]);

  if (enrichedBookings.length === 0) {
    return <Typography sx={{ color: 'white' }}>No bookings for this day.</Typography>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {enrichedBookings.map((booking) => (
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
  );
}