import { useState, useMemo } from 'react';
import { useGrounds } from '../../hooks/useContexts';
import GroundCard from '../../components/cards/GroundCard';
import Loader from '../../components/common/Loader';
import SearchBar from '../../components/common/SearchBar';

export default function Grounds() {
  const { grounds, loading, error } = useGrounds();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const types = useMemo(() => {
    return ['All', ...new Set(grounds.map(g => g.type))];
  }, [grounds]);

  const filteredGrounds = useMemo(() => {
    return grounds.filter(ground => {
      const matchesSearch = ground.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            ground.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'All' || ground.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [grounds, searchTerm, filterType]);

  if (loading) return <Loader fullScreen />;
  if (error) return <div className="text-red-500 text-center p-8">{error}</div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-cardBg p-6 rounded-2xl border border-gray-800">
        <div className="w-full md:w-1/2">
          <SearchBar 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            placeholder="Search by name, area or Hyderabad..." 
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {types.map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                filterType === type 
                  ? 'bg-primary text-bgDark' 
                  : 'bg-bgDark text-textGray hover:text-textWhite'
              }`}
            >
              {type}
            </button>
          ))}
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
