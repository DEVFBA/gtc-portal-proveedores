import React, { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Skeleton from '@yisheng90/react-loading';

import axios from 'axios'
import '../../css/forms/react-datetime.css'
// reactstrap components
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
} from "reactstrap";

import GeneralParametersTable from "./GeneralParametersTable";
import Select from "react-select";

function CatGeneralParameters({autoCloseAlert}) {

    //Para guardar el token de la sesión
    const token = localStorage.getItem("Token");
    const user = localStorage.getItem("User");
    const role = localStorage.getItem("Id_Role");
    
    //Para guardar los datos de los roles
    const [dataGeneralParameters, setDataGeneralParameters] = useState([]);

    //Para guardar los datos de los groupers
    const [dataGroupers, setDataGroupers] = useState([]);

    //Para guardar la direccion IP del usuario
    const [ip, setIP] = useState("");

    const [dataFind, setDataFind] = useState(false);

    const [filterGrouper, setFilterGrouper] = useState({});

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
        //Aqui vamos a descargar la lista de vendors de la base de datos 
       
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
            if(role === "SYSADMIN")
            {
                setDataGeneralParameters(data);
                getDataGroupers();
            }
            else {
                var dataGP = []
                var j = 0; 
                for(var i=0; i<data.length; i++)
                {
                    if(data[i].Type === "User")
                    {
                        dataGP[j] = data[i]
                        j++
                    }
                }
                setDataGeneralParameters(dataGP)
                getDataGroupers();
            }
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" de los parámetros generales. ")
        });
    }, []);

    function getDataGroupers()
    {
        //Aqui vamos a descargar la lista de vendors de la base de datos 
        var url = new URL(`${process.env.REACT_APP_API_URI}groupers/`);
        
        const params = {
            pvOptionCRUD: "R"
          };

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
           
            data.sort(function (a, b) {
                if (a.Long_Desc > b.Long_Desc) {
                  return 1;
                }
                if (a.Long_Desc < b.Long_Desc) {
                  return -1;
                }
                // a must be equal to b
                return 0;
            });
            var dataSelect = []

            for(var j=0; j<data.length; j++)
            {
                dataSelect[j] = {value: data[j].Id_Grouper, label: data[j].Long_Desc}
            }
            setDataGroupers(dataSelect)
            setDataFind(true);
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" de los groupers. ")
        });
    }

    function deleteClick(){
        setDataFind(false)
        //Aqui vamos a descargar la lista de registros de la base de datos por primera vez
        setFilterGrouper({})
        //Aqui vamos a descargar la lista de vendors de la base de datos 
        var url = new URL(`${process.env.REACT_APP_API_URI}general-parameters/`);
        const params = {
            pvOptionCRUD: "R"
          };

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
            if(role === "SYSADMIN")
            {
                setDataGeneralParameters(data)
                setDataFind(true);
            }
            else {
                var dataGP = []
                var j = 0; 
                for(var i=0; i<data.length; i++)
                {
                    if(data[i].Type === "User")
                    {
                        dataGP[j] = data[i]
                        j++
                    }
                }
                setDataGeneralParameters(dataGP)
                setDataFind(true);
            }
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" de los parámetros generales. ")
        });
    }

    function filterClick()
    {  
        const params = {
            pvidGrouper : filterGrouper.value,
        };

        setDataFind(false)

        var url = new URL(`${process.env.REACT_APP_API_URI}general-parameters/filter`);

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
            if(role === "SYSADMIN")
            {
                setDataGeneralParameters(data)
                setDataFind(true);
            }
            else {
                var dataGP = []
                var j = 0; 
                for(var i=0; i<data.length; i++)
                {
                    if(data[i].Type === "User")
                    {
                        dataGP[j] = data[i]
                        j++
                    }
                }
                setDataGeneralParameters(dataGP)
                setDataFind(true);
            }
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" de los parámetros generales. ")
        });
    }

    //Renderizado condicional
    function CatGeneralT() {
        return <GeneralParametersTable dataTable = {dataGeneralParameters} autoCloseAlert = {autoCloseAlert} updateAddData= {updateAddData} ip = {ip}/>
    }

    function updateAddData(){
        setDataFind(true)
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
            setDataGeneralParameters(data)
            setDataFind(true);
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" de los parámetros generales. ")
        });
    }

    return dataFind === false ? (
        <div className="content">
            <Row>
                <Col md="12">
                <Card>
                    <CardHeader>
                        <CardTitle tag="h4">Catálogo de Parámetros Generales</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <Row className="justify-content-center">  
                                <Col sm = "4">
                                    <FormGroup>
                                        <Label for="exampleSelect">Grouper </Label>
                                        <Select
                                            name=""
                                            className="react-select"
                                            placeholder="Selecciona un grouper"
                                            classNamePrefix="react-select"
                                            value={filterGrouper}
                                            onChange={(value) => {
                                                setFilterGrouper(value)
                                            }}
                                            options = {dataGroupers}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col sm = "4">
                                    <Button className="buttons btn-gtc btn-filter-gp" color="primary" onClick={filterClick}>
                                    <i className="fa fa-filter btn-icon" />
                                    Filtrar
                                    </Button>
                                </Col>
                                <Col sm = "4">
                                    <Button className="btn-outline buttons btn-gtc btn-filter-gp" color="primary" onClick={deleteClick}>
                                    <i className="ion-android-delete btn-icon" />
                                    Borrar Filtro
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
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
                </Card>
                </Col>
            </Row>
        </div>
    ): (
        <div className="content">
            <Row>
                <Col md="12">
                <Card>
                    <CardHeader>
                        <CardTitle tag="h4">Catálogo de Parámetros Generales</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <Row className="justify-content-center">  
                                <Col sm = "4">
                                    <FormGroup>
                                        <Label for="exampleSelect">Grouper </Label>
                                        <Select
                                            name=""
                                            className="react-select"
                                            placeholder="Selecciona un grouper"
                                            classNamePrefix="react-select"
                                            value={filterGrouper}
                                            onChange={(value) => {
                                                setFilterGrouper(value)
                                            }}
                                            options = {dataGroupers}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col sm = "4">
                                    <Button className="buttons btn-gtc btn-filter-gp" color="primary" onClick={filterClick}>
                                    <i className="fa fa-filter btn-icon" />
                                    Filtrar
                                    </Button>
                                </Col>
                                <Col sm = "4">
                                    <Button className="btn-outline buttons btn-gtc btn-filter-gp" color="primary" onClick={deleteClick}>
                                    <i className="ion-android-delete btn-icon" />
                                    Borrar Filtro
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    {dataGeneralParameters.length === 0 ? (
                        <div className ="no-data">
                            <h3>No hay datos</h3>
                        </div>
                    ): 
                        <CatGeneralT />
                    }
                    </CardBody>
                </Card>
                </Col>
            </Row>
        </div>
    )
}

export default CatGeneralParameters;