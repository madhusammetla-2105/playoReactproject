import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-cardBg py-12 mt-12 border-t border-borderColor">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <Link to="/" className="text-3xl font-bold text-primary mb-4 block">Playo</Link>
        <p className="text-textGray mb-8 text-lg max-w-md mx-auto">Book the best cricket grounds and sports turfs in Hyderabad with ease.</p>
        <div className="flex flex-wrap justify-center gap-8 text-sm font-bold uppercase tracking-widest text-textGray">
          <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
        </div>
        <p className="text-gray-600 text-xs mt-12 pt-8 border-t border-borderColor/30">© {new Date().getFullYear()} Playo. Built for sports enthusiasts. All rights reserved.</p>
      </div>
    </footer>
  );
}
