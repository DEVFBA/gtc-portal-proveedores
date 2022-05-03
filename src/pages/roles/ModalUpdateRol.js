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

function ModalUpdateRol({abierto, toggleModalUpdateRecord, record, autoCloseAlert, ip, updateAddData}) {
        // register form
    const [updateId, setupdateId] = React.useState("");
    const [updateShortDesc, setupdateShortDesc] = React.useState("");
    const [updateLongDesc, setupdateLongDesc] = React.useState("");
    const [updateShowCust, setupdateShowCust] = useState(false);
    const [updateStatus, setupdateStatus] = useState();

    const [updateIdState, setupdateIdState] = React.useState("");
    const [updateShortDescState, setupdateShortDescState] = React.useState("");
    const [updateLongDescState, setupdateLongDescState] = React.useState("");
    const [updateShowCustState, setupdateShowCustState] = React.useState("");

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");

    const handleModalClick = () => {
        setErrorMessage("") 
        setupdateIdState("")
        setupdateShortDescState("")
        setupdateLongDescState("")
        setupdateShowCustState("")
        setError("")
        setErrorState("")
        setErrorMessage("")
        toggleModalUpdateRecord(!abierto);
    };

    useEffect(() => {
        setupdateId(record.idRole);
        setupdateShortDesc(record.shortDesc)
        setupdateLongDesc(record.longDesc)
        setupdateShowCust(record.showCust)
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
        var shortDesc = document.getElementById("shortdesc").value
        var longDesc = document.getElementById("longdesc").value

        if (!verifyLength(shortDesc, 1)) {
            setupdateShortDescState("text-danger");
        } else {
            setupdateShortDescState("has-success");
        }
        setupdateShortDescState(shortDesc);

        if (!verifyLength(longDesc, 1)) {
            setupdateLongDescState("text-danger");
        } else {
            setupdateLongDescState("has-success");
        }
        setupdateLongDescState(longDesc);

    }
    
    const isValidated = () => {

        verifyInputs()
        if (
            updateShortDescState !== "text-danger" &&
            updateLongDescState !== "text-danger"
        ) {
            return true;
        } else {
          return false;
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
            pvOptionCRUD: "U",
            pvIdRole: updateId,
            pvShortDesc: updateShortDesc,
            pvLongDesc: updateLongDesc,
            pbShowCustomers: updateShowCust,
            pbStatus: updateStatus,
            pvUser: user,
            pvIP: ip
        };

        fetch(`${process.env.REACT_APP_API_URI}security-roles/update-rol/`, {
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

    /* Función que suma o resta días a una fecha, si el parámetro
   días es negativo restará los días*/
    function sumarDias(fecha, dias){
        fecha.setDate(fecha.getDate() + dias);
        return fecha;
    }

    return (
        <Modal isOpen={abierto} toggle={handleModalClick} size="lg">
            <div className="modal-header justify-content-center">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
                    <span aria-hidden="true">×</span>
                </button>
                <h5 className="modal-title">Actualizar Rol</h5>
            </div>
            <ModalBody>
            <Form id="RegisterValidation">
                <Row className="justify-content-center">
                    <Col className="mt-3" lg="10">
                        <FormGroup>
                            <label>Id Rol</label>
                            <Input
                                name="text"
                                type="text"
                                value = {updateId}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup className={`form-group ${updateShortDescState}`}>
                            <label>Descripción Corta * </label>
                            <Input
                            name="shortdesc"
                            id="shortdesc"
                            type="text"
                            value = {updateShortDesc}
                            onChange={(e) => {
                                if (!verifyLength(e.target.value, 1)) {
                                    setupdateShortDescState("text-danger");
                                } else {
                                    setupdateShortDescState("has-success");
                                }
                                setupdateShortDesc(e.target.value);
                            }}
                            />
                            {updateShortDescState === "text-danger" ? (
                                <label className="form-text text-danger">Este campo es requerido.</label>
                            ) : null}
                        </FormGroup>
                        <FormGroup className={`form-group ${updateLongDescState}`}>
                            <label>Descripción Larga * </label>
                            <Input
                            name="longdesc"
                            id="longdesc"
                            type="text"
                            value = {updateLongDesc}
                            onChange={(e) => {
                                if (!verifyLength(e.target.value, 1)) {
                                    setupdateLongDescState("text-danger");
                                } else {
                                    setupdateLongDescState("has-success");
                                }
                                setupdateLongDesc(e.target.value);
                            }}
                            />
                            {updateLongDescState === "text-danger" ? (
                                <label className="form-text text-danger">Este campo es requerido.</label>
                            ) : null}
                        </FormGroup>
                    </Col>
                    <Col className="mt-3" lg="10">
                        <label>Estatus</label>
                        <FormGroup check >
                            <Label check>
                            <Input 
                                type="checkbox"
                                checked = {updateStatus} 
                                onChange={(e) => {
                                    setupdateStatus(e.target.checked)
                                }}
                            />{' '}
                            Habilitado
                            <span className="form-check-sign">
                                <span className="check"></span>
                            </span>
                            </Label>
                        </FormGroup>
                        <label>Mostrar a los clientes</label>
                        <FormGroup check >
                            <Label check>
                            <Input 
                                type="checkbox"
                                checked = {updateShowCust} 
                                onChange={(e) => {
                                    setupdateShowCust(e.target.checked)
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

export default ModalUpdateRol;