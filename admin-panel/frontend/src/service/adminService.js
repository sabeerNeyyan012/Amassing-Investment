import axios from "axios";
import {
  SERVICE_V3_URL,
} from '../common/config/urls';
import { getToken } from "../helpers/AuthHelper";

const token = getToken();

export const ServiceV4 = axios.create({
  baseURL: SERVICE_V3_URL,
  headers: {
    "Accept": 'application/json',
    "Access-Control-Allow-Origin": "*", 
    'Authorization': `Bearer ${token}`
  },
});

export const ServiceV3 = axios.create({
  baseURL: SERVICE_V3_URL,
  headers: {
    "Accept": 'application/json',
    "Access-Control-Allow-Origin": "*", 
  },
});