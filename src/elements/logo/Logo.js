import React from 'react'
import {Link} from 'react-router-dom'
import '../../css/elements/logo.css'

function Logo(){
  return (
    <Link
      to="/"
      className="logo d-flex justify-content-start align-items-center flex-nowrap">
      <i className="ion-document-text" />
      <span className="title">CARTA PORTE</span>
    </Link>
  )
}
export default Logo
