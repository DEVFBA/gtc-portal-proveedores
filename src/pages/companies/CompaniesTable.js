import React, {Component} from 'react'
import ReactTable from "../../reacttable/ReactTable";
import { useState, useEffect} from "react";
import ModalUpdateCompany from "./ModalUpdateCompany";

function CompaniesTable({dataTable, ip, autoCloseAlert, updateAddData, dataCountries, pathLogo, profilePath}) {

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
              idCompany: prop.Id_Company,
              nombre: prop.Name,
              taxId: prop.Tax_Id,
              street: prop.Street,
              interiorNumber: prop.Int_Number,
              exteriorNumber: prop.Ext_Number,
              city: prop.City,
              country: prop.Country_Desc,
              idCountry: prop.Id_Country,
              status: status,
              zipCode: prop.Zip_Code,
              contact: prop.Contact_Person,
              phone1: prop.Phone_1,
              phone2: prop.Phone_2,
              webPage: prop.Web_Page,
              logo: prop.Logo,
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
                        accessor: "nombre",
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
                        Header: "No. Interior",
                        accessor: "interiorNumber",
                    },
                    {
                        Header: "No. Exterior",
                        accessor: "exteriorNumber",
                    },
                    {
                        Header: "Ciudad",
                        accessor: "city",
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
            <ModalUpdateCompany modalUpdateRecord = {modalUpdateRecord} setModalUpdateRecord = {toggleModalUpdateRecord} record = {record}  dataCountries = {dataCountries} pathLogo = {pathLogo} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert} profilePath = {profilePath}/>
        </div>
    )
    
}
export default CompaniesTable