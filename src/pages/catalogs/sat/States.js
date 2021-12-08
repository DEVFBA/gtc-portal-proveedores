import React, {Component} from 'react'

import { useState, useEffect} from "react";
import ReactTable from "../../../reacttable/ReactTable";

//import ModalAddCFDIUses from "./modals/ModalAddCFDIUses";
//import ModalUpdateCFDIUses from "./modals/ModalUpdateCFDIUses.js";

function States({dataTable, ip, autoCloseAlert, updateAddData}) {
    const [dataState, setDataState] = useState(
        dataTable.map((prop, key) => {
            var status;
            if(prop.Status === true){
                status = "Habilitado"
            }
            else{
                status = "No Habilitado"
            }
            return {
              id: key,
              idCountry: prop.Id_Country,
              countryDesc: prop.Country_Desc,
              idState: prop.Id_State,
              stateDesc: prop.State_Desc,
              status: status,
            };
        })
    )
    const [search, setSearch] = useState("")
    const [itemsPerPage, setItemsPerPage] = useState(10)

    const [modalAddRecord, setModalAddRecord] = useState(false);
    const [modalUpdateRecord, setModalUpdateRecord] = useState(false);

    //Para saber que usuario se va a editar
    const [record, setRecord] = useState({});

    function getRegistro(key)
    {
        var registro = dataState.find((o) => o.id === key)
        setRecord(registro) 
    }

    function toggleModalAddRecord(){
        if(modalAddRecord == false){
        setModalAddRecord(true);
        }
        else{
        setModalAddRecord(false);
        }
    }

    function toggleModalUpdateRecord(){
        if(modalUpdateRecord == false){
        setModalUpdateRecord(true);
        }
        else{
        setModalUpdateRecord(false);
        }
    }

    return (
        <div>
            <ReactTable
                data={dataState}
                columns={[
                    {
                        Header: "Id País",
                        accessor: "idCountry",
                    },
                    {
                        Header: "Nombre País",
                        accessor: "countryDesc",
                    },
                    {
                        Header: "Id Estado",
                        accessor: "idState",
                    },
                    {
                        Header: "Nombre Estado",
                        accessor: "stateDesc",
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
export default States