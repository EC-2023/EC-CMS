import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { HouseDoor, GraphUp, BoxArrowInRight, Person, List } from 'react-bootstrap-icons';
import './VendorLayout.css';
import { Nav } from 'react-bootstrap';
import HomeVendor from './Home/HomeVendor';
const VendorLayout = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const handleToggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };
  const [selectedNavItem, setSelectedNavItem] = useState(1);
  const navItems = [
    { id: 1, name: 'Home', iconClass: 'fa fa-home' },
    { id: 2, name: 'Products', iconClass: 'fa fa-users' },
    { id: 3, name: 'Statistics', iconClass: 'fa fa-user-shield' },
    { id: 4, name: 'My Profile', iconClass: 'fa fa-store' },
  ];
  // eslint-disable-next-line default-case
  let content = null;
  switch (selectedNavItem) {
    case 1: {
      content = <HomeVendor />;
      break;
    }
    // case 2:
    //   content = <Users />;
    //   break;
    // case 3:
    //   content = <UserLevels />;
    //   break;
    // case 4:
    //   content = <Stores />;
    //   break;
  }
  return (
    <div className="vendor-layout">
      <header className="topbar">
        <h3 className="shop-title">Vendor DashBoard</h3>
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
          <div className="nav-items-container">
            {navItems.map((item) => (
              <Nav.Link
                key={item.id}
                href={`#${item.name}`}
                className={`nav-item d-flex align-items-center justify-content-center${
                  selectedNavItem === item.id ? ' selected' : ''
                }`}
                onClick={() => setSelectedNavItem(item.id)}
              >
                <i className={item.iconClass}></i>
                {sidebarExpanded && <span className="nav-item-text">{item.name}</span>}{' '}
                {/* Change to custom class */}
              </Nav.Link>
            ))}
          </div>
          <div className="sidebar-footer">
            <button className="logout-btn">
              <BoxArrowInRight size={20} />
              <span>{sidebarExpanded && 'Logout'}</span>
            </button>
          </div>
        </aside>
        <main className="main-content">{content}</main>
      </div>
      <footer className="footer">Footer</footer>
    </div>
  );
};

export default VendorLayout;
