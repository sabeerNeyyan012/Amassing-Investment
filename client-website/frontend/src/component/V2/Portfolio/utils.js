import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPortfolios } from "../../../redux/store/slice";
import { getToken } from "../../Common/CommonFunctions";

export const FilterId = (name) => {
  const Token = getToken();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPortfolios(Token));
  }, []);
  const getPortfolio = useSelector(
    (state) => state?.reducer?.getPortfolio?.data
  );

  const data = getPortfolio?.filter((use) => use?.portfolioName === name);
  return data;
};
