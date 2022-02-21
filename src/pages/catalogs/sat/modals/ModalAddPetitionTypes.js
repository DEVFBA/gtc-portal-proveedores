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

function ModalAddPetitionTypes({modalAddRecord, setModalAddRecord, updateAddData, ip, autoCloseAlert}) {
        // register form
    const [registerId, setregisterId] = React.useState("");
    const [registerShortDesc, setregisterShortDesc] = React.useState("");
    const [registerLongDesc, setregisterLongDesc] = React.useState("");
    const [registerStatus, setregisterStatus] = React.useState(true);
    

    const [registerIdState, setregisterIdState] = React.useState("");
    const [registerShortDescState, setregisterShortDescState] = React.useState("");
    const [registerLongDescState, setregisterLongDescState] = React.useState("");

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");

    const handleModalClick = () => {
        //Regresamos todo a su estado inicial
        setregisterId("");
        setregisterShortDesc("");
        setregisterLongDesc("");
        setregisterStatus(true);
        setregisterIdState("");
        setregisterShortDescState("");
        setregisterLongDescState("");
        setErrorState("")
        setErrorMessage("")
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
        if (
            registerIdState === "has-success" &&
            registerShortDescState === "has-success" &&
            registerLongDescState === "has-success" 
        ) {
          return true;
        } else {
          if (registerIdState !== "has-success") {
            setregisterIdState("text-danger");
          }
          if (registerShortDescState !== "has-success") {
            setregisterShortDescState("text-danger");
          }
          if (registerLongDescState !== "has-success") {
            setregisterLongDescState("text-danger");
          }
          return false;
        }
      };

    const registerClick = () => {
        
        if(isValidated()===true)
        {
           //haremos el fetch a la base de datos para agregar el registro
           addRegister()
        }
        else{
            console.log("no entre")
        }
    };

    function addRegister(){

        const catRegister = {
            pSpCatalog: "spSAT_Cat_Petition_Codes_CRUD_Records",
            pvOptionCRUD: "C",
            pvIdCatalog: registerId,
            pvShortDesc: registerShortDesc,
            pvLongDesc: registerLongDesc,
            pbStatus: registerStatus,
            pvUser: user,
            pvIP: ip
        };
    
        fetch(`${process.env.REACT_APP_API_URI}cat-catalogs/create-sat`, {
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
                <h5 className="modal-title">Agregar Registro</h5>
            </div>
            <ModalBody>
            <Form id="RegisterValidation">
                <Row className="justify-content-center">
                    <Col className="mt-3" lg="10">
                        <FormGroup className={`form-group ${registerIdState}`}>
                            <label>Id *</label>
                            <Input
                                name="rol"
                                type="text"
                                autoComplete="off"
                                onChange={(e) => {
                                    if (!verifyLength(e.target.value, 1)) {
                                        setregisterIdState("text-danger");
                                    } else {
                                        setregisterIdState("has-success");
                                    }
                                    setregisterId(e.target.value);
                                }}
                            />
                            {registerIdState === "text-danger" ? (
                                <label className="form-text text-danger">
                                Este campo es requerido.
                                </label>
                            ) : null}
                        </FormGroup>
                        <FormGroup className={`form-group ${registerShortDescState}`}>
                            <label>Descripción Corta *</label>
                            <Input
                                name="shortdesc"
                                type="text"
                                autoComplete="off"
                                onChange={(e) => {
                                    if (!verifyLength(e.target.value, 1)) {
                                        setregisterShortDescState("text-danger");
                                    } else {
                                        setregisterShortDescState("has-success");
                                    }
                                    setregisterShortDesc(e.target.value);
                                }}
                            />
                            {registerShortDescState === "text-danger" ? (
                                <label className="form-text text-danger">Este campo es requerido.</label>
                            ) : null}
                        </FormGroup>
                        <FormGroup className={`form-group ${registerLongDescState}`}>
                            <label>Descripción Larga *</label>
                            <Input
                                id="longdesc"
                                name="longdesc"
                                type="text"
                                autoComplete="off"
                                onChange={(e) => {
                                    if (!verifyLength(e.target.value, 1)) {
                                        setregisterLongDescState("text-danger");
                                    } else {
                                        setregisterLongDescState("has-success");
                                    }
                                    setregisterLongDesc(e.target.value);
                                }}
                            />
                            {registerLongDescState === "text-danger" ? (
                                <label className="form-text text-danger">Este campo es requerido.</label>
                            ) : null}
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                            <Input 
                                type="checkbox" 
                                checked = {registerStatus}
                                onChange={(e) => {
                                    setregisterStatus(e.target.checked)
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

export default ModalAddPetitionTypes;