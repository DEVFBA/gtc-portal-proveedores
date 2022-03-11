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

function ModalRechazarPool({modalRejectRecord, setModalRejectRecord, ip, autoCloseAlert, dataTrackerReasons, recordReject, updateAddData}) {
    
    const [vendor, setVendor] = React.useState("");
    const [idInvoicePool, setIdInvoicePool] = React.useState("");
    const [rejectReason, setRejectReason] = React.useState("");
    const [comments, setComments] = React.useState();

    const [rejectReasonState, setRejectReasonState] = React.useState("");
    const [commentsState, setCommentsState] = React.useState("");

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");

    useEffect(() => {
        setIdInvoicePool(recordReject.idInvoicePool);
        setVendor(recordReject.vendor)
       
    },[recordReject]);

    const handleModalClick = () => {
        //Regresamos todo a su estado inicial
        setRejectReasonState("");
        setCommentsState("");
        setErrorState("");
        setErrorMessage("");
        setError("");
    
        //Cerramos el modal
        setModalRejectRecord(!modalRejectRecord);
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
            rejectReasonState === "has-success" &&
            commentsState === "has-success"
        ) {
            return true;
        } else {
            if (rejectReasonState !== "has-success") {
                setRejectReasonState("text-danger");
            }
            if (commentsState !== "has-success") {
                setCommentsState("text-danger");
            }
            return false;
        }
    };

    const registerClick = () => {
        
        if(isValidated()===true)
        {
           //haremos el fetch a la base de datos para agregar el registro
           rejectRegister()
        }
        else{
            console.log("no entre")
        }
    };

    function rejectRegister(){

        const catRegister = {
            piIdInvoicePool: idInvoicePool,
            pvComments: comments,
            pvIdRejectReason: rejectReason.value,
            pvUser: user,
            pvIP: ip
        };

        //var url = new URL(`http://localhost:8091/api/invoices-pool/reject-invoice-pool/`);
        var url = new URL(`${process.env.REACT_APP_API_URI}invoices-pool/reject-invoice-pool/`);
    
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
            console.log(data)
            autoCloseAlert(data.data.message)
            updateAddData()
        });
    }

    return (
        <Modal isOpen={modalRejectRecord} toggle={handleModalClick} size="lg">
            <div className="modal-header justify-content-center">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
                    <span aria-hidden="true">×</span>
                </button>
                <h5 className="modal-title">Rechazar Pool</h5>
            </div>
            <ModalBody>
            <Form id="RegisterValidation">
                <Row className="justify-content-center">
                    <Col sm = "4">
                        <FormGroup>
                            <label>Número de Pool</label>
                            <Input
                                name="poolNumber"
                                type="text"
                                value={idInvoicePool}
                                readOnly
                            />
                        </FormGroup>
                    </Col>
                    <Col sm = "8">
                        <FormGroup>
                            <label>Proveedor</label>
                            <Input
                                name="vendor"
                                type="text"
                                value= {vendor}
                                readOnly
                            />
                        </FormGroup>
                    </Col>
                    <Col sm = "12">
                        <FormGroup className={`form-group ${rejectReasonState}`}>
                            <Label for="exampleSelect">Motivo de Rechazo * </Label>
                            <Select
                                name=""
                                className="react-select"
                                placeholder="Selecciona un motivo"
                                classNamePrefix="react-select"
                                value={rejectReason}
                                onChange={(value) => {
                                    setRejectReason(value)
                                    setRejectReasonState("has-success");
                                }}
                                options={dataTrackerReasons}
                            />
                            {rejectReasonState === "text-danger" ? (
                                <label className="form-text text-danger">Selecciona un Motivo de Rechazo.</label>
                            ) : null}
                        </FormGroup>
                        <FormGroup className={`form-group ${commentsState}`}>
                            <label>Comentarios *</label>
                            <Input
                                name="comentarios"
                                type="text"
                                autoComplete="off"
                                onChange={(e) => {
                                    if (!verifyLength(e.target.value, 1)) {
                                        setCommentsState("text-danger");
                                    } else {
                                        setCommentsState("has-success");
                                    }
                                    setComments(e.target.value);
                                }}
                            />
                            {commentsState === "text-danger" ? (
                                <label className="form-text text-danger">Escribe un comentario.</label>
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
                   Rechazar Pool
                </Button>
                </div>
            </ModalFooter>
        </Modal>
    );
}

export default ModalRechazarPool;