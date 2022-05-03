import React, { useState, useEffect } from "react";

//React plugin used to create DropdownMenu for selecting items
import Select from "react-select";

// core components
import AddLogo from "./AddLogo.js";

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

function ModalAddCompany({modalAddRecord, setModalAddRecord, dataCountries, updateAddData, pathLogo, ip, autoCloseAlert}) {

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");
    // register form
    const [registerFullName, setregisterFullName] = React.useState("");
    const [registerRfc, setregisterRfc] = React.useState("");
    const [registerStreet, setregisterStreet] = React.useState("");
    const [registerNoExterior, setregisterNoExterior] = React.useState("");
    const [registerNoInterior, setregisterNoInterior] = React.useState("");
    const [registerCountry, setregisterCountry] = React.useState("");
    const [registerCity, setregisterCity] = React.useState("");
    const [registerZipCode, setregisterZipCode] = React.useState("");
    const [registerContact, setregisterContact] = React.useState("");
    const [registerTelephone1, setregisterTelephone1] = React.useState("");
    const [registerTelephone2, setregisterTelephone2] = React.useState("");
    const [registerWebPage, setregisterWebPage] = React.useState("");
    const [registerLogo, setregisterLogo] = React.useState("");
    const [registerStatus, setregisterStatus] = useState(true);

    //Mandar error en caso de que ya exista el Country/TaxId
    const [registerError, setregisterError] = useState("");

    const [registerFullNameState, setregisterFullNameState] = React.useState("");
    const [registerRfcState, setregisterRfcState] = React.useState("");
    const [registerStreetState, setregisterStreetState] = React.useState("");
    const [registerNoExteriorState, setregisterNoExteriorState] = React.useState("");
    const [registerNoInteriorState, setregisterNoInteriorState] = React.useState("");
    const [registerCountryState, setregisterCountryState] = React.useState("");
    const [registerCityState, setregisterCityState] = React.useState("");
    const [registerZipCodeState, setregisterZipCodeState] = React.useState("");
    const [registerContactState, setregisterContactState] = React.useState("");
    const [registerTelephone1State, setregisterTelephone1State] = React.useState("");
    const [registerTelephone2State, setregisterTelephone2State] = React.useState("");
    const [registerWebPageState, setregisterWebPageState] = React.useState("");
    const [registerLogoState, setregisterLogoState] = React.useState("");
    const [registerStatusState, setregisterStatusState] = useState(false);

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");
    

    const handleModalClick = () => {
        setregisterFullName("")
        setregisterRfc("")
        setregisterStreet("")
        setregisterNoExterior("")
        setregisterNoInterior("")
        setregisterCountry("")
        setregisterCity("")
        setregisterZipCode("")
        setregisterContact("")
        setregisterTelephone1("")
        setregisterTelephone2("")
        setregisterWebPage("")
        setregisterLogo("")
        setregisterStatus(false)
        setError("")
        setErrorState("")
        setErrorMessage("")
        setModalAddRecord(!modalAddRecord);
    };

    // function that verifies if a string has a given length or not
    const verifyLength = (value, length) => {
        if (value.length >= length) {
        return true;
        }
        return false;
    };

    // function that verifies if two strings are equal
    const compare = (string1, string2) => {
        if (string1 === string2) {
        return true;
        }
        return false;
    };
    
    const isValidated = () => {
        if (
            registerFullNameState === "has-success" &&
            registerRfcState === "has-success" &&
            registerCountryState === "has-success"
        ) {
          return true;
        } else {
          if (registerFullNameState !== "has-success") {
            setregisterFullNameState("text-danger");
          }
          if (registerRfcState !== "has-success") {
            setregisterRfcState("text-danger");
          }
          if (registerCountryState !== "has-success") {
            setregisterCountryState("text-danger");
          }
          return false;
        }
    };

    const registerClick = () => {
        if(isValidated()===true)
        {
            addRegister()
            //haremos el fetch a la base de datos para agregar el registro
        }
        else{
            console.log("no entre")
        }
    };

    function addRegister(){
        const catRegister = {
            pvOptionCRUD: "C",
            pvIdCountry: registerCountry.value,
            pvName: registerFullName,
            pvTaxId: registerRfc,
            pvStreet: registerStreet,
            pvExtNumber: registerNoExterior,
            pvIntNumber: registerNoInterior,
            pvCity: registerCity,
            pvZipCode: registerZipCode,
            pvContactPerson: registerContact,
            pvPhone1 : registerTelephone1,
            pvPhone2 : registerTelephone2,
            pvWebPage : registerWebPage,
            pvLogo : registerLogo,
            pbStatus : registerStatus,
            pvUser : user,
            pathLogo : pathLogo,
            pvIP : ip
        };
    
        fetch(`${process.env.REACT_APP_API_URI}companies/create-company/`, {
            method: "POST",
            body: JSON.stringify(catRegister),
            headers: {
                "access-token": token,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
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
        <Modal isOpen={modalAddRecord} toggle={handleModalClick} size="lg">
            <div className="modal-header justify-content-center">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
                    <span aria-hidden="true">×</span>
                </button>
                <h5 className="modal-title">Agregar Compañía</h5>
            </div>
            <ModalBody>
            <Form id="RegisterValidation">
                <Row className="justify-content-center">
                    <Col className="mt-3" lg="10">
                        <FormGroup className={`form-group ${registerFullNameState}`}>
                            <label>Nombre Completo *</label>
                            <Input
                                name="name"
                                type="text"
                                autoComplete="off"
                                onChange={(e) => {
                                    if (!verifyLength(e.target.value, 1)) {
                                        setregisterFullNameState("text-danger");
                                    } else {
                                        setregisterFullNameState("has-success");
                                    }
                                    setregisterFullName(e.target.value);
                                }}
                            />
                            {registerFullNameState === "text-danger" ? (
                                <label className="error">
                                Este campo es requerido.
                                </label>
                            ) : null}
                        </FormGroup>
                        <FormGroup className={`form-group ${registerRfcState}`}>
                            <label>Rfc / Tax Id *</label>
                            <Input
                                name="rfc"
                                type="text"
                                autoComplete="off"
                                onChange={(e) => {
                                    if (!verifyLength(e.target.value, 1)) {
                                        setregisterRfcState("text-danger");
                                    } else {
                                        setregisterRfcState("has-success");
                                    }
                                    setregisterRfc(e.target.value);
                                }}
                            />
                            {registerRfcState === "text-danger" ? (
                                <label className="error">
                                Este campo es requerido.
                                </label>
                            ) : null}
                        </FormGroup>
                        <FormGroup>
                            <label>Calle</label>
                            <Input
                                name="street"
                                type="text"
                                autoComplete="off"
                                onChange={(e) => {
                                    setregisterStreet(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup >
                            <label>No. Exterior</label>
                            <Input
                                name="noExterior"
                                type="text"
                                autoComplete="off"
                                onChange={(e) => {
                                    setregisterNoExterior(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>No. Interior</label>
                            <Input
                                name="noInterior"
                                type="text"
                                autoComplete="off"
                                onChange={(e) => {
                                    setregisterNoInterior(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup  className={`form-group ${registerCountryState}`}>
                            <Label for="exampleSelect">País * </Label>
                            <Select
                                name="country"
                                className="react-select"
                                placeholder = "Selecciona un país"
                                classNamePrefix="react-select"
                                value={registerCountry}
                                onChange={(value) => {
                                    setregisterCountry(value)
                                    setregisterCountryState("has-success")
                                    //console.log(registerCountry)
                                }}
                                options={dataCountries}
                            />
                            {registerCountryState === "text-danger" ? (
                                <label className="error">
                                    Este campo es requerido.
                                </label>
                            ) : null}
                        </FormGroup>
                        <FormGroup>
                            <label>Ciudad</label>
                            <Input
                                name="city"
                                type="text"
                                autoComplete="off"
                                onChange={(e) => {
                                    setregisterCity(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Código Postal</label>
                            <Input
                                name="zipCode"
                                type="text"
                                autoComplete="off"
                                onChange={(e) => {
                                    setregisterZipCode(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Contacto</label>
                            <Input
                                name="contact"
                                type="text"
                                autoComplete="off"
                                onChange={(e) => {
                                    setregisterContact(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Teléfono 1</label>
                            <Input
                                name="telephone1"
                                type="text"
                                autoComplete="off"
                                onChange={(e) => {
                                    setregisterTelephone1(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Telefono 2</label>
                            <Input
                                name="telephone2"
                                type="text"
                                autoComplete="off"
                                onChange={(e) => {
                                    setregisterTelephone2(e.target.value);
                                }}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm="4">
                        <AddLogo registerLogo = {registerLogo} setregisterLogo={setregisterLogo} registerCountry = {registerCountry.value} registerRfc = {registerRfc}/>
                    </Col>
                    <Col sm="6">
                        <FormGroup>
                            <label>Página Web</label>
                            <Input
                                name="webpage"
                                type="text"
                                autoComplete="off"
                                onChange={(e) => {
                                    setregisterWebPage(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <label>Estatus</label>
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
                        <FormGroup className={`has-label ${errorState}`}>
                            {errorState === "has-danger" ? (
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
                    Guardar cambios
                </Button>
                </div>
            </ModalFooter>
        </Modal>
    );
}

export default ModalAddCompany;