import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { HouseDoor, GraphUp, BoxArrowInRight, Person, List } from 'react-bootstrap-icons';
import './VendorLayout.css';
const VendorLayout = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const handleToggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <div className="vendor-layout">
      <header className="topbar">
        <h3 className="shop-title">Tên Shop</h3>
        <button className="profile-btn">
          <Person size={20} />
          <span>Profile</span>
        </button>
      </header>
      <div className="main">
        <aside className={`sidebar ${sidebarExpanded ? 'expanded' : 'collapsed'}`}>
          <div className="sidebar-header">
            <button className="sidebar-toggle" onClick={handleToggleSidebar}>
              <h3 style={{ marginRight: '5px' }}>{sidebarExpanded && 'Tên Shop'}</h3>
              <List size={30} />
            </button>
          </div>
          <nav className="sidebar-menu">
            <ul>
              <li>
                <Link to="/products">
                  <HouseDoor size={20} />
                  <span>{sidebarExpanded && 'Products'}</span>
                </Link>
              </li>
              <li>
                <Link to="/statistics">
                  <GraphUp size={20} />
                  <span>{sidebarExpanded && 'Statistics'}</span>
                </Link>
              </li>
              <li>
                <Link to="/orders">
                  <BoxArrowInRight size={20} />
                  <span>{sidebarExpanded && 'Orders'}</span>
                </Link>
              </li>
              <li>
                <Link to="/profile">
                  <Person size={20} />
                  <span>{sidebarExpanded && 'My Profile'}</span>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="sidebar-footer">
            <button className="logout-btn">
              <BoxArrowInRight size={20} />
              <span>{sidebarExpanded && 'Logout'}</span>
            </button>
          </div>
        </aside>
        <main className="main-content">
          {/* <div className="total-count-container">
            <div className="total-count-card total-users">
              <h3>Total Users</h3>
              <p>{statistics.total?.totalUser}</p>
            </div>
            <div className="total-count-card total-stores">
              <h3>Total Stores</h3>
              <p>{statistics.total?.totalStore}</p>
            </div>
            <div className="total-count-card total-products">
              <h3>Total Products</h3>
              <p>{statistics.total?.totalProduct}</p>
            </div>
          </div> */}
        </main>
      </div>
      <footer className="footer">Footer</footer>
    </div>
  );
};

export default VendorLayout;
