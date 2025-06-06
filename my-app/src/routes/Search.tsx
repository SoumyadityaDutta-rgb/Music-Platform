import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Search</h1>
        <form onSubmit={handleSearch} className="w-full max-w-xl">
          <div className="relative">
            <FontAwesomeIcon 
              icon={faSearch} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What do you want to listen to?"
              className="w-full pl-10 pr-4 py-3 bg-dark-secondary text-white rounded-full focus:outline-none focus:ring-2 focus:ring-spotify-green"
            />
          </div>
        </form>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {/* Browse All Section */}
        <div className="col-span-full mb-8">
          <h2 className="text-xl font-bold mb-4">Browse All</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['Podcasts', 'Made For You', 'Charts', 'New Releases', 'Discover', 'Concerts'].map((category) => (
              <div 
                key={category}
                className="bg-dark-secondary p-4 rounded-lg hover:bg-opacity-80 transition cursor-pointer"
              >
                <h3 className="font-semibold">{category}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="col-span-full">
            <h2 className="text-xl font-bold mb-4">Search Results</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {searchResults.map((result) => (
                <div 
                  key={result.id}
                  className="bg-dark-secondary p-4 rounded-lg hover:bg-opacity-80 transition cursor-pointer"
                >
                  <img 
                    src={result.thumbnail} 
                    alt={result.title}
                    className="w-full aspect-square object-cover rounded-md mb-4"
                  />
                  <h3 className="font-semibold truncate">{result.title}</h3>
                  <p className="text-sm text-gray-400 truncate">{result.artist}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search; 