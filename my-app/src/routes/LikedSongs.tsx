import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPlay } from '@fortawesome/free-solid-svg-icons';

const LikedSongs: React.FC = () => {
  // Placeholder data
  const likedSongs = Array(10).fill(null).map((_, i) => ({
    id: i,
    title: `Liked Song ${i + 1}`,
    artist: 'Artist Name',
    duration: '3:30',
    addedAt: new Date().toLocaleDateString()
  }));

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-gradient-to-br from-purple-700 to-blue-400 p-8 rounded-lg">
          <FontAwesomeIcon icon={faHeart} className="text-white text-4xl" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Liked Songs</h1>
          <p className="text-gray-400">{likedSongs.length} songs</p>
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-lg">
        <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 p-4 text-gray-400 text-sm border-b border-gray-800">
          <span>#</span>
          <span>TITLE</span>
          <span>ARTIST</span>
          <span>ADDED</span>
        </div>

        {likedSongs.map((song, index) => (
          <div
            key={song.id}
            className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 p-4 text-gray-300 hover:bg-gray-800/50 group"
          >
            <span className="flex items-center">
              <span className="group-hover:hidden">{index + 1}</span>
              <FontAwesomeIcon icon={faPlay} className="hidden group-hover:block" />
            </span>
            <span>{song.title}</span>
            <span>{song.artist}</span>
            <span>{song.addedAt}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikedSongs; 