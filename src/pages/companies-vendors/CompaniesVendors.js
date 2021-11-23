import React from 'react'
import { useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios'
import '../../css/pages/form.css'
import Widget from '../../elements/Widget'
import Skeleton from '@yisheng90/react-loading';

import CompaniesVendorsTable from './CompaniesVendorsTable';

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
import { data } from 'jquery';

function CompaniesVendors({autoCloseAlert}){
    //Para guardar los datos de las companies - vendors
    const [dataCompaniesVendors, setDataCompaniesVendors] = useState([]);

    //Para guardar los datos de los vendors
    const [dataVendors, setDataVendors] = useState([]);

    //Para guardar los datos de las compañias
    const [dataCompanies, setDataCompanies] = useState([]);

    //Para guardar el token de la sesión
    const token = localStorage.getItem("Token");

    //Para guardar la direccion IP del usuario
    const [ip, setIP] = React.useState("");

    //Para guardar los datos de los paises
    const [dataCountries, setDataCountries] = useState([]);

    const [pathLogo, setPathLogo] = useState("");

    const [profilePath, setProfilePath] = useState("");

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
    
        var url = new URL(`http://129.159.99.152/develop-vendors/api/companies-vendors/`);
    
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
            setDataCompaniesVendors(data)
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
    
        var url = new URL(`http://129.159.99.152/develop-vendors/api/companies/`);
    
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
            var optionsAux = [];
            var i;
            for(i=0; i<data.length; i++)
            {
              optionsAux.push({
                value: data[i].Id_Company, label: data[i].Name
              })
            }
            setDataCompanies(optionsAux)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de las companies" + err);
        });
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
            alert("No se pudo consultar la informacion de las vendors" + err);
        });
    }, []);

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
    function CompaniesVendorsT() {
        return <CompaniesVendorsTable dataTable = {dataCompaniesVendors} ip = {ip}  autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData} dataCompanies = {dataCompanies} dataVendors = {dataVendors} dataCountries = {dataCountries} pathLogo = {pathLogo} profilePath = {profilePath} updateCompany = {updateCompany} updateVendors = {updateVendors}/>
    }

    //Para actualizar la tabla al insertar registro
    function updateAddData(){
        const params = {
        pvOptionCRUD: "R"
        };

        var url = new URL(`http://129.159.99.152/develop-vendors/api/companies-vendors/`);

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
        setDataCompaniesVendors(data)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los usuarios" + err);
        });
    }

    function updateCompany(){
        //Aqui vamos a descargar la lista de roles de la base de datos por primera vez
        const params = {
            pvOptionCRUD: "R"
        };
      
        var url = new URL(`http://129.159.99.152/develop-vendors/api/companies/`);
    
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
            var optionsAux = [];
            var i;
            for(i=0; i<data.length; i++)
            {
            optionsAux.push({
                value: data[i].Id_Company, label: data[i].Name
            })
            }
            setDataCompanies(optionsAux)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de las companies" + err);
        });
    }

    function updateVendors(){
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
              alert("No se pudo consultar la informacion de las vendors" + err);
          });
    }

    return dataCompaniesVendors.length === 0 ? (
        <div>
            <Skeleton height={25} />
            <Skeleton height="25px" />
            <Skeleton height="3rem" />
        </div>
    ) : (   
        <Card>
            <CardHeader>
                <CardTitle tag="h4">Catálogo de Proveedores - Compañías</CardTitle>
            </CardHeader>
            <CardBody>
                <CompaniesVendorsT />
            </CardBody>
        </Card>
    )

}

export default CompaniesVendors