import React, {Component} from 'react'
import { useState, useEffect} from "react";
import ReactTable from "../../reacttable/ReactTable";
import ModalUpdateGeneralParameter from "./ModalUpdateGeneralParameter.js";

function CartaPorteRequestsTable({dataTable, autoCloseAlert, updateAddData, ip}) {

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
                idCatalog: prop.Id_Catalog,
                grouper: prop.Grouper_Desc,
                longDesc: prop.Long_Desc,
                valor: prop.Value,
                type: prop.Type,
                dataType: prop.Data_Type,
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
    );

    const [modalUpdateRecord, setModalUpdateRecord] = useState(false);

    //Para saber que usuario se va a editar
    const [record, setRecord] = useState([]);

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
            <ReactTable
                data={dataState}
                columns={[
                    {
                        Header: "Grouper",
                        accessor: "grouper",
                    },
                    {
                        Header: "Descripción",
                        accessor: "longDesc",
                    },
                    {
                        Header: "Valor",
                        accessor: "valor",
                    },
                    {
                        Header: "Tipo",
                        accessor: "type",
                    },
                    {
                        Header: "Status",
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
             {/*MODAL PARA MODIFICAR REGISTRO*/}
             <ModalUpdateGeneralParameter abierto = {modalUpdateRecord} toggleModalUpdateRecord = {toggleModalUpdateRecord} record = {record} ip = {ip} updateAddData = {updateAddData} autoCloseAlert = {autoCloseAlert}/>
        </div>
    )
    
}
export default CartaPorteRequestsTable