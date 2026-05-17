import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import Home from '../pages/Home/Home';
import Grounds from '../pages/Grounds/Grounds';
import GroundDetails from '../pages/Grounds/GroundDetails';
import PreviewBooking from '../pages/Grounds/PreviewBooking';
import Payment from '../pages/Grounds/Payment';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Dashboard from '../pages/Dashboard/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import AboutUs from '../pages/Static/AboutUs';
import Contact from '../pages/Static/Contact';
import TermsOfService from '../pages/Static/TermsOfService';
import ScrollToTop from '../components/common/ScrollToTop';

// Placeholders for other pages
const Placeholder = ({ title }) => <div className="p-4"><h1 className="text-2xl text-primary">{title}</h1><p className="text-textGray mt-2">This page is under construction.</p></div>;

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="grounds" element={<Grounds />} />
          <Route path="grounds/:id" element={<GroundDetails />} />
          <Route path="preview-booking/:id" element={<ProtectedRoute><PreviewBooking /></ProtectedRoute>} />
          <Route path="payment/:id" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="terms" element={<TermsOfService />} />
          <Route path="*" element={<Placeholder title="404 Not Found" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}



