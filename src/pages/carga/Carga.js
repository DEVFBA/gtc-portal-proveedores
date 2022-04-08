import React, { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import convert from 'xml-js';
import axios from 'axios'
import Skeleton from '@yisheng90/react-loading';
import '../../css/forms/react-datetime.css'
import CargaTable from './CargaTable';
import Filtro from './Filtro';

// reactstrap components
import {
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
} from "reactstrap";

function Carga({autoCloseAlert, autoCloseAlertEvidencias, autoCloseAlertCarga, hideAlert4}) {

  //Para guardar el archivo XML
  const [xml, setXml] = useState(null);

  const [xmlState, setXmlState] = useState("")

  //Para guardar el archivo PDF
  const [pdf, setPdf] = useState(null);

  const [pdfState, setPdfState] = useState("")

  //Para guardar el token de la sesión
  const token = localStorage.getItem("Token");
  const user = localStorage.getItem("User");
  const vendor = localStorage.getItem("Id_Vendor");
  const idRole = localStorage.getItem("Id_Role");

  //Para guardar los datos de las facturas
  const [dataCartaPorte, setDataCartaPorte] = useState([]);

  //Para guardar los datos del rol logueado
  const [dataRol, setDataRol] = useState();

  //Para guardar el path de los documentos XML
  const [pathFile, setPathFile] = useState("");

  //Para guardar el path de los documentos PDF
  const [pathFilePDF, setPathFilePDF] = useState("");

  //Para ver si es necesario subir el archivo PDF
  const [pdfRequired, setPdfRequired] = useState();

  //Para guardar los workflow types
  const [workflowTypes, setWorflowTypes] = useState([]);

  //Para guardar la direccion IP del usuario
  const [ip, setIP] = useState("");
 
  //Para guardar el estado del documento XML
  const [fileState, setFileState] = useState(null);

  //Para guardar el estado del documento
  const [fileStatePdf, setFileStatePdf] = useState(null);

  //Para guardar el documento como tal XML
  const [fileUpload, setFileUpload] = useState();

  //Para guardar el documento como tal PDF
  const [fileUploadPdf, setFileUploadPdf] = useState();

  //Para guardar el UUID del documento
  const [uuid, setUuid] =  useState("");

  //Para guardar el Id_Vendor del documento
  const [idVendor, setIdVendor] =  useState("");

  //Para guardar el Id_Company del documento
  const [idCompany, setIdCompany] =  useState("");

  //Para guardar el Id_Receipt_Type del documento
  const [idReceiptType, setIdReceiptType] =  useState("");

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
  const [filterStatus, setFilterStatus] = useState("")

  //Para resetear el input file al enviar el archivo XML
  const [theInputKey, setTheInputKey] = useState("")

  //Para resetear el input file al enviar el archivo XML
  const [theInputKeyPdf, setTheInputKeyPdf] = useState("")

  //Para resetear el input file al enviar el archivo XML
  const [theInputTextKey, setTheInputTextKey] = useState("")

  //Para verificar si no hay datos en carta porte
  const [dataFind, setDataFind] = useState(true)

  const [dataWorkFlowStatus, setDataWorkflowStatus] = useState([]);

  //Para agregar el número de solicitud
  const [requester, setRequester] = useState();
  const [requesterState, setRequesterState] = useState("");

  const [workflowPortal, setWorkflowPortal] = useState("");

  //Para el condicionado de la carga de evidencias
  const [estatusCarga, setEstatusCarga] = useState([]);

  //Para el condicionado de los checkboxes
  const [checkPool, setCheckPool] = useState("");

  //Para el condicionado de ver evidencia
  const [excepcionRechazo, setExcepcionRechazo] = useState("");
  
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
  
    var url = new URL(`${process.env.REACT_APP_API_URI}security-roles/${idRole}`);

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
        setDataRol(data)
        getVendors(data[0])
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion del rol logueado" + err);
        
    });
  }, []); 

  function getVendors(dataRol)
  {
      //Aqui vamos a descargar la lista de vendors de la base de datos 
      const params = {
        pvOptionCRUD: "R"
      };

      var url = new URL(`${process.env.REACT_APP_API_URI}vendors/`);

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
          getCartaPorte(data, dataRol)
      })
      .catch(function(err) {
          alert("No se pudo consultar la informacion de las vendors" + err);
      });
  }

  function getCartaPorte(vendors, dataRole){
    if(dataRole.Show_Customers === true)
    {
      const params = {
        pvOptionCRUD: "R"
      };
  
      var url = new URL(`${process.env.REACT_APP_API_URI}invoices/`);
  
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
        setDataCartaPorte(data)
        setDataFind(false)
      })
      .catch(function(err) {
          alert("No se pudo consultar la informacion de carta porte" + err);
      });
    }
    else {
      //Para guardar el valor del filterRfcEmisor
      var vendorId = vendors.find( o => o.Id_Vendor === parseInt(vendor,10))
      setFilterRfcEmisor(vendorId.Tax_Id)
      var url = new URL(`${process.env.REACT_APP_API_URI}invoices/vendor/${vendorId.Tax_Id}`);
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
        setDataCartaPorte(data)
        setDataFind(false)
      })
      .catch(function(err) {
          alert("No se pudo consultar la informacion de carta porte" + err);
      });
    }
  }

