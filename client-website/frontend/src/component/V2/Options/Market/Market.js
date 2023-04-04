import React, { useState, useEffect } from 'react';
import MostActiveOptions from './MostActiveOptions/MostActiveOptions';
import HighestImpliedVolatility from './HighestImpliedVolatility/HighestImpliedVolatility';
import Exploding from './Exploding/Exploding';
import Imploding from './Imploding/Imploding';
import OptionVolumeGainers from './OptionVolumeGainers/OptionVolumeGainers';
import OptionVolumeLoosers from './OptionVolumeLoosers/OptionVolumeLoosers';
import OptionOpenInterestGainers from './OptionOpenInterestGainers/OptionOpenInterestGainers';
import OptionOpenInterestLosers from './OptionOpenInterestLosers/OptionOpenInterestLosers';
import RightSideSection from './RightSideSection/RightSideSection';
import { getDefaultMarketOption } from '../../../api/OptionMarket'
import { getOneDayBeforeDate } from '../../../Common/CommonFunctions';
import InvexLoader from '../../../Common/InvexLoader';
import { useNavigate, useParams} from 'react-router-dom';

const Market = () => {
  const TYPE = {
    mostActiveOptions: {
      label: 'Most Active Options',
      value: 'MOST_ACTIVE_OPTIONS',
    },
    highestImpliedVolatility: {
      label: 'Highest Implied Volatility',
      value: 'HIGHEST_IMPLIED_VOLATILITY',
    },
    explodingIV: {
      label: 'Exploding IV',
      value: 'EXPLODING_IV',
    },
    implodingIV: {
      label: 'Imploding IV',
      value: 'IMPLODING_IV',
    },
    optionVolumeGainers: {
      label: 'Option Volume Gainers',
      value: 'OPTION_VOLUME_GAINERS',
    },
    optionVolumeLosers: {
      label: 'Option Volume Losers',
      value: 'OPTION_VOLUME_LOSERS',
    },
    optionOpenInterestGainers: {
      label: 'Option Open Interest Gainers',
      value: 'OPTION_OPEN_INTEREST_GAINERS',
    },
    optionOpenInterestLosers: {
      label: 'Option Open Interest Losers',
      value: 'OPTION_OPEN_INTEREST_LOSERS',
    },
  };

  const { id } = useParams();
  const checkActiveTab = Object.keys(TYPE).filter((data) => TYPE[data].value === id)
  // useEffect(() => {
  //   if(id === undefined){
  //     navigate(TYPE.mostActiveOptions.value)
  //   }
  // },[])
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(id === undefined ? TYPE.mostActiveOptions.value : TYPE[checkActiveTab].value);
  const [symbols, setSymbols] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const currentDate = getOneDayBeforeDate();
      const obj = { date: currentDate };
      const data = await getDefaultMarketOption(obj);
      setData(data);
      setSymbols(makeSymbols(data?.mao?.Symbol));
      if(id === undefined){
        navigate(`MARKET/${TYPE.mostActiveOptions.value}`)
      }
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (activeTab) {
      switch (activeTab) {
        case TYPE.mostActiveOptions.value:
          setSymbols(makeSymbols(data?.mao?.Symbol));
          break;

        case TYPE.highestImpliedVolatility.value:
          setSymbols(makeSymbols(data?.hiv?.Symbol));
          break;

        case TYPE.explodingIV.value:
          setSymbols(makeSymbols(data?.ei?.Symbol));
          break;

        case TYPE.implodingIV.value:
          setSymbols(makeSymbols(data?.ii?.Symbol));
          break;

        case TYPE.optionVolumeGainers.value:
          setSymbols(makeSymbols(data?.ovg?.Symbol));
          break;

        case TYPE.optionVolumeLosers.value:
          setSymbols(makeSymbols(data?.ovl?.Symbol));
          break;

        case TYPE.optionOpenInterestGainers.value:
          setSymbols(makeSymbols(data?.ooig?.Symbol));
          break;

        case TYPE.optionOpenInterestLosers.value:
          setSymbols(makeSymbols(data?.ooil?.Symbol));
          break;
        
        default :
        break;
      }
    }
  }, [activeTab]);

  const makeSymbols = (data) => {
    if (data) {
      const temp = Object.keys(data).map((key) => {
        return data[key];
      });
      return temp.toString();
    } else {
      return '';
    }
  };

  return (
    <>
      <div className='col-lg-12'>
        <div className='d-flex align-items-center justify-content-between mt-5'>
          <h4 className='me-auto mb-0'>Market</h4>
        </div>
      </div>

      {isLoading && <InvexLoader height='450px' />}

      {!isLoading && (
        <>
          <div className='col-lg-12'>
            <div className='top_button_panel v2 mt-4 mb-3'>
              {Object.keys(TYPE).map((key, index) => {
                return (
                  <button
                    key={index}
                    type='button'
                    onClick={() => {setActiveTab(TYPE[key].value);navigate(`MARKET/${TYPE[key].value}`)}}
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
          <div class='row'>
            <div class='col-lg-8'>
              {TYPE.mostActiveOptions.value === activeTab && (
                <MostActiveOptions values={data.mao} />
              )}

              {TYPE.highestImpliedVolatility.value === activeTab && (
                <HighestImpliedVolatility values={data.hiv} />
              )}
              {TYPE.explodingIV.value === activeTab && (
                <Exploding values={data.ei} />
              )}
              {TYPE.implodingIV.value === activeTab && (
                <Imploding values={data.ii} />
              )}
              {TYPE.optionVolumeGainers.value === activeTab && (
                <OptionVolumeGainers values={data.ovg} />
              )}
              {TYPE.optionVolumeLosers.value === activeTab && (
                <OptionVolumeLoosers values={data.ovl} />
              )}
              {TYPE.optionOpenInterestGainers.value === activeTab && (
                <OptionOpenInterestGainers values={data.ooig} />
              )}
              {TYPE.optionOpenInterestLosers.value === activeTab && (
                <OptionOpenInterestLosers values={data.ooil} />
              )}
            </div>
            <div class='col-lg-4'>
              <RightSideSection symbols={symbols} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Market;
