import React, { useState, useEffect } from "react";

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
    Row,
    Col,
} from "reactstrap";

function ModalUpdateAccount({abierto, toggleModalUpdateRecord, record, ip, updateAddData, autoCloseAlert}) {

    const [accountType, setAccountType] = React.useState("");
    const [idAccount, setIdAccount] = React.useState("");
    const [idAccountType, setIdAccountType] = React.useState("");
    const [businessUnit, setBusinessUnit] = React.useState("");
    const [objectAccount, setObjectAccount] = React.useState("");
    const [subsidiary, setSubsidiary] = React.useState("");
    const [accountName, setAccountName] = React.useState();
    const [status, setStatus] = React.useState(true);

    const [accountNameState, setAccountNameState] = React.useState("");

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");


    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");

    const handleModalClick = () => {
        setErrorMessage("") 
        setAccountNameState("")
        setError("")
        setErrorState("")
        setErrorMessage("")
        toggleModalUpdateRecord(!abierto);
    };

    useEffect(() => {
        setIdAccount(record.idAccount)
        setAccountType(record.accountTypeDesc);
        setIdAccountType(record.idAccountType)
        setBusinessUnit(record.businessUnit)
        setObjectAccount(record.objectAccount);
        setSubsidiary(record.subsidiary)
        setAccountName(record.accountName)
        
        if(record.status === "Si")
        {
            setStatus(true);
        }
        else{
            setStatus(false);
        }
    },[record]);

    // function that verifies if a string has a given length or not
    const verifyLength = (value, length) => {
        if (value.length >= length) {
            return true;
        }
        return false;
    };

    function updateClick()
    {
        var accountName = document.getElementById("accountName").value

        if (!verifyLength(accountName, 1)) {
            setAccountNameState("text-danger");
            setAccountName(accountName); 
        } else {
            setAccountNameState("has-success");
            setAccountName(accountName); 
            updateRegister();
        }
    };

    function updateRegister(){
        const catRegister = {
            piIdAccount: idAccount,
            pvIdAccountType: idAccountType,
            pvBusinessUnit: businessUnit,
            pvObjectAccount: objectAccount,
            pvSubsidiary: subsidiary,
            pvAccount_Name: accountName,
            pbStatus: status,
            pvUser: user,
            pvIP: ip
        };

        console.log(catRegister)
    
        var url = new URL(`${process.env.REACT_APP_API_URI}cat-accounts/update/`);
        //var url = new URL(`http://localhost:8091/api/cat-accounts/update/`);
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
        <Modal isOpen={abierto} toggle={handleModalClick} size="lg">
            <div className="modal-header justify-content-center">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
                    <span aria-hidden="true">×</span>
                </button>
                <h5 className="modal-title">Actualizar Cuenta</h5>
            </div>
            <ModalBody>
            <Form method="">
                <Row className="justify-content-center">
                    <Col className="mt-3" lg="10">
                        <FormGroup>
                            <label>Tipo de cuenta</label>
                            <Input
                                name=""
                                type="text"
                                value = {accountType}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Unidad de Negocio</label>
                            <Input
                                name=""
                                type="text"
                                value = {businessUnit}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Cuenta Objeto</label>
                            <Input
                                name=""
                                type="text"
                                value = {objectAccount}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Subcuenta</label>
                            <Input
                                name=""
                                type="text"
                                value = {subsidiary}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup className={`form-group ${accountNameState}`}>
                            <label>Nombre *</label>
                            <Input
                                id="accountName"
                                name="accountName"
                                type="text"
                                autoComplete="off"
                                value = {accountName}
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
                        <FormGroup check >
                            <Label check>
                            <Input 
                                type="checkbox"
                                checked = {status} 
                                onChange={(e) => {
                                    setStatus(e.target.checked)
                                }}
                            />{' '}
                            Habilitado
                            <span className="form-check-sign">
                                <span className="check"></span>
                            </span>
                            </Label>
                        </FormGroup>
                    </Col>
                    <Col className="mt-3" lg="10">
                        <div className="category form-category">
                        * Campos requeridos
                        </div>
                    </Col>  
                    <Col className="mt-3" lg="10">
                        <FormGroup className={`form-text ${errorState}`}>
                            {errorState === "text-danger" ? (
                                <label className="form-text text-danger">
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
                <Button className="buttons btn-gtc" color="primary" onClick={updateClick}>
                    Guardar cambios
                </Button>
                </div>
            </ModalFooter>
        </Modal>
    );
}

export default ModalUpdateAccount;