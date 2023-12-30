import React, { useState } from "react";
import Header from "./Header";
import {Sidebar} from "./Header";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
    <div className="layout">
      <div className="header">
        <Header toggleSidebar={toggleSidebar} />
      </div>
      <div className="row g-0">
        <div className="col-md-3">
          <Sidebar isOpen={isSidebarOpen} />
        </div>
        
        <div className="col-md-7">{children}</div>
       
      </div>
      </div>
    </>
  );
};

export default Layout;
