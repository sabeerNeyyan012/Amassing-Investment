import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Market from './Market/Market';
import TradingIdeas from './TradingIdeas/TradingIdeas';

const Options = () => {
  const ACTIVE_TABS = [
    { label: 'Market', value: 'MARKET' },
    { label: 'Trading Ideas', value: 'TRADING_IDEAS' },
  ];
  const navigate = useNavigate();
  const { tab } = useParams();
  const checkActiveTab = ACTIVE_TABS.filter((data) => data.value === tab)
  const [activeTab, setActiveTab] = useState(tab === undefined ? ACTIVE_TABS[0].value : checkActiveTab[0].value);

  useEffect(() => {
    if(tab === undefined){
      navigate(ACTIVE_TABS[0].value)
    }
  },[])

  return (
    <>
      <div className='main'>
        <section className='company_details symfinstatcs company_detail_fix'>
          <div className='container'>
            <div className='mt-2 mb-2'>
              <h4>Options</h4>
            </div>

            <div className='col-lg-12'>
              <div className='top_button_panel v2 mt-3 mb-3'>
                {ACTIVE_TABS.map((tab, index) => {
                  return (
                    <button
                      key={index}
                      type='button'
                      className={`btn ${
                        tab.value === activeTab ? 'btn-info' : 'btn-light'
                      }`}
                      onClick={() => {
                        setActiveTab(tab.value);navigate(tab.value)
                      }}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {activeTab === ACTIVE_TABS[0].value && <Market />}

            {activeTab === ACTIVE_TABS[1].value && <TradingIdeas />}
          </div>
        </section>
      </div>
    </>
  );
};

export default Options;
