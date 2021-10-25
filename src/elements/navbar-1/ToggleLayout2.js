import React from 'react'

function ToggleLayout2(props) {
  
  function toggleLayout() {
    var {collapsed} = props.config
    props.setConfig('collapsed', !collapsed)
  }

  return (
    <ul className="nav nav-inline nav-toggle-layout-2">
      <li className="nav-item">
        <a className="nav-link toggle-layout" onClick={toggleLayout}>
          <i className="sli-menu" />
        </a>
      </li>
    </ul>
  )
}

export default ToggleLayout2;
