import React from 'react';
import { Slider } from '@material-ui/core';
import { styled } from '@mui/material/styles';

const SliderReadOnly = ({ min, max, value, label }) => {
  const StyledSlider = styled(Slider)`
    & .MuiSlider-thumb {
      height: 11px;
      width: 11px;
      color: blue;
      margin-top: -1px;
    }

    & .MuiSlider-track {
      height: 10px;
      background-color: #d5d5d5;
    }

    & .MuiSlider-rail {
      height: 10px;
      background-color: #f8f8f8;
      border: 1px solid rgba(0, 0, 0, 0.625);
      border-left-color: black;
      border-radius: 8px;
    }

    & .MuiSlider-markLabelActive {
      font-weight: 600;
      font-family: Poppins;
      color: #212529;
    }
  `;

  return (
    <>
      <div className='d-flex justify-content-between ps_maxmin'>
        <span className='min'>${min}</span>
        <span className='text-grey'>{label}</span>
        <span className='max'>${max}</span>
      </div>

      <StyledSlider
        min={min}
        max={max}
        defaultValue={value}
        marks={[{ label: `${value}`, value: value }]}
        disabled
      />
    </>
  );
};

export default SliderReadOnly;
