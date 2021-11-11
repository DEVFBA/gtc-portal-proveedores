import React from 'react'
import { useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios'
import '../../css/pages/form.css'
import Widget from '../../elements/Widget'
import Skeleton from '@yisheng90/react-loading';

import UsersTable from './UsersTable';

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

function Users({autoCloseAlert}){
    //Para guardar los datos de los usuarios
    const [dataUsers, setDataUsers] = useState([]);

    //Para guardar el token de la sesión
    const token = localStorage.getItem("Token");

    //Para guardar la direccion IP del usuario
    const [ip, setIP] = React.useState("");

    //Para guardar los datos de los roles
    const [dataRoles, setDataRoles] = useState([]);

    //Para guardar los datos de los vendors
    const [dataVendors, setDataVendors] = useState([]);

    //Para los dias de vigencia de la contraseña
    const [validDays, setValidDays] = useState();

    //Para guardar el path de las imágenes
    const [pathImage, setPathImage] = useState([]);

    const [profilePath, setProfilePath] = useState("")

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
        //Aqui vamos a descargar la lista de usuarios de la base de datos por primera vez
        const params = {
          pvOptionCRUD: "R"
        };
    
        var url = new URL(`http://129.159.99.152/develop-vendors/api/security-users/`);
    
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
          setDataUsers(data)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los usuarios" + err);
        });
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
            //Creamos el arreglo de roles para el select
            var optionsAux = [];
            var i;
            for(i=0; i<data.length; i++)
            {
              optionsAux.push({
                value: data[i].Id_Role, label: data[i].Short_Desc 
              })
            }
            setDataRoles(optionsAux)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los roles" + err);
        });
    }, []);

    useEffect(() => {
        //Aqui vamos a descargar la lista de customers de la base de datos por primera vez
        const params = {
          pvOptionCRUD: "R"
        };
    
        var url = new URL(`http://129.159.99.152/develop-vendors/api/vendors/`);
    
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
            //Creamos el arreglo de customers para el select
            var optionsAux = [];
            var i;
            for(i=0; i<data.length; i++)
            {
              optionsAux.push({
                value: data[i].Id_Vendor, label: data[i].Name
              })
            }
            setDataVendors(optionsAux)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los vendors" + err);
        });
    }, []);

    useEffect(() => {
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
            console.log(data)
            var aux = data.find( o => o.Id_Catalog === 1 )
            var aux2 = data.find( o => o.Id_Catalog === 4 )
            var aux3 = data.find( o => o.Id_Catalog === 6 )
            setValidDays(parseInt(aux.Value,10))
            setPathImage(aux2.Value)
            setProfilePath(aux3.Value)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los general parameters" + err);
        });
    }, []);

     //Renderizado condicional
    function UsersT() {
        return <UsersTable dataTable = {dataUsers} ip = {ip} dataRoles = {dataRoles} dataVendors = {dataVendors} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData} validDays={validDays} pathImage = {pathImage} profilePath ={profilePath}/>
    }

    //Para actualizar la tabla al insertar registro
    function updateAddData(){
        const params = {
        pvOptionCRUD: "R"
        };

        var url = new URL(`http://129.159.99.152/develop-vendors/api/security-users/`);

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
        //setLoaded(true)
        setDataUsers(data)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los usuarios" + err);
        });
    }

    return dataUsers.length === 0 ? (
        <div>
            <Skeleton height={25} />
            <Skeleton height="25px" />
            <Skeleton height="3rem" />
        </div>
    ) : (   
        <Card>
            <CardHeader>
                <CardTitle tag="h4">Catálogo de Usuarios</CardTitle>
            </CardHeader>
            <CardBody>
                <UsersT />
            </CardBody>
        </Card>
    )

}

export default Users