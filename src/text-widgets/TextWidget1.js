import React from 'react'
import PropTypes from 'prop-types'
import '../css/text-widgets/text-widget-1.css'

function TextWidget1({widget}){

  return (
    <div
      className={`text-widget-1 text-${widget.align} bg-${widget.bg} color-${widget.color} p-${widget.padding}`}>
      <div className="row align-items-center">
        <div className="col align-self-end">
          <span className={`title color-${widget.color}`}>{widget.title}</span>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col align-self-start">
          <div>
            <span className={`subtitle color-${widget.color}`}>{widget.subtitle}</span>
            <span className={`percent color-${widget.percentColor}`}>({widget.percent})</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextWidget1
