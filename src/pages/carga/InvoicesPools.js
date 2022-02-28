import React, { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Skeleton from '@yisheng90/react-loading';

import axios from 'axios'
import '../../css/forms/react-datetime.css'

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  FormGroup,
  Form,
  Label,
  Input,
  Modal, 
  ModalBody, 
  ModalFooter,
  CardFooter
} from "reactstrap";

import InvoicesPoolsTable from "./InvoicesPoolsTable";

function InvoicesPools({autoCloseAlert}) {

  //Para guardar el token de la sesión
  const token = localStorage.getItem("Token");
  
  //Para guardar los datos de los roles
  const [dataInvoicesPools, setDataInvoicesPools] = useState([]);
  
  const [dataFind, setDataFind] = useState(false);

  //Para guardar la direccion IP del usuario
  const [ip, setIP] = useState("");
  
  const getData = async () => {
    try{
        let response = await axios({
            method: 'get',
            url: "https://geolocation-db.com/json/",
            json: true
        })
        setIP(response.data.IPv4)
    } catch(err){
            return {
            mensaje: "Error al obtener IP",
            error: err
            }
    }
  }

  useEffect(() => {
      //Descargamos la IP del usuario
      getData()
  }, []);

  useEffect(() => {
    //var url = new URL(`http://localhost:8091/api/invoices-pool/`);
    var url = new URL(`${process.env.REACT_APP_API_URI}invoices-pool/`);

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
      setDataInvoicesPools(data)
      setDataFind(true)
    })
    .catch(function(err) {
      alert("No se pudo consultar la informacion de los invoices pools" + err);
    });
  }, []);

  //Renderizado condicional
  function CargaT() {
      return <InvoicesPoolsTable dataTable = {dataInvoicesPools} autoCloseAlert = {autoCloseAlert}/>
  }

  return dataFind === false ? (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
                <CardTitle tag="h4">Carátulas Facturas</CardTitle>
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
                <CardTitle tag="h4">Carátulas Facturas</CardTitle>
            </CardHeader>
            <CardBody>
              {dataInvoicesPools.length === 0 ? (
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

export default InvoicesPools;