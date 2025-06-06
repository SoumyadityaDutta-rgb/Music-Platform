import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faSearch, 
  faBook, 
  faPlus, 
  faHeart, 
  faDownload, 
  faUsers, 
  faComments 
} from '@fortawesome/free-solid-svg-icons';

interface SidebarProps {
  className?: string;
  activeScreen?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = "", activeScreen = "home" }) => {
  const [collapsed, setCollapsed] = useState(false);
  
  const isActive = (screen: string) => activeScreen === screen;
  
  return (
    <div 
      className={`flex flex-col h-screen bg-dark-primary text-white transition-all ${
        collapsed ? "w-[70px]" : "w-[240px]"
      } ${className}`}
    >
      <div className="p-4">
        <div className="flex items-center">
          <img 
            src="/spotify-logo.png" 
            alt="Spotify Logo" 
            className="h-10"
          />
          {!collapsed && <span className="ml-2 font-bold">Spotify Clone</span>}
        </div>
      </div>
      
      <div className="flex-1 overflow-auto mt-6">
        <nav>
          <ul className="space-y-2">
            <li>
              <Link to="/" 
                className={`flex items-center transition px-4 py-2 ${
                  collapsed ? "justify-center" : ""
                } ${isActive("home") ? "text-white" : "text-gray-400 hover:text-white"}`}
              >
                <FontAwesomeIcon icon={faHome} className="h-6 w-6" />
                {!collapsed && <span className="ml-4">Home</span>}
              </Link>
            </li>
            <li>
              <Link to="/search" 
                className={`flex items-center transition px-4 py-2 ${
                  collapsed ? "justify-center" : ""
                } ${isActive("search") ? "text-white" : "text-gray-400 hover:text-white"}`}
              >
                <FontAwesomeIcon icon={faSearch} className="h-6 w-6" />
                {!collapsed && <span className="ml-4">Search</span>}
              </Link>
            </li>
            <li>
              <Link to="/library" 
                className={`flex items-center transition px-4 py-2 ${
                  collapsed ? "justify-center" : ""
                } ${isActive("library") ? "text-white" : "text-gray-400 hover:text-white"}`}
              >
                <FontAwesomeIcon icon={faBook} className="h-6 w-6" />
                {!collapsed && <span className="ml-4">Your Library</span>}
              </Link>
            </li>
            <li className="mt-6">
              <Link to="/playlists" 
                className={`flex items-center transition px-4 py-2 ${
                  collapsed ? "justify-center" : ""
                } ${isActive("playlists") ? "text-white" : "text-gray-400 hover:text-white"}`}
              >
                <FontAwesomeIcon icon={faPlus} className="h-6 w-6" />
                {!collapsed && <span className="ml-4">Create Playlist</span>}
              </Link>
            </li>
            <li>
              <Link to="/liked-songs" 
                className={`flex items-center transition px-4 py-2 ${
                  collapsed ? "justify-center" : ""
                } ${isActive("liked-songs") ? "text-white" : "text-gray-400 hover:text-white"}`}
              >
                <FontAwesomeIcon icon={faHeart} className="h-6 w-6" />
                {!collapsed && <span className="ml-4">Liked Songs</span>}
              </Link>
            </li>
            <li>
              <Link to="/downloads" 
                className={`flex items-center transition px-4 py-2 ${
                  collapsed ? "justify-center" : ""
                } ${isActive("downloads") ? "text-white" : "text-gray-400 hover:text-white"}`}
              >
                <FontAwesomeIcon icon={faDownload} className="h-6 w-6" />
                {!collapsed && <span className="ml-4">Downloads</span>}
              </Link>
            </li>
            <li className="mt-6">
              <Link to="/friends" 
                className={`flex items-center transition px-4 py-2 ${
                  collapsed ? "justify-center" : ""
                } ${isActive("friends") ? "text-white" : "text-gray-400 hover:text-white"}`}
              >
                <FontAwesomeIcon icon={faUsers} className="h-6 w-6" />
                {!collapsed && <span className="ml-4">Friends</span>}
              </Link>
            </li>
            <li>
              <Link to="/chat" 
                className={`flex items-center transition px-4 py-2 ${
                  collapsed ? "justify-center" : ""
                } ${isActive("chat") ? "text-white" : "text-gray-400 hover:text-white"}`}
              >
                <FontAwesomeIcon icon={faComments} className="h-6 w-6" />
                {!collapsed && <span className="ml-4">Chat</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      
      <div className="p-4">
        <button 
          className="w-full text-left text-gray-400 hover:text-white transition"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? 
            <span className="flex justify-center">❯</span> : 
            <span>❮ Collapse</span>
          }
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 