import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getFinancialStatisticsV2 } from '../../../api/financialStatistics';
import {
  TYPE,
  PERIOD_FILTER,
  YEAR_FILTER,
  CAPITAL_STRUCTURE_COLUMNS,
  PRICING_COLUMNS,
  EFFICIENCY_RATIO_COLUMNS,
  RETURN_COLUMNS,
  MARGIN_COLUMNS,
  LEVERAGE_RATIO_COLUMNS,
  LIQUIDITY_RATIO_COLUMNS,
  EARNING_DIVIDEND_COLUMNS,
  CASH_FLOW_RATIO_COLUMNS,
} from './Data/Constants';
import FinancialStatisticsGenerator from './Data/FinancialStatisticsGenerator';
import moment from 'moment';

const FinancialStatistics = () => {
  const { symbol, subId } = useParams();
  const navigate = useNavigate();
  const checkActiveTab = Object.keys(TYPE).filter((data) => TYPE[data].value === subId)
  const [activeTab, setActiveTab] = useState(subId === undefined ? TYPE.capitalStructure.value : TYPE[checkActiveTab]?.value);
  const [filter, setFilter] = useState({
    period: PERIOD_FILTER[0].value,
    last: YEAR_FILTER[0].value,
    symbol: symbol,
  });

  useEffect(() => {
    navigate(`FINANCIAL_STATISTICS/${TYPE.capitalStructure.value}`)
  },[])

  const [financialStatisticsData, setFinancialStatisticsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [columnList, setColumnList] = useState(CAPITAL_STRUCTURE_COLUMNS);

  useEffect(() => {
    (async () => {
      if (symbol) {
        setLoading(true);
        var res = await getFinancialStatisticsV2(filter);
        if (res && res.status === 200 && res?.data) {
          const statistics = res?.data?.data.map((row) => {
            row.column =
              filter.period === PERIOD_FILTER[0].value
                ? moment(row?.date).format('YYYY')
                : `${row?.period} ${moment(row?.date).format('YYYY')}`;
            row.year = moment(row?.date).format('YYYY');
            row.quarter =
              filter.period === PERIOD_FILTER[0].value
                ? moment(row?.date).format('YYYY')
                : row?.period[1];
            return row;
          });
          const ttm = res?.data?.ttmData;
          ttm.column = 'TTM';
          statistics.unshift(ttm);
          statistics.sort(function (a, b) {
            return b.year - a.year || b.quarter - a.quarter;
          });
          setFinancialStatisticsData(statistics);
        }
        setLoading(false);
      }
    })();
  }, [filter]);

  useEffect(() => {
    switch (activeTab) {
      case TYPE.capitalStructure.value:
        setColumnList(CAPITAL_STRUCTURE_COLUMNS);
        break;
      case TYPE.pricing.value:
        setColumnList(PRICING_COLUMNS);
        break;
      case TYPE.efficiencyRatios.value:
        setColumnList(EFFICIENCY_RATIO_COLUMNS);
        break;
      case TYPE.returns.value:
        setColumnList(RETURN_COLUMNS);
        break;
      case TYPE.margins.value:
        setColumnList(MARGIN_COLUMNS);
        break;
      case TYPE.leverageRatios.value:
        setColumnList(LEVERAGE_RATIO_COLUMNS);
        break;
      case TYPE.liquidityRatios.value:
        setColumnList(LIQUIDITY_RATIO_COLUMNS);
        break;
      case TYPE.earningsDividends.value:
        setColumnList(EARNING_DIVIDEND_COLUMNS);
        break;
      case TYPE.cashFlowRatios.value:
        setColumnList(CASH_FLOW_RATIO_COLUMNS);
        break;
      default:
        setColumnList(CAPITAL_STRUCTURE_COLUMNS);
    }
  }, [activeTab]);

  return (
    <>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='d-flex align-items-center justify-content-between mt-5'>
            <h4 className='me-auto mb-0'>Financial Statistics</h4>
            <form
              className='form-group'
              role='search'
              method='get'
              id='searchform'
              action
            >
              <div className='d-lg-inline-flex d-md-flex align-items-center float-start'>
                <label className='me-3 font-bd'>Period</label>
                <select
                  className='form-select me-3'
                  aria-label='Default select example'
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      period: e.target.value,
                    })
                  }
                >
                  {PERIOD_FILTER.map((period, index) => {
                    return (
                      <option key={index} value={period.value}>
                        {period.label}
                      </option>
                    );
                  })}
                </select>
                <label className='me-3 font-bd'>View</label>
                <select
                  className='form-select me-0'
                  aria-label='Default select example'
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      last: e.target.value,
                    })
                  }
                >
                  {YEAR_FILTER.map((year, index) => {
                    return (
                      <option key={index} value={year.value}>
                        {year.label}
                      </option>
                    );
                  })}
                </select>
              </div>
            </form>
          </div>
        </div>
        <div className='col-lg-12'>
          <div className='top_button_panel v2 mt-4 mb-3'>
            {Object.keys(TYPE).map((key, index) => {
              return (
                <button
                  key={index}
                  type='button'
                  onClick={() => {setActiveTab(TYPE[key].value);navigate(`FINANCIAL_STATISTICS/${TYPE[key].value}`)}}
                  className={`btn ${
                    activeTab === TYPE[key].value ? 'btn-info' : 'btn-light'
                  }`}
                >
                  {TYPE[key].label}
                </button>
              );
            })}
          </div>
        </div>

        <FinancialStatisticsGenerator
          data={financialStatisticsData}
          Loading={loading}
          columnList={columnList}
        />
      </div>
    </>
  );
};

export default FinancialStatistics;
