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

  const [showButtons, setShowButtons] = useState();

  //Para guardar la direccion IP del usuario
  const [ip, setIP] = useState("");

  const [dataTrackerReasons, setDataTrackerReasons] = useState([]);
  
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
      if(data.length === 0)
      {
        setDataInvoicesPools(data)
        setDataFind(true)
      }
      else {
        var dataAux = []
        dataAux.push(data[0])
        var dataAuxIndex = 0
        for(var i=1; i < data.length; i++)
        {
          if(data[i].Id_Invoice_Pool !== dataAux[dataAuxIndex].Id_Invoice_Pool)
          {
            dataAux.push(data[i])
            dataAuxIndex++
          }
        }
        //console.log(dataAux)
        console.log(dataAux)
        setDataInvoicesPools(dataAux)
        setDataFind(true)
      }
      
    })
    .catch(function(err) {
      alert("No se pudo consultar la informacion de los invoices pools" + err);
    });
  }, []);

  useEffect(() => {
    var url = new URL(`${process.env.REACT_APP_API_URI}workflow-tracker-reject-reasons/`);

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

      //console.log(data)
      //Creamos el arreglo de tracker reasons para el select
      var optionsAux = [];
      var i;
      for(i=0; i<data.length; i++)
      {
        optionsAux.push({
          value: data[i].Id_Reject_Reason, label: data[i].Reject_Reason
        })
      }
      //console.log(optionsAux)
      setDataTrackerReasons(optionsAux)
    })
    .catch(function(err) {
      alert("No se pudo consultar la informacion del endpoint Workflow Tracker Reasons " + err);
    });
  }, []);

  useEffect(() => {
    //Aqui vamos a descargar la lista de general parameters para revisar la vigencia del password
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
        var statusButtons = data.find( o => o.Id_Catalog === 39 )
        setShowButtons(statusButtons.Value)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los general parameters" + err);
    });
  }, []);

  function updateAddData(){
    setDataFind(false)
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
      var dataAux = []
      dataAux.push(data[0])
      var dataAuxIndex = 0
      for(var i=1; i < data.length; i++)
      {
        if(data[i].Id_Invoice_Pool !== dataAux[dataAuxIndex].Id_Invoice_Pool)
        {
          dataAux.push(data[i])
          dataAuxIndex++
        }
      }
      //console.log(dataAux)
      console.log(dataAux)
      setDataInvoicesPools(dataAux)
      setDataFind(true)
    })
    .catch(function(err) {
      alert("No se pudo consultar la informacion de los invoices pools" + err);
    });
  }

  //Renderizado condicional
  function CargaT() {
      return <InvoicesPoolsTable dataTable = {dataInvoicesPools} autoCloseAlert = {autoCloseAlert} ip = {ip} dataTrackerReasons = {dataTrackerReasons} showButtons = {showButtons} updateAddData = {updateAddData}/>
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