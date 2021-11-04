import React from 'react'
import { useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios'
import ReactBSAlert from "react-bootstrap-sweetalert";
import '../../css/pages/form.css'
import Widget from '../../elements/Widget'
import Skeleton from '@yisheng90/react-loading';

import VendorsTable from './VendorsTable';

function Vendors({autoCloseAlert}){
    //Para guardar los datos de los usuarios
    const [dataVendors, setDataVendors] = useState([]);

    //Para guardar el token de la sesión
    const token = localStorage.getItem("Token");

    //Para guardar la direccion IP del usuario
    const [ip, setIP] = React.useState("");

    //Para guardar los lista de paises
    const [dataCountries, setDataCountries] = useState([]);

    const getData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        setIP(res.data.IPv4)
      }
    
      useEffect(() => {
          //Descargamos la IP del usuario
          getData()
      }, []);

    useEffect(() => {
        //Aqui vamos a descargar la lista de roles de la base de datos por primera vez
        const params = {
          pvOptionCRUD: "R"
        };
    
        var url = new URL(`http://localhost:8091/api/vendors/`);
    
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
            setDataVendors(data)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de las vendors" + err);
        });
    }, []);

     //Renderizado condicional
    function VendorsT() {
        return <VendorsTable dataTable = {dataVendors} ip = {ip} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData} dataCountries = {dataCountries}/>
    }

    //Para actualizar la tabla al insertar registro
    function updateAddData(){
        const params = {
        pvOptionCRUD: "R"
        };

        var url = new URL(`http://localhost:8091/api/vendors/`);

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
            setDataVendors(data)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de las vendors" + err);
        });
    }

    useEffect(() => {
        const params = {
          pvOptionCRUD: "R",
          pSpCatalog : "spSAT_Cat_Countries_CRUD_Records",
        };
    
        var url = new URL(`http://localhost:8091/api/cat-catalogs/catalog`);
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
          //Creamos el arreglo de opciones para el select
          var optionsAux = [];
          var i;
          for(i=0; i<data.length; i++)
          {
            optionsAux.push({
              value: data[i].Id_Catalog, label: data[i].Short_Desc 
            })
          }
          setDataCountries(optionsAux)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los catálogos" + err);
        });
    }, []);

    return dataVendors.length === 0 ? (
        <Widget title="Catálogo de Proveedores">
            <Skeleton height={25} />
            <Skeleton height="25px" />
            <Skeleton height="3rem" />
        </Widget>
    ) : (
        <Widget title="Catálogo de Proveedores">
            <VendorsT />
        </Widget>
    )

}

export default Vendors