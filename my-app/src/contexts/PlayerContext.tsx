import React, { createContext, useContext, useState, useCallback } from 'react';
import { Howl } from 'howler';

interface Song {
  id: string;
  title: string;
  artist: string;
  url: string;
  thumbnail: string;
  duration: number;
}

interface PlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  queue: Song[];
  playPause: () => void;
  play: (song: Song) => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
  setVolume: (volume: number) => void;
  addToQueue: (song: Song) => void;
  removeFromQueue: (songId: string) => void;
  clearQueue: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [queue, setQueue] = useState<Song[]>([]);
  const [sound, setSound] = useState<Howl | null>(null);

  const play = useCallback((song: Song) => {
    if (sound) {
      sound.stop();
    }

    const newSound = new Howl({
      src: [song.url],
      html5: true,
      volume: volume,
      onplay: () => setIsPlaying(true),
      onpause: () => setIsPlaying(false),
      onstop: () => setIsPlaying(false),
      onend: () => {
        if (queue.length > 0) {
          const nextSong = queue[0];
          setQueue(queue.slice(1));
          play(nextSong);
        }
      },
      onseek: () => {
        setProgress(sound ? sound.seek() as number : 0);
      }
    });

    setSound(newSound);
    setCurrentSong(song);
    newSound.play();
  }, [sound, volume, queue]);

  const pause = useCallback(() => {
    sound?.pause();
  }, [sound]);

  const playPause = useCallback(() => {
    if (sound) {
      if (isPlaying) {
        sound.pause();
      } else {
        sound.play();
      }
    }
  }, [sound, isPlaying]);

  const next = useCallback(() => {
    if (queue.length > 0) {
      const nextSong = queue[0];
      setQueue(queue.slice(1));
      play(nextSong);
    }
  }, [queue, play]);

  const previous = useCallback(() => {
    // Implement previous song logic if needed
  }, []);

  const setVolumeLevel = useCallback((newVolume: number) => {
    setVolume(newVolume);
    if (sound) {
      sound.volume(newVolume);
    }
  }, [sound]);

  const addToQueue = useCallback((song: Song) => {
    setQueue(prev => [...prev, song]);
  }, []);

  const removeFromQueue = useCallback((songId: string) => {
    setQueue(prev => prev.filter(song => song.id !== songId));
  }, []);

  const clearQueue = useCallback(() => {
    setQueue([]);
  }, []);

  const value = {
    currentSong,
    isPlaying,
    volume,
    progress,
    queue,
    playPause,
    play,
    pause,
    next,
    previous,
    setVolume: setVolumeLevel,
    addToQueue,
    removeFromQueue,
    clearQueue,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};

export default PlayerContext; 