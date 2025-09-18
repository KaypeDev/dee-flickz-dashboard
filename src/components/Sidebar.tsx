import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CheckIcon from '@mui/icons-material/Check';
import { NavLink, useLocation } from 'react-router-dom';

const drawerWidth = 220;

const navItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { label: 'Clients and Bookings', icon: <PeopleIcon />, path: '/clients&bookings' },
    { label: 'Confirmations', icon: <CheckIcon />, path: '/Confirmations' },
];

type SidebarProps = {
    mobileOpen: boolean;
    handleDrawerToggle: () => void;
};

export default function Sidebar({ mobileOpen, handleDrawerToggle }: SidebarProps) {
    const location = useLocation();

    const drawerContent = (
        <>
            <Box sx={{ pl: 2, height: 36, display: 'flex', alignItems: 'center' }}>
                <Typography
                    noWrap
                    sx={{
                        fontWeight: 600,
                        fontSize: '15px',
                        opacity: 0.3,
                        my: 2,
                    }}
                >
                    Navigation
                </Typography>
            </Box>

            <List>
                {navItems.map(({ label, icon, path }) => {
                    const isActive = location.pathname === path;

                    return (
                        <ListItemButton
                            key={path}
                            component={NavLink}
                            to={path}
                            onClick={handleDrawerToggle}
                            sx={{
                                color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.7)',
                                bgcolor: isActive ? '#13141B' : 'transparent',
                                '&:hover': {
                                    bgcolor: '#13141B',
                                    color: '#fff',
                                },
                                borderRadius: 0,
                                mb: 0.5,
                            }}
                        >
                            <ListItemIcon sx={{ color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.7)', minWidth: 36 }}>
                                {icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={label}
                                primaryTypographyProps={{
                                    component: 'span',
                                    fontWeight: 600,
                                    fontSize: '13px',
                                }}

                            />
                        </ListItemButton>
                    );
                })}
            </List>
        </>
    );

    return (
        <>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                keepMounted
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        backgroundColor: '#010209ff',
                        color: (theme) => theme.palette.text.primary,
                        borderRight: 'none',
                        boxShadow: 'none',
                        pt: '80px',
                    },
                }}
            >
                {drawerContent}
            </Drawer>

            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        backgroundColor: (theme) => theme.palette.background.paper,
                        color: (theme) => theme.palette.text.primary,
                        borderRight: 'none',
                        boxShadow: 'none',
                        pt: '80px',
                    },
                }}
                open
            >
                {drawerContent}
            </Drawer>
        </>
    );
}
