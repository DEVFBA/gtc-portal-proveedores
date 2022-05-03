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
                    <Col sm = "5">
                        <FormGroup>
                            <label>Id Moneda</label>
                            <Input
                                name="text"
                                type="text"
                                value = {record.idCurrency}
                                readOnly
                            />
                        </FormGroup>
                    </Col>
                    <Col sm = "5">
                        <FormGroup>
                            <label>Moneda</label>
                            <Input
                                name="text"
                                type="text"
                                value = {record.currencyDesc}
                                readOnly
                            />
                        </FormGroup>
                    </Col>
                    <Col sm = "10">
                        <FormGroup>
                            <label>Subtotal</label>
                            <Input
                                name="text"
                                type="text"
                                value = {"$" + Intl.NumberFormat("en-IN").format(record.subtotal)}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Impuestos Transferidos</label>
                            <Input
                                name="text"
                                type="text"
                                value = {"$" + Intl.NumberFormat("en-IN").format(record.transferredTaxes)}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Total</label>
                            <Input
                                name="text"
                                type="text"
                                value = {"$" + Intl.NumberFormat("en-IN").format(record.total)}
                                readOnly
                            />
                        </FormGroup>
                    </Col>
                    <Col sm = "5">
                        <FormGroup>
                            <label>Fecha Estimada Pago</label>
                            <Input
                                name="text"
                                type="text"
                                value = {record.dueDate}
                                readOnly
                            />
                        </FormGroup>
                    </Col>
                    <Col sm = "5">
                        <FormGroup>
                            <label>Fecha Pago</label>
                            <Input
                                name="text"
                                type="text"
                                value = {record.paymentDate}
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