import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#000000',  
      paper: '#1C1D24',    
    },
    text: {
      primary: '#ffffff', 
      secondary: '#ffffff',
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 16,
  },
  
});
export default theme;