import React from 'react'
import { useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios'
import '../../css/pages/form.css'
import Widget from '../../elements/Widget'
import Skeleton from '@yisheng90/react-loading';

import CompaniesTable from './CompaniesTable';
import ModalAddCompany from "./ModalAddCompany";

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

function Companies({autoCloseAlert}){
    //Para guardar los datos de los usuarios
    const [dataCompanies, setDataCompanies] = useState([]);

    //Para guardar los lista de paises
    const [dataCountries, setDataCountries] = useState([]);

    //Para guardar el token de la sesión
    const token = localStorage.getItem("Token");

    //Para guardar la direccion IP del usuario
    const [ip, setIP] = React.useState("");

    //Para guardar el path del logo
    const [pathLogo, setPathLogo] = React.useState("");

    //Para guardar el Retrieve del logo
    const [profilePath, setProfilePath] = React.useState("");

    const [dataFind, setDataFind] = useState(true)

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
            console.log(data)
            setDataCompanies(data)
            setDataFind(false)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de las companies" + err);
        });
    }, []);

    useEffect(() => {
        const params = {
          pvOptionCRUD: "R",
          pSpCatalog : "spSAT_Cat_Countries_CRUD_Records",
        };
    
        var url = new URL(`${process.env.REACT_APP_API_URI}cat-catalogs/catalog`);
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
          //Creamos el arreglo de opciones para el select
          var optionsAux = [];
          var i;
          for(i=0; i<data.length; i++)
          {
            optionsAux.push({
              value: data[i].Id_Catalog, label: data[i].Short_Desc 
            })
          }
          console.log(optionsAux)
          setDataCountries(optionsAux)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los catálogos" + err);
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
            var aux = data.find( o => o.Id_Catalog === 5 )
            var aux2 = data.find( o => o.Id_Catalog === 7 )
            setPathLogo(aux.Value)
            setProfilePath(aux2.Value)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los general parameters" + err);
        });
    }, []);

     //Renderizado condicional
    function CompaniesT() {
        return <CompaniesTable dataTable = {dataCompanies} ip = {ip} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData} dataCountries = {dataCountries} pathLogo = {pathLogo} profilePath = {profilePath}/>
    }

    //Para actualizar la tabla al insertar registro
    function updateAddData(){
        setDataFind(true)
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
            setDataFind(false)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de las companies" + err);
        });
    }

    const [modalAddRecord, setModalAddRecord] = useState(false);

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
                <CardTitle tag="h4">Catálogo de Compañías</CardTitle>
            </CardHeader>
            <CardBody>
                <span className="input-group-btn rounded-left">
                    <button className="btn btn-primary btn-gtc" onClick={toggleModalAddRecord}>
                        <i className="ion-plus btn-icon"/>
                        Agregar Compañía 
                    </button>
                </span>
                &nbsp;
                <Skeleton height={25} />
                <Skeleton height="25px" />
                <Skeleton height="3rem" />
            </CardBody>
            {/*MODAL PARA AÑADIR REGISTROS*/}
            <ModalAddCompany modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord} dataCountries = {dataCountries} updateAddData = {updateAddData} pathLogo = {pathLogo} ip = {ip} autoCloseAlert = {autoCloseAlert}  />
        </Card>
    ) : (
        <Card>
            <CardHeader>
                <CardTitle tag="h4">Catálogo de Compañías</CardTitle>
            </CardHeader>
            <CardBody>
                <span className="input-group-btn rounded-left">
                    <button className="btn btn-primary btn-gtc" onClick={toggleModalAddRecord}>
                        <i className="ion-plus btn-icon"/>
                        Agregar Compañía 
                    </button>
                </span>
                &nbsp;
                {dataCompanies.length === 0 ? (
                  <div className ="no-data">
                    <h3>No hay datos</h3>
                  </div>
                ): 
                    <CompaniesT />
                }
            </CardBody>
            {/*MODAL PARA AÑADIR REGISTROS*/}
            <ModalAddCompany modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord} dataCountries = {dataCountries} updateAddData = {updateAddData} pathLogo = {pathLogo} ip = {ip} autoCloseAlert = {autoCloseAlert}  />
        </Card>
    )

}

export default Companies