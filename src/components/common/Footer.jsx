export default function Footer() {
  return (
    <footer className="bg-cardBg py-8 mt-12 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-xl font-bold text-primary mb-2">Playo</h2>
        <p className="text-textGray mb-4">Book the best cricket grounds and sports turfs.</p>
        <div className="flex justify-center gap-4 text-sm text-textGray">
          <a href="#" className="hover:text-primary">About Us</a>
          <a href="#" className="hover:text-primary">Contact</a>
          <a href="#" className="hover:text-primary">Terms of Service</a>
        </div>
        <p className="text-gray-600 text-sm mt-6">© {new Date().getFullYear()} Playo. All rights reserved.</p>
      </div>
    </footer>
  );
}
