import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ConnectedDatePicker from '../../forms/react-datetime/ConnectedDatePicker'
import 'bootstrap/dist/js/bootstrap.bundle.min';

import convert from 'xml-js';
import axios from 'axios'
import Widget from '../../elements/Widget'
import Skeleton from '@yisheng90/react-loading';
import '../../css/forms/react-datetime.css'
import CargaTable from './CargaTable';
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

import ReactDatetime from "../../forms/react-datetime/ReactDatetime";

function Carga({autoCloseAlert}) {

  //Para guardar el archivo
  const [xml, setXml] = useState(null);

  const [xmlState, setXmlState] = useState("")

  //Para guardar el token de la sesión
  const token = localStorage.getItem("Token");

  const user = localStorage.getItem("User");

  //Para guardar los datos de los roles
  const [dataCartaPorte, setDataCartaPorte] = useState([]);

  //Para guardar el path de los documentos
  const [pathFile, setPathFile] = useState("");

  //Para guardar los workflow types
  const [workflowTypes, setWorflowTypes] = useState([]);

  //Para guardar la direccion IP del usuario
  const [ip, setIP] = useState("");

  //Para guardar el estado del documento
  const [fileState, setFileState] = useState(null);

  //Para guardar el documento como tal
  const [fileUpload, setFileUpload] = useState();

  //Para guardar el UUID del documento
  const [uuid, setUuid] =  useState("");

  //Para guardar el Id Workflow del documento
  const [idWorkflow, setIdWorkflow] =  useState("");

  //Para guardar el Id_Vendor del documento
  const [idVendor, setIdVendor] =  useState("");

  //Para guardar el Id_Company del documento
  const [idCompany, setIdCompany] =  useState("");

  //Para guardar el Id_Receipt_Type del documento
  const [idReceiptType, setIdReceiptType] =  useState("");

  //Para guardar el Id_Entity_Type del documento
  const [idEntityType, setIdEntityType] =  useState("");

  //Para guardar la serie del documento
  const [serie, setSerie] =  useState("");

  //Para guardar el folio del documento
  const [folio, setFolio] =  useState("");

  //Para guardar el invoice date del documento
  const [invoiceDate, setInvoiceDate] =  useState("");

  //Para guardar el status del documento
  const [idWorkflowStatus, setIdWorkflowStatus] =  useState("");

  //Para guardar los Vendors
  const [dataVendors, setDataVendors] = useState([]);

  //Para guardar los datos de las compañias
  const [dataCompanies, setDataCompanies] = useState([]);

  //Para guardar los datos de las companies - vendors
  const [dataCompaniesVendors, setDataCompaniesVendors] = useState([]);

  //Para guardar los workflow tracker
  const [workflowTracker, setWorkflowTracker] = useState([]);

  //Variables para el filtro
  const [filterRfcCompany, setFilterRfcCompany] = useState("")
  const [filterRfcEmisor, setFilterRfcEmisor] = useState("")
  const [filterSerie, setFilterSerie] = useState("")
  const [filterFolio, setFilterFolio] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [filterUuid, setFilterUuid] = useState("")
  
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

  function _onChangeDateFrom(e) {
    setDateFrom(e.format('DD-MM-YYYY'))  
  }

  function _onChangeDateTo(e) {
    setDateTo(e.format('DD-MM-YYYY'))
  }

  useEffect(() => {
    //Aqui vamos a descargar la lista de registros de la base de datos por primera vez
    const params = {
      pvOptionCRUD: "R"
    };

    var url = new URL(`http://129.159.99.152/develop-vendors/api/carta-porte/`);

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
      setDataCartaPorte(data)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de carta porte" + err);
    });
  }, []);

useEffect(() => {
    //Aqui vamos a descargar la lista de vendors de la base de datos 
    const params = {
      pvOptionCRUD: "R"
    };

    var url = new URL(`http://129.159.99.152/develop-vendors/api/vendors/`);

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
        setDataVendors(data)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de las vendors" + err);
    });
}, []);

