import moment from 'moment';
import { DATE_FORMAT } from './Constants';

export const convertDateFormat = (
  date,
  format = DATE_FORMAT[1],
  addDash = true
) => {
  return date ? moment(date).format(format) : addDash ? '-' : ''
}

export const getBeforeDate = (number, unit) => {
  const date = moment().subtract(number, unit);
  return date;
};
