import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FinancialStatistics from './FinancialStatisticsNew';
import Financials from './FinancialStatement';
import CompanyDetail from './CompanyDetail/CompanyDetail';
import { TYPE } from './Constants';
import Synopsis from './Synopsis/Synopsis';
import { getCompanyProfileQuote } from '../../api/Symbol';
import Chart from './Chart/Chart';
import OptionAnalysis from './OptionAnalysis/OptionAnalysis';
import Valuation from './Valuation/Valuation';
import SECFilling from './SECFilling/SECFilling';
import TechnicalAnalysis from './TechnicalAnalysis/TechnicalAnalysis';
import RelativeValuation from './RelativeValuation'
import ComparativeValuation from './ComparativeValuation';

const SymbolDetails = () => {
  const [companyData, setCompanyData] = useState(null)
  const [loading, setLoading] = useState(false)
  const { symbol } = useParams()
  const { tab } = useParams();
  const checkActiveTab = Object.keys(TYPE).filter((data) => TYPE[data].value === tab)
  const [activeTab, setActiveTab] = useState(tab === undefined ? TYPE.synopsis.value : TYPE[checkActiveTab].value);
  const navigate = useNavigate();

  useEffect(() => {
    if (symbol) {
      getCompanyDetails()
    }
  }, [symbol])

  const getCompanyDetails = async () => {
    try {
      setLoading(true)
      const data = await getCompanyProfileQuote({ symbol: symbol })

      if (data && data.status == 200 && data.data) {
        setCompanyData(data.data)
      }
    } catch (error) {
      setCompanyData(null)
    }

    setLoading(false)
  }

  useEffect(() => {
    if(tab === undefined){
      navigate(TYPE.synopsis.value)
    }
  },[])

  const handleTabChange = (value) => {
    setActiveTab(value)
  }

  return (
    <>
      {/* main page content start */}
      <div className='main'>
        <section className='company_details symfinstatcs company_detail_fix'>
          <div className='container'>
            <div className='row'>
              <CompanyDetail data={companyData} />
              <div className='col-lg-12'>
                <ul
                  className='nav nav-tabs page_main_tab'
                  id='myTab'
                  role='tablist'
                >
                  {Object.keys(TYPE).map((key, index) => {
                    return (
                      <li className='nav-item' role='presentation'>
                        <button
                          onClick={() => {setActiveTab(TYPE[key].value);navigate(TYPE[key].value)}}
                          className={`nav-link ${
                            activeTab === TYPE[key].value ? 'active' : ''
                          }`}
                          type='button'
                        >
                          {TYPE[key].label}
                        </button>
                      </li>
                    )
                  })}
                </ul>
                <div className='tab-content' id='myTabContent'>
                  <div className='tab-pane fade show active'>
                    {activeTab === TYPE.synopsis.value && (
                      <Synopsis onChangeTab={handleTabChange} />
                    )}

                    {activeTab === TYPE.financialStatistics.value && (
                      <FinancialStatistics />
                    )}

                    {activeTab === TYPE.financialStatements.value && (
                      <Financials />
                    )}

                    {activeTab === TYPE.chart.value && <Chart />}

                    {activeTab === TYPE.optionAnalysis.value && (
                      <OptionAnalysis />
                    )}

                    {activeTab === TYPE.dcfValuation.value && <Valuation />}

                    {activeTab === TYPE.secFilings.value && <SECFilling />}

                    {activeTab === TYPE.technicalAnalysis.value && (
                      <TechnicalAnalysis />
                    )}

                    {activeTab === TYPE.relativeValuation.value && (
                      <RelativeValuation />
                    )}
                    {activeTab === TYPE.comparativeValuation.value && (
                      <ComparativeValuation />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* main page content end */}
    </>
  )
}

export default SymbolDetails;
