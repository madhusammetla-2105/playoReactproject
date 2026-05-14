import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=2000" 
            alt="Cricket stadium" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bgDark via-bgDark/80 to-transparent" />
        </div>
        
        <div className="relative z-10 p-8 md:p-16 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-textWhite mb-6 leading-tight">
            Book the Best <span className="text-primary">Cricket Grounds</span> in Hyderabad
          </h1>
          <p className="text-lg text-textGray mb-8">
            Find and book premium cricket facilities across Uppal, Madhapur, Gachibowli and more. Join the thriving cricket community in the City of Pearls.
          </p>
          <div className="flex gap-4">
            <Link to="/grounds">
              <Button variant="primary" className="text-lg px-8 py-3">Find Grounds</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="text-lg px-8 py-3 bg-bgDark/50 backdrop-blur-sm">Join Now</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 py-8">
        <div className="bg-cardBg p-6 rounded-2xl border border-gray-800 hover:border-primary/50 transition-colors">
          <div className="w-12 h-12 bg-primary/20 text-primary rounded-lg flex items-center justify-center mb-4 text-xl font-bold">1</div>
          <h3 className="text-xl font-semibold mb-2">Search</h3>
          <p className="text-textGray">Browse through our curated list of premium cricket grounds with real-time availability.</p>
        </div>
        <div className="bg-cardBg p-6 rounded-2xl border border-gray-800 hover:border-primary/50 transition-colors">
          <div className="w-12 h-12 bg-primary/20 text-primary rounded-lg flex items-center justify-center mb-4 text-xl font-bold">2</div>
          <h3 className="text-xl font-semibold mb-2">Book</h3>
          <p className="text-textGray">Secure your spot instantly with our easy-to-use booking system and secure payments.</p>
        </div>
        <div className="bg-cardBg p-6 rounded-2xl border border-gray-800 hover:border-primary/50 transition-colors">
          <div className="w-12 h-12 bg-primary/20 text-primary rounded-lg flex items-center justify-center mb-4 text-xl font-bold">3</div>
          <h3 className="text-xl font-semibold mb-2">Play</h3>
          <p className="text-textGray">Gather your team, head to the ground, and enjoy a seamless cricketing experience.</p>
        </div>
      </section>
    </div>
  );
}

