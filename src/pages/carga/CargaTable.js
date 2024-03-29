import React, {Component} from 'react'
import { useState, useEffect} from "react";
import ReactTable from "../../reacttable/ReactTable";
import { Link, useHistory } from "react-router-dom";

import ModalAddWorkflow from "./ModalAddWorkflow.js";
import ModalVerDetalleInvoice from "./ModalVerDetalleInvoice.js";

import {
    Button,
    Modal, 
    ModalBody, 
    ModalFooter,
    FormGroup,
    Input,
    Label,
    Row,
    Col,
} from "reactstrap";

function CargaTable({dataTable, ip, autoCloseAlert, updateAddData, workflowTypes, workflowTracker, estatusCarga, checkPool, autoCloseAlertEvidencias, excepcionRechazo}) {
    const ambiente = process.env.REACT_APP_ENVIRONMENT
    const history = useHistory();
    const token = localStorage.getItem("Token");
    const role = localStorage.getItem("Id_Role");

    const length = dataTable.length;
    const [budget, setBudget] = useState(Array.from({ length }, () => false));

    const [buttonListP, setButtonListP] = useState(false)

    const [invoicesPool, setInvoicesPool] = useState([])

    const handleInput = (inputEv, index) => {
        console.log(inputEv)
        const value = inputEv
        setBudget((state) => state.map((val, i) => (i !== index ? val : value)));
        //setBudgetP((state) => state.map((val, i) => (i !== index ? val : value)));
    };

    useEffect(() => {
        var dataAux = []
        var j=0
        for(var i=0; i<budget.length; i++)
        {
            if(budget[i] === true)
            {
                dataAux[j] = dataTable[i]
                j++
            }
        }

        if(dataAux.length > 0)
        {
            //Verificamos que todos sean de la misma empresa
            var showButton = true
            var vendorRFC = dataAux[0].Vendor_RFC
            for(var i=0; i<dataAux.length; i++)
            {
                if(dataAux[i].Vendor_RFC !== vendorRFC)
                {
                    showButton = false
                }
            }
            console.log("Estado del boton: " + showButton)
            setButtonListP(showButton)
            setInvoicesPool(dataAux)
            //setInvoicesPool(dataAux)
        }
        else {
            setButtonListP(false)
        }
    }, [budget])

    const [dataState, setDataState] = useState(
        dataTable.map((prop, key) => {
            var fechaFinal1 = "";
            
            if(prop.Due_Date !== null)
            {
                var fecha1 = new Date(prop.Due_Date)
                var date1, month1, year1;

                if(fecha1.getDate() < 10)
                {
                    date1 = "0" + fecha1.getDate()
                }
                else{
                    date1 = fecha1.getDate()
                }
                if((fecha1.getMonth() + 1) < 10)
                {
                    month1 = "0" + (fecha1.getMonth() + 1)
                }
                else 
                {
                    month1 = fecha1.getMonth() + 1
                }
                year1 = fecha1.getFullYear()
                console.log(fecha1.getDate())
                fechaFinal1 = year1 + "-" + month1 + "-" + date1
            }

            var fechaFinal2 = "";
            if(prop.Payment_Date !== null)
            {
                var fecha2 = new Date(prop.Payment_Date)
                var date2, month2, year2;

                if(fecha2.getDate() < 10)
                {
                    date2 = "0" + fecha2.getDate()
                }
                else{
                    date2 = fecha2.getDate()
                }
                if((fecha2.getMonth() + 1) < 10)
                {
                    month2 = "0" + (fecha2.getMonth() + 1)
                }
                else 
                {
                    month2 = fecha2.getMonth() + 1
                }
                year2 = fecha2.getFullYear()
                console.log(fecha2.getDate())
                fechaFinal2 = year2 + "-" + month2 + "-" + date2;
            }

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
              currencyDesc:  prop.Currency_Desc,
              idCurrency:  prop.Id_Currency,
              subtotal:  prop.SubTotal,
              total:  prop.Total,
              transferredTaxes: prop.Transferred_Taxes,
              dueDate: fechaFinal1,
              paymentDate: fechaFinal2,
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
                  {/*vendor === "0" ? (
                      <abbr title="Actualizar Estatus">
                        <button
                            onClick={() => {
                                let obj = dataState.find((o) => o.id === key);
                                //console.log(obj)
                                getRegistro(key);
                                toggleModalAddRecord()
                            }}
                            color="warning"
                            size="sm"
                            className="btn-icon btn-link edit"
                        >
                            <i className="fa fa-edit" />
                        </button>
                    </abbr>
                    ):null*/}
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
                    {prop.Id_Workflow_Status === parseInt(checkPool,10) && role !== "VENDOR" ? (
                        <abbr title="Rechazar Evidencias">
                            <button
                                onClick={() => {
                                    let obj = dataState.find((o) => o.id === key); 
                                    autoCloseAlertEvidencias(obj)
                                    //updateAddData()
                                }}
                                color="warning"
                                size="sm"
                                className="btn-icon btn-link edit"
                            >
                                <i className="fa fa-close" />
                            </button>
                        </abbr>
                    ):null}
                    {prop.Id_Workflow_Status >= parseInt(checkPool,10) && prop.Id_Workflow_Status !== parseInt(excepcionRechazo,10) ? (
                        <abbr title="Ver Evidencias">
                            <button
                                onClick={() => {
                                    let obj = dataState.find((o) => o.id === key); 
                                    history.push(ambiente + `/admin/ver-evidencias/${obj.uuid}/`);
                                }}
                                color="warning"
                                size="sm"
                                className="btn-icon btn-link edit"
                            >
                                <i className="fa fa-eye" />
                            </button>
                        </abbr>
                    ):null}
                    <abbr title="Ver Detalle">
                        <button
                            onClick={() => {
                                getRegistro(key);
                                toggleModalReadRecord()
                            }}
                            color="warning"
                            size="sm"
                            className="btn-icon btn-link edit"
                        >
                            <i className="fa fa-info-circle" />
                        </button>
                    </abbr>
                </div>
              ),
              actions2: (
                // ACCIONES A REALIZAR EN CADA REGISTRO
                <div className="actions-center">
                    {/*IMPLEMENTAR EDICION PARA CADA REGISTRO */}
                    {prop.Id_Workflow_Status === parseInt(checkPool,10) ? (
                        <FormGroup check >
                            <Label check>
                                <Input 
                                    id = "valor"
                                    type="checkbox"
                                    onChange={(e) => {
                                        //setUpdateValue(e.target.checked)
                                        handleInput(e.target.checked, key)
                                    }}
                                />{' '}
                                <span className="form-check-sign">
                                    <span className="check"></span>
                                </span>
                            </Label>
                        </FormGroup>
                  ):null}
                </div>
              ),
            };
        })
    );

    const [modalReadRecord, setModalReadRecord] = useState(false);

    function toggleModalReadRecord(){
        if(modalReadRecord == false){
            setModalReadRecord(true);
        }
        else{
            setModalReadRecord(false);
        }
    }

    const [modalAddRecord, setModalAddRecord] = useState(false);

    //Para saber que usuario se va a visualizar
    const [record, setRecord] = useState([]);

    function getRegistro(key)
    {
        var registro = dataState.find((o) => o.id === key)
        setRecord(registro) 
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

    function createPool()
    {
        history.push(ambiente + `/admin/create-pool/`);
        history.push({
            pathname: ambiente + `/admin/create-pool/`,
            state: { cfdis:  invoicesPool}
        });
    }

    return (
        <div>
            <Row>
                <Col sm = "3">
                </Col>
                <Col sm = "6">
                    {buttonListP === true && role !== "VENDOR" && role !== "ASSIGN" && (role === "PURFREIGHT" || role === "SALFREIGHT") ? ( 
                        <Button className="buttons btn-gtc btn-filter" color="primary" onClick={createPool}>
                            <i className="fa fa-angle-double-right btn-icon" />
                            Crear Pool
                        </Button>)
                    : null}
                </Col>
                <Col sm = "3">
                </Col>
            </Row>
            &nbsp;
            &nbsp;
            <ReactTable
                data={dataState}
                columns={[
                    {
                        Header: "",
                        accessor: "actions2",
                        sortable: false,
                        filterable: false,
                    },
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
            {/*<ModalAddWorkflow modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord} record = {record} ip = {ip} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData} workflowTypes = {workflowTypes} workflowTracker = {workflowTracker}/>*/}

            {/*MODAL PARA VER DETALLE INVOICE*/}
            <ModalVerDetalleInvoice modalReadRecord = {modalReadRecord} setModalReadRecord = {setModalReadRecord} record = {record}/>

            {/*MODAL PARA MODIFICAR REGISTRO*/}
            {/*<ModalUpdateUser abierto = {modalUpdateRecord} toggleModalUpdateRecord = {toggleModalUpdateRecord} record = {record} dataRoles ={dataRoles} ip = {ip} dataVendors = {dataVendors} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData} validDays = {validDays} pathImage = {pathImage} profilePath ={profilePath}/>*/}
        </div>
    )
    
}
export default CargaTable