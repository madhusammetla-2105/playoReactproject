import { Info, Target, Users } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-textWhite">About <span className="text-primary">Playo</span></h1>
        <p className="text-xl text-textGray">Your ultimate platform for sports venue bookings.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-cardBg p-8 rounded-3xl border border-borderColor text-center space-y-4">
          <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary mx-auto">
            <Target size={32} />
          </div>
          <h3 className="text-xl font-bold text-textWhite">Our Mission</h3>
          <p className="text-textGray text-sm">To make sports accessible to everyone by providing a seamless booking experience for the best grounds.</p>
        </div>
        <div className="bg-cardBg p-8 rounded-3xl border border-borderColor text-center space-y-4">
          <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary mx-auto">
            <Users size={32} />
          </div>
          <h3 className="text-xl font-bold text-textWhite">Our Team</h3>
          <p className="text-textGray text-sm">A group of passionate sports enthusiasts and techies dedicated to building the best platform for you.</p>
        </div>
        <div className="bg-cardBg p-8 rounded-3xl border border-borderColor text-center space-y-4">
          <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary mx-auto">
            <Info size={32} />
          </div>
          <h3 className="text-xl font-bold text-textWhite">Why Us?</h3>
          <p className="text-textGray text-sm">Real-time availability, secure payments, and a wide selection of premium venues across the city.</p>
        </div>
      </div>

      <div className="bg-bgDark p-8 rounded-3xl border border-borderColor space-y-6">
        <h2 className="text-3xl font-bold text-textWhite">The Story of Playo</h2>
        <p className="text-textGray leading-relaxed">
          Founded in 2024, Playo started with a simple problem: finding a decent cricket ground shouldn't be harder than actually playing the game. We've partnered with over 50+ venues to bring you the best experience possible. Whether it's a late-night box cricket match or a professional tournament, we've got you covered.
        </p>
      </div>
    </div>
  );
}
