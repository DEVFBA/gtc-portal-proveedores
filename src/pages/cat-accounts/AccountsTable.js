import React, {Component} from 'react'
import { useState, useEffect} from "react";
import ReactTable from "../../reacttable/ReactTable";

import ModalUpdateAccount from "./ModalUpdateAccount.js";

function AccountsTable({dataTable, ip, autoCloseAlert, updateAddData}) {
    const [dataState, setDataState] = useState(
        dataTable.map((prop, key) => {
            var freightWithholding;
            if(prop.Freight_Withholding === true){
                freightWithholding = "Si"
            }
            else{
                freightWithholding = "No"
            }
            return {
              id: key,
              accountName: prop.Account_Name,
              accountTypeDesc: prop.Account_Type_Desc,
              businessUnit: prop.Business_Unit,
              freightWithholding: freightWithholding,
              idAccount: prop.Id_Account,
              idAccountType: prop.Id_Account_Type,
              idRole: prop.Id_Role,
              objectAccount: prop.Object_Account,
              status: prop.Status,
              subsidiary: prop.Subsidiary,
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
                        Header: "Tipo de Cuenta",
                        accessor: "accountTypeDesc",
                    },
                    {
                        Header: "Unidad de Negocio",
                        accessor: "businessUnit",
                    },
                    {
                        Header: "Cuenta Objeto",
                        accessor: "objectAccount",
                    },
                    {
                        Header: "Subcuenta",
                        accessor: "subsidiary",
                    },
                    {
                        Header: "Cuenta",
                        accessor: "accountName",
                    },
                    {
                        Header: "Retención Flete",
                        accessor: "freightWithholding",
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
            <ModalUpdateAccount abierto = {modalUpdateRecord} toggleModalUpdateRecord = {toggleModalUpdateRecord} record = {record} ip = {ip} updateAddData = {updateAddData} autoCloseAlert = {autoCloseAlert} />
        </div>
    )
    
}
export default AccountsTable