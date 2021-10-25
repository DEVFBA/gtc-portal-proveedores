import React, {Component} from 'react'
import { useState, useEffect } from "react";
import {Link} from 'react-router-dom'

function Menu({views}){
  const [isOpen, setIsOpen] = useState(false)
  
  function toggle() {
    setIsOpen(!isOpen)
  }
  
  return views.views.length === 0 ? (
      <li>
        <Link
          to={views.layout + views.path}
          className="btn btn-default btn-flat btn-sidebar btn-sidebar-1">
          <i className="material-icons">{views.icon}</i>
          <span className="title">{views.name}</span>
          {views.badge && (
            <span className={`ml-auto ${views.badge.className}`}>
              {views.badge.title}
            </span>
          )}
        </Link>
      </li>
  ) : (
    <li>
        <a
          className={
            isOpen
              ? 'btn btn-default btn-flat btn-sidebar btn-sidebar-1 has-children is-open'
              : 'btn btn-default btn-flat btn-sidebar btn-sidebar-1 has-children'
          }
          onClick={toggle}>
          <i className="material-icons">{views.icon}</i>
          <span className="title">{views.name}</span>
          {views.badge && (
            <span className={`ml-auto ${views.badge.className}`}>
              {views.badge.title}
            </span>
          )}
        </a>
        <ul className="list-unstyled">
          {views.views.map((view, k) => (
            <li key={k}>
              <Link
                to={view.layout + view.path}
                className="btn btn-default btn-flat btn-sidebar btn-sidebar-2">
                <i className="material-icons">{view.icon}</i>
                <span className="title">{view.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </li>
  )
}

export default Menu
