import React from 'react'
import {connect} from 'react-redux'
import {validate, submit} from '../../actions/pages/index'
import {Link} from 'react-router-dom'
import '../../css/pages/form.css'

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

  return (
    <div className="sample-form">
      <h3>Login</h3>
      <form onSubmit={e => e.preventDefault()}>
        <div className="description">Por favor ingresa tu correo y contraseña para iniciar sesión</div>
        <div className='form-group'>
          <label className="form-control-label">Email</label>
          <div className="input-group">
            <span className="input-group-addon rounded-left">
              <i className={'material-icons'}>
              account_circle
              </i>
            </span>
            <input className="form-control rounded-right"
              placeholder=''
              type="email"
              name="email"
            />
          </div>
          {/*field.errors.map((error, i) => (
            <div key={i} className="form-text text-danger">
              {error}
            </div>
          ))*/}
        </div>
        <div className='form-group'>
          <label className="form-control-label">Contraseña</label>
          <div className="input-group">
            <span className="input-group-addon rounded-left">
              <i className={'material-icons'}>
              lock_outline
              </i>
            </span>
            <input className="form-control rounded-right"
              placeholder=''
              type="password"
              name="password"
            />
          </div>
          {/*field.errors.map((error, i) => (
            <div key={i} className="form-text text-danger">
              {error}
            </div>
          ))*/}
        </div>
        <div className="form-group">
          <button
            className="btn btn-primary btn-rounded btn-outline"
            type="submit"
            onClick={() => console.log("")}>
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
