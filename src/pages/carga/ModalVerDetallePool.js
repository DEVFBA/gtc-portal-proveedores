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

function ModalVerDetallePool({abierto, toggleModalReadRecord, record, poolNumber, vendor}) {
        // register form
    //const [poolNumber, setPoolNumber] = React.useState("");
    //const [vendor, setVendor] = React.useState("");

    const handleModalClick = () => {
        toggleModalReadRecord(!abierto);
    };
    
    return (
        <Modal isOpen={abierto} toggle={handleModalClick} size="lg">
            <div className="modal-header justify-content-center">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
                    <span aria-hidden="true">×</span>
                </button>
                <h5 className="modal-title">Ver Detalle</h5>
            </div>
            <ModalBody>
            <Form method="">
                <Row className="justify-content-center">
                    <Col className="mt-3" lg="11">
                        <Row>
                        <Col sm = "3">
                            <FormGroup>
                                <label>Número de Pool</label>
                                <Input
                                    name="text"
                                    type="text"
                                    value = {poolNumber}
                                    readOnly
                                />
                            </FormGroup>
                        </Col>
                        <Col sm = "9">
                            <FormGroup>
                                <label>Proveedor</label>
                                <Input
                                    name="text"
                                    type="text"
                                    value = {vendor}
                                    readOnly
                                />
                            </FormGroup>
                        </Col>
                        </Row>
                        
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>UUID</th>
                                        <th>Serie</th>
                                        <th>Folio</th>
                                        <th>Monto Factura</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {record.map((item, i) => (
                                        <tr key={i}>
                                            <td>{item.UUID}</td>
                                            <td>{item.Serie}</td>
                                            <td>{item.Folio}</td>
                                            <td>{"$" + Intl.NumberFormat("en-IN").format(item.Total)}</td>
                                        </tr>
                                    ))
                                    }
                                </tbody>
                            </table>
                        </div>
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

export default ModalVerDetallePool;