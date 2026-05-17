import { ShieldCheck, FileText, AlertCircle } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-textWhite">Terms of <span className="text-primary">Service</span></h1>
        <p className="text-xl text-textGray">Please read our terms and conditions carefully.</p>
      </div>

      <div className="bg-cardBg p-8 rounded-3xl border border-borderColor space-y-8">
        <section className="space-y-4">
          <div className="flex items-center gap-3 text-primary">
            <ShieldCheck size={28} />
            <h2 className="text-2xl font-bold text-textWhite">1. Acceptance of Terms</h2>
          </div>
          <p className="text-textGray leading-relaxed">
            By accessing and using Playo, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 text-primary">
            <FileText size={28} />
            <h2 className="text-2xl font-bold text-textWhite">2. Booking Policies</h2>
          </div>
          <p className="text-textGray leading-relaxed">
            All bookings are subject to availability. Gaps between time slots are not allowed, and users must select contiguous slots as enforced by our system.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 text-primary">
            <AlertCircle size={28} />
            <h2 className="text-2xl font-bold text-textWhite">3. Cancellation & Refunds</h2>
          </div>
          <p className="text-textGray leading-relaxed">
            Cancellations must be made at least 24 hours before the scheduled time for a full refund. Same-day cancellations may not be eligible for a refund.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 text-primary">
            <ShieldCheck size={28} />
            <h2 className="text-2xl font-bold text-textWhite">4. User Conduct</h2>
          </div>
          <p className="text-textGray leading-relaxed">
            Users are expected to maintain the decorum of the venue. Any damage to the property will be the responsibility of the user who made the booking.
          </p>
        </section>
      </div>

      <div className="text-center text-textGray text-sm">
        Last updated: May 16, 2026
      </div>
    </div>
  );
}
