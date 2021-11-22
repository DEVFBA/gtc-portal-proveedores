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

function ModalAddWorkflow({modalAddRecord, setModalAddRecord, record, ip, autoCloseAlert, updateAddData, workflowTypes, workflowTracker}) {
        // register form
    const [workflowType, setWorkflowType] = React.useState("");
    const [idWorkflowStatus, setIdWorkflowStatus] = useState("")
    const [idWorkflowStatusDesc, setIdWorkflowStatusDesc] = useState("")
    const [workflowStatusChange, setWorkflowStatusChange] = React.useState("");
    const [workflowStatusOptions, setWorkflowStatusOptions] = useState([]);
    const [recordIdentifier, setRecordIdentifier] = useState("");
    const [comments, setComments] = useState("");

    const [workflowStatusChangeState, setWorkflowStatusChangeState] = React.useState("");

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");

    const handleModalClick = () => {
        setErrorMessage("") 
        setWorkflowStatusChangeState("")
        setError("")
        setErrorState("")
        setErrorMessage("")
        setWorkflowStatusChange("")
        setModalAddRecord(!modalAddRecord);
    };

    useEffect(() => {
        setWorkflowType(workflowTypes)
    },[]);

    useEffect(() => {
        setRecordIdentifier(record.uuid)
        if(record.workflow !== undefined && record.workflowTracker !== undefined)
        {
            console.log(record)
            //console.log(record.workflow.Workflow_Status_Desc)
            setIdWorkflowStatus(record.workflow.Id_Workflow_Status)
            setIdWorkflowStatusDesc(record.workflow.Workflow_Status_Desc)
            setWorkflowStatusOptions(record.workflowTracker)
        }
    },[record]);
    
    const isValidated = () => {
        if (workflowStatusChangeState === "has-success") {
            return true;
        } else {
            if (workflowStatusChangeState !== "has-success") {
                setWorkflowStatusChangeState("text-danger");
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
        //Logica para ver cual será el piIdWorkflowStatusChange
        var workflowChange;
        var workFlowTrackerOptions = []
        var contador = 0
        for(var i=0; i< workflowTracker.length; i++)
        {
            if(workflowTracker[i].Id_Workflow_Status === workflowStatusChange.value)
            {
                workFlowTrackerOptions[contador] = workflowTracker[i]
                contador++
            }
        }
        console.log(workFlowTrackerOptions)
        if(workFlowTrackerOptions.length === 0)
        {
            console.log("ESTOY ENTRANDO")
            workflowChange = 999
        }
        else if(workFlowTrackerOptions.length === 1)
        {
            console.log("ESTOY ENTRANDO AL 1")
            workflowChange = workFlowTrackerOptions[0].Id_Workflow_Status_Change
        }
        else if(workFlowTrackerOptions.length < 3)
        {
            console.log("ESTOY ENTRANDO AL 2")
            workflowChange = workFlowTrackerOptions[0].Id_Workflow_Status_Change
        }
        else if(workFlowTrackerOptions.length > 2)
        {
            console.log("ESTOY ENTRANDO AL 3")
            workflowChange = workFlowTrackerOptions[1].Id_Workflow_Status_Change
        }
        const catRegister = {
            pvIdWorkflowType: workflowTypes.Id_Catalog,
            piIdWorkflowStatus: workflowStatusChange.value,
            piIdWorkflowStatusChange: workflowChange,
            pvRecordIdentifier: recordIdentifier,
            pvComments: comments,
            pvUser: user,
            pvIP: ip
        };

        fetch(`http://129.159.99.152/develop-vendors/api/workflow/create-workflow/`, {
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

    return (
        <Modal isOpen={modalAddRecord} toggle={handleModalClick} size="lg">
           <div className="modal-header justify-content-center">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
                    <span aria-hidden="true">×</span>
                </button>
                <h5 className="modal-title">Actualizar Estatus</h5>
            </div>
            <ModalBody>
            <Form id="RegisterValidation">
                <Row className="justify-content-center">
                    <Col className="mt-3" lg="10">
                        <FormGroup>
                            <label>Estatus Inicial</label>
                            <Input
                                name="shortdesc"
                                id="shortdesc"
                                type="text"
                                value = {idWorkflowStatusDesc}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup className={`form-group ${workflowStatusChangeState}`}>
                            <Label for="exampleSelect">Nuevo Estatus * </Label>
                            <Select
                                name=""
                                className="react-select"
                                placeholder="Selecciona un nuevo estatus"
                                classNamePrefix="react-select"
                                value={workflowStatusChange}
                                onChange={(value) => {
                                    setWorkflowStatusChange(value)
                                    console.log("enrtres")
                                    setWorkflowStatusChangeState("has-success");
                                }}
                                options={workflowStatusOptions}
                            />
                            {workflowStatusChangeState === "text-danger" ? (
                                <label className="form-text text-danger">Selecciona un nuevo estatus.</label>
                            ) : null}
                        </FormGroup>
                        <FormGroup>
                            <label>Comentarios</label>
                            <Input
                                name="comments"
                                type="text"
                                autoComplete="off"
                                onChange={(e) => {
                                    setComments(e.target.value);
                                }}
                            />
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

export default ModalAddWorkflow;