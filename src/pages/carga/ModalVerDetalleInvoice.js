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
    Row,
    Col,
} from "reactstrap";

function ModalVerDetalleInvoice({modalReadRecord, setModalReadRecord, record}) {

    const handleModalClick = () => {
        setModalReadRecord(!modalReadRecord);
    };
    
    return (
        <Modal isOpen={modalReadRecord} toggle={handleModalClick} size="lg">
            <div className="modal-header justify-content-center">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
                    <span aria-hidden="true">×</span>
                </button>
                <h5 className="modal-title">Ver Detalle</h5>
            </div>
            <ModalBody>
            <Form method="">
                <Row className="justify-content-center">
                    <Col sm = "9">
                        <FormGroup>
                            <label>Id Moneda</label>
                            <Input
                                name="text"
                                type="text"
                                value = {record.idCurrency}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Moneda</label>
                            <Input
                                name="text"
                                type="text"
                                value = {record.currencyDesc}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Subtotal</label>
                            <Input
                                name="text"
                                type="text"
                                value = {record.subtotal}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Impuestos Transferidos</label>
                            <Input
                                name="text"
                                type="text"
                                value = {record.transferredTaxes}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Total</label>
                            <Input
                                name="text"
                                type="text"
                                value = {record.total}
                                readOnly
                            />
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
                </div>
            </ModalFooter>
        </Modal>
    );
}

export default ModalVerDetalleInvoice;