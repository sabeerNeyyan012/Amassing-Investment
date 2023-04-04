import React, { useEffect, useState } from 'react';
import BalanceSheet from './BalanceSheet';
import FinancialStatisticsGenerator from '../FinancialStatisticsNew/Data/FinancialStatisticsGenerator';
import { INCOME_STATEMENT_COLUMNS } from './Constants';
import {
  getBalanceSheetV2,
  getIncomeStatementsV2,
  getCashFlowV2,
} from '../../../api/financials';
import {
  PERIOD_FILTER,
  YEAR_FILTER,
} from '../FinancialStatisticsNew/Data/Constants';
import { TYPE } from './Constants';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import CashFlow from './CashFlow';
import InvexLoader from '../../../Common/InvexLoader';

const FinancialStatement = () => {
  const { symbol, subId } = useParams();
  const navigate = useNavigate();
  const checkActiveTab = Object.keys(TYPE).filter((data) => TYPE[data].value === subId)
  const [activeTab, setActiveTab] = useState(subId === undefined ? TYPE.balanceSheet.value : TYPE[checkActiveTab]?.value);
  const [data, setData] = useState(null);
  const [filter, setFilter] = useState({
    period: PERIOD_FILTER[0].value,
    last: YEAR_FILTER[0].value,
    symbol: symbol,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigate(`FINANCIAL_STATEMENTS/${TYPE.balanceSheet.value}`)
  },[])
  useEffect(() => {
    (async () => {
      if (symbol) {
        setLoading(true);
        let res = null;
        switch (activeTab) {
          case TYPE.balanceSheet.value:
            res = await getBalanceSheetV2(filter);
            break;

          case TYPE.incomeStatement.value:
            res = await getIncomeStatementsV2(filter);
            break;

          case TYPE.cashFlow.value:
            res = await getCashFlowV2(filter);
            break;
        }

        if (res && res.status === 200 && res?.data) {
          const commonData = res?.data.map((row, index) => {
            if (activeTab === TYPE.incomeStatement.value && index === 0) {
              row.column = 'TTM';
            } else {
              row.column =
                filter.period === PERIOD_FILTER[0].value
                  ? moment(row?.date).format('YYYY')
                  : `${row?.period} ${moment(row?.date).format('YYYY')}`;
            }

            row.year = moment(row?.date).format('YYYY');
            row.quarter =
              filter.period === PERIOD_FILTER[0].value
                ? moment(row?.date).format('YYYY')
                : row?.period[1];
            return row;
          });
          commonData.sort(function (a, b) {
            return b.year - a.year || b.quarter - a.quarter;
          });
          setData(commonData);
        }
        setLoading(false);
      }
    })();
  }, [symbol, activeTab, filter]);

  return (
    <div className='row'>
      <div className='col-lg-12'>
        <div className='d-flex align-items-center justify-content-between mt-5'>
          <h4 className='me-auto mb-0'>Financial Statements</h4>
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
                onClick={() => {setActiveTab(TYPE[key].value);navigate(`FINANCIAL_STATEMENTS/${TYPE[key].value}`)}}
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

      {loading && <InvexLoader height='450px' />}

      {!loading && activeTab && activeTab === TYPE.balanceSheet.value && (
        <BalanceSheet data={data} />
      )}

      {!loading && activeTab && activeTab === TYPE.incomeStatement.value && (
        <FinancialStatisticsGenerator
          data={data}
          Loading={loading}
          columnList={INCOME_STATEMENT_COLUMNS}
        />
      )}

      {!loading && activeTab && activeTab === TYPE.cashFlow.value && (
        <CashFlow data={data} />
      )}
    </div>
  );
};

export default FinancialStatement;
