// export const API_PREFIX: string = 'http://dev-insp-minwage-api.moh.intra';
// // // // //local
// // export const USER_MENEGEMENT_URL: string = `https://Dev-EhealthLogin.moh.intra/Authorization.Web/#/login?projectId=AD4EB1AA-A612-11ED-8105-005056B4F1D1&returnUrl=http:%2F%2Flocalhost:3003/ui`;
// //test pre prod

// // export const API_PREFIX: string = 'https://minwage-api-test.moh.gov.ge';
// export const USER_MENEGEMENT_URL: string = `https://ncdclogin.moh.gov.ge/HmisNew/Hmis.Authorization.Web/#/login?projectId=AD4EB1AA-A612-11ED-8105-005056B4F1D1&returnUrl=http:%2F%2Fminwagetest.moh.gov.ge/`;

//prod
// export const API_PREFIX: string = 'https://minwage.moh.gov.ge/api';
// export const USER_MENEGEMENT_URL: string = `https://ncdclogin.moh.gov.ge/HmisNew/Hmis.Authorization.Web/#/login?projectId=AD4EB1AA-A612-11ED-8105-005056B4F1D1&returnUrl=http:%2F%2Fminwage.moh.gov.ge/ui`;
// // // //local

//pre-insp-minimumsalary.moh.intraaaa

console.log('process.env',process.env)
export const API_PREFIX: string | undefined = process.env.REACT_APP_API_URL;
export const USER_MENEGEMENT_URL: string | undefined = process.env.REACT_APP_USER_MENEGEMENT_URL;

export const MONTH = [
  { name: 'იანვარი', value: 1 },
  { name: 'თებერვალი', value: 2 },
  { name: 'მარტი', value: 3 },
  { name: 'აპრილი', value: 4 },
  { name: 'მაისი', value: 5 },
  { name: 'ივნისი', value: 6 },
  { name: 'ივლისი', value: 7 },
  { name: 'აგვისტო', value: 8 },
  { name: 'სექტემბერი', value: 9 },
  { name: 'ოქტომბერი', value: 10 },
  { name: 'ნოემბერი', value: 11 },
  { name: 'დეკემბერი', value: 12 },
];

export const CELLS_TYPES = {
  0: 'Hou1r',
  1: 'X',
  2: 'შ',
  3: 'უ/შ',
  4: 'ს/ფ',
  5: 'დ/შ',
  6: 'დ',
  7: 'გ',
};
