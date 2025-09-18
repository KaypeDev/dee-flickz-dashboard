import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/dashboard/Dashboard';
import ClientsAndBookings from '../pages/clients&bookings/ClientsAndBookings';
import DashboardLayout from '../layouts/DashboardLayout';
import Confirmations from '../pages/confirmation/Confirmations';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout/>}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/clients&bookings" element={<ClientsAndBookings/>} />
        <Route path="/confirmations" element={<Confirmations/>}/>
      </Route>
    </Routes>
  );
}