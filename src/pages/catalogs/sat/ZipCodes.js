import React, {Component} from 'react'

import { useState, useEffect} from "react";
import ReactTable from "../../../reacttable/ReactTable";

import ModalReadZipCodes from "./modals/ModalReadZipCodes";

function ZipCodes({dataTable, ip, autoCloseAlert, updateAddData}) {
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
              idCountry: prop.Id_Country,
              countryDesc: prop.Country_Desc,
              idState: prop.Id_State,
              stateDesc: prop.State_Desc,
              idMunicipality: prop.Id_Municipality,
              municipalityDesc: prop.Municipality_Desc,
              idLocation: prop.Id_Location,
              locationDesc: prop.Location_Desc,
              zipCode: prop.Zip_Code,
              idCounty: prop.Id_County,
              description: prop.Description,
              status: status,
              actions: (
                // ACCIONES A REALIZAR EN CADA REGISTRO
                <div className="actions-center">
                  {/*IMPLEMENTAR EDICION PARA CADA REGISTRO */}
                  <abbr title="Ver Detalle">
                    <button
                      onClick={() => {
                        getRegistro(key);
                        toggleModalReadRecord()
                      }}
                      color="warning"
                      size="sm"
                      className="btn-icon btn-link edit"
                    >
                      <i className="fa fa-info-circle" />
                    </button>
                  </abbr>
                </div>
              ),
            };
        })
    )

    const [modalReadRecord, setModalReadRecord] = useState(false);

    //Para saber que usuario se va a editar
    const [record, setRecord] = useState({});

    function getRegistro(key)
    {
        var registro = dataState.find((o) => o.id === key)
        setRecord(registro) 
    }

    function toggleModalReadRecord(){
        if(modalReadRecord == false){
            setModalReadRecord(true);
        }
        else{
            setModalReadRecord(false);
        }
    }

    return (
        <div>
            <ReactTable
                data={dataState}
                columns={[
                    {
                        Header: "Id País",
                        accessor: "idCountry",
                    },
                    {
                        Header: "Nombre País",
                        accessor: "countryDesc",
                    },
                    {
                        Header: "Código Postal",
                        accessor: "zipCode",
                    },
                    {
                        Header: "Id Colonia",
                        accessor: "idCounty",
                    },
                    {
                        Header: "Nombre Colonia",
                        accessor: "description",
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

            {/*MODAL PARA VER REGISTROS*/}
            <ModalReadZipCodes modalReadRecord = {modalReadRecord} setModalReadRecord = {setModalReadRecord} record = {record}/>
        </div>
    )
    
}
export default ZipCodes