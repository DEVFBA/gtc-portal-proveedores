import React from 'react'
import { useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import '../../css/elements/logo.css'

function Logo({layout}){

  const [logo, setLogo] = useState("");
  const [logoSticky, setLogoSticky] = useState("");
  const token = localStorage.getItem("Token");

  useEffect(() => {
    //Aqui vamos a descargar la lista de vendors de la base de datos 
    const params = {
      pvOptionCRUD: "R"
    };
  
    var url = new URL(`${process.env.REACT_APP_API_URI}general-parameters/`);
  
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  
    fetch(url, {
        method: "GET",
        headers: {
            "access-token": token,
            "Content-Type": "application/json",
        }
    })
    .then(function(response) {
        return response.ok ? response.json() : Promise.reject();
    })
    .then(function(data) {
        var logoFavIconPath = data.find( o => o.Id_Catalog === 56 )
        var logoStickyPath = data.find( o => o.Id_Catalog === 60 )
        setLogo(logoFavIconPath.Value)
        setLogoSticky(logoStickyPath.Value)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los general parameters" + err);
    });
  }, []); 

  return (
    <Link
      to="/"
      className="logo d-flex justify-content-start align-items-center flex-nowrap">
      {/*<i className="ion-android-home" />*/}
      {layout === "default-sidebar-1" ? (
        <img className="logo-navbar" alt="" src={logo}/>
      ):(
        <img className="logo-navbar" alt="" src={logoSticky}/>
      )}
      
      {/*<span className="title gtc-title">PORTAL PROVEEDORES</span>*/}
    </Link>
  )
}
export default Logo
