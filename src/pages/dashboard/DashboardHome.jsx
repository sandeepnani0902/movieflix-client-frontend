import React, { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import SidePanel from "../../components/layout/SidePanel";
import Footer from "../../components/layout/Footer";
import { Outlet } from "react-router-dom";

const DashboardHome = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-[#0f172a] text-white overflow-hidden">
      <Navbar onMenuClick={() => setIsMobileSidebarOpen(true)} />
      <div className="flex flex-1 overflow-hidden relative">
        <SidePanel isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />
        <main className="flex-1 overflow-y-auto bg-[#0f172a]">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardHome;
