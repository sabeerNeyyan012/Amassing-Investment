import React from 'react';
import ReactApexChart from 'react-apexcharts';


const ApexChart = () => {

    const chartSeries = [{
        data: [
          [1327359600000,30.95],
          [1327446000000,31.34],
          [1327532400000,31.18],
          [1327618800000,31.05],
          [1327878000000,31.00],
          [1327964400000,30.95],
          [1328050800000,31.24],
          [1328137200000,31.29],
          [1328223600000,31.85],
          [1328482800000,31.86],
          [1328569200000,32.28],
          [1328655600000,32.10],
          [1328742000000,32.65],
          [1328828400000,32.21],
          [1329087600000,32.35],
          [1329174000000,32.44],
          [1329260400000,32.46],
          [1329346800000,32.86],
          [1329433200000,32.75],
          [1329778800000,32.54],
          [1329865200000,32.33],      ]
      }];
    
    const chartOptions = {
        chart: {
          type: 'area',
          zoom:{
            enabled:false
          },
          toolbar:{
              show:false
          }
        },
        dataLabels: {
          enabled: false
        },
        fill: {
          type: 'gradient',
          gradient: {
            stops: [0, 100],
            colorStops: [[
                {
                    offset: 0,
                    color: 'rgba(0, 139, 62, 0.5)',
                    opacity: 1
                },
                {
                offset: 100,
                color: 'rgba(0, 139, 62, 0)',
                opacity: 1
                },
            ]]
          }
        },
        stroke: {
            curve: 'straight',
            width: 2,
            colors: ["#13A41B"]
        },
        tooltip:{
            enabled:false
        },
        xaxis:{
            labels: {
                show: false
            },
            axisBorder:{
                show: true,
                color: '#000',
                height: 0.5,
                width: '100%',
                offsetX: 0,
            },
            axisTicks: {
                show: false,
            },
            crosshairs:{
                stroke:{
                    dashArray: 2,
                }
            }
        },
        yaxis:{
            show:false
        },
        grid:{
            show:false
        },
        markers:{
            
        }
    };

    return (
        <div>
            <ReactApexChart options={chartOptions} series={chartSeries} height="100px" width="160px" type="area" />
        </div>
    )
}

export default ApexChart
