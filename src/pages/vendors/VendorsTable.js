import React, {Component} from 'react'
import ReactTable from "../../reacttable/ReactTable";
import { useState, useEffect} from "react";

import ModalUpdateVendor from "./ModalUpdateVendor";

function VendorsTable({dataTable, ip, autoCloseAlert, updateAddData, dataCountries}) {

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
            <ReactTable
                data={dataState}
                columns={[
                    {
                        Header: "Nombre",
                        accessor: "name",
                    },
                    {
                        Header: "RFC",
                        accessor: "taxId",
                    },
                    {
                        Header: "Calle",
                        accessor: "street",
                    },
                    {
                        Header: "Estado",
                        accessor: "state",
                    },
                    {
                        Header: "País",
                        accessor: "country",
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

            {/*MODAL PARA MODIFICAR REGISTRO*/}
            <ModalUpdateVendor modalUpdateRecord = {modalUpdateRecord} setModalUpdateRecord = {toggleModalUpdateRecord} record = {record}  dataCountries = {dataCountries} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>
        </div>
    )
    
}
export default VendorsTable