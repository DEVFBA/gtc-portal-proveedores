import React, { useState, useEffect } from "react";
import XmlTree from "./XmlTree";
import convert from 'xml-js';
import axios from 'axios'
import { useParams } from "react-router-dom";
import Skeleton from '@yisheng90/react-loading';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

function CargaXML({pathFile}) {
  const { uUID } = useParams();

  const token = localStorage.getItem("Token");

  //Guardar los datos de los usuarios
  const [dataXml, setDataXml] = useState([]);

  //Guardar los datos de los municipios
  const [dataMunicipios, setDataMunicipios] = useState([]);

  //Guardar los datos de las localidades
  const [dataLocalities, setDataLocalities] = useState([]);

  //Guardar los datos de los codigos postales
  const [dataZipCodes, setDataZipCodes] = useState([]);

  //Guardar las colonias de las ubicaciones
  const [dataColonias, setDataColonias] = useState([]);

  //Manejo de errores
  const [dataError, setDataError] = useState(false);
  const [dataErrorMessage, setDataErrorMessage] = useState(false);

  //Detener el renderizado
  const [dataFind, setDataFind] = useState(true);

  useEffect(() => {
    //Descargar los datos de la factura
    const params = {
      pvOptionCRUD: "R"
    };

    var url = new URL(`${process.env.REACT_APP_API_URI}invoices/${uUID}`);

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
      setDataError(true);
      setDataFind(false)
      setDataErrorMessage("No se pudo consultar la información del CFDI.")
    });
  }, [pathFile]);

  useEffect(() => {
    //Descargar la lista de municipios
    const params = {
      pvOptionCRUD: "R",
      pSpCatalog : "spSAT_Cat_Municipalities_CRUD_Records",
    };

    var url = new URL(`${process.env.REACT_APP_API_URI}cat-catalogs/catalog`);

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
      setDataMunicipios(data)
    })
    .catch(function(err) {
      setDataError(true);
      setDataFind(false)
      setDataErrorMessage("No se pudo consultar la información de los municipios.")
    });
  }, []);

  useEffect(() => {
    //Descargar la lista de localidades
    const params = {
      pvOptionCRUD: "R",
      pSpCatalog : "spSAT_Cat_Locations_CRUD_Records",
    };

    var url = new URL(`${process.env.REACT_APP_API_URI}cat-catalogs/catalog`);

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
      setDataLocalities(data)
    })
    .catch(function(err) {
        setDataError(true);
        setDataFind(false)
        setDataErrorMessage("No se pudo consultar la información de las localidades.")
    });
  }, []);

  /*useEffect(() => {
    //Aqui vamos a descargar la lista de codigos postales
    const params = {
      pvOptionCRUD: "R",
      pSpCatalog : "spSAT_Cat_Zip_Codes_Counties_CRUD_Records",
    };

    var url = new URL(`${process.env.REACT_APP_API_URI}cat-catalogs/catalog`);

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
      setDataZipCodes(data)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los codigos postales" + err);
    });
  }, []);*/

  /*async function getColonias(json)
  {
    var complemento = json[0].elements.find( o => o.name === "cfdi:Complemento")
    var cartaPorte = complemento.elements.find( o => o.name === "cartaporte20:CartaPorte")
    var ubicaciones = cartaPorte.elements.find( o => o.name === "cartaporte20:Ubicaciones")

    var colonias = []
    for(var i=0; i< ubicaciones.length; i++)
    {
      console.log("SI ENTRE PERO ME VALE MADRE")
      const zp = {
        pvIdState: ubicaciones[i].elements[0].attributes.Estado,
        pvIdCounty : ubicaciones[i].elements[0].attributes.Colonia,
      };

      var url = new URL(`http://localhost:8091/api/cat-catalogs/zip-code-county/`);
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
        colonias[i] = data
      });
    }
    console.log(colonias)
  }*/

  const consultaXML = async(doc) => {
    try {
      var url = pathFile + doc
      let response = await axios({ url })
      var options = {compact: false, ignoreComment: true, spaces: 4};
      const jsonString = convert.xml2json(response.data, options);
      const jsonData = JSON.parse(jsonString)
      setDataXml(jsonData.elements)
      
      var complemento = jsonData.elements[0].elements.find( o => o.name === "cfdi:Complemento")
      var cartaPorte = complemento.elements.find( o => o.name === "cartaporte20:CartaPorte")
      var ubicaciones = cartaPorte.elements.find( o => o.name === "cartaporte20:Ubicaciones")
      var ubicacionesF = ubicaciones.elements

      var colonias = []
      for(var i=0; i< ubicacionesF.length; i++)
      {
        const zp = {
          pvIdState: ubicacionesF[i].elements[0].attributes.Estado,
          pvIdCounty : ubicacionesF[i].elements[0].attributes.Colonia,
        };

        var url = new URL(`${process.env.REACT_APP_API_URI}cat-catalogs/zip-code-county/`);
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
          colonias[i] = data
        });
      }
      console.log(colonias)
      setDataColonias(colonias)
      setDataFind(false);
    }catch(error){
      setDataError(true);
      setDataErrorMessage("El archivo XML tiene errores.")
    }
  }

  //Renderizado condicional
  function XmlTreeData() {
    if(dataXml.length === 0)
    {
      return (
        <div>
          <Skeleton height={25} />
          <Skeleton height="25px" />
          <Skeleton height="3rem" />
        </div>
      )
    }
    else {
      return <XmlTree dataString = {dataXml} dataMunicipios = {dataMunicipios} dataLocalities = {dataLocalities} dataColonias = {dataColonias}/>;
    }
  }

  return dataFind === true ? (
    <>
      <div>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">CFDI Carta Porte</CardTitle>
              </CardHeader>
              <CardBody>
                {dataError === false ? (
                  <>
                    <Skeleton height={25} />
                    <Skeleton height="25px" />
                    <Skeleton height="3rem" />
                  </>
                ): dataErrorMessage}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  ) : (
    <>
      <div>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">CFDI Carta Porte</CardTitle>
              </CardHeader>
              <CardBody>
                  {dataError === false ?(
                    <XmlTreeData />
                  ): dataErrorMessage} 
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CargaXML;