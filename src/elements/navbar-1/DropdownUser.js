import React from 'react'
import '../../css/elements/dropdown-user.css'
import { useLocation } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";

function DropdownUser({name})
{
  let items = [
    {
      icon: 'sli-power',
      iconColor: 'default',
      name: 'Logout',
      badge: false,
      badgeText: false,
      badgeClass: false,
    }
  ]

  const ambiente = "/DEV-Vendors"
  const location = useLocation();
  const history = useHistory();

  function logout() {
    localStorage.setItem("Logged", false);
    localStorage.removeItem("User");
    localStorage.removeItem("Id_Role");
    localStorage.removeItem("Id_Vendor");
    localStorage.removeItem("Token");
    history.push(ambiente+"/auth/login");
  }

  return (
    <div className="navbar-dropdown dropdown-user">
      <div className="dropdown-title">{name}</div>
        {/*<div className="dropdown-item">
          <i className="sli-envelope" />
          <span className="title">Inbox</span>
          <div className="separator" />
          <span className="badge badge-pill badge-raised badge-danger badge-sm">New</span>
        </div>
        <div className="dropdown-item">
          <i className="sli-star" />
          <span className="title">Messages</span>
          <div className="separator" />
          <span className="badge badge-info badge-rounded badge-sm">5</span>
        </div>
        <div className="dropdown-item">
          <i className="sli-settings" />
          <span className="title">Profile</span>
          <div className="separator" />
        </div>
        <div className="dropdown-item">
          <i className="sli-clock" />
          <span className="title">Lock Screen</span>
          <div className="separator" />
        </div>*/}
        <div className="dropdown-item" onClick={logout}>
          <i className="sli-power" />
          <span className="title">Cerrar Sesión</span>
          <div className="separator" />
        </div>
    </div>
  )
}

export default DropdownUser
