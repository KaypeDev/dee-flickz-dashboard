import './App.css'
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import theme from './theme/theme';

function App() {


  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );

}

export default App
