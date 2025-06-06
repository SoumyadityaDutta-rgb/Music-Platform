import React from 'react';

interface Playlist {
  id: number;
  name: string;
  description: string;
  songCount: number;
  coverImage: string;
}

const Playlists: React.FC = () => {
  // Placeholder data
  const playlists: Playlist[] = Array(8).fill(null).map((_, i) => ({
    id: i,
    name: `Playlist ${i + 1}`,
    description: 'Custom playlist',
    songCount: Math.floor(Math.random() * 20) + 1,
    coverImage: 'placeholder'
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Your Playlists</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
            <div className="bg-gray-700 w-full aspect-square rounded-md mb-3"></div>
            <h3 className="text-white font-medium truncate">{playlist.name}</h3>
            <p className="text-gray-400 text-sm truncate">{playlist.description}</p>
            <p className="text-gray-500 text-sm mt-1">{playlist.songCount} songs</p>
          </div>
        ))}

        {/* Create new playlist button */}
        <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer border-2 border-dashed border-gray-700 flex flex-col items-center justify-center aspect-square">
          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mb-2">
            <span className="text-2xl text-white">+</span>
          </div>
          <p className="text-gray-400 text-sm">Create Playlist</p>
        </div>
      </div>
    </div>
  );
};

export default Playlists; 