import dayjs, { Dayjs } from 'dayjs';

export const filterOption = (input: string, option: any) => {
  return (option!.children as unknown as string)
    .toLowerCase()
    .includes(input.toLowerCase());
};

export function _calculateAge(birthday: any) {
  // birthday is a date
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}


export function _enumToArray(e: any) {// params => Enum
  return Object.entries(e).filter(e => !isNaN(e[0] as any)).map(e => ({ name: e[1] as string, id: e[0] as string }));
}


export const accessObjWithoutKey = (data: any) => {
  let propValue = [];
  for (var propName in data) {
    console.log('23232323', propName)
    if (data.hasOwnProperty(propName)) {
      console.log('23232323', data[propName], data[propName].length)
      if (data[propName].length > 1) {
        data[propName].forEach((element: any) => {
          propValue.push(element);
        });
      }
      else {
        propValue.push(data[propName]);
      }
    }
  }

  return propValue;
};


export const errorMessageAlert = (message: any, data: any) => {
  // let arr = accessObjWithoutKey(data)
  // arr.forEach(element => {
  //   console.log('elementelement', element)
  //   message.error(element, 5);
  // });
  if (typeof data === "string") {
    message.error(data, 5);
    return;
  }
  Object.entries(data || {}).forEach(([key, value]) => {
    console.log('343434',key, value)
    message.error(`${value}`, 5);
  });
};


export const showErrorMessage = (message: any,error: any) => {
  let { Errors } = error.response.data;
  console.log('ErrorsErrors', Errors);
  let err = accessObjWithoutKey(Errors);
  console.log('errerrerrerrerr', err);
  errorMessageAlert(message, err);
}

export const getActiveMonthForSheet = () => {
  var today = dayjs().date();
  if (today <= 25) {
    console.log('dayjs().month(-1)', dayjs().month(0));
    return dayjs().subtract(1, 'month');
  }
  return dayjs();
};