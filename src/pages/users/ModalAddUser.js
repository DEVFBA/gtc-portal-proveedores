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

function ModalAddUser({modalAddRecord, setModalAddRecord, dataRoles, dataVendors, updateAddData, ip, autoCloseAlert, validDays, pathImage, dataDepartments}) {
        // register form
    const [registerIdUser, setregisterIdUser] = React.useState("");
    const [registerEmail, setregisterEmail] = React.useState("");
    const [registerFullName, setregisterFullName] = React.useState("");
    const [registerPassword, setregisterPassword] = React.useState("");
    const [registerRol, setregisterRol] = React.useState("");
    const [registerVendor, setregisterVendor] = React.useState();
    const [registerImage, setregisterImage] = React.useState("");
    const [registerIdDepartment, setregisterIdDepartment] = React.useState("");
    const [registerStatus, setregisterStatus] = useState(true);
    const [registerConfirmPassword, setregisterConfirmPassword] = React.useState("");

    const [registerIdUserState, setregisterIdUserState] = React.useState("");
    const [registerEmailState, setregisterEmailState] = React.useState("");
    const [registerFullNameState, setregisterFullNameState] = React.useState("");
    const [registerPasswordState, setregisterPasswordState] = React.useState("");
    const [registerConfirmPasswordState, setregisterConfirmPasswordState] = React.useState("");
    const [registerRolState, setregisterRolState] = React.useState("");
    const [registerIdDepartmentState, setregisterIdDepartmentState] = React.useState("");
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
        setregisterIdDepartmentState("")

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
        var passwordRex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{12,50}$/;
        if (passwordRex.test(value)) {
            if(value.includes("/") || value.includes(`\\`) || value.includes(`-`) || value.includes(`'`))
            {
                return false;
            }
            else {
                return true;
            }
        }
        return false;
    };
    
    const isValidated = () => {
        if (
            registerIdUserState === "has-success" &&
            registerFullNameState === "has-success" &&
            registerPasswordState === "has-success" &&
            registerRolState === "has-success" &&
            registerVendorState === "has-success" &&
            registerConfirmPasswordState === "has-success" &&
            registerIdDepartmentState === "has-success"
        ) {
          return true;
        } else {
          if (registerIdUserState !== "has-success") {
            setregisterIdUserState("text-danger");
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
          if (registerIdDepartmentState !== "has-success") {
            setregisterIdDepartmentState("text-danger");
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

        const catRegister = {
            pvOptionCRUD: "C",
            piIdVendor: registerVendor.value,
            pvIdUser: registerIdUser,
            pvIdRole: registerRol.value,
            pvPassword: registerPassword,
            pvName: registerFullName,
            pbTempPassword: true,
            pvFinalEffectiveDate: finalDate2,
            pvProfilePicPath: registerImage,
            pvIdDepartment: registerIdDepartment.value,
            pbStatus: registerStatus,
            pvUser: user,
            pathImage : pathImage,
            pvEmail : registerEmail,
            pvIP: ip
        };

        console.log(catRegister)
    
        fetch(`${process.env.REACT_APP_API_URI}security-users/create-user/`, {
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
                <h5 className="modal-title">Agregar Usuario</h5>
            </div>
            <ModalBody>
            <Form id="RegisterValidation">
                <Row className="justify-content-center">
                    <Col className="mt-3" lg="10">
                        <FormGroup className={`form-group ${registerIdUserState}`}>
                            <label>Id Usuario *</label>
                            <Input
                                name="idUser"
                                type="text"
                                autoComplete="off"
                                onChange={(e) => {
                                    if (!verifyLength(e.target.value, 1)) {
                                        setregisterIdUserState("text-danger");
                                    } else {
                                        setregisterIdUserState("has-success");
                                    }
                                    setregisterIdUser(e.target.value);
                                }}
                            />
                            {registerIdUserState === "text-danger" ? (
                                <label className="form-text text-danger">
                                    Este campo es requerido.
                                </label>
                            ) : null}
                        </FormGroup>
                        <FormGroup className={`form-group ${registerEmailState}`}>
                            <label>Correo electrónico</label>
                            <Input
                                name="email"
                                type="text"
                                autoComplete="off"
                                onChange={(e) => {
                                    if (verifyLength(e.target.value, 1)) {
                                        if (!verifyEmail(e.target.value)) {
                                            console.log("ENTRE")
                                            setregisterEmailState("text-danger");
                                        } else {
                                            setregisterEmailState("has-success");
                                        }
                                    }
                                    else {
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
                                <label className="form-text text-danger">La contraseña debe tener una longitud mínima de 12 caracteres, al menos un número, una letra mayúscula y minúscula, y un caracter especial (NO PERMITIDOS:  /  \   -   ').</label>
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
                        <FormGroup className={`form-group ${registerIdDepartmentState}`}>
                            <Label for="exampleSelect">Departamento * </Label>
                            <Select
                                name=""
                                className="react-select"
                                placeholder="Selecciona un departamento"
                                classNamePrefix="react-select"
                                value={registerIdDepartment}
                                onChange={(value) => {
                                    setregisterIdDepartment(value)
                                    setregisterIdDepartmentState("has-success");
                                }}
                                options={dataDepartments}
                            />
                            {registerVendorState === "text-danger" ? (
                                <label className="form-text text-danger">Selecciona un departamento.</label>
                            ) : null}
                        </FormGroup>
                        <label>Estatus</label>
                        <FormGroup check> 
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

export default ModalAddUser;