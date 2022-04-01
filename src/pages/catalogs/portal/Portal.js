import React, { useState, useEffect } from "react";
import axios from 'axios'

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
} from "reactstrap";

import Select from "react-select";

import Skeleton from '@yisheng90/react-loading';

import EstatusAgreementsAS from "./EstatusAgreementsAS";
//import ZipCodes from "../sat/CFDIUses";

function CatalogosPortal({autoCloseAlert}) {
    //Para guardar los datos de los catálogos
    const [dataTable, setDataTable] = useState([]);

    //Guardar todos los catálogos para el select
    const [options, setOptions] = useState([]);

    //Guardar catalogo seleccionado para descargar su lista de opciones
    const [catalog, setCatalog] = useState("");

    //Para guardar los datos del catalogo seleccionado
    const [dataCatalog, setDataCatalog] = useState([]);

    const token = localStorage.getItem("Token");

    const [ip, setIP] = React.useState("");

    const [dataFind, setDataFind] = useState(true);

    const getData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        setIP(res.data.IPv4)
    }

    useEffect(() => {
        //Descargamos la IP del usuario
        getData()
    }, []);

    useEffect(() => {
        //Aqui vamos a descargar la lista de catalogos de la base de datos por primera vez
        const params = {
        pvOptionCRUD: "R",
        piIdCatalogType : 1,
        };

        var url = new URL(`${process.env.REACT_APP_API_URI}cat-catalogs/`);

        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        //console.log(url)

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
        
        //Creamos el arreglo de opciones para el select
        var optionsAux = [];
        var i;
        for(i=0; i<data.length; i++)
        {
            optionsAux.push({
            value: data[i].Component, label: data[i].Short_Desc 
            })
        }

        setOptions(optionsAux)
        
        //Guardamos el respaldo de los datos
        setDataTable(data);
        
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los catálogos" + err);
        });
    }, []);

    //Renderizado condicional
    function Catalog(props) {
        const catalog = props.component;
        console.log(catalog)
        if(catalog === "AgreementStatus")
        {
            if(dataFind === true)
            {
                return  <div>
                            <Skeleton height={25} />
                            <Skeleton height="25px" />
                            <Skeleton height="3rem" />
                        </div>
            }
            else if(dataCatalog.length === 0)
            {
                return  <div className ="no-data">
                            <h3>No hay datos</h3>
                        </div>
            }
            else {
                return <EstatusAgreementsAS dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        return <div></div>
    }

    //Nos servirá para pasarle los datos a la tabla ya descargados
    function updateData(datos){
        setDataFind(true)
        const params = {
            pvOptionCRUD: "R",
            pSpCatalog : datos.CRUD_References,
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
            console.log(data)
            setDataFind(false)
            setDataCatalog(data)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los catálogos" + err);
        });
    }

    //Para actualizar la tabla al insertar registro
    function updateAddData(){
        setDataFind(true)
        var datos = dataTable.find(o => o.Component === catalog)
        const params = {
        pvOptionCRUD: "R",
        pSpCatalog : datos.CRUD_References,
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
            setDataCatalog(data)
            setDataFind(false)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los catálogos" + err);
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle tag="h4">Catálogos del Portal</CardTitle>
            </CardHeader>
            <CardBody>
                <Select 
                    name=""
                    className="react-select"
                    placeholder = "Selecciona un catálogo para administrar sus configuraciones"
                    classNamePrefix="react-select"
                    options = {options}
                    onChange={(e) => {
                        setCatalog(e.value);
                        updateData(dataTable.find(o => o.Component === e.value))
                    }}
                />
                &nbsp;
                <Catalog component = {catalog} />
            </CardBody>
        </Card>
    )
}

export default CatalogosPortal;