import React, {Component} from 'react'
import { useState, useEffect} from "react";
import ReactTable from "../../reacttable/ReactTable";
import fileDownload from 'js-file-download'
import axios from 'axios'

import ModalVerDetallePool from "./ModalVerDetallePool.js";
import ModalRechazarPool from "./ModalRechazarPool.js";

function InvoicesPoolsTable({dataTable, autoCloseAlert, ip, dataTrackerReasons, showButtons, updateAddData, cargaFallidaAdobeSign, enviarAgreement}) {

    //Para guardar el token de la sesión
    const token = localStorage.getItem("Token");

    //Para guardar el rol de la sesión
    const rol = localStorage.getItem("Id_Role");

    //Para saber que invoice pool se va a ver
    const [record, setRecord] = useState([]);

    //Para saber que invoice pool se va a rechazar
    const [recordReject, setRecordReject] = useState([]);

    //Para saber que vendor se va a ver
    const [vendor, setVendor] = useState("");

    //Para saber que numero de pool se va a ver
    const [poolNumber, setPoolNumber] = useState("");

    const user = localStorage.getItem("User");

    const [dataState, setDataState] = useState(
        dataTable.map((prop, key) => { 
            console.log(prop)
            var fecha = new Date(prop.Header_Pool_Date)
            console.log(fecha);
            var date, month, year, fechaFinal;
            if(fecha.getDate() < 10)
            {
                date = "0" + fecha.getDate()
            }
            else{
                date = fecha.getDate()
            }
            if((fecha.getMonth() + 1) < 10)
            {
                month = "0" + (fecha.getMonth() + 1)
            }
            else 
            {
                month = fecha.getMonth() + 1
            }
            year = fecha.getFullYear()
            console.log(fecha.getDate())
            fechaFinal = date + "/" + month + "/" + year

            return {
                id: key,
                idInvoicePool: prop.Id_Invoice_Pool,
                headerPHPath: prop.Header_PH_Path,
                comments: prop.Comments,
                serie: prop.Serie,
                folio: prop.Folio,
                totalFacturas: prop.Header_Total_Invoices,
                poolDate: fechaFinal,
                company: prop.Header_Company,
                vendor: prop.Header_Vendor,
                totalAmount: "$" + parseFloat(prop.Header_Total_Amount).toLocaleString(undefined, {minimumFractionDigits: 2}),
                documentId : prop.Document_Id,
                generadoPor: prop.Header_PH_Generated_By,
                nextSigner: prop.Next_Signer,
                estatus: prop.Header_Workflow_Status_Change,
                actions: (
                    // ACCIONES A REALIZAR EN CADA REGISTRO
                    <div className="actions-center">
                        {/*IMPLEMENTAR EDICION PARA CADA REGISTRO */}
                        <abbr title="Descargar Carátula">
                            <button
                            onClick={() => {
                                let obj = dataState.find((o) => o.id === key); 
                                registerClick(obj)
                            }}
                            color="warning"
                            size="sm"
                            className="btn-icon btn-link edit"
                            >
                            <i className="fa fa-download" />
                            </button>
                        </abbr>
                        <abbr title="Ver Detalle">
                            <button
                            onClick={() => {
                                let obj = dataState.find((o) => o.id === key); 
                                verDetalle(obj)
                            }}
                            color="warning"
                            size="sm"
                            className="btn-icon btn-link edit"
                            >
                            <i className="fa fa-eye" />
                            </button>
                        </abbr>
                        {prop.Header_Id_Workflow_Status_Change === parseInt(showButtons,10) ? (
                            <abbr title="Aprobar Pool">
                                <button
                                onClick={() => {
                                    let obj = dataState.find((o) => o.id === key); 
                                    aprobarPool(obj)
                                }}
                                color="warning"
                                size="sm"
                                className="btn-icon btn-link edit"
                                >
                                <i className="fa fa-check" />
                                </button>
                            </abbr>
                        ):null}
                        {prop.Header_Id_Workflow_Status_Change === parseInt(showButtons,10) ? (
                            <abbr title="Rechazar Pool">
                                <button
                                onClick={() => {
                                    let obj = dataState.find((o) => o.id === key); 
                                    getRegistro(key)
                                    //rechazarPool(obj)
                                }}
                                color="warning"
                                size="sm"
                                className="btn-icon btn-link edit"
                                >
                                <i className="fa fa-close" />
                                </button>
                            </abbr>
                        ):null}
                        {prop.Header_Id_Workflow_Status_Change === parseInt(cargaFallidaAdobeSign,10) ? (
                            <abbr title="Enviar Carátula para Firma">
                                <button
                                onClick={() => {
                                    let obj = dataState.find((o) => o.id === key); 
                                    reenviarDocumento(obj)
                                }}
                                color="warning"
                                size="sm"
                                className="btn-icon btn-link edit"
                                >
                                <i className="fa fa-cloud-upload" />
                                </button>
                            </abbr>
                        ):null}
                        {prop.Header_Id_Workflow_Status_Change === parseInt(enviarAgreement,10) ? (
                            <abbr title="Enviar Agreement">
                                <button
                                onClick={() => {
                                    let obj = dataState.find((o) => o.id === key); 
                                    enviarDocumento(obj)
                                }}
                                color="warning"
                                size="sm"
                                className="btn-icon btn-link edit"
                                >
                                <i className="fa fa-send-o" />
                                </button>
                            </abbr>
                        ):null}
                    </div>
                  ),
            };
        })
    );

    function registerClick(item){

        var url = new URL(`${process.env.REACT_APP_API_URI}invoices-pool/documentation/${item.idInvoicePool}`);

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
            if(data.data.success === 1)
            {
                var url2 = new URL(data.data.filePath);
                axios.get(url2, {
                    responseType: 'blob',
                })
                .then((res) => {
                    fileDownload(res.data, data.data.fileName + ".zip")
                })
            }
            else {
                autoCloseAlert(data.data.message)
            }
            console.log(data.data)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los invoices pools" + err);
        });
    }

    function verDetalle(item){

        setVendor(item.vendor)
        setPoolNumber(item.idInvoicePool)
        
        var url = new URL(`${process.env.REACT_APP_API_URI}invoices-pool/${item.idInvoicePool}`);

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
            if(data.length === 0)
            {
                autoCloseAlert("No se ha encontrado la información.")
            }
            else {
                console.log(data)
                setRecord(data)
                toggleModalReadRecord()
            }
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion del invoice pool " + err);
        });
    }

    function getRegistro(key)
    {
        var registro = dataState.find((o) => o.id === key)
        setRecordReject(registro) 
        toggleModalRejectRecord()
    }

    function aprobarPool(obj) {
        
        const catRegister = {
            piIdInvoicePool: obj.idInvoicePool,
            pvUser: user,
            pvIP: ip,
            petitionType: "FRONT"
        };

        //var url = new URL(`http://localhost:8091/api/invoices-pool/accept-invoice-pool/`);
        var url = new URL(`${process.env.REACT_APP_API_URI}invoices-pool/accept-invoice-pool/`);
    
        fetch(url, {
            method: "POST",
            body: JSON.stringify(catRegister),
            headers: {
                "access-token": token,
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            autoCloseAlert(data.data.message)
            updateAddData()
        });
    }
    
    function reenviarDocumento(pool)
    {
        const catRegister = {
            idPool: pool.idInvoicePool,
            idRole : rol,
            headerPHPath: pool.headerPHPath,
            pvUser: user,
            pvIP: ip
        };

        //var url = new URL(`http://localhost:8091/api/invoices-pool/upload-adobe-sign/`);
        var url = new URL(`${process.env.REACT_APP_API_URI}invoices-pool/upload-adobe-sign/`);
    
        fetch(url, {
            method: "POST",
            body: JSON.stringify(catRegister),
            headers: {
                "access-token": token,
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            autoCloseAlert(data.message)
            updateAddData()
        });
    }

    function enviarDocumento(pool)
    {
        const catRegister = {
            idPool: pool.idInvoicePool,
            idRole : rol,
            documentId: pool.documentId,
            pvUser: user,
            pvIP: ip
        };

        console.log(catRegister)

        //var url = new URL(`http://localhost:8091/api/invoices-pool/upload-adobe-sign/`);
        var url = new URL(`${process.env.REACT_APP_API_URI}invoices-pool/send-agreement/`);
    
        fetch(url, {
            method: "POST",
            body: JSON.stringify(catRegister),
            headers: {
                "access-token": token,
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            autoCloseAlert(data.message)
            updateAddData()
        });
    }

    const [modalReadRecord, setModalReadRecord] = useState(false);
    const [modalRejectRecord, setModalRejectRecord] = useState(false);

    function toggleModalReadRecord(){
        if(modalReadRecord == false){
            setModalReadRecord(true);
        }
        else{
            setModalReadRecord(false);
        }
    }

    function toggleModalRejectRecord(){
        if(modalRejectRecord == false){
            setModalRejectRecord(true);
        }
        else{
            setModalRejectRecord(false);
        }
    }

    return (
        <div>
            <ReactTable
                data={dataState}
                columns={[
                    {
                        Header: "# Carátula",
                        accessor: "idInvoicePool",
                    },
                    {
                        Header: "Compañía",
                        accessor: "company",
                    },
                    {
                        Header: "Proveedor",
                        accessor: "vendor",
                    },
                    {
                        Header: "Fecha Pool",
                        accessor: "poolDate",
                    },
                    {
                        Header: "Total Facturas",
                        accessor: "totalFacturas",
                    },
                    {
                        Header: "Monto Total",
                        accessor: "totalAmount",
                    },
                    {
                        Header: "Estatus",
                        accessor: "estatus",
                    },
                    {
                        Header: "Generado Por",
                        accessor: "generadoPor",
                    },
                    {
                        Header: "Siguiente Firmante",
                        accessor: "nextSigner",
                    },
                    {
                        Header: "Acciones",
                        accessor: "actions",
                        sortable: false,
                        filterable: false,
                    },
                ]}
                /*
                    You can choose between primary-pagination, info-pagination, success-pagination, warning-pagination, danger-pagination or none - which will make the pagination buttons gray
                    */
                className="-striped -highlight primary-pagination"
            />
            {/*MODAL PARA VER REGISTRO*/}
            <ModalVerDetallePool abierto = {modalReadRecord} toggleModalReadRecord = {toggleModalReadRecord} record = {record} poolNumber = {poolNumber} vendor = {vendor}/>

            {/*MODAL PARA RECHAZAR REGISTRO*/}
            <ModalRechazarPool modalRejectRecord = {modalRejectRecord} setModalRejectRecord = {setModalRejectRecord} ip = {ip} autoCloseAlert = {autoCloseAlert} dataTrackerReasons = {dataTrackerReasons} recordReject = {recordReject} updateAddData = {updateAddData}/>
        </div>
    )
    
}
export default InvoicesPoolsTable