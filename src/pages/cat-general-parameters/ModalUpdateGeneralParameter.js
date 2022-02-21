import { data } from "jquery";
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
    Row,
    Col,
} from "reactstrap";

function ModalUpdateGeneralParameter({abierto, toggleModalUpdateRecord, record, ip, updateAddData, autoCloseAlert}) {
        // register form
    const [updateIdCatalog, setUpdateIdCatalog] = React.useState("");
    const [updateLongDesc, setUpdateLongDesc] = React.useState("");
    const [updateValue, setUpdateValue] = React.useState("");
    const [updateDataType, setUpdateDataType] = useState(false);
    const [updateStatus, setupdateStatus] = useState();
   
    const [updateValueState, setUpdateValueState] = React.useState("has-success");

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");

    const handleModalClick = () => {
        setErrorMessage("") 
        setUpdateIdCatalog("")
        setUpdateLongDesc("")
        setUpdateValue("")
        setUpdateDataType("")
        setupdateStatus("")
        setError("")
        setErrorState("")
        setErrorMessage("")
        toggleModalUpdateRecord(!abierto);
    };

    useEffect(() => {
        setUpdateIdCatalog(record.idCatalog);
        setUpdateLongDesc(record.longDesc)

        if(record.dataType === "String")
        {   
            setUpdateValue(record.valor)
        }
        else 
        {
            setUpdateValue(parseInt(record.valor, 10))
        }
        
        setUpdateDataType(record.dataType)
        
        if(record.status === "Habilitado")
        {
            setupdateStatus(true);
        }
        else{
            setupdateStatus(false);
        }
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
        //console.log(updateDataType)
        var value = document.getElementById("valor").value
        //console.log(value)
        if(updateDataType === "String")
        {
            if (!verifyLength(value, 1)) {
                setUpdateValueState("text-danger");
            } else {
                setUpdateValueState("has-success");
                //console.log("YO SOUY EL PROBLEMA")
            }
            setUpdateValue(value);
        }
    }
    
    const isValidated = () => {

        if(updateDataType === "String")
        {
            verifyInputs()
            if (updateValueState !== "has-success") 
            {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return true
        } 
    }

    const updateClick = () => {
        if(isValidated()===true)
        {
            updateRegister()
        }
    };

    function updateRegister(){
       

        var valorFinal;
        if(updateDataType === "Boolean")
        {
            if(updateValue === false)
            {
                valorFinal = 0
            }
            else {
                valorFinal = 1
            }
        }
        else {
            valorFinal = updateValue
        }

        const catRegister = {
            piIdParameter: updateIdCatalog,
            pvLongDesc: updateLongDesc,
            pvValue: updateValue,
            pvUser: user,
            pvIP: ip,
        };
        
        fetch(`${process.env.REACT_APP_API_URI}general-parameters/update/`, {
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
                    autoCloseAlert(data[0].Code_Message_User)
                    setErrorState("has-danger")
                }
                else if(data[0].Code_Type === "Error")
                {
                    setErrorMessage(data[0].Code_Message_User)
                    setErrorState("has-danger")
                    autoCloseAlert(data[0].Code_Message_User)
                }
                else{
                    setErrorState("has-success");
                    autoCloseAlert(data[0].Code_Message_User)
                    //Para actualizar la tabla en componente principal
                    updateAddData()
                    //Cerramos el modal
                    handleModalClick()
                }
            }
        });
    }

    return (
        <Modal isOpen={abierto} toggle={handleModalClick} size="lg">
            <div className="modal-header justify-content-center">
            <h5 className="modal-title">Actualizar Parámetro General</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
                <span aria-hidden="true">×</span>
            </button>
            </div>
            <ModalBody>
            <Form method="">
                <Row className="justify-content-center">
                    <Col className="mt-3" lg="10">
                        <FormGroup>
                            <label>Id Catálogo</label>
                            <Input
                                name="idCatalog"
                                type="text"
                                value = {updateIdCatalog}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Descripción Larga</label>
                            <Input
                                name="longDesc"
                                type="text"
                                value = {updateLongDesc}
                                readOnly
                            />
                        </FormGroup>
                        { updateDataType === "String" && (
                            <FormGroup className={`form-group ${updateValueState}`}>
                                <label>Valor *</label>
                                <Input
                                    type="text"
                                    id = "valor"
                                    name="valor"
                                    value = {updateValue}
                                    onChange={(e) => {
                                        if (!verifyLength(e.target.value, 1)) {
                                            setUpdateValueState("text-danger");
                                        } else {
                                            setUpdateValueState("has-success");
                                        }
                                        setUpdateValue(e.target.value);
                                    }}
                                /> 
                                {updateValueState === "text-danger" ? (
                                    <label className="error">Este campo es requerido.</label>
                                ) : null}
                            </FormGroup>
                        )}
                        { updateDataType === "Number" && (
                            <FormGroup>
                                <label>Valor *</label>
                                <Input
                                    name="valor"
                                    type="number"
                                    value = {parseInt(updateValue, 10)}
                                    id = "valor"
                                    min="0"
                                    autoComplete="off"
                                    onChange={(e) => {
                                        setUpdateValue(e.target.value);
                                    }}
                                /> 
                            </FormGroup>
                        )}
                        { updateDataType === "Boolean" && (
                            <div>
                                <label>Valor *</label>
                                <FormGroup check >
                                    <Label check>
                                        <Input 
                                            id = "valor"
                                            type="checkbox"
                                            checked = {updateValue} 
                                            onChange={(e) => {
                                                setUpdateValue(e.target.checked)
                                            }}
                                        />{' '}
                                        Requerido
                                        <span className="form-check-sign">
                                            <span className="check"></span>
                                        </span>
                                    </Label>
                                </FormGroup>
                            </div>
                        )}
                        <FormGroup check >
                            <Label check>
                                <Input 
                                    type="checkbox"
                                    checked = {updateStatus} 
                                    readOnly
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

export default ModalUpdateGeneralParameter;