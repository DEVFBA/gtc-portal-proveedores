import React, {Component} from 'react'
import { useState, useEffect} from "react";
import ReactTable from "../../reacttable/ReactTable";

function CartaPorteRequestsTable({dataTable}) {

    const [dataState, setDataState] = useState(
        dataTable.map((prop, key) => {
            console.log(prop)
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
                idCompany: prop.Company,
                idVendor: prop.Vendor,
                uuid: prop.UUID,
                status: status,
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
                        accessor: "idCompany",
                    },
                    {
                        Header: "Proveedor",
                        accessor: "idVendor",
                    },
                    {
                        Header: "UUID",
                        accessor: "uuid",
                    },
                    {
                        Header: "Estatus",
                        accessor: "status",
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