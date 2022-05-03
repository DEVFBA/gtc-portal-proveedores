import React, { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useLocation } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";

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
  Input,
} from "reactstrap";

function Pool({autoCloseAlert, autoCloseAlertCarga, hideAlert4}) {
    const ambiente = process.env.REACT_APP_ENVIRONMENT
    const history = useHistory();
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

    const location = useLocation();

    const [concepto, setConcepto] = useState("");
    const [conceptoState, setConceptoState] = useState("");
    const [pdf, setPdf] = useState(null);
  
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
        getData();
    }, []);

    useEffect(() => {
        //Descargamos la IP del usuario
        console.log(location.state.cfdis)
    }, []);

    const verifyLength = (value, length) => {
        if (value.length >= length) {
        return true;
        }
        return false;
    };

    const isValidated = () => {
        if (
            conceptoState === "has-success" 
        ) {
          return true;
        } else {
          if (conceptoState !== "has-success") {
            setConceptoState("text-danger");
          }
          return false;
        }
    };

    function registerClick() {
        if(isValidated()===true)
        {
           getDataPDF64()
        }
    }

    function getDataPDF64()
    {
        autoCloseAlertCarga("Cargando...")
        var pdfbase64 = ""
        if(pdf!==null)
        {
            let reader = new FileReader();
            let file = pdf;
            reader.onloadend = () => { 
                pdfbase64 = reader.result
                createPool(pdfbase64)
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        }
        else {
            createPool(pdfbase64)
        }
    }

    function createPool(pdfbase64)
    {
       var invoicesList = []
       for(var i=0; i<location.state.cfdis.length; i++)
       {
            invoicesList[i] = {
                uuid: location.state.cfdis[i].UUID
            }
       }

        const catRegister = {
            user: user,
            ip: ip,
            companyId: location.state.cfdis[0].Id_Company,
            vendorId: location.state.cfdis[0].Id_Vendor,
            concept: concepto,
            coverDetailFile: pdfbase64,
            invoices: invoicesList
        };

        console.log(catRegister)
        //var url = new URL(`http://localhost:8091/api/invoices-pool/save-invoice-pool`);
        var url = new URL(`${process.env.REACT_APP_API_URI}invoices-pool/save-invoice-pool`);

        fetch(url, {
            method: "POST",
            body: JSON.stringify(catRegister),
            headers: {
                "access-token": token,
                "Content-Type": "application/json",
            }
        })
        .then(function(response) {
            return response.ok ? response.json() : Promise.reject();
        })
        .then((data) => {
            console.log(data)
            if (data.errors) {
                console.log("Hubo un error al procesar tu solicitud")
            }
            else {
                hideAlert4()
                autoCloseAlert(data.data.message)
                history.push(ambiente + `/admin/invoices/`);
                //setTimeout(redireccionar, 3000);
            }
        });
    }

    function redireccionar() {
        history.push(ambiente + `/admin/invoices/`);
    }

    return (
        <div className="content">
            <Row>
                <Col md="12">
                <Card>
                    <CardHeader>
                        <CardTitle tag="h4">Crear Pool</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col sm = "6">
                                <h6>Proveedor</h6>
                                <Input
                                    type="text"
                                    value = {location.state.cfdis[0].Vendor}
                                    readOnly
                                /> 
                            </Col>
                            <Col sm = "6">
                                <FormGroup className={`form-group ${conceptoState}`}>
                                    <h6>Concepto *</h6>
                                    <Input
                                        type="text"
                                        name="valor"
                                        value = {concepto}
                                        onChange={(e) => {
                                            if (!verifyLength(e.target.value, 1)) {
                                                setConceptoState("text-danger");
                                            } else {
                                                setConceptoState("has-success");
                                            }
                                            setConcepto(e.target.value);
                                        }}
                                    /> 
                                    {conceptoState === "text-danger" ? (
                                        <label className="error">Este campo es requerido.</label>
                                    ) : null}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm = "6">
                                <h6>Listado de Facturas Seleccionadas</h6>
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>UUID</th>
                                                <th>Serie</th>
                                                <th>Folio</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {location.state.cfdis.map((item, i) => (
                                                <tr key={i}>
                                                    <td>{item.UUID}</td>
                                                    <td>{item.Serie}</td>
                                                    <td>{item.Folio}</td>
                                                    <td>{"$" + Intl.NumberFormat("en-IN").format(item.Total)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Col>
                            <Col sm = "6">
                                <FormGroup className={`form-group`}>
                                    <h6>Complemento Carátula</h6>
                                    <Input 
                                        className="form-control" 
                                        placeholder="Seleccionar PDF"
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e) => {
                                            setPdf(e.target.files[0]);
                                        }}
                                    />
                                </FormGroup>
                                <Button className="buttons btn-gtc btn-filter" color="primary" onClick={registerClick}>
                                    <i className="fa fa-angle-double-right btn-icon" />
                                    Crear Pool
                                </Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Pool;