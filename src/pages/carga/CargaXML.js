import React, { useState, useEffect } from "react";
import XmlTree from "./XmlTree";
import convert from 'xml-js';
import axios from 'axios'
import { useParams } from "react-router-dom";
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
  FormGroup,
  Form,
  Label,
  Input,
  Modal, 
  ModalBody, 
  ModalFooter,
  CardFooter
} from "reactstrap";

function CargaXML({pathFile}) {
  

  const { uUID } = useParams();

  //Para guardar el archivo
  const [dataCartaPorte, setDataCartaPorte] = useState([]);

  const token = localStorage.getItem("Token");

  //Para guardar los datos de los usuarios
  const [dataXml, setDataXml] = useState([]);

  useEffect(() => {
    //Aqui vamos a descargar la lista de usuarios de la base de datos por primera vez
    const params = {
      pvOptionCRUD: "R"
    };

    var url = new URL(`http://129.159.99.152/develop-vendors/api/carta-porte/${uUID}`);

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
      consultaXML(data[0].XML_Path)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de carta porte" + err);
    });
  }, [pathFile]);

  /*useEffect(() => {
    //Aqui vamos a descargar la lista de usuarios de la base de datos por primera vez
    //var url = new URL(pathFile + dataCartaPorte[0].XML_Path);
    
    var url = "http://129.159.99.152/DEV-Vendors/vendors/Carta_Porte/F1B4SO4BBB3-DB74-4C50-8B17-D7D6ADE15BCC.xml"
    const consultaXML = async(url) => {
      let response = await axios({ url })
      var options = {compact: false, ignoreComment: true, spaces: 4};
      const jsonString = convert.xml2json(response.data, options);
      const jsonData = JSON.parse(jsonString)
      setDataXml(jsonData.elements)
    }
    
    consultaXML(url)
  }, []);*/

  const consultaXML = async(doc) => {
    var url = pathFile + doc
    let response = await axios({ url })
    var options = {compact: false, ignoreComment: true, spaces: 4};
    const jsonString = convert.xml2json(response.data, options);
    const jsonData = JSON.parse(jsonString)
    setDataXml(jsonData.elements)
  }

  //Renderizado condicional
  function XmlTreeData() {
    return <XmlTree dataString = {dataXml}/>;
  }

  return dataXml.length === 0 ? (
    <>
      <div>
          <Skeleton height={25} />
          <Skeleton height="25px" />
          <Skeleton height="3rem" />
      </div>
    </>
  ) : (
    <>
      <div>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Árbol del XML</CardTitle>
              </CardHeader>
              <CardBody>
                    <XmlTreeData />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CargaXML;