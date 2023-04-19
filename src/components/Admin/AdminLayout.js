import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar/Sidebar';
import TopBar from './TopBar/TopBar';
import Footer from './Footer/Footer';
import './AdminLayout.css';
import Home from './Home/Home';
import Users from './Users/Users';
import UserLevels from './UserLevels/UserLevels';
import Products from './Products/Products';
import Commissions from './Commissions/Commissions';
import Categories from './Categories/Categories';
import Deliveries from './Deliveries/Deliveries';
import StoreLevels from './StoreLevels/StoreLevels';
import Stores from './Stores/Stores';
import Statistics from './Statistics/Statistics';

const AdminLayout = ({ children }) => {
  const [selectedNavItem, setSelectedNavItem] = useState(1);
  let content = null;
  switch (selectedNavItem) {
    case 1:
      content = <Home />;
      break;
    case 2:
      content = <Users />;
      break;
    case 3:
      content = <UserLevels />;
      break;
    case 4:
      content = <Stores />;
      break;
    case 5:
      content = <StoreLevels />;
      break;
    case 6:
      content = <Deliveries />;
      break;
    case 7:
      content = <Categories />;
      break;
    case 8:
      content = <Commissions />;
      break;
    case 9:
      content = <Products />;
      break;
    case 10:
      content = <Statistics />;
      break;
    // Add more cases as needed
    default:
      content = <Home />;
  }
  return (
    <div className="App d-flex">
      <Sidebar setSelectedNavItem={setSelectedNavItem} selectedNavItem={selectedNavItem} />
      <div className="d-flex flex-column w-100">
        <TopBar />
        {/* <Home /> */}
        {content}
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;