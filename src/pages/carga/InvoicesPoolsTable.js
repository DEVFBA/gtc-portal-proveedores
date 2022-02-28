import React, {Component} from 'react'
import { useState, useEffect} from "react";
import ReactTable from "../../reacttable/ReactTable";
import fileDownload from 'js-file-download'
import axios from 'axios'
import { Delaunay } from 'd3';

function InvoicesPoolsTable({dataTable, autoCloseAlert}) {

    //Para guardar el token de la sesión
    const token = localStorage.getItem("Token");

    const [dataState, setDataState] = useState(
        dataTable.map((prop, key) => {
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
                idInvoicePool: prop.Id_Invoice_Pool,
                comments: prop.Comments,
                serie: prop.Comments,
                folio: prop.Comments,
                uuid: prop.UUID,
                vendor: prop.UUID,
                idVendor: prop.UUID,
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
                    </div>
                  ),
            };
        })
    );

    function registerClick(item){

        //var url = new URL(`http://localhost:8091/api/invoices-pool/documentation/${item.idInvoicePool}`);
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
                        Header: "Concepto",
                        accessor: "comments",
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
                        Header: "UUID",
                        accessor: "uuid",
                    },
                    {
                        Header: "Proveedor",
                        accessor: "vendor",
                    },
                    {
                        Header: "RFC Proveedor",
                        accessor: "idVendor",
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
export default InvoicesPoolsTable