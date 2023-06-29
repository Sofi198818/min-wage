import React, { memo, useEffect, useState } from 'react';
import {
  CheckOutlined,
  FieldTimeOutlined,
  LockOutlined,
  SaveOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Button,
  Calendar,
  Card,
  Form,
  Input,
  InputNumber,
  message,
  Popover,
  Progress,
  Skeleton,
  Tag,
  Tooltip,
} from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import mapKeys from 'lodash/mapKeys';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  fiilSheetDetails,
  resetUpdateTimeSheetDetailsErrors,
  resetUpdateTimeSheetDetailsSuccess,
  updateTimeSheetDetails,
} from '../../../redux/slices/timeSheets';
import { errorMessageAlert } from '../../../utils';
import { CELLS_TYPES } from '../../../constants';
import { useParams } from 'react-router';

var dateFormatString = 'YYYY-MM-DD';
type Cell = {
  id?: string;
  type: number;
  value: number;
  date?: string;
  tagData?: {
    color: string;
    value: number;
  };
};

type Props = {
  value: Dayjs;
};

// export const getTagInfo = (type: any) => {
//   switch (type) {
//     case 1:
//       return { color: 'purple', text: 'დასვენების და უქმე დღეები', shortText: 'X' };
//     case 2:
//       return { color: 'green', text: 'შვებულება', shortText: 'შ' };
//     case 3:
//       return {
//         color: 'gold',
//         text: 'ანაზღაურების გარეშე შვებულება',
//         shortText: 'უ/შ',
//       };
//     case 4:
//       return { color: 'cyan', text: 'საავადმყოფო ფურცელი', shortText: 'ს/ფ' };
//     case 5:
//       return {
//         color: 'blue',
//         text: 'დეკრეტული შვებულება(ანაზღაურებადი)',
//         shortText: 'დ/შ',
//       };
//     case 6:
//       return { color: 'lime', text: 'დასვენება, უქმე დღე', shortText: 'დ' };
//     case 7:
//       return { color: 'magenta', text: 'გაცდენა', shortText: 'გ' };
//   }

//   return { color: '', text: '' };
// };
export const getTagInfo = (
  month: any,
  year: any,
  type: number | string | undefined
) => {
  if (month < 5 && year < 2024) {
    console.log('1111');
    switch (type) {
      case 1:
        return {
          color: 'purple',
          text: 'დასვენების და უქმე დღეები',
          shortText: 'X',
        };
      case 2:
        return { color: 'green', text: 'შვებულება', shortText: 'შ' };
      case 3:
        return {
          color: 'gold',
          text: 'ანაზღაურების გარეშე შვებულება',
          shortText: 'უ/შ',
        };
      case 4:
        return { color: 'cyan', text: 'საავადმყოფო ფურცელი', shortText: 'ს/ფ' };
      case 5:
        return {
          color: 'blue',
          text: 'დეკრეტული შვებულება(ანაზღაურებადი)',
          shortText: 'დ/შ',
        };
      case 6:
        return { color: 'lime', text: 'დასვენება, უქმე დღე', shortText: 'დ' };
      case 7:
        return { color: 'magenta', text: 'გაცდენა', shortText: 'გ' };
    }
  } else {
    console.log('2222');
    switch (type) {
      case 6:
        return { color: 'purple', text: 'დასვენება/უქმე დღეები', shortText: 'დ' };
      case 8:
        return { color: 'green', text: 'ანაზღაურება/შვებულება', shortText: 'ა/შ' };
      case 3:
        return {
          color: 'gold',
          text: 'ანაზღაურების გარეშე შვებულება',
          shortText: 'უ/შ',
        };
      case 9:
        return {
          color: 'cyan',
          text: ' დეკრეტული შვებულება - ანაზღაურებადი;',
          shortText: 'დ/შ-ა',
        };
      case 10:
        console.log('555 ttt ');
        return {
          color: 'blue',
          text: ' დეკრეტული შვებულება/ანაზღაურების გარეშე',
          shortText: 'დ/შ-უ',
        };
      case 4:
        return {
          color: 'cyan',
          text: ' დსაავადმყოფო ფურცელი',
          shortText: 'ს/ფ',
        };
      case 7:
        return {
          color: 'magenta',
          text: ' გაცდენა',
          shortText: 'გ',
        };
      default:
        return {
          color: '',
          text: '',
          shortText: '',
        };
    }
  }
};

