import React from 'react'

import '../css/elements/widget.css'
function Widget({title, description, children}){
  return (
    <div className="widget dashboard-widget">
      <div className="row">
        <div className="col-12 col-md-9">
          <div className="title">{title}</div>
          <div
            className="description"
            dangerouslySetInnerHTML={{__html: description}}
          />
        </div>
        <div className="col-12 col-md-3 ml-auto text-right right-icons">
          <i className="material-icons">cached</i>
          <i className="material-icons">timeline</i>
        </div>
      </div>
      <div className="row">
        <div className="col">{children}</div>
      </div>
    </div>
  )
}

export default Widget
