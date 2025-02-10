import React from 'react';
 import './header.css';
 import logo from '../images/context-logo.jpg';

const Header: React.FC = () => {
return(
    <>
    <>
  <div className="content-container">
    <img 
      style={{ marginBottom: '0px', marginTop:'20px', width:'60px', height:'60px', marginLeft:'-100px' }} 
      src={logo}  
      alt="Image Not found" 
    />
    <h2 className="h2-content">Context Directory</h2>
  </div>
</>

    </>);
}

export default Header;