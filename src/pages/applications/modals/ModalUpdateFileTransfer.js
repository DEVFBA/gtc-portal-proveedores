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

function ModalUpdateFileTransfer({abierto, toggleModalUpdateRecord, record, ip, autoCloseAlert, updateAddData}) {
        // register form
    const [idApplication, setIdApplication] = React.useState();
    const [settingsName, setSettingsName] = React.useState("");
    const [settingsKey, setSettingsKey] = React.useState("");
    const [settingsValue, setSettingsValue] = React.useState("");
    const [tooltip, setTooltip] = useState("");
    const [use, setUse] = useState("");

    const [settingsValueState, setSettingsValueState] = React.useState("");

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");

    const handleModalClick = () => {
        setErrorMessage("") 
        setSettingsValueState("")
        setError("")
        setErrorState("")
        toggleModalUpdateRecord(!abierto);
    };

    useEffect(() => {
        setIdApplication(record.idApplication);
        setSettingsName(record.settingsName)
        setSettingsKey(record.settingsKey)
        setSettingsValue(record.settingsValue)
        setTooltip(record.tooltip)
        setUse(record.use)
    },[record]);

    // function that verifies if a string has a given length or not
    const verifyLength = (value, length) => {
        if (value.length >= length) {
        return true;
        }
        return false;
    };

    //Funcion para validar que no se queden en blanco los inputs en caso de que haga cambios
    const verifyInputs = () =>{
        var value = document.getElementById("settingsvalue").value

        if (!verifyLength(value, 1)) {
            setSettingsValueState("text-danger");
        } else {
            setSettingsValueState("has-success");
        }
        setSettingsValue(value);
    }
    
    const isValidated = () => {

        verifyInputs()
        if (
            settingsValueState !== "has-success" 
        ) {
            return false;
        } else {
            return true;
        }
    };

    const updateClick = () => {
        if(isValidated()===true)
        {
            updateRegister()
        }
    };

    function updateRegister(){
    
        const catRegister = {
            piIdApplication: idApplication,
            pvSettingsKey: settingsKey,
            pvSettingsValue: settingsValue,
            pvUser: user,
            pvIP: ip
        };

        console.log(catRegister)

        var url = new URL(`${process.env.REACT_APP_API_URI}applications-settings/update/`);

        fetch(url, {
            method: "PUT",
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
                    setErrorState("has-danger")
                    autoCloseAlert(data[0].Code_Message_User)
                }
                else{
                    setErrorState("has-success");
                    //Para actualizar la tabla en componente principal
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
                <h5 className="modal-title">Actualizar Registro</h5>
            </div>
            <ModalBody>
            <Form id="RegisterValidation">
                <Row className="justify-content-center">
                    <Col className="mt-3" lg="11">
                        <FormGroup>
                            <label>Nombre</label>
                            <Input
                                name="text"
                                type="text"
                                value = {settingsName}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Clave</label>
                            <Input
                                name="text"
                                type="text"
                                value = {settingsKey}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Tooltip</label>
                            <Input
                                name="text"
                                type="text"
                                value = {tooltip}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup className={`form-group ${settingsValueState}`}>
                            <label>Valor *</label>
                            <Input
                                name="settingsvalue"
                                id="settingsvalue"
                                type="text"
                                value = {settingsValue}
                                onChange={(e) => {
                                    if (!verifyLength(e.target.value, 1)) {
                                        setSettingsValueState("text-danger");
                                    } else {
                                        setSettingsValueState("has-success");
                                    }
                                    setSettingsValue(e.target.value);
                                }}
                            />
                            {settingsValueState === "text-danger" ? (
                                <label className="form-text text-danger">Este campo es requerido.</label>
                            ) : null}
                        </FormGroup>
                    </Col>
                    <Col className="mt-3" lg="11">
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

export default ModalUpdateFileTransfer;