import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-bgDark text-textWhite flex flex-col">
      <Navbar />
      <main className="flex-1 w-full max-w-6xl mx-auto py-8 px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

