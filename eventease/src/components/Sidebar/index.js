import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../../redux/sidebar';
import { Link, useLocation } from 'react-router-dom';
import {
  Calendar,
  Users,
  Ticket,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const SidebarLink = ({ href, icon: Icon, label, isCollapsed }) => {
  const location = useLocation();
  const isActive = location.pathname === href || (location.pathname === '/' && href === '/event');

  return (
    <Link to={href}>
      <div
        className={`flex items-center px-4 py-3 my-1 rounded-lg transition-all duration-200 ${
          isActive
            ? 'bg-[#37373D] text-white'
            : 'text-[#CCCCCC] hover:bg-[#2A2D2E] hover:text-white'
        }`}
      >
        <Icon className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} />
        {!isCollapsed && <span className="text-sm font-medium">{label}</span>}
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useDispatch();
  const isSidebarCollapsed = useSelector((state) => state.sidebar.isCollapsed);

  const toggleSidebarHandler = () => {
    dispatch(toggleSidebar());
  };
 let link;
  const user=localStorage.getItem('user');
  if(!user){
    link="/login"
  } else{
    if(user.role==='user'){
      link="/user"
    }
    else{
      link="/organiser"
    }
  }

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-[#181717] text-[#CCCCCC] transition-all duration-300 ease-in-out ${
        isSidebarCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo and Title */}
        <div className="flex items-center justify-between p-4 border-b border-[#252526]">
          {!isSidebarCollapsed && (
            <span className="text-xl font-bold text-white">EventEase</span>
          )}
          <button
            onClick={toggleSidebarHandler}
            className="p-1 rounded-full hover:bg-[#2A2D2E] focus:outline-none focus:ring-2 focus:ring-[#007ACC]"
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow px-2 py-4">
          <SidebarLink
            href={link}
            icon={Calendar}
            label="Acount"
            isCollapsed={isSidebarCollapsed}
          />
          <SidebarLink
            href="/event"
            icon={Calendar}
            label="Events"
            isCollapsed={isSidebarCollapsed}
          />
          <SidebarLink
            href="/attendees"
            icon={Users}
            label="Attendees"
            isCollapsed={isSidebarCollapsed}
          />
          <SidebarLink
            href="/tickets"
            icon={Ticket}
            label="Tickets"
            isCollapsed={isSidebarCollapsed}
          />
          <SidebarLink
            href="/settings"
            icon={Settings}
            label="Settings"
            isCollapsed={isSidebarCollapsed}
          />
        </nav>

        {/* User Profile */}
        {!isSidebarCollapsed && (
        <div className="p-4 border-t border-[#252526]">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm font-medium text-[#CCCCCC]">&copy; 2024 EventEase</p>
            </div>
          </div>
        </div>
      )}

      </div>
    </div>
  );
};

export default Sidebar;