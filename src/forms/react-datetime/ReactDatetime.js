import React, { useState, useEffect } from "react";
import InlineDatepicker from './InlineDatepicker'
import DefaultDatepicker from './DefaultDatepicker'
import ConnectedDatePicker from './ConnectedDatePicker'
import Widget from '../../elements/Widget'
import '../../css/forms/react-datetime.css'

function ReactDatetime () {
  const [inlineDate, setInlineDate] = useState()
  const [defaultDate, setDefaultDate] = useState()
  const [dateFrom, setDateFrom] = useState()
  const [dateTo, setDateTo] = useState()
  
  function _onChangeDefaultDate(e) {
    setDefaultDate(e.format('DD-MM-YYYY'))
  }

  function _onChangeInlineDate(e) {
    setInlineDate(e.format('DD-MM-YYYY'))
  }

  function _onChangeDateFrom(e) {
    setDateFrom(e.format('DD-MM-YYYY'))  
  }

  function _onChangeDateTo(e) {
    setDateTo(e.format('DD-MM-YYYY'))
  }

  return (
    <div className="row">
      <div className="col">
        <Widget
          title="Default date picker"
          description="Use the <code>Datepicker</code> component as a starting point for a simple date picker">
          <div className="row">
            <div className="col col-lg-3">
              <div className="form-group">
                {defaultDate && (
                  <label>Selected date: {defaultDate}</label>
                )}
                {!defaultDate && <label>Select date</label>}
                <DefaultDatepicker
                  onChange={e => _onChangeDefaultDate(e)}
                />
                <small className="form-text text-muted">
                  Please pick a date
                </small>
              </div>
            </div>
          </div>
        </Widget>
        <Widget
          title="Connected date picker"
          description="Use the <code>ConnectedDatePicker</code> component as a starting point for an inline date picker">
          <div className="row">
            <div className="col col-lg-6">
              <ConnectedDatePicker
                onChangeFrom={e => _onChangeDateFrom(e)}
                onChangeTo={e => _onChangeDateTo(e)}
                dateFrom={dateFrom}
                dateTo={dateTo}
              />
            </div>
          </div>
        </Widget>
        <Widget
          title="Inline date picker"
          description="Use the <code>InlineDatepicker</code> component as a starting point for an inline date picker">
          <div className="row">
            <div className="col col-lg-3">
              <InlineDatepicker onChange={e => _onChangeInlineDate(e)} />
              {inlineDate && (
                <p className="m-t-50">
                  Selected date: {inlineDate}
                </p>
              )}
            </div>
          </div>
        </Widget>
      </div>
    </div>
  )
}

export default ReactDatetime
