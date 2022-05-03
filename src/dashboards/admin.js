import React from 'react'
import Section1 from './analytics/Section1'
import Section2 from './analytics/Section2'
import Section3 from './analytics/Section3'
import Section4 from './analytics/Section4'
import Section5 from './analytics/Section5'
import Section6 from './analytics/Section6'
import Section7 from './analytics/Section7'

// reactstrap components
import {
  Alert,
} from "reactstrap";

function DashboardAdmin(){
 
  return (
    <div>
      <div>
        <h1>Dashboard Admin</h1>
      </div>
      {/*<div>
        <Alert>
          <h4 className="alert-heading">
           Portal de Proveedores de Polymex
          </h4>
          <p>
            Estimado proveedor, se le recuerda que nuestro Portal de Recepción de facturas se encuentra diariamente en mantenimiento en un horario de 00:01 am a 5:00 am
          </p>
          <hr />
          <p className="mb-0">
            Por su comprensión gracias.
          </p>
        </Alert>
      </div>
      <Section1 />
    <div className="row">
      <div className="col-12 col-md-12 col-xl-6">
        <Section2 />
      </div>
      <div className="col-12 col-md-12 col-xl-6">
        <Section3 />
      </div>
    </div>
    {/*<div className="row">
      <div className="col-12 col-md-12 col-xl-4">
        <Section4 />
      </div>
      <div className="col-12 col-md-12 col-xl-4">
        <Section5 />
      </div>
      <div className="col-12 col-md-12 col-xl-4">
        <Section6 />
      </div>
    </div>
  <Section7 />*/}
  </div>
  )
}
export default DashboardAdmin