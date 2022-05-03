import React from 'react'
import PropTypes from 'prop-types'
import LineChart1 from './LineChart1'
import TextWidget1 from '../text-widgets/TextWidget1'

function LineChartWidget9 ({widget, color, height}) 
{

  return (
    <div className="line-chart-widget-9">
      <div className="row align-items-center justify-content-center m-b-10">
        <div className="col">
          <div className="p-10">
            <TextWidget1 widget={widget} />
          </div>
        </div>
      </div>
      <div className="row align-items-center justify-content-center">
        <div className="col">
          <LineChart1 color={color} height={height} data={widget.data} />
        </div>
      </div>
    </div>
  )
}

export default LineChartWidget9
