import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  getSectorChartData,
  getSectorRevenueData,
  getSectorTableData,
} from "../../api/V2/sectorApi";
import {
  ALL_SCREENER_FILTERS,
  SECTOR_WISE_INDUSTRY,
} from "../Screener/Constants";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import abbreviateNumber, { NormalFormat } from "../../Common/NumberFormat";
import { camelCase, convertCamelCaseToSpaceSeparatedString, underScore } from "../../Common/CommonFunctions";
import { SECTOR_INDUSTRY_DEFINITION } from "./Constants";
import InvexLoader from "../../Common/InvexLoader";
import ReadMore from "../../Common/ReadMore/ReadMore";

const SectorV2 = () => {
  const { tab, id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams();
  const sectorParam = searchParams.get("sector") || camelCase(tab) || null;
  const industryParam = searchParams.get("industry") || camelCase(id) || null;
  const INIT_STATE = {
    all_sectors: sectorParam || industryParam ? 0 : 1,
    is_sector: sectorParam,
    is_industry: industryParam,
  };
  const navigate = useNavigate()
  const [chartParam, setChartParam] = useState(INIT_STATE);
  const [chartData, setChartData] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  // const [activeChartIndex, setActiveChartIndex] = useState(4);
  const [activeTableTab, setActiveTableTab] = useState("capitalStructure");
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [tableData, setTableData] = useState(null);
  const [activeSector, setActiveSector] = useState(sectorParam);
  const [chartType, setChartType] = useState("MARKET_CAP");
  const [revenueChartData, setRevenueChartData] = useState(null);

  useEffect(() => {
    getTableData();
  }, []);

  useEffect(() => {
    getChartData();
  }, [chartParam]);

  const COLORS = [
    "#118dff",
    "#12239e",
    "#e66c37",
    "#6b007b",
    "#e044a7",
    "#744ec2",
    "#d9b300",
    "#d64550",
    "#197278",
    "#1aab40",
    "#6e7074",
    "#be5dc9",
  ];

  const CHART_TYPE = [
    { label: "Market Cap", value: "MARKET_CAP" },
    { label: "Revenue", value: "REVENUE" },
  ];

  const getChartData = async () => {
    try {
      const data = await getSectorChartData(chartParam);

      if (data) {
        let tempArr = [];
        if (chartParam.is_industry) {
          Object.values(data?.top_10_company).map((companyName, index) => {
            tempArr.push({
              tickerName: companyName,
              y: data?.["top_10_revenue"][index],
              billion: NormalFormat(data?.["top_10_revenue"][index]),
              name: data?.["companyName"][index],
            });
          });
          tempArr.push({
            name: "Others",
            y: data?.others,
            billion: NormalFormat(data?.others),
          });
        } else {
          Object.keys(data).map((name) => {
            tempArr.push({
              name: name,
              y: data[name],
              billion: NormalFormat(data[name]),
            });
          });
        }
        let tempOption = {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: "pie",
          },
          credits: {
            enabled: false,
          },
          legend: {
            enabled: true,
            align: "right",
            layout: "vertical",
            verticalAlign: "top",
            symbolRadius: 0,
            itemMarginTop: 8,
          },
          title: {
            text: "",
          },
          tooltip: chartParam.is_industry
            ? { pointFormat: "<b>{point.billion} : {point.tickerName}</b>" }
            : { pointFormat: "<b>{point.billion}</b>" },
          accessibility: {
            point: {
              valueSuffix: "%",
            },
          },

          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: "pointer",
              dataLabels: {
                enabled: true,
                format: "{point.percentage:.1f} %",
              },
              showInLegend: true,
            },
          },
          series: [
            {
              colorByPoint: true,
              data: tempArr,
            },
          ],
        };
        setChartData({ ...tempOption });
      }
    } catch {
      setChartData(null);
    }

    try {
      const data = await getSectorRevenueData(chartParam);

      if (data) {
        let tempArr = [];
        if (chartParam.is_industry) {
          Object.values(data?.top_10_company).map((companyName, index) => {
            tempArr.push({
              tickerName: companyName,
              y: data?.["top_10_revenue"][index],
              billion: NormalFormat(data?.["top_10_revenue"][index]),
              name: data?.["companyName"][index],
            });
          });
          tempArr.push({
            name: "Others",
            y: data?.others,
            billion: NormalFormat(data?.others),
          });
        } else {
          Object.keys(data).map((name) => {
            tempArr.push({
              name: name,
              y: data[name],
              billion: NormalFormat(data[name]),
            });
          });
        }
        let tempOption = {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: "pie",
          },
          credits: {
            enabled: false,
          },
          legend: {
            enabled: true,
            align: "right",
            layout: "vertical",
            verticalAlign: "top",
            symbolRadius: 0,
            itemMarginTop: 8,
          },
          title: {
            text: "",
          },
          tooltip: chartParam.is_industry
            ? { pointFormat: "<b>{point.billion} : {point.tickerName}</b>" }
            : { pointFormat: "<b>{point.billion}</b>" },
          accessibility: {
            point: {
              valueSuffix: "%",
            },
          },

          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: "pointer",
              dataLabels: {
                enabled: true,
                format: "{point.percentage:.1f} %",
              },
              showInLegend: true,
            },
          },
          series: [
            {
              colorByPoint: true,
              data: tempArr,
            },
          ],
        };
        setRevenueChartData({ ...tempOption });
      }
    } catch {
      setRevenueChartData(null);
    }
  };

  const getTableData = async () => {
    try {
      setIsTableLoading(true);
      const resp = await getSectorTableData();
      if (typeof resp === "string") {
        const tempJSON = JSON.parse(
          resp.replaceAll("NaN", null).replaceAll("Infinity", null)
        );

        setTableData(tempJSON);
      } else {
        setTableData(resp);
      }
    } catch {
      setTableData(null);
    } finally {
      setIsTableLoading(false);
    }
  };

  const handleAccordian = (index) => {
    if (activeIndex !== index) {
      setActiveIndex(index);
    } else {
      setActiveIndex();
    }
  };

  const handleSectorIndustryChange = (sector, industry) => {
    if (sectorParam || industryParam) {
      setSearchParams({});
    }
    setChartParam({
      all_sectors: 0,
      is_sector: sector,
      is_industry: industry,
    });
  };

  const getColumnName = (col) => {
    let column = col;
    switch (col) {
      case "price":
        column = "Price";
        break;
      case "beta":
        column = "Beta";
        break;
      case "volavg":
        column = "VolAvg";
        break;
      case "mktcap":
        column = "MktCap";
        break;
      case "lastdiv":
        column = "LastDiv";
        break;
      case "changes":
        column = "Changes";
        break;
      default:
        column = col;
        break;
    }

    return column;
  };

  return (
    <div className="main">
      <section className="sectors_sec">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-4">
              <div className="leftsidefilter">
                <div
                  className="new_scenr_btn d-flex justify-content-between cursor-pointer"
                  onClick={() => {
                    setChartParam({ ...INIT_STATE });
                    setActiveSector(null);
                  }}
                >
                  <h4 className="m-0">All Sectors</h4>
                  {/* <i class='bi bi-chevron-down'></i> */}
                </div>
                <div className="accordion accordion_bold" id="acc_sidefilter">
                  {Object.keys(SECTOR_WISE_INDUSTRY).map((sector, i) => {
                    return (
                      <div className="in_acc_item" key={i}>
                        <h2 className="in_acc_header" id="acc_commu_serv">
                          <button
                            className={`accordion-button ${
                              activeIndex === i ||
                              chartParam.is_sector === sector
                                ? "active"
                                : "collapsed"
                            }`}
                            type="button"
                            onClick={() => {
                              handleAccordian(i);
                              handleSectorIndustryChange(sector, null);
                              setActiveSector(sector);
                              navigate(`${underScore(sector)}`)
                            }}
                          >
                            <span className="d-block w-100">
                              {sector}
                              <a className="float-end me-3 pe-3 text-secondary">
                                {SECTOR_WISE_INDUSTRY[sector].length} Industries
                              </a>
                            </span>
                          </button>
                        </h2>
                        <div
                          id="coll_commu_serv"
                          className={`accordion-collapse collapse ${
                            activeIndex === i || chartParam.is_sector === sector
                              ? "show"
                              : ""
                          }`}
                          aria-labelledby="acc_commu_serv"
                          data-bs-parent="#acc_sidefilter"
                        >
                          <div className="in_acc_body">
                            <ul>
                              {SECTOR_WISE_INDUSTRY[sector] &&
                                SECTOR_WISE_INDUSTRY[sector].map(
                                  (industry, j) => {
                                    return (
                                      <li
                                        key={j}
                                        className={`${
                                          chartParam.is_industry === industry
                                            ? "active"
                                            : ""
                                        }`}
                                        onClick={() => {
                                          handleSectorIndustryChange(
                                            null,
                                            industry
                                          );
                                          setActiveSector(sector);
                                          navigate(`${underScore(sector)}/${underScore(industry)}`)
                                        }}
                                      >
                                        <a href="javascript:void(0);">
                                          {industry}
                                        </a>
                                      </li>
                                    );
                                  }
                                )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="row">
                <div className="col-lg-12 mb-5">
                  <div className="mb-5">
                    <div className>
                      <div className="d-flex align-items-center justify-content-left border-bottom-0">
                        <h5 className="mb-3">
                          {chartParam?.all_sectors === 1
                            ? "All Sectors"
                            : chartParam?.is_sector
                            ? chartParam?.is_sector
                            : chartParam?.is_industry
                            ? chartParam?.is_industry
                            : ""}
                        </h5>
                      </div>
                    </div>
                    <div className>
                      <div className="description-para">
                        <div className="key_status">
                          <ReadMore
                            limit={250}
                            text={
                              SECTOR_INDUSTRY_DEFINITION[
                                chartParam?.all_sectors === 1
                                  ? "All Sectors"
                                  : chartParam?.is_sector
                                  ? chartParam?.is_sector
                                  : chartParam?.is_industry
                                  ? chartParam?.is_industry
                                  : ""
                              ]
                            }
                          />
                          <span />
                          <div className="d-flex align-items-center justify-content-between">
                            <a
                              href="#"
                              className="btn btn-outline-dark"
                              data-bs-toggle="modal"
                              data-bs-target="#filtermodal"
                            >
                              Find Investnment
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mt-5 mb-5">
                    <div className=" d-flex justify-content-between">
                      <h6 className="mb-4">
                        <strong>
                          {chartParam?.all_sectors === 1
                            ? "All Sectors"
                            : chartParam?.is_sector
                            ? chartParam?.is_sector
                            : chartParam?.is_industry
                            ? chartParam?.is_industry
                            : ""}{" "}
                          Weighting (
                          {chartType === "MARKET_CAP"
                            ? "Market Cap"
                            : "Revenue"}
                          )
                        </strong>
                      </h6>
                      <div className="top_button_panel top_button_panel_light mb-3 justify-content-end">
                        {CHART_TYPE.map((duration, index) => {
                          return (
                            <button
                              key={index}
                              type="button"
                              className={`btn ${
                                duration.value === chartType
                                  ? "btn-info"
                                  : "btn-light"
                              } `}
                              onClick={() => setChartType(duration.value)}
                            >
                              {duration.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {chartData && chartType === "MARKET_CAP" && (
                      <div>
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={chartData}
                        />
                      </div>
                    )}
                    {revenueChartData && chartType === "REVENUE" && (
                      <div>
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={revenueChartData}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {(chartParam.is_industry || chartParam.is_sector) && (
              <>
                <div className="col-lg-12">
                  <div className="d-flex align-items-center justify-content-between mt-5">
                    <h4 className="me-auto mb-0">
                      {chartParam?.is_sector
                        ? chartParam?.is_sector
                        : chartParam?.is_industry
                        ? chartParam?.is_industry
                        : ""}{" "}
                      Statistics
                    </h4>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="top_button_panel v2 mt-4 mb-3">
                    {Object.keys(ALL_SCREENER_FILTERS).map((key) => {
                      if (key !== "basicCompanyFacts") {
                        return (
                          <button
                            type="button"
                            className={`btn ${
                              activeTableTab === key ? "btn-info" : ""
                            }`}
                            onClick={() => {
                              setActiveTableTab(key);
                            }}
                          >
                            {convertCamelCaseToSpaceSeparatedString(key)}
                          </button>
                        );
                      }
                    })}
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="top_eta mt-3">
                    <div className="mb-5">
                      {!isTableLoading && tableData && (
                        <div className="table-responsive">
                          <table className="table table-bordered table-striped m-0 most_tables normal_table">
                            <thead className="table-light">
                              <tr>
                                <th scope="col">-</th>
                                <th scope="col">10 percentile</th>
                                <th scope="col">25 percentile</th>
                                <th scope="col">50 percentile (Median)</th>
                                <th scope="col">75 percentile</th>
                                <th scope="col">90 percentile</th>
                                {/* <th scope='col'>52 Week high</th> */}
                              </tr>
                            </thead>
                            <tbody className="border-top-0">
                              {ALL_SCREENER_FILTERS[activeTableTab] &&
                                ALL_SCREENER_FILTERS[activeTableTab].map(
                                  (row, index) => {
                                    return (
                                      <tr key={index}>
                                        <td>
                                          {row.label}{" "}
                                          {row?.tooltip && (
                                            <i
                                              className="bi bi-info-circle m-1"
                                              data-toggle="tooltip"
                                              title={row?.tooltip}
                                            ></i>
                                          )}
                                        </td>
                                        <td>
                                          {tableData[
                                            chartParam?.is_industry
                                              ? "industry"
                                              : "sector"
                                          ]["0.1"][getColumnName(row?.value)] &&
                                          tableData[
                                            chartParam?.is_industry
                                              ? "industry"
                                              : "sector"
                                          ]["0.1"][getColumnName(row?.value)][
                                            chartParam.is_industry
                                              ? chartParam.is_industry
                                              : chartParam.is_sector
                                              ? chartParam.is_sector
                                              : ""
                                          ]
                                            ? row?.type === "CURRENCY"
                                              ? abbreviateNumber(
                                                  tableData[
                                                    chartParam?.is_industry
                                                      ? "industry"
                                                      : "sector"
                                                  ]["0.1"][
                                                    getColumnName(row?.value)
                                                  ][
                                                    chartParam.is_industry
                                                      ? chartParam.is_industry
                                                      : chartParam.is_sector
                                                      ? chartParam.is_sector
                                                      : ""
                                                  ]
                                                )
                                              : row?.type === "PERCENTAGE"
                                              ? `${(
                                                  tableData[
                                                    chartParam?.is_industry
                                                      ? "industry"
                                                      : "sector"
                                                  ]["0.1"][
                                                    getColumnName(row?.value)
                                                  ][
                                                    chartParam.is_industry
                                                      ? chartParam.is_industry
                                                      : chartParam.is_sector
                                                      ? chartParam.is_sector
                                                      : ""
                                                  ] * 100
                                                ).toFixed(2)}%`
                                              : tableData[
                                                  chartParam?.is_industry
                                                    ? "industry"
                                                    : "sector"
                                                ]["0.1"][
                                                  getColumnName(row?.value)
                                                ][
                                                  chartParam.is_industry
                                                    ? chartParam.is_industry
                                                    : chartParam.is_sector
                                                    ? chartParam.is_sector
                                                    : ""
                                                ].toFixed(2)
                                            : "-"}
                                        </td>
                                        <td>
                                          {tableData[
                                            chartParam?.is_industry
                                              ? "industry"
                                              : "sector"
                                          ]["0.25"][
                                            getColumnName(row?.value)
                                          ] &&
                                          tableData[
                                            chartParam?.is_industry
                                              ? "industry"
                                              : "sector"
                                          ]["0.25"][getColumnName(row?.value)][
                                            chartParam.is_industry
                                              ? chartParam.is_industry
                                              : chartParam.is_sector
                                              ? chartParam.is_sector
                                              : ""
                                          ]
                                            ? row?.type === "CURRENCY"
                                              ? abbreviateNumber(
                                                  tableData[
                                                    chartParam?.is_industry
                                                      ? "industry"
                                                      : "sector"
                                                  ]["0.25"][
                                                    getColumnName(row?.value)
                                                  ][
                                                    chartParam.is_industry
                                                      ? chartParam.is_industry
                                                      : chartParam.is_sector
                                                      ? chartParam.is_sector
                                                      : ""
                                                  ]
                                                )
                                              : row?.type === "PERCENTAGE"
                                              ? `${(
                                                  tableData[
                                                    chartParam?.is_industry
                                                      ? "industry"
                                                      : "sector"
                                                  ]["0.25"][
                                                    getColumnName(row?.value)
                                                  ][
                                                    chartParam.is_industry
                                                      ? chartParam.is_industry
                                                      : chartParam.is_sector
                                                      ? chartParam.is_sector
                                                      : ""
                                                  ] * 100
                                                ).toFixed(2)}%`
                                              : tableData[
                                                  chartParam?.is_industry
                                                    ? "industry"
                                                    : "sector"
                                                ]["0.25"][
                                                  getColumnName(row?.value)
                                                ][
                                                  chartParam.is_industry
                                                    ? chartParam.is_industry
                                                    : chartParam.is_sector
                                                    ? chartParam.is_sector
                                                    : ""
                                                ].toFixed(2)
                                            : "-"}
                                        </td>
                                        <td>
                                          {tableData[
                                            chartParam?.is_industry
                                              ? "industry"
                                              : "sector"
                                          ]["0.5"][getColumnName(row?.value)] &&
                                          tableData[
                                            chartParam?.is_industry
                                              ? "industry"
                                              : "sector"
                                          ]["0.5"][getColumnName(row?.value)][
                                            chartParam.is_industry
                                              ? chartParam.is_industry
                                              : chartParam.is_sector
                                              ? chartParam.is_sector
                                              : ""
                                          ]
                                            ? row?.type === "CURRENCY"
                                              ? abbreviateNumber(
                                                  tableData[
                                                    chartParam?.is_industry
                                                      ? "industry"
                                                      : "sector"
                                                  ]["0.5"][
                                                    getColumnName(row?.value)
                                                  ][
                                                    chartParam.is_industry
                                                      ? chartParam.is_industry
                                                      : chartParam.is_sector
                                                      ? chartParam.is_sector
                                                      : ""
                                                  ]
                                                )
                                              : row?.type === "PERCENTAGE"
                                              ? `${(
                                                  tableData[
                                                    chartParam?.is_industry
                                                      ? "industry"
                                                      : "sector"
                                                  ]["0.5"][
                                                    getColumnName(row?.value)
                                                  ][
                                                    chartParam.is_industry
                                                      ? chartParam.is_industry
                                                      : chartParam.is_sector
                                                      ? chartParam.is_sector
                                                      : ""
                                                  ] * 100
                                                ).toFixed(2)}%`
                                              : tableData[
                                                  chartParam?.is_industry
                                                    ? "industry"
                                                    : "sector"
                                                ]["0.5"][
                                                  getColumnName(row?.value)
                                                ][
                                                  chartParam.is_industry
                                                    ? chartParam.is_industry
                                                    : chartParam.is_sector
                                                    ? chartParam.is_sector
                                                    : ""
                                                ].toFixed(2)
                                            : "-"}
                                        </td>
                                        <td>
                                          {tableData[
                                            chartParam?.is_industry
                                              ? "industry"
                                              : "sector"
                                          ]["0.75"][
                                            getColumnName(row?.value)
                                          ] &&
                                          tableData[
                                            chartParam?.is_industry
                                              ? "industry"
                                              : "sector"
                                          ]["0.75"][getColumnName(row?.value)][
                                            chartParam.is_industry
                                              ? chartParam.is_industry
                                              : chartParam.is_sector
                                              ? chartParam.is_sector
                                              : ""
                                          ]
                                            ? row?.type === "CURRENCY"
                                              ? abbreviateNumber(
                                                  tableData[
                                                    chartParam?.is_industry
                                                      ? "industry"
                                                      : "sector"
                                                  ]["0.75"][
                                                    getColumnName(row?.value)
                                                  ][
                                                    chartParam.is_industry
                                                      ? chartParam.is_industry
                                                      : chartParam.is_sector
                                                      ? chartParam.is_sector
                                                      : ""
                                                  ]
                                                )
                                              : row?.type === "PERCENTAGE"
                                              ? `${(
                                                  tableData[
                                                    chartParam?.is_industry
                                                      ? "industry"
                                                      : "sector"
                                                  ]["0.75"][
                                                    getColumnName(row?.value)
                                                  ][
                                                    chartParam.is_industry
                                                      ? chartParam.is_industry
                                                      : chartParam.is_sector
                                                      ? chartParam.is_sector
                                                      : ""
                                                  ] * 100
                                                ).toFixed(2)}%`
                                              : tableData[
                                                  chartParam?.is_industry
                                                    ? "industry"
                                                    : "sector"
                                                ]["0.75"][
                                                  getColumnName(row?.value)
                                                ][
                                                  chartParam.is_industry
                                                    ? chartParam.is_industry
                                                    : chartParam.is_sector
                                                    ? chartParam.is_sector
                                                    : ""
                                                ].toFixed(2)
                                            : "-"}
                                        </td>
                                        <td>
                                          {tableData[
                                            chartParam?.is_industry
                                              ? "industry"
                                              : "sector"
                                          ]["0.9"][getColumnName(row?.value)] &&
                                          tableData[
                                            chartParam?.is_industry
                                              ? "industry"
                                              : "sector"
                                          ]["0.9"][getColumnName(row?.value)][
                                            chartParam.is_industry
                                              ? chartParam.is_industry
                                              : chartParam.is_sector
                                              ? chartParam.is_sector
                                              : ""
                                          ]
                                            ? row?.type === "CURRENCY"
                                              ? abbreviateNumber(
                                                  tableData[
                                                    chartParam?.is_industry
                                                      ? "industry"
                                                      : "sector"
                                                  ]["0.9"][
                                                    getColumnName(row?.value)
                                                  ][
                                                    chartParam.is_industry
                                                      ? chartParam.is_industry
                                                      : chartParam.is_sector
                                                      ? chartParam.is_sector
                                                      : ""
                                                  ]
                                                )
                                              : row?.type === "PERCENTAGE"
                                              ? `${(
                                                  tableData[
                                                    chartParam?.is_industry
                                                      ? "industry"
                                                      : "sector"
                                                  ]["0.9"][
                                                    getColumnName(row?.value)
                                                  ][
                                                    chartParam.is_industry
                                                      ? chartParam.is_industry
                                                      : chartParam.is_sector
                                                      ? chartParam.is_sector
                                                      : ""
                                                  ] * 100
                                                ).toFixed(2)}%`
                                              : tableData[
                                                  chartParam?.is_industry
                                                    ? "industry"
                                                    : "sector"
                                                ]["0.9"][
                                                  getColumnName(row?.value)
                                                ][
                                                  chartParam.is_industry
                                                    ? chartParam.is_industry
                                                    : chartParam.is_sector
                                                    ? chartParam.is_sector
                                                    : ""
                                                ].toFixed(2)
                                            : "-"}
                                        </td>
                                      </tr>
                                    );
                                  }
                                )}
                            </tbody>
                          </table>
                        </div>
                      )}
                      {isTableLoading && <InvexLoader height="500px" />}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SectorV2;
