import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Button from '../../components/common/Button';

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! We'll get back to you soon.");
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <div className="text-center mb-12 space-y-4">
        <h1 className="text-5xl font-bold text-textWhite">Get in <span className="text-primary">Touch</span></h1>
        <p className="text-xl text-textGray">Have questions? We're here to help you.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-cardBg p-8 rounded-3xl border border-borderColor space-y-6">
            <h2 className="text-2xl font-bold text-textWhite">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-textGray">Email us at</p>
                  <p className="text-lg font-bold text-textWhite">support@playo.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-textGray">Call us at</p>
                  <p className="text-lg font-bold text-textWhite">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-textGray">Our Office</p>
                  <p className="text-lg font-bold text-textWhite">HITEC City, Hyderabad, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-cardBg p-8 rounded-3xl border border-borderColor space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-textWhite">Full Name</label>
            <input 
              type="text" 
              required
              placeholder="John Doe"
              className="w-full px-4 py-3 bg-bgDark border border-borderColor rounded-xl text-textWhite focus:border-primary outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-textWhite">Email Address</label>
            <input 
              type="email" 
              required
              placeholder="john@example.com"
              className="w-full px-4 py-3 bg-bgDark border border-borderColor rounded-xl text-textWhite focus:border-primary outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-textWhite">Message</label>
            <textarea 
              rows="4"
              required
              placeholder="How can we help you?"
              className="w-full px-4 py-3 bg-bgDark border border-borderColor rounded-xl text-textWhite focus:border-primary outline-none transition-colors resize-none"
            ></textarea>
          </div>
          <Button type="submit" className="w-full py-4 text-lg font-bold flex items-center justify-center gap-2">
            <Send size={20} />
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
}
