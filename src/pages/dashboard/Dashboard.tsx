import { Box } from "@mui/material";
import Schedule from "../../components/schedule/Schedule";
import BookingList from "./BookingList";

export default function Dashboard() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: {
                    xs: 'column',
                    md: 'row'
                },
                gap: { xs: 2, md: 0 },
                pt: 3,

            }}
        >
            <Schedule />
            <BookingList 
            title="Upcoming"
            direction="after"
            />
             <BookingList 
            title="Previous"
            direction="before"
            />
        </Box>
    );

}