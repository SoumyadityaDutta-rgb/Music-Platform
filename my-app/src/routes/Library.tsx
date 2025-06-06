import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faList, faClock } from '@fortawesome/free-solid-svg-icons';

const Library: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'playlists' | 'songs' | 'recent'>('playlists');

  const tabs = [
    { id: 'playlists', label: 'Playlists', icon: faList },
    { id: 'songs', label: 'Songs', icon: faMusic },
    { id: 'recent', label: 'Recently Played', icon: faClock },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Your Library</h1>
        
        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center px-4 py-2 rounded-full transition ${
                activeTab === tab.id
                  ? 'bg-spotify-green text-black'
                  : 'bg-dark-secondary text-white hover:bg-opacity-80'
              }`}
            >
              <FontAwesomeIcon icon={tab.icon} className="h-4 w-4 mr-2" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {activeTab === 'playlists' && (
            <>
              {/* Create Playlist Card */}
              <div className="bg-dark-secondary p-4 rounded-lg hover:bg-opacity-80 transition cursor-pointer">
                <div className="bg-dark-primary aspect-square rounded-md flex items-center justify-center mb-4">
                  <FontAwesomeIcon icon={faList} className="h-12 w-12 text-spotify-green" />
                </div>
                <h3 className="font-semibold">Create Playlist</h3>
                <p className="text-sm text-gray-400">Start creating your playlist</p>
              </div>

              {/* Placeholder Playlists */}
              {Array.from({ length: 5 }).map((_, i) => (
                <div 
                  key={i}
                  className="bg-dark-secondary p-4 rounded-lg hover:bg-opacity-80 transition cursor-pointer"
                >
                  <div className="bg-dark-primary aspect-square rounded-md mb-4"></div>
                  <h3 className="font-semibold">Playlist {i + 1}</h3>
                  <p className="text-sm text-gray-400">0 songs</p>
                </div>
              ))}
            </>
          )}

          {activeTab === 'songs' && (
            <>
              {/* Placeholder Songs */}
              {Array.from({ length: 10 }).map((_, i) => (
                <div 
                  key={i}
                  className="bg-dark-secondary p-4 rounded-lg hover:bg-opacity-80 transition cursor-pointer"
                >
                  <div className="bg-dark-primary aspect-square rounded-md mb-4"></div>
                  <h3 className="font-semibold">Song Title {i + 1}</h3>
                  <p className="text-sm text-gray-400">Artist Name</p>
                </div>
              ))}
            </>
          )}

          {activeTab === 'recent' && (
            <>
              {/* Placeholder Recent */}
              {Array.from({ length: 8 }).map((_, i) => (
                <div 
                  key={i}
                  className="bg-dark-secondary p-4 rounded-lg hover:bg-opacity-80 transition cursor-pointer"
                >
                  <div className="bg-dark-primary aspect-square rounded-md mb-4"></div>
                  <h3 className="font-semibold">Recently Played {i + 1}</h3>
                  <p className="text-sm text-gray-400">Last played 2h ago</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Library; 