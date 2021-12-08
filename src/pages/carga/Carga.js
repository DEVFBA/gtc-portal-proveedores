import React, { useState, useEffect, useRef } from "react";
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

// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";
import { param } from "jquery";

function Carga({autoCloseAlert}) {

  //Para guardar el archivo
  const [xml, setXml] = useState(null);

  const [xmlState, setXmlState] = useState("")

  //Para guardar el token de la sesión
  const token = localStorage.getItem("Token");

  const user = localStorage.getItem("User");
  const vendor = localStorage.getItem("Id_Vendor");

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

  //Para resetear el input file al enviar el archivo
  const [theInputKey, setTheInputKey] = useState("")

  //Para verificar si no hay datos en carta porte
  const [dataFind, setDataFind] = useState(true)
  
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
          getCartaPorte(data)
      })
      .catch(function(err) {
          alert("No se pudo consultar la informacion de las vendors" + err);
      });
  }, []);

  function getCartaPorte(vendors){
    var vendorId = vendors.find( o => o.Id_Vendor === parseInt(vendor,10))
    if(vendor==="0")
    {
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
        setDataCartaPorte(data)
        setDataFind(false)
      })
      .catch(function(err) {
          alert("No se pudo consultar la informacion de carta porte" + err);
      });
    }
    else {
      //Para guardar el valor del filterRfcEmisor
      setFilterRfcEmisor(vendorId.Tax_Id)
      var url = new URL(`http://localhost:8091/api/carta-porte/vendor/${vendorId.Tax_Id}`);
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

  /*useEffect(() => {
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
      setDataCartaPorte(data)
      console.log(dataVendors)
      setDataFind(false)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de carta porte" + err);
    });
  }, []);*/

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

function deleteClick(){
  setDataFind(true)
  //Aqui vamos a descargar la lista de registros de la base de datos por primera vez
  setFilterRfcCompany("")
  setFilterSerie("")
  setFilterFolio("")
  setFilterUuid("")

  var vendorId = dataVendors.find( o => o.Id_Vendor === parseInt(vendor,10))
    if(vendor==="0")
    {
      setFilterRfcEmisor("")
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
        setDataCartaPorte(data)
        setDataFind(false)
      })
      .catch(function(err) {
          alert("No se pudo consultar la informacion de carta porte" + err);
      });
    }
    else {
      var url = new URL(`http://localhost:8091/api/carta-porte/vendor/${vendorId.Tax_Id}`);
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

    console.log(vendorId)
    var vendorTaxId = dataVendors.find( o => o.Id_Vendor === parseInt(vendor,10))
    if(cartaPorte !== true)
    {
      resetFileInput()
      autoCloseAlert("Error. El documento no es de Carta Porte. Verifique.")
    }
    else if(companyValid === false)
    {
      resetFileInput()
      autoCloseAlert("Error: Compañía inexistente. Verifique")
    }
    else if(vendorValid === false)
    {
      resetFileInput()
      autoCloseAlert("Error: Proveedor inexistente. Verifique")
    }
    else{
      
      if(vendor !== "0")
      {
        if(vendorTaxIdDoc !== vendorTaxId.Tax_Id)
        {
          resetFileInput()
          autoCloseAlert("Error: Proveedor incorrecto. Verifique")
        }
        else {
          console.log("SI ENTRE")
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
                  file : file,
                  uuid: uuid,
                  vendorId: vendorId, 
                  companyId: companyId,
                  idReceiptType : jsonData.elements[0].attributes.TipoDeComprobante,
                  entity: entity,
                  serie: "",
                  folio: "",
                  fecha: jsonData.elements[0].attributes.Fecha,
                  zipCodes : ubicaciones.elements,
                  ubicaciones : []
                }
                findUbicaciones(params)
                //findOriginZipCode(params)
                //uploadXml(file, uuid, vendorId, companyId, jsonData.elements[0].attributes.TipoDeComprobante, entity, "", "", jsonData.elements[0].attributes.Fecha)
              }
              else{
                var params = {
                  file : file,
                  uuid: uuid,
                  vendorId: vendorId, 
                  companyId: companyId,
                  idReceiptType : jsonData.elements[0].attributes.TipoDeComprobante,
                  entity: entity,
                  serie: "",
                  folio: jsonData.elements[0].attributes.Folio,
                  fecha: jsonData.elements[0].attributes.Fecha,
                  zipCodes: ubicaciones.elements,
                  ubicaciones : []
                }
                findUbicaciones(params)
                //findOriginZipCode(params)
                //uploadXml(file, uuid, vendorId, companyId, jsonData.elements[0].attributes.TipoDeComprobante, entity, "", jsonData.elements[0].attributes.Folio, jsonData.elements[0].attributes.Fecha)
              }
            }
            else {
              var params = {
                file : file,
                uuid: uuid,
                vendorId: vendorId, 
                companyId: companyId,
                idReceiptType : jsonData.elements[0].attributes.TipoDeComprobante,
                entity: entity,
                serie: jsonData.elements[0].attributes.Serie,
                folio: jsonData.elements[0].attributes.Folio,
                fecha: jsonData.elements[0].attributes.Fecha,
                zipCodes: ubicaciones.elements,
                ubicaciones : []
              }
              findUbicaciones(params)
              //uploadXml(file, uuid, vendorId, companyId, jsonData.elements[0].attributes.TipoDeComprobante, entity, jsonData.elements[0].attributes.Serie, jsonData.elements[0].attributes.Folio, jsonData.elements[0].attributes.Fecha)
            }
          }
          else {
            resetFileInput()
            autoCloseAlert("La relación entre Compañías / Proveedores es incorrecta. Valide.")
          }
        }
      }
      else {
        console.log("SI ENTRE")
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
                file : file,
                uuid: uuid,
                vendorId: vendorId, 
                companyId: companyId,
                idReceiptType : jsonData.elements[0].attributes.TipoDeComprobante,
                entity: entity,
                serie: "",
                folio: "",
                fecha: jsonData.elements[0].attributes.Fecha,
                zipCodes : ubicaciones.elements,
                ubicaciones : []
              }
              findUbicaciones(params)
              //findOriginZipCode(params)
              //uploadXml(file, uuid, vendorId, companyId, jsonData.elements[0].attributes.TipoDeComprobante, entity, "", "", jsonData.elements[0].attributes.Fecha)
            }
            else{
              var params = {
                file : file,
                uuid: uuid,
                vendorId: vendorId, 
                companyId: companyId,
                idReceiptType : jsonData.elements[0].attributes.TipoDeComprobante,
                entity: entity,
                serie: "",
                folio: jsonData.elements[0].attributes.Folio,
                fecha: jsonData.elements[0].attributes.Fecha,
                zipCodes: ubicaciones.elements,
                ubicaciones : []
              }
              findUbicaciones(params)
              //findOriginZipCode(params)
              //uploadXml(file, uuid, vendorId, companyId, jsonData.elements[0].attributes.TipoDeComprobante, entity, "", jsonData.elements[0].attributes.Folio, jsonData.elements[0].attributes.Fecha)
            }
          }
          else {
            var params = {
              file : file,
              uuid: uuid,
              vendorId: vendorId, 
              companyId: companyId,
              idReceiptType : jsonData.elements[0].attributes.TipoDeComprobante,
              entity: entity,
              serie: jsonData.elements[0].attributes.Serie,
              folio: jsonData.elements[0].attributes.Folio,
              fecha: jsonData.elements[0].attributes.Fecha,
              zipCodes: ubicaciones.elements,
              ubicaciones : []
            }
            findUbicaciones(params)
            //uploadXml(file, uuid, vendorId, companyId, jsonData.elements[0].attributes.TipoDeComprobante, entity, jsonData.elements[0].attributes.Serie, jsonData.elements[0].attributes.Folio, jsonData.elements[0].attributes.Fecha)
          }
        }
        else {
          resetFileInput()
          autoCloseAlert("La relación entre Compañías / Proveedores es incorrecta. Valide.")
        }
      }
    }
  };
}

  async function findUbicaciones(params)
  {
    var i = 0
    var ubicaciones =[]
    while(i < params.zipCodes.length)
    {
      console.log(params.zipCodes[i].elements[0].attributes.CodigoPostal)
      const zp = {
        pvZip_Code: params.zipCodes[i].elements[0].attributes.CodigoPostal
      };
  
      var url = new URL(`http://129.159.99.152/develop-vendors/api/cat-catalogs/zip-codes/`);
      Object.keys(zp).forEach(key => url.searchParams.append(key, zp[key]))
      await fetch(url, {
          method: "GET",
          headers: {
              "access-token": token,
              "Content-Type": "application/json"
          }
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        ubicaciones[i] = data
      });
      i++
    }
    params.ubicaciones = ubicaciones
    uploadXml(params)
  }

  function uploadXml(params)
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
      idWorkflowStatus = 900
      idWorkflowStatusChange = 999
      workflowComments = cadenaError
    }
    else if(cadenaWarning !== "Precaución. ")
    {
      idWorkflowStatus = 1
      idWorkflowStatusChange = 10
      workflowComments = cadenaWarning
    }
    else {
      idWorkflowStatus = 5
      idWorkflowStatusChange = 10
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

    console.log(finalDate2)

    const catRegister = {
      pvUUID: params.uuid,
      piIdCompany: params.companyId,
      piIdVendor: params.vendorId,
      pvIdReceiptType: params.idReceiptType,
      pvIdEntityType: params.entity,
      pvSerie: params.serie,
      pvFolio: params.folio,
      pvInvoiceDate : finalDate2,
      piIdWorkflowStatus : idWorkflowStatus,
      piIdWorkflowStatusChange : idWorkflowStatusChange,
      pvWorkflowComments : workflowComments,
      user : user,
      pvIP: ip,
      pvFile: params.file,
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
    });
  }

  //Renderizado condicional
  function CargaT() {
    return <CargaTable dataTable = {dataCartaPorte} ip = {ip} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData} workflowTypes = {workflowTypes} workflowTracker ={workflowTracker}/>
  }

  //Para actualizar la tabla al insertar registro
  function updateAddData(){
    setDataFind(true)
    var vendorId = dataVendors.find( o => o.Id_Vendor === parseInt(vendor,10))
    if(vendor==="0")
    {
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
        setDataCartaPorte(data)
        setDataFind(false)
      })
      .catch(function(err) {
          alert("No se pudo consultar la informacion de carta porte" + err);
      });
    }
    else {
      var url = new URL(`http://localhost:8091/api/carta-porte/vendor/${vendorId.Tax_Id}`);
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

    /*console.log(filterRfcCompany)
    console.log(filterRfcEmisor)
    console.log(filterSerie)
    console.log(filterFolio)
    console.log(finalDate1)
    console.log(finalDate2)
    console.log(filterUuid)*/

    const params = {
      pvOptionCRUD : "R",
      pvUUID : filterUuid,
      pvCompanyTaxId : filterRfcCompany,
      pvVendorTaxId : filterRfcEmisor,
      pvSerie : filterSerie,
      pvFolio : filterFolio,
      pvInvoiceDate : finalDate1,
      pvInvoiceDateFinal : finalDate2
    };
    setDataFind(false)
    var url = new URL(`http://129.159.99.152/develop-vendors/api/carta-porte/filter`);

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
                            key={theInputKey || '' }
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
                </div>
              </div>
            </div>
          </div>
          &nbsp;
          &nbsp;
          <Card>
            <CardHeader>
                <CardTitle tag="h4">Monitor Carta Porte</CardTitle>
            </CardHeader>
            <CardBody>
              <Form>
                  <Row className="justify-content-center">
                      <Col sm = "10">

                      </Col>
                      <Col sm = "2">
                          <Button className="btn-outline" color="primary" onClick={deleteClick}>
                            <i className="ion-android-delete btn-icon" />
                            Borrar Filtros
                          </Button>
                      </Col>
                      <Col sm = "3">
                        <FormGroup>
                            <label>RFC Compañía</label>
                            <Input
                                name="name"
                                type="text"
                                autoComplete="off"
                                value = {filterRfcCompany}
                                onChange={(e) => {
                                    setFilterRfcCompany(e.target.value)
                                }}
                            />
                        </FormGroup>
                      </Col>
                      <Col sm = "3">
                        {vendor === "0" ? (
                          <FormGroup>
                            <label>RFC Emisor</label>
                            <Input
                                name="street"
                                type="text"
                                autoComplete="off"
                                value = {filterRfcEmisor}
                                onChange={(e) => {
                                    setFilterRfcEmisor(e.target.value)
                                }}
                            />
                          </FormGroup>
                        ) : (
                          <FormGroup>
                            <label>RFC Emisor</label>
                            <Input
                                name="street"
                                type="text"
                                autoComplete="off"
                                value = {filterRfcEmisor}
                                readOnly
                            />
                          </FormGroup>
                        )}
                      </Col>
                      <Col sm = "3">
                        <FormGroup>
                            <label>Serie</label>
                            <Input
                                name="noInterior"
                                type="text"
                                autoComplete="off"
                                value = {filterSerie}
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
                                value = {filterFolio}
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
                                value = {filterUuid}
                                onChange={(e) => {
                                    setFilterUuid(e.target.value)
                                }}
                            />
                        </FormGroup>
                      </Col>
                      <Col sm = "3">
                        <label>Fecha Origen</label>
                        <ReactDatetime
                          inputProps={{
                            className: "form-control",
                            placeholder: "Fecha de origen",
                          }}
                          timeFormat={false}
                          
                          onChange={(date) => {
                              setDateFrom(date)
                              //setregisterValidDateState("has-success");
                          }}
                        />
                      </Col>
                      <Col sm = "3">
                        <label>Fecha Vigencia</label>
                        <ReactDatetime
                          inputProps={{
                            className: "form-control",
                            placeholder: "Fecha de vigencia",
                          }}
                          timeFormat={false}
                          
                          onChange={(date) => {
                              setDateTo(date)
                              //setregisterValidDateState("has-success");
                          }}
                        />
                      </Col>
                      <Col sm = "3">
                        <Button className="buttons btn-gtc btn-filter" color="primary" onClick={filterClick}>
                          <i className="fa fa-filter btn-icon" />
                          Filtrar
                        </Button>
                      </Col>
                  </Row>
              </Form>
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
                            key={theInputKey || '' }
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
                </div>
              </div>
            </div>
          </div>
          &nbsp;
          &nbsp;
          <Card>
            <CardHeader>
                <CardTitle tag="h4">Monitor Carta Porte</CardTitle>
            </CardHeader>
            <CardBody>
              <Form>
                  <Row className="justify-content-center">
                      <Col sm = "10">

                      </Col>
                      <Col sm = "2">
                          <Button className="btn-outline" color="primary" onClick={deleteClick}>
                            <i className="ion-android-delete btn-icon" />
                            Borrar Filtros
                          </Button>
                      </Col>
                      <Col sm = "3">
                        <FormGroup>
                            <label>RFC Compañía</label>
                            <Input
                                name="name"
                                type="text"
                                autoComplete="off"
                                value = {filterRfcCompany}
                                onChange={(e) => {
                                    setFilterRfcCompany(e.target.value)
                                }}
                            />
                        </FormGroup>
                      </Col>
                      <Col sm = "3">
                        {vendor === "0" ? (
                          <FormGroup>
                            <label>RFC Emisor</label>
                            <Input
                                name="street"
                                type="text"
                                autoComplete="off"
                                value = {filterRfcEmisor}
                                onChange={(e) => {
                                    setFilterRfcEmisor(e.target.value)
                                }}
                            />
                          </FormGroup>
                        ) : (
                          <FormGroup>
                            <label>RFC Emisor</label>
                            <Input
                                name="street"
                                type="text"
                                autoComplete="off"
                                value = {filterRfcEmisor}
                                readOnly
                            />
                          </FormGroup>
                        )}
                      </Col>
                      <Col sm = "3">
                        <FormGroup>
                            <label>Serie</label>
                            <Input
                                name="noInterior"
                                type="text"
                                autoComplete="off"
                                value = {filterSerie}
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
                                value = {filterFolio}
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
                                value = {filterUuid}
                                onChange={(e) => {
                                    setFilterUuid(e.target.value)
                                }}
                            />
                        </FormGroup>
                      </Col>
                      <Col sm = "3">
                        <label>Fecha Origen</label>
                        <ReactDatetime
                          inputProps={{
                            className: "form-control",
                            placeholder: "Fecha de origen",
                          }}
                          timeFormat={false}
                          
                          onChange={(date) => {
                              setDateFrom(date)
                              //setregisterValidDateState("has-success");
                          }}
                        />
                      </Col>
                      <Col sm = "3">
                        <label>Fecha Vigencia</label>
                        <ReactDatetime
                          inputProps={{
                            className: "form-control",
                            placeholder: "Fecha de vigencia",
                          }}
                          timeFormat={false}
                          
                          onChange={(date) => {
                              setDateTo(date)
                              //setregisterValidDateState("has-success");
                          }}
                        />
                      </Col>
                      <Col sm = "3">
                        <Button className="buttons btn-gtc btn-filter" color="primary" onClick={filterClick}>
                          <i className="fa fa-filter btn-icon" />
                          Filtrar
                        </Button>
                      </Col>
                  </Row>
                  &nbsp;
                  &nbsp;
              </Form>
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