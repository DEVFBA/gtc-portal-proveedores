import React, {Component} from 'react'
import { useState, useEffect} from "react";
import ReactTable from "../../reacttable/ReactTable";
import Skeleton from '@yisheng90/react-loading';

import ModalAddCompanyVendor from "./ModalAddCompanyVendor.js";
import ModalUpdateCompanyVendor from "./ModalUpdateCompanyVendor.js";
import ModalAddCompany2 from "./ModalAddCompany2";
import ModalAddVendor from ".//ModalAddVendor2";

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

    const [modalAddRecord, setModalAddRecord] = useState(false);
    const [modalUpdateRecord, setModalUpdateRecord] = useState(false);

    //Para saber que usuario se va a editar
    const [record, setRecord] = useState([]);

    const token = localStorage.getItem("Token");

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
        console.log(modalAddRecord)
    }

    function toggleModalUpdateRecord(){
        if(modalUpdateRecord == false){
        setModalUpdateRecord(true);
        }
        else{
        setModalUpdateRecord(false);
        }
    }

    const [modalAddCompany, setModalAddCompany] = useState(false);
    const [modalAddVendor, setModalAddVendor] = useState(false);

    function toggleModalAddCompany(){
        event.preventDefault();
        if(modalAddCompany == false){
            setModalAddCompany(true);
        }
        else{
            setModalAddCompany(false);
        }
    }

    function toggleModalAddVendor(){
        event.preventDefault();
        if(modalAddVendor == false){
            setModalAddVendor(true);
        }
        else{
            setModalAddVendor(false);
        }
    }

    const [mensajeAdd, setMensajeAdd] = useState("")
    const [mensajeAdd2, setMensajeAdd2] = useState("")

    //Para actualizar el vendor en el select si es que se agrega una compañia o proveedor desde aqui
    const [companyE, setCompanyE] = useState({});
    const [vendorE, setVendorE] = useState({});

    const [dataCompanies, setDataCompanies] = useState([])

     //Para guardar los datos de los vendors
     const [dataVendors, setDataVendors] = useState([]);

    useEffect(() => {
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
    }, []);

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

    useEffect(() => {
        //Aqui vamos a descargar la lista de roles de la base de datos por primera vez
        const params = {
          pvOptionCRUD: "R"
        };
    
        var url = new URL(`http://129.159.99.152/develop-vendors/api/vendors/`);
    
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
                value: data[i].Id_Vendor, label: data[i].Name
              })
            }
            setDataVendors(optionsAux)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de las vendors" + err);
        });
    }, []);

    function updateVendors(){
        //Aqui vamos a descargar la lista de roles de la base de datos por primera vez
        const params = {
            pvOptionCRUD: "R"
          };
      
          var url = new URL(`http://129.159.99.152/develop-vendors/api/vendors/`);
      
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
                  value: data[i].Id_Vendor, label: data[i].Name
                })
              }
              setDataVendors(optionsAux)
          })
          .catch(function(err) {
              alert("No se pudo consultar la informacion de las vendors" + err);
          });
    }

    return dataTable.length === 0 ? (
        <div>
            <span className="input-group-btn rounded-left">
                <button className="btn btn-primary btn-gtc" onClick={toggleModalAddRecord}>
                    <i className="ion-plus btn-icon"/>
                    Agregar Proveedor - Compañía 
                </button>
                <Skeleton height={25} />
                <Skeleton height="25px" />
                <Skeleton height="3rem" />
            </span>
        </div>
    ) : (
        <div>
            <span className="input-group-btn rounded-left">
                <button className="btn btn-primary btn-gtc" onClick={toggleModalAddRecord}>
                    <i className="ion-plus btn-icon"/>
                    Agregar Proveedor - Compañía 
                </button>
            </span>
            &nbsp;
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

            {/*MODAL PARA AÑADIR REGISTROS*/}
            <ModalAddCompanyVendor modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord}  ip = {ip} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData} dataCompanies = {dataCompanies} dataVendors = {dataVendors} updateVendors = {updateVendors} companyE = {companyE} vendorE = {vendorE} toggleModalAddCompany = {toggleModalAddCompany} mensajeAdd = {mensajeAdd} toggleModalAddVendor = {toggleModalAddVendor} setCompanyE = {setCompanyE} setVendorE = {setVendorE} mensajeAdd2 = {mensajeAdd2}/>

            {/*MODAL PARA MODIFICAR REGISTRO*/}
            <ModalUpdateCompanyVendor modalUpdateRecord = {modalUpdateRecord} setModalUpdateRecord = {toggleModalUpdateRecord} record = {record} ip = {ip}  updateAddData = {updateAddData} autoCloseAlert = {autoCloseAlert}/>

            {/*MODAL PARA AÑADIR REGISTROS*/}
            <ModalAddCompany2 modalAddCompany = {modalAddCompany} setModalAddCompany= {setModalAddCompany} dataCountries = {dataCountries} updateCompanies = {updateCompanies} pathLogo = {pathLogo} ip = {ip} autoCloseAlert = {autoCloseAlert}  setCompanyE = {setCompanyE} toggleModalAddRecord = {toggleModalAddRecord} setModalAddRecord = {setModalAddRecord} setMensajeAdd = {setMensajeAdd}/>

            {/*MODAL PARA AÑADIR REGISTROS*/}
            <ModalAddVendor modalAddVendor = {modalAddVendor} setModalAddVendor = {setModalAddVendor}  ip = {ip} autoCloseAlert = {autoCloseAlert} updateVendors = {updateVendors} dataCountries = {dataCountries} setVendorE = {setVendorE} toggleModalAddRecord = {toggleModalAddRecord} setModalAddRecord = {setModalAddRecord} setMensajeAdd2 = {setMensajeAdd2} updateVendors = {updateVendors}/>
        </div>
    )
    
}
export default CompaniesVendorsTable