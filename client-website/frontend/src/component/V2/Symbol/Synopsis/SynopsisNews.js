import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import InvexRoutes from '../../../../InvexRoutes'
import { getSynopsisCompanyNews } from '../../../api/Symbol';
import { DATE_FORMAT } from '../../../Common/Constants'
import { convertDateFormat } from '../../../Common/DateFunctions'
import InvexLoader from '../../../Common/InvexLoader';

const SynopsisNews = ({ symbolSpecific = true }) => {
  const { symbol } = useParams()
  const [newsData, setNewsData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // if (symbol) {
    getNewsData()
    // }
  }, [symbol])

  const getNewsData = async () => {
    setIsLoading(true)
    let param = {
      symbol: symbolSpecific ? symbol : '',
    }
    const data = await getSynopsisCompanyNews(param)
    if (data && data?.status === 200 && data?.data) {
      const tempNews = symbolSpecific ? data?.data.slice(0, 15) : data?.data
      setNewsData(data?.data)
    }
    setIsLoading(false)
  }

  return (
    <>
      {isLoading && <InvexLoader height='450px' />}
      {!isLoading && (
        <div className='col-lg-12'>
          <div className='market_news mb-5'>
            {symbolSpecific && (
              <div className='d-flex align-items-center justify-content-between'>
                <h5 className='m-0'>
                  <strong>Company News</strong>
                </h5>
                <Link to={InvexRoutes.News.path} className='text-dark viewmore'>
                  View More
                </Link>
              </div>
            )}
            <div className='row'>
              {newsData &&
                newsData.slice(0, 15).map((news, index) => {
                  return (
                    <div className='col-lg-4' key={index}>
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
                          <a
                            href={news?.url}
                            target='_blank'
                            className='text-dark'
                          >
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
                            <span className='news_symbol'>
                              <Link
                                to={InvexRoutes.Symbol.path.replace(
                                  ':symbol',
                                  symbol
                                )}
                              >
                                {news?.symbol}
                              </Link>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}

              {(!newsData ||
                (Array.isArray(newsData) && newsData.length === 0)) && (
                <div className='d-flex justify-content-center align-items-center'>
                  <h6>No Data Available</h6>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SynopsisNews;
