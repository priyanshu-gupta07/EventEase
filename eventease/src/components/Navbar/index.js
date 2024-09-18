import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../redux/sidebar'; // Adjust path according to your project structure
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const isSidebarCollapsed = useSelector((state) => state.sidebar.isCollapsed);

  const toggleSidebarHandler = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div
      className={`fixed top-0 right-0 flex items-center p-4 bg-[#181717] text-[#CCCCCC] shadow-md transition-all duration-300 z-10 ${
        isSidebarCollapsed ? 'left-16 w-[calc(100%-4rem)]' : 'left-64 w-[calc(100%-16rem)]'
      }`}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebarHandler}
          className="p-2 bg-[#252526] rounded-md hover:bg-[#2A2D2E] transition-colors"
        >
          <Menu className="w-6 h-6 text-[#CCCCCC]" />
        </button>

        <Link to="/" className="text-2xl font-bold text-white">
          EventEase
        </Link>
      </div>
    </div>
  );
};

export default Navbar;