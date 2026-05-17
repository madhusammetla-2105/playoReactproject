import { useState, useMemo } from 'react';
import { useGrounds } from '../../hooks/useContexts';
import GroundCard from '../../components/cards/GroundCard';
import Loader from '../../components/common/Loader';
import { Layers, Zap, Trophy, Crown, MapPin, Search, Filter, Star } from 'lucide-react';

export default function Grounds() {
  const { grounds, loading, error } = useGrounds();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const categories = [
    { name: 'All', icon: <Layers size={18} /> },
    { name: 'Box Cricket', icon: <Zap size={18} /> },
    { name: 'Multi-Sport', icon: <Trophy size={18} /> },
    { name: 'Premium Arena', icon: <Crown size={18} /> },
    { name: 'Professional Ground', icon: <Trophy size={18} /> },
    { name: 'Academy', icon: <Zap size={18} /> }
  ];

  const popularAreas = [
    'All Areas', 'Madhapur', 'Gachibowli', 'Kondapur', 'Uppal', 'Banjara Hills', 'Jubilee Hills', 'Kukatpally', 'Manikonda'
  ];

  const [filterArea, setFilterArea] = useState('All Areas');
  const [filterRating, setFilterRating] = useState('All');

  const ratingFilters = [
    { label: 'All Ratings', value: 'All' },
    { label: '4.5+ ★ Superb', value: '4.5' },
    { label: '4.0+ ★ Good', value: '4.0' },
    { label: '3.5+ ★ Average', value: '3.5' }
  ];

  const filteredGrounds = useMemo(() => {
    return grounds.filter(ground => {
      const matchesSearch = ground.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            ground.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'All' || ground.type === filterType;
      const matchesArea = filterArea === 'All Areas' || ground.location.toLowerCase().includes(filterArea.toLowerCase());
      const matchesRating = filterRating === 'All' || ground.rating >= parseFloat(filterRating);
      return matchesSearch && matchesType && matchesArea && matchesRating;
    });
  }, [grounds, searchTerm, filterType, filterArea, filterRating]);

  if (loading) return <Loader fullScreen />;
  if (error) return <div className="text-red-500 text-center p-8">{error}</div>;

  return (
    <div className="space-y-8">
      {/* Search and Category Filter Section */}
      <div className="bg-cardBg p-8 rounded-3xl border border-borderColor shadow-xl space-y-8 transition-colors duration-300">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="w-full md:w-2/3 relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-textGray group-focus-within:text-primary transition-colors">
              <Search size={20} />
            </div>
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, area or Hyderabad..."
              className="w-full pl-12 pr-4 py-4 bg-bgDark border border-borderColor rounded-2xl text-textWhite focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 placeholder:text-textGray/50"
            />
          </div>
          <div className="flex items-center gap-3 bg-bgDark p-1 rounded-2xl border border-borderColor">
             <div className="px-4 py-2 text-textGray font-bold text-xs uppercase tracking-widest flex items-center gap-2">
               <Filter size={14} /> Filter
             </div>
          </div>
        </div>

        {/* Professional Category Selector */}
        <div className="space-y-4">
          <label className="text-xs font-bold text-textGray uppercase tracking-widest">Select Sport Category</label>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat.name}
                onClick={() => setFilterType(cat.name)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-sm transition-all duration-300 whitespace-nowrap border-2 ${
                  filterType === cat.name 
                    ? 'bg-primary border-primary text-bgDark shadow-lg shadow-primary/20 scale-105' 
                    : 'bg-bgDark border-borderColor text-textGray hover:border-primary/50 hover:text-textWhite'
                }`}
              >
                <span className={`${filterType === cat.name ? 'text-bgDark' : 'text-primary'}`}>
                  {cat.icon}
                </span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Famous Areas Selector */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-primary" />
            <label className="text-xs font-bold text-textGray uppercase tracking-widest">Famous Areas in Hyderabad</label>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularAreas.map(area => (
              <button
                key={area}
                onClick={() => setFilterArea(area)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 border ${
                  filterArea === area 
                    ? 'bg-primary/20 border-primary text-primary' 
                    : 'bg-bgDark border-borderColor text-textGray hover:border-gray-500'
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        {/* Rating Filter Selector */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Star size={16} className="text-yellow-400" />
            <label className="text-xs font-bold text-textGray uppercase tracking-widest">Filter by Customer Rating</label>
          </div>
          <div className="flex flex-wrap gap-2">
            {ratingFilters.map(rate => (
              <button
                key={rate.value}
                onClick={() => setFilterRating(rate.value)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 border flex items-center gap-1.5 ${
                  filterRating === rate.value 
                    ? 'bg-yellow-400/20 border-yellow-400 text-yellow-400 shadow-md shadow-yellow-400/10' 
                    : 'bg-bgDark border-borderColor text-textGray hover:border-yellow-400/30'
                }`}
              >
                <Star size={12} fill={filterRating === rate.value ? "currentColor" : "none"} />
                {rate.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGrounds.length > 0 ? (
          filteredGrounds.map(ground => (
            <GroundCard key={ground.id} ground={ground} />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-textGray">
            No grounds found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
