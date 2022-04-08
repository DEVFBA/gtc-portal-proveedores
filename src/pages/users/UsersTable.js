import React, {Component} from 'react'
import { useState, useEffect} from "react";
import ReactTable from "../../reacttable/ReactTable";
import Skeleton from '@yisheng90/react-loading';

import ModalUpdateUser from "./ModalUpdateUser.js";

function UsersTable({dataTable, ip, dataRoles, dataVendors, autoCloseAlert, updateAddData, validDays, pathImage, profilePath, changeImageP, setChangeImageP, dataDepartments}) {
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
              name: prop.Name,
              user: prop.User,
              email: prop.Email,
              rol: prop.Role_Desc,
              idRole: prop.Id_Role,
              status: status,
              vendor: prop.Vendor,
              idVendor: prop.Id_Vendor,
              password: prop.Password,
              idDepartment: prop.Id_Department,
              departmentDesc: prop.Department_Desc,
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
    );

    
    const [modalUpdateRecord, setModalUpdateRecord] = useState(false);

    //Para saber que usuario se va a editar
    const [record, setRecord] = useState([]);

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
                        Header: "Email",
                        accessor: "email",
                    },
                    {
                        Header: "Rol",
                        accessor: "rol",
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
            <ModalUpdateUser abierto = {modalUpdateRecord} toggleModalUpdateRecord = {toggleModalUpdateRecord} record = {record} dataRoles ={dataRoles} ip = {ip} dataVendors = {dataVendors} updateAddData = {updateAddData} validDays = {validDays} pathImage = {pathImage} profilePath ={profilePath} autoCloseAlert = {autoCloseAlert} changeImageP = {changeImageP} setChangeImageP = {setChangeImageP} dataDepartments = {dataDepartments}/>
        </div>
    )
    
}
export default UsersTable