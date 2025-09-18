
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox';
import { PersonAddAlt1, PostAdd } from '@mui/icons-material';

type NavbarProps = {
    
    onDrawerToggle: () => void;
};


export default function Navbar({ onDrawerToggle}: NavbarProps) {


    const handleSearch = (query: string) => {
        console.log('Search:', query);

    };

    return (
        <AppBar
            position='fixed'
            elevation={0}
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundColor: (theme) => theme.palette.background.paper,
                color: (theme) => theme.palette.text.primary,
                height: 80,
            }} >
            <Toolbar sx={{
                px: { xs: 2, sm: 3, md: 5 },
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'space-between', md: "flex-start"},
                gap: { xs:0, md: 2},
            }}>
                <Typography
                    component={Link}
                    to="/"
                    noWrap
                    sx={{
                        fontWeight: 900,
                        fontSize: { xs: '20px', md: "30px" },
                        mr: { xs: 1, md: 4 },
                        textDecoration: 'none',
                        color: 'inherit',
                        cursor: 'pointer',
                    }}
                >
                    DEE.FLICKZ
                </Typography>


                <Box sx={{ display: 'flex', alignItems: 'center', gap: {xs: 2, } }}>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={onDrawerToggle}
                        sx={{ display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <SearchBox onSearch={handleSearch} />

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#5CA223',
                                borderRadius: 0,
                                color: '#ffffff',
                                fontWeight: 'medium',
                                textTransform: 'none',
                                '&:hover': { backgroundColor: '#4A8B1B' },
                                height: 35,
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                            }}
                        >
                            Booking
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    ml: .5,
                                }}
                            >
                                <AddIcon fontSize='small' />
                            </Box>
                        </Button>
                        <IconButton
                            aria-label="New Booking"
                            sx={{
                                backgroundColor: '#5CA223',
                                borderRadius: '8px',
                                color: '#ffffff',
                                '&:hover': { backgroundColor: '#4A8B1B' },
                                height: 35,
                                width: 35,
                                display: { xs: 'flex', md: 'none' },
                            }}
                        >
                            <PostAdd fontSize="small" />
                        </IconButton>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#5CA223',
                                borderRadius: 0,
                                color: '#ffffff',
                                fontWeight: 'medium',
                                textTransform: 'none',
                                '&:hover': { backgroundColor: '#4A8B1B' },
                                height: 35,
                                display: { xs: 'none', md: 'flex' },
                                alignItems: 'center', // ensures vertical centering inside button
                            }}
                        >
                            Client
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    ml: .5,
                                }}
                            >
                                <AddIcon fontSize='small' />
                            </Box>
                        </Button>
                        <IconButton
                            aria-label="New Client"
                            sx={{
                                backgroundColor: '#5CA223',
                                borderRadius: '8px',
                                color: '#ffffff',
                                '&:hover': { backgroundColor: '#4A8B1B' },
                                height: 35,
                                width: 35,
                                display: { xs: 'flex', md: 'none' },
                            }}
                        >
                            <PersonAddAlt1 fontSize="small" />
                        </IconButton>
                    </Box>

                </Box>

            </Toolbar>

        </AppBar>
    );
}