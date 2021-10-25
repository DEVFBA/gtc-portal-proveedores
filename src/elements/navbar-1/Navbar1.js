import React from 'react'
import Logo from '../logo/Logo.js'
import Search from './Search'
import ToggleLayout1 from './ToggleLayout1'
import ToggleLayout2 from './ToggleLayout2'
import DropdownGrid from './DropdownGrid'
import DropdownTasks from './DropdownTasks'
import DropdownMessages from './DropdownMessages'
import DropdownUser from './DropdownUser'
import '../../css/elements/navbar-1.css'

function Navbar1({layout, setLayout})
{
  return (
    <nav className="navbar navbar-1 d-flex justify-content-around align-items-center flex-nowrap">
      <Logo />
      <ToggleLayout1 layout = {layout} setLayout = {setLayout}/>
      {/*<ul className="nav nav-inline nav-inline-1">
        <li className="nav-item nav-item-dropdown">
          <a className="nav-link">
            <i className="material-icons">fullscreen</i>
          </a>
          <DropdownGrid/>
        </li>
        <li className="nav-item nav-item-dropdown">
          <a className="nav-link">
            <i className="material-icons">rss_feed</i>
          </a>
          <DropdownTasks/>
        </li>
        <li className="nav-item nav-item-dropdown">
          <a className="nav-link nav-link-badge">
            <i className="material-icons">notifications_none</i>
            <span className="badge badge-sm badge-rounded badge-danger">3</span>
          </a>
          <DropdownMessages/>
        </li>
      </ul>*/}
      <div className="separator" />
      {/*<Search/>*/}
      <ul className="nav nav-inline nav-inline-2">
        <li className="nav-item nav-item-dropdown">
          <a className="nav-link nav-link-avatar">
            <span className="badge badge-sm badge-rounded badge-warning">1</span>
            <img
              src="/assets/faces/m7.png"
              className="rounded-circle"
              alt="avatar"
            />
          </a>
          <DropdownUser/>
        </li>
        <li className="nav-item nav-item-dropdown">
          <a className="nav-link">
            <span className="flag flag-icon-background flag-icon"/>
          </a>
        </li>
      </ul>
      {/*<ToggleLayout2 layout = {layout} setLayout = {setLayout}/>*/}
    </nav>
  )
}
export default Navbar1