useEffect(() => {
  //Aqui vamos a descargar la lista de companies de la base de datos
  const params = {
    pvOptionCRUD: "R"
  };

  var url = new URL(`${process.env.REACT_APP_API_URI}companies/`);

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

  var url = new URL(`${process.env.REACT_APP_API_URI}companies-vendors/`);

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
      var xmlPath = data.find( o => o.Id_Catalog === 8 )
      setPathFile(xmlPath.Value)

      var pdfPath = data.find( o => o.Id_Catalog === 10 )
      setPathFilePDF(pdfPath.Value)

      var pdfReq = data.find( o => o.Id_Catalog === 11 )
      setPdfRequired(parseInt(pdfReq.Value, 10))

      var workPortal = data.find( o => o.Id_Catalog === 13 )
      setWorkflowPortal(workPortal.Value)

      var estatusC = data.find( o => o.Id_Catalog === 23 )
      setEstatusCarga(estatusC.Value.split(", "))

      var checkP = data.find( o => o.Id_Catalog === 27 )
      setCheckPool(checkP.Value)

      var excepcionP = data.find( o => o.Id_Catalog === 32 )
      setExcepcionRechazo(excepcionP.Value)
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

  var url = new URL(`${process.env.REACT_APP_API_URI}cat-workflow-type/`);

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

  var url = new URL(`${process.env.REACT_APP_API_URI}workflow-tracker/`);

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

useEffect(() => {
  //Aqui vamos a descargar la lista de general parameters para revisar los workflow type
  const params = {
    pvOptionCRUD: "R"
  };

  var url = new URL(`${process.env.REACT_APP_API_URI}cat-workflow-status/`);

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

    var dataAux = []
    var contador = 0
    for(var i=0; i< data.length; i++)
    {
      if(data[i].Id_Workflow_Type === "WF-CPAS")
      {
        dataAux[contador] = data[i]
        contador++
      }
     
    }
    var dataSelect = []
    for(var j=0; j<dataAux.length; j++)
    {
      dataSelect[j] = {value: dataAux[j].Id_Workflow_Status, label: dataAux[j].Long_Desc}
    }
    setDataWorkflowStatus(dataSelect)
  })
  .catch(function(err) {
      alert("No se pudo consultar la informacion de los workflow tracker" + err);
  });
}, []);

function deleteClick(){
  setDataFind(true)
  //Aqui vamos a descargar la lista de registros de la base de datos por primera vez
  setFilterRfcCompany("")
  setFilterSerie("")
  setFilterFolio("")
  setFilterUuid("")
  setFilterStatus({})

  if(dataRol[0].Show_Customers === true)
  {
    const params = {
      pvOptionCRUD: "R"
    };

    var url = new URL(`${process.env.REACT_APP_API_URI}invoices/`);

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
      setDataCartaPorte(data)
      setDataFind(false)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de carta porte" + err);
    });
  }
  else {
    //Para guardar el valor del filterRfcEmisor
    var vendorId = vendors.find( o => o.Id_Vendor === parseInt(vendor,10))
    setFilterRfcEmisor(vendorId.Tax_Id)
    var url = new URL(`${process.env.REACT_APP_API_URI}invoices/vendor/${vendorId.Tax_Id}`);
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
      setDataCartaPorte(data)
      setDataFind(false)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de carta porte" + err);
    });
  }
}

function resetFileInput() {
  let randomString = Math.random().toString(36);
  setTheInputKey(randomString)
}

function resetFileInputPdf() {
  let randomString = Math.random().toString(36);
  setTheInputKeyPdf(randomString)
}

function resetFileInputText() {
  let randomString = Math.random().toString(36);
  setTheInputTextKey(randomString)
}

function registerClick(){
  event.preventDefault();
  if(xml !== null)
  {
    let reader = new FileReader();
    let file = xml;

    reader.onloadend = () => { 
      setFileState(file);
      setFileUpload(reader.result)
      //preData(reader.result, xml)
    };
    if (file) {
      reader.readAsDataURL(file);
    }

    if(pdfRequired === 1)
    {
      if(pdf !== null)
      {
        let reader2 = new FileReader();
        let file2 = pdf;

        reader2.onloadend = () => { 
          setFileStatePdf(file2)
          setFileUploadPdf(reader2.result)
        };
        if (file2) {
          reader2.readAsDataURL(file2);
        }

        if (requesterState !== "has-success") {
          setRequesterState("text-danger");
        }
        else {
          //preData()
          getSolicitud()
        }
      }
      else {
        if (pdfState !== "has-success") {
          setPdfState("text-danger");
        }
        if (requesterState !== "has-success") {
          setRequesterState("text-danger");
        }
        if (requesterState !== "has-success") {
          setRequesterState("text-danger");
        }
      }
    }
    else {
      if(pdf !== null)
      {
        let reader2 = new FileReader();
        let file2 = pdf;

        reader2.onloadend = () => { 
          setFileStatePdf(file2)
          setFileUploadPdf(reader2.result)
        };
        if (file2) {
          reader2.readAsDataURL(file2);
        }
        if (requesterState !== "has-success") {
          setRequesterState("text-danger");
        }
        else {
          //preData()
          getSolicitud()
        }
      }
    }
    if(requesterState !== "has-success")
    {
      setRequesterState("text-danger");
    }
  }
  else {
    if (xmlState !== "has-success") {
      setXmlState("text-danger");
    }
    if(requesterState !== "has-success")
    {
      setRequesterState("text-danger");
    }
    if (pdfRequired === 1) {
      if (pdfState !== "has-success") {
        setPdfState("text-danger");
      }
    }
    if (requesterState !== "has-success") {
      setRequesterState("text-danger");
    }
  }
}

