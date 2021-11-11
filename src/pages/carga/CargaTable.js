import React, {Component} from 'react'
import { useState, useEffect} from "react";
import ReactTable from "../../reacttable/ReactTable";
import { Link, useHistory } from "react-router-dom";

//import ModalAddUser from "./ModalAddUser.js";
//import ModalUpdateUser from "./ModalUpdateUser.js";

function CargaTable({dataTable, ip, autoCloseAlert, updateAddData, pathFile}) {
    const ambiente = "/DEV-Vendors"
    const history = useHistory();
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
              taxId: prop.Name,
              company: prop.Company,
              taxIdEmisor: prop.Role_Desc,
              emisor: prop.Id_Role,
              uuid: prop.UUID,
              serie: prop.Serie,
              folio: prop.Folio,
              fecha: prop.Invoice_Date,
              status: status,
              actions: (
                // ACCIONES A REALIZAR EN CADA REGISTRO
                <div className="actions-center">
                  {/*IMPLEMENTAR EDICION PARA CADA REGISTRO */}
                  <abbr title="Ver Árbol XML">
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
                  <abbr title="Editar">
                    <button
                      onClick={() => {
                        let obj = dataState.find((o) => o.id === key);
                        //console.log(obj)
                        setRecord(obj)
                        //getRegistro(key);
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
                        Header: "Fecha",
                        accessor: "fecha",
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

            {/*MODAL PARA AÑADIR REGISTROS*/}
            {/*<ModalAddUser modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord} dataRoles = {dataRoles} dataVendors = {dataVendors} ip = {ip} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData} validDays = {validDays} pathImage = {pathImage}/>*/}

            {/*MODAL PARA MODIFICAR REGISTRO*/}
            {/*<ModalUpdateUser abierto = {modalUpdateRecord} toggleModalUpdateRecord = {toggleModalUpdateRecord} record = {record} dataRoles ={dataRoles} ip = {ip} dataVendors = {dataVendors} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData} validDays = {validDays} pathImage = {pathImage} profilePath ={profilePath}/>*/}
        </div>
    )
    
}
export default CargaTable