import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// Components
import Sidebar from './components/Sidebar';
import MusicPlayer from './components/MusicPlayer';

// Pages
import Login from './routes/Login';
import Signup from './routes/Signup';
import Home from './routes/Home';
import Search from './routes/Search';
import Library from './routes/Library';
import LikedSongs from './routes/LikedSongs';
import Playlists from './routes/Playlists';
import NotFound from './routes/NotFound';

// Context
import { PlayerProvider } from './contexts/PlayerContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  activeScreen?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, activeScreen = "home" }) => {
  const [cookies] = useCookies(['token']);
  const isAuthenticated = cookies.token && cookies.token !== "undefined" && cookies.token !== "";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-dark-primary text-white">
      <Sidebar activeScreen={activeScreen} />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-dark-secondary">
        <MusicPlayer />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [cookies] = useCookies(['token']);
  const isAuthenticated = cookies.token && cookies.token !== "undefined" && cookies.token !== "";

  return (
    <PlayerProvider>
      <BrowserRouter>
        <div className="h-screen">
          {isAuthenticated ? (
            <Routes>
              <Route path="/" element={
                <ProtectedRoute activeScreen="home">
                  <Home />
                </ProtectedRoute>
              } />
              <Route path="/search" element={
                <ProtectedRoute activeScreen="search">
                  <Search />
                </ProtectedRoute>
              } />
              <Route path="/library" element={
                <ProtectedRoute activeScreen="library">
                  <Library />
                </ProtectedRoute>
              } />
              <Route path="/liked-songs" element={
                <ProtectedRoute activeScreen="liked-songs">
                  <LikedSongs />
                </ProtectedRoute>
              } />
              <Route path="/playlists" element={
                <ProtectedRoute activeScreen="playlists">
                  <Playlists />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          )}
        </div>
      </BrowserRouter>
    </PlayerProvider>
  );
};

export default App;
