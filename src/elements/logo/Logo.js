import React from 'react'
import {Link} from 'react-router-dom'
import '../../css/elements/logo.css'

const Logo = () => (
  <Link
    to="/admin/dashboard"
    className="logo d-flex justify-content-start align-items-center flex-nowrap">
    
    <span className="title">GTC Portal Proveedores</span>
  </Link>
)

export default Logo
