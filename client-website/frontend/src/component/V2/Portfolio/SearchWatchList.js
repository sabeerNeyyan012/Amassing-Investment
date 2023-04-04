import React, { useState, useRef, useEffect } from "react";
import {
  IconButton,
  Input,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import KImg from "../../Common/Images/⌘Kb.png";
import SearchBImg from "../../Common/Images/search-b.png";
import InvexRoutes from "../../../InvexRoutes";
import { ClickAwayListener } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchWatchList = ({
  navbarSearch,
  handleSearch,
  handleClick,
  SearchResult,
  setSearchResult,
}) => {
  const [clearSearchText, setClearSearchText] = useState(true);
  const searchInputRef = useRef();

  useEffect(() => {
    if (clearSearchText === true) {
      searchInputRef.current.value = "";
    }
  }, [clearSearchText]);

  const hideSearchResult = () => {
    setSearchResult(null);
    setClearSearchText(false);

    setTimeout(() => {
      setClearSearchText(false);
    }, 500);
  };

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="form-group search-blk1 me-auto ms-5"
        role="search"
        method="get"
        id="searchform"
        action
      >
        <div className="input-group ">
          <input
            type="text"
            ref={searchInputRef}
            value={navbarSearch}
            onChange={(e) => handleSearch(e.target.value)}
            name="s"
            className="form-control seach-input"
            placeholder="Search for symbol"
            id="example-search-input"
            autoComplete="off"
          />
          <input
            type="submit"
            defaultValue="Search"
            id="search-submit"
            style={{ display: "none" }}
          />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            className="input-group-append d-flex align-items-center  "
          >
            <SearchIcon />
          </IconButton>
        </div>
        {SearchResult && clearSearchText && SearchResult.length > 0 && (
          <ClickAwayListener
            onClickAway={() => {
              hideSearchResult();
            }}
          >
            <List
              className="search-result2"
              sx={{
                maxWidth: 60,
                bgcolor: "background.paper",
                position: "relative",
              }}
            >
              {SearchResult &&
                SearchResult.length > 0 &&
                SearchResult.map((list, i) => {
                  return (
                    <ListItem
                      key={i}
                      alignItems="flex-start"
                      onClick={() => {
                        handleClick(list?.symbol);
                        setClearSearchText(true);
                        // window.location.reload();

                        setTimeout(() => {
                          setClearSearchText(false);
                        }, 500);
                      }}
                    >
                      <ListItemText
                        primary={list.symbol + " - " + list.name}
                        secondary={
                          <>
                            <Typography
                              sx={{
                                display: "inline",
                                position: "absolute",
                              }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {list.stockExchange}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  );
                })}
            </List>
          </ClickAwayListener>
        )}
      </form>
    </>
  );
};

export default SearchWatchList;
