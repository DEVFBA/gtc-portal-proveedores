import React, {Component} from 'react'
import ReactTable from "../../../reacttable/ReactTable";
import { useState, useEffect} from "react";

import ModalAddVoucherTypes from "./modals/ModalAddVoucherTypes";
import ModalUpdateVoucherTypes from "./modals/ModalUpdateVoucherTypes.js";

function VoucherTypes({dataTable, ip, autoCloseAlert, updateAddData}) {
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
              idR: prop.Id_Catalog,
              shortDescription: prop.Short_Desc,
              longDescription: prop.Long_Desc,
              status: status,
              actions: (
                // ACCIONES A REALIZAR EN CADA REGISTRO
                <div className="actions-center">
                  {/*IMPLEMENTAR EDICION PARA CADA REGISTRO */}
                  <abbr title="Editar">
                    <button
                      onClick={() => {
                        getRegistro(key);
                        toggleModalUpdateRecord()
                      }}
                      color="warning"
                      size="sm"
                      className="btn-icon btn-link edit"
                    >
                      <i className="fa fa-edit" />
                    </button>
                  </abbr>
                </div>
              ),
            };
        })
    )

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
            <span className="input-group-btn rounded-left" onClick={toggleModalAddRecord}>
                <button className="btn btn-primary" type="button">
                    Agregar nuevo registro
                </button>
            </span>
            &nbsp;
            <ReactTable
                data={dataState}
                columns={[
                    {
                        Header: "Id",
                        accessor: "idR",
                    },
                    {
                        Header: "Desc. Corta",
                        accessor: "shortDescription",
                    },
                    {
                        Header: "Desc. Larga",
                        accessor: "longDescription",
                    },
                    {
                        Header: "Estado",
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

            {/*MODAL PARA AÑADIR REGISTROS*/}
            <ModalAddVoucherTypes modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord}  ip = {ip} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData}/>

            {/*MODAL PARA MODIFICAR REGISTRO*/}
            <ModalUpdateVoucherTypes abierto = {modalUpdateRecord} toggleModalUpdateRecord = {toggleModalUpdateRecord} record = {record}  ip = {ip} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData}/>
        </div>
    )
    
}
export default VoucherTypes