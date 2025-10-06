import { Box } from "@mui/material";
import PendingBookingList from "./PendingBookingsList"
import Schedule from "../../components/schedule/Schedule";

export default function Confirmations() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: {
                    xs: 'column', 
                    md: 'row'     
                },
                gap: {xs: 2, md: 0},
                pt: 3,
                 
            }}
        >
            <PendingBookingList />
            <Schedule />
        </Box>
    );
}