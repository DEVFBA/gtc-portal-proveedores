import React, { useState, useEffect, useRef } from "react";
import {random} from '../../functions'
import Widget from '../../elements/DashboardWidget'
import BarChartWidget9 from '../../bar-chart-widgets/BarChartWidget9'
import AreaChartWidget9 from '../../area-chart-widgets/AreaChartWidget9'
import LineChartWidget9 from '../../line-chart-widgets/LineChartWidget9'

const chartData = () => {
  let data = []
  for (let i = 0; i < 20; i++) {
    data.push({name: 'Serie ' + (i + 1), x: random(20, 90)})
  }
  return data
}

const widgets = [
  {
    color: 'info',
    height: 60,
    widget: {
      bg: 'transparent',
      color: 'default',
      subtitle: 'Users',
      title: '4,412',
      percent: '+5%',
      percentColor: 'success',
      align: 'left',
      padding: 0,
      data: chartData()
    }
  },
  {
    color: 'success',
    height: 60,
    widget: {
      bg: 'transparent',
      color: 'default',
      subtitle: 'Profit',
      title: '$9,876',
      percent: '-2.5%',
      percentColor: 'danger',
      align: 'left',
      padding: 0,
      data: chartData()
    }
  },
  {
    color: 'warning',
    height: 60,
    widget: {
      bg: 'transparent',
      color: 'default',
      subtitle: 'Orders',
      title: '578',
      percent: '+15.2%',
      percentColor: 'success',
      align: 'left',
      padding: 0,
      data: chartData()
    }
  },
  {
    color: 'danger',
    height: 60,
    widget: {
      bg: 'transparent',
      color: 'default',
      subtitle: 'Sales',
      title: '154',
      percent: '-4%',
      percentColor: 'danger',
      align: 'left',
      padding: 0,
      data: chartData()
    }
  }
]

function  Section1()
{
  useEffect(() => {
    console.log(widgets[1])
  }, []);

  return(
    <Widget title="Dashboard stats" description="This week">
      <div className="row">
        <div className="col-12 col-sm-6 col-lg-3 m-b-10">
          <BarChartWidget9 widget = {widgets[0].widget} color = {widgets[0].color} height = {widgets[0].height} />
        </div>
        <div className="col-12 col-sm-6 col-lg-3 m-b-10">
          <AreaChartWidget9 widget = {widgets[1].widget} color = {widgets[1].color} height = {widgets[1].height} />
        </div>
        <div className="col-12 col-sm-6 col-lg-3 m-b-10">
          <LineChartWidget9 widget = {widgets[2].widget} color = {widgets[2].color} height = {widgets[2].height} />
        </div>
        <div className="col-12 col-sm-6 col-lg-3 m-b-10">
          <BarChartWidget9 widget = {widgets[3].widget} color = {widgets[3].color} height = {widgets[3].height} />
        </div>
      </div>
    </Widget>
  )
}

export default Section1
