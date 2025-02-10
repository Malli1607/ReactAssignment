import * as React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useLocation, Link } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { FaUser, FaBell, FaAddressCard } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";

import { useNavigate } from 'react-router-dom';
// import LineChart from './LineChart';
// import PieCharts from './PieCharts';
import GridLayout from './GridLayout';
import './home.css';

import BarChart from './BarChart';

import Table from './TableComponent';
import DeptTable from './DeptTable';

const Dashboard = () => <div></div>;
const UserProfile = () => <div><GridLayout /></div>;
const Users = () => <div><Table /></div>;
const Department = () => <div><DeptTable /></div>;

interface HomeProps {
  onLogout: () => void;
}

const Home: React.FC<HomeProps> = ({ onLogout }) => {
  const location = useLocation();
  const successMessage = location.state?.successMessage;

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [active, setActive] = React.useState('User Details');
  const [activeContent, setActiveContent] = React.useState(<UserProfile />);
  const [showProfileOptions, setShowProfileOptions] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);
  
  const navigate = useNavigate();

  
  const profileOptionsRef = React.useRef<HTMLDivElement | null>(null);
  const profileIconRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (successMessage) {
      setOpenSnackbar(true);
    }
  }, [successMessage]);

  const handleButtonClick = (content: any, buttonId: any) => {
    setActiveContent(content);
    setShowProfileOptions(false); 
    setShowNotifications(false);
    setActive(buttonId);
  };

  const toggleNotifications = () => {
    setShowNotifications(prev => !prev);
  };

  
  const toggleProfileOptions = () => {
    setShowProfileOptions(prev => !prev);
  };

  
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileOptionsRef.current && !profileOptionsRef.current.contains(event.target as Node) &&
        profileIconRef.current && !profileIconRef.current.contains(event.target as Node)
      ) {
        setShowProfileOptions(false);
      }
    };

    
    document.addEventListener('click', handleClickOutside);

 
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <>
      <div className='home-container'>
        <div className='side-bar'>
          <div className='side-container'>
            <div className='header'>
              <FaAddressCard className='home-logo' />
              <h2 className='h2'>Context Directory</h2>
            </div>
            <hr />
            <div className='home-buttons'>
              <Link to="#" className='side-button' onClick={() => handleButtonClick(<UserProfile />, 'User Details')}>
                <div className={active === 'User Details' ? 'dash-board-active' : 'dash-board'}>
                  <FaUser />
                  <span className='content'>User Details</span>
                </div>
              </Link>

              <Link to="#" className='side-button' onClick={() => handleButtonClick(<Dashboard />, 'DashBoard')}>
                <div className={active === 'DashBoard' ? 'dash-board-active' : 'dash-board'}>
                  <MdDashboard />
                  <span className='content'>DashBoard</span>
                </div>
              </Link>
              <Link to="#" className='side-button' onClick={() => handleButtonClick(<Users />, 'Users')}>
                <div className={active === 'Users' ? 'dash-board-active' : 'dash-board'}>
                  <FaUsers style={{ width: '20px' }} />
                  <span className='content'>Users</span>
                </div>
              </Link>
              <Link to="#" className='side-button' onClick={() => handleButtonClick(<Department />, 'Department')}>
                <div className={active === 'Department' ? 'dash-board-active' : 'dash-board'}>
                  <FaUsers style={{ width: '20px' }} />
                  <span className='content'>Department</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className='page'>
          <div className='page-header'>
            <span>{active}</span>
          </div>
          <div className="header-icons">
            <div className="icon" onClick={toggleNotifications}>
              <FaBell />
              {showNotifications && <div className="notification-popup">You have new notifications!</div>}
            </div>
            <div className="icon" onClick={toggleProfileOptions} ref={profileIconRef}>
              <FaUser style={{ marginTop: '-1px' }} />
              {showProfileOptions && (
                <div className="profile-options" ref={profileOptionsRef}>
                  <button onClick={() => console.log('User Profile')}>Profile</button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </div>

          <div className='active-content'>
            {activeContent}
          </div>
        </div>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
            {successMessage}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default Home;
