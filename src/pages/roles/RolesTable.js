import React, {Component} from 'react'
import Table from '../../tables/reactable/DefaultTable'
import { useState, useEffect} from "react";

import ModalAddRol from "./ModalAddRol.js";
import ModalUpdateRol from "./ModalUpdateRol";

function RolesTable({dataTable, ip, autoCloseAlert, updateAddData}) {

    const [columns, setColumns] = useState(
        [
            'idRole',
            'shortDesc',
            'longDesc',
            'status',
            //'actions'
        ]
    )
    const [columnNames, setColumnNames] = useState(
        [
            'Id Rol',
            'Descripción Corta',
            'Descripción Larga',
            'Estatus',
            //'Acciones'
        ]
    )

    //const [items, setItems] = useState(Array.from(countries))
    const [items, setItems] = useState(
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
              idRole: prop.Id_Role,
              shortDesc: prop.Short_Desc,
              longDesc: prop.Long_Desc,
              status: status,
              showCust: prop.Show_Customers,
              /*actions: (
                // ACCIONES A REALIZAR EN CADA REGISTRO
                <div className="actions-center">
                  {/*IMPLEMENTAR EDICION PARA CADA REGISTRO 
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
              ),*/
            };
        })
    )
    const [search, setSearch] = useState("")
    const [itemsPerPage, setItemsPerPage] = useState(10)
  
    function onSearch(e) {
        e.preventDefault()
        setSearch(e.target.value)
        return false
    }

    function onChangeItemsPerPage(e) {
        e.preventDefault()
        setItemsPerPage(e.target.value)
        return false
    }

    const [modalAddRecord, setModalAddRecord] = useState(false);
    const [modalUpdateRecord, setModalUpdateRecord] = useState(false);

    //Para saber que usuario se va a editar
    const [record, setRecord] = useState({});

    function getRegistro(key)
    {
        var registro = items.find((o) => o.id === key)
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
            {/*<span className="input-group-btn rounded-left" onClick={toggleModalAddRecord}>
                <button className="btn btn-primary" type="button">
                    Añadir Rol 
                </button>
            </span>
            &nbsp;*/}
            <Table
                items={items}
                columns={columns}
                columnNames={columnNames}
                itemsPerPage={itemsPerPage}
                search={search}
                onSearch={onSearch}
                onChangeItemsPerPage={onChangeItemsPerPage}
            />

            {/*MODAL PARA AÑADIR REGISTROS*/}
            <ModalAddRol modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord}  ip = {ip} updateAddData = {updateAddData} autoCloseAlert = {autoCloseAlert} />

            {/*MODAL PARA MODIFICAR REGISTRO*/}
            <ModalUpdateRol abierto = {modalUpdateRecord} toggleModalUpdateRecord = {toggleModalUpdateRecord} record = {record}  ip = {ip} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData}/>
        </div>
    )
    
}
export default RolesTable