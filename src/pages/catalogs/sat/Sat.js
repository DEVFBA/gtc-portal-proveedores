import React, { useState, useEffect } from "react";
import axios from 'axios'
import Widget from '../../../elements/Widget'
import Skeleton from '@yisheng90/react-loading';

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
import Customs from "./Customs";
import KeyProduct from "./KeyProduct";
import PaymentWays from "./PaymentWays";
import KeyUnit from "./KeyUnit";
import TariffFractions from "./TariffFractions";
import Taxes from "./Taxes";
import Incoterm from "./Incoterm";
import Currencies from "./Currencies";
import ReasonsTransfer from "./ReasonsTransfer";
import PaymentMethods from "./PaymentMethods";
import Countries from "./Countries";
import TaxRegimes from "./TaxRegimes";
import VoucherTypes from "./VoucherTypes";
import TypesOperation from "./TypesOperation";
import PetitionTypes from "./PetitionTypes";
import EntityTypes from "./EntityTypes";
import RelationshipTypes from "./RelationshipTypes";
import CustomsUnits from "./CustomsUnits";
import Localities from "./Localities";
import Municipalities from "./Municipalities";
import States from "./States";
import ZipCodes from "./ZipCodes";
import CFDIUses from "./CFDIUses";

function CatalogosSat({autoCloseAlert}) {
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
        piIdCatalogType : 2,
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
        if(catalog === "Customs")
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
                return <Customs dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "KeyProduct")
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
                return <KeyProduct dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "PaymentWays")
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
                return <PaymentWays dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "KeyUnit")
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
                return <KeyUnit dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "TariffFractions")
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
                return <TariffFractions dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "Taxes")
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
                return <Taxes dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "Incoterm")
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
                return <Incoterm dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "Currencies")
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
                return <Currencies dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "ReasonsTransfer")
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
                return <ReasonsTransfer dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "PaymentMethods")
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
                return <PaymentMethods dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "Countries")
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
                return <Countries dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "TaxRegimes")
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
                return <TaxRegimes dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "VoucherTypes")
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
                return <VoucherTypes dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "TypesOperation")
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
                return <TypesOperation dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "PetitionTypes")
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
                return <PetitionTypes dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "EntityTypes")
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
                return <EntityTypes dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "RelationshipTypes")
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
                return <RelationshipTypes dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "CustomsUnits")
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
                return <CustomsUnits dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "CFDIUses")
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
                return <CFDIUses dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "Municipalities")
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
                return <Municipalities dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "Locations")
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
                return <Localities dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "States")
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
                return <States dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "ZipCodes")
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
                return <ZipCodes dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
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
            setDataCatalog(data)
            setDataFind(false)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los catálogos" + err);
        });
    }

    //Para actualizar la tabla al insertar registro
    function updateAddData(){
        setDataFind(true)
        setDataCatalog([])
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
                        setDataCatalog([])
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

export default CatalogosSat;