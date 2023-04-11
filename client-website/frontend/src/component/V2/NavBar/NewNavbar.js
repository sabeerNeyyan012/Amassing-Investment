import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import NewSearch from "./NewSearch";
import Marquee from "./Marquee";
import { getSearchResult } from "../../api/Symbol";
import InvexWLogo from "../../Common/Images/image.png";
import SearchImg from "../../Common/Images/search.png";
import { HEADER_LIST } from "./Constants";
import { getToken, removeToken } from "../../Common/CommonFunctions";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [navbarSearch, setNavbarSearch] = useState(null);
  const [SearchResult, setSearchResult] = useState(null);
  const [activeLink, setActiveLink] = useState("");
  const token = getToken();
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

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

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
        }
      }
    } catch (err) {
      setSearchResult(null);
    }
  };
  const handleClick = (url) => {
    if (url) {
      navigate(url);
      setSearchResult(null);
    }
  };

  const handleRedirect = (url) => {
    if (url) {
      navigate(url);
    }
  };

  return (
    <>
      {/* Navbar Start */}
      <nav className="laptopNav fixed-top light-nav">
        <div className="upperNavbar">
          <div className="container d-flex align-items-center">
            <a href="/">
              <img src={InvexWLogo} alt style={{ height: "3rem" }} />
            </a>

            <NewSearch
              navbarSearch={navbarSearch}
              handleClick={handleClick}
              handleSearch={handleDebounceSearch}
              SearchResult={SearchResult}
              setSearchResult={setSearchResult}
            />

            {token !== undefined ? (
              <>
                <i
                  className="pi pi-user p-3"
                  onClick={() => navigate("/profile")}
                  style={{ cursor: "pointer", fontSize: "21px" }}
                />
                <i
                  className="pi pi-sign-out p-3"
                  onClick={() => handleLogout()}
                  style={{ cursor: "pointer", fontSize: "21px" }}
                />
              </>
            ) : (
              <React.Fragment>
                <button
                  className="login-btn me-3"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="signup-btn"
                  onClick={() => navigate("/register")}
                >
                  Signup
                </button>
              </React.Fragment>
            )}
          </div>
        </div>
        <div className="mainNavbar container">
          <ul className="d-flex my-0">
            {HEADER_LIST.map((header, index) => {
              return (
                <li key={index}>
                  <a
                    onClick={() => handleRedirect(header.redirect)}
                    className={`cursor-pointer ${
                      header.value === activeLink ? "active" : ""
                    }`}
                  >
                    {header.label}
                  </a>
                </li>
              );
            })}
          </ul>
          {token === undefined && (
            <button className="newUser ms-auto">
              First time here? <span className="fw-bold">Click Here</span>
            </button>
          )}
        </div>
      </nav>
      <div
        className="offcanvas offcanvas-start phoneNav"
        tabIndex={-1}
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            <a href="javascript:void(0)">
              <img src={InvexWLogo} />
            </a>
          </h5>
          <button
            type="button"
            className
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={25}
              height={25}
              fill="#fffff"
              className="bi bi-x-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
        </div>
        <div className="offcanvas-body">
          <ul>
            {HEADER_LIST.map((header, index) => {
              return (
                <li key={index}>
                  <Link
                    to={header.redirect}
                    className={`${header.value === activeLink ? "active" : ""}`}
                  >
                    {header.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <button className="newUser ms-auto">
            First time here? <span className="fw-bold">Click Here</span>
          </button>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg phoneNav">
        <div className="container-fluid">
          <div className="d-inline-flex">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              href="#offcanvasExample"
              role="button"
              aria-controls="offcanvasExample"
            >
              <span className="iconify text-light" data-icon="ph:list" />
            </button>
            <div className="d-inline-flex navbar-brand align-items-center">
              <a href="javascript:void(0);">
                <img src={InvexWLogo} alt height="54px" />
              </a>
            </div>
          </div>
          <a href="javascript:void">
            <img
              src={SearchImg}
              alt="search-icon"
              className="img-fluid ms-auto"
            />
          </a>
          <form
            className="form-group search-blk d-none"
            role="search"
            method="get"
            id="searchform"
            action
          >
            <div className="input-group">
              <input
                type="text"
                defaultValue
                name="s"
                className="form-control"
                placeholder="Search for symbol, company and news"
                id="example-search-input"
                autoComplete="off"
              />
              <input
                type="submit"
                defaultValue="Search"
                id="search-submit"
                style={{ display: "none" }}
              />
              <span className="input-group-append">
                <label htmlFor="search-submit">
                  <img
                    src={SearchImg}
                    alt="search-icon"
                    className="img-fluid"
                    height={24}
                    width={24}
                  />
                </label>
              </span>
            </div>
          </form>
        </div>
      </nav>
      {/* Navbar End */}

      <Marquee />
    </>
  );
};

export default Navbar;
