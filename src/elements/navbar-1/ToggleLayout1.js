import React from 'react'

function ToggleLayout1({layout, setLayout}) {
  
  function toggleLayout() {
    if (layout === 'default-sidebar-1') {
      setLayout('collapsed-sidebar-1')
    } else {
      setLayout('default-sidebar-1')
    }
    //props.setConfig('collapsed', false)
  }

  return (
    <ul className="nav nav-inline nav-toggle-layout-1">
      <li className="nav-item">
        <a className="nav-link toggle-layout" onClick={toggleLayout}>
          <i className="sli-menu" />
        </a>
      </li>
    </ul>
  )
}

export default ToggleLayout1;
