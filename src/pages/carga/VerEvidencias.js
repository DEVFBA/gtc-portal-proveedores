import React, { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Skeleton from '@yisheng90/react-loading';
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import fileDownload from 'js-file-download'

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
} from "reactstrap";

import Select from "react-select";
import { data } from "jquery";

function VerEvidencias() {
    const ambiente = process.env.REACT_APP_ENVIRONMENT
  
    //Para guardar el token de la sesión
    const token = localStorage.getItem("Token");

    const { uUID } = useParams();

    const [dataDocuments, setDataDocuments] = useState([]);
    
    useEffect(() => {

        var url = new URL(`${process.env.REACT_APP_API_URI}invoices/vendor-evidences/${uUID}/`);
        console.log(url)

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
            console.log(data.data.files)
            setDataDocuments(data.data.files)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de las evidencias" + err);
        });
       
    }, []);

    function registerClick(item){
        var fileName = item.fileType+"."+item.fileExtension
        var url = new URL(item.filePath);
        axios.get(url, {
            responseType: 'blob',
          })
          .then((res) => {
            fileDownload(res.data, fileName)
        })
    }

    async function downloadAll(){
        for(var i=0; i<dataDocuments.length; i++)
        {
            var fileName = dataDocuments[i].fileType+"."+dataDocuments[i].fileExtension
            var url = new URL(dataDocuments[i].filePath);
            await axios.get(url, {
                responseType: 'blob',
            })
            .then((res) => {
                console.log(res.data)
                fileDownload(res.data, fileName)
            })
        }
    }

    return (
        <div className="content">
            <Row>
                <Col md="12">
                <Card>
                    <CardHeader>
                        <CardTitle tag="h4">Descargar Evidencias</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col sm = "2">
                            </Col>
                            <Col sm = "8">
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Descripción</th>
                                                <th>Descarga</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataDocuments.map((item, i) => (
                                                <tr key={i}>
                                                    <td>{item.fileType}</td>
                                                    <td>
                                                        <button className="btn btn-primary btn-gtc" onClick={() => {
                                                            registerClick(item)
                                                            //handleDownload(item)
                                                        }}>
                                                            <i className="fa fa-download btn-icon" />
                                                            Descargar Archivo
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </Col>
                            <Col sm = "2">
                            </Col>
                        </Row>
                        <Row>
                            <Col sm = "7">
                            </Col>
                            <Col sm = "3">
                                <Button className="buttons btn-gtc btn-filter" color="primary" onClick={downloadAll}>
                                    <i className="fa fa-cloud-download btn-icon" />
                                    Descargar Todo
                                </Button>   
                            </Col>
                            <Col sm = "2">
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                </Col>
            </Row>
        </div>
    );
}

export default VerEvidencias;