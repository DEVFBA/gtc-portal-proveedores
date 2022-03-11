import React, {Component} from 'react'

import { useState, useEffect} from "react";
import ReactTable from "../../reacttable/ReactTable";

import ModalUpdateFileTransfer from "./modals/ModalUpdateFileTransfer.js";

function FileTransfer({dataTable, ip, autoCloseAlert, updateAddData}) {
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
              idApplication: prop.Id_Application,
              settingsKey: prop.Settings_Key,
              settingsName: prop.Settings_Name,
              settingsValue: prop.Settings_Value,
              tooltip: prop.Tooltip,
              use: prop.Use,
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

    const [modalUpdateRecord, setModalUpdateRecord] = useState(false);

    //Para saber que usuario se va a editar
    const [record, setRecord] = useState({});

    function getRegistro(key)
    {
        var registro = dataState.find((o) => o.id === key)
        setRecord(registro) 
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
            &nbsp;
            <ReactTable
                data={dataState}
                columns={[
                    {
                        Header: "Nombre",
                        accessor: "settingsName",
                    },
                    {
                        Header: "Valor",
                        accessor: "settingsValue",
                    },
                    {
                        Header: "Tooltip",
                        accessor: "tooltip",
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

            {/*MODAL PARA MODIFICAR REGISTRO*/}
            <ModalUpdateFileTransfer abierto = {modalUpdateRecord} toggleModalUpdateRecord = {toggleModalUpdateRecord} record = {record}  ip = {ip} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData}/>
        </div>
    )
    
}
export default FileTransfer