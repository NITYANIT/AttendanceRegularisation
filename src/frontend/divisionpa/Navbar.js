import React, { useState} from "react";
import { FiBell } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from '../../DRDO-logo.png';
// ../ goes from divisionpa to frontend

// another ../ goes from frontend to src

// then DRDO-logo.png is right inside src

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={"navbar"}>
      
      {/* <img src={logo} alt="DRDO-logo" className="logo" />
      <h1>DRDO</h1> */}
       <div class="navbar-left">
    <img  src={logo}  alt="DRDO Logo"   className="logo"/>
    <h1>DRDO</h1>
  </div>

      <div className="navbar-right">
        <Link to="/home" className="nav-link">
          Home
        </Link>

        {/* <a
          href="#"
          className="nav-link"
          onClick={(e) => {
            e.preventDefault();
            setSidebarOpen(true);
          }}
        >
          Profile
        </a> */}
        <button
  className="nav-link"
  onClick={() => setSidebarOpen(true)}
>
  Profile
</button>


        <Link to="/logout" className="nav-link">
          Logout
        </Link>

        <FiBell className="bell-icon" />

        

        <div className="user-info">
          <img
            src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"
            alt="User Avatar"
            className="avatar"
          />
          <div className="user-details">
            <p className="user-name">Amit Mohanty</p>
            <p className="user-role">Division PA</p>
          </div>
        </div>
      </div>

      {sidebarOpen && (
        <>
          <div
            className="sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
            tabIndex={0}
            role="button"
            aria-label="Close sidebar"
            onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
          />
          <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
            <button
              className="close-btn"
              onClick={() => setSidebarOpen(false)}
            >
              ×
            </button>
            <h3>Profile Menu</h3>
            <ul>
              <li>
                <button className="sidebar-link">My Info</button>
              </li>
              <li>
                <button className="sidebar-link">Edit Profile</button>
              </li>
              <li>
                <button className="sidebar-link">Change Password</button>
              </li>
              <li>
                <button className="sidebar-link">Logout</button>
              </li>
            </ul>
          </aside>
        </>
      )}
    </div>
  );
};

export default Navbar;

