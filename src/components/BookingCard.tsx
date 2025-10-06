import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { FormattedDate } from "./FormatterComponent";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import UpdateBookingForm from "./UpdateBookingForm";
import ConfirmationModal from "./ConfirmationModal";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import ViewNote from "./ViewNote";

type BookingCardProps = {
    scheduledAt: number;
    bookingId: string;
    clientName: string;
    eventLocation: string;
    message: string;
    clientPhone: string;
    clientEmail: string;
    status: string;
};


export function BookingCard({
    scheduledAt,
    bookingId,
    clientName,
    eventLocation,
    message,
    clientPhone,
    clientEmail,
    status,
}: BookingCardProps) {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [showNoteModal, setShowNoteModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);

    const updateStatus = useMutation(api.bookings.updateBookingStatus);

    const handleConfirmBooking = async () => {
        await updateStatus({ bookingId: bookingId as Id<'bookings'>, status: "confirmed" })
        setShowConfirmModal(false);
    }

    const handleRemoveBooking = async () => {
        await updateStatus({ bookingId: bookingId as Id<'bookings'>, status: "removed" })
        setShowRemoveModal(false)
    }
     const handleCancelBooking = async () => {
        await updateStatus({ bookingId: bookingId as Id<'bookings'>, status: "cancelled" })
        setShowRemoveModal(false)
    }


    return (
        <>
            <Card
                sx={{
                    maxWidth: 270,
                    borderRadius: "10px",
                    backgroundColor: "#13141B",
                }}
            >
                <CardContent sx={{
                    paddingTop: 1,
                    "&:last-child": {
                        paddingBottom: 1.5,
                    },
                }}>
                    <Stack direction="row" >
                        <Stack direction="column" flex={1} alignItems="flex-start">
                            <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>
                                <FormattedDate
                                    date={new Date(scheduledAt).toLocaleDateString()}
                                />
                            </Typography>

                            <Typography component="div" sx={{ fontWeight: 450, fontSize: "12px" }}>
                                {clientName}
                            </Typography>

                            <Box sx={{ display: "flex", width: "100%" }}>
                                <Typography sx={{ fontWeight: 300, fontSize: "12px", mr: 1, opacity: 0.8 }}>
                                    {new Date(scheduledAt).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </Typography>

                                <Typography sx={{ fontWeight: 300, fontSize: "12px", opacity: 0.8, pb: 1 }}>
                                    {eventLocation}
                                </Typography>
                            </Box>

                            <Button
                                onClick={() => setShowNoteModal(true)}
                                sx={{
                                    fontWeight: 500,
                                    height: '23px',
                                    fontSize: "14px",
                                    borderRadius: '7px',
                                    backgroundColor: '#1C1D24',
                                    textTransform: 'none',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#363845ff',
                                    },
                                }}

                            >
                                Full Detail
                            </Button>
                        </Stack>


                        <Stack

                            spacing={1}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {status === "pending" && (<Button
                                onClick={() => setShowConfirmModal(true)}
                                sx={{
                                    fontWeight: 500,
                                    height: '23px',
                                    fontSize: "14px",
                                    borderRadius: '7px',
                                    backgroundColor: '#2F4A1E',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#334d24ff',
                                    },
                                }}
                                fullWidth
                            >
                                Confirm
                            </Button>)}

                            <Button
                                onClick={() => setShowUpdateModal(true)}
                                sx={{
                                    fontWeight: 500,
                                    height: '23px',
                                    fontSize: "14px",
                                    borderRadius: '7px',
                                    backgroundColor: '#1F2E59',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#25386cff',
                                    },
                                }}
                                fullWidth
                            >
                                Update
                            </Button>

                            { status === "pending" && (<Button
                                onClick={() => setShowRemoveModal(true)}
                                sx={{
                                    fontWeight: 500,
                                    height: '23px',
                                    fontSize: "14px",
                                    borderRadius: '7px',
                                    backgroundColor: '#4C2B2B',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#5f3535ff',
                                    },
                                }}
                                fullWidth
                            >
                                Remove
                            </Button>)}

                            {status === "confirmed" && (<Button
                                onClick={() => setShowCancelModal(true)}
                                sx={{
                                    fontWeight: 500,
                                    height: '23px',
                                    fontSize: "14px",
                                    borderRadius: '7px',
                                    backgroundColor: '#4C2B2B',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#5f3535ff',
                                    },
                                }}
                                fullWidth
                            >
                                Cancel
                            </Button>)}
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
            <ViewNote
                open={showNoteModal}
                onClose={() => setShowNoteModal(false)}
                scheduledAt={scheduledAt}
                clientName={clientName}
                clientEmail={clientEmail}
                clientPhone={clientPhone}
                eventLocation={eventLocation}
                message={message}


            />
            <UpdateBookingForm
                open={showUpdateModal}
                onClose={() => setShowUpdateModal(false)}
                bookingId={bookingId}
                scheduledAt={scheduledAt}
                eventLocation={eventLocation}
                message={message}
            />
            <ConfirmationModal
                open={showConfirmModal}
                title='Confirm Booking'
                message='Are you sure you want to confirm this booking?'
                onClose={() => setShowConfirmModal(false)}
                onConfirm={handleConfirmBooking}
            />
            <ConfirmationModal
                open={showRemoveModal}
                title='Remove Booking'
                message='Are you sure you want to remove this booking?'
                onClose={() => setShowRemoveModal(false)}
                onConfirm={handleRemoveBooking}
            />
            <ConfirmationModal
                open={showCancelModal}
                title='Cancel Booking'
                message='Are you sure you want to cancel this booking?'
                onClose={() => setShowCancelModal(false)}
                onConfirm={handleCancelBooking}
            />
        </>
    );
}
