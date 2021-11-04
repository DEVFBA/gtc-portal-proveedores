import React, { useState, useEffect } from "react";

//React plugin used to create DropdownMenu for selecting items
import Select from "react-select";

// core components
import AddUserImage from "./AddUserImage";

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

function ModalAddUser({modalAddRecord, setModalAddRecord, dataRoles, dataVendors, updateAddData, pathImage, ip, autoCloseAlert, validDays}) {
        // register form
    const [registerEmail, setregisterEmail] = React.useState("");
    const [registerFullName, setregisterFullName] = React.useState("");
    const [registerPassword, setregisterPassword] = React.useState("");
    const [registerRol, setregisterRol] = React.useState("");
    const [registerVendor, setregisterVendor] = React.useState();
    const [registerImage, setregisterImage] = React.useState("");
    const [registerStatus, setregisterStatus] = useState(true);
    const [registerConfirmPassword, setregisterConfirmPassword] = React.useState("");

    const [registerEmailState, setregisterEmailState] = React.useState("");
    const [registerFullNameState, setregisterFullNameState] = React.useState("");
    const [registerPasswordState, setregisterPasswordState] = React.useState("");
    const [registerConfirmPasswordState, setregisterConfirmPasswordState] = React.useState("");
    const [registerRolState, setregisterRolState] = React.useState("");
    const [registerVendorState, setregisterVendorState] = React.useState("");

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");

    const handleModalClick = () => {
        //Regresamos todo a su estado inicial
        setregisterEmail("");
        setregisterFullName("");
        setregisterPassword("");
        setregisterRol("");
        setregisterVendor();
        setregisterStatus(true);
        setregisterConfirmPassword("");
        setregisterEmailState("");
        setregisterFullNameState("");
        setregisterPasswordState("");
        setregisterConfirmPasswordState("");
        setregisterRolState("");
        setregisterVendorState();
        setErrorState("")

        //Cerramos el modal
        setModalAddRecord(!modalAddRecord);
    };

        // function that returns true if value is email, false otherwise
    const verifyEmail = (value) => {
        var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRex.test(value)) {
        return true;
        }
        return false;
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

    const verifyPassword = (value) => {
        var passwordRex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{10,50}$/;
        if (passwordRex.test(value)) {
        return true;
        }
        return false;
    };
    
    const isValidated = () => {
        if (
            registerEmailState === "has-success" &&
            registerFullNameState === "has-success" &&
            registerPasswordState === "has-success" &&
            registerRolState === "has-success" &&
            registerVendorState === "has-success" &&
            registerConfirmPasswordState === "has-success"
        ) {
          return true;
        } else {
          if (registerEmailState !== "has-success") {
            setregisterEmailState("text-danger");
          }
          if (registerFullNameState !== "has-success") {
            setregisterFullNameState("text-danger");
          }
          if (registerPasswordState !== "has-success") {
            setregisterPasswordState("text-danger");
          }
          if (registerConfirmPasswordState !== "has-success") {
            setregisterConfirmPasswordState("text-danger");
          }
          if (registerRolState !== "has-success") {
            setregisterRolState("text-danger");
          }
          if (registerVendorState !== "has-success") {
            setregisterVendorState("text-danger");
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

    /* Función que suma o resta días a una fecha, si el parámetro
   días es negativo restará los días*/
    function sumarDias(fecha, dias){
        fecha.setDate(fecha.getDate() + dias);
        return fecha;
    }

    function addRegister(){

        var d = new Date();
        var finalDate = sumarDias(d, validDays);
        //var finalDate = sumarDias(d, 90);
        var date = finalDate.getDate();
        var month = finalDate.getMonth() + 1
        var year = finalDate.getFullYear()
        var finalDate2 = ""

        if(month < 10 && date < 10)
        {
            finalDate2 = "" + year + "0" + month + "0" + date;  
        }
        else if(date < 10)
        {
            finalDate2 = "" + year + "" + month + "0" + date;
        }
        else if(month < 10) 
        {  
            finalDate2 = "" + year + "0" + month + "" + date;
        }
        else{
            finalDate2 = "" + year + "" + month + "" + date;
        }
        
        //EL USUARIO HAY QUE CAMBIARLO POR EL QUE SE HAYA LOGGEADO
        console.log("piIdVendor: "+ registerVendor.value)
        console.log("pvIdUser: " + registerEmail)
        console.log("pvIdRole: "+ registerRol.value)
        console.log("pvPassword: " + registerPassword)
        console.log("pvName: "+ registerFullName)
        console.log("pbTempPassword: " + true)
        console.log("pvFinalEffectiveDate: "+ finalDate2)
        console.log("pvProfilePicPath: " + registerImage)
        console.log("pvUser: " + "ANGUTIERRE")
        console.log("pvIP: " + ip)

        const catRegister = {
            pvOptionCRUD: "C",
            piIdVendor: registerVendor.value,
            pvIdUser: registerEmail,
            pvIdRole: registerRol.value,
            pvPassword: registerPassword,
            pvName: registerFullName,
            pbTempPassword: true,
            pvFinalEffectiveDate: finalDate2,
            pvProfilePicPath: registerImage,
            pbStatus: registerStatus,
            pvUser: "ANGUTIERRE",
            pathImage : pathImage,
            pvIP: ip
        };
    
        fetch(`http://localhost:8091/api/security-users/create-user/`, {
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
            <h5 className="modal-title">Añadir Usuario</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
                <span aria-hidden="true">×</span>
            </button>
            </div>
            <ModalBody>
            <Form id="RegisterValidation">
                <Row className="justify-content-center">
                    <Col className="mt-3" lg="10">
                        <FormGroup className={`form-group ${registerEmailState}`}>
                            <label>Correo electrónico / Id Usuario *</label>
                            <Input
                                name="email"
                                type="email"
                                autoComplete="off"
                                onChange={(e) => {
                                if (!verifyEmail(e.target.value)) {
                                    setregisterEmailState("text-danger");
                                } else {
                                    setregisterEmailState("has-success");
                                }
                                setregisterEmail(e.target.value);
                                }}
                            />
                            {registerEmailState === "text-danger" ? (
                                <label className="form-text text-danger">
                                Por favor ingresa un correo electrónico válido.
                                </label>
                            ) : null}
                        </FormGroup>
                        <FormGroup className={`form-group ${registerFullNameState}`}>
                            <label>Nombre Usuario *</label>
                            <Input
                                name="fullname"
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
                            <label className="form-text text-danger">Este campo es requerido.</label>
                            ) : null}
                        </FormGroup>
                        <FormGroup className={`form-group ${registerPasswordState}`}>
                            <label>Password *</label>
                            <Input
                                id="registerPassword"
                                name="password"
                                type="password"
                                autoComplete="off"
                                onChange={(e) => {
                                if (!verifyPassword(e.target.value)) {
                                    setregisterPasswordState("text-danger");
                                } else {
                                    setregisterPasswordState("has-success");
                                }
                                setregisterPassword(e.target.value);
                                }}
                            />
                            {registerPasswordState === "text-danger" ? (
                                <label className="form-text text-danger">La contraseña debe tener una longitud mínima de 10 caracteres, al menos un número, una letra mayúscula y minúscula, y un caracter especial.</label>
                            ) : null}
                        </FormGroup>
                        <FormGroup className={`form-group ${registerConfirmPasswordState}`}>
                            <label>Confirmar Password *</label>
                            <Input
                                equalto="#registerPassword"
                                id="registerPasswordConfirmation"
                                name="password_confirmation"
                                type="password"
                                autoComplete="off"
                                onChange={(e) => {
                                if (!compare(e.target.value, registerPassword)) {
                                    setregisterConfirmPasswordState("text-danger");
                                    //setregisterPasswordState("has-danger");
                                } else {
                                    setregisterConfirmPasswordState("has-success");
                                    //setregisterPasswordState("has-success");
                                }
                                setregisterConfirmPassword(e.target.value);
                                }}
                            />
                        {registerConfirmPasswordState === "text-danger" ? (
                            <label className="form-text text-danger">La contraseña no coincide.</label>
                        ) : null}
                        </FormGroup>
                        <FormGroup className={`form-group ${registerRolState}`}>
                            <Label for="exampleSelect">Rol * </Label>
                            <Select
                                name=""
                                className="react-select"
                                placeholder="Selecciona un rol"
                                classNamePrefix="react-select"
                                value={registerRol}
                                onChange={(value) => {
                                    setregisterRol(value)
                                    setregisterRolState("has-success");
                                }}
                                options={dataRoles}
                            />
                            {registerRolState === "text-danger" ? (
                                <label className="form-text text-danger">Selecciona un rol.</label>
                            ) : null}
                        </FormGroup>
                    </Col>
                    <Col sm="4">
                            <AddUserImage registerImage = {registerImage} setregisterImage={setregisterImage}/>
                    </Col>
                    <Col sm="6">
                        <FormGroup className={`form-group ${registerVendorState}`}>
                            <Label for="exampleSelect">Proveedor * </Label>
                            <Select
                                name=""
                                className="react-select"
                                placeholder="Selecciona un proveedor"
                                classNamePrefix="react-select"
                                value={registerVendor}
                                onChange={(value) => {
                                    setregisterVendor(value)
                                    setregisterVendorState("has-success");
                                }}
                                options={dataVendors}
                            />
                            {registerVendorState === "text-danger" ? (
                                <label className="form-text text-danger">Selecciona un proveedor.</label>
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
                <Button className="buttons" color="secondary" onClick={handleModalClick}>
                    Cerrar
                </Button>
                <Button className="buttons" color="primary" onClick={registerClick}>
                   Guardar Cambios
                </Button>
                </div>
            </ModalFooter>
        </Modal>
    );
}

export default ModalAddUser;