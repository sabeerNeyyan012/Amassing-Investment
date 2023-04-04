import React, { useEffect, useState } from 'react';
import { getSynopsisCompanyNews } from '../../../../api/Symbol';
import { DATE_FORMAT } from '../../../../Common/Constants'
import { convertDateFormat } from '../../../../Common/DateFunctions'
import InvexLoader from '../../../../Common/InvexLoader';

const RightSideSection = (symbols) => {
  const [newsData, setNewsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getNewsData();
  }, [symbols]);

  const getNewsData = async () => {
    setIsLoading(true);
    const data = await getSynopsisCompanyNews({ symbol: symbols.symbols });
    if (data && data?.status === 200 && data?.data) {
      setNewsData(data?.data);
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <InvexLoader height='450px' />}

      {!isLoading && (
        <div className='row fixed-height-scroll-news'>
          {newsData &&
            newsData.map((news, index) => {
              return (
                <div className='col-lg-12' key={index}>
                  <div className='news_block mt-3 mb-3'>
                    <div className='news_img'>
                      <a href={news?.url} target='_blank'>
                        <img
                          src={news?.image}
                          className='img-fluid'
                          alt='news_image'
                        />
                      </a>
                    </div>
                    <div className='news_content news_title_container'>
                      <a href={news?.url} target='_blank' className='text-dark'>
                        <h5>{news?.title}</h5>
                      </a>
                      <span>
                        {convertDateFormat(
                          news?.publishedDate,
                          DATE_FORMAT[5],
                          false
                        )}
                      </span>
                      <div className='d-flex align-items-center justify-content-between'>
                        <a
                          href={news?.url}
                          target='_blank'
                          className='text-primary'
                        >
                          {news?.site}
                        </a>
                        <span className='news_symbol'>{news?.symbol}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      )}
    </>
  );
};

export default RightSideSection;
