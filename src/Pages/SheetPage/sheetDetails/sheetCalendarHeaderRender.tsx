import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import moment from 'moment';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Popover, Progress, Select, Tag, Tooltip } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import 'dayjs/locale/ka'; // Import the Georgian locale

import {
  fiilSheetDetails,
  fillTimeSheetsFilter,
  getTimeSheetDetailsById,
} from '../../../redux/slices/timeSheets';
import { getByContractId, getTimeSheets } from '../../../service/timeSheets';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { getTagInfo } from './dateCellRender';

function getContent(month: any, year: any) {
  if (month < 5 && year < 2024) {
    return (
      <div>
        <p>
          ფორმის პირობითი აღნიშვნებით შევსების შემთხვევაში გამოიყენეთ მითითებული
          ღილაკები:
        </p>
        <p>
          X - დასვენების და უქმე დღეები <br />
          შ - შვებულება ანაზღაურებადი <br />
          უ/შ - ანაზღაურების გარეშე შვებულება <br />
          ს/ფ - საავადმყოფო ფურცელი <br />
          დ/შ - დეკრეტული შვებულება (ანაზღაურებადი)
          <br />
          დ - დასვენება, უქმე დღე <br />
          გ - გაცდენა
          <br />
        </p>
      </div>
    );
  } else {
    return (
      <div>
        <p> დ - დასვენება/უქმე დღეები;</p>
        <p> ა/შ - ანაზღაურებადი შვებულება;</p>
        <p> უ/შ - ანაზღაურების გარეშე შვებულება</p>
        <p>დ/შ-ა - დეკრეტული შვებულება/ანაზღაურებადი</p>
        <p>დ/შ-უ -დეკრეტული შვებულება/ანაზღაურების გარეშე</p>
        <p>ს/ფ - საავადმყოფო ფურცელი</p>
        <p> გ - გაცდენა</p>
      </div>
    );
  }
}

const tagStyle: any = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 600,
  fontSize: 14,
  height: 25,
  width: 45,
  borderRadius: 12,
  cursor: 'pointer',
};

const SheetCalendarHeaderRender = ({ props }: any) => {
  const navigate = useNavigate();
  console.log('propspropsprops,props', props);
  const sheetDetail = useAppSelector(state => state.timeSheets.sheetDetails);
  const filter = useAppSelector(state => state.timeSheets.timeSheetsFilter);
  const currentOrganization = useAppSelector(
    state => state.user.currentOrganization
  );

  const dispatch = useAppDispatch();
  const { id, contractId } = useParams();
  const [displayMonth, setDidsplayMonth] = useState<number>(0);
  const [displayYear, setDidsplayYear] = useState<number>(0);
  const { monthes, years } = useParams();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  dayjs.locale('ka'); // Set the default locale to Georgian

  const endPointMonth = dayjs(`${years}-${monthes}-01`).format('MMMM');

  useEffect(() => {
    console.log('monthes, years', monthes, years);
    setDidsplayMonth(Number(monthes) - 1);
    setDidsplayYear(Number(years));
  }, []);

  useEffect(() => {
    console.log('locationlocation', location);

    let sheetId = null;
    let contractIdLocal = contractId;
    if (sheetDetail.id) {
      sheetId = sheetDetail.id;
    }
    if (sheetDetail.contractId) {
      contractIdLocal = sheetDetail.contractId;
    }

    console.log('sheetIdsheetId', sheetId, contractId);
    if (displayYear || displayMonth) {
      navigate(
        `/Sheet/${sheetId}/${contractIdLocal}/${displayMonth + 1}/${displayYear}`
      );
    }
  }, [displayYear, displayMonth, sheetDetail.id]);

  const start = 0;
  const end = 12;
  const monthOptions = [];

  let current = props.value.clone();
  console.log('propsprops', props);
  const localeData = props.value.localeData();
  const months = [];
  for (let i = 0; i < 12; i++) {
    current = current.month(i);
    months.push(localeData.monthsShort(current));
  }

  for (let i = start; i < end; i++) {
    monthOptions.push(
      <Select.Option key={i} value={i} className="month-item">
        {months[i]}
      </Select.Option>
    );
  }

  const year = props.value.year();
  const month = props.value.month();
  console.log('popomonth', month);
  const options = [];
  for (let i = year - 10; i < year + 10; i += 1) {
    options.push(
      <Select.Option key={i} value={i} className="year-item">
        {i}
      </Select.Option>
    );
  }

  // const getTittleMonth = () => {
  //   const displayMonth = setDidsplayMonth(Number(monthes) - 1);
  //   console.log('displayMonth', displayMonth);
  //   return <>{displayMonth}</>;
  // };

  const getMonthDetails = async (newMonth: any, newYear: any) => {
    console.log('ididididid', newMonth, id, sheetDetail);
    // dispatch(getTimeSheetDetailsById(id ?? ''));
    let result = await getByContractId({
      month: newMonth,
      // year: sheetDetail.year,
      year: newYear,
      contractId: contractId ?? sheetDetail.contractId,
    });
    console.log('result65', result);

    let { year, month } = result;
    console.log('year, month', year, month);
    if (!year) year = sheetDetail.year;
    if (!month) month = newMonth;

    dispatch(fiilSheetDetails({ ...result, year: year, month: month }));
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '5px 0 15px 15px',
        backgroundColor: '#DAECFF',
      }}
    >
      <div>
        {/* <h3>{dayjs().month(props.value.month()).format('MMMM')}</h3> */}
        <h3>{endPointMonth}</h3>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', paddingRight: 15 }}>
        <div style={{ paddingTop: 4, marginRight: 15 }}>
          <Select
            style={{ width: 80 }}
            dropdownMatchSelectWidth={false}
            className="my-year-select"
            value={displayYear}
            onChange={newYear => {
              const now = props.value.clone().year(newYear);
              getMonthDetails(now.month() + 1, now.year());
              setDidsplayYear(newYear);
              props.onChange(now);
            }}
          >
            {options}
          </Select>
          <Select
            style={{ width: 80, marginLeft: 15 }}
            dropdownMatchSelectWidth={false}
            value={displayMonth}
            onChange={(newMonth, newYear) => {
              const now = props.value.clone().month(newMonth);
              const adjustedMonth = Number(newMonth) + 1;
              getMonthDetails(adjustedMonth, displayYear);
              setDidsplayMonth(newMonth);
              props.onChange(now);
            }}
          >
            {monthOptions}
          </Select>
        </div>
        {monthes &&
          years &&
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i: any) => {
            return getTagInfo(monthes, years, i)?.shortText ? (
              <Tooltip
                title={getTagInfo(monthes, years, i)?.text}
                color={getTagInfo(monthes, years, i)?.color}
              >
                <Tag color={getTagInfo(monthes, years, i)?.color} style={tagStyle}>
                  {getTagInfo(monthes, years, i)?.shortText}
                </Tag>
              </Tooltip>
            ) : null;
          })}

        <Popover
          overlayInnerStyle={{
            color: 'red',
            background: '#f3b8d2',
          }}
          placement="bottomRight"
          content={getContent(monthes, years)}
          trigger="click"
        >
          <InfoCircleOutlined style={{ fontSize: 20, color: 'red' }} />
        </Popover>
      </div>
    </div>
  );
};

export default memo(SheetCalendarHeaderRender);
