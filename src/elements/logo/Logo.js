import React from 'react'
import {Link} from 'react-router-dom'
import '../../css/elements/logo.css'

function Logo(){
  return (
    <Link
      to="/"
      className="logo d-flex justify-content-start align-items-center flex-nowrap">
      <i className="ion-android-home" />
      <span className="title gtc-title">PORTAL PROVEEDORES</span>
    </Link>
  )
}
export default Logo
