import React from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import './TopBar.css';

const Topbar = () => {
    // Add a state to toggle between dark and light themes
    const [darkTheme, setDarkTheme] = React.useState(false);

    // Function to handle theme change
    const handleThemeChange = () => {
        setDarkTheme(!darkTheme);
    };
    return (
        <Navbar bg="light" expand="lg" className="topbar">
            <Navbar.Brand href="#home" className="topbar-title">
                Florentino
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <div className="topbar-nav">
                    <Nav className="ml-auto align-items-center">
                        <Nav.Link onClick={handleThemeChange}>
                            <i className={`fa ${darkTheme ? 'fa-sun' : 'fa-moon'}`}></i>
                        </Nav.Link>
                        <Dropdown> {/* Remove 'drop="left"' */}
                            <Dropdown.Toggle as={Nav.Link}>
                                <img src={"https://cdn-icons-png.flaticon.com/512/1077/1077114.png"} alt="Profile" className="profile-image" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu> {/* Add the custom class name */}
                                <Dropdown.Item href="#profile">Profile</Dropdown.Item>
                                <Dropdown.Item href="#logout">Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </div>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Topbar;
