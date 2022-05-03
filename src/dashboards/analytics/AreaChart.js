import React from 'react'

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip
} from 'recharts'

const data = [
  {name: 'Monday', USA: 4000, UK: 2400, MX: 2400},
  {name: 'Tuesday', USA: 3000, UK: 1398, MX: 2210},
  {name: 'Wednesday', USA: 2000, UK: 9800, MX: 2290},
  {name: 'Thursday', USA: 2780, UK: 3908, MX: 2000},
  {name: 'Friday', USA: 1890, UK: 4800, MX: 2181},
  {name: 'Saturday', USA: 2390, UK: 3800, MX: 2500},
  {name: 'Sunday', USA: 3490, UK: 4300, MX: 2100}
]

function SampleAreaChart({colors})
{
  return (
    <ResponsiveContainer width="100%" height={287}>
      <AreaChart data={data} margin={{top: 0, right: 0, left: 0, bottom: 0}}>
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip labelFormatter={e => data[e].name} />
        <Area
          type="monotone"
          dataKey="USA"
          stackId="1"
          stroke={"primary"}
          fill={"primary"}
        />
        <Area
          type="monotone"
          dataKey="UK"
          stackId="1"
          stroke={"warning"}
          fill={"warning"}
        />
        <Area
          type="monotone"
          dataKey="MX"
          stackId="1"
          stroke={"danger"}
          fill={"danger"}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default SampleAreaChart
