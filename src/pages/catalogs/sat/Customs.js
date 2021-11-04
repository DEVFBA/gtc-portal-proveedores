import React, {Component} from 'react'
import Table from '../../../tables/reactable/DefaultTable'
import { useState, useEffect} from "react";

import ModalAddCustoms from "./modals/ModalAddCustoms";
import ModalUpdateCustoms from "./modals/ModalUpdateCustoms";

function Customs({dataTable, ip, autoCloseAlert, updateAddData}) {
     //Para saber que usuario se va a editar
     const [record, setRecord] = useState({});

    const [columns, setColumns] = useState(
        [
            'idR',
            'shortDescription',
            'longDescription',
            'status',
            'actions'
        ]
    )
    const [columnNames, setColumnNames] = useState(
        [
            'Id',
            'Desc. Corta',
            'Desc. Larga',
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
                    Agregar nuevo registro
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
            <ModalAddCustoms modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>

            {/*MODAL PARA MODIFICAR REGISTRO*/}
            <ModalUpdateCustoms abierto = {modalUpdateRecord} toggleModalUpdateRecord = {toggleModalUpdateRecord} record = {record}  ip = {ip} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData}/>
        </div>
    )
    
}
export default Customs