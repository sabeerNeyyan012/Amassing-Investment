import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import OptionsChain from './OptionChain/OptionChain';
import Quote from './Quote/Quote';

const OptionAnalysis = () => {
  const { subId } = useParams();
  const navigate = useNavigate();
  const ACTIVE_TABS = [
    { label: 'Quote', value: 'QUOTE' },
    { label: 'Option Chain', value: 'OPTION_CHAIN' },
  ];

  
  const checkActiveTab = ACTIVE_TABS.filter((data) => data.value === subId)
  const [activeTab, setActiveTab] = useState(subId === undefined ? ACTIVE_TABS[0].value : checkActiveTab[0]?.value);

  useEffect(() => {
    navigate(`OPTION_ANALYSIS/${ACTIVE_TABS[0].value}`)
  },[])
  return (
    <>
      <div className='col-lg-12'>
        <div className='d-flex align-items-center justify-content-between mt-5'>
          <h4 className='me-auto mb-0'>Option Analysis</h4>
        </div>
      </div>
      <div className='col-lg-12'>
        <div className='top_button_panel v2 mt-4 mb-3'>
          {ACTIVE_TABS.map((tab, index) => {
            return (
              <button
                key={index}
                type='button'
                className={`btn ${
                  tab.value === activeTab ? 'btn-info' : 'btn-light'
                }`}
                onClick={() => {
                  setActiveTab(tab.value);
                  navigate(`OPTION_ANALYSIS/${tab.value}`)
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === ACTIVE_TABS[0].value && <Quote />}
      {activeTab === ACTIVE_TABS[1].value && <OptionsChain />}
    </>
  );
};

export default OptionAnalysis;
