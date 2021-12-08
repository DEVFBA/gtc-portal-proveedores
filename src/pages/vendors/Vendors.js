import React from 'react'
import { useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios'
import '../../css/pages/form.css'
import Skeleton from '@yisheng90/react-loading';

import VendorsTable from './VendorsTable';
import ModalAddVendor from "./ModalAddVendor";

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

function Vendors({autoCloseAlert}){
    //Para guardar los datos de los usuarios
    const [dataVendors, setDataVendors] = useState([]);

    //Para guardar el token de la sesión
    const token = localStorage.getItem("Token");

    //Para guardar la direccion IP del usuario
    const [ip, setIP] = React.useState("");

    //Para guardar los lista de paises
    const [dataCountries, setDataCountries] = useState([]);

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
            console.log(data)
            setDataVendors(data)
            setDataFind(false)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de las vendors" + err);
        });
    }, []);

     //Renderizado condicional
    function VendorsT() {
        return <VendorsTable dataTable = {dataVendors} ip = {ip} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData} dataCountries = {dataCountries}/>
    }

    //Para actualizar la tabla al insertar registro
    function updateAddData(){
        setDataFind(true)

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
            console.log(data)
            setDataVendors(data)
            setDataFind(false)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de las vendors" + err);
        });
    }

    useEffect(() => {
        const params = {
          pvOptionCRUD: "R",
          pSpCatalog : "spSAT_Cat_Countries_CRUD_Records",
        };
    
        var url = new URL(`http://129.159.99.152/develop-vendors/api/cat-catalogs/catalog`);
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
          setDataCountries(optionsAux)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los catálogos" + err);
        });
    }, []);

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
                <CardTitle tag="h4">Catálogo de Proveedores</CardTitle>
            </CardHeader>
            <CardBody>
                <span className="input-group-btn rounded-left" >
                    <button className="btn btn-primary btn-gtc" onClick={toggleModalAddRecord}>
                        <i className="ion-plus btn-icon"/>
                        Agregar Proveedor 
                    </button>
                </span>
                &nbsp;
                <Skeleton height={25} />
                <Skeleton height="25px" />
                <Skeleton height="3rem" />
            </CardBody>
             {/*MODAL PARA AÑADIR REGISTROS*/}
             <ModalAddVendor modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord}  ip = {ip} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData} dataCountries = {dataCountries}/>
        </Card>
    ) : (
        <Card>
            <CardHeader>
                <CardTitle tag="h4">Catálogo de Proveedores</CardTitle>
            </CardHeader>
            <CardBody>
                <span className="input-group-btn rounded-left" >
                    <button className="btn btn-primary btn-gtc" onClick={toggleModalAddRecord}>
                        <i className="ion-plus btn-icon"/>
                        Agregar Proveedor 
                    </button>
                </span>
                &nbsp;
                {dataVendors.length === 0 ? (
                  <div className ="no-data">
                    <h3>No hay datos</h3>
                  </div>
                ): 
                    <VendorsT />
                }
            </CardBody>
             {/*MODAL PARA AÑADIR REGISTROS*/}
             <ModalAddVendor modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord}  ip = {ip} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData} dataCountries = {dataCountries}/>
        </Card>
    )

}

export default Vendors