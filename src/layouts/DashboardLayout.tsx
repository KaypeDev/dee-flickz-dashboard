import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/Sidebar";
import { Box, Toolbar } from '@mui/material'

const drawerWidth = 220;

export default function DashboardLayout() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Navbar onDrawerToggle={handleDrawerToggle} />
            <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                   
                    ml: { md: `${drawerWidth}px` },
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}