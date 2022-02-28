import React, { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ConnectedDatePicker from '../../forms/react-datetime/ConnectedDatePicker'
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import ModalAddRequester from "./ModalAddRequester";

import convert from 'xml-js';
import axios from 'axios'
import Widget from '../../elements/Widget'
import Skeleton from '@yisheng90/react-loading';
import '../../css/forms/react-datetime.css'
import CargaTable from './CargaTable';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  FormGroup,
  Form,
  Label,
  Input,
  Modal, 
  ModalBody, 
  ModalFooter,
  CardFooter
} from "reactstrap";

// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";
import Select from "react-select";

function Filtro({filterClick, deleteClick, dataWorkFlowStatus, filterRfcCompany, setFilterRfcCompany, filterRfcEmisor, setFilterRfcEmisor, filterSerie, setFilterSerie, filterFolio, setFilterFolio, dateTo, setDateTo, dateFrom, setDateFrom, filterUuid, setFilterUuid, filterStatus, setFilterStatus}) {

    const vendor = localStorage.getItem("Id_Vendor");

    return (
        <Form>
            <Row className="justify-content-center">
                <Col sm = "3">
                <FormGroup>
                    <label>RFC Compañía</label>
                    <Input
                        name="name"
                        type="text"
                        autoComplete="off"
                        value = {filterRfcCompany}
                        onChange={(e) => {
                            setFilterRfcCompany(e.target.value)
                        }}
                    />
                </FormGroup>
                </Col>
                <Col sm = "3">
                {vendor === "0" ? (
                    <FormGroup>
                    <label>RFC Emisor</label>
                    <Input
                        name="street"
                        type="text"
                        autoComplete="off"
                        value = {filterRfcEmisor}
                        onChange={(e) => {
                            setFilterRfcEmisor(e.target.value)
                        }}
                    />
                    </FormGroup>
                ) : (
                    <FormGroup>
                    <label>RFC Emisor</label>
                    <Input
                        name="street"
                        type="text"
                        autoComplete="off"
                        value = {filterRfcEmisor}
                        readOnly
                    />
                    </FormGroup>
                )}
                </Col>
                <Col sm = "3">
                <FormGroup>
                    <label>Serie</label>
                    <Input
                        name="noInterior"
                        type="text"
                        autoComplete="off"
                        value = {filterSerie}
                        onChange={(e) => {
                            setFilterSerie(e.target.value)
                        }}
                    />
                </FormGroup>
                </Col>
                <Col sm = "3">
                <FormGroup>
                    <label>Folio</label>
                    <Input
                        name="city"
                        type="text"
                        autoComplete="off"
                        value = {filterFolio}
                        onChange={(e) => {
                            setFilterFolio(e.target.value)
                        }}
                    />
                </FormGroup>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col sm = "3">
                <FormGroup >
                    <label>UUID</label>
                    <Input
                        name="noExterior"
                        type="text"
                        autoComplete="off"
                        value = {filterUuid}
                        onChange={(e) => {
                            setFilterUuid(e.target.value)
                        }}
                    />
                </FormGroup>
                </Col>
                <Col sm = "3">
                <label>Fecha Origen</label>
                <ReactDatetime
                    inputProps={{
                    className: "form-control",
                    placeholder: "Fecha de origen",
                    }}
                    timeFormat={false}
                    
                    onChange={(date) => {
                        setDateFrom(date)
                        //setregisterValidDateState("has-success");
                    }}
                />
                </Col>
                <Col sm = "3">
                <label>Fecha Vigencia</label>
                <ReactDatetime
                    inputProps={{
                    className: "form-control",
                    placeholder: "Fecha de vigencia",
                    }}
                    timeFormat={false}
                    
                    onChange={(date) => {
                        setDateTo(date)
                        //setregisterValidDateState("has-success");
                    }}
                />
                </Col>
                <Col sm = "3">
                <FormGroup>
                    <Label for="exampleSelect">Estatus </Label>
                    <Select
                        name=""
                        className="react-select"
                        placeholder="Selecciona un estatus"
                        classNamePrefix="react-select"
                        value={filterStatus}
                        onChange={(value) => {
                            setFilterStatus(value)
                        }}
                        options = {dataWorkFlowStatus}
                    />
                </FormGroup>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col sm = "3">

                </Col>
                <Col sm = "3">
                <Button className="btn-outline buttons btn-gtc btn-filter" color="primary" onClick={deleteClick}>
                    <i className="ion-android-delete btn-icon" />
                    Borrar Filtros
                </Button>
                </Col>
                <Col sm = "3">
                    <Button className="buttons btn-gtc btn-filter" color="primary" onClick={filterClick}>
                        <i className="fa fa-filter btn-icon" />
                        Filtrar
                    </Button>
                </Col>
                <Col sm = "3">
            
                </Col>
            </Row>
        </Form>   
    )
}

export default Filtro;