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

function ModalReadZipCodes({modalReadRecord, setModalReadRecord, record}) {
        // register form
    const [idState, setIdState] = React.useState("");
    const [stateDesc, setStateDesc] = React.useState("");
    const [idMunicipality, setIdMunicipality] = React.useState("");
    const [municipalityDesc, setMunicipalityDesc] = React.useState("");
    const [idLocation, setIdLocation] = React.useState("");
    const [locationDesc, setLocationDesc] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [county, setCounty] = useState("");

    const handleModalClick = () => {
        setModalReadRecord(!modalReadRecord);
    };

    useEffect(() => {
        setIdState(record.idState);
        setStateDesc(record.stateDesc)
        setIdMunicipality(record.idMunicipality)
        setMunicipalityDesc(record.municipalityDesc);
        setIdLocation(record.idLocation)
        setLocationDesc(record.locationDesc)
        setZipCode(record.zipCode)
        setCounty(record.description)
    },[record]);

    return (
        <Modal isOpen={modalReadRecord} toggle={handleModalClick} size="lg">
            <div className="modal-header justify-content-center">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
                    <span aria-hidden="true">×</span>
                </button>
                <h5 className="modal-title">Ver Registro</h5>
            </div>
            <ModalBody>
            <Form id="RegisterValidation">
                <Row className="justify-content-center">
                    <Col className="mt-3" lg="10">
                        <FormGroup>
                            <label>Id Estado</label>
                            <Input
                                name="text"
                                type="text"
                                value = {idState}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Nombre Estado</label>
                            <Input
                                name="text"
                                type="text"
                                value = {stateDesc}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Id Municipio</label>
                            <Input
                                name="text"
                                type="text"
                                value = {idMunicipality}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Nombre Municipio</label>
                            <Input
                                name="text"
                                type="text"
                                value = {municipalityDesc}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Id Localidad</label>
                            <Input
                                name="text"
                                type="text"
                                value = {idLocation}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Nombre Localidad</label>
                            <Input
                                name="text"
                                type="text"
                                value = {locationDesc}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Código Postal</label>
                            <Input
                                name="text"
                                type="text"
                                value = {zipCode}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Colonia</label>
                            <Input
                                name="text"
                                type="text"
                                value = {county}
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

export default ModalReadZipCodes;