function getSolicitud()
{
  autoCloseAlertCarga("Cargando...")
  var url = new URL(`${process.env.REACT_APP_API_URI}carta-porte-requests/${requester}`);

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
    if(data.data.success === 0)
    {
      hideAlert4()
      resetFileInput()
      resetFileInputPdf()
      resetFileInputText()
      setRequester("")
      autoCloseAlert("La solicitud no existe. Valide.")
    }
    else {
      preData(data.data)
    }
  })
  .catch(function(err) {
      alert("No se pudo consultar la informacion del carta porte request" + err);
  });
}

function preData(dataRequest){
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
    var ubicaciones = []
    for(var i=0; i<complemento.elements.length; i++)
    {
      if(complemento.elements[i].name === "cartaporte20:CartaPorte")
      {
        var cartaP = complemento.elements[i].elements;
        ubicaciones = cartaP.find( o => o.name === "cartaporte20:Ubicaciones")
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
    var vendorTaxIdDoc;
    for(var i = 0; i < dataCompanies.length; i++)
    {
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
        vendorTaxIdDoc = dataVendors[j].Tax_Id
        vendorValid = true;
      }
    }

    var vendorTaxId = dataVendors.find( o => o.Id_Vendor === parseInt(vendor,10))
    if(cartaPorte !== true)
    {
      hideAlert4()
      resetFileInput()
      resetFileInputPdf()
      resetFileInputText()
      setRequester("")
      autoCloseAlert("Error. El documento no es de Carta Porte. Verifique.")
    }
    else if(companyValid === false)
    {
      hideAlert4()
      resetFileInput()
      resetFileInputPdf()
      resetFileInputText()
      setRequester("")
      autoCloseAlert("Error: Compañía inexistente. Verifique")
    }
    else if(vendorValid === false)
    {
      hideAlert4()
      resetFileInput()
      resetFileInputPdf()
      resetFileInputText()
      setRequester("")
      autoCloseAlert("Error: Proveedor inexistente. Verifique")
    }
    else{
      
      if(vendor !== "0")
      {
        if(vendorTaxIdDoc !== vendorTaxId.Tax_Id)
        {
          hideAlert4()
          resetFileInput()
          resetFileInputPdf()
          resetFileInputText()
          setRequester("")
          autoCloseAlert("Error: Proveedor incorrecto. Verifique")
        }
        else {
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
                var params = {
                  uuid: uuid,
                  vendorId: vendorId, 
                  companyId: companyId,
                  idReceiptType : jsonData.elements[0].attributes.TipoDeComprobante,
                  entity: entity,
                  serie: "",
                  folio: "",
                  fecha: jsonData.elements[0].attributes.Fecha,
                  /*zipCodes : ubicaciones.elements,
                  ubicaciones : []*/
                  pathSolicitud: dataRequest.path,
                  jsonXml: elements
                }
                parseFiles(params)
                //findUbicaciones(params)
                //findOriginZipCode(params)
                //uploadXml(file, uuid, vendorId, companyId, jsonData.elements[0].attributes.TipoDeComprobante, entity, "", "", jsonData.elements[0].attributes.Fecha)
              }
              else{
                var params = {
                  uuid: uuid,
                  vendorId: vendorId, 
                  companyId: companyId,
                  idReceiptType : jsonData.elements[0].attributes.TipoDeComprobante,
                  entity: entity,
                  serie: "",
                  folio: jsonData.elements[0].attributes.Folio,
                  fecha: jsonData.elements[0].attributes.Fecha,
                  pathSolicitud: dataRequest.path,
                  jsonXml: elements
                  /*zipCodes: ubicaciones.elements,
                  ubicaciones : []*/
                }
                parseFiles(params)
                //findUbicaciones(params)
                //findOriginZipCode(params)
                //uploadXml(file, uuid, vendorId, companyId, jsonData.elements[0].attributes.TipoDeComprobante, entity, "", jsonData.elements[0].attributes.Folio, jsonData.elements[0].attributes.Fecha)
              }
            }
            else {
              var params = {
                uuid: uuid,
                vendorId: vendorId, 
                companyId: companyId,
                idReceiptType : jsonData.elements[0].attributes.TipoDeComprobante,
                entity: entity,
                serie: jsonData.elements[0].attributes.Serie,
                folio: jsonData.elements[0].attributes.Folio,
                fecha: jsonData.elements[0].attributes.Fecha,
                pathSolicitud: dataRequest.path,
                jsonXml: elements
                /*zipCodes: ubicaciones.elements,
                ubicaciones : []*/
              }
              parseFiles(params)
              //findUbicaciones(params)
              //uploadXml(file, uuid, vendorId, companyId, jsonData.elements[0].attributes.TipoDeComprobante, entity, jsonData.elements[0].attributes.Serie, jsonData.elements[0].attributes.Folio, jsonData.elements[0].attributes.Fecha)
            }
          }
          else {
            hideAlert4()
            resetFileInput()
            resetFileInputPdf()
            resetFileInputText()
            setRequester("")
            autoCloseAlert("La relación entre Compañías / Proveedores es incorrecta. Valide.")
          }
        }
      }
      else {
       
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
              var params = {
                uuid: uuid,
                vendorId: vendorId, 
                companyId: companyId,
                idReceiptType : jsonData.elements[0].attributes.TipoDeComprobante,
                entity: entity,
                serie: "",
                folio: "",
                fecha: jsonData.elements[0].attributes.Fecha,
                pathSolicitud: dataRequest.path,
                jsonXml: elements
                /*zipCodes : ubicaciones.elements,
                ubicaciones : []*/
              }
              parseFiles(params)
              //findUbicaciones(params)
              //findOriginZipCode(params)
              //uploadXml(file, uuid, vendorId, companyId, jsonData.elements[0].attributes.TipoDeComprobante, entity, "", "", jsonData.elements[0].attributes.Fecha)
            }
            else{
              var params = {
                uuid: uuid,
                vendorId: vendorId, 
                companyId: companyId,
                idReceiptType : jsonData.elements[0].attributes.TipoDeComprobante,
                entity: entity,
                serie: "",
                folio: jsonData.elements[0].attributes.Folio,
                fecha: jsonData.elements[0].attributes.Fecha,
                pathSolicitud: dataRequest.path,
                jsonXml: elements
                /*zipCodes: ubicaciones.elements,
                ubicaciones : []*/
              }
              //findUbicaciones(params)
              //findOriginZipCode(params)
              //uploadXml(file, uuid, vendorId, companyId, jsonData.elements[0].attributes.TipoDeComprobante, entity, "", jsonData.elements[0].attributes.Folio, jsonData.elements[0].attributes.Fecha)
              parseFiles(params)
            }
          }
          else {
            var params = {
              uuid: uuid,
              vendorId: vendorId, 
              companyId: companyId,
              idReceiptType : jsonData.elements[0].attributes.TipoDeComprobante,
              entity: entity,
              serie: jsonData.elements[0].attributes.Serie,
              folio: jsonData.elements[0].attributes.Folio,
              fecha: jsonData.elements[0].attributes.Fecha,
              pathSolicitud: dataRequest.path,
              jsonXml: elements
              //zipCodes: ubicaciones.elements,
              //ubicaciones : []
            }
            //findUbicaciones(params)
            //uploadXml(file, uuid, vendorId, companyId, jsonData.elements[0].attributes.TipoDeComprobante, entity, jsonData.elements[0].attributes.Serie, jsonData.elements[0].attributes.Folio, jsonData.elements[0].attributes.Fecha)
            parseFiles(params)
          }
        }
        else {
          hideAlert4()
          resetFileInput()
          resetFileInputPdf()
          resetFileInputText()
          setRequester("")
          autoCloseAlert("La relación entre Compañías / Proveedores es incorrecta. Valide.")
        }
      }
    }
  };
}

  const parseFiles = async(params) => {

    var url = params.pathSolicitud
    let response = await axios({ url })
    var options = {compact: false, ignoreComment: true, spaces: 4};
    const jsonString = convert.xml2json(response.data, options);
    const jsonData = JSON.parse(jsonString)

    var complementoR = jsonData.elements[0].elements.find( o => o.name === "cfdi:Complemento")
    var cartaPorteR = complementoR.elements.find( o => o.name === "cartaporte20:CartaPorte")
    var ubicacionesR = cartaPorteR.elements.find( o => o.name === "cartaporte20:Ubicaciones").elements
    var mercanciasR = cartaPorteR.elements.find( o => o.name === "cartaporte20:Mercancias").elements
    
    var complementoV = params.jsonXml.find(o => o.name === "cfdi:Complemento")
    var cartaPorteV = complementoV.elements.find(o => o.name === "cartaporte20:CartaPorte")
    var ubicacionesV = cartaPorteV.elements.find(o => o.name === "cartaporte20:Ubicaciones").elements
    var mercanciasV = cartaPorteV.elements.find(o => o.name === "cartaporte20:Mercancias").elements

    //1. Comparamos que las ubicaciones sean la misma cantidad.
    if(ubicacionesV.length === ubicacionesR.length)
    {
      //seguimos
      if(mercanciasV.length === mercanciasR.length)
      {
        //Vamos a verificar las ubicaciones
        var ubicacionesFalse = 0; //para validar si alguna ubicacion no existe
        for(var i=0; i<ubicacionesV.length; i++)
        {
          var ubicacionVActual = ubicacionesV[i]
          var ubicacionFlag = false
          for(var j=0; j<ubicacionesR.length; j++)
          {
            if((ubicacionVActual.attributes.TipoUbicacion === ubicacionesR[j].attributes.TipoUbicacion)
              && (ubicacionVActual.attributes.RFCRemitenteDestinatario === ubicacionesR[j].attributes.RFCRemitenteDestinatario)
              && (ubicacionVActual.elements[0].attributes.Colonia === ubicacionesR[j].elements[0].attributes.Colonia)
              && (ubicacionVActual.elements[0].attributes.Localidad === ubicacionesR[j].elements[0].attributes.Localidad)
              && (ubicacionVActual.elements[0].attributes.Municipio === ubicacionesR[j].elements[0].attributes.Municipio)
              && (ubicacionVActual.elements[0].attributes.Pais === ubicacionesR[j].elements[0].attributes.Pais)
              && (ubicacionVActual.elements[0].attributes.CodigoPostal === ubicacionesR[j].elements[0].attributes.CodigoPostal) )
            {
              ubicacionFlag = true
            }
          }
          if(ubicacionFlag === false)
          {
            //EL ARCHIVO SE VA A SUBIR CON ERROR
            //console.log("LAS UBICACIONES NO SON IGUALES")
            uploadXmlFinal(false)
            i = ubicacionesV.length
            ubicacionesFalse++
          }
        }

        if(ubicacionesFalse === 0)
        {
          //Vamos a verificar las mercancias
          var mercanciaFalse = 0 //para validar si alguna mercancia no existe
          for(var i=0; i<mercanciasV.length; i++)
          {
            var mercanciaVActual = mercanciasV[i]
            if(mercanciaVActual.name === "cartaporte20:Mercancia")
            {
              var mercanciaFlag = false
              for(var j=0; j<mercanciasR.length; j++)
              {
                if(mercanciasR[j].name === "cartaporte20:Mercancia")
                {
                  if((mercanciaVActual.attributes.BienesTransp === mercanciasR[j].attributes.BienesTransp)
                  && (mercanciaVActual.attributes.Cantidad === mercanciasR[j].attributes.Cantidad)
                  && (mercanciaVActual.attributes.ClaveUnidad === mercanciasR[j].attributes.ClaveUnidad)
                  && (mercanciaVActual.attributes.CveMaterialPeligroso === mercanciasR[j].attributes.CveMaterialPeligroso)
                  && (mercanciaVActual.attributes.Descripcion === mercanciasR[j].attributes.Descripcion)
                  && (mercanciaVActual.attributes.Embalaje === mercanciasR[j].attributes.Embalaje)
                  && (mercanciaVActual.attributes.MaterialPeligroso === mercanciasR[j].attributes.MaterialPeligroso)
                  && (mercanciaVActual.attributes.PesoEnKg === mercanciasR[j].attributes.PesoEnKg))
                  {
                    //mercanciaFlag = true
                    //console.log(mercanciaVActual.elements)
                    if(mercanciaVActual.elements !== undefined && mercanciasR[j].elements)
                    {
                      var pedimentoMV = mercanciaVActual.elements.find(o => o.name === "cartaporte20:Pedimentos")
                      var pedimentoMR = mercanciasR[j].elements.find(o => o.name === "cartaporte20:Pedimentos")
                      if(pedimentoMV !== undefined && pedimentoMR !== undefined)
                      {
                        /*console.log(pedimentoMV.attributes.Pedimento)
                        console.log(pedimentoMR.attributes.Pedimento)*/
                        if(pedimentoMV.attributes.Pedimento === pedimentoMR.attributes.Pedimento)
                        {
                          mercanciaFlag = true
                        }
                        else {
                          //console.log("LAS MERCANCIAS NO SON IGUALES POR EL PEDIMENTO")
                          mercanciaFlag = false
                        }
                      }
                    }
                    else {
                      mercanciaFlag = true
                    }
                  }
                }
              }
              if(mercanciaFlag === false)
              {
                //EL ARCHIVO SE VA A SUBIR CON ERROR
                //console.log("LAS MERCANCIAS NO SON IGUALES")
                uploadXmlFinal(false)
                i = mercanciasV.length
                mercanciaFalse++
                //console.log(mercanciaVActual)
              }
            }
          }
          if(mercanciaFalse === 0)
          {
            //console.log("LAS MERCANCIAS SON IGUALES")
            uploadXmlFinal(true)
          }
          else {
            console.log(mercanciaFalse)
          }
        }
      }
      else {
        //EL ARCHIVO SE VA A SUBIR CON ERROR
        //console.log("LAS MERCANCIAS NO TIENEN LA MISMA LONGITUD")
        uploadXmlFinal(false)
      }
    }
    else {
      //EL ARCHIVO SE VA A SUBIR CON ERROR
      //console.log("LAS UBICACIONES NO TIENEN LA MISMA LONGITUD")
      uploadXmlFinal(false)
    }
  }

  function uploadXmlFinal(shipmentApproval)
  {
    let reader = new FileReader();
    let file = xml;

    reader.onloadend = () => { 
      getData64PDF(reader.result, shipmentApproval)
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  /*function uploadXml(params)
  {
    console.log(params)
    var cadenaWarning = "Precaución. "
    var cadenaError = "Error. "
    var error = false
    var i=0
    while(i<params.ubicaciones.length && error === false)
    {
      console.log(params.ubicaciones[i])
      if(params.ubicaciones[i].length === 0)
      {
        cadenaError = cadenaError + "El Código Postal " + params.zipCodes[i].elements[0].attributes.CodigoPostal + " No existe. "
        error = true
      }
      else {
        //Revisamos COLONIA
        var colonia = false
        var j = 0;
        while(j<params.ubicaciones[i].length && colonia === false)
        {
          console.log((params.ubicaciones[i])[j].Id_County)
          //console.log(params.zipCodes[i].elements[0].attributes.Colonia)
          if(params.zipCodes[i].elements[0].attributes.Colonia !== "")
          {
            if(params.zipCodes[i].elements[0].attributes.Colonia === (params.ubicaciones[i])[j].Id_County)
            {
              colonia = true
            }
          }
          j++
        }
        if(colonia === false)
        {
          cadenaWarning = cadenaWarning + "La colonia del código postal " + params.zipCodes[i].elements[0].attributes.CodigoPostal + " es incorrecta. "
        }

        //Revisamos ESTADO
        var estado = false
        j = 0;
        while(j<params.ubicaciones[i].length && estado === false)
        {
          console.log((params.ubicaciones[i])[j].Id_State)
          //console.log(params.zipCodes[i].elements[0].attributes.Colonia)
          if(params.zipCodes[i].elements[0].attributes.Estado !== "")
          {
            if(params.zipCodes[i].elements[0].attributes.Estado === (params.ubicaciones[i])[j].Id_State)
            {
              estado = true
            }
          }
          else {
            cadenaError = cadenaError + "El Estado del Código Postal " + params.zipCodes[i].elements[0].attributes.CodigoPostal + " es obligatorio. "
            error = true
          }
          j++
        }
        if(estado === false)
        {
          cadenaWarning = cadenaWarning + "El Estado del código postal " + params.zipCodes[i].elements[0].attributes.CodigoPostal + " es incorrecto. "
        }

        //Revisamos LOCALIDAD
        var localidad = false
        j = 0;
        while(j<params.ubicaciones[i].length && localidad === false)
        {
          console.log((params.ubicaciones[i])[j].Id_Location)
          //console.log(params.zipCodes[i].elements[0].attributes.Colonia)
          if(params.zipCodes[i].elements[0].attributes.Colonia !== "")
          {
            if(params.zipCodes[i].elements[0].attributes.Localidad === (params.ubicaciones[i])[j].Id_Location)
            {
              localidad = true
            }
          }
          j++
        }
        if(localidad === false)
        {
          cadenaWarning = cadenaWarning + "La localidad del código postal " + params.zipCodes[i].elements[0].attributes.CodigoPostal + " es incorrecta. "
        }

        //Revisamos MUNICPIO
        var municipio = false
        j = 0;
        while(j<params.ubicaciones[i].length && municipio === false)
        {
          console.log((params.ubicaciones[i])[j].Id_Municipality)
          //console.log(params.zipCodes[i].elements[0].attributes.Colonia)
          if(params.zipCodes[i].elements[0].attributes.Municipio !== "")
          {
            if(params.zipCodes[i].elements[0].attributes.Municipio === (params.ubicaciones[i])[j].Id_Municipality)
            {
              municipio = true
            }
          }
          j++
        }
        if(municipio === false)
        {
          cadenaWarning = cadenaWarning + "El municipio del código postal " + params.zipCodes[i].elements[0].attributes.CodigoPostal + " es incorrecto. "
        }

        //Revisamos PAIS
        var pais = false
        j = 0;
        while(j<params.ubicaciones[i].length && pais === false)
        {
          console.log((params.ubicaciones[i])[j].Id_Country)
          //console.log(params.zipCodes[i].elements[0].attributes.Colonia)
          if(params.zipCodes[i].elements[0].attributes.Pais !== "")
          {
            if(params.zipCodes[i].elements[0].attributes.Pais === (params.ubicaciones[i])[j].Id_Country)
            {
              pais = true
            }
          }
          else {
            cadenaError = cadenaError + "El Pais del Código Postal " + params.zipCodes[i].elements[0].attributes.CodigoPostal + " es obligatorio. "
            error = true
          }
          j++
        }
        if(pais === false)
        {
          cadenaWarning = cadenaWarning + "El Pais del código postal " + params.zipCodes[i].elements[0].attributes.CodigoPostal + " es incorrecto. "
        }
      }
      i++
    }

    var idWorkflowStatus
    var idWorkflowStatusChange
    var workflowComments
   
    if(cadenaError !== "Error. ")
    {
      idWorkflowStatus = 100
      idWorkflowStatusChange = 990
      workflowComments = cadenaError
    }
    else if(cadenaWarning !== "Precaución. ")
    {
      idWorkflowStatus = 100
      idWorkflowStatusChange = 950
      workflowComments = cadenaWarning
    }
    else {
      idWorkflowStatus = 100
      idWorkflowStatusChange = 100
      workflowComments = "CFDI registrado correctamente."
    }

    var f = new Date(params.fecha)
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

    let reader = new FileReader();
    let file = xml;
    console.log(file)

    reader.onloadend = () => { 
      getData64PDF(reader.result, params, finalDate2, idWorkflowStatus, idWorkflowStatusChange, workflowComments)
    };
    if (file) {
      reader.readAsDataURL(file);
    }

    /*const catRegister = {
      pvUUID: params.uuid,
      piIdCompany: params.companyId,
      piIdVendor: params.vendorId,
      pvIdReceiptType: params.idReceiptType,
      pvIdEntityType: params.entity,
      pvSerie: params.serie,
      pvFolio: params.folio,
      pvInvoiceDate : finalDate2,
      pvPathFile: pathFile,
      pvPathFilePDF: pathFilePDF,
      piRequest_Number : requesterState,
      piIdWorkflowStatus : idWorkflowStatus,
      piIdWorkflowStatusChange : idWorkflowStatusChange,
      pvWorkflowComments : workflowComments,
      user : user,
      pvIP: ip,
      pvFile: params.file,
      pvFilePDF : 
    };

    /*fetch(`http://localhost:8091/api/invoices/create/`, {
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
            resetFileInput()
            autoCloseAlert(data[0].Code_Message_User)
          }
          else if(data[0].Code_Type === "Error")
          {
            resetFileInput()
            autoCloseAlert(data[0].Code_Message_User)
          }
          else{
            //Para actualizar la tabla en componente principal
            resetFileInput()
            updateAddData()
            autoCloseAlert("CFDI cargado con éxito")
          }
      }
    });*/
  //}

  function getData64PDF(xmlbase64, shipmentApproval)
  {
    let reader = new FileReader();
    let file = pdf;

    reader.onloadend = () => { 
      sendData(xmlbase64, reader.result, shipmentApproval)
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  function sendData(xmlbase64, pdfbase64, shipmentApproval)
  {
    const catRegister = {
      invoiceXMLBase64: xmlbase64,
      invoicePDFBase64: pdfbase64,
      cPorteRequestNumber: requester,
      shipmentApproval: shipmentApproval,
      user: user,
      ip: ip
    };

    fetch(`${process.env.REACT_APP_API_URI}invoices/save-invoice/`, {
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
            hideAlert4()
        }
        else {
          if(data.data.success === 1)
          {
            hideAlert4()
            resetFileInput()
            resetFileInputPdf()
            resetFileInputText()
            setRequester("")
            autoCloseAlert(data.data.message)
            updateAddData()
          }
          else {
            hideAlert4()
            resetFileInput()
            resetFileInputPdf()
            resetFileInputText()
            setRequester("")
            autoCloseAlert(data.data.message)
          }
        }
    });
  }

  //Renderizado condicional
  function CargaT() {
    return <CargaTable dataTable = {dataCartaPorte} ip = {ip} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData} workflowTypes = {workflowTypes} workflowTracker ={workflowTracker} estatusCarga = {estatusCarga} checkPool = {checkPool} autoCloseAlertEvidencias = {autoCloseAlertEvidencias} excepcionRechazo = {excepcionRechazo}/>
  }

  //Renderizado condicional
  function FiltroT() {
    return <Filtro filterClick = {filterClick} deleteClick = {deleteClick} dataWorkFlowStatus = {dataWorkFlowStatus} filterRfcCompany= {filterRfcCompany} setFilterRfcCompany = {setFilterRfcCompany} filterRfcEmisor = {filterRfcEmisor} setFilterRfcEmisor = {setFilterRfcEmisor} filterSerie = {filterSerie} setFilterSerie = {setFilterSerie} filterFolio = {filterFolio} setFilterFolio = {setFilterFolio} dateTo = {dateTo} setDateTo = {setDateTo} dateFrom = {dateFrom}  setDateFrom = {setDateFrom} filterUuid = {filterUuid} setFilterUuid = {setFilterUuid} filterStatus = {filterStatus} setFilterStatus = {setFilterStatus}/>
  }

  //Para actualizar la tabla al insertar registro
  function updateAddData(){
    setDataFind(true)
    if(dataRol[0].Show_Customers === true)
    {
      const params = {
        pvOptionCRUD: "R"
      };
  
      var url = new URL(`${process.env.REACT_APP_API_URI}invoices/`);
  
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
        setDataCartaPorte(data)
        setDataFind(false)
      })
      .catch(function(err) {
          alert("No se pudo consultar la informacion de carta porte" + err);
      });
    }
    else {
      //Para guardar el valor del filterRfcEmisor
      var vendorId = vendors.find( o => o.Id_Vendor === parseInt(vendor,10))
      setFilterRfcEmisor(vendorId.Tax_Id)
      var url = new URL(`${process.env.REACT_APP_API_URI}invoices/vendor/${vendorId.Tax_Id}`);
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
        setDataCartaPorte(data)
        setDataFind(false)
      })
      .catch(function(err) {
          alert("No se pudo consultar la informacion de carta porte" + err);
      });
    }
  }

  function filterClick()
  {
    var date;
    var month;
    var year;
    var finalDate1;
    var date2;
    var month2;
    var year2;
    var finalDate2;

    if(dateFrom !== "")
    {
      if(dateFrom._d.getDate() < 10)
      {
          date = "0" + dateFrom._d.getDate()
      }
      else{
          date = dateFrom._d.getDate()
      }
      if((dateFrom._d.getMonth() + 1) < 10)
      {
          month = "0" + (dateFrom._d.getMonth() + 1)
      }
      else 
      {
          month = dateFrom._d.getMonth() + 1
      }
      year = dateFrom._d.getFullYear()
      finalDate1 = year + "" + month + "" + date
    }
    else{
      finalDate1 = ""
    }

    if(dateTo !== "")
    {
      if(dateTo._d.getDate() < 10)
      {
          date2 = "0" + dateTo._d.getDate()
      }
      else{
          date2 = dateTo._d.getDate()
      }
      if((dateTo._d.getMonth() + 1) < 10)
      {
          month2 = "0" + (dateTo._d.getMonth() + 1)
      }
      else 
      {
          month2 = dateTo._d.getMonth() + 1
      }
      year2 = dateTo._d.getFullYear()
      finalDate2 = year2 + "" + month2 + "" + date2
    }
    else{
      finalDate2 = ""
    }

    var fStatus;
    if(filterStatus.value === undefined)
    {
      fStatus = 0
    }
    else {
      fStatus = filterStatus.value;
    }
    
    const params = {
      pvOptionCRUD : "R",
      pvUUID : filterUuid,
      pvCompanyTaxId : filterRfcCompany,
      pvVendorTaxId : filterRfcEmisor,
      pvSerie : filterSerie,
      pvFolio : filterFolio,
      pvInvoiceDate : finalDate1,
      pvInvoiceDateFinal : finalDate2,
      piIdWorkflowStatus : fStatus
    };

    setDataFind(false)
    var url = new URL(`${process.env.REACT_APP_API_URI}invoices/filter`);

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
      setDataCartaPorte(data)
      setDataFind(false)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de carta porte" + err);
    });
  }

  return dataFind === true ? (
    <div className="content">
      <Row>
        <Col md="12">
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                    Cargar archivos 
                  </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <Form> 
                    <Row> 
                      <Col>
                        <FormGroup className={`form-group ${xmlState}`}>
                          <h6>Selecciona archivo XML</h6>
                          <Input 
                            className="form-control" 
                            placeholder="Seleccionar XML"
                            type="file"
                            accept=".xml"
                            key={theInputKey || '' }
                            onChange={(e) => {
                              setXml(e.target.files[0]);
                              setXmlState("has-success")
                            }}/>
                          {xmlState === "text-danger" ? (
                            <label className="error">
                              Selecciona un documento XML válido.
                            </label>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup className={`form-group ${requesterState}`}>
                          <Label for="exampleSelect">Número de solicitud *</Label>
                          <Input
                            name="requester"
                            type="number"
                            autoComplete="off"
                            key={theInputTextKey || '' }
                            onChange={(e) => {
                                setRequester(e.target.value);
                                setRequesterState("has-success")
                            }}
                          />
                          {requesterState === "text-danger" ? (
                              <label className="form-text text-danger">Escribe un número de solicitud.</label>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup className={`form-group ${pdfState}`}>
                          <h6>Selecciona archivo PDF</h6>
                          <Input 
                            className="form-control" 
                            type="file"
                            accept=".pdf"
                            key={theInputKeyPdf || '' }
                            onChange={(e) => {
                              setPdf(e.target.files[0]);
                              setPdfState("has-success")
                            }}/>
                          {pdfState === "text-danger" ? (
                            <label className="error">
                              Selecciona un documento PDF válido.
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
          &nbsp;
          <Card>
            <CardHeader>
                <CardTitle tag="h4">Monitor Facturas</CardTitle>
            </CardHeader>
            <CardBody>
              <FiltroT/>
              <Skeleton height={25} />
              <Skeleton height="25px" />
              <Skeleton height="3rem" />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  ) : (
    <div className="content">
      <Row>
        <Col md="12">
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                    Cargar archivos
                  </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                <Form> 
                    <Row> 
                      <Col>
                        <FormGroup className={`form-group ${xmlState}`}>
                          <h6>Selecciona archivo XML</h6>
                          <Input 
                            className="form-control" 
                            placeholder="Seleccionar XML"
                            type="file"
                            accept=".xml"
                            key={theInputKey || '' }
                            onChange={(e) => {
                              setXml(e.target.files[0]);
                              setXmlState("has-success")
                            }}/>
                          {xmlState === "text-danger" ? (
                            <label className="error">
                              Selecciona un documento XML válido.
                            </label>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup className={`form-group ${requesterState}`}>
                          <Label for="exampleSelect">Número de solicitud *</Label>
                          <Input
                            name="requester"
                            type="number"
                            autoComplete="off"
                            key={theInputTextKey || '' }
                            onChange={(e) => {
                                setRequester(e.target.value);
                                setRequesterState("has-success")
                            }}
                          />
                          {requesterState === "text-danger" ? (
                              <label className="form-text text-danger">Escribe un número de solicitud.</label>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup className={`form-group ${pdfState}`}>
                          <h6>Selecciona archivo PDF</h6>
                          <Input 
                            className="form-control" 
                            type="file"
                            accept=".pdf"
                            key={theInputKeyPdf || '' }
                            onChange={(e) => {
                              setPdf(e.target.files[0]);
                              setPdfState("has-success")
                            }}/>
                          {pdfState === "text-danger" ? (
                            <label className="error">
                              Selecciona un documento PDF válido.
                            </label>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col>
                        <button className="btn btn-primary btn-gtc btn-carta-porte btn-lg btn-block" onClick={registerClick}>
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
          &nbsp;
          <Card>
            <CardHeader>
                <CardTitle tag="h4">Monitor Facturas</CardTitle>
            </CardHeader>
            <CardBody>
              <FiltroT/>
              &nbsp;
              &nbsp;
              {dataCartaPorte.length === 0 ? (
                  <div className ="no-data">
                    <h3>No hay datos</h3>
                  </div>
              ): 
                <CargaT />
              }
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Carga;