import React, { useState, useEffect } from "react";
import XmlTree from "./XmlTree.js";

import convert from 'xml-js';

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

function Carga() {

  //Para guardar el archivo
  const [xml, setXml] = useState(null);

  //Para guardar los datos de los usuarios
  const [dataXml, setDataXml] = useState([]);

  const [xmlState, setXmlState] = useState("")

  useEffect(() => {
    //Aqui vamos a descargar la lista de registros de la base de datos por primera vez
  }, []);

  //Renderizado condicional
  function XmlTreeData() {
    return <XmlTree dataString = {dataXml}/>;
  }

  function uploadXml()
  {
    if(xml !== null)
    {
      let fileReader = new FileReader();
      fileReader.readAsText(xml);
      fileReader.onload = (event) => {
        //
        var options = {compact: false, ignoreComment: true, spaces: 4};
        const jsonString = convert.xml2json(event.target.result, options);
        const jsonData = JSON.parse(jsonString)
        setDataXml(jsonData.elements)
      };
    }
    else{
      if (xmlState !== "has-success") {
        setXmlState("has-danger");
      }
    }
  }

  return dataXml.length === 0 ? (
    <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Cargar archivo</CardTitle>
              </CardHeader>
              <CardBody>
                <Form> 
                  <Row> 
                    <Col>
                      <FormGroup className={`has-label ${xmlState}`}>
                        <Input 
                          className="form-control" 
                          type="file" id="fileUpload" 
                          accept=".xml" 
                          onChange={(e) => {
                            setXml(e.target.files[0]);
                            setXmlState("has-success")
                          }}/>
                        {xmlState === "has-danger" ? (
                          <label className="error">
                            Selecciona un documento válido.
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col>
                      <Button color="primary" onClick={uploadXml}>
                        Subir datos
                      </Button> 
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
  ) : (
    <div className="content">
      <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Cargar tu factura</CardTitle>
              </CardHeader>
              <CardBody>
                <Form> 
                  <Row> 
                    <Col>
                      <FormGroup className={`has-label ${xmlState}`}>
                        <Input 
                          className="form-control" 
                          type="file" id="fileUpload" 
                          accept=".xls, .xlsx, .csv" 
                          onChange={(e) => {
                            setXml(e.target.files[0]);
                            setXmlState("has-success")
                          }}/>
                        {xmlState === "has-danger" ? (
                          <label className="error">
                            Selecciona una factura válida.
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col>
                      <Button color="primary" onClick={uploadXml}>
                        Cargar
                      </Button> 
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Árbol del XML</CardTitle>
              </CardHeader>
              <CardBody>
                    <XmlTreeData />
              </CardBody>
              <CardFooter>
                <div className="center-side">
                    <Button className="buttons" color="primary" onClick={console.log("hola")}>
                        Aceptar
                    </Button>
                    <Button className="buttons" color="secondary" onClick={console.log("hola")}>
                        Cancelar
                    </Button>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
    </div>
  );
}

export default Carga;