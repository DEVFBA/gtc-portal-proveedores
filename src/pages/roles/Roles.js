import React from 'react'
import { useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios'
import ReactBSAlert from "react-bootstrap-sweetalert";
import '../../css/pages/form.css'
import Widget from '../../elements/Widget'
import Skeleton from '@yisheng90/react-loading';

import RolesTable from './RolesTable';
import ModalAddRol from "./ModalAddRol";

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

function Roles({autoCloseAlert}){
    //Para guardar los datos de los usuarios
    const [dataRoles, setDataRoles] = useState([]);

    //Para guardar el token de la sesión
    const token = localStorage.getItem("Token");

    //Para guardar la direccion IP del usuario
    const [ip, setIP] = React.useState("");

    const [dataFind, setDataFind] = useState(true)

    const [modalAddRecord, setModalAddRecord] = useState(false);

    const getData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        setIP(res.data.IPv4)
      }
    
      useEffect(() => {
          //Descargamos la IP del usuario
          getData()
      }, []);

    useEffect(() => {
        //Aqui vamos a descargar la lista de roles de la base de datos por primera vez
        const params = {
          pvOptionCRUD: "R"
        };
    
        var url = new URL(`${process.env.REACT_APP_API_URI}security-roles/`);
    
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
            console.log(data)
            setDataRoles(data)
            setDataFind(false)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los roles" + err);
        });
    }, []);

     //Renderizado condicional
    function RolesT() {
        return <RolesTable dataTable = {dataRoles} ip = {ip} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData}/>
    }

    function toggleModalAddRecord(){
        if(modalAddRecord == false){
        setModalAddRecord(true);
        }
        else{
        setModalAddRecord(false);
        }
    }

    //Para actualizar la tabla al insertar registro
    function updateAddData(){
        const params = {
        pvOptionCRUD: "R"
        };

        var url = new URL(`${process.env.REACT_APP_API_URI}security-roles/`);

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
            console.log(data)
            setDataRoles(data)
            setDataFind(false)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los roles" + err);
        });
    }

    return dataFind === true ? (
        <Card>
            <CardHeader>
                <CardTitle tag="h4">Catálogo de Roles</CardTitle>
            </CardHeader>
            <CardBody>
                <span className="input-group-btn rounded-left">
                    <button className="btn btn-primary btn-gtc" onClick={toggleModalAddRecord}>
                        <i className="ion-plus btn-icon"/>
                        Agregar Rol 
                    </button>
                </span>
                &nbsp;
                <Skeleton height={25} />
                <Skeleton height="25px" />
                <Skeleton height="3rem" />
            </CardBody>
            <ModalAddRol modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord} ip = {ip} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData} />
        </Card>
    ) : (
        <Card>
            <CardHeader>
                <CardTitle tag="h4">Catálogo de Roles</CardTitle>
            </CardHeader>
            <CardBody>
                <span className="input-group-btn rounded-left">
                    <button className="btn btn-primary btn-gtc" onClick={toggleModalAddRecord}>
                        <i className="ion-plus btn-icon"/>
                        Agregar Rol 
                    </button>
                </span>
                &nbsp;
                {dataRoles.length === 0 ? (
                  <div className ="no-data">
                    <h3>No hay datos</h3>
                  </div>
                ): 
                    <RolesT />
                }
            </CardBody>
            <ModalAddRol modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord} ip = {ip} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData} />
        </Card>
    )

}

export default Roles