const DateCellRender = ({ value }: Props) => {
  const sheetDetail = useAppSelector(state => state.timeSheets.sheetDetails);
  const { permissions } = useAppSelector(state => state.user.userData);

  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const getDayValue = (day: Dayjs): Cell | undefined => {
    // console.log('sheetDetail000', sheetDetail);
    let currentDay = sheetDetail.cells?.find(
      (item: Cell) =>
        dayjs(item.date).format(dateFormatString) === day.format(dateFormatString)
    );

    console.log('sopocurrent', currentDay);
    return currentDay;
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (permissions && permissions['Moderator']) {
      setOpen(newOpen);
    }
  };

  const handleChangeInput = (inputValue: any, type?: any) => {
    if (inputValue > 24 || inputValue < 0) {
      message.error('ციფრი უნდა იყოს 0-ზე მეტი და 24-ზე ნაკლები !');
      return;
    }
    console.log(
      '9999999value',
      type,
      value.year(),
      value.month() + 1,
      value.date(),
      value.format('YYYY/MM/DD'),
      inputValue
    );
    let formatedDate = value.format(dateFormatString);
    // CalendarData[formatedDate] = inputValue;

    let newValue = type == 0 ? inputValue : null;

    let newCell: Cell = {
      type: type,
      date: formatedDate,
      value: inputValue,
    };
    let cells: Array<Cell> = sheetDetail.cells ? [...sheetDetail.cells] : [];
    let exit: boolean = false;

    let newCells = cells.map((element: Cell) => {
      if (dayjs(element.date).format(dateFormatString) === formatedDate) {
        exit = true;
        let newElement = { ...element, value: newValue };
        console.log('typetypetype', type, newValue, newElement);

        // if (type != 0) {
        newElement.type = type;
        // }
        return newElement;
      } else {
        console.log('232323 elsee', element.date, formatedDate);
        return element;
      }
    });

    if (!exit) {
      newCells.push(newCell);
    }

    console.log('sheetDetail', sheetDetail);
    dispatch(
      fiilSheetDetails({
        ...sheetDetail,
        year: value.year(),
        month: value.month() + 1,
        cells: newCells,
      })
    );
  };
  const handleClickTag = (type: number) => {
    console.log('1000', value.year());
    console.log('type', type);
    handleChangeInput(null, type);
    setOpen(false);
  };

  const hanldeCloseTag = (date: Dayjs, type: any) => {
    console.log('date', date, type);
    handleChangeInput(null, 0);
  };

  const disabledInput = (dayValue: any) => {
    if (!dayValue) {
      return false;
    }
    return dayValue?.type != 0;
  };
  const { monthes, years } = useParams();

  const content = (
    <div>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i: any) => {
        return getTagInfo(monthes, years, i)?.shortText ? (
          getTagInfo(monthes, years, i)?.shortText ? (
            <Tooltip
              title={getTagInfo(value.month() + 1, value.year(), i)?.text}
              color={getTagInfo(value.month() + 1, value.year(), i)?.color}
            >
              <Tag
                onClick={() => handleClickTag(i)}
                color={getTagInfo(value.month() + 1, value.year(), i)?.color}
                style={{ cursor: 'pointer' }}
              >
                {getTagInfo(monthes, years, i)?.shortText}
              </Tag>
            </Tooltip>
          ) : null
        ) : null;
      })}
    </div>
  );
  const dayValue = getDayValue(value);

  if (value.month() + 1 != Number(monthes)) {
    console.log('nullnullnull', value.month());
    return <></>;
  }

  return (
    <>
      <div
      // style={{ display: value.month() + 1 != Number(monthes) ? 'none' : 'block' }}
      >
        <Popover
          content={content}
          title={`${value.format('DD MMMM,  dddd  - YYYY')} წ.`}
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}
        >
          <div
            style={{
              //   backgroundColor: '#eee',
              background: '#BFCDE014',
              borderRadius: 15,
              //   width: 150,
              height: 100,
              marginBottom: 11,
              marginRight: 5,
              paddingLeft: 9,
              paddingTop: 6,
            }}
          >
            <div style={{ display: 'flex' }}>{value.date()}</div>
            <div style={{ display: 'flex' }}>
              <InputNumber
                value={dayValue?.value}
                onChange={(data: any) => handleChangeInput(data, 0)}
                onClick={(e: any) => e.stopPropagation()}
                type={'number'}
                prefix={<FieldTimeOutlined />}
                disabled={disabledInput(dayValue)}
              />
            </div>
            {dayValue && dayValue?.type != 0 ? (
              <div style={{ display: 'flex', marginTop: 10 }}>
                <Tag
                  closable
                  onClose={() => hanldeCloseTag(value, dayValue?.type)}
                  color={getTagInfo(monthes, years, dayValue.type)?.color}
                  // color={getTagInfo(monthes, years, i)?.shortText}
                >
                  {getTagInfo(monthes, years, dayValue.type)?.shortText}
                </Tag>
              </div>
            ) : null}
          </div>
        </Popover>
      </div>
    </>
  );
};

export default memo(DateCellRender);
