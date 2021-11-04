import React, {Component} from 'react'
import Table from '../../tables/reactable/DefaultTable'
import { useState, useEffect} from "react";

import ModalAddUser from "./ModalAddUser.js";
import ModalUpdateUser from "./ModalUpdateUser.js";

function UsersTable({dataTable, ip, dataRoles, dataVendors, autoCloseAlert, updateAddData, validDays}) {

    const [columns, setColumns] = useState(
        [
            'name',
            'email',
            'rol',
            'status',
            'actions'
        ]
    )
    const [columnNames, setColumnNames] = useState(
        [
            'Nombre',
            'Email',
            'Rol',
            'Estatus',
            'Acciones'
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
              name: prop.Name,
              email: prop.User,
              rol: prop.Role_Desc,
              idRole: prop.Id_Role,
              status: status,
              vendor: prop.Vendor,
              idVendor: prop.Id_Vendor,
              password: prop.Password,
              finalEffectiveDate: prop.Final_Effective_Date,
              image: prop.Profile_Pic_Path,
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
            <span className="input-group-btn rounded-left" onClick={toggleModalAddRecord}>
                <button className="btn btn-primary" type="button">
                    Añadir Usuario 
                </button>
            </span>
            &nbsp;
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
            <ModalAddUser modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord} dataRoles = {dataRoles} dataVendors = {dataVendors} ip = {ip} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData} validDays = {validDays}/>

            {/*MODAL PARA MODIFICAR REGISTRO*/}
            <ModalUpdateUser abierto = {modalUpdateRecord} toggleModalUpdateRecord = {toggleModalUpdateRecord} record = {record} dataRoles ={dataRoles} ip = {ip} dataVendors = {dataVendors} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData} validDays = {validDays}/>
        </div>
    )
    
}
export default UsersTable