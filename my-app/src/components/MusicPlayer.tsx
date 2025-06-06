import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepForward, faStepBackward, faVolumeUp, faDownload } from '@fortawesome/free-solid-svg-icons';
import { usePlayer } from '../contexts/PlayerContext';

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const MusicPlayer: React.FC = () => {
  const {
    currentSong,
    isPlaying,
    volume,
    progress,
    playPause,
    next,
    previous,
    setVolume
  } = usePlayer();

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: Implement seek functionality
  };

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-dark-secondary border-t border-gray-700 p-3 z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Song info */}
        <div className="flex items-center w-1/4">
          <img 
            src={currentSong.thumbnail} 
            alt={currentSong.title}
            className="h-14 w-14 rounded shadow-md mr-3"
          />
          <div className="truncate">
            <p className="text-white text-sm font-medium truncate">{currentSong.title}</p>
            <p className="text-gray-400 text-xs truncate">{currentSong.artist}</p>
          </div>
        </div>

        {/* Player controls */}
        <div className="flex flex-col items-center w-1/2">
          <div className="flex items-center space-x-4 mb-1">
            <button 
              className="text-gray-400 hover:text-white transition"
              onClick={previous}
            >
              <FontAwesomeIcon icon={faStepBackward} className="h-5 w-5" />
            </button>
            <button 
              className="bg-white text-black rounded-full p-2 hover:scale-105 transition"
              onClick={playPause}
            >
              <FontAwesomeIcon 
                icon={isPlaying ? faPause : faPlay} 
                className="h-4 w-4"
              />
            </button>
            <button 
              className="text-gray-400 hover:text-white transition"
              onClick={next}
            >
              <FontAwesomeIcon icon={faStepForward} className="h-5 w-5" />
            </button>
          </div>
          
          <div className="w-full flex items-center space-x-3">
            <span className="text-gray-400 text-xs min-w-[40px] text-right">
              {formatTime(progress)}
            </span>
            <input
              type="range"
              min="0"
              max={currentSong.duration || 100}
              value={progress}
              onChange={handleProgressChange}
              className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-gray-400 text-xs min-w-[40px]">
              {formatTime(currentSong.duration || 0)}
            </span>
          </div>
        </div>

        {/* Volume & extras */}
        <div className="flex items-center justify-end w-1/4 space-x-4">
          <button 
            className="text-gray-400 hover:text-white transition p-1"
            title="Download"
          >
            <FontAwesomeIcon icon={faDownload} className="h-5 w-5" />
          </button>
          
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faVolumeUp} className="text-gray-400 h-4 w-4" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume * 100}
              onChange={handleVolumeChange}
              className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer; 