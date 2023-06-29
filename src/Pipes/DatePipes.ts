import moment from 'moment';

export function GetDateTime(date: any) {
  if (!date) {
    return '';
  }
  let d = moment(date).format('YYYY-MM-DD HH:mm:ss');
  return d;
}

export function GetDate(date: any) {
  if (!date) {
    return '';
  }
  let d = moment(date).format('YYYY-MM-DD');
  return d;
}
