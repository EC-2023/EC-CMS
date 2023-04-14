import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import './Sidebar.css';
const navItems = [
    { id: 1, name: 'Home', iconClass: 'fa fa-home' },
    { id: 2, name: 'Users', iconClass: 'fa fa-users' },
    { id: 3, name: 'User Level', iconClass: 'fa fa-user-shield' },
    { id: 4, name: 'Store', iconClass: 'fa fa-store' },
    { id: 5, name: 'Store Level', iconClass: 'fa fa-store-alt' },
    { id: 6, name: 'Delivery', iconClass: 'fa fa-truck' },
    { id: 7, name: 'Category', iconClass: 'fa fa-tags' },
    { id: 8, name: 'Commission', iconClass: 'fa fa-percentage' },
    { id: 9, name: 'Product', iconClass: 'fa fa-box-open' },
    { id: 10, name: 'Statistic', iconClass: 'fa fa-chart-line' },
];


const Sidebar = ({ selectedNavItem, setSelectedNavItem }) => {
    const [expanded, setExpanded] = useState(true);

    const toggleSidebar = () => {
        setExpanded(!expanded);
    };
    return (
        <Nav className={`sidebar d-flex flex-column${expanded ? '' : ' minimized'}`} activeKey="/home">
            <div className="sidebar-header d-flex align-items-center justify-content-between px-3 py-2">
                <span className="sidebar-title">{expanded ? 'Floren' : ''}</span>
                <button className="toggle-btn" onClick={toggleSidebar}>
                    <i className={`fa ${expanded ? 'fa-circle' : 'fa-circle'}`}></i>
                </button>
            </div>
            <div className="nav-items-container">
                {navItems.map((item) => (
                    <Nav.Link
                        key={item.id}
                        href={`#${item.name}`}
                        className={`nav-item d-flex align-items-center justify-content-center${selectedNavItem === item.id ? ' selected' : ''}`}
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
