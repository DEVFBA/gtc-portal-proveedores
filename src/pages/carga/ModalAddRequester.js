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

function ModalAddRequester({modalAddRecord, setModalAddRecord, setRequester, resetFileInput, resetFileInputPdf}) {
        // register form
    const [req, setReq] = useState("");
    const [reqState, setReqState] = React.useState("");

    const handleModalClick = () => {
        setReq("") 
        setReqState("")
        setModalAddRecord(!modalAddRecord);
    };
    
    const isValidated = () => {
        if (reqState === "has-success") {
            return true;
        } else {
            if (reqState !== "has-success") {
                setReqState("text-danger");
            }
            return false;
        }
    };

    const updateClick = () => {
        if(isValidated()===true)
        {
            updateRequester()
        }
        else {
            console.log("no entre")
        }
    };

    function updateRequester(){
        setRequester(req)
        handleModalClick() 
    }

    return (
        <Modal isOpen={modalAddRecord} toggle={handleModalClick} size="lg">
           <div className="modal-header justify-content-center">
                {/*<button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
                    <span aria-hidden="true">×</span>
                </button>*/}
                <h5 className="modal-title">Agregar Número de Solicitud</h5>
            </div>
            <ModalBody>
            <Form id="RegisterValidation">
                <Row className="justify-content-center">
                    <Col className="mt-3" lg="10">
                        <FormGroup className={`form-group ${reqState}`}>
                            <Label for="exampleSelect">Nuevo Estatus * </Label>
                            <Input
                                name="requester"
                                type="number"
                                autoComplete="off"
                                onChange={(e) => {
                                    setReq(e.target.value);
                                    setReqState("has-success")
                                }}
                            />
                            {reqState === "text-danger" ? (
                                <label className="form-text text-danger">Escribe un número de solicitud.</label>
                            ) : null}
                        </FormGroup>
                    </Col>
                    <Col className="mt-3" lg="10">
                        <div className="category form-category">
                        * Campos requeridos
                        </div>
                    </Col> 
                </Row>
            </Form>
            </ModalBody>
            <ModalFooter>
                <div className="center-side">
                {/*<Button className="buttons button-close btn-gtc" color="secondary" onClick={handleModalClick}>
                    Cerrar
                    </Button>*/}
                <Button className="buttons btn-gtc" color="primary" onClick={updateClick}>
                    Guardar cambios
                </Button>
                </div>
            </ModalFooter>
        </Modal>
    );
}

export default ModalAddRequester;