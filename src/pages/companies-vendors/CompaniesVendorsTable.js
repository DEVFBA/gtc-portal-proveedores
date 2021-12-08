import React, {Component} from 'react'
import { useState, useEffect} from "react";
import ReactTable from "../../reacttable/ReactTable";
import Skeleton from '@yisheng90/react-loading';

import ModalUpdateCompanyVendor from "./ModalUpdateCompanyVendor.js";

function CompaniesVendorsTable({dataTable, ip, autoCloseAlert, updateAddData, dataCountries, pathLogo}) {
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
              company: prop.Company,
              idVendor: prop.Id_Vendor,
              vendor: prop.Vendor,
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

    const token = localStorage.getItem("Token");

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

    function updateCompanies(){
        //Aqui vamos a descargar la lista de roles de la base de datos por primera vez
        const params = {
            pvOptionCRUD: "R"
        };
      
        var url = new URL(`http://129.159.99.152/develop-vendors/api/companies/`);
    
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    
        fetch(url, {
            method: "GET",
            headers: {
                "access-token": token,
                "Content-Type": "application/json",
            }
        })
        .then(function(response) {
            return response.ok ? response.json() : Promise.reject();
        })
        .then(function(data) {
            var optionsAux = [];
            var i;
            for(i=0; i<data.length; i++)
            {
            optionsAux.push({
                value: data[i].Id_Company, label: data[i].Name
            })
            }
            setDataCompanies(optionsAux)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de las companies" + err);
        });
    }

    return (
        <div>
            <ReactTable
                data={dataState}
                columns={[
                    {
                        Header: "Compañía",
                        accessor: "company",
                    },
                    {
                        Header: "Proveedor",
                        accessor: "vendor",
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
            <ModalUpdateCompanyVendor modalUpdateRecord = {modalUpdateRecord} setModalUpdateRecord = {toggleModalUpdateRecord} record = {record} ip = {ip}  updateAddData = {updateAddData} autoCloseAlert = {autoCloseAlert}/>
        </div>
    )
    
}
export default CompaniesVendorsTable