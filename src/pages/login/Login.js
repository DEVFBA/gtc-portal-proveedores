import React from 'react'
import { useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import '../../css/pages/form.css'
import ReactBSAlert from "react-bootstrap-sweetalert";
import Cargando from "../../assets/img/loading_icon.gif";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Row,
} from "reactstrap";

function Login(){
  const ambiente = "/DEV-Vendors"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const logged = localStorage.getItem("Logged");

  const [errorState, setErrorState] = React.useState("");
  const [error, setError] = React.useState();
  const [errorMessage, setErrorMessage] = React.useState("");

  useEffect(() => {
    //Si el usuario ya ha iniciado sesión que se le redirija al dashboard
    if(logged==="true")
    {
      history.push(ambiente + "/admin/dashboard");
    }
  }, []);

  function onChangePassword(event) {
    setPassword(event.target.value);
  }

  function onChangeEmail(event) {
    setEmail(event.target.value);
  }

  //Para el alert de cargando login
  const [alert2, setAlert2] = React.useState(null);

  const autoCloseAlert2 = (mensaje) => {
    console.log("entre al alert")
    setAlert2(
      <ReactBSAlert
        style={{ display: "block", display: "flex", justifyContent: "center", alignItems: "center" }}
        title=""
        onConfirm={() => hideAlert2()}
        showConfirm={false}
      >
        <Row>
          <Col sm="4">
          </Col>
          <Col sm="4">
            <img 
              src = {Cargando} 
              style ={{ width: "50px", height: "50px" }}
            />
          </Col>
          <Col sm="4">
          </Col>
        </Row>
        &nbsp;
        {mensaje}
      </ReactBSAlert>
    );
  };

  const hideAlert2 = () => {
    setAlert2(null);
  };

  function onSubmitForm(event) {
    event.preventDefault();
    autoCloseAlert2("Iniciando Sesión...")
    const catRegister = {
      pvIdUser: email,
      pvPassword: password
    };

    fetch(`http://129.159.99.152/develop-vendors/api/security-users/login/`, {
        method: "POST",
        body: JSON.stringify(catRegister),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.errors) {
            hideAlert2()
            setError(
                <p>Hubo un error al realizar tu solicitud</p>
            );
        }
        else{
            if(data[0].Code_Type === "Error")
            {
              hideAlert2()
              setErrorState("has-danger")
              setErrorMessage(data[0].Code_Message_User)
            }
            else{
                setErrorState("has-success");
                //Obtenemos la información del usuario y la guardamos en el useContext
                getUser(email, data[1].token)
            }
        }
    });
  }

  function getUser(email, token){

    var url = new URL(`http://129.159.99.152/develop-vendors/api/security-users/${email}`);
    fetch(url, {
      method: "GET",
      headers: {
          "access-token": token,
          "Content-Type": "application/json",
      }
    })
    .then(function(response) {
        return response.ok ? response.json() : Promise.reject();
    })
    .then(function(data) {
        hideAlert2()
        localStorage.setItem("User", data[0].User);
        localStorage.setItem("Id_Vendor", data[0].Id_Vendor)
        localStorage.setItem("Id_Role", data[0].Id_Role)
        localStorage.setItem("Token", token)
      
        //Comparar fechas
        var f1 = new Date();
        var f2 = new Date(data[0].Final_Effective_Date)
        if(data[0].Temporal_Password===true)
        {
          history.push(ambiente + "/auth/edit-password");
        }
        else if (data[0].Final_Effective_Date === "NULL")
        {
          history.push(ambiente + "/auth/edit-password");      
        }
        else if(f2 < f1)
        {
          history.push(ambiente + "/auth/edit-password");
        }
        else{
          localStorage.setItem("Logged", true)
          history.push(ambiente + "/admin/dashboard");
        }
        
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion del usuario" + err);
    });
  }

  return (
    <div>
      <div className="sample-form">
        <h3>Login</h3>
        <form onSubmit={onSubmitForm}>
          <div className="description">Por favor ingresa tu correo y contraseña para iniciar sesión</div>
          <div className='form-group'>
            <label className="form-control-label">Email</label>
            <div className="input-group">
              <span className="input-group-addon rounded-left">
                <i className={'material-icons'}>
                account_circle
                </i>
              </span>
              <input 
                className="form-control rounded-right"
                placeholder=''
                type="email"
                name="email"
                onChange={onChangeEmail}
              />
            </div>
          </div>
          <div className='form-group'>
            <label className="form-control-label">Contraseña</label>
            <div className="input-group">
              <span className="input-group-addon rounded-left">
                <i className={'material-icons'}>
                lock_outline
                </i>
              </span>
              <input 
                className="form-control rounded-right"
                placeholder=''
                type="password"
                name="password"
                onChange={onChangePassword}
              />
            </div>
          </div>
          {errorMessage}
          <div className="form-group">
            <button
              className="btn btn-primary btn-rounded btn-outline"
              type="submit"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
      {alert2}
    </div>
  );
}

export default Login;
