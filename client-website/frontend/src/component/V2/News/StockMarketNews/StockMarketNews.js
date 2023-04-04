import React, { useState, useEffect } from 'react'
import { getStockMarketNews } from '../../../api/V2/newsApi'
import { DATE_FORMAT } from '../../../Common/Constants'
import { convertDateFormat } from '../../../Common/DateFunctions'
import InvexLoader from '../../../Common/InvexLoader'

const StockMarketNews = () => {
  const [newsData, setNewsData] = useState(null)
  const [loading, setLoading] = useState(null)
  const [pageNumber, setPageNumber] = useState(0)

  useEffect(() => {
    getNews()
  }, [pageNumber])

  const getNews = async () => {
    try {
      setLoading(true)
      const resp = await getStockMarketNews({ page: pageNumber })
      if (resp && resp.status === 200 && resp?.data) {
        setNewsData(resp?.data)
      }
    } catch {
      setNewsData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading && <InvexLoader height='450px' />}
      {!loading && (
        <>
          <div className='col-lg-12'>
            <div className='market_news mb-5'>
              <div className='row'>
                {newsData &&
                  newsData.map((news, index) => {
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
                                {news?.symbol}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-12'>
              {newsData && (
                <div className='float-end mb-5 me-lg-1'>
                  {pageNumber > 0 && (
                    <button
                      className='btn btn-light'
                      onClick={() => {
                        setPageNumber((prevState) => {
                          return prevState - 1
                        })
                      }}
                    >
                      Prev
                    </button>
                  )}
                  {pageNumber < 4 && (
                    <button
                      className='btn btn-light ms-5'
                      onClick={() => {
                        setPageNumber((prevState) => {
                          return prevState + 1
                        })
                      }}
                    >
                      Next
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default StockMarketNews
