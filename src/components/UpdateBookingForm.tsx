import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Stack,
} from "@mui/material";
import { useMutation } from 'convex/react'
import { api } from "../../convex/_generated/api";
import { useState } from 'react';
import type { Id } from "../../convex/_generated/dataModel";

type UpdateBookingFormProps = {
    open: boolean;
    onClose: () => void;
    bookingId: string;
    scheduledAt: number;
    eventLocation: string;
    message: string;
};

export default function UpdateBookingForm({
    open,
    onClose,
    bookingId,
    scheduledAt,
    eventLocation,
    message,
}: UpdateBookingFormProps) {
    const updateBooking = useMutation(api.bookings.updateBookingDetails)

    const initialDate = new Date(scheduledAt);
    const [date, setDate] = useState(initialDate.toISOString().slice(0, 10));
    const [time, setTime] = useState(initialDate.toTimeString().slice(0, 5));
    const [location, setLocation] = useState(eventLocation);
    const [note, setNote] = useState(message);

    const handleSubmit = async () => {
        const [year, month, day] = date.split("-").map(Number);
        const [hours, minutes] = time.split(":").map(Number);

       
        const dateObj = new Date(year, month - 1, day, hours, minutes, 0, 0);

        const combinedTimestamp = dateObj.getTime();

        await updateBooking({
            bookingId: bookingId as Id<'bookings'>,
            scheduledAt: combinedTimestamp,
            eventLocation: location,
            message: note,
        });

        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ textAlign: "center" }}>Update Booking</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ mt: 1, minWidth: 300 }}>
                    <TextField
                        label="Date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        sx={{
                            backgroundColor: "#262731ff"
                        }}
                    />
                    <TextField
                        label="Time"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        sx={{
                            backgroundColor: "#262731ff"
                        }}
                    />
                    <TextField
                        label="Event Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        fullWidth
                        sx={{
                            backgroundColor: "#262731ff"
                        }}
                    />
                    <TextField
                        label="Message"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        multiline
                        rows={3}
                        fullWidth
                        sx={{
                            backgroundColor: "#262731ff"
                        }}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    color='inherit'
                    sx={{
                        fontWeight: 500,
                        height: '28px',
                        borderRadius: '7px',
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    sx={{
                        fontWeight: 500,
                        height: '28px',
                        borderRadius: '7px',
                        backgroundColor: '#1F2E59',
                        color: "#fff",
                        '&:hover': {
                            backgroundColor: '#25386cff',
                        },
                    }}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}