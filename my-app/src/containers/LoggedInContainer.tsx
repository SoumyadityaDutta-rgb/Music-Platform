import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Sidebar from '../components/Sidebar';
import MusicPlayer from '../components/MusicPlayer';

interface LoggedInContainerProps {
  children: ReactNode;
  curActiveScreen?: string;
}

const LoggedInContainer: React.FC<LoggedInContainerProps> = ({ 
  children, 
  curActiveScreen = "home" 
}) => {
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(['token']);

  const handleLogout = () => {
    removeCookie('token');
    navigate('/login');
  };

  return (
    <div className="h-full w-full bg-dark-primary">
      <div className="flex h-[90vh]">
        <Sidebar activeScreen={curActiveScreen} />
        <div className="w-full overflow-auto">
          {/* Header */}
          <header className="sticky top-0 z-40 bg-dark-secondary bg-opacity-95 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate(-1)}
                  className="rounded-full bg-black/70 p-2 text-white hover:bg-black/80"
                >
                  ←
                </button>
                <button
                  onClick={() => navigate(1)}
                  className="rounded-full bg-black/70 p-2 text-white hover:bg-black/80"
                >
                  →
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLogout}
                  className="rounded-full bg-black/70 px-4 py-2 text-white hover:bg-black/80"
                >
                  Logout
                </button>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 h-[10vh] bg-dark-secondary">
        <MusicPlayer />
      </div>
    </div>
  );
};

export default LoggedInContainer; 