import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getStockDividend,
  getCompanyProfileQuote,
  getEarnings,
} from '../../../../api/Symbol';
import { convertDateFormat } from '../../../../Common/DateFunctions';
import { DATE_FORMAT } from '../../../../Common/Constants';
import CompanyDetail from '../../CompanyDetail/CompanyDetail';
import InvexRoutes from '../../../../../InvexRoutes';
import ArrowLeft from '../../../../Common/Images/arrow-left.svg';
import InvexLoader from '../../../../Common/InvexLoader';

const Earnings = () => {
  const [earningsData, setEarningsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [companyData, setCompanyData] = useState(null);

  const { symbol } = useParams();
  const navigate = useNavigate();

  const TABLE_HEADINGS = [
    'Date',
    'Estimated Earning',
    'Actual Earning',
    'Deviation',
  ];

  useEffect(() => {
    if (symbol) {
      getEarningsData();
      getCompanyDetails();
    }
  }, [symbol]);

  const getEarningsData = async () => {
    setLoading(true);
    const data = await getEarnings({ symbol: symbol });
    if (data && data.status === 200 && data.data && data.data) {
      const temp = data.data.map((row) => {
        row.deviation = (
          ((row?.actualEarningResult - row?.estimatedEarning) /
            row?.estimatedEarning) *
          100
        ).toFixed(2);
        return row;
      });
      setEarningsData(temp);
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
                      <h3 className='d-inline-block m-0 ms-3'>Earnings</h3>
                    </div>
                    <div>
                      <a href='#' className='btn btn-outline-dark ms-4 px-4'>
                        Export
                      </a>
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
                            {earningsData &&
                              earningsData.map((earning, index) => {
                                return (
                                  <tr key={index}>
                                    <td>
                                      {convertDateFormat(
                                        earning?.date,
                                        DATE_FORMAT[2]
                                      )}
                                    </td>
                                    <td>
                                      {earning?.estimatedEarning
                                        ? `$${earning?.estimatedEarning.toFixed(
                                            2
                                          )}`
                                        : '-'}
                                    </td>
                                    <td>
                                      {earning?.actualEarningResult
                                        ? `$${earning?.actualEarningResult.toFixed(
                                            2
                                          )}`
                                        : '-'}
                                    </td>
                                    <td
                                      className={`${
                                        earning?.deviation >= 0
                                          ? 'up-color'
                                          : 'down-color'
                                      }`}
                                    >
                                      {earning?.deviation
                                        ? `${
                                            earning?.deviation > 0
                                              ? `+${earning?.deviation}%`
                                              : `${earning?.deviation}%`
                                          }`
                                        : '-'}
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

export default Earnings;
