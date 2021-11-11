import React, { useState, useEffect } from "react";
import axios from 'axios'
import Widget from '../../../elements/Widget'

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Modal, 
  ModalBody, 
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import Select from "react-select";

function CatalogosPortal({autoCloseAlert}) {
    //Para guardar los datos de los catálogos
    const [dataTable, setDataTable] = useState([]);

    //Guardar todos los catálogos para el select
    const [options, setOptions] = useState([]);

    //Guardar catalogo seleccionado para descargar su lista de opciones
    const [catalog, setCatalog] = React.useState("");

    //Para guardar los datos del catalogo seleccionado
    const [dataCatalog, setDataCatalog] = useState([]);
    const token = localStorage.getItem("Token");

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
        //Aqui vamos a descargar la lista de catalogos de la base de datos por primera vez
        const params = {
        pvOptionCRUD: "R",
        piIdCatalogType : 1,
        };

        var url = new URL(`http://129.159.99.152/develop-vendors/api/cat-catalogs/`);

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
        //console.log(data)
        
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
        return <div></div>
    }

    //Nos servirá para pasarle los datos a la tabla ya descargados
    function updateData(datos){
        const params = {
        pvOptionCRUD: "R",
        pSpCatalog : datos.CRUD_References,
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
        setDataCatalog(data)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los catálogos" + err);
        });
    }

    //Para actualizar la tabla al insertar registro
    function updateAddData(){
        var datos = dataTable.find(o => o.Component === catalog)
    
        const params = {
        pvOptionCRUD: "R",
        pSpCatalog : datos.CRUD_References,
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
        setDataCatalog(data)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los catálogos" + err);
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle tag="h4">Catálogos del SAT</CardTitle>
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
                <Catalog component = {catalog} />
            </CardBody>
        </Card>
    )
}

export default CatalogosPortal;