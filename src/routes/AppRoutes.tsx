import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/dashboard/Dashboard';
import ClientsAndBookings from '../pages/clients&bookings/ClientsAndBookings';
import DashboardLayout from '../layouts/DashboardLayout';
import Confirmations from '../pages/confirmation/Confirmations';
import Login from '../components/supabase/Login';
import ProtectedRoute from './ProtectedRoutes';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >

                <Route path="/" element={<Dashboard />} />
                <Route path="/clients&bookings" element={<ClientsAndBookings />} />
                <Route path="/confirmations" element={<Confirmations />} />
            </Route>
        </Routes>
    );
}