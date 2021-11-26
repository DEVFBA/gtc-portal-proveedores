import React from 'react'
import DefaultDatepicker from './DefaultDatepicker'

const ConnectedDatePicker = ({onChangeFrom, onChangeTo, dateFrom, dateTo}) => (
  <form>
    <div className="form-row">
      <div className="col">
        <div className="form-group">
          <label>Desde: {dateFrom}</label>
          <DefaultDatepicker onChange={onChangeFrom} />
          <small className="form-text text-muted">
            Elige una fecha de inicio
          </small>
        </div>
      </div>
      <div className="col">
        <div className="form-group">
          <label>Hasta: {dateTo}</label>
          <DefaultDatepicker onChange={onChangeTo} />
          <small className="form-text text-muted">
            Elige una fecha de finalización
          </small>
        </div>
      </div>
    </div>
  </form>
)

export default ConnectedDatePicker
