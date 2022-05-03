import React from 'react'
import { useState, useEffect} from "react";
import axios from 'axios'
import '../../css/pages/form.css'
import Skeleton from '@yisheng90/react-loading';

import UsersTable from './UsersTable';
import ModalAddUser from "./ModalAddUser.js";

import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
} from "reactstrap";

function Users({autoCloseAlert, changeImageP, setChangeImageP}){
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

    //Para guardar el path de las imágenes
    const [dataDepartments, setDataDepartments] = useState([]);

    const [profilePath, setProfilePath] = useState("")

    const [dataFind, setDataFind] = useState(true)

    const [modalAddRecord, setModalAddRecord] = useState(false);

    const [dataError, setDataError] = useState(false);
    
    const [dataErrorMessage, setDataErrorMessage] = useState("");

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
    
        var url = new URL(`${process.env.REACT_APP_API_URI}security-users/`);
    
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
          setDataUsers(data)
          getDataRoles()
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" de los usuarios. ")
        });
    }, []);

    function getDataRoles()
    {
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
            getDataVendors()
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" de los roles. ")
        });
    }

    function getDataVendors()
    {
        const params = {
            pvOptionCRUD: "R"
        };
    
        var url = new URL(`${process.env.REACT_APP_API_URI}vendors/`);
    
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
            setDataVendors(optionsAux);
            getDataDepartments();
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" de los proveedores. ")
        });
    }

    function getDataDepartments()
    {
        //Aqui vamos a descargar la lista de customers de la base de datos por primera vez
        const params = {
            pvOptionCRUD: "R"
        };
    
        var url = new URL(`${process.env.REACT_APP_API_URI}cat-departments/`);
    
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
                    value: data[i].Id_Catalog, label: data[i].Short_Desc
                })
            }
            setDataDepartments(optionsAux)
            getDataGeneralParameters()
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" de los departamentos. ")
        });
    }

    function getDataGeneralParameters()
    {
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
            var aux = data.find( o => o.Id_Catalog === 1 );
            var aux2 = data.find( o => o.Id_Catalog === 4 );
            var aux3 = data.find( o => o.Id_Catalog === 6 );
            setValidDays(parseInt(aux.Value,10))
            setPathImage(aux2.Value);
            setProfilePath(aux3.Value);
            setDataFind(false);
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" de los parámetros generales. ")
        });
    }

     //Renderizado condicional
    function UsersT() {
        return <UsersTable dataTable = {dataUsers} ip = {ip} dataRoles = {dataRoles} dataVendors = {dataVendors} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData} validDays={validDays} pathImage = {pathImage} profilePath ={profilePath} changeImageP = {changeImageP} setChangeImageP = {setChangeImageP} dataDepartments = {dataDepartments}/>
    }

    //Para actualizar la tabla al insertar registro
    function updateAddData(){
        setDataFind(true)
        const params = {
        pvOptionCRUD: "R"
        };

        var url = new URL(`${process.env.REACT_APP_API_URI}security-users/`);

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
            setDataFind(false)
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" de los usuarios. ")
        });
    }

    function toggleModalAddRecord(){
        if(modalAddRecord == false){
            setModalAddRecord(true);
        }
        else{
            setModalAddRecord(false);
        }
    }

    return dataFind === true ? (
        <Card>
            <CardHeader>
                <CardTitle tag="h4">Catálogo de Usuarios</CardTitle>
            </CardHeader>
            <CardBody>
                <span className="input-group-btn rounded-left">
                    <button className="btn btn-primary btn-gtc" onClick={toggleModalAddRecord}>
                        <i className="ion-plus btn-icon"/>
                        Agregar Usuario 
                    </button>
                </span>
                &nbsp;
                {dataError === true ? (
                    <div className ="no-data">
                        <h3>No se pudo descargar la información de {dataErrorMessage} Recarga la página.</h3>
                    </div>
                ):
                    <div>
                        <Skeleton height={25} />
                        <Skeleton height="25px" />
                        <Skeleton height="3rem" />
                    </div> 
                }
            </CardBody>
            {/*MODAL PARA AÑADIR REGISTROS*/}
            <ModalAddUser modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord} dataRoles = {dataRoles} dataVendors = {dataVendors} ip = {ip} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData} validDays = {validDays} pathImage = {pathImage} dataDepartments = {dataDepartments}/>
        </Card>
    ) : (   
        <Card>
            <CardHeader>
                <CardTitle tag="h4">Catálogo de Usuarios</CardTitle>
            </CardHeader>
            <CardBody>
                <span className="input-group-btn rounded-left">
                    <button className="btn btn-primary btn-gtc" onClick={toggleModalAddRecord}>
                        <i className="ion-plus btn-icon"/>
                        Agregar Usuario 
                    </button>
                </span>
                &nbsp;
                {dataUsers.length === 0 ? (
                  <div className ="no-data">
                    <h3>No hay datos</h3>
                  </div>
                ): 
                    <UsersT />
                }
            </CardBody>
            {/*MODAL PARA AÑADIR REGISTROS*/}
            <ModalAddUser modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord} dataRoles = {dataRoles} dataVendors = {dataVendors} ip = {ip} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData} validDays = {validDays} pathImage = {pathImage} dataDepartments = {dataDepartments}/>
        </Card>
    )

}

export default Users