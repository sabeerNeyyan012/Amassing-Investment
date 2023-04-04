import React from 'react';

const RemoveDot = () => {
  return <></>;
};

const CustomizedGrowthRateLabel = (props) => {
  const { x, y, stroke, value, index, data } = props;

  return (
    <text
      x={x + 40}
      y={y}
      dy={+20}
      fill={stroke}
      fontSize={10}
      textAnchor='middle'
    >
      {index < data.length - 1 ? data[index + 1].data : ''}
    </text>
  );
};

const CustomizedGrowthRateLabelV2MiddleWithData2 = (props) => {
  const { x, y, stroke, value, index, data } = props
  if (index < data.length - 1) {
    return (
      <text
        x={x + 15}
        y={y - 35}
        dy={+20}
        fill={stroke}
        fontSize={10}
        textAnchor='middle'
        color={`#13A41B`}
        style={{ fill: data[index + 1].data > 0 ? '#13A41B' : '#DF0822' }}
      >
        {index < data.length - 1 ? `${data[index + 1].data2.toFixed(2)}%` : ''}
      </text>
    )
  } else {
    return <></>
  }
}

const CustomizedGrowthRateLabelV2MiddleWithData = (props) => {
  const { x, y, stroke, value, index, data } = props
  if (index < data.length - 1) {
    return (
      <text
        x={x + 15}
        y={y - 35}
        dy={+20}
        fill={stroke}
        fontSize={10}
        textAnchor='middle'
        color={`#13A41B`}
        style={{ fill: data[index + 1].data > 0 ? '#13A41B' : '#DF0822' }}
      >
        {index < data.length - 1 ? `${data[index + 1].data.toFixed(2)}%` : ''}
      </text>
    )
  } else {
    return <></>
  }
}

const CustomizedGrowthRateLabelV2 = (props) => {
  const { x, y, stroke, value, index, data } = props
  if (index < data.length - 1) {
    return (
      <text
        x={x + 10}
        y={y - 65}
        dy={+20}
        fill={stroke}
        fontSize={10}
        textAnchor='middle'
        color={`#13A41B`}
        style={{ fill: data[index + 1].data > 0 ? '#13A41B' : '#DF0822' }}
      >
        {index < data.length - 1 ? `${data[index + 1].data.toFixed(2)}%` : ''}
      </text>
    )
  } else {
    return <></>
  }
}

const CustomizedGrowthRateLabelV2AboveLine = (props) => {
  const { x, y, stroke, value, index, data } = props
  return (
    <text
      x={x + 5}
      y={y - 30}
      dy={+20}
      fill={stroke}
      fontSize={10}
      textAnchor='middle'
      color={`#13A41B`}
      style={{ fill: data[index].data > 0 ? '#13A41B' : '#DF0822' }}
    >
      {data[index].data !== null || undefined
        ? `${data[index].data.toFixed(2)}%`
        : ''}
    </text>
  )
}

const CustomizedGrowthRateLabelV2AboveLineData2 = (props) => {
  const { x, y, stroke, value, index, data } = props
  return (
    <text
      x={x + 5}
      y={y - 30}
      dy={+20}
      fill={stroke}
      fontSize={10}
      textAnchor='middle'
      color={`#13A41B`}
      style={{ fill: data[index].data > 0 ? '#13A41B' : '#DF0822' }}
    >
      {data[index].data2 !== null || data[index].data2 !== undefined
        ? `${data[index].data2.toFixed(2)}%`
        : ''}
    </text>
  )
}

const CustomizedScatterRoundShape = (props) => {
  const { cx, cy, fill, payload, index } = props

  if (Object.keys(payload).length > 0) {
    return (
      <circle
        cx={cx}
        cy={cy}
        r='12'
        stroke={fill}
        stroke-width='3'
        fill='transparent'
      />
    )
  } else {
    return <></>
  }
}

export {
  RemoveDot,
  CustomizedGrowthRateLabel,
  CustomizedGrowthRateLabelV2,
  CustomizedGrowthRateLabelV2AboveLine,
  CustomizedScatterRoundShape,
  CustomizedGrowthRateLabelV2MiddleWithData,
  CustomizedGrowthRateLabelV2MiddleWithData2,
  CustomizedGrowthRateLabelV2AboveLineData2
}
