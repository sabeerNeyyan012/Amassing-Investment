import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getStockDividend,
  getCompanyProfileQuote,
} from '../../../../api/Symbol';
import { convertDateFormat } from '../../../../Common/DateFunctions';
import { DATE_FORMAT } from '../../../../Common/Constants';
import CompanyDetail from '../../CompanyDetail/CompanyDetail';
import InvexRoutes from '../../../../../InvexRoutes';
import ArrowLeft from '../../../../Common/Images/arrow-left.svg';
import InvexLoader from '../../../../Common/InvexLoader';

const Dividents = () => {
  const [dividentData, setDividentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [companyData, setCompanyData] = useState(null);

  const { symbol } = useParams();
  const navigate = useNavigate();

  const TABLE_HEADINGS = [
    'Ex-Divident Date',
    'Cash Amount',
    'Record Date',
    'Pay Date',
    'Declaration Date',
  ];

  useEffect(() => {
    if (symbol) {
      getDividentData();
      getCompanyDetails();
    }
  }, [symbol]);

  const getDividentData = async () => {
    setLoading(true);
    const data = await getStockDividend({ symbol: symbol });
    if (data && data.status === 200 && data.data && data.data.historical) {
      setDividentData(data.data.historical);
    }
    setLoading(false);
  };

  const getCompanyDetails = async () => {
    setLoading(true);
    const data = await getCompanyProfileQuote({ symbol: symbol });

    if (data && data.status == 200 && data.data) {
      setCompanyData(data.data);
    }
    setLoading(false);
  };

  return (
    <>
      {loading && <InvexLoader height='450px' />}

      {/* mainpage content start */}
      {!loading && (
        <div className='main'>
          <section className='company_details symfinstatcs'>
            <div className='container'>
              <div className='row'>
                <CompanyDetail data={companyData} />
                <div className='col-lg-12'>
                  <div className='d-flex justify-content-between mb-5 mt-3'>
                    <div className='d-flex align-items-center'>
                      <img
                        style={{ cursor: 'pointer' }}
                        src={ArrowLeft}
                        className='img-fluid'
                        alt='arrow'
                        onClick={() => {
                          navigate(
                            InvexRoutes.Symbol.path.replace(':symbol', symbol)
                          );
                        }}
                      />
                      <h3 className='d-inline-block m-0 ms-3'>Dividents</h3>
                    </div>
                    <div>
                      <a href='#' className='btn btn-outline-dark ms-4 px-4'>
                        Export
                      </a>
                    </div>
                  </div>
                </div>
                <div className='col-lg-12'>
                  <div className='mt-4 mb-4'>
                    <div className='row border-bottom mb-3'>
                      <div className='col-lg-4 col-md-3'>
                        <div className='title-lt'>Divident Yield</div>
                        <span className='down'>
                          <b>-</b>
                        </span>
                      </div>
                      <div className='col-lg-4 col-md-3'>
                        <div className='title-lt'>Annual Dividend</div>
                        <span>
                          <b>-</b>
                        </span>
                      </div>
                      <div className='col-lg-4 col-md-3'>
                        <div className='title-lt'>Ex-Dividend Date</div>
                        <span>
                          <b>
                            {dividentData &&
                            dividentData[0] &&
                            dividentData[0].date
                              ? convertDateFormat(
                                  dividentData &&
                                    dividentData[0] &&
                                    dividentData[0].date,
                                  DATE_FORMAT[2]
                                )
                              : '-'}
                          </b>
                        </span>
                      </div>
                    </div>
                    <div className='row mb-3'>
                      <div className='col-lg-4 col-md-3'>
                        <div className='title-lt'>Payout Frequency</div>
                        <span>
                          <b>-</b>
                        </span>
                      </div>
                      <div className='col-lg-4 col-md-3'>
                        <div className='title-lt'>Payout Ratio</div>
                        <span>
                          <b>-</b>
                        </span>
                      </div>
                      <div className='col-lg-4 col-md-3'>
                        <div className='title-lt '>Dividend Growth</div>
                        <span className='up'>
                          <b>-</b>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-12'>
                  <div className='top_competitors'>
                    <div className='mb-5'>
                      <div className='table-responsive'>
                        <table className='table table-bordered table-striped m-0 most_tables'>
                          <thead className='table-light'>
                            <tr>
                              {TABLE_HEADINGS.map((heading, index) => {
                                return (
                                  <th key={index} scope='col'>
                                    {heading}
                                  </th>
                                );
                              })}
                            </tr>
                          </thead>
                          <tbody className='border-top-0'>
                            {dividentData &&
                              dividentData.map((dividend, index) => {
                                return (
                                  <tr key={index}>
                                    <td>
                                      {convertDateFormat(
                                        dividend?.date,
                                        DATE_FORMAT[2]
                                      )}
                                    </td>
                                    <td>
                                      {dividend?.dividend
                                        ? `$${dividend?.dividend.toFixed(2)}`
                                        : '-'}
                                    </td>
                                    <td>
                                      {convertDateFormat(
                                        dividend?.recordDate,
                                        DATE_FORMAT[2]
                                      )}
                                    </td>
                                    <td>
                                      {convertDateFormat(
                                        dividend?.paymentDate,
                                        DATE_FORMAT[2]
                                      )}
                                    </td>
                                    <td>
                                      {convertDateFormat(
                                        dividend?.declarationDate,
                                        DATE_FORMAT[2]
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
      {/* mainpage content end */}
    </>
  );
};

export default Dividents;
