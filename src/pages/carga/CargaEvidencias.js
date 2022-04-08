import React, { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useParams } from "react-router-dom";
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
  Form,
  Label,
  Input,
  Modal, 
  ModalBody, 
  ModalFooter,
  CardFooter
} from "reactstrap";

import Select from "react-select";

function CargaEvidencias({autoCloseAlert, trackerEProveedor}) {

    //Para guardar el token de la sesión
    const token = localStorage.getItem("Token");
    const user = localStorage.getItem("User");
    const { uUID } = useParams();
    const ambiente = process.env.REACT_APP_ENVIRONMENT
    const history = useHistory();

    //Para guardar la direccion IP del usuario
    const [ip, setIP] = useState("");

    const [theInputKey, setTheInputKey] = useState("");

    const length = trackerEProveedor.length;
    const [budget, setBudget] = useState(Array.from({ length }, () => null));
    const [budgetState, setBudgetState] = useState(Array.from({ length } , () => "has-success"));

    const [errorMessage, setErrorMessage] = useState(false)
  
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

    function registerClick(){
        event.preventDefault();

        var filesFlag = []
        for(var index=0; index<trackerEProveedor.length; index++)
        {
            if(budget[index] === null && trackerEProveedor[index].Mandatory === true)
            {
                setErrorMessage(true)
                filesFlag[index] = false;
            }
            else {
                setErrorMessage(false)
                filesFlag[index] = true;
            }
        }
        
        var allFiles = false
        for(var i=0; i<trackerEProveedor.length; i++)
        {
            if(filesFlag[i] === true)
            {
                allFiles = true;
            }
            else {
                allFiles = false
            }
        }

        if(allFiles === true)
        {
            getDataBase64()
        }
    }

    function getDataBase64()
    {
        var docsBase64 = []
        recursivaData64(docsBase64, 0)
    }

    function recursivaData64(arrayBase64, index)
    {
        //Caso base
        console.log(index)
        if(index === trackerEProveedor.length-1)
        {
            let reader = new FileReader();
            let file = budget[index];
            reader.onloadend = () => { 
                arrayBase64.push(reader.result)
                sendData(arrayBase64)
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        }
        else {
            let reader = new FileReader();
            let file = budget[index];
            reader.onloadend = () => { 
                arrayBase64.push(reader.result)
                recursivaData64(arrayBase64, index+1)
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        }
    } 

    function sendData(arrayBase64)
    {
        //AQUI vamos a enviar toda la información
        var filesFinal = []
        for(var i=0; i<trackerEProveedor.length; i++)
        {
            filesFinal[i] = {
                fileType: trackerEProveedor[i].Id_File_Type,
                fileBase64: arrayBase64[i]
            }
        }
       
        const params = {
            ip : ip,
            user : user,
            uuid : uUID,
            files : filesFinal
        };

        console.log(params)

        var url = new URL(`${process.env.REACT_APP_API_URI}files/save-files`);
        fetch(url, {
            method: "POST",
            body: JSON.stringify(params),
            headers: {
                "access-token": token,
                "Content-Type": "application/json",
            }
        })
        .then(function(response) {
            return response.ok ? response.json() : Promise.reject();
        })
        .then(function(data) {
            autoCloseAlert(data.data.message)
            history.push(ambiente + `/admin/invoices/`);
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de carta porte" + err);
        });
    }

    const handleInput = (inputEv, index) => {
        const value = inputEv.target.files[0];
        setBudget((state) => state.map((val, i) => (i !== index ? val : value)));
        setBudgetState((state) => state.map((val, i) => (i !== index ? val : "has-success")));
        //setErrorMessage(false)
    };

    return (
        <div className="content">
            <Row>
                <Col md="12">
                <Card>
                    <CardHeader>
                        <CardTitle tag="h4">Carga de Evidencias</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <Row className="justify-content-center">  
                                <Col>
                                    {/*inputs*/}
                                    {trackerEProveedor.map((item,index)=>{
                                        return <FormGroup className={`form-group ${budgetState[index]}`} key = {index}>
                                                    <h6>Selecciona archivo {item.File_Type} - {item.Extension.toUpperCase()} {item.Mandatory === true ? "*": null}</h6>
                                                    <Input  
                                                        key={theInputKey || ''}
                                                        className="form-control" 
                                                        placeholder="Seleccionar XML"
                                                        type="file"
                                                        accept={"." + item.Extension}
                                                        onChange={(e) => handleInput(e, index)}
                                                    />
                                                    {budgetState[index] === "text-danger" ? (
                                                        <label className="error">
                                                            Selecciona un documento {item.Extension.toUpperCase()} válido.
                                                        </label>
                                                    ) : null}
                                                </FormGroup>
                                    })}
                                    <FormGroup className={`form-group text-danger`}>
                                        {errorMessage === true ? (
                                            <label className="error">
                                                * Documentos requeridos.
                                            </label>
                                        ) : null}
                                    </FormGroup>
                                    <button className="btn btn-primary btn-gtc btn-carta-porte" onClick={registerClick}>
                                        <i className="ion-ios-upload-outline btn-icon"/>
                                        Cargar Archivos
                                    </button>
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                </Card>
                </Col>
            </Row>
        </div>
    )
}

export default CargaEvidencias;