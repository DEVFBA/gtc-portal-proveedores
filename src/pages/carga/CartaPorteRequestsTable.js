import React, {Component} from 'react'
import { useState, useEffect} from "react";
import ReactTable from "../../reacttable/ReactTable";
import { Link, useHistory } from "react-router-dom";

function CartaPorteRequestsTable({dataTable, inhabilitarRequest}) {

    const ambiente = process.env.REACT_APP_ENVIRONMENT
    const history = useHistory();

    const idRole = localStorage.getItem("Id_Role");

    const [dataState, setDataState] = useState(
        dataTable.map((prop, key) => {
            //console.log(prop)
            var status;
            if(prop.Status === true)
            {
                status = "Habilitado"
            }
            else {
                status = "No Habilitado"
            }
           
            return {
                id: key,
                requestNumber: prop.Request_Number,
                company: prop.Company,
                vendor: prop.Vendor,
                idCompany: prop.Id_Company,
                idVendor: prop.Id_Vendor,
                uuid: prop.UUID,
                path: prop.Path,
                status: status,
                actions: (
                    // ACCIONES A REALIZAR EN CADA REGISTRO
                    <div className="actions-center">
                        {/*IMPLEMENTAR VISTA DE CFDI PARA CADA REGISTRO */}
                        <abbr title="Ver Contenido CFDI">
                            <button
                            onClick={() => {
                                let obj = dataState.find((o) => o.id === key); 
                                console.log(obj.requestNumber)
                                history.push(ambiente + `/admin/xml-tree-cp-requests/${obj.requestNumber}/`);
                            }}
                            color="warning"
                            size="sm"
                            className="btn-icon btn-link edit"
                            >
                            <i className="fa fa-external-link-square" />
                            </button>
                        </abbr>
                        {/*IMPLEMENTAR INHABILITAR SOLICITUD PARA CADA REGISTRO */}
                        {prop.UUID === null && prop.Status === true && idRole !== "VENDOR" ? (
                            <abbr title="Inhabilitar Solicitud">
                                <button
                                    onClick={() => {
                                        let obj = dataState.find((o) => o.id === key); 
                                        inhabilitarRequest(obj)
                                    }}
                                    color="warning"
                                    size="sm"
                                    className="btn-icon btn-link edit"
                                >
                                    <i className="fa fa-close" />
                                </button>
                            </abbr>
                        ):null}
                    </div>
                ),
            };
        })
    );

    return (
        <div>
            <ReactTable
                data={dataState}
                columns={[
                    {
                        Header: "Número de Solicitud",
                        accessor: "requestNumber",
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
                        Header: "UUID",
                        accessor: "uuid",
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
        </div>
    )
    
}
export default CartaPorteRequestsTable