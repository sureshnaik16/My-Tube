import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import menu_icon from '../../assets/menu.png';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search.png';
import upload_icon from '../../assets/upload.png';
import more_icon from '../../assets/more.png';
import notification_icon from '../../assets/notification.png';
import profile_icon from '../../assets/jack.png';
import "./Navbar.css";

const Navbar = ({ setSidebar, sidebar }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const location=useLocation();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/query/${searchTerm}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

   useEffect(() => {
    setSearchTerm("");
  }, [location.pathname]);

  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <img className="menu-icon" onClick={() => setSidebar(!sidebar)} src={menu_icon} alt="menu_icon" />
        <Link to="/"><img className="logo" src={logo} alt="logo" /></Link>
      </div>

      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <img src={search_icon} alt="search_icon" onClick={handleSearch} style={{ cursor: "pointer" }} />
        </div>
      </div>

      <div className="nav-right flex-div">
        <img src={upload_icon} alt="upload_icon" />
        <img src={more_icon} alt="more_icon" />
        <img src={notification_icon} alt="notification_icon" />
        <img className="user-icon" src={profile_icon} alt="profile_icon" />
      </div>
    </nav>
  );
};

export default Navbar;
