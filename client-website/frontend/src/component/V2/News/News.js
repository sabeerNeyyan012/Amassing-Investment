import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import GeneralNews from './GeneralNews'
import StockMarketNews from './StockMarketNews'

const News = () => {
  const TYPE = {
    stockMarketNews: { label: 'Stock Market', value: 'STOCK_MARKET' },
    generalNews: { label: 'General', value: 'GENERAL' },
  }

  const navigate = useNavigate();
  const { tab } = useParams();
  const checkActiveTab = Object.keys(TYPE).filter((data) => TYPE[data].value === tab)
  const [activeTab, setActiveTab] = useState(tab === undefined ? TYPE.stockMarketNews.value : TYPE[checkActiveTab]?.value);

  useEffect(() => {
    if(tab === undefined){
      navigate(TYPE.stockMarketNews.value)
    }
  },[])

  return (
    <div className='main'>
      <section className='company_details symfinstatcs company_detail_fix'>
        <div className='container'>
          <div className='mt-2 mb-2 d-flex justify-content-between align-items-center'>
            <h4>News</h4>

            <div className='top_button_panel v2 auto mt-4 mb-3'>
              {Object.keys(TYPE).map((key, index) => {
                return (
                  <button
                    key={index}
                    type='button'
                    onClick={() => {setActiveTab(TYPE[key].value);navigate(TYPE[key].value)}}
                    className={`btn ${
                      activeTab === TYPE[key].value ? 'btn-info' : 'btn-light'
                    }`}
                  >
                    {TYPE[key].label}
                  </button>
                )
              })}
            </div>
          </div>

          {activeTab && activeTab === TYPE.generalNews.value && <GeneralNews />}
          {activeTab && activeTab === TYPE.stockMarketNews.value && (
            <StockMarketNews />
          )}
        </div>
      </section>
    </div>
  )
}

export default News
