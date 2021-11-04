import React from 'react'
import { useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios'
import ReactBSAlert from "react-bootstrap-sweetalert";
import '../../css/pages/form.css'
import Widget from '../../elements/Widget'
import Skeleton from '@yisheng90/react-loading';

import UsersTable from './UsersTable';

function Users({autoCloseAlert}){
    //Para guardar los datos de los usuarios
    const [dataUsers, setDataUsers] = useState([]);

    //Para guardar el token de la sesión
    const token = localStorage.getItem("Token");

    //Para guardar la direccion IP del usuario
    const [ip, setIP] = React.useState("");

    //Para guardar los datos de los roles
    const [dataRoles, setDataRoles] = useState([]);

    //Para guardar los datos de los vendors
    const [dataVendors, setDataVendors] = useState([]);

    //Para los dias de vigencia de la contraseña
    const [validDays, setValidDays] = useState();

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
        //Aqui vamos a descargar la lista de usuarios de la base de datos por primera vez
        const params = {
          pvOptionCRUD: "R"
        };
    
        var url = new URL(`http://localhost:8091/api/security-users/`);
    
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
          setDataUsers(data)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los usuarios" + err);
        });
    }, []);

    useEffect(() => {
        //Aqui vamos a descargar la lista de roles de la base de datos por primera vez
        const params = {
          pvOptionCRUD: "R"
        };
    
        var url = new URL(`http://localhost:8091/api/security-roles/`);
    
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
            //Creamos el arreglo de roles para el select
            var optionsAux = [];
            var i;
            for(i=0; i<data.length; i++)
            {
              optionsAux.push({
                value: data[i].Id_Role, label: data[i].Short_Desc 
              })
            }
            setDataRoles(optionsAux)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los roles" + err);
        });
    }, []);

    useEffect(() => {
        //Aqui vamos a descargar la lista de customers de la base de datos por primera vez
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
            //Creamos el arreglo de customers para el select
            var optionsAux = [];
            var i;
            for(i=0; i<data.length; i++)
            {
              optionsAux.push({
                value: data[i].Id_Vendor, label: data[i].Name
              })
            }
            setDataVendors(optionsAux)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los vendors" + err);
        });
    }, []);

    useEffect(() => {
        //Aqui vamos a descargar la lista de general parameters para revisar la vigencia del password
        const params = {
          pvOptionCRUD: "R"
        };
    
        var url = new URL(`http://localhost:8091/api/general-parameters/`);
    
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
            var aux = data.find( o => o.Id_Catalog === 1 )
            setValidDays(parseInt(aux.Value,10))
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los general parameters" + err);
        });
    }, []);

     //Renderizado condicional
    function UsersT() {
        return <UsersTable dataTable = {dataUsers} ip = {ip} dataRoles = {dataRoles} dataVendors = {dataVendors} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData} validDays={validDays}/>
    }

    //Para actualizar la tabla al insertar registro
    function updateAddData(){
        const params = {
        pvOptionCRUD: "R"
        };

        var url = new URL(`http://localhost:8091/api/security-users/`);

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
        setDataUsers(data)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los usuarios" + err);
        });
    }

    return dataUsers.length === 0 ? (
        <Widget title="Catálogo de Usuarios">
            <Skeleton height={25} />
            <Skeleton height="25px" />
            <Skeleton height="3rem" />
        </Widget>
    ) : (
        <div>
            <Widget title="Catálogo de Usuarios">
                <UsersT />
            </Widget>
        </div>
    )

}

export default Users