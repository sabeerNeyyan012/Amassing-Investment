import moment from 'moment';
import React, { useEffect, useState, PureComponent } from 'react';
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const OptionVolumeChart = ({ data }) => {
  const [graphData, setGraphData] = useState([]);
  const [period, setPeriod] = useState('YEAR'); // possible values YEAR, 6MONTHS, 3MONTHS
  const [volume, setVolume] = useState('VOLUME_CALL'); //possible values
  const [ticks, setTicks] = useState([]);

  useEffect(() => {
    const todaysDate = new Date();
    let pastDate = '';
    if (period === 'YEAR') {
      pastDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
    } else if (period === '6MONTHS') {
      pastDate = new Date(new Date().setMonth(new Date().getMonth() - 6));
    } else if (period === '3MONTHS') {
      pastDate = new Date(new Date().setMonth(new Date().getMonth() - 3));
    }
    if (data && data.Graph_data) {
      const graph = [];
      const tempDate = [];
      const uniqueMonthDates = [];
      data.Graph_data.date.map((row, index) => {
        if (new Date(row) > pastDate && new Date(row) < todaysDate) {
          const month = new Date(row).getMonth();
          const year = new Date(row).getFullYear();
          const currentDate = `${month}${year}`;
          if (!tempDate.includes(currentDate)) {
            tempDate.push(currentDate);
            uniqueMonthDates.push(row);
          }
          const obj = {};
          if (volume === 'VOLUME_CALL') {
            obj.quantity = data.Graph_data.callvol[index];
          } else if (volume === 'VOLUME_PUT') {
            obj.quantity = data.Graph_data.putvol[index];
          } else if (volume === 'VOLUME_TOTAL') {
            obj.quantity = data.Graph_data.totalvol[index];
          } else if (volume === 'VOLUME_CALL_PUT') {
            obj.quantity = data.Graph_data.callvol[index];
            obj.put = data.Graph_data.putvol[index];
          }
          obj.date = row;
          graph.push(obj);
        }
      });
      setTicks(uniqueMonthDates);
      setGraphData(graph);
    }
  }, [data, period, volume]);

  return (
    <>
      <div className='row'>
        <h6 className='mb-4'>
          <strong>Option Volume</strong>
        </h6>
        <div className='d-flex align-items-center justify-content-between'>
          <div className='top_button_panel top_button_panel_light mb-3'>
            <button
              type='button'
              className={`btn ${
                volume === 'VOLUME_CALL' ? 'btn-info' : 'btn-light'
              }`}
              onClick={() => setVolume('VOLUME_CALL')}
            >
              Volume Call
            </button>
            <button
              type='button'
              className={`btn ${
                volume === 'VOLUME_PUT' ? 'btn-info' : 'btn-light'
              }`}
              onClick={() => setVolume('VOLUME_PUT')}
            >
              {' '}
              Volume Put
            </button>
            <button
              type='button'
              className={`btn ${
                volume === 'VOLUME_CALL_PUT' ? 'btn-info' : 'btn-light'
              }`}
              onClick={() => setVolume('VOLUME_CALL_PUT')}
            >
              {' '}
              Volume Call & Put
            </button>
            <button
              type='button'
              className={`btn ${
                volume === 'VOLUME_TOTAL' ? 'btn-info' : 'btn-light'
              }`}
              onClick={() => setVolume('VOLUME_TOTAL')}
            >
              {' '}
              Volume Total
            </button>
          </div>
          <div className='top_button_panel top_button_panel_light mb-3'>
            <button
              type='button'
              className={`btn ${
                period === '3MONTHS' ? 'btn-info' : 'btn-light'
              }`}
              onClick={() => setPeriod('3MONTHS')}
            >
              {' '}
              3 Months
            </button>
            <button
              type='button'
              className={`btn ${
                period === '6MONTHS' ? 'btn-info' : 'btn-light'
              }`}
              onClick={() => setPeriod('6MONTHS')}
            >
              {' '}
              6 Months
            </button>
            <button
              type='button'
              className={`btn ${period === 'YEAR' ? 'btn-info' : 'btn-light'}`}
              onClick={() => setPeriod('YEAR')}
            >
              {' '}
              1 Year
            </button>
          </div>
        </div>
        <ResponsiveContainer width='100%' aspect={1} maxHeight={250}>
          <BarChart data={graphData} barSize={10} barGap={20}>
            <XAxis
              dataKey='date'
              tickFormatter={(date) => {
                return moment(date).format('MMM');
              }}
              axisLine={false}
              ticks={ticks}
              tick={{ fill: '#212121', fontSize: '12px' }}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: '#212121', fontSize: '12px' }}
            />
            <Tooltip />
            <Bar dataKey='quantity' fill='#3751FF' />
            {volume === 'VOLUME_CALL_PUT' && (
              <Bar dataKey='put' fill='#82ca9d' />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default OptionVolumeChart;
