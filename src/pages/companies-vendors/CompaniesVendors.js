import React from 'react'
import { useState, useEffect} from "react";
import axios from 'axios'
import '../../css/pages/form.css'
import Skeleton from '@yisheng90/react-loading';

import CompaniesVendorsTable from './CompaniesVendorsTable';
import ModalAddCompanyVendor from "./ModalAddCompanyVendor.js";
import ModalAddCompany2 from "./ModalAddCompany2";
import ModalAddVendor from ".//ModalAddVendor2";

import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
} from "reactstrap";

function CompaniesVendors({autoCloseAlert}){
    //Para guardar los datos de las companies - vendors
    const [dataCompaniesVendors, setDataCompaniesVendors] = useState([]);

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

    const [dataFind, setDataFind] = useState(true)

    //Para guardar los datos de los vendors
    const [dataVendors, setDataVendors] = useState([]);

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
    
        var url = new URL(`${process.env.REACT_APP_API_URI}companies-vendors/`);
    
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
            setDataCompaniesVendors(data);
            getDataCompanies();
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" de las compañías - proveedores. ")
        });
    }, []);

    function getDataCompanies()
    {
        //Aqui vamos a descargar la lista de roles de la base de datos por primera vez
        const params = {
            pvOptionCRUD: "R"
        };
      
        var url = new URL(`${process.env.REACT_APP_API_URI}companies/`);
    
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
      
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
            setDataCompanies(optionsAux);
            getDataVendors();
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" de las compañías. ")
        });
    }

    function getDataVendors()
    {
        //Aqui vamos a descargar la lista de roles de la base de datos por primera vez
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
            var optionsAux = [];
            var i;
            for(i=0; i<data.length; i++)
            {
                optionsAux.push({
                    value: data[i].Id_Vendor, label: data[i].Name
                })
            }
            setDataVendors(optionsAux)
            getDataCountries();
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" de los proveedores. ")
        });
    }

    function getDataCountries()
    {
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
            setDataCountries(optionsAux);
            getDataGeneralParameters();
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" de los países. ")
        });
    }

   function getDataGeneralParameters()
   {
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
            setDataFind(false);
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" de los parámetros generales. ")
        });
    }
   
    //Renderizado condicional
    function CompaniesVendorsT() {
        return <CompaniesVendorsTable dataTable = {dataCompaniesVendors} ip = {ip}  autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData}  dataCountries = {dataCountries} pathLogo = {pathLogo} profilePath = {profilePath}/>
    }

    //Para actualizar la tabla al insertar registro
    function updateAddData(){
        setDataFind(true)

        const params = {
        pvOptionCRUD: "R"
        };

        var url = new URL(`${process.env.REACT_APP_API_URI}companies-vendors/`);

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
            setDataFind(false)
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" de las compañías - proveedores. ")
        });
    }

    function updateCompanies(){
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
            setDataError(true);
            setDataErrorMessage(" de las compañías. ")
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
        console.log(modalAddRecord)
    }

    const [modalAddCompany, setModalAddCompany] = useState(false);
    const [modalAddVendor, setModalAddVendor] = useState(false);

    function toggleModalAddCompany(){
        event.preventDefault();
        if(modalAddCompany == false){
            setModalAddCompany(true);
        }
        else{
            setModalAddCompany(false);
        }
    }

    function toggleModalAddVendor(){
        event.preventDefault();
        if(modalAddVendor == false){
            setModalAddVendor(true);
        }
        else{
            setModalAddVendor(false);
        }
    }

    const [mensajeAdd, setMensajeAdd] = useState("")
    const [mensajeAdd2, setMensajeAdd2] = useState("")

    //Para actualizar el vendor en el select si es que se agrega una compañia o proveedor desde aqui
    const [companyE, setCompanyE] = useState({});
    const [vendorE, setVendorE] = useState({});

    function updateVendors(){
        //Aqui vamos a descargar la lista de roles de la base de datos por primera vez
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
            setDataError(true);
            setDataErrorMessage(" de los proveedores. ")
        });
    }

    return dataFind === true ? (
        <Card>
            <CardHeader>
                <CardTitle tag="h4">Catálogo de Proveedores - Compañías</CardTitle>
            </CardHeader>
            <CardBody>
                <span className="input-group-btn rounded-left">
                    <button className="btn btn-primary btn-gtc" onClick={toggleModalAddRecord}>
                        <i className="ion-plus btn-icon"/>
                        Agregar Proveedor - Compañía 
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
            <ModalAddCompanyVendor modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord}  ip = {ip} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData} dataCompanies = {dataCompanies} dataVendors = {dataVendors} updateVendors = {updateVendors} companyE = {companyE} vendorE = {vendorE} toggleModalAddCompany = {toggleModalAddCompany} mensajeAdd = {mensajeAdd} toggleModalAddVendor = {toggleModalAddVendor} setCompanyE = {setCompanyE} setVendorE = {setVendorE} mensajeAdd2 = {mensajeAdd2}/>
            {/*MODAL PARA AÑADIR REGISTROS*/}
            <ModalAddCompany2 modalAddCompany = {modalAddCompany} setModalAddCompany= {setModalAddCompany} dataCountries = {dataCountries} updateCompanies = {updateCompanies} pathLogo = {pathLogo} ip = {ip} autoCloseAlert = {autoCloseAlert}  setCompanyE = {setCompanyE} toggleModalAddRecord = {toggleModalAddRecord} setModalAddRecord = {setModalAddRecord} setMensajeAdd = {setMensajeAdd}/>
            {/*MODAL PARA AÑADIR REGISTROS*/}
            <ModalAddVendor modalAddVendor = {modalAddVendor} setModalAddVendor = {setModalAddVendor}  ip = {ip} autoCloseAlert = {autoCloseAlert} dataCountries = {dataCountries} setVendorE = {setVendorE} toggleModalAddRecord = {toggleModalAddRecord} setModalAddRecord = {setModalAddRecord} setMensajeAdd2 = {setMensajeAdd2} updateVendors = {updateVendors}/>
        </Card>
    ) : (   
        <Card>
            <CardHeader>
                <CardTitle tag="h4">Catálogo de Proveedores - Compañías</CardTitle>
            </CardHeader>
            <CardBody>
                <span className="input-group-btn rounded-left">
                    <button className="btn btn-primary btn-gtc" onClick={toggleModalAddRecord}>
                        <i className="ion-plus btn-icon"/>
                        Agregar Proveedor - Compañía 
                    </button>
                </span>
                &nbsp;
                {dataCompaniesVendors.length === 0 ? (
                  <div className ="no-data">
                    <h3>No hay datos</h3>
                  </div>
                ): 
                    <CompaniesVendorsT />
                }
            </CardBody>
            {/*MODAL PARA AÑADIR REGISTROS*/}
            <ModalAddCompanyVendor modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord}  ip = {ip} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData} dataCompanies = {dataCompanies} dataVendors = {dataVendors} updateVendors = {updateVendors} companyE = {companyE} vendorE = {vendorE} toggleModalAddCompany = {toggleModalAddCompany} mensajeAdd = {mensajeAdd} toggleModalAddVendor = {toggleModalAddVendor} setCompanyE = {setCompanyE} setVendorE = {setVendorE} mensajeAdd2 = {mensajeAdd2}/>
            {/*MODAL PARA AÑADIR REGISTROS*/}
            <ModalAddCompany2 modalAddCompany = {modalAddCompany} setModalAddCompany= {setModalAddCompany} dataCountries = {dataCountries} updateCompanies = {updateCompanies} pathLogo = {pathLogo} ip = {ip} autoCloseAlert = {autoCloseAlert}  setCompanyE = {setCompanyE} toggleModalAddRecord = {toggleModalAddRecord} setModalAddRecord = {setModalAddRecord} setMensajeAdd = {setMensajeAdd}/>
            {/*MODAL PARA AÑADIR REGISTROS*/}
            <ModalAddVendor modalAddVendor = {modalAddVendor} setModalAddVendor = {setModalAddVendor}  ip = {ip} autoCloseAlert = {autoCloseAlert} dataCountries = {dataCountries} setVendorE = {setVendorE} toggleModalAddRecord = {toggleModalAddRecord} setModalAddRecord = {setModalAddRecord} setMensajeAdd2 = {setMensajeAdd2} updateVendors = {updateVendors}/>
        </Card>
    )

}

export default CompaniesVendors