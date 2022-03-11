import React, { useState, useEffect } from "react";
import axios from 'axios'
import Skeleton from '@yisheng90/react-loading';

import FileTransfer from "./FileTransfer";

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

function ExternalApplications({autoCloseAlert}) {
    //Para guardar los datos de los catálogos
    const [dataTable, setDataTable] = useState([]);

    //Guardar todos los catálogos para el select
    const [options, setOptions] = useState([]);

    //Guardar catalogo seleccionado para descargar su lista de opciones
    const [catalog, setCatalog] = React.useState("");

    //Para guardar los datos del catalogo seleccionado
    const [dataCatalog, setDataCatalog] = useState([]);
    const token = localStorage.getItem("Token");
    const user = localStorage.getItem("User");

    //Para verificar si no hay datos en algún catálogo
    const [dataFind, setDataFind] = useState(true)

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
        //Aqui vamos a descargar la lista de aplicaciones de la base de datos por primera vez
        var url = new URL(`${process.env.REACT_APP_API_URI}cat-applications/`);

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
            
            data.sort(function (a, b) {
                if (a.Short_Desc > b.Short_Desc) {
                  return 1;
                }
                if (a.Short_Desc < b.Short_Desc) {
                  return -1;
                }
                // a must be equal to b
                return 0;
              });
            console.log(data)
            //Creamos el arreglo de opciones para el select
            var optionsAux = [];
            var i;
            for(i=0; i<data.length; i++)
            {
                optionsAux.push({
                value: data[i].Id_Catalog, label: data[i].Short_Desc 
                })
            }

            setOptions(optionsAux)

            //Guardamos el respaldo de los datos
            setDataTable(data);
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de las aplicaciones" + err);
        });
    }, []);

    //Renderizado condicional
    function Catalog(props) {
        const catalog = props.component.label;
        console.log(catalog)
        if(catalog === "File Transfer")
        {
            console.log("ENTRE")
            if(dataCatalog.length === 0)
            {
                return  <div>
                            <Skeleton height={25} />
                            <Skeleton height="25px" />
                            <Skeleton height="3rem" />
                        </div>
            }
            else {
                return <FileTransfer dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        return <div></div>
    }

    //Nos servirá para pasarle los datos a la tabla ya descargados
    function updateData(datos){
        setDataFind(true)
        const params = {
            piIdApplication : datos,
            pvUser: user
        };

        var url = new URL(`${process.env.REACT_APP_API_URI}applications-settings`);
        
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
            setDataCatalog(data)
            setDataFind(false)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los catálogos" + err);
        });
    }

    //Para actualizar la tabla al actualizar un registro
    function updateAddData(){

        setDataCatalog([])

        const params = {
            piIdApplication: catalog.value,
            pvUser : user,
        };

        var url = new URL(`${process.env.REACT_APP_API_URI}applications-settings`);
       
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
                <CardTitle tag="h4">Aplicaciones Externas</CardTitle>
            </CardHeader>
            <CardBody>
                <Select 
                    name=""
                    className="react-select"
                    placeholder = "Selecciona un catálogo para administrar sus configuraciones"
                    classNamePrefix="react-select"
                    options = {options}
                    onChange={(e) => {
                        console.log(e)
                        setDataCatalog([])
                        setCatalog(e);
                        updateData(e.value)
                    }}
                />
                &nbsp;
                <Catalog component = {catalog} />
            </CardBody>
        </Card>
    )
}

export default ExternalApplications;