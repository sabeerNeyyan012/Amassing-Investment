import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

import React from "react";

import EditIcon from "@material-ui/icons/Edit";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../Common/CommonFunctions";
import { editPortfolios, getPortfolios } from "../../../redux/store/slice";

const EditPortfolio = ({ id, portfolioName, currency }) => {
  const [edit, setEdit] = React.useState(false);
  const [error, setError] = React.useState("");
  const [port, setPort] = React.useState({
    portfolioName: "" || portfolioName,
    currency: "" || currency,
  });

  const getPortfolio = useSelector(
    (state) => state?.reducer?.getPortfolio?.data
  );
  const dispatch = useDispatch();
  const Token = getToken();

  const handleEditOpen = () => {
    setEdit(true);
  };

  const handleEditClose = () => {
    setEdit(false);
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

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(editPortfolios({ id, port }));
    dispatch(getPortfolios(Token));
    setEdit(false);
    // window.location.reload(false);
  };

  return (
    <div>
      <a onClick={handleEditOpen}>
        <EditIcon />
      </a>
      <Dialog
        open={edit}
        onClose={handleEditClose}
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
            value={port.currency}
            onChange={changeName}
            label="Currency"
            displayEmpty
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
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEdit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditPortfolio;
