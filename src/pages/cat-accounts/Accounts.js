import React from 'react'
import { useState, useEffect} from "react";
import axios from 'axios'
import '../../css/pages/form.css'
import Skeleton from '@yisheng90/react-loading';

import AccountsTable from './AccountsTable';
//import ModalAddUser from "./ModalAddUser.js";

import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
} from "reactstrap";
import ModalAddAccount from './ModalAddAccount';

function Accounts({autoCloseAlert}){
    //Para guardar los datos de las cuentas
    const [dataAccounts, setDataAccounts] = useState([]);

    //Para guardar el token de la sesión
    const token = localStorage.getItem("Token");

    //Para guardar la direccion IP del usuario
    const [ip, setIP] = React.useState("");

    //Para guardar los datos de los roles
    const [dataAccountTypes, setDataAccountTypes] = useState([]);

    const [dataFind, setDataFind] = useState(true)

    const [modalAddRecord, setModalAddRecord] = useState(false);

    const getData = async () => {
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
        var url = new URL(`${process.env.REACT_APP_API_URI}cat-accounts/`);
        //var url = new URL(`http://localhost:8091/api/cat-accounts/`);
    
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
          setDataAccounts(data)
          setDataFind(false)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de las cuentas" + err);
        });
    }, []);

    useEffect(() => {
        var url = new URL(`${process.env.REACT_APP_API_URI}cat-account-types/`);
        //var url = new URL(`http://localhost:8091/api/cat-account-types/`);
    
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
                value: data[i].Id_Account_Type, label: data[i].Short_Desc 
              })
            }
            setDataAccountTypes(optionsAux)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los tipos de cuentas" + err);
        });
    }, []);

     //Renderizado condicional
    function AccountsT() {
        return <AccountsTable dataTable = {dataAccounts} ip = {ip}  autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData}/>
    }

    //Para actualizar la tabla al insertar registro
    function updateAddData(){
        setDataFind(true)

        var url = new URL(`${process.env.REACT_APP_API_URI}cat-accounts/`);
        //var url = new URL(`http://localhost:8091/api/cat-accounts/`);

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
            setDataAccounts(data)
            setDataFind(false)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de las cuentas" + err);
        });
    }

    function toggleModalAddRecord(){
        if(modalAddRecord == false){
            setModalAddRecord(true);
        }
        else{
            setModalAddRecord(false);
        }
    }

    return dataFind === true ? (
        <Card>
            <CardHeader>
                <CardTitle tag="h4">Catálogo de Cuentas</CardTitle>
            </CardHeader>
            <CardBody>
                <span className="input-group-btn rounded-left">
                    <button className="btn btn-primary btn-gtc" onClick={toggleModalAddRecord}>
                        <i className="ion-plus btn-icon"/>
                        Agregar Cuenta 
                    </button>
                </span>
                &nbsp;
                <Skeleton height={25} />
                <Skeleton height="25px" />
                <Skeleton height="3rem" />
            </CardBody>
            {/*MODAL PARA AÑADIR REGISTROS*/}
            <ModalAddAccount modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord} dataAccountTypes = {dataAccountTypes} ip = {ip} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData}/>
        </Card>
    ) : (   
        <Card>
            <CardHeader>
                <CardTitle tag="h4">Catálogo de Cuentas</CardTitle>
            </CardHeader>
            <CardBody>
                <span className="input-group-btn rounded-left">
                    <button className="btn btn-primary btn-gtc" onClick={toggleModalAddRecord}>
                        <i className="ion-plus btn-icon"/>
                        Agregar Cuenta 
                    </button>
                </span>
                &nbsp;
                {dataAccounts.length === 0 ? (
                  <div className ="no-data">
                    <h3>No hay datos</h3>
                  </div>
                ): 
                    <AccountsT />
                }
            </CardBody>
            {/*MODAL PARA AÑADIR REGISTROS*/}
            <ModalAddAccount modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord} dataAccountTypes = {dataAccountTypes} ip = {ip} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData}/>
        </Card>
    )

}

export default Accounts