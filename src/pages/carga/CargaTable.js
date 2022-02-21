import React, {Component} from 'react'
import { useState, useEffect} from "react";
import ReactTable from "../../reacttable/ReactTable";
import { Link, useHistory } from "react-router-dom";

import ModalAddWorkflow from "./ModalAddWorkflow.js";
//import ModalUpdateUser from "./ModalUpdateUser.js";

function CargaTable({dataTable, ip, autoCloseAlert, updateAddData, workflowTypes, workflowTracker, estatusCarga}) {
    const ambiente = process.env.REACT_APP_ENVIRONMENT
    const history = useHistory();
    const token = localStorage.getItem("Token");
    const role = localStorage.getItem("Id_Role");
    const vendor = localStorage.getItem("Id_Vendor");

    const [dataState, setDataState] = useState(
        dataTable.map((prop, key) => {
            console.log(prop)
            console.log(estatusCarga)
            return {
              id: key,
              taxId: prop.Company_RFC,
              company: prop.Company,
              taxIdEmisor: prop.Vendor_RFC,
              emisor: prop.Vendor,
              uuid: prop.UUID,
              serie: prop.Serie,
              folio: prop.Folio,
              fecha: prop.Invoice_Date,
              status: prop.Workflow_Status,
              idWorkflow: prop.Id_Workflow,
              workflow: null,
              workflowTracker : null,
              actions: (
                // ACCIONES A REALIZAR EN CADA REGISTRO
                <div className="actions-center">
                  {/*IMPLEMENTAR EDICION PARA CADA REGISTRO */}
                  <abbr title="Ver Contenido CFDI">
                    <button
                      onClick={() => {
                        let obj = dataState.find((o) => o.id === key); 
                        history.push(ambiente + `/admin/xml-tree/${obj.uuid}/`);
                      }}
                      color="warning"
                      size="sm"
                      className="btn-icon btn-link edit"
                    >
                      <i className="fa fa-external-link-square" />
                    </button>
                  </abbr>
                  {vendor === "0" ? (
                      <abbr title="Actualizar Estatus">
                        <button
                            /*onClick={() => {
                                let obj = dataState.find((o) => o.id === key);
                                //console.log(obj)
                                getRegistro(key);
                                toggleModalAddRecord()
                            }}*/
                            color="warning"
                            size="sm"
                            className="btn-icon btn-link edit"
                        >
                            <i className="fa fa-edit" />
                        </button>
                    </abbr>
                  ):null}
                  {prop.Id_Workflow_Status === parseInt(estatusCarga[0],10) ? (
                      <abbr title="Carga de evidencias">
                        <button
                            onClick={() => {
                                let obj = dataState.find((o) => o.id === key); 
                                history.push(ambiente + `/admin/carga-evidencias/${obj.uuid}/`);
                            }}
                            color="warning"
                            size="sm"
                            className="btn-icon btn-link edit"
                        >
                            <i className="fa fa-cloud-upload" />
                        </button>
                    </abbr>
                  ):null}
                  {prop.Id_Workflow_Status === parseInt(estatusCarga[1],10) ? (
                      <abbr title="Carga de evidencias">
                        <button
                            onClick={() => {
                                let obj = dataState.find((o) => o.id === key); 
                                history.push(ambiente + `/admin/carga-evidencias/${obj.uuid}/`);
                            }}
                            color="warning"
                            size="sm"
                            className="btn-icon btn-link edit"
                        >
                            <i className="fa fa-cloud-upload" />
                        </button>
                    </abbr>
                  ):null}
                </div>
              ),
            };
        })
    );

    const [modalAddRecord, setModalAddRecord] = useState(false);

    //Para saber que usuario se va a editar
    const [record, setRecord] = useState({});

    function getRegistro(key)
    {
        var registro = dataState.find((o) => o.id === key)
        var url = new URL(`${process.env.REACT_APP_API_URI}workflow/${registro.idWorkflow}`);
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
            var workflow = data[0]
            registro.workflow = workflow    
            getWorkflowTrackerRoles(workflow.Id_Workflow_Status, registro)
        })
        .catch(function(err) {
            console.log("No se pudo consultar la informacion del workflow" + err);
        }); 
    }

    function getWorkflowTrackerRoles(status, registro)
    {
        const params = {
            pvOptionCRUD: "R",
            pvIdRole : role,
            pvIdWorkflowType : "WF-CP",
            piIdWorkflowStatus  : status
        };

        var url = new URL(`${process.env.REACT_APP_API_URI}workflow-tracker-roles/`);
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
            var wtR = []
            for(var i=0; i<data.length; i++)
            {
                wtR.push({
                    value: data[i].Id_Workflow_Status_Change, label: data[i].Workflow_Status_Change_Desc
                })
            }
            registro.workflowTracker = wtR
            setRecord(registro)
        })
        .catch(function(err) {
            console.log("No se pudo consultar la informacion del workflow tracker roles" + err);
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

    return (
        <div>
            <ReactTable
                data={dataState}
                columns={[
                    {
                        Header: "Rfc",
                        accessor: "taxId",
                    },
                    {
                        Header: "Compañia",
                        accessor: "company",
                    },
                    {
                        Header: "RFC Emisor",
                        accessor: "taxIdEmisor",
                    },
                    {
                        Header: "Emisor",
                        accessor: "emisor",
                    },
                    {
                        Header: "UUID",
                        accessor: "uuid",
                    },
                    {
                        Header: "Serie",
                        accessor: "serie",
                    },
                    {
                        Header: "Folio",
                        accessor: "folio",
                    },
                    {
                        Header: "Fecha",
                        accessor: "fecha",
                    },
                    {
                        Header: "Estatus",
                        accessor: "status",
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

            {/*MODAL PARA AÑADIR WORKFLOW*/}
            <ModalAddWorkflow modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord} record = {record} ip = {ip} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData} workflowTypes = {workflowTypes} workflowTracker = {workflowTracker}/>

            {/*MODAL PARA MODIFICAR REGISTRO*/}
            {/*<ModalUpdateUser abierto = {modalUpdateRecord} toggleModalUpdateRecord = {toggleModalUpdateRecord} record = {record} dataRoles ={dataRoles} ip = {ip} dataVendors = {dataVendors} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData} validDays = {validDays} pathImage = {pathImage} profilePath ={profilePath}/>*/}
        </div>
    )
    
}
export default CargaTable