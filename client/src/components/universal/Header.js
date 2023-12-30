
import React from "react";
import { useLocation, NavLink ,useNavigate, Link} from "react-router-dom";
import { useSelector } from "react-redux";
import { ListGroup } from 'react-bootstrap';
import { FaBars,FaWarehouse, FaHandHoldingMedical, FaHospital, FaUsers, FaClinicMedical, FaBuilding, FaChartBar, FaQuestionCircle,FaHeartbeat, FaUserAlt, } from 'react-icons/fa';

const Header = ({ toggleSidebar }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.clear();
    alert("Logged Out!");
    navigate("/login");
  };

  return (
    <>
    <nav className="navbar">
      <div className="container-fluid" >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={toggleSidebar}
            
          >
            <FaBars />
          </button>
          <div className="navbar-brand h1" style={{ marginLeft: '15px' }}>
            <FaHeartbeat /> Transfusion Hub
            <ul className="navbar-nav flex-row">
            <li className="nav-item mx-3">
            <Link to="/about" className="nav-link" >
        About
      </Link>
      </li>
      <li className="nav-item mx-3">
            <Link to="/contact" className="nav-link" >
        Contact
      </Link>
      </li>
      </ul>
          </div>
        </div>
          <ul className="navbar-nav flex-row">
            <li className="nav-item mx-3">
              <p className="nav-link" >
                <FaUserAlt /> 
                Welcome {user?.name || user?.hospitalName || user?.organisationName} &nbsp;
                <span className="badge bg-secondary">{user?.role}</span>
              </p>
            </li>
            <li className="nav-item mx-3">
              <button className="btn btn-danger" onClick={handleLogout} style={{ transition: 'background-color 0.3s, box-shadow 0.3s' }}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};


export const Sidebar = ({ isOpen }) => {

  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const getIcon = (pathName) => {
    switch (pathName) {
      case '/':
        return <FaWarehouse />;
      case '/donor':
        return <FaHandHoldingMedical />;
      case '/hospital':
        return <FaHospital />;
      case '/donor-list':
        return <FaUsers />; // Icon for donor list
      case '/hospital-list':
        return <FaClinicMedical />; // Icon for hospital list
      case '/org-list':
      case '/organisation':
        return <FaBuilding />; // Icon for organisation
      case '/analytics':
        return <FaChartBar />; // Icon for analytics
      default:
        return <FaQuestionCircle />; // Default icon
    }
  };
  

  
    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
    
    
      <ListGroup>
        
        
        
        {/* Organisation role */}
        
        {user?.role === "organisation" && (
          <>
          <ListGroup.Item as={NavLink} to="/analytics" active={location.pathname === "/analytics"} className="d-flex align-items-center">
              {getIcon("/analytics")} Analytics
              </ListGroup.Item>
            <ListGroup.Item as={NavLink} to="/" active={location.pathname === "/"} className="d-flex align-items-center">
              {getIcon("/")} Inventory Records
            </ListGroup.Item>
            <ListGroup.Item as={NavLink} to="/donor" active={location.pathname === "/donor"} className="d-flex align-items-center">
              {getIcon("/donor")} Donors
            </ListGroup.Item>
            <ListGroup.Item as={NavLink} to="/hospital" active={location.pathname === "/hospital"} className="d-flex align-items-center">
              {getIcon("/hospital")} Medical Facilities
            </ListGroup.Item>
          </>
        )}

        {/* Admin role */}
        {user?.role === "admin" && (
          <>
          <ListGroup.Item as={NavLink} to="/analytics" active={location.pathname === "/analytics"} className="d-flex align-items-center">
              {getIcon("/analytics")} Analytics
              </ListGroup.Item>
              <ListGroup.Item as={NavLink} to="/" active={location.pathname === "/"} className="d-flex align-items-center">
              {getIcon("/")} Home
            </ListGroup.Item>
            <ListGroup.Item as={NavLink} to="/donor-list" active={location.pathname === "/donor-list"} className="d-flex align-items-center">
              {getIcon("/donor-list")} Donors
            </ListGroup.Item>
            <ListGroup.Item as={NavLink} to="/hospital-list" active={location.pathname === "/hospital-list"} className="d-flex align-items-center">
              {getIcon("/hospital-list")} Medical Facilities
            </ListGroup.Item>
            <ListGroup.Item as={NavLink} to="/org-list" active={location.pathname === "/org-list"} className="d-flex align-items-center">
              {getIcon("/org-list")} Organisations 
            </ListGroup.Item>
          </>
        )}

        {/* Donor role */}
        {(user?.role === "donor" || user?.role === "hospital")&& (
          <>
          <ListGroup.Item as={NavLink} to="/analytics" active={location.pathname === "/analytics"} className="d-flex align-items-center">
          {getIcon("/analytics")} Analytics
          </ListGroup.Item>
          <ListGroup.Item as={NavLink} to="/" active={location.pathname === "/"} className="d-flex align-items-center">
              {getIcon("/")} Inventory Records
            </ListGroup.Item>
          <ListGroup.Item as={NavLink} to="/organisation" active={location.pathname === "/organisation"} className="d-flex align-items-center">
            {getIcon("/organisation")} Organisations
          </ListGroup.Item>
          </>
        )}

        
      </ListGroup>
    </div>
    
  );
};




export default Header;
