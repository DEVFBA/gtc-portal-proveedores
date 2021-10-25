import React from 'react'
import Menu from './Menu'
import '../../css/elements/left-sidebar-1.css'

function LeftSidebar({navigation}){

  React.useEffect(() => {
    /*navigation.map((menu, i) => (
      console.log(menu)
    ))*/
  }, []);

  return (
    <div>
      <div className="left-sidebar-placeholder" />
      <div className="left-sidebar left-sidebar-1">
        <div className="wrapper">
          <div className="content">
            {navigation.map((menu, i) => (
              <div key={i} className="section">
                {/*<div className="section-title">{menu.name}</div>*/}
                <div className="section-title"></div>
                <ul className="list-unstyled">
                  {menu.views.map((views, i) => <Menu key={i} views={views} />)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftSidebar
