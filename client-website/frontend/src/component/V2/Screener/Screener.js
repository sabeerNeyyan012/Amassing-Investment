import React, { useState, useEffect, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import {
  camelCase,
  convertCamelCaseToSpaceSeparatedString,
  convertCamelCaseToUnderscoreSeparatedString,
  getOneDayBeforeDate,
} from "../../Common/CommonFunctions";
import {
  ALL_SCREENER_FILTERS,
  INIT_PARAM,
  SECTOR_LIST,
  SECTOR_WISE_INDUSTRY,
  BETA,
  CHANGES,
  FULLTIMEEMPLOYEES,
  LASTDIV,
  MKTCAP,
  PRICE,
  VOLAVG,
  NEW_FILTERS_TO_BE_FILTERED,
  INIT_PARAMS,
  IPODATE,
  Currency,
} from "./Constants";
import { getScreenerData, getScreenerFilterRange } from "../../api/ScreenerApi";
import MUIDataTable from "mui-datatables";
import { DATE_FORMAT } from "../../Common/Constants";
import InvexLoader from "../../Common/InvexLoader";
import { Card } from "@material-ui/core";
import { TabPanel, TabView } from "primereact";
import { useNavigate } from "react-router-dom/dist";
import "./screener.css";

const Screener = () => {
  const MIN_RANGE = 0;
  const MAX_RANGE = 1000000;
  const [addScreenerDialogVisible, setAddScreenerDialogVisible] =
    useState(false);
  const [params, setParams] = useState(INIT_PARAM);
  const [loading, setLoading] = useState(false);
  const [screenerData, setScreenerData] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [tableData, setTableData] = useState(null);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [heading, setHeading] = useState([]);
  const [filterRangeValues, setFilterRangeValues] = useState(null);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [display, setDisplay] = useState(true);
  const [industryList, setIndustryList] = useState([]);
  const [country, setCountry] = useState(Currency?.USD?.country);
  const [exchange, setExchange] = useState(Currency?.USD?.exchange);
  const [dataFilter, setDataFilter] = useState();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(INIT_PARAMS);

  useEffect(() => {
    getFilterRange();
  }, []);

  const OPTIONS = {
    rowsPerPage: 10,
    rowsPerPageOptions: [5, 10, 25, 50, 100],
    filter: false,
    selectableRows: false,
    onCellClick: (rowData, columnId, e) => {
      if (columnId?.colIndex === 1) {
        navigate(`/symbol/${rowData}`);
      }
    },
  };

  useEffect(() => {
    //returns true if any filter is applied else return false
    const flag = Object.values(params).some((value) => value !== "None");
    if (!flag) {
      setLoading(false);
      // setIsFilterApplied(false);
    }
    if (isFilterApplied && flag) {
      getScreener();
    }
  }, [params]);

  useEffect(() => {
    if(typeof(screenerData) === "string"){
    const data = JSON.parse(screenerData?.replaceAll("NaN", null).replaceAll("Infinity", null))
    console.log(data,"ScreenerData");
    }
    if (screenerData && typeof screenerData === "object") {
      if (typeof screenerData?.Price === "object") {
        const tableArr = Object.values(screenerData?.Price).map(
          (val, index) => {
            let i = index;
            if (params.page_number > 1) {
              i = 500 * (params.page_number - 1) + index;
            }

            const newObj = {};
            newObj["symbol"] = screenerData["symbol"][i];
            newObj["companyName"] = screenerData["companyName"][i];

            Object.keys(appliedFilters).map((key) => {
              if (key === "price") {
                newObj[key] = screenerData["Price"][i];
              } else if (key === "beta") {
                newObj[key] = screenerData["Beta"][i];
              } else if (key === "volavg") {
                newObj[key] = screenerData["VolAvg"][i];
              } else if (key === "mktcap") {
                newObj[key] = screenerData["MktCap"][i];
              } else if (key === "lastdiv") {
                newObj[key] = screenerData["LastDiv"][i];
              } else if (key === "changes") {
                newObj[key] = screenerData["Changes"][i];
              } else {
                newObj[key] = screenerData[key][i];
              }
            });

            return newObj;
          }
        );
        setTableData(tableArr);
      } else {
        setTableData([]);
      }
      const tableHeading = getTableHeading();
      setHeading(tableHeading);
    }
  }, [screenerData]);

  const getTableHeading = () => {
    let arr = [
      customRowIndexColumn(),
      {
        name: "symbol",
        label: "Ticker",
        options: { sort: true },
      },
      { name: "companyName", label: "Company Name", options: { sort: true } },
    ];
    Object.keys(appliedFilters).map((key) => {
      arr.push({
        name: key,
        label: convertCamelCaseToSpaceSeparatedString(key),
      });
    });

    return arr;
  };

  const getScreener = async () => {
    try {
      setLoading(true);
      const resp = await getScreenerData({
        ...params,
        curr_date: getOneDayBeforeDate(DATE_FORMAT[5]),
        page_number: 1,
      });
      
      if (typeof(resp) === "string") {
        const tempJSON = JSON.parse(resp?.replaceAll("NaN", null).replaceAll("Infinity", null))
        setScreenerData(tempJSON);
        setTotalPages(tempJSON.total_pages);
      } else {
        setScreenerData(resp);
        setTotalPages(resp.total_pages);
      }
    } catch {
      console.log(screenerData,"CHECK1234");
      setScreenerData(null);
    } finally {
      setLoading(false);
    }
  };

  const getFilterRange = async () => {
    try {
      const data = await getScreenerFilterRange();
      if (typeof data === "string") {
        const tempJSON = JSON.parse(
          data.replaceAll("NaN", null).replaceAll("Infinity", MAX_RANGE)
        );
        setFilterRangeValues(tempJSON);
        setDataFilter(tempJSON);
      } else {
        setFilterRangeValues(data);
        setDataFilter(data);
      }
    } catch {
      setFilterRangeValues(null);
    }
  };

  const handleSectorChange = (sectorName) => {
    if(sectorName !== "Select"){
      const sectorIndustry = SECTOR_WISE_INDUSTRY[sectorName];
      if (sectorIndustry) {
        setIndustryList(sectorIndustry);
      }
    }else{
      setIndustryList([]);
      setAppliedFilters((prevValue) => {
        const tempValue = prevValue;
        delete tempValue["industry"];
        return {
          ...tempValue,
        };
      });
      setIsActive((prevValue) => {
        const value = prevValue;
        value["industry"] = false;
        return {
          ...value,
        };
      });
    }
  };

  const handleDropdownChange = (val, filterName) => {
    if (filterName === "currency") {
      setCountry(Currency[val]?.country);
      setExchange(Currency[val]?.exchange);
    }
    if (filterName === "sector") {
      handleSectorChange(val);
    }
    if (val === "Select") {
      setParams((prevValue) => {
        const tempValue = prevValue;
        tempValue[filterName] = `None`;
        return {
          ...tempValue,
        };
      });
      setAppliedFilters((prevValue) => {
        const tempValue = prevValue;
        delete tempValue[filterName];
        return {
          ...tempValue,
        };
      });
      if(Object.keys(appliedFilters).length === 0){
        setIsFilterApplied(false)
      }
      setIsActive((prevValue) => {
        const value = prevValue;
        value[filterName] = false;
        return {
          ...value,
        };
      });
    } else {
      setIsFilterApplied(true);
      setParams((prevValue) => {
        const tempValue = prevValue;
        tempValue[filterName] = val;
        return {
          ...tempValue,
        };
      });
      setAppliedFilters((prevValue) => {
        const tempValue = prevValue;
        tempValue[filterName] = val;
        return {
          ...tempValue,
        };
      });
      setIsActive((prevValue) => {
        const value = prevValue;
        value[filterName] = true;
        return {
          ...value,
        };
      });
    }
  };

  const handleClearAll = () => {
    setLoading(true);
    setIsFilterApplied(false);
    setTableData(null);
    Object.keys(INIT_PARAM)?.map((newItem) => {
      setParams((prevValue) => {
        prevValue[newItem] = `None`;
        return {
          ...prevValue,
        };
      });
    });
    Object.keys(INIT_PARAMS)?.map((item) => {
      setIsActive((prevValue) => {
        prevValue[item] = false;
        return {
          ...prevValue,
        };
      });
    });
    setLoading(false);
  };

  function customRowIndexColumn() {
    return {
      name: "No",
      options: {
        sort: true,
        filter: true,
        customBodyRender: (value, meta) => {
          return meta.rowIndex + 1;
        },
      },
    };
  }

  const handleHide = () => {
    if (display) {
      setDisplay(false);
    } else {
      setDisplay(true);
    }
  };


  const template = (options) => {
    return (
        <button type="button" onClick={options.onClick} className={options.className} title={options.titleElement?.props?.children}>
            {options.titleElement}
        </button>
    );
};

  return (
    <>
      <div className="main">
        <section className="filterscreener_section index">
          <div className="container">
            <Card>
              <div className="new_scenr_btn">
                <div className="row">
                  <div className="col">
                    <h4>
                      <select
                        value={""}
                        className="btn btn-outline-none bold "
                        style={{ height: "35px" }}
                      >
                        <option value="A">My Screener</option>
                      </select>
                      <span>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a
                          href="#"
                          className="btn"
                          data-bs-toggle="modal"
                          data-bs-target="#savescannermodal"
                          onClick={() => setAddScreenerDialogVisible(true)}
                        >
                          Save
                        </a>
                      </span>
                    </h4>
                  </div>

                  <div
                    className="col"
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <button
                      className="btn btn-outline-dark"
                      style={{
                        height: "35px",
                        backgroundColor: "white",
                        color: "blue",
                      }}
                      onClick={() => handleHide()}
                    >
                      Hide Filters
                    </button>
                  </div>
                </div>
              </div>
              {display ? (
                <div className="row" style={{ background: "#f8f8f8" }}>
                  <div className="col-11">
                    <div style={{ background: "#f8f8f8" }}>
                      <TabView
                        activeIndex={activeTabIndex}
                        onTabChange={(e) => setActiveTabIndex(e.index)}
                        scrollable
                      >
                        {Object.keys(ALL_SCREENER_FILTERS).map((key, index) => {
                          return (
                            <TabPanel
                              header={convertCamelCaseToSpaceSeparatedString(
                                key
                              )}
                              headerTemplate={template}
                              style={{ fontSize: 13 }}
                            >
                              <div
                                className="row"
                                style={{ background: "#f8f8f8" }}
                              >
                                {filterRangeValues &&
                                  ALL_SCREENER_FILTERS[key]
                                    ?.slice(
                                      0,
                                      ALL_SCREENER_FILTERS[key]?.length
                                    )
                                    ?.map((filter) => {
                                      return (
                                        <div
                                          key={filter.value}
                                          className="col-md-4"
                                        >
                                          <div className="row">
                                            <div className="col-md-7">
                                                <span title={filter?.label} style={{display:'flex', alignContent:'center', justifyContent:'flex-start',alignItems:'center'}} className="cursor-pointer blue-color labels ellipsis">
                                                  {filter.label?.length > 20 ? `${filter?.label?.substring(0,20)}...` : filter?.label}
                                               
                                              {filter?.tooltip && (
                                        <i
                                        // style={{fontSize:'13px'}}
                                          className='bi bi-info-circle m-1'
                                          data-toggle='tooltip'
                                          title={filter?.tooltip}
                                        ></i>
                                      )}
                                       </span>
                                            </div>
                                            <div className="col-md-5">
                                              {NEW_FILTERS_TO_BE_FILTERED?.map(
                                                (item) => {
                                                  if (item === filter?.value) {
                                                    return Object.keys(
                                                      dataFilter || {}
                                                    )?.map((data) => {
                                                      const mainData = data;
                                                      return (
                                                        mainData === item &&
                                                        Filters({
                                                          filter,
                                                          industryList,
                                                          isActive,
                                                          dataFilter,
                                                          params,
                                                          handleDropdownChange,
                                                          isFilterApplied,
                                                        })
                                                      );
                                                    });
                                                  }
                                                }
                                              )}{" "}
                                              {filtered({
                                                filter,
                                                params,
                                                dataFilter,
                                                country,
                                                exchange,
                                                industryList,
                                                isActive,
                                                handleDropdownChange,
                                                isFilterApplied,
                                              })}
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                {/* <a
                                  style={{
                                    float: "right",
                                    cursor: "pointer",
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    color: "blue",
                                  }}
                                  onClick={() =>
                                    setShowMore(showMore === null ? key : null)
                                  }
                                >
                                  {showMore === null
                                    ? "View more"
                                    : "View less"}
                                </a> */}
                              </div>
                            </TabPanel>
                          );
                        })}
                      </TabView>
                    </div>
                  </div>
                  <div className="col-1 p-3">
                    <button
                      style={{ alignContent: "center", borderColor: "white" }}
                      onClick={() => handleClearAll()}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              ) : null}
            </Card>
            <div className="filterscreener_area">
              <div className="righttablecontent index">
                <div className="filter_table">
                  {!loading &&
                    isFilterApplied &&
                    tableData &&
                    heading &&
                    heading.length > 3 && (
                      <MUIDataTable
                        data={tableData}
                        columns={heading}
                        options={OPTIONS}
                      />
                      )
                    }
                  {loading && <InvexLoader height="70vh" />}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {addScreenerDialogVisible && (
        <Dialog
          open={addScreenerDialogVisible}
          onClose={() => setAddScreenerDialogVisible(false)}
          fullWidth={true}
          maxWidth="sm"
          sx={{ m: 3, p: 3 }}
        >
          <div className="dialogContent">
            <div className="d-flex justify-content-between align-center">
              <div>
                <b>Save Screener</b>
              </div>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                onClick={() => {
                  setAddScreenerDialogVisible(false);
                }}
              >
                <i class="bi bi-x-lg text-black"></i>
              </a>
            </div>
            <div>
              <span>Screener Name</span>
            </div>
            <input type="text" className="form-control" />

            <button className="btn btn-primary w-100 mt-3">Save</button>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default Screener;

const Filters = (props) => {
  const filter = props?.dataFilter;
  return Object.keys(filter || {})?.map((state, i) => {
    if (props?.filter.value === state) {
      return (
        <select
          className={
            props?.isActive[props?.filter.value] === true
              ? "select form-select me-3"
              : "form-select me-3"
          }
          aria-label="Default select example"
          onChange={(e) => {
            props?.handleDropdownChange(e.target.value, state);
          }}
        >
          <option selected={props?.isFilterApplied === false}>Select</option>
          {Object.entries(filter[state] || {})?.map((option, index) => {
            return (
              <option
                style={{ backgroundColor: "white" }}
                value={option[1]}
                key={index}
                selected={
                  props?.isFilterApplied
                    ? option[1] === props?.params[state]
                    : option[1] === "None"
                }
              >
                {option[0]}
              </option>
            );
          })}
        </select>
      );
    }
  });
};

const filtered = (data) => {
  switch (data?.filter?.value) {
    // Basic Company Facts
    case "price":
      return (
        <select
          className={
            data?.isActive["price"]
              ? "select form-select me-3"
              : "form-select me-3"
          }
          aria-label="Default select example"
          onChange={(e) => {
            data?.handleDropdownChange(e.target.value, "price");
          }}
        >
          <option selected={data?.params?.price === "None"}>Select</option>

          {PRICE.map((option, index) => {
            return (
              <option
                style={{ backgroundColor: "white" }}
                value={option.value}
                key={index}
                selected={
                  data?.isFilterApplied
                    ? option.value === data?.params?.price
                    : option.value === "None"
                }
              >
                {option.label}
              </option>
            );
          })}
        </select>
      );
    case "beta":
      return (
        <select
          className={
            data?.isActive["beta"]
              ? "select form-select me-3"
              : "form-select me-3"
          }
          aria-label="Default select example"
          onChange={(e) => {
            data?.handleDropdownChange(e.target.value, "beta");
          }}
        >
          <option selected={data?.params?.beta === "None"}>Select</option>

          {BETA.map((option, index) => {
            return (
              <option
                style={{ backgroundColor: "white" }}
                value={option.value}
                key={index}
                selected={
                  data?.isFilterApplied
                    ? option.value === data?.params?.beta
                    : option.value === "None"
                }
              >
                {option.label}
              </option>
            );
          })}
        </select>
      );
    case "volavg":
      return (
        <select
          className={
            data?.isActive["volavg"]
              ? "select form-select me-3"
              : "form-select me-3"
          }
          aria-label="Default select example"
          onChange={(e) => {
            data?.handleDropdownChange(e.target.value, "volavg");
          }}
        >
          <option selected={data?.params?.volavg === "None"}>Select</option>

          {VOLAVG.map((option, index) => {
            return (
              <option
                style={{ backgroundColor: "white" }}
                value={option.value}
                key={index}
                selected={
                  data?.isFilterApplied
                    ? option.value === data?.params?.volavg
                    : option.value === "None"
                }
              >
                {option.label}
              </option>
            );
          })}
        </select>
      );
    case "MktCap":
      return (
        <select
          className={
            data?.isActive["mktcap"]
              ? "select form-select me-3"
              : "form-select me-3"
          }
          aria-label="Default select example"
          onChange={(e) => {
            data?.handleDropdownChange(e.target.value, "mktcap");
          }}
        >
          <option selected={data?.params?.mktcap === "None"}>Select</option>

          {MKTCAP.map((option, index) => {
            return (
              <option
                style={{ backgroundColor: "white" }}
                value={option.value}
                key={index}
                selected={
                  data?.isFilterApplied
                    ? option.value === data?.params?.mktcap
                    : option.value === "None"
                }
              >
                {option.label}
              </option>
            );
          })}
        </select>
      );
    case "LastDiv":
      return (
        <select
          className={
            data?.isActive["lastdiv"]
              ? "select form-select me-3"
              : "form-select me-3"
          }
          aria-label="Default select example"
          onChange={(e) => {
            data?.handleDropdownChange(e.target.value, "lastdiv");
          }}
        >
          <option selected={data?.params?.lastdiv === "None"}>Select</option>
          {LASTDIV.map((option, index) => {
            return (
              <option
                style={{ backgroundColor: "white" }}
                value={option.value}
                key={index}
                selected={
                  data?.isFilterApplied
                    ? option.value === data?.params?.lastdiv
                    : option.value === "None"
                }
              >
                {option.label}
              </option>
            );
          })}
        </select>
      );
    case "Changes":
      return (
        <select
          className={
            data?.isActive["changes"]
              ? "select form-select me-3"
              : "form-select me-3"
          }
          aria-label="Default select example"
          onChange={(e) => {
            data?.handleDropdownChange(e.target.value, "changes");
          }}
        >
          <option selected={data?.params?.changes === "None"}>Select</option>
          {CHANGES.map((option, index) => {
            return (
              <option
                style={{ backgroundColor: "white" }}
                value={option.value}
                key={index}
                selected={
                  data?.isFilterApplied
                    ? option.value === data?.params?.changes
                    : option.value === "None"
                }
              >
                {option.label}
              </option>
            );
          })}
        </select>
      );
    case "exchangeShortName":
      return (
        <select
          className={
            data?.isActive["exchangeShortName"]
              ? "select form-select me-3"
              : "form-select me-3"
          }
          aria-label="Default select example"
          onChange={(e) => {
            data?.handleDropdownChange(e.target.value, "exchangeShortName");
          }}
        >
          <option selected={data?.params?.exchangeShortName === "None"}>
            Select
          </option>
          {data?.exchange.map((option, index) => {
            return (
              <option
                style={{ backgroundColor: "white" }}
                value={option}
                key={index}
                selected={
                  data?.isFilterApplied
                    ? option === data?.params?.exchangeShortName
                    : option === "None"
                }
              >
                {option}
              </option>
            );
          })}
        </select>
      );
    case "sector":
      return (
        <select
          className={
            data?.isActive["sector"]
              ? "select form-select me-3"
              : "form-select me-3"
          }
          aria-label="Default select example"
          onChange={(e) => {
            data?.handleDropdownChange(e.target.value, "sector");
          }}
        >
          <option selected={data?.params?.sector === "None"}>Select</option>
          {SECTOR_LIST.map((option, index) => {
            return (
              <option
                style={{ backgroundColor: "white" }}
                value={option}
                key={index}
                selected={
                  data?.isFilterApplied
                    ? option.value === data?.params?.sector
                    : option.value === "None"
                }
              >
                {option}
              </option>
            );
          })}
        </select>
      );
    case "industry":
      return (
        <select
          className={
            data?.isActive["industry"]
              ? "select form-select me-3"
              : "form-select me-3"
          }
          aria-label="Default select example"
          onChange={(e) => {
            data?.handleDropdownChange(e.target.value, "industry");
          }}
        >
          <option selected={data?.params?.industry === "None"}>Select</option>
          {data?.industryList &&
            data?.industryList?.map((option, index) => {
              return (
                <option
                  style={{ backgroundColor: "white" }}
                  value={option}
                  key={index}
                  selected={
                    data?.isFilterApplied
                      ? option.value === data?.params?.industry
                      : option.value === "None"
                  }
                >
                  {option}
                </option>
              );
            })}
        </select>
      );
    case "country":
      return (
        <select
          className={
            data?.isActive["country"]
              ? "select form-select me-3"
              : "form-select me-3"
          }
          aria-label="Default select example"
          onChange={(e) => {
            data?.handleDropdownChange(e.target.value, "country");
          }}
        >
          <option selected={data?.params?.country === "None"}>Select</option>
          {data?.country.map((option, index) => {
            return (
              <option
                style={{ backgroundColor: "white" }}
                value={option}
                key={index}
                selected={
                  data?.isFilterApplied
                    ? option.value === data?.params?.country
                    : option.value === "None"
                }
              >
                {option}
              </option>
            );
          })}
        </select>
      );
    case "fullTimeEmployees":
      return (
        <select
          className={
            data?.isActive["fullTimeEmployees"]
              ? "select form-select me-3"
              : "form-select me-3"
          }
          aria-label="Default select example"
          onChange={(e) => {
            data?.handleDropdownChange(e.target.value, "fullTimeEmployees");
          }}
        >
          <option selected={data?.params?.fullTimeEmployees === "None"}>
            Select
          </option>
          {FULLTIMEEMPLOYEES.map((option, index) => {
            return (
              <option
                style={{ backgroundColor: "white" }}
                value={option.value}
                key={index}
                selected={
                  data?.isFilterApplied
                    ? option.value === data?.params?.fullTimeEmployees
                    : option.value === "None"
                }
              >
                {option.label}
              </option>
            );
          })}
        </select>
      );
    case "ipoDate":
      return (
        <select
          className={
            data?.isActive["ipoDate"]
              ? "select form-select me-3"
              : "form-select me-3"
          }
          aria-label="Default select example"
          onChange={(e) => {
            data?.handleDropdownChange(e.target.value, "ipoDate");
          }}
        >
          <option selected={data?.params?.ipoDate === "None"}>
            Select
          </option>
          {IPODATE.map((option, index) => {
            return (
              <option
                style={{ backgroundColor: "white" }}
                value={option.value}
                key={index}
                selected={
                  data?.isFilterApplied
                    ? option.value === data?.params?.ipoDate
                    : option.value === "None"
                }
              >
                {option.label}
              </option>
            );
          })}
        </select>
      );
    case "currency":
      return (
        <select
          className={
            data?.isActive["currency"]
              ? "select form-select me-3"
              : "form-select me-3"
          }
          aria-label="Default select example"
          onChange={(e) => {
            data?.handleDropdownChange(e.target.value, "currency");
          }}
        >  
          {Object.keys(Currency).map((option, index) => {
            return (
              <option
                style={{ backgroundColor: "white" }}
                  value={option}
                  key={index}
                  selected={
                    data?.isFilterApplied
                      ? option === data?.params?.currency
                      : option === "None"
                  }
                >
                  {option}
                </option>
              );
            })}
        </select>
      );
    default:
      return;
  }
};
