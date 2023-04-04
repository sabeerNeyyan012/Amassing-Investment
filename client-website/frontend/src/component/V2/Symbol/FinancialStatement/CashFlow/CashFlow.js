import React, { useEffect, useState } from 'react';
import CustomChart from '../../../../Graph/CustomChart';
import {
  CASH_FLOW_COLUMNS,
  OPERATING_CASH_FLOW_COLUMNS,
  INVESTING_CASH_FLOW_COLUMNS,
  FINANCING_CASH_FLOW_COLUMNS,
  OTHER_CASH_FLOW_COLUMNS,
} from '../Constants';
import { convertCamelCaseToSpaceSeparatedString } from '../../../../Common/CommonFunctions';
import PrepareTable from '../PrepareTable';

const CashFlow = ({ data }) => {
  const [tableData, setTableData] = useState([]);
  const [chartLabel, setChartLabel] = useState();
  const [checkedValues, setCheckedValues] = useState([]);
  const [dataSets, setDataSets] = useState([]);
  const [operatingCashFlow, setOperatingCashFlow] = useState(null);
  const [investingCashFlow, setInvestingCashFlow] = useState(null);
  const [financingCashFlow, setFinancingCashFlow] = useState(null);
  const [otherData, setOtherData] = useState(null);

  useEffect(() => {
    if (data && data.length > 0) {
      const finalData = prepareData(CASH_FLOW_COLUMNS);

      setTableData(finalData);

      const labels = data?.map((row, index) => row?.column);

      const finalLabel = labels.reverse();
      finalLabel.shift();

      setChartLabel(finalLabel);
      setCheckedValues([]);

      const cash = prepareData(OPERATING_CASH_FLOW_COLUMNS);
      setOperatingCashFlow(cash);

      const resp1 = prepareData(INVESTING_CASH_FLOW_COLUMNS);
      setInvestingCashFlow(resp1);

      const resp2 = prepareData(FINANCING_CASH_FLOW_COLUMNS);
      setFinancingCashFlow(resp2);

      const resp3 = prepareData(OTHER_CASH_FLOW_COLUMNS);
      setOtherData(resp3);
    }
  }, [data]);

  const prepareData = (columnList) => {
    const finalData = columnList.map((columns) => {
      let newObj = {};
      newObj.key = columns;
      newObj.heading = convertCamelCaseToSpaceSeparatedString(columns);
      data?.map((row, index) => {
        newObj[`col${index}`] = row[columns];
      });
      return newObj;
    });

    return finalData;
  };

  const findChartData = (key) => {
    const data = tableData.find((value) => {
      return value.key === key;
    });
    if (data) {
      return data;
    } else {
      return {};
    }
  };

  useEffect(() => {
    setDataSets(
      checkedValues &&
        checkedValues.map((index) => {
          const row = Object.values(findChartData(index));

          const temp = row.slice(1, row.length).reverse();

          const finalData = [];

          temp.map((val, index) => {
            if (index > 0 && index <= temp.length - 1) {
              const value =
                ((temp[index] - temp[index - 1]) / temp[index - 1]) * 100;
              const finalValue = value;
              finalData.push(isNaN(finalValue) ? 0 : finalValue);
            }
          });

          return {
            label: row[1],
            data: finalData,
            borderColor:
              'rgb(' +
              Math.floor(Math.random() * 255) +
              ',' +
              Math.floor(Math.random() * 255) +
              ',' +
              Math.floor(Math.random() * 255) +
              ')',
            backgroundColor:
              'rgba(' +
              Math.floor(Math.random() * 255) +
              ',' +
              Math.floor(Math.random() * 255) +
              ',' +
              Math.floor(Math.random() * 255) +
              ', 0.5)',
          };
        })
    );
  }, [checkedValues]);

  const onChange = (event, index) => {
    if (event.target.checked) {
      if (!checkedValues.includes(index)) {
        const tempArr = checkedValues;
        tempArr.push(index);
        setCheckedValues([...tempArr]);
      }
    } else {
      const tempArr = checkedValues;
      const i = tempArr.indexOf(index);
      if (i > -1) {
        tempArr.splice(i, 1);
      }
      setCheckedValues([...tempArr]);
    }
  };

  return (
    <>
      <div className='col-lg-12'>
        <div className='top_competitors'>
          <h5 className='mb-3'>Operating Cash Flow</h5>
          <PrepareTable
            data={operatingCashFlow}
            headingName='Operating Cash Flow'
            onChange={onChange}
            colData={data}
          />

          <h5 className='mb-3'>Investing Cash Flow</h5>

          <PrepareTable
            data={investingCashFlow}
            headingName='Investing Cash Flow'
            onChange={onChange}
            colData={data}
          />

          <h5 className='mb-3'>Financing Cash Flow</h5>

          <PrepareTable
            data={financingCashFlow}
            headingName='Financing Cash Flow'
            onChange={onChange}
            colData={data}
          />

          <PrepareTable
            data={otherData}
            headingName='-'
            onChange={onChange}
            colData={data}
          />
        </div>
      </div>

      {dataSets && dataSets.length > 0 && (
        <CustomChart
          title='Invex Chart'
          chartLables={chartLabel}
          dataSets={dataSets}
        />
      )}
    </>
  );
};

export default CashFlow;
