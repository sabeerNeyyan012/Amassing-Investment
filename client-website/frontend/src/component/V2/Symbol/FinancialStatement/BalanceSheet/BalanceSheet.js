import React, { useEffect, useState } from 'react';
import CustomChart from '../../../../Graph/CustomChart';
import {
  BALANCE_SHEET_COLUMNS,
  CURRENT_ASSETS_COLUMNS,
  NON_CURRENT_ASSETS_COLUMNS,
  CURRENT_LIABILITIES_COLUMNS,
  NON_CURRENT_LIABILITIES_COLUMNS,
  SHAREHOLDERS_EQUITY_COLUMNS,
  OTHER_BALANCE_COLUMN,
} from '../Constants';
import { convertCamelCaseToSpaceSeparatedString } from '../../../../Common/CommonFunctions';
import PrepareTable from '../PrepareTable';

const BalanceSheet = ({ data }) => {
  const [tableData, setTableData] = useState([]);
  const [chartLabel, setChartLabel] = useState();
  const [checkedValues, setCheckedValues] = useState([]);
  const [dataSets, setDataSets] = useState([]);
  const [currentAsset, setCurrentAsset] = useState(null);
  const [nonCurrentAsset, setNonCurrentAsset] = useState(null);
  const [currentLiabilities, setCurrentLiabilities] = useState(null);
  const [nonCurrentLiabilities, setNonCurrentLiabilities] = useState(null);
  const [shareholdersEquity, setShareholdersEquity] = useState(null);
  const [otherData, setOtherData] = useState(null);

  useEffect(() => {
    if (data && data.length > 0) {
      const finalData = prepareData(BALANCE_SHEET_COLUMNS);
      setTableData(finalData);

      const labels = data?.map((row, index) => row?.column);

      const finalLabel = labels.reverse();
      finalLabel.shift();

      setChartLabel(finalLabel);

      setCheckedValues([]);

      const curAsset = prepareData(CURRENT_ASSETS_COLUMNS);
      setCurrentAsset(curAsset);

      const resp1 = prepareData(NON_CURRENT_ASSETS_COLUMNS);
      setNonCurrentAsset(resp1);

      const resp2 = prepareData(CURRENT_LIABILITIES_COLUMNS);
      setCurrentLiabilities(resp2);

      const resp3 = prepareData(NON_CURRENT_LIABILITIES_COLUMNS);
      setNonCurrentLiabilities(resp3);

      const resp4 = prepareData(SHAREHOLDERS_EQUITY_COLUMNS);
      setShareholdersEquity(resp4);

      const resp5 = prepareData(OTHER_BALANCE_COLUMN);
      setOtherData(resp5);
    }
  }, [data]);

  const prepareData = (columnList) => {
    const finalData = columnList.map((columns) => {
      let newObj = {};
      newObj.key = columns?.key;
      newObj.heading = convertCamelCaseToSpaceSeparatedString(columns.key);
      data?.map((row, index) => {
        newObj[`col${index}`] = row[columns?.key];
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
          <h5 className='mb-3'>ASSETS</h5>
          <PrepareTable
            data={currentAsset}
            headingName='Current Assets'
            onChange={onChange}
            colData={data}
          />

          <PrepareTable
            data={nonCurrentAsset}
            headingName='Non-Current Assets'
            onChange={onChange}
            colData={data}
          />

          <h5 className='mb-3'>LIABILITIES</h5>

          <PrepareTable
            data={currentLiabilities}
            headingName='Current Liabilities'
            onChange={onChange}
            colData={data}
          />

          <PrepareTable
            data={nonCurrentLiabilities}
            headingName='Non-Current Liabilities'
            onChange={onChange}
            colData={data}
          />

          <h5 className='mb-3'>SHAREHOLDER'S EQUITY</h5>

          <PrepareTable
            data={shareholdersEquity}
            headingName='-'
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
  )
};

export default BalanceSheet;
