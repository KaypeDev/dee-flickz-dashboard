import { useState } from "react";
import {
    Container,
    Typography,
    Box
} from "@mui/material";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';
import { SelectedDate } from "./SelectedDate";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";

type Booking = {
    _id: string;
    clientId: string;
    scheduledAt: number;
    eventLocation: string;
    message: string;
    status: string;
};


function stripTime(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}


function isSameDay(dateA: Date, dateB: Date) {
    const a = stripTime(dateA).getTime();
    const b = stripTime(dateB).getTime();
    return a === b;
}

export default function Schedule() {
    const [displayedMonth, setDisplayedMonth] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);

    const startOfMonth = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth(), 1).getTime();
    const endOfMonth = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() + 1, 1).getTime();

    const confirmedBookings = useQuery(api.bookings.getConfirmedBookingsForMonth, {
        startOfMonth,
        endOfMonth,
    });

    const bookedDates = (confirmedBookings ?? []).map((booking) => {
        const date = new Date(booking.scheduledAt);
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    });

    const bookingsForSelectedDay = (confirmedBookings ?? []).filter((booking) => {
        if (!selectedDay) return false;
        return isSameDay(new Date(booking.scheduledAt), selectedDay);
    });

    return (
        <Container
            maxWidth={false}
            sx={{
                backgroundColor: "#1C1D24",
                borderRadius: '10px',
                marginTop: { xs: 1, md: 0 },
                width: {xs: 330, md: 340},
                padding: 2,
            }}
        >
            <Typography
                sx={{
                    fontWeight: 700,
                    textAlign: 'start',
                    fontSize: '32px',
                    color: "white"
                }}
            >
                Schedule
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <DayPicker
                    mode="single"
                    month={displayedMonth}
                    selected={selectedDay}
                    onSelect={setSelectedDay}
                    onMonthChange={setDisplayedMonth}
                    modifiers={{
                        booked: bookedDates,
                    }}
                    modifiersClassNames={{
                        booked: 'booked-day',
                    }}
                />

                {selectedDay && (
                    <SelectedDate bookings={bookingsForSelectedDay} />
                )}
            </Box>
        </Container>
    );
}
