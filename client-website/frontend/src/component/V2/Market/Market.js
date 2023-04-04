import React, { useState, useEffect } from 'react'
import InvexLoader from '../../Common/InvexLoader'
import RightSideSection from '../Options/Market/RightSideSection/RightSideSection'
import MostActiveStocks from './MostActiveStocks'
import MarketGainers from './MarketGainers'
import MarketLosers from './MarketLosers'
import EarningsCalender from './EarningsCalender'
import InvexRoutes from '../../../InvexRoutes'
import { Link, useNavigate, useParams } from 'react-router-dom'

const Market = () => {
  const TYPE = {
    mostActiveStocks: {
      label: 'Most Active Stocks',
      value: 'MOST_ACTIVE_STOCKS',
      disabled: false,
    },
    marketGainers: {
      label: 'Market Gainers',
      value: 'MARKET_GAINERS',
      disabled: false,
    },
    marketLosers: {
      label: 'Market Losers',
      value: 'MARKET_LOSERS',
      disabled: false,
    },
    topUnderValuedStocks: {
      label: 'Top Under Valued Stocks',
      value: 'TOP_UNDER_VALUED_STOCKS',
      disabled: true,
    },
    topOverValuedStocks: {
      label: 'Top Over Valued Stocks',
      value: 'TOP_OVER_VALUED_STOCKS',
      disabled: true,
    },
  }

  const { id } = useParams();
  const checkActiveTab = Object.keys(TYPE).filter((data) => TYPE[data].value === id)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState(id === undefined ? TYPE.mostActiveStocks.value : TYPE[checkActiveTab].value)
  const navigate = useNavigate();
  useEffect(() => {
    if(id === undefined){
      navigate(TYPE.mostActiveStocks.value)
    }
  },[])

  return (
    <>
      <div className='main'>
        <section className='company_details symfinstatcs company_detail_fix'>
          <div className='container'>
            <div className='mt-2 mb-2'>
              <h4 className='me-auto mb-0'>Market</h4>
            </div>

            {isLoading && <InvexLoader height='450px' />}

            {!isLoading && (
              <>
                <div class='row'>
                  <div class='col-lg-8'>
                    <div className='top_button_panel v2 mb-3'>
                      {Object.keys(TYPE).map((key, index) => {
                        return (
                          <button
                            disabled={TYPE[key].disabled}
                            key={index}
                            type='button'
                            onClick={() => {setActiveTab(TYPE[key].value);navigate(TYPE[key].value)}}
                            className={`btn ${
                              activeTab === TYPE[key].value
                                ? 'btn-info'
                                : 'btn-light'
                            }`}
                          >
                            {TYPE[key].label}
                          </button>
                        )
                      })}
                    </div>
                    {TYPE.mostActiveStocks.value === activeTab && (
                      <MostActiveStocks />
                    )}
                    {TYPE.marketGainers.value === activeTab && (
                      <MarketGainers />
                    )}
                    {TYPE.marketLosers.value === activeTab && <MarketLosers />}
                  </div>
                  <div class='col-lg-4'>
                    <div className='market-news-container d-flex justify-content-between align-items-center'>
                      <p className=''>Market News</p>
                      <Link to={InvexRoutes.News.path}>View More</Link>
                    </div>
                    <RightSideSection symbols={''} />
                  </div>
                </div>

                <EarningsCalender />
              </>
            )}
          </div>
        </section>
      </div>
    </>
  )
}

export default Market
