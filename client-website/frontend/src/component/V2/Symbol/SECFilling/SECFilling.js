import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSecFillings } from '../../../api/Symbol';
import InvexLoader from '../../../Common/InvexLoader';

const SECFilling = () => {
  const PAGE_NUMBER = 0;
  const { symbol } = useParams();
  const [secData, setSecData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    symbol: symbol,
    page: PAGE_NUMBER,
  });
  const [formType, setFormType] = useState(null);

  const INIT_PARAM = {
    symbol: symbol,
  };

  const TABLE_HEADINGS = ['Form Type', 'Filling Date', 'Accepted Date', 'Link'];

  useEffect(() => {
    if (symbol) {
      getFormType();
    }
  }, []);

  useEffect(() => {
    if (symbol) {
      getSecData();
    }
  }, [symbol, params]);

  const getSecData = async () => {
    try {
      setLoading(true);

      const data = await getSecFillings(params);
      if (data && data.status === 200 && data.data && data.data.length > 0) {
        setSecData(data.data);
      }
      setLoading(false);
    } catch (e) {
      setSecData(null);
      setLoading(false);
    }
  };

  const getFormType = async () => {
    const data = await getSecFillings(INIT_PARAM);
    if (data && data.status === 200 && data.data && data.data.length > 0) {
      const uniqueType = [...new Set(data?.data.map((item) => item.type))];
      setFormType(uniqueType);
    }
  };

  const handleFormChange = (value) => {
    if (value === 'ALL') {
      setParams({
        page: PAGE_NUMBER,
        symbol: symbol,
      });
    } else {
      setParams({
        ...params,
        type: value,
      });
    }
  };

  return (
    <>
      {loading && <InvexLoader height='450px' />}
      {!loading && secData && (
        <>
          <div className='col-lg-12 mt-5'>
            <div className='d-flex justify-content-between mb-5 mt-3'>
              <div className='d-flex align-items-center'>
                <h3 className='d-inline-block m-0 ms-3'>SEC Fillings</h3>
              </div>

              <div className='d-lg-inline-flex d-md-flex align-items-center float-start'>
                <label className='me-3 font-bd'>Show</label>
                <select
                  className='form-select me-3'
                  aria-label='Default select example'
                  onChange={(e) => {
                    handleFormChange(e.target.value);
                  }}
                >
                  <option value='ALL'>All Forms</option>
                  {formType &&
                    formType.map((type, index) => {
                      return (
                        <option
                          key={index}
                          value={type}
                          selected={type === params?.type}
                        >
                          {type}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          </div>

          <div className='col-lg-12'>
            <div className='top_competitors'>
              <div className='mb-5'>
                <div className='table-responsive'>
                  <>
                    <table className='table table-bordered table-striped m-0 most_tables normal_table'>
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
                        {secData.map((row, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <a href={row?.finalLink} target='_blank'>
                                  {row?.type}
                                </a>
                              </td>
                              <td>{row?.fillingDate}</td>
                              <td>{row?.acceptedDate}</td>
                              <td>
                                <a href={row?.link} target='_blank'>
                                  Click Here{'  '}
                                  <i class='bi bi-box-arrow-up-right'></i>
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>

                    <div className='float-end mt-4 mb-2 me-lg-1'>
                      {params.page > 0 && (
                        <button
                          className='btn btn-light'
                          onClick={() => {
                            setParams((prevState) => {
                              return { ...prevState, page: prevState.page - 1 };
                            });
                          }}
                        >
                          Prev
                        </button>
                      )}
                      <button
                        className='btn btn-light ms-5'
                        onClick={() => {
                          setParams((prevState) => {
                            return { ...prevState, page: prevState.page + 1 };
                          });
                        }}
                      >
                        Next
                      </button>
                    </div>
                  </>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SECFilling;
