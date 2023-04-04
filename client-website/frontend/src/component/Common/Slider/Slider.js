import React, { useState, useEffect, useCallback } from 'react';
import { Slider } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import debounce from 'debounce';

const StyledSlider = styled(Slider)`
  & .MuiSlider-thumb {
    height: 15px;
    width: 15px;
    color: black;
    margin-top: -3px;
  }

  & .MuiSlider-track {
    height: 10px;
    background-color: blue;
  }

  & .MuiSlider-rail {
    height: 10px;
    background-color: #f8f8f8;
    border: 1px solid rgba(0, 0, 0, 0.625);
    border-radius: 8px;
  }
`;

const SliderComp = ({
  minRange,
  maxRange,
  onChange,
  onMinChange = (no) => {},
  onMaxChange = (no) => {},
  disabled = false,
  rangeTextBoxVisible = true,
  defaultValue = minRange,
  clearAll = false,
}) => {
  const [min, setMin] = useState(Number(minRange));
  const [max, setMax] = useState(Number(maxRange));
  const [values, setValues] = useState([Number(minRange), Number(maxRange)]);
  const handleMinChangeDebounce = useCallback(
    debounce(handleMinChange, 700),
    []
  );
  const handleMaxChangeDebounce = useCallback(
    debounce(handleMaxChange, 700),
    []
  );

  useEffect(() => {
    if (clearAll) {
      setMin(minRange);
      setMax(maxRange);
    }
  }, [clearAll]);

  useEffect(() => {
    setValues([min, max]);
  }, [min, max]);

  useEffect(() => {
    onMinChange(values[0]);
    onMaxChange(values[1]);
  }, [values]);

  const handleSliderChange = (event, newValue) => {
    setValues(newValue)
    setMin(newValue[0])
    setMax(newValue[1])
  }

  const handleOnChange = (event, newValue) => {
    onChange(values);
  };

  function handleMinChange(val) {
    onChange([val, max]);
  }

  function handleMaxChange(val) {
    onChange([min, val]);
  }

  return (
    <>
      <div>
        <StyledSlider
          onChange={handleSliderChange}
          value={values}
          disabled={disabled}
          min={Number(minRange)}
          max={Number(maxRange)}
          onChangeCommitted={handleOnChange}
        />
        {rangeTextBoxVisible && (
          <div className='col-12 d-flex justify-content-between'>
            <div className='col-6'>
              <input
                className='form-control w-75 float-start'
                type='number'
                value={min}
                onChange={(e) => {
                  setMin(
                    typeof e.target.value === 'string'
                      ? parseInt(e.target.value)
                      : 0
                  );
                  handleMinChangeDebounce(
                    typeof e.target.value === 'string'
                      ? parseInt(e.target.value)
                      : 0
                  );
                }}
              />
            </div>
            <div className='col-6'>
              <input
                className='form-control w-75 float-end'
                type='number'
                value={max}
                onChange={(e) => {
                  setMax(
                    typeof e.target.value === 'string'
                      ? parseInt(e.target.value)
                      : 0
                  );
                  handleMaxChangeDebounce(
                    typeof e.target.value === 'string'
                      ? parseInt(e.target.value)
                      : 0
                  );
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SliderComp;
