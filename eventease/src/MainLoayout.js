import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

const MainLayout = () => {
  const isSidebarCollapsed = useSelector((state) => state.sidebar.isCollapsed);

  return (
    <div className="flex h-screen bg-[#1E1E1E]">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Navbar />
        <main 
          className={`flex-grow overflow-x-hidden overflow-y-auto bg-[#1E1E1E] transition-all duration-300 ${
            isSidebarCollapsed ? 'ml-16' : 'ml-64'
          }`}
        >
          <div className="container mx-auto p-4 mt-16">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;