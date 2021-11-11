import React from 'react'
import { useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios'
import ReactBSAlert from "react-bootstrap-sweetalert";
import '../../css/pages/form.css'
import Widget from '../../elements/Widget'
import Skeleton from '@yisheng90/react-loading';

import RolesTable from './RolesTable';

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
    
        var url = new URL(`http://129.159.99.152/develop-vendors/api/security-roles/`);
    
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
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los roles" + err);
        });
    }, []);

     //Renderizado condicional
    function RolesT() {
        return <RolesTable dataTable = {dataRoles} ip = {ip} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData}/>
    }

    //Para actualizar la tabla al insertar registro
    function updateAddData(){
        const params = {
        pvOptionCRUD: "R"
        };

        var url = new URL(`http://129.159.99.152/develop-vendors/api/security-roles/`);

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
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los roles" + err);
        });
    }

    return dataRoles.length === 0 ? (
        <div>
            <Skeleton height={25} />
            <Skeleton height="25px" />
            <Skeleton height="3rem" />
        </div>
    ) : (
        <Card>
            <CardHeader>
                <CardTitle tag="h4">Catálogo de Roles</CardTitle>
            </CardHeader>
            <CardBody>
                <RolesT />
            </CardBody>
        </Card>
    )

}

export default Roles