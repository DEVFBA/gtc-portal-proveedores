import React from 'react'
import {connect} from 'react-redux'
import {validate, submit} from '../../actions/pages/index'
import Form from '../Form'
import InputGroup from '../InputGroup'
import {Link} from 'react-router-dom'

const Login = ({fields, submit}) => (
  <Form
    title="INICIAR SESIÓN"
    description="Ingrese su nombre y dirección de correo electrónico para iniciar sesión">
    {fields[0] && <InputGroup field={fields[0]} />}
    {fields[1] && <InputGroup field={fields[1]} />}
    {fields &&
      submit && (
        <div className="form-group">
          <button
            className="btn btn-primary btn-rounded btn-outline"
            type="submit"
            onClick={() => submit(fields)}>
            Submit
          </button>
        </div>
      )}
  </Form>
)

const mapStateToProps = (state, ownProps) => {
  return {
    fields: state.login.fields
  }
}
const mapDispatchToProps = dispatch => {
  return {
    submit: fields => dispatch(submit(fields)),
    validate: (value, field) => dispatch(validate(value, field))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
