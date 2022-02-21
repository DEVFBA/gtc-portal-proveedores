import React, {Component} from 'react'
import { useState, useEffect} from "react";
import ReactTable from "../../reacttable/ReactTable";

function CartaPorteRequestsTable({dataTable, dataCompanies}) {

    const [dataState, setDataState] = useState(
        dataTable.map((prop, key) => {
            var company = dataCompanies.find( o => o.Id_Company === prop.Id_Company).Name
            console.log(company)
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
                idCompany: company,
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
                        Header: "Request Number",
                        accessor: "requestNumber",
                    },
                    {
                        Header: "Company",
                        accessor: "idCompany",
                    },
                    {
                        Header: "UUID",
                        accessor: "uuid",
                    },
                    {
                        Header: "Status",
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