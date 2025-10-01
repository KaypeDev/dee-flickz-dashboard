import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  ClickAwayListener,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

type SearchBoxProps = {
  onSearch: (query: string) => void;
};

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [search, setSearch] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    if (mobileOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [mobileOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(search);
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  const handleClickAway = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSearchSubmit}
        sx={{
          flexGrow: 1,
          maxWidth: 350,
          mr: 5,
          display: { xs: 'none', md: 'flex' },
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Clients & Bookings Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#2B2C37',
              height: 35,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ ml: 1 ,color: 'rgba(255, 255, 255, 0.5)' }} />
              </InputAdornment>
            ),
            sx: {
              color: 'rgba(255, 255, 255, 0.85)',
              fontWeight: 'medium',
              fontSize: '16px',
              padding: 0,
            },
          }}
        />
      </Box>

      
      {mobileOpen ? (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Box
            component="form"
            onSubmit={handleSearchSubmit}
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              p: 1,
              backgroundColor: '#1C1D24',
              zIndex: (theme) => theme.zIndex.appBar + 1,
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
              height: 60,
              gap: 1,
            }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Clients & Bookings Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              variant="outlined"
              inputRef={inputRef}
              sx={{
                ml: 1.5,
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#2B2C37',
                  borderRadius: 0,
                  height: 35,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ ml: 1 ,color: 'rgba(255, 255, 255, 0.5)' }} />
                  </InputAdornment>
                ),
                sx: {
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontWeight: 'medium',
                  fontSize: '16px',
                  padding: 0,
                },
              }}
              autoFocus
            />

           
            <IconButton
              onClick={() => setMobileOpen(false)}
              sx={{ 
                color: "#751616ff",
                
              }}
              aria-label="close search"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </ClickAwayListener>
      ) : (
        <IconButton
          onClick={() => setMobileOpen(true)}
          sx={{
            display: { xs: 'flex', md: 'none' },
            color: 'rgba(255, 255, 255, 0.85)',
            borderRadius: '8px',
            padding: '6px',
            backgroundColor: '#2B2C37', 
            '&:hover': {
              backgroundColor: '#2B2C37',
            },
          }}
          aria-label="open search"
        >
          <SearchIcon />
        </IconButton>
      )}
    </>
  );
}
