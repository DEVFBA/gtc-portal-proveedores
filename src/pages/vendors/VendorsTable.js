import React, {Component} from 'react'
import Table from '../../tables/reactable/DefaultTable'
import { useState, useEffect} from "react";

import ModalAddVendor from "./ModalAddVendor";
import ModalUpdateVendor from "./ModalUpdateVendor";

function VendorsTable({dataTable, ip, autoCloseAlert, updateAddData, dataCountries}) {

    const [columns, setColumns] = useState(
        [
            'name',
            'taxId',
            'street',
            'state',
            'country',
            'status',
            'actions'
        ]
    )
    const [columnNames, setColumnNames] = useState(
        [
            'Nombre',
            'RFC',
            'Calle',
            'Estado',
            'Pais',
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
                idVendor: prop.Id_Vendor,
                name: prop.Name,
                taxId: prop.Tax_Id,
                street: prop.Street,
                state: prop.State,
                country: prop.Country_Desc,
                idCountry: prop.Id_Country,
                status: status,
                phone1: prop.Phone_1,
                phone2: prop.Phone_2,
                webPage: prop.Web_Page,
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
                    Añadir Proveedor 
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
            <ModalAddVendor modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord}  ip = {ip} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData} dataCountries = {dataCountries}/>

            {/*MODAL PARA MODIFICAR REGISTRO*/}
            <ModalUpdateVendor modalUpdateRecord = {modalUpdateRecord} setModalUpdateRecord = {toggleModalUpdateRecord} record = {record}  dataCountries = {dataCountries} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>
        </div>
    )
    
}
export default VendorsTable