import React, { useState, useEffect } from "react";

//React plugin used to create DropdownMenu for selecting items
import Select from "react-select";

// core components
import UploadUserImage from "./UploadUserImage.js";

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

function ModalUpdateUser({abierto, toggleModalUpdateRecord, record, dataRoles, ip, dataVendors, updateAddData, validDays, pathImage, profilePath, autoCloseAlert}) {
        // register form
    const [updateEmail, setupdateEmail] = React.useState("");
    const [updateFullName, setupdateFullName] = React.useState("");
    const [updatePassword, setupdatePassword] = React.useState("");
    const [updateChangePassword, setupdateChangePassword] = useState(false);
    const [updateTemporal, setupdateTemporal] = useState(false);
    const [updateRol, setupdateRol] = React.useState({});
    const [updateVendor, setupdateVendor] = React.useState("");
    const [updateImage, setupdateImage] = React.useState("");
    const [updateStatus, setupdateStatus] = useState();
    const [updateConfirmPassword, setupdateConfirmPassword] = React.useState("");
    const [updateFinalEffectiveDate, setupdateFinalEffectiveDate] = useState();
    const [changeImage, setChangeImage] = useState(false);

    const [updateEmailState, setupdateEmailState] = React.useState("");
    const [updateFullNameState, setupdateFullNameState] = React.useState("");
    const [updatePasswordState, setupdatePasswordState] = React.useState("");
    const [updateConfirmPasswordState, setupdateConfirmPasswordState] = React.useState("");
    const [updateRolState, setupdateRolState] = React.useState("");
    const [updateVendorState, setupdateVendorState] = React.useState("");

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");


    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");

    const handleModalClick = () => {
        setErrorMessage("") 
        setupdateFullNameState("")
        setupdatePasswordState("")
        setupdateConfirmPasswordState("")
        setupdateRolState("")
        setError("")
        setErrorState("")
        setErrorMessage("")
        toggleModalUpdateRecord(!abierto);
    };

    useEffect(() => {
        setupdateEmail(record.email);
        setupdateFullName(record.name)
        setupdateRol({
            value: record.idRole,
            label: record.rol
        })
        setupdateVendor({
            value: record.idVendor,
            label: record.vendor
        })
        if(record.status === "Habilitado")
        {
            setupdateStatus(true);
        }
        else{
            setupdateStatus(false);
        }
        setupdateImage(record.image)
    },[record]);

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

    //Funcion para validar que no se queden en blanco los inputs en caso de que haga cambios
    const verifyInputs = () =>{
        var fullname = document.getElementById("fullname").value

        if (!verifyLength(fullname, 1)) {
            setupdateFullNameState("text-danger");
        } else {
            setupdateFullNameState("has-success");
        }
        setupdateFullName(fullname);

        if(updateChangePassword === true)
        {
            var password = document.getElementById("password").value
            var passwordConfirmation = document.getElementById("passwordConfirmation").value
            if (!verifyLength(password, 1)) {
                setupdatePasswordState("has-danger");
            } else {
                setupdatePasswordState("has-success");
            }
            setupdatePassword(password);
    
            if (!verifyLength(passwordConfirmation, 1)) {
                setupdateConfirmPasswordState("has-danger");
            } else {
                setupdateConfirmPasswordState("has-success");
            }
            setupdateConfirmPassword(passwordConfirmation)
        }   
    }
    
    const isValidated = () => {

        verifyInputs()
        if (
            updateFullNameState !== "has-success"
        ) {
          if(updateChangePassword === true)
          {
            if(
              updatePasswordState !== "has-success" &&
              updateConfirmPasswordState !== "has-success"
            )
            {
              return false;
            }
            else{
              return true;
            }
          }
          else{
            return false;
          }
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
        var finalDate2=""

        //EL USUARIO HAY QUE CAMBIARLO POR EL QUE SE HAYA LOGGEADO
        if(updateChangePassword === true)
        {
            var d = new Date();
            var finalDate = sumarDias(d, validDays);
            var date = finalDate.getDate();
            var month = finalDate.getMonth() + 1
            var year = finalDate.getFullYear()

            
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
                pvOptionCRUD: "U",
                piIdVendor: updateVendor.value,
                pvIdUser: updateEmail,
                pvIdRole: updateRol.value,
                pvPassword: updatePassword,
                pbTempPassword: updateTemporal,
                pvProfilePicPath: updateImage,
                pvName: updateFullName,
                pbStatus: updateStatus,
                pvFinalEffectiveDate: finalDate2,
                pvUser: user,
                pathImage : pathImage,
                pvIP: ip,
                pvChangeImage: changeImage
            };
        
            fetch(`http://129.159.99.152/develop-vendors/api/security-users/update-user/`, {
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
        else{
            const catRegister = {
                pvOptionCRUD: "U",
                piIdVendor: updateVendor.value,
                pvIdUser: updateEmail,
                pvIdRole: updateRol.value,
                pvProfilePicPath: updateImage,
                pvName: updateFullName,
                pbStatus: updateStatus,
                pvFinalEffectiveDate: finalDate2,
                pvUser: user,
                pathImage : pathImage,
                pvIP: ip,
                pvChangeImage: changeImage
            };
        
            fetch(`http://129.159.99.152/develop-vendors/api/security-users/update-user-wp/`, {
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
            <h5 className="modal-title">Actualizar Usuario</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
                <span aria-hidden="true">×</span>
            </button>
            </div>
            <ModalBody>
            <Form method="">
                <Row className="justify-content-center">
                    <Col className="mt-3" lg="10">
                        <FormGroup>
                            <label>Id Usuario / Email</label>
                            <Input
                                name="email"
                                type="email"
                                value = {updateEmail}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup className={`form-group ${updateFullNameState}`}>
                            <label>Nombre Usuario *</label>
                            <Input
                            name="fullname"
                            id="fullname"
                            type="text"
                            value = {updateFullName}
                            onChange={(e) => {
                                if (!verifyLength(e.target.value, 1)) {
                                setupdateFullNameState("text-danger");
                                } else {
                                setupdateFullNameState("has-success");
                                }
                                setupdateFullName(e.target.value);
                            }}
                            />
                            {updateFullNameState === "text-danger" ? (
                            <label className="form-text text-danger">Este campo es requerido.</label>
                            ) : null}
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                            <Input 
                                type="checkbox" 
                                onChange={(e) => {
                                    setupdateChangePassword(e.target.checked)
                                }}
                            />{' '}
                            Cambiar Password
                            <span className="form-check-sign">
                                <span className="check"></span>
                            </span>
                            </Label>
                            {updateChangePassword === true ? (
                            <div>
                                <FormGroup className={`form-group ${updatePasswordState}`}>
                                <label>Password *</label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="off"
                                    onChange={(e) => {
                                    if (!verifyPassword(e.target.value)) {
                                        setupdatePasswordState("text-danger");
                                    } else {
                                        setupdatePasswordState("has-success");
                                    }
                                    setupdatePassword(e.target.value);
                                    }}
                                />
                                {updatePasswordState === "text-danger" ? (
                                    <label className="form-text text-danger">La contraseña debe tener una longitud mínima de 10 caracteres, al menos un número, una letra mayúscula y minúscula, y un caracter especial.</label>
                                ) : null}
                                </FormGroup>
                                <FormGroup className={`form-group ${updateConfirmPasswordState}`}>
                                <label>Confirmar Password *</label>
                                <Input
                                    equalto="#password"
                                    id="passwordConfirmation"
                                    name="password_confirmation"
                                    type="password"
                                    autoComplete="off"
                                    onChange={(e) => {
                                    if (!compare(e.target.value, updatePassword)) {
                                        setupdateConfirmPasswordState("text-danger");
                                        //setregisterPasswordState("has-danger");
                                    } else {
                                        setupdateConfirmPasswordState("has-success");
                                        //setregisterPasswordState("has-success");
                                    }
                                    setupdateConfirmPassword(e.target.value);
                                    }}
                                />
                                {updateConfirmPasswordState === "text-danger" ? (
                                    <label className="form-text text-danger">La contraseña no coincide.</label>
                                ) : null}
                                </FormGroup>
                                <FormGroup check>
                                <Label check>
                                <Input 
                                    type="checkbox" 
                                    checked = {updateTemporal}
                                    onChange={(e) => {
                                        setupdateTemporal(e.target.checked)
                                    }}
                                />{' '}
                                Password Temporal
                                <span className="form-check-sign">
                                    <span className="check"></span>
                                </span>
                                </Label>
                                </FormGroup>
                            </div>
                            ) : null}
                        </FormGroup>
                        <FormGroup className={`form-group ${updateRolState}`}>
                            <Label for="exampleSelect">Rol * </Label>
                            <Select
                                name=""
                                className="react-select"
                                defaultValue = {updateRol}
                                classNamePrefix="react-select"
                                value={updateRol}
                                onChange={(value) => {
                                    setupdateRol(value)
                                    setupdateRolState("has-success");
                                }}
                                options={dataRoles}
                            />
                            {updateRolState === "text-danger" ? (
                                <label className="form-text text-danger">Selecciona un rol.</label>
                            ) : null}
                        </FormGroup>
                    </Col>
                    <Col sm="4">
                        <UploadUserImage registerImage = {updateImage} setregisterImage={setupdateImage} image = {record.image} path = {profilePath} setChangeImage = {setChangeImage}/>
                    </Col>
                    <Col sm="6">
                        <FormGroup className={`form-group ${updateVendorState}`}>
                            <Label for="exampleSelect">Vendor * </Label>
                            <Select
                                name=""
                                className="react-select"
                                defaultValue = {updateVendor}
                                classNamePrefix="react-select"
                                value={updateVendor}
                                onChange={(value) => {
                                    setupdateVendor(value)
                                    setupdateVendorState("has-success");
                                }}
                                options={dataVendors}
                            />
                            {updateVendorState === "text-danger" ? (
                                <label className="form-text text-danger">Selecciona un vendor.</label>
                            ) : null}
                        </FormGroup>
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

export default ModalUpdateUser;