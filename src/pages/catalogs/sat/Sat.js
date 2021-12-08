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
        if(catalog === "Customs")
        {
            if(dataCatalog.length === 0)
            {
                return  <div>
                            <Skeleton height={25} />
                            <Skeleton height="25px" />
                            <Skeleton height="3rem" />
                        </div>
            }
            else {
                return <Customs dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "KeyProduct")
        {
            if(dataCatalog.length === 0)
            {
                return  <div>
                            <Skeleton height={25} />
                            <Skeleton height="25px" />
                            <Skeleton height="3rem" />
                        </div>
            }
            else {
                return <KeyProduct dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "PaymentWays")
        {
            if(dataCatalog.length === 0)
            {
                return  <div>
                            <Skeleton height={25} />
                            <Skeleton height="25px" />
                            <Skeleton height="3rem" />
                        </div>
            }
            else {
                return <PaymentWays dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "KeyUnit")
        {
            if(dataCatalog.length === 0)
            {
                return  <div>
                            <Skeleton height={25} />
                            <Skeleton height="25px" />
                            <Skeleton height="3rem" />
                        </div>
            }
            else {
                return <KeyUnit dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "TariffFractions")
        {
            if(dataCatalog.length === 0)
            {
                return  <div>
                            <Skeleton height={25} />
                            <Skeleton height="25px" />
                            <Skeleton height="3rem" />
                        </div>
            }
            else {
                return <TariffFractions dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "Taxes")
        {
            if(dataCatalog.length === 0)
            {
                return  <div>
                            <Skeleton height={25} />
                            <Skeleton height="25px" />
                            <Skeleton height="3rem" />
                        </div>
            }
            else {
                return <Taxes dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "Incoterm")
        {
            if(dataCatalog.length === 0)
            {
                return  <div>
                            <Skeleton height={25} />
                            <Skeleton height="25px" />
                            <Skeleton height="3rem" />
                        </div>
            }
            else {
                return <Incoterm dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "Currencies")
        {
            if(dataCatalog.length === 0)
            {
                return  <div>
                            <Skeleton height={25} />
                            <Skeleton height="25px" />
                            <Skeleton height="3rem" />
                        </div>
            }
            else {
                return <Currencies dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "ReasonsTransfer")
        {
            if(dataCatalog.length === 0)
            {
                return  <div>
                            <Skeleton height={25} />
                            <Skeleton height="25px" />
                            <Skeleton height="3rem" />
                        </div>
            }
            else {
                return <ReasonsTransfer dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "PaymentMethods")
        {
            if(dataCatalog.length === 0)
            {
                return  <div>
                            <Skeleton height={25} />
                            <Skeleton height="25px" />
                            <Skeleton height="3rem" />
                        </div>
            }
            else {
                return <PaymentMethods dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "Countries")
        {
            if(dataCatalog.length === 0)
            {
                return  <div>
                            <Skeleton height={25} />
                            <Skeleton height="25px" />
                            <Skeleton height="3rem" />
                        </div>
            }
            else {
                return <Countries dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "TaxRegimes")
        {
            if(dataCatalog.length === 0)
            {
                return  <div>
                            <Skeleton height={25} />
                            <Skeleton height="25px" />
                            <Skeleton height="3rem" />
                        </div>
            }
            else {
                return <TaxRegimes dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "VoucherTypes")
        {
            if(dataCatalog.length === 0)
            {
                return  <div>
                            <Skeleton height={25} />
                            <Skeleton height="25px" />
                            <Skeleton height="3rem" />
                        </div>
            }
            else {
                return <VoucherTypes dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "TypesOperation")
        {
            if(dataCatalog.length === 0)
            {
                return  <div>
                            <Skeleton height={25} />
                            <Skeleton height="25px" />
                            <Skeleton height="3rem" />
                        </div>
            }
            else {
                return <TypesOperation dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "PetitionTypes")
        {
            if(dataCatalog.length === 0)
            {
                return  <div>
                            <Skeleton height={25} />
                            <Skeleton height="25px" />
                            <Skeleton height="3rem" />
                        </div>
            }
            else {
                return <PetitionTypes dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "EntityTypes")
        {
            if(dataCatalog.length === 0)
            {
                return  <div>
                            <Skeleton height={25} />
                            <Skeleton height="25px" />
                            <Skeleton height="3rem" />
                        </div>
            }
            else {
                return <EntityTypes dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "RelationshipTypes")
        {
            if(dataCatalog.length === 0)
            {
                return  <div>
                            <Skeleton height={25} />
                            <Skeleton height="25px" />
                            <Skeleton height="3rem" />
                        </div>
            }
            else {
                return <RelationshipTypes dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "CustomsUnits")
        {
            if(dataCatalog.length === 0)
            {
                return  <div>
                            <Skeleton height={25} />
                            <Skeleton height="25px" />
                            <Skeleton height="3rem" />
                        </div>
            }
            else {
                return <CustomsUnits dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "CFDIUses")
        {
            if(dataCatalog.length === 0)
            {
                return  <div>
                            <Skeleton height={25} />
                            <Skeleton height="25px" />
                            <Skeleton height="3rem" />
                        </div>
            }
            else {
                return <CFDIUses dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "Municipalities")
        {
            if(dataCatalog.length === 0)
            {
                return  <div>
                            <Skeleton height={25} />
                            <Skeleton height="25px" />
                            <Skeleton height="3rem" />
                        </div>
            }
            else {
                return <Municipalities dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "Locations")
        {
            if(dataCatalog.length === 0)
            {
                return  <div>
                            <Skeleton height={25} />
                            <Skeleton height="25px" />
                            <Skeleton height="3rem" />
                        </div>
            }
            else {
                return <Localities dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "States")
        {
            if(dataCatalog.length === 0)
            {
                return  <div>
                            <Skeleton height={25} />
                            <Skeleton height="25px" />
                            <Skeleton height="3rem" />
                        </div>
            }
            else {
                return <States dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
            }
        }
        else if(catalog === "ZipCodes")
        {
            if(dataCatalog.length === 0)
            {
                return  <div>
                            <Skeleton height={25} />
                            <Skeleton height="25px" />
                            <Skeleton height="3rem" />
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
        setDataCatalog([])
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