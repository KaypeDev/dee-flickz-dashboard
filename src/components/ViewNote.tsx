import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Box,
    Button,
    Divider,
} from "@mui/material";
import { FormattedDate } from "./FormatterComponent";
import { formatPhoneNumberIntl } from "react-phone-number-input";

type ViewNoteProps = {
    open: boolean;
    scheduledAt: number;
    clientName: string;
    eventLocation: string;
    clientEmail: string;
    clientPhone: string;
    message: string;
    onClose: () => void;
};

export default function ViewNote({
    open,
    message,
    scheduledAt,
    clientName,
    eventLocation,
    clientEmail,
    clientPhone,
    onClose,
}: ViewNoteProps) {
    const formattedTime = new Date(scheduledAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" sx={{display: 'flex', flexDirection: "column", alignItems: "center"}}> 
            <DialogTitle sx={{ textAlign: "center", fontWeight: 700 }}>
                Booking Details
            </DialogTitle>

            <DialogContent sx={{ pt: 1, textAlign: "start" }}>
                <Box sx={{ textAlign: "start", display: "flex", flexDirection: "column",  }}>
                    <Typography sx={{ fontWeight: 600 }}>
                        Date:{" "}
                        <Typography component="span" sx={{ fontWeight: 400, opacity: 0.5 }}>
                            <FormattedDate date={new Date(scheduledAt).toLocaleDateString()} />
                        </Typography>
                    </Typography>

                  
                    <Typography sx={{ fontWeight: 600 }}>
                        Time:{" "}
                        <Typography component="span" sx={{ fontWeight: 400, opacity: 0.5 }}>
                            {formattedTime}
                        </Typography>
                    </Typography>

                    <Typography sx={{ fontWeight: 600}}>
                        Location:{" "}
                        <Typography component="span" sx={{ fontWeight: 400, opacity: 0.5 }}>
                            {eventLocation || "N/A"}
                        </Typography>
                    </Typography>



                
                    <Box >
                        <Typography sx={{ fontWeight: 600 }}>
                            Full Name:{" "}
                            <Typography component="span" sx={{ fontWeight: 400, opacity: 0.5 }}>
                                {clientName}
                            </Typography>
                        </Typography>

                        <Typography sx={{ fontWeight: 600 }}>
                            Email:{" "}
                            <Typography component="span" sx={{ fontWeight: 400, opacity: 0.5 }}>
                                {clientEmail || "N/A"}
                            </Typography>
                        </Typography>

                        <Typography sx={{ fontWeight: 600 }}>
                            Phone:{" "}
                            <Typography component="span" sx={{ fontWeight: 400, opacity: 0.5 }}>
                                {formatPhoneNumberIntl(clientPhone) || "N/A"}
                            </Typography>
                        </Typography>
                    </Box>

              

             
                    <Typography maxWidth="sm" sx={{ fontWeight: 600}}>
                        Note:{" "}
                        <Typography component='span' sx={{ fontWeight: 400, opacity: 0.5 }}>
                        {message || "No note provided."}
                    </Typography>
                        </Typography>
        
                </Box>
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={onClose}
                    color="inherit"
                    sx={{
                        fontWeight: 500,
                        height: "28px",
                        borderRadius: "7px",
                    }}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
