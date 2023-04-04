export const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className='custom-tooltip'>
        <p className='label'>{`${label}`}</p>
        <p style={{ color: payload[0]['color'] }}>{`${payload[0]['name']} : ${
          payload[0]['payload']['data']
            ? payload[0]['payload']['data'].toFixed(2)
            : '-'
        }`}</p>
        <p style={{ color: payload[1]['color'] }}>{`${payload[1]['name']} : ${
          payload[1]['payload']['data2']
            ? payload[1]['payload']['data2'].toFixed(2)
            : '-'
        }`}</p>
      </div>
    )
  }

  return null
}

export const CustomTooltip2 = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className='custom-tooltip'>
        <p className='label'>{`${label}`}</p>
        <p style={{ color: payload[0]['color'] }}>{`${payload[0]['name']} : ${
          payload[0]['payload']['data2']
            ? payload[0]['payload']['data2'].toFixed(2)
            : '-'
        }`}</p>
        <p style={{ color: payload[1]['color'] }}>{`${payload[1]['name']} : ${
          payload[1]['payload']['data']
            ? payload[1]['payload']['data'].toFixed(2)
            : '-'
        }`}</p>
      </div>
    )
  }

  return null
}
