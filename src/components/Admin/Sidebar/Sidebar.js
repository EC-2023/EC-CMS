import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import './Sidebar.css';
const navItems = [
  { id: 1, name: 'Home', iconClass: 'fa fa-home' },
  { id: 2, name: 'Users', iconClass: 'fa fa-users' },
  { id: 3, name: 'User Level', iconClass: 'fa fa-angle-double-up' },
  { id: 4, name: 'Store', iconClass: 'fa fa-paper-plane' },
  { id: 5, name: 'Store Level', iconClass: 'fa  fa-arrow-circle-up' },
  { id: 6, name: 'Delivery', iconClass: 'fa fa-truck' },
  { id: 7, name: 'Category', iconClass: 'fa fa-tags' },
  { id: 8, name: 'Commission', iconClass: 'fa fa-gift' },
  { id: 9, name: 'Product', iconClass: 'fa fa-th-large' },
  { id: 10, name: 'Order', iconClass: 'fa fa-solid fa-credit-card' },
  { id: 11, name: 'Statistic', iconClass: 'fa fa-solid fa-database' },
];

const Sidebar = ({ selectedNavItem, setSelectedNavItem }) => {
  const [expanded, setExpanded] = useState(true);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };
  return (
    <Nav className={`sidebar d-flex flex-column${expanded ? '' : ' minimized'}`} activeKey="/home">
      <div className="sidebar-header d-flex align-items-center justify-content-between px-3 py-2">
        <span className="sidebar-title" style={{ textAlign: 'center' }}>
          {expanded ? 'EC' : ''}{' '}
        </span>
        <button className="toggle-btn" onClick={toggleSidebar}>
          <i className={`fa ${expanded ? 'fa-circle' : 'fa-circle'}`}></i>
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
            {expanded && <span className="nav-item-text">{item.name}</span>} {/* Change to custom class */}
          </Nav.Link>
        ))}
      </div>
    </Nav>
  );
};

export default Sidebar;
