import React from 'react'
import {
  Area,
  AreaChart,
  ReferenceLine,
  Line,
  Cell,
  XAxis,
  YAxis
} from 'recharts'
const data = [
  {
    name: 'A',
    pv: 2400,
    amt: 2400
  },
  {
    name: 'B',
    pv: 1398,
    amt: 2210
  },
  {
    name: 'C',
    pv: 9800,
    amt: 2290
  },
  {
    name: 'D',
    pv: 3908,
    amt: 2000
  },
  {
    name: 'E',
    pv: 4800,
    amt: 2181
  },
  {
    name: 'F',
    pv: 1800,
    amt: 2500
  },
  {
    name: 'G',
    pv: 1800,
    amt: 2500
  },
  {
    name: 'H',
    pv: 2800,
    amt: 2500
  },
  {
    name: 'I',
    pv: 3800,
    amt: 2500
  },
  {
    name: 'J',
    pv: 1800,
    amt: 2500
  },
  {
    name: 'K',
    pv: 3800,
    amt: 2500
  },
  {
    name: 'L',
    pv: 1800,
    amt: 2500
  },
  {
    name: 'M',
    pv: 3800,
    amt: 2500
  },
  {
    name: 'N',
    pv: 4300,
    amt: 2100
  },
  {
    name: 'O',
    pv: 2400,
    amt: 2400
  },
  {
    name: 'P',
    pv: 1398,
    amt: 2210
  },
  {
    name: 'Q',
    pv: 9800,
    amt: 2290
  },
  {
    name: 'R',
    pv: 3908,
    amt: 2000
  },
  {
    name: 'S',
    pv: 4800,
    amt: 2181
  },
  {
    name: 'T',
    pv: 1800,
    amt: 2500
  },
  {
    name: 'U',
    pv: 1800,
    amt: 2500
  },
  {
    name: 'V',
    pv: 2800,
    amt: 2500
  },
  {
    name: 'W',
    pv: 3800,
    amt: 2500
  },
  {
    name: 'X',
    pv: 1800,
    amt: 2500
  },
  {
    name: 'Y',
    pv: 3800,
    amt: 2500
  },
  {
    name: 'Z',
    pv: 1800,
    amt: 2500
  },
  {
    name: 'AA',
    pv: 3800,
    amt: 2500
  },
  {
    name: 'AB',
    pv: 4300,
    amt: 2100
  }
];

const linearData = [
  {
    name: 'A',
    pv: 2400,
  },
  {
    name: 'B',
    pv: 1398,
  },
  {
    name: 'C',
    pv: 9800,
  },
  {
    name: 'D',
    pv: 3908,
  },
  {
    name: 'E',
    pv: 4800,
  },
  {
    name: 'F',
    pv: 1800,
  },
  {
    name: 'F',
    pv: 1800,
  },
  {
    name: 'F',
    pv: 2800,
  },
  {
    name: 'F',
    pv: 3800,
  },
  {
    name: 'F',
    pv: 1800,
  },
  {
    name: 'F',
    pv:-3800,
  },
  {
    name: 'F',
    pv: 1800,
  },
  {
    name: 'F',
    pv: 3800,
  },
  {
    name: 'G',
    pv: 4300,
  }
]

function Chart () {
  return (
    <div
      style={{
      }}
    >
      <AreaChart
        width={160}
        height={100}
        data={data}
        margin={{ top: 10, right: 0, left: -40, bottom: -20 }}
      >
        <defs>
          <linearGradient id='greenColorPv' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#008B3E' stopOpacity={0.5} />
            <stop offset='95%' stopColor='#008B3E' stopOpacity={0} />
          </linearGradient>
          <linearGradient id='redColorPv' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#ff756b' stopOpacity={0.8} />
            <stop offset='95%' stopColor='#ff756b' stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis tick={false} axisLine={false} />
        <YAxis type="number" domain={[0, 9000]} tick={false} axisLine={false} />
        <ReferenceLine y={0} strokeDasharray='3' stroke='#212121' />
        <Area
          type='linear'
          dataKey='pv'
          fillOpacity={1}
          fill='url(#greenColorPv)'
          stroke='#13A41B'
          height={160}
          width={80}
        />
      </AreaChart>
    </div>
  )
}

export default Chart
