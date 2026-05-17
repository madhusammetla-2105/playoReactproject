import { useState, useEffect } from 'react';
import { useAuth, useBookings, useGrounds } from '../../hooks/useContexts';
import BookingCard from '../../components/cards/BookingCard';
import Loader from '../../components/common/Loader';
import { Pencil, Check, X } from 'lucide-react';
import Button from '../../components/common/Button';

function ProfileTab({ user, updateUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateUser(formData);
      setIsEditing(false);
    } catch (err) {
      alert("Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-cardBg p-6 rounded-xl border border-borderColor max-w-xl relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-textWhite">Profile Information</h2>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors"
          >
            <Pencil size={20} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-textGray mb-1">Name</label>
          {isEditing ? (
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-bgDark border border-borderColor rounded-xl text-textWhite focus:outline-none focus:border-primary transition-colors"
              required
            />
          ) : (
            <div className="p-3 bg-bgDark rounded border border-borderColor text-textWhite">{user?.name}</div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-textGray mb-1">Email</label>
          {isEditing ? (
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-bgDark border border-borderColor rounded-xl text-textWhite focus:outline-none focus:border-primary transition-colors"
              required
            />
          ) : (
            <div className="p-3 bg-bgDark rounded border border-borderColor text-textWhite">{user?.email}</div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-textGray mb-1">Role</label>
          <div className="p-3 bg-bgDark/50 rounded border border-borderColor text-textGray capitalize">{user?.role}</div>
        </div>

        {isEditing && (
          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              className="flex-1 py-2 flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              <Check size={18} /> {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setIsEditing(false);
                setFormData({ name: user?.name, email: user?.email });
              }}
              className="flex-1 py-2 flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              <X size={18} /> Cancel
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

export default function Dashboard() {
  const { user, updateUser } = useAuth();
  const { bookings, loading, cancelBooking } = useBookings();
  const { grounds } = useGrounds();
  const [activeTab, setActiveTab] = useState('bookings');

  if (loading) return <Loader />;

  const getGroundName = (groundId) => {
    const ground = grounds.find(g => g.id === groundId);
    return ground ? ground.name : 'Unknown Ground';
  };

  return (
    <div className="space-y-8">
      <div className="bg-cardBg p-8 rounded-2xl border border-borderColor flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-textWhite">Welcome back, {user?.name}!</h1>
          <p className="text-textGray mt-2">Manage your bookings and account settings here.</p>
        </div>
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-primary text-2xl font-bold">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
      </div>

      <div className="flex gap-4 border-b border-borderColor pb-2">
        <button 
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2 font-medium transition-colors ${activeTab === 'bookings' ? 'text-primary border-b-2 border-primary' : 'text-textGray hover:text-textWhite'}`}
        >
          My Bookings
        </button>
        <button 
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 font-medium transition-colors ${activeTab === 'profile' ? 'text-primary border-b-2 border-primary' : 'text-textGray hover:text-textWhite'}`}
        >
          Profile Settings
        </button>
        {user?.role === 'admin' && (
          <button 
            onClick={() => setActiveTab('admin')}
            className={`px-4 py-2 font-medium transition-colors ${activeTab === 'admin' ? 'text-primary border-b-2 border-primary' : 'text-textGray hover:text-textWhite'}`}
          >
            Admin Panel
          </button>
        )}
      </div>

      <div className="mt-6">
        {activeTab === 'bookings' && (
          <div>
            <h2 className="text-xl font-bold text-textWhite mb-4">Your Recent Bookings</h2>
            {bookings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bookings.map(booking => (
                  <BookingCard 
                    key={booking.id} 
                    booking={booking} 
                    groundName={getGroundName(booking.groundId)}
                    showCancel={true}
                    onCancel={cancelBooking}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-cardBg p-8 rounded-xl border border-borderColor text-center">
                <p className="text-textGray">You have no active bookings.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <ProfileTab user={user} updateUser={updateUser} />
        )}

        {activeTab === 'admin' && user?.role === 'admin' && (
          <div className="bg-cardBg p-6 rounded-xl border border-borderColor">
             <h2 className="text-xl font-bold text-textWhite mb-4">Admin Dashboard</h2>
             <p className="text-textGray">Welcome to the admin panel. Platform management features will be implemented here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
