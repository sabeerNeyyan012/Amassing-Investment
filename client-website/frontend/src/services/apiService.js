import axios from "axios";
import { getToken } from "../component/Common/CommonFunctions";
import {
  MarketbashUrl,
  MarketbashUrls,
  BASE_URL_V2,
  VALUATION_URL,
  BASE_URL_V3,
  CP1_V2_URL,
  SERVICE_V3_URL,
} from "../config/urls";

const user = getToken()

export const Services = axios.create({
  baseURL: MarketbashUrl,
  // timeout: 1000,
  headers: {
    Accept: "application/json",
    //'Authorization': 'token <your-token-here>'
  },
});

export const Service = axios.create({
  baseURL: MarketbashUrls,
  // timeout: 1000,
  headers: {
    Accept: "application/json",
    //'Authorization': 'token <your-token-here>'
  },
});

export const ServiceV2 = axios.create({
  baseURL: BASE_URL_V2,
  headers: {
    Accept: "application/json",
  },
});

export const ValuationService = axios.create({
  baseURL: VALUATION_URL,
  headers: {
    Accept: "application/json",
  },
});

export const ServiceV3 = axios.create({
  baseURL: BASE_URL_V3,
  headers: {
    Accept: "application/json",
  },
});

export const ServiceCP1V2 = axios.create({
  baseURL: CP1_V2_URL,
  headers: {
    Accept: "application/json",
  },
});

export const ServiceV4 = axios.create({
  baseURL: SERVICE_V3_URL,
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${user}`,
  },
});

export const ServiceV5 = axios.create({
  baseURL: SERVICE_V3_URL,
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${user}`,
  },
});
