import React, { useEffect, useState } from 'react';
import GaugeChart from 'react-gauge-chart';
import SliderReadOnly from '../SliderReadOnly/SliderReadOnly';

const Volatility = ({ data }) => {
  const [volumeArcLength, setVolumeArcLength] = useState([]);
  const [openInterestArcLength, setOpenInterestArcLength] = useState([]);

  useEffect(() => {
    if (data && data.Volume) {
      const volume = data.Volume;

      setVolumeArcLength([
        parseFloat((volume.Calls / volume.Total).toFixed(2)),
        parseFloat((volume.Puts / volume.Total).toFixed(2)),
      ]);
    }

    if (data && data.Open_Interest) {
      const openInterest = data.Open_Interest;

      setOpenInterestArcLength([
        parseFloat((openInterest.Calls / openInterest.Total).toFixed(2)),
        parseFloat((openInterest.Puts / openInterest.Total).toFixed(2)),
      ]);
    }
  }, [data]);

  return (
    <>
      <div className='col-lg-12'>
        <div className='row'>
          <div className='col-lg-6'>
            <div>
              <h5 className='mb-4'>52 Week Range</h5>
              <div className='row mb-5'>
                <div className='col-lg-6 border-end'>
                  <SliderReadOnly
                    min={data['52_Week_Range'].IV30.Low}
                    max={data['52_Week_Range'].IV30.High}
                    value={data.Volatility.IV30}
                    label='IV 30'
                  />
                </div>

                <div className='col-lg-6 border-end'>
                  <SliderReadOnly
                    min={data['52_Week_Range'].HV30.Low}
                    max={data['52_Week_Range'].HV30.High}
                    value={data.Volatility.HV30}
                    label='HV 30'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='guage-chart-container d-flex align-items-center justify-content-around h-100'>
              <div className='text-center'>
                <GaugeChart
                  id='guage-chart1'
                  textColor='transparent'
                  arcWidth={0.1}
                  nrOfLevels={2}
                  arcsLength={openInterestArcLength}
                  colors={['#62A51B', '#E24D23']}
                  percent={openInterestArcLength[0]}
                  arcPadding={0.01}
                  text
                />
                <div
                  className='d-flex justify-content-around'
                  style={{ marginTop: '-13px' }}
                >
                  <p>Calls</p>
                  <div>
                    <b> Open Interest </b>
                    {data && data.Open_Interest && data.Open_Interest.Total && (
                      <p>{data.Open_Interest.Total}</p>
                    )}
                  </div>
                  <p>Puts</p>
                </div>
              </div>

              <div className='text-center'>
                <GaugeChart
                  id='guage-chart1'
                  textColor='transparent'
                  arcWidth={0.1}
                  nrOfLevels={2}
                  arcsLength={volumeArcLength}
                  colors={['#62A51B', '#E24D23']}
                  percent={volumeArcLength[0]}
                  arcPadding={0.01}
                  text
                />

                <div
                  className='d-flex justify-content-around'
                  style={{ marginTop: '-13px' }}
                >
                  <p>Calls</p>
                  <div>
                    <b> Volume </b>
                    {data && data.Volume && data.Volume.Total && (
                      <p>{data.Volume.Total}</p>
                    )}
                  </div>
                  <p>Puts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Volatility;
