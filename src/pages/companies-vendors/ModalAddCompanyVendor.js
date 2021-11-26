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

//React plugin used to create DropdownMenu for selecting items
import Select from "react-select";

function ModalAddCompanyVendor({modalAddRecord, setModalAddRecord, ip, autoCloseAlert, updateAddData, dataCompanies, dataVendors, toggleModalAddCompany, mensajeAdd, companyE, toggleModalAddVendor, vendorE, setCompanyE, setVendorE, mensajeAdd2}) {
        // register form
    const [company, setCompany] = React.useState({});
    const [vendor, setVendor] = useState({})
    const [status, setStatus] = useState(true)

    const [companyState, setCompanyState] = React.useState("");
    const [vendorState, setVendorState] = useState([]);

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");

    useEffect(() => {
        setVendor(vendorE);
        if(vendorE.value === undefined)
        {
            setVendorState("");
        }
        else {
            setVendorState("has-success");
        }
    },[vendorE]);

    useEffect(() => {
        setCompany(companyE);
        if(companyE.value === undefined)
        {
            setCompanyState("");
        }
        else {
            setCompanyState("has-success");
        }
    },[companyE])

    const handleModalClick = () => {
        setCompanyState("") 
        setVendorState("")
        setError("")
        setErrorState("")
        setErrorMessage("")
        setCompanyE({})
        setVendorE({})
        setModalAddRecord(!modalAddRecord);
    };
    
    const isValidated = () => {
        console.log(company)
        console.log(vendor)
        if ((companyState === "has-success") &&
            (vendorState === "has-success")
        ) {
            return true;
        } else {
            if(company.value !== undefined && vendor.value !== undefined)
            {
                return true;
            }
            if (companyState !== "has-success") {
                setCompanyState("text-danger");
            }
            if (vendorState !== "has-success") {
                setVendorState("text-danger");
            }
            return false;
        }
    };

    const updateClick = () => {
        if(isValidated()===true)
        {
            updateRegister()
        }
        else {
            console.log("no entre")
        }
    };

    function updateRegister(){
        const catRegister = {
            piIdCompany: company.value,
            piIdVendor: vendor.value,
            pbStatus: status,
            pvUser: user,
            pvIP: ip,
        };

        fetch(`http://129.159.99.152/develop-vendors/api/companies-vendors/create/`, {
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

    const [visible, setIsVisible] = useState(false)
    useEffect(() => {
        // message is empty (meaning no errors). Adjust as needed
        if(!mensajeAdd){
            setIsVisible(false)
            return
        }
        // error exists. Display the message and hide after 5 secs
        setIsVisible(true)
        const timer = setTimeout(() => {
            setIsVisible(false)
        }, 5000);
        return () => clearTimeout(timer);
    }, [mensajeAdd])

    const [visible2, setIsVisible2] = useState(false)
    useEffect(() => {
        // message is empty (meaning no errors). Adjust as needed
        if(!mensajeAdd2){
            setIsVisible2(false)
            return
        }
        // error exists. Display the message and hide after 5 secs
        setIsVisible2(true)
        const timer = setTimeout(() => {
            setIsVisible2(false)
        }, 5000);
        return () => clearTimeout(timer);
    }, [mensajeAdd2])

    return (
        <Modal isOpen={modalAddRecord} toggle={handleModalClick} size="lg" aria-labelledby="contained-modal-title-vcenter">
           <div className="modal-header justify-content-center">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
                    <span aria-hidden="true">×</span>
                </button>
                <h5 className="modal-title">Agregar Proveedor - Compañía</h5>
            </div>
            <ModalBody>
            <Form id="RegisterValidation">
                <Row className="justify-content-center">
                    <Col className="mt-3" lg="10">
                        <FormGroup className={`form-group ${companyState}`}>
                            <Label for="exampleSelect">Compañía * </Label>
                            <abbr title="Agregar compañía">
                                <button
                                    onClick={() => {
                                        setModalAddRecord(!modalAddRecord)
                                        toggleModalAddCompany()
                                      }
                                    }
                                    color="warning"
                                    size="sm"
                                    className="btn-icon btn-link edit"
                                >
                                <i className="fa fa-plus-square"/>
                                </button>
                            </abbr>
                            <Select
                                name="companies"
                                id = "companies"
                                className="react-select"
                                placeholder="Selecciona una compañía"
                                classNamePrefix="react-select"
                                value={company}
                                onChange={(value) => {
                                    setCompany(value)
                                    setCompanyState("has-success");
                                }}
                                options={dataCompanies}
                            />
                            {companyState === "text-danger" ? (
                                <label className="form-text text-danger">Selecciona una compañía.</label>
                            ) : null}
                        </FormGroup>
                        {visible === true ? (
                            <div className = "badge-success badge-rounded company-message">
                                {mensajeAdd}
                            </div>
                            ) : (
                                null
                        )}
                        <FormGroup className={`form-group ${vendorState}`}>
                            <Label for="exampleSelect">Proveedor * </Label>
                            <abbr title="Agregar proveedor">
                                <button
                                    onClick={() => {
                                        setModalAddRecord(!modalAddRecord)
                                        toggleModalAddVendor()
                                    }}
                                    color="warning"
                                    size="sm"
                                    className="btn-icon btn-link edit"
                                >
                                <i className="fa fa-plus-square"/>
                                </button>
                            </abbr>
                            <Select
                                name="vendors"
                                id = "vendors"
                                className="react-select"
                                placeholder="Selecciona un proveedor"
                                classNamePrefix="react-select"
                                value={vendor}
                                onChange={(value) => {
                                    setVendor(value)
                                    setVendorState("has-success");
                                }}
                                options={dataVendors}
                            />
                            {vendorState === "text-danger" ? (
                                <label className="form-text text-danger">Selecciona proveedor.</label>
                            ) : null}
                        </FormGroup>
                        {visible2 === true ? (
                            <div className = "badge-success badge-rounded company-message">
                                {mensajeAdd2}
                            </div>
                            ) : (
                                null
                        )}
                        <FormGroup check>
                            <Label check>
                            <Input 
                                type="checkbox" 
                                checked = {status}
                                onChange={(e) => {
                                    status(e.target.checked)
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

export default ModalAddCompanyVendor;