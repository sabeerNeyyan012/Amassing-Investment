/* eslint-disable no-labels */
import React, { useRef } from "react";
import MUIDataTable from "mui-datatables";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

import EditPortfolio from "./EditPortfolio";
import { useDispatch, useSelector } from "react-redux";
import {
  getPortfolios,
  addPortfolios,
  deletePortfolios,
} from "../../../redux/store/slice";
import { getToken } from "../../Common/CommonFunctions";
import "./Portfolio.css";
import { ConfirmDialog, confirmDialog, confirmPopup } from "primereact";
import InvexLoader from "../../Common/InvexLoader";

const Portfolio = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const [port, setPort] = React.useState({
    portfolioName: "",
    currency: "",
  });

  const getPortfolio = useSelector(
    (state) => state?.reducer?.getPortfolio?.data
  );
  const toast = useRef(null);
  const Token = getToken();
  const dispatch = useDispatch();

  React.useEffect(() => {
    setIsLoading(true);
    dispatch(getPortfolios(Token));
    setIsLoading(false);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDelete = (arr) => {
    confirmDialog({
      message: "Are you sure you want to delete this item?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        dispatch(deletePortfolios(arr));
        dispatch(getPortfolios(Token));
      },
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeName = (e) => {
    getPortfolio?.map((user) => {
      if (e.target.value === user.portfolioName) {
        setError("Portfolio already exist.");
      } else {
        setError("");
      }
    });
    if (error === "") {
      setPort({ ...port, ...{ [e.target.name]: e.target.value } });
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(addPortfolios(port));
    dispatch(getPortfolios(Token));
    setOpen(false);
    setIsLoading(false);
    // if (isLoading === false) {
    //   navigate(`/watchlist/${port.portfolioName}`);
    // }
  };

  const options = {
    filter: false,
    responsive: "",
    onCellClick: (rowData, columnId) => {
      if (columnId?.colIndex === 1) {
        navigate(`/watchlist/${rowData}`);
      }
    },
    onRowsDelete: (rowsDeleted) => {
      const arr = [];
      rowsDeleted?.data?.map((user) => arr.push(getPortfolio[user?.index]?.id));
      handleDelete(arr);
    },
  };
  const columns = [
    { name: "id", label: "ID", options: { filter: false } },
    { name: "portfolioName", label: "Name", options: { filter: false } },
    { name: "currency", label: "Currency", options: { filter: false } },
    {
      name: "action",
      label: "Action",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <div className="reload">
                <EditPortfolio
                  id={tableMeta.rowData[0]}
                  portfolioName={tableMeta.rowData[1]}
                  currency={tableMeta.rowData[2]}
                />
              </div>
            </>
          );
        },
      },
    },
  ];
  return (
    <div
      style={{
        justifyContent: "center",
        marginLeft: "60px",
        marginRight: "60px",
      }}
    >
      {isLoading && <InvexLoader height="450px" />}
      {!isLoading && (
        <>
          <div className="mt-5">
            <Button
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleClickOpen}
            >
              Create Portfolio
            </Button>
          </div>
          <ConfirmDialog />

          <div className="mb-5">
            <MUIDataTable
              title={"My Portfolio"}
              data={getPortfolio}
              columns={columns}
              options={options}
            />
          </div>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle>Create Portfolio</DialogTitle>

            <DialogContent>
              <TextField
                autoFocus
                id="name"
                name="portfolioName"
                value={port.portfolioName}
                onChange={changeName}
                margin="dense"
                label="Enter Portfolio Name"
                type="text"
                fullWidth
                variant="standard"
              />
              {error !== "" && <div className="error"> {error} </div>}
            </DialogContent>

            <DialogContent>
              <InputLabel id="demo-simple-select-standard-label">
                currency
              </InputLabel>
              <Select
                style={{ width: "200px" }}
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                name="currency"
                displayEmpty
                value={port.currency}
                onChange={changeName}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="INR">INR</MenuItem>
                <MenuItem value="Thirty">Thirty</MenuItem>
              </Select>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClick} ref={toast}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default Portfolio;
