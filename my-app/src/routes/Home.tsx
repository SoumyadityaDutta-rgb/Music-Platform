import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Welcome Back</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Featured Playlists</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Placeholder for featured playlists */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-800 p-4 rounded-lg">
              <div className="bg-gray-700 w-full aspect-square rounded-md mb-2"></div>
              <h3 className="text-white font-medium">Playlist {i}</h3>
              <p className="text-gray-400 text-sm">Featured Mix</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Recently Played</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Placeholder for recent tracks */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-800 p-4 rounded-lg">
              <div className="bg-gray-700 w-full aspect-square rounded-md mb-2"></div>
              <h3 className="text-white font-medium">Track {i}</h3>
              <p className="text-gray-400 text-sm">Artist Name</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home; 