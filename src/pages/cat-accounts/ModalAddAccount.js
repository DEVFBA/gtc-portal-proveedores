import React, { useState, useEffect } from "react";

//React plugin used to create DropdownMenu for selecting items
import Select from "react-select";

// reactstrap components
import {
    Button,
    Modal, 
    ModalBody, 
    ModalFooter,
    FormGroup,
    Form,
    Input,
    Label,
    Col,
    Row
} from "reactstrap";

function ModalAddAccount({modalAddRecord, setModalAddRecord, dataAccountTypes, updateAddData, ip, autoCloseAlert}) {
        
    const [accountType, setAccountType] = React.useState("");
    const [businessUnit, setBusinessUnit] = React.useState("");
    const [objectAccount, setObjectAccount] = React.useState("");
    const [subsidiary, setSubsidiary] = React.useState("");
    const [accountName, setAccountName] = React.useState();
    const [status, setStatus] = React.useState(true);

    const [accountTypeState, setAccountTypeState] = React.useState("");
    const [businessUnitState, setBusinessUnitState] = React.useState("");
    const [objectAccountState, setObjectAccountState] = React.useState("");
    const [subsidiaryState, setSubsidiaryState] = React.useState("");
    const [accountNameState, setAccountNameState] = React.useState("");

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");

    const handleModalClick = () => {
        //Regresamos todo a su estado inicial
        setAccountType("");
        setBusinessUnit("");
        setObjectAccount("");
        setSubsidiary("");
        setAccountName();
        setStatus(true);
        setAccountTypeState("");
        setBusinessUnitState("");
        setObjectAccountState("");
        setSubsidiaryState("");
        setAccountNameState("");
        setErrorState("")
    
        //Cerramos el modal
        setModalAddRecord(!modalAddRecord);
    };

    // function that verifies if a string has a given length or not
    const verifyLength = (value, length) => {
        if (value.length >= length) {
        return true;
        }
        return false;
    };
    
    const isValidated = () => {
        console.log(accountTypeState)
        console.log(businessUnitState)
        console.log(objectAccountState)
        console.log(subsidiaryState)
        console.log(accountNameState)
        if (
            accountTypeState === "has-success" &&
            businessUnitState === "has-success" &&
            objectAccountState === "has-success" &&
            subsidiaryState === "has-success" &&
            accountNameState === "has-success"
        ) {
          return true;
        } else {
          if (accountTypeState !== "has-success") {
            setAccountTypeState("text-danger");
          }
          if (businessUnitState !== "has-success") {
            setBusinessUnitState("text-danger");
          }
          if (objectAccountState !== "has-success") {
            setObjectAccountState("text-danger");
          }
          if (subsidiaryState !== "has-success") {
            setSubsidiaryState("text-danger");
          }
          if (accountNameState !== "has-success") {
            setAccountNameState("text-danger");
          }
          console.log("ME VALIO MADRE")
          return false;
        }
      };

    const registerClick = () => {
        
        if(isValidated()===true)
        {
           //haremos el fetch a la base de datos para agregar el registro
           addRegister()
        }
        else {
            console.log("no entre")
        }
    };

    function addRegister(){

        const catRegister = {
            pvIdAccountType: accountType.value,
            pvBusinessUnit: businessUnit,
            pvObjectAccount: objectAccount,
            pvSubsidiary: subsidiary,
            pvAccount_Name: accountName,
            pbStatus: status,
            pvUser: user,
            pvIP: ip
        };

        console.log(catRegister)
    
        var url = new URL(`${process.env.REACT_APP_API_URI}cat-accounts/create/`);
        //var url = new URL(`http://localhost:8091/api/cat-accounts/create/`);
        fetch(url, {
            method: "POST",
            body: JSON.stringify(catRegister),
            headers: {
                "access-token": token,
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.errors) {
                setError(
                    <p>Hubo un error al realizar tu solicitud</p>
                );
            }
            else{
                if(data[0].Code_Type === "Warning")
                {
                    setErrorMessage(data[0].Code_Message_User)
                    setErrorState("has-danger")
                    autoCloseAlert(data[0].Code_Message_User)
                }
                else if(data[0].Code_Type === "Error")
                {
                    setErrorMessage(data[0].Code_Message_User)
                    autoCloseAlert(data[0].Code_Message_User)
                    setErrorState("has-danger")
                }
                else{
                    setErrorState("has-success");
                    
                    updateAddData()
                    //Cerramos el modal
                    handleModalClick()
                    autoCloseAlert(data[0].Code_Message_User)
                }
            }
        });
    }

    return (
        <Modal isOpen={modalAddRecord} toggle={handleModalClick} size="lg">
            <div className="modal-header justify-content-center">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
                    <span aria-hidden="true">×</span>
                </button>
                <h5 className="modal-title">Agregar Cuenta</h5>
            </div>
            <ModalBody>
            <Form id="RegisterValidation">
                <Row className="justify-content-center">
                    <Col className="mt-3" lg="10">
                        <FormGroup className={`form-group ${accountTypeState}`}>
                            <Label for="exampleSelect">Tipo de Cuenta * </Label>
                            <Select
                                name=""
                                className="react-select"
                                placeholder="Selecciona un rol"
                                classNamePrefix="react-select"
                                value={accountType}
                                onChange={(value) => {
                                    setAccountType(value)
                                    setAccountTypeState("has-success");
                                }}
                                options={dataAccountTypes}
                            />
                            {accountTypeState === "text-danger" ? (
                                <label className="form-text text-danger">Selecciona una cuenta.</label>
                            ) : null}
                        </FormGroup>
                        <FormGroup className={`form-group ${businessUnitState}`}>
                            <label>Unidad de Negocio *</label>
                            <Input
                                name="bussinesUnit"
                                type="text"
                                autoComplete="off"
                                onChange={(e) => {
                                    if (!verifyLength(e.target.value, 1)) {
                                        setBusinessUnitState("text-danger");
                                    } else {
                                        setBusinessUnitState("has-success");
                                    }
                                    setBusinessUnit(e.target.value);
                                }}
                            />
                            {businessUnitState === "text-danger" ? (
                                 <label className="form-text text-danger">Este campo es requerido.</label>
                            ) : null}
                        </FormGroup>
                        <FormGroup className={`form-group ${objectAccountState}`}>
                            <label>Cuenta Objeto *</label>
                            <Input
                                name="objectAccount"
                                type="text"
                                autoComplete="off"
                                onChange={(e) => {
                                    if (!verifyLength(e.target.value, 1)) {
                                        setObjectAccountState("text-danger");
                                    } else {
                                        setObjectAccountState("has-success");
                                    }
                                    setObjectAccount(e.target.value);
                                }}
                            />
                            {objectAccountState === "text-danger" ? (
                                 <label className="form-text text-danger">Este campo es requerido.</label>
                            ) : null}
                        </FormGroup>
                        <FormGroup className={`form-group ${subsidiaryState}`}>
                            <label>Subcuenta *</label>
                            <Input
                                name="subsidiary"
                                type="text"
                                autoComplete="off"
                                onChange={(e) => {
                                    if (!verifyLength(e.target.value, 1)) {
                                        setSubsidiaryState("text-danger");
                                    } else {
                                        setSubsidiaryState("has-success");
                                    }
                                    setSubsidiary(e.target.value);
                                }}
                            />
                            {subsidiaryState === "text-danger" ? (
                                <label className="form-text text-danger">Este campo es requerido.</label>
                            ) : null}
                        </FormGroup>
                        <FormGroup className={`form-group ${accountNameState}`}>
                            <label>Nombre *</label>
                            <Input
                                name="name"
                                type="text"
                                autoComplete="off"
                                onChange={(e) => {
                                    if (!verifyLength(e.target.value, 1)) {
                                        setAccountNameState("text-danger");
                                    } else {
                                        setAccountNameState("has-success");
                                    }
                                    setAccountName(e.target.value);
                                }}
                            />
                            {accountNameState === "text-danger" ? (
                                <label className="form-text text-danger">Este campo es requerido.</label>
                            ) : null}
                        </FormGroup>
                        <label>Estatus</label>
                        <FormGroup check> 
                            <Input 
                                type="checkbox" 
                                checked = {status}
                                onChange={(e) => {
                                    setregisterStatus(e.target.checked)
                                }}
                            />{' '}
                            Habilitado
                            <span className="form-check-sign">
                                <span className="check"></span>
                            </span>
                        </FormGroup>
                    </Col>
                    <Col className="mt-3" lg="10">
                        <div className="category form-category">
                        * Campos requeridos
                        </div>
                    </Col>  
                    <Col className="mt-3" lg="10">
                        <FormGroup className={`form-group ${errorState}`}>
                            {errorState === "text-danger" ? (
                                <label className="error">
                                    {errorMessage}
                                </label>
                            ) : null}
                        </FormGroup>
                    </Col>    
                    {error}
                </Row>
            </Form>
            </ModalBody>
            <ModalFooter>
                <div className="center-side">
                <Button className="buttons button-close btn-gtc" color="secondary" onClick={handleModalClick}>
                    Cerrar
                </Button>
                <Button className="buttons btn-gtc" color="primary" onClick={registerClick}>
                    Guardar Cambios
                </Button>
                </div>
            </ModalFooter>
        </Modal>
    );
}

export default ModalAddAccount;