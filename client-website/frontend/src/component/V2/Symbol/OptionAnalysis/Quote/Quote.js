import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getVolatality } from '../../../../api/Option';
import { getNDayBeforeDate } from '../../../../Common/CommonFunctions';
import VolatilityIndex from './VolatilityIndex/VolatilityIndex';
import VolatilityChart from './VolatilityChart/VolatilityChart';
import OptionVolumeChart from '../OptionVolumeChart/OptionVolumeChart';
import { CircularProgress } from '@material-ui/core';
import Volatility from './Volatility/Volatility';
import InvexLoader from '../../../../Common/InvexLoader';

const Quote = () => {
  const { symbol } = useParams();
  const [quoteData, setQuoteData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (symbol) {
      getQuoteData();
    }
  }, [symbol]);

  const getQuoteData = async () => {
    let i = 1;
    setLoading(true);
    do {
      if (quoteData) {
        setQuoteData(null);
      }
      try {
        const tempDate = getNDayBeforeDate(i);
        var volatility = await getVolatality(symbol, tempDate);
        if (volatility) {
          setQuoteData(volatility);
          setLoading(false);
          break;
        }
      } catch (error) {
        setQuoteData(null);
        i++;
      }
    } while (i <= 15 && !quoteData);
  };

  return (
    <>
      {loading && <InvexLoader height='450px' />}

      {!loading && quoteData && (
        <>
          <Volatility data={quoteData} />

          <VolatilityIndex data={quoteData} />

          <VolatilityChart data={quoteData} />

          <OptionVolumeChart data={quoteData} />
        </>
      )}
    </>
  );
};

export default Quote;
