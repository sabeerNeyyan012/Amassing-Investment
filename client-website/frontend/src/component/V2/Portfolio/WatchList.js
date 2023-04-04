/* eslint-disable no-unused-expressions */
import MUIDataTable from "mui-datatables";
import React, { useEffect, useRef, useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Card } from "@mui/material";
import { Box } from "@material-ui/core";
import { getSearchResult } from "../../api/Symbol";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  addSymbols,
  deleteSymbols,
  viewSymbols,
} from "../../../redux/store/slice";
import { FilterId } from "./utils";
import SearchWatchList from "./SearchWatchList";
import { ConfirmDialog, confirmDialog } from "primereact";
import InvexLoader from "../../Common/InvexLoader";
// import { getToken, removeToken } from "../../Common/CommonFunctions";

const WatchList = () => {
  const [navbarSearch, setNavbarSearch] = useState(null);
  const [SearchResult, setSearchResult] = useState();

  const [clearSearchText, setClearSearchText] = useState(false);

  const [data, setData] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const searchInputRef = useRef();
  const [activeLink, setActiveLink] = useState("");
  const dispatch = useDispatch();
  let { name } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const viewSymbol = useSelector((state) => state?.reducer?.viewSymbol);
  const [searchBtn, setSearchBtn] = useState();
  useEffect(() => {
    if (viewSymbol.length === 0) {
      setSearchBtn(true);
    } else {
      setSearchBtn(false);
    }
  }, [viewSymbol]);

  const ID = FilterId(name)?.[0]?.id;

  useEffect(() => {
    setIsLoading(true);
    dispatch(viewSymbols(ID));
    setIsLoading(false);
  }, [ID]);

  useEffect(() => {
    if (location) {
      const data = location.pathname.split("/");
      if (data[1]) {
        setActiveLink(data[1]);
      } else {
        setActiveLink("");
      }
    }
  }, [location]);

  const debounce = (func, timeout = 300) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };

  const handleDebounceSearch = debounce((val) => handleSearch(val), 700);

  const handleSearch = async (val) => {
    try {
      if (val) {
        var data = await getSearchResult({ keyword: val });

        if (
          data &&
          data?.status === 200 &&
          data?.data &&
          data?.data.length > 0
        ) {
          setSearchResult(data?.data);
          setData();
        }
      }
    } catch (err) {
      setSearchResult(null);
    }
  };
  const handleClick = (symbol, e) => {
    dispatch(addSymbols({ symbol, ID }));
    dispatch(viewSymbols(ID));
  };

  useEffect(() => {
    if (clearSearchText === true) {
      searchInputRef.current.value = "";
    }
  }, [clearSearchText]);

  const handleDelete = (arr) => {
    confirmDialog({
      message: "Are you sure you want to delete this item?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        dispatch(deleteSymbols(arr));
      },
    });
  };
  const options = {
    filter: false,
    search: false,
    print: false,
    viewColumns: false,
    download: false,
    responsive: "",
    selectableRows: true,
    pagination: true,
    onRowsDelete: (rowsDeleted) => {
      const arr = [];
      rowsDeleted?.data?.map((user) => arr.push(viewSymbol[user?.index]?.id));
      arr.unshift(ID);
      handleDelete(arr);
    },
    onCellClick: (rowData, columnId, e) => {
      if (columnId?.colIndex === 1) {
        navigate(`/symbol/${rowData}`);
      }
    },
  };
  const columns = [
    { name: "id", label: "Symbol_Id", options: { filter: false } },
    { name: "symbol", label: "Symbol", options: { filter: false } },
    { name: "portfolioId", label: "Portfolio_Id", options: { filter: false } },
    {
      name: "exchangeShortName",
      label: "exchangeShortName",
      options: { filter: false },
    },
    {
      name: "stockExchange",
      label: "stockExchange",
      options: { filter: false },
    },
    { name: "currency", label: "Currency", options: { filter: false } },
  ];

  return (
    <div>
      {isLoading && <InvexLoader height="450px" />}
      {!isLoading && (
        <>
          <storng>
            <h4 style={{ marginLeft: "60px" }} className="mt-3">
              MY Portfolio/{name}
            </h4>
          </storng>
          <div
            style={{
              justifyContent: "center",
              marginLeft: "60px",
              marginRight: "60px",
            }}
          >
            <div className="mt-4 ">
              <Button
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => setSearchBtn(false)}
              >
                Create Symbol
              </Button>
            </div>
            {searchBtn === true && (
              <Box className="border  box mr-5 ml-5 mb-5 w-60">
                <div className="mt-5 mb-5">
                  <p>Your list is empty.</p>
                  <Button
                    className="btn btn-center bg-primary"
                    style={{ color: "white" }}
                    onClick={() => setSearchBtn(false)}
                    startIcon={<AddIcon />}
                  >
                    Add Symbol
                  </Button>
                </div>
              </Box>
            )}
            {searchBtn === false && (
              <div>
                <Box className="border box mr-5 ml-5 mb-5">
                  <div className="seach-input mt-2">
                    <SearchWatchList
                      navbarSearch={navbarSearch}
                      handleClick={handleClick}
                      handleSearch={handleDebounceSearch}
                      SearchResult={SearchResult}
                      setSearchResult={setSearchResult}
                    />
                  </div>
                  <ConfirmDialog />

                  <div className="mt-3 ">
                    <MUIDataTable
                      data={viewSymbol}
                      columns={columns}
                      options={options}
                    />
                  </div>
                </Box>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default WatchList;