useEffect(() => {
  //Aqui vamos a descargar la lista de companies de la base de datos
  const params = {
    pvOptionCRUD: "R"
  };

  var url = new URL(`http://129.159.99.152/develop-vendors/api/companies/`);

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
      setDataCompanies(data)
  })
  .catch(function(err) {
      alert("No se pudo consultar la informacion de las companies" + err);
  });
}, []);

useEffect(() => {
  //Aqui vamos a descargar la lista de companies vendors de la base de datos
  const params = {
    pvOptionCRUD: "R"
  };

  var url = new URL(`http://129.159.99.152/develop-vendors/api/companies-vendors/`);

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
      setDataCompaniesVendors(data)
  })
  .catch(function(err) {
      alert("No se pudo consultar la informacion de las companies vendors" + err);
  });
}, []);

useEffect(() => {
  //Aqui vamos a descargar la lista de general parameters para revisar la vigencia del password
  const params = {
    pvOptionCRUD: "R"
  };

  var url = new URL(`http://129.159.99.152/develop-vendors/api/general-parameters/`);

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
      var aux = data.find( o => o.Id_Catalog === 8 )
      setPathFile(aux.Value)
  })
  .catch(function(err) {
      alert("No se pudo consultar la informacion de los general parameters" + err);
  });
}, []);

useEffect(() => {
  //Aqui vamos a descargar la lista de general parameters para revisar los workflow type
  const params = {
    pvOptionCRUD: "R"
  };

  var url = new URL(`http://129.159.99.152/develop-vendors/api/cat-workflow-type/`);

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
    var aux = data.find( o => o.Id_Catalog === "WF-CP" )
    setWorflowTypes(aux)
  })
  .catch(function(err) {
      alert("No se pudo consultar la informacion de los workflow types" + err);
  });
}, []);

useEffect(() => {
  //Aqui vamos a descargar la lista de general parameters para revisar los workflow type
  const params = {
    pvOptionCRUD: "R"
  };

  var url = new URL(`http://129.159.99.152/develop-vendors/api/workflow-tracker/`);

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
    setWorkflowTracker(data)
  })
  .catch(function(err) {
      alert("No se pudo consultar la informacion de los workflow tracker" + err);
  });
}, []);

