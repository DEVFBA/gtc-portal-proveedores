import React, { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Skeleton from '@yisheng90/react-loading';

import axios from 'axios'
import '../../css/forms/react-datetime.css'

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

import CartaPorteRequestsTable from "./CartaPorteRequestsTable";

function CartaPorteRequests({autoCloseAlert}) {

  //Para guardar el token de la sesión
  const token = localStorage.getItem("Token");
  const idRole = localStorage.getItem("Id_Role");
  const vendor = localStorage.getItem("Id_Vendor");

  //Para guardar los datos del rol logueado
  const [dataRol, setDataRol] = useState();
 
  //Para guardar los datos de los roles
  const [dataCartaPorteRequests, setDataCartaPorteRequests] = useState([]);
  
  const [dataFind, setDataFind] = useState(false);

  useEffect(() => {
    var url = new URL(`${process.env.REACT_APP_API_URI}security-roles/${idRole}`);

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
        setDataRol(data)
        getCartaPorteRequests(data[0])
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion del rol logueado" + err);
        
    });
  }, []); 

  function getCartaPorteRequests(dataRole)
  {
    //Aqui vamos a descargar la lista de vendors de la base de datos 
    //var url = new URL(`${process.env.REACT_APP_API_URI}vendors/`);
    if(dataRole.Show_Customers === true)
    {
      var url = new URL(`${process.env.REACT_APP_API_URI}carta-porte-requests/`);

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
        setDataCartaPorteRequests(data)
        console.log(data)
        setDataFind(true)
      })
      .catch(function(err) {
        alert("No se pudo consultar la informacion de las vendors" + err);
      });
    }
    else {
      var url = new URL(`${process.env.REACT_APP_API_URI}carta-porte-requests/vendor/${vendor}`);

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
        setDataCartaPorteRequests(data)
        console.log(data)
        setDataFind(true)
      })
      .catch(function(err) {
        alert("No se pudo consultar la informacion de las vendors" + err);
      });
    }
  }

  //Renderizado condicional
  function CargaT() {
      return <CartaPorteRequestsTable dataTable = {dataCartaPorteRequests}/>
  }

  return dataFind === false ? (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
                <CardTitle tag="h4">Solicitud Carta Porte</CardTitle>
            </CardHeader>
            <CardBody>
              <Skeleton height={25} />
              <Skeleton height="25px" />
              <Skeleton height="3rem" />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  ): (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
                <CardTitle tag="h4">Solicitud Carta Porte</CardTitle>
            </CardHeader>
            <CardBody>
              {dataCartaPorteRequests.length === 0 ? (
                  <div className ="no-data">
                    <h3>No hay datos</h3>
                  </div>
              ): 
                <CargaT />
              }
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default CartaPorteRequests;