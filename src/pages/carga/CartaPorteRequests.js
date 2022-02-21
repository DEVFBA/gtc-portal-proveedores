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

import CartaPorteRequestsTable from "./CartaPorteRequestsTable";

function CartaPorteRequests({autoCloseAlert}) {

  //Para guardar el token de la sesión
  const token = localStorage.getItem("Token");
  const user = localStorage.getItem("User");
 
  //Para guardar los datos de los roles
  const [dataCartaPorteRequests, setDataCartaPorteRequests] = useState([]);

  const [dataCompanies, setDataCompanies] = useState([]);
  
  const [dataFind, setDataFind] = useState(false);

  //Para guardar la direccion IP del usuario
  const [ip, setIP] = useState("");
  
    const getData = async () => {
    //const res = await axios.get('https://geolocation-db.com/json/')
    //setIP(res.data.IPv4)

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
        //Aqui vamos a descargar la lista de vendors de la base de datos 
        //var url = new URL(`${process.env.REACT_APP_API_URI}vendors/`);
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
          setDataFind(true)
        })
        .catch(function(err) {
          alert("No se pudo consultar la informacion de las vendors" + err);
        });
    }, []);

    useEffect(() => {
      //Aqui vamos a descargar la lista de companies de la base de datos
      const params = {
        pvOptionCRUD: "R"
      };
    
      var url = new URL(`${process.env.REACT_APP_API_URI}companies/`);
    
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
          setDataCompanies(data)
          console.log(data)
      })
      .catch(function(err) {
          alert("No se pudo consultar la informacion de las companies" + err);
      });
    }, []);

    //Renderizado condicional
    function CargaT() {
        return <CartaPorteRequestsTable dataTable = {dataCartaPorteRequests} dataCompanies = {dataCompanies}/>
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
      {/*MODAL PARA AÑADIR REQUESTER*/}
      {/*<ModalAddRequester modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord} setRequester={setRequester} resetFileInput = {resetFileInput} resetFileInputPdf = {resetFileInputPdf}/>*/}
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
      {/*MODAL PARA AÑADIR REQUESTER*/}
      {/*<ModalAddRequester modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord} setRequester={setRequester} resetFileInput = {resetFileInput} resetFileInputPdf = {resetFileInputPdf}/>*/}
    </div>
  )
}

export default CartaPorteRequests;