function registerClick(){
  event.preventDefault();
  if(xml !== null)
  {
    let reader = new FileReader();
    let file = xml;

    reader.onloadend = () => { 
      setFileState(file);
      setFileUpload(reader.result)
      preData(reader.result, xml)
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }
  else {
    if (xmlState !== "has-success") {
      setXmlState("text-danger");
    }
  }
}

function preData(file, xml){
  //1. Leemos los datos del xml que nos serviran para el SP
  let fileReader = new FileReader();
  fileReader.readAsText(xml);
  fileReader.onload = (event) => {
    //
    var options = {compact: false, ignoreComment: true, spaces: 4};
    const jsonString = convert.xml2json(event.target.result, options);
    const jsonData = JSON.parse(jsonString)

    //Sacamos del documento algunos valores que necesitamos
    var elements = jsonData.elements[0].elements

    //Sacamos el UUID
    var complemento = elements.find( o => o.name === "cfdi:Complemento")
    var uuid;
    for(var i=0; i<complemento.elements.length; i++)
    {
      if(complemento.elements[i].name === "tfd:TimbreFiscalDigital")
      {
        uuid = complemento.elements[i].attributes.UUID
        setUuid(complemento.elements[i].attributes.UUID)
      }
    }

    //Para verificar que exista en Complemento el Tema de Carta Porte
    var cartaPorte = false
    for(var i=0; i<complemento.elements.length; i++)
    {
      if(complemento.elements[i].name === "cartaporte20:CartaPorte")
      {
        console.log("SI ENTRE A CARTA PORTE")
        cartaPorte = true
      }
    }

    //Sacamos el Rfc Emisor
    var emisor = elements.find( o => o.name === "cfdi:Emisor")
    setIdVendor(emisor.attributes.Rfc)

    //Sacamos el Rfc Receptor
    var receptor = elements.find( o => o.name === "cfdi:Receptor")
    setIdCompany(receptor.attributes.Rfc)

    //Sacamos el Id_Receipt_Type
    setIdReceiptType(jsonData.elements[0].attributes.TipoDeComprobante)

    //Sacamos el Id_Entity_Type
    var entity;
    if(emisor.attributes.Rfc.length === 12)
    {
      entity = "M"
    }
    else 
    {
      entity = "F"
    }

    //Sacamos la serie
    if(jsonData.elements[0].attributes.Serie !== undefined)
    {
      setSerie(jsonData.elements[0].attributes.Serie)
    }
    else {
      setSerie("")
    }

    //Sacamos el folio
    if(jsonData.elements[0].attributes.Folio !== undefined)
    {
      setFolio(jsonData.elements[0].attributes.Folio)
    }
    else{
      setFolio("")
    }
    

    //Sacamos la fecha
    setInvoiceDate(jsonData.elements[0].attributes.Fecha)

    //El estado por defecto del documento
    setIdWorkflowStatus(5)

    //Validamos que la compañia y el proveedor sea correcto, ademas que exista la relacion entre Companies - Vendors y sea activa
    var companyValid = false;
    var companyId;
    var vendorValid = false;
    var vendorId;
    for(var i = 0; i < dataCompanies.length; i++)
    {
      console.log(receptor.attributes.Rfc)
      if(dataCompanies[i].Tax_Id === receptor.attributes.Rfc)
      {
        companyId = dataCompanies[i].Id_Company
        companyValid = true;
      }
    }

    for(var j = 0; j < dataVendors.length; j++)
    {
      if(dataVendors[j].Tax_Id === emisor.attributes.Rfc)
      {
        vendorId = dataVendors[j].Id_Vendor
        vendorValid = true;
      }
    }

    console.log(vendorId)
    if(cartaPorte !== true)
    {
      autoCloseAlert("Error. El documento no es de Carta Porte. Verifique.")
    }
    else if(companyValid === false)
    {
      autoCloseAlert("Error. El Receptor no es válido. Verifique.")
    }
    else if(vendorValid === false)
    {
      autoCloseAlert("Error: Proveedor inexistente. Verifique’")
    }
    else{
      var companiesVendorsValid = false
      for(var k = 0; k < dataCompaniesVendors.length; k++)
      {
        if(dataCompaniesVendors[k].Id_Company === companyId && dataCompaniesVendors[k].Id_Vendor === vendorId && dataCompaniesVendors[k].Status === true)
        {
          companiesVendorsValid = true
          //uploadXml(file, complemento.elements[0].attributes.UUID, emisor.attributes.Rfc, receptor.attributes.Rfc, jsonData.elements[0].attributes.TipoDeComprobante, entity, jsonData.elements[0].attributes.Serie, jsonData.elements[0].attributes.Folio, jsonData.elements[0].attributes.Fecha)
        }
      }
      
      if(companiesVendorsValid === true)
      {
        if(jsonData.elements[0].attributes.Serie === undefined)
        {
          if(jsonData.elements[0].attributes.Folio === undefined)
          {
            uploadXml(file, uuid, vendorId, companyId, jsonData.elements[0].attributes.TipoDeComprobante, entity, "", "", jsonData.elements[0].attributes.Fecha)
          }
          else{
            uploadXml(file, uuid, vendorId, companyId, jsonData.elements[0].attributes.TipoDeComprobante, entity, "", jsonData.elements[0].attributes.Folio, jsonData.elements[0].attributes.Fecha)
          }
        }
        else {
          uploadXml(file, uuid, vendorId, companyId, jsonData.elements[0].attributes.TipoDeComprobante, entity, jsonData.elements[0].attributes.Serie, jsonData.elements[0].attributes.Folio, jsonData.elements[0].attributes.Fecha)
        }
      }
      else {
        autoCloseAlert("La relación entre Companies / Vendors es incorrecta. Valide.")
      }
    }
  };
}

  function uploadXml(file, uuid, idVendor, idCompany, idReceiptType, idEntityType, serie, folio, fecha)
  {
    /*console.log(file)
    console.log(pathFile)
    console.log(uuid)
    console.log(idVendor)
    console.log(idCompany)
    console.log(idReceiptType)
    console.log(idEntityType)
    console.log(serie)
    console.log(folio)
    console.log(fecha)
    console.log(idWorkflow)*/

    var f = new Date(fecha)
    var date = f.getDate();
    var month = f.getMonth() + 1
    var year = f.getFullYear()
    var finalDate2 = ""

    if(month < 10 && date < 10)
    {
        finalDate2 = "" + year + "0" + month + "0" + date;  
    }
    else if(date < 10)
    {
        finalDate2 = "" + year + "" + month + "0" + date;
    }
    else if(month < 10) 
    {  
        finalDate2 = "" + year + "0" + month + "" + date;
    }
    else{
        finalDate2 = "" + year + "" + month + "" + date;
    }

    console.log(finalDate2)
    
    const catRegister = {
      pvUUID: uuid,
      piIdCompany: idCompany,
      piIdVendor: idVendor,
      pvIdReceiptType: idReceiptType,
      pvIdEntityType: idEntityType,
      pvSerie: serie,
      pvFolio: folio,
      pvInvoiceDate: finalDate2,
      user : user,
      pvIP: ip,
      pvFile: file,
      pvPathFile: pathFile
    };

    fetch(`http://129.159.99.152/develop-vendors/api/carta-porte/create/`, {
        method: "POST",
        body: JSON.stringify(catRegister),
        headers: {
            "access-token": token,
            "Content-Type": "application/json"
        }
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.errors) {
            console.log("Hubo un error al procesar tu solicitud")
        }
        else{
          if(data[0].Code_Type === "Warning")
          {
              /*setErrorMessage(data[0].Code_Message_User)
              setErrorState("has-danger")*/
              autoCloseAlert(data[0].Code_Message_User)
          }
          else if(data[0].Code_Type === "Error")
          {
              //setErrorMessage(data[0].Code_Message_User)
              autoCloseAlert(data[0].Code_Message_User)
              //setErrorState("has-danger")
          }
          else{
              //Para actualizar la tabla en componente principal
              updateAddData()
              autoCloseAlert("CFDI cargado con éxito")
          }
      }
    });
  }

  //Renderizado condicional
  function CargaT() {
    return <CargaTable dataTable = {dataCartaPorte} ip = {ip} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData} workflowTypes = {workflowTypes} workflowTracker ={workflowTracker}/>
  }

  //Para actualizar la tabla al insertar registro
  function updateAddData(){
    const params = {
      pvOptionCRUD: "R"
    };

    var url = new URL(`http://129.159.99.152/develop-vendors/api/carta-porte/`);

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
    //setLoaded(true)
    setDataCartaPorte(data)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de carta porte" + err);
    });
  }

  function filterClick()
  {
    console.log(filterRfcCompany)
    console.log(filterRfcEmisor)
    console.log(filterSerie)
    console.log(filterFolio)
    console.log(dateFrom)
    console.log(dateTo)
    console.log(filterUuid)

    const params = {
      pvOptionCRUD : "R",
      pvUUID : filterUuid,
      pvCompanyTaxId : filterRfcCompany,
      pvVendorTaxId : filterRfcEmisor,
      pvSerie : filterSerie,
      pvFolio : filterFolio,
      pvInvoiceDate : dateFrom,
      pvInvoiceDateFinal : dateTo
    };

    var url = new URL(`http://localhost:8091/api/carta-porte/filter`);

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
    //setLoaded(true)
      console.log(data)
      setDataCartaPorte(data)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de carta porte" + err);
    });
  }

  return dataCartaPorte.length === 0 ? (
    <div className="content">
      <Row>
        <Col md="12">
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                    Cargar archivo 
                  </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <Card>
                    <CardHeader>
                      <CardTitle tag="h4">Cargar archivo</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form> 
                        <Row> 
                          <Col>
                            <FormGroup className={`form-group ${xmlState}`}>
                              <Input 
                                className="form-control" 
                                type="file" id="fileUpload" 
                                accept=".xml" 
                                onChange={(e) => {
                                  setXml(e.target.files[0]);
                                  setXmlState("has-success")
                                }}/>
                              {xmlState === "text-danger" ? (
                                <label className="error">
                                  Selecciona un documento válido.
                                </label>
                              ) : null}
                            </FormGroup>
                          </Col>
                          <Col>
                            <button className="btn btn-primary btn-gtc btn-carta-porte" onClick={registerClick}>
                              <i className="ion-ios-upload-outline btn-icon"/>
                              Cargar CFDI
                            </button>
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
          </div>
          &nbsp;
          <Widget title="Carta Porte">
            <Skeleton height={25} />
            <Skeleton height="25px" />
            <Skeleton height="3rem" />
          </Widget>
        </Col>
      </Row>
    </div>
  ):(
    <div className="content">
      <Row>
        <Col md="12">
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                  Cargar archivo
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <Form> 
                    <Row> 
                      <Col>
                        <FormGroup className={`form-group ${xmlState}`}>
                          <Input 
                            className="form-control" 
                            type="file"
                            accept=".xml" 
                            onChange={(e) => {
                              setXml(e.target.files[0]);
                              setXmlState("has-success")
                            }}/>
                          {xmlState === "text-danger" ? (
                            <label className="error">
                              Selecciona un documento.
                            </label>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col>
                        <button className="btn btn-primary btn-gtc btn-carta-porte" onClick={registerClick}>
                          <i className="ion-ios-upload-outline btn-icon"/>
                          Cargar CFDI
                        </button>
                      </Col>
                    </Row>
                  </Form>
                  </div>
                </div>
            </div>
          </div>
          &nbsp;
          <Card>
            <CardHeader>
                <CardTitle tag="h4">Monitor Carta Porte</CardTitle>
            </CardHeader>
            <CardBody>
              <Form>
                  <Row className="justify-content-center">
                      <Col sm = "3">
                        <FormGroup>
                            <label>RFC Compañía</label>
                            <Input
                                name="name"
                                type="text"
                                autoComplete="off"
                                onChange={(e) => {
                                    setFilterRfcCompany(e.target.value)
                                }}
                            />
                        </FormGroup>
                      </Col>
                      <Col sm = "3">
                        <FormGroup>
                            <label>RFC Emisor</label>
                            <Input
                                name="street"
                                type="text"
                                autoComplete="off"
                                onChange={(e) => {
                                    setFilterRfcEmisor(e.target.value)
                                }}
                            />
                        </FormGroup>
                      </Col>
                      <Col sm = "3">
                        <FormGroup>
                            <label>Serie</label>
                            <Input
                                name="noInterior"
                                type="text"
                                autoComplete="off"
                                onChange={(e) => {
                                    setFilterSerie(e.target.value)
                                }}
                            />
                        </FormGroup>
                      </Col>
                      <Col sm = "3">
                        <FormGroup>
                            <label>Folio</label>
                            <Input
                                name="city"
                                type="text"
                                autoComplete="off"
                                onChange={(e) => {
                                    setFilterFolio(e.target.value)
                                }}
                            />
                        </FormGroup>
                      </Col>
                      <Col sm = "3">
                        <FormGroup >
                            <label>UUID</label>
                            <Input
                                name="noExterior"
                                type="text"
                                autoComplete="off"
                                onChange={(e) => {
                                    setFilterUuid(e.target.value)
                                }}
                            />
                        </FormGroup>
                      </Col>
                      <Col sm = "6">
                        <ConnectedDatePicker
                            onChangeFrom={e => _onChangeDateFrom(e)}
                            onChangeTo={e => _onChangeDateTo(e)}
                            dateFrom={dateFrom}
                            dateTo={dateTo}
                        />
                      </Col>
                      <Col sm = "3">
                        <Button className="buttons btn-gtc btn-filter" color="primary" onClick={filterClick}>
                          Filtrar
                        </Button>
                      </Col>
                  </Row>
              </Form>
              <CargaT />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Carga;