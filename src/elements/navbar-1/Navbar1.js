import React from 'react'
import { useState, useEffect } from "react";
import Logo from '../logo/Logo.js'
import Search from './Search'
import ToggleLayout1 from './ToggleLayout1'
import ToggleLayout2 from './ToggleLayout2'
import DropdownGrid from './DropdownGrid'
import DropdownTasks from './DropdownTasks'
import DropdownMessages from './DropdownMessages'
import DropdownUser from './DropdownUser'
import '../../css/elements/navbar-1.css'
import defaultImage from "../../assets/img/default-avatar.png";

function Navbar1({layout, setLayout})
{
  const [image, setImage] = React.useState("");
  const [name, setName] = React.useState("");
  const Logged = localStorage.getItem("Logged");
  const [routeProfile, setRouteProfile] = React.useState("");

  useEffect(() => {
    //Si el usuario no está loggeado no se va a descargar la imagen
    if(Logged === "true")
    {
      var user = localStorage.getItem("User");
      const token = localStorage.getItem("Token");
      var url = new URL(`http://129.159.99.152/develop-vendors/api/security-users/${user}`);
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
          setImage(data[0].Profile_Pic_Path)
          setName(data[0].Name)
          //console.log(data)
      })
      .catch(function(err) {
          alert("No se pudo consultar la informacion del usuario en sidebar" + err);
      });
    }  
  },[]);

  useEffect(() => {
    if(Logged === "true")
    {
      const token = localStorage.getItem("Token");
      //Aqui vamos a descargar la lista de general parameters para revisar la vigencia del password
      const params = {
        pvOptionCRUD: "R"
      };
  
      var url = new URL(`http://129.159.99.152/develop-vendors/api/general-parameters/`);
  
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
          var aux = data.find( o => o.Id_Catalog === 6)
          //console.log(aux.Value)
          setRouteProfile(aux.Value)
      })
      .catch(function(err) {
          alert("No se pudo consultar la informacion de la Profile_Picture" + err);
      });
    }
  }, []);
  
  return (
    <nav className="navbar navbar-1 d-flex justify-content-around align-items-center flex-nowrap">
      <Logo />
      <ToggleLayout1 layout = {layout} setLayout = {setLayout}/>
      <div className="separator" />
      <ul className="nav nav-inline nav-inline-2">
        <li className="nav-item nav-item-dropdown">
          <a className="nav-link nav-link-avatar">
            <span className="badge badge-sm badge-rounded badge-warning">1</span>
            {image !== "" ? (
              <div className="photo">
                <img 
                  src={routeProfile + image} 
                  className="rounded-circle"
                  alt="Avatar" />
              </div>
              ) : (
              <div className="photo">
                <img 
                  src={defaultImage} 
                  className="rounded-circle"
                  alt="Avatar" />
              </div>
              )
            }
          </a>
          <DropdownUser name = {name}/>
        </li>
        <li className="nav-item nav-item-dropdown">
          <a className="nav-link">
            <span className="flag flag-icon-background flag-icon"/>
          </a>
        </li>
      </ul>
      {/*<ToggleLayout2 layout = {layout} setLayout = {setLayout}/>*/}
    </nav>
  )
}
export default Navbar1
