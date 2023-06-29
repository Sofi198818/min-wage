/*  */ import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  CheckOutlined,
  FieldTimeOutlined,
  InfoCircleOutlined,
  LeftOutlined,
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
  Tag,
  Tooltip,
} from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/ka'; // import Georgian locale for dayjs
import type { Dayjs } from 'dayjs';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import type { PickerLocale } from 'antd/es/date-picker/generatePicker';
// import type { Locale } from 'dayjs/locale';
import mapKeys from 'lodash/mapKeys';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  fiilSheetDetails,
  resetSubmitTimeSheetDetailsErrors,
  resetSubmitTimeSheetDetailsSuccess,
  resetUpdateTimeSheetDetailsErrors,
  resetUpdateTimeSheetDetailsSuccess,
  submitTimeSheetDetails,
  updateTimeSheetDetails,
} from '../../../redux/slices/timeSheets';
import { errorMessageAlert, getActiveMonthForSheet } from '../../../utils';
import DateCellRender from './dateCellRender';
import { useNavigate, useParams } from 'react-router';
import SheetCalendarHeaderRender from './sheetCalendarHeaderRender';

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const monthCellRender = (value: Dayjs) => {
  const num = getMonthData(value);
  return num ? (
    <div>
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
};

const SheetCalendar = () => {
  // const [defaultValue, setDefaultValue] = useState(() => getActiveMonthForSheet());
  const [defaultValue, setDefaultValue] = useState<Dayjs>();

  const sheetDetail = useAppSelector(state => state.timeSheets.sheetDetails);

  const { permissions } = useAppSelector(state => state.user.userData);
  const { monthes, years } = useParams();

  useEffect(() => {
    if (monthes) {
      console.log('monthesmonthes', dayjs().month(Number(monthes) - 1));
      setDefaultValue(dayjs().month(Number(monthes) - 1));
    }
  }, [monthes]);

  const navigate = useNavigate();

  const addTimeSheetDetailsCommentSuccessResult = useAppSelector(
    state => state.timeSheets.addTimeSheetDetailsCommentSuccessResult
  );
  const submitTimeSheetDetailsErrors = useAppSelector(
    state => state.timeSheets.submitTimeSheetDetailsErrors
  );
  const submitTimeSheetDetailsLoading = useAppSelector(
    state => state.timeSheets.submitTimeSheetDetailsLoading
  );
  const submitTimeSheetDetailsSuccess = useAppSelector(
    state => state.timeSheets.submitTimeSheetDetailsSuccess
  );

  const updateTimeSheetDetailsErrors = useAppSelector(
    state => state.timeSheets.updateTimeSheetDetailsErrors
  );
  const updateTimeSheetDetailsSuccess = useAppSelector(
    state => state.timeSheets.updateTimeSheetDetailsSuccess
  );
  const updateTimeSheetDetailsLoading = useAppSelector(
    state => state.timeSheets.updateTimeSheetDetailsLoading
  );

  const dispatch = useAppDispatch();

  const expensiveDateCellRender = (value: Dayjs) => {
    console.log('dateCellRenderdateCellRender', sheetDetail);
    // return <> </>;

    return <DateCellRender value={value} />;
  };

  const vount = 6;
  const dateCellRender = useCallback(
    (value: Dayjs) => expensiveDateCellRender(value),
    [sheetDetail.cells]
  );

  // const dateCellRender = (value: Dayjs) => {
  //   console.log('dateCellRenderdateCellRender');
  //   return <DateCellRender value={value} />;
  // };

  // const dateCellRender = useCallback(
  //   (value: Dayjs) => {
  //     return <DateCellRender value={value} />;
  //   },
  //   [sheetDetail.cells]
  // );

  useEffect(() => {
    console.log('985874', updateTimeSheetDetailsSuccess);
    if (updateTimeSheetDetailsSuccess) {
      console.log(
        'addTimeSheetDetailsCommentSuccessResult',
        addTimeSheetDetailsCommentSuccessResult
      );

      navigate(
        `/Sheet/${addTimeSheetDetailsCommentSuccessResult}/${sheetDetail.contractId}/${sheetDetail.month}/${sheetDetail.year}`
      );

      message.success('წარმატებით დასრულდა');
      dispatch(resetUpdateTimeSheetDetailsSuccess(false));
    }
  }, [updateTimeSheetDetailsSuccess]);

  useEffect(() => {
    console.log('985874', updateTimeSheetDetailsSuccess);
    if (submitTimeSheetDetailsSuccess) {
      message.success('წარმატებით დასრულდა');
      dispatch(resetSubmitTimeSheetDetailsSuccess(false));
    }
  }, [submitTimeSheetDetailsSuccess]);

  useEffect(() => {
    if (submitTimeSheetDetailsErrors.length) {
      errorMessageAlert(message, submitTimeSheetDetailsErrors);
      dispatch(resetSubmitTimeSheetDetailsErrors([]));
    }
  }, [submitTimeSheetDetailsErrors]);

  useEffect(() => {
    if (updateTimeSheetDetailsErrors.length) {
      errorMessageAlert(message, updateTimeSheetDetailsErrors);
      dispatch(resetUpdateTimeSheetDetailsErrors([]));
    }
  }, [updateTimeSheetDetailsErrors]);

  const handleSave = () => {
    console.log('handleSavehandleSave', years, monthes, sheetDetail);

    let sheetDetailData = {
      ...sheetDetail,
      year: years,
      month: monthes,
      submitted: false,
    };

    dispatch(updateTimeSheetDetails(sheetDetailData));
  };

  const onSelectDate = (date: Dayjs) => {
    console.log(9698, date.year(), date.month());
  };

  const handleSubmit = () => {
    console.log('asas', sheetDetail);
    let submitedData = { ...sheetDetail, submitted: true };
    dispatch(submitTimeSheetDetails(submitedData));
  };

  const disabledDate = (date: Dayjs) => {
  

    if (date < dayjs(sheetDetail.contractStartDate)) {
      return true;
    }
    if (date.subtract(1, 'day') > dayjs(sheetDetail.contractEndDate)) {
      return true;
    }
    if (sheetDetail.submitted) {
      return true;
    }
    // if (
    //   Number(years) == 2023 &&
    //   (Number(monthes) == 1 || Number(monthes) == 2 || Number(monthes) == 3)
    // ) {
    //   return false;
    // }
    // console.log('date345', date.month())
    // if (date.month() + 1 != Number(monthes)) {
    //   return true;
    // }

    var currentDate = dayjs();

    // console.log('datedate2323', date.month());
    // if (date.month() == 1 || date.month() == 0 || date.month() == 2) {
    //   return false;
    // }
    // if (date.month() + 1 === Number(monthes)) {
    //   console.log('popodate.month()', date.month() + 1);
    //   return false;
    // }
    // if (
    //   currentDate.date() > 10
    // ){

    // }

    // if (
    //   currentDate.date() <= 25 &&
    //   (date.month() > currentDate.month() ||
    //     date.month() < currentDate.subtract(1, 'month').month())
    // ) {
    //   // if (dayjs(sheetDetail.contractEndDate) <= date && date.month() == currentDate.subtract(1, 'month').month()) {
    //   //   console.log('თებერბვალიი');
    //   //   return false;
    //   // }

    //   console.log('iff111 აპრილიი', date.date());
    //   return true;
    // }
    // if (currentDate.date() > 25 && date.month() != currentDate.month()) {
    //   console.log('iff322222', date.month(), currentDate.month());

    //   return true;
    // }

    console.log('65456');
    return false;
  };

  type HeaderProps = {
    value: Dayjs;
    type: string;
    onChange: () => void;
    onTypeChange: () => void;
  };

  const activeMonth = useAppSelector(state => state.timeSheets.activeMonth);

  useEffect(() => {}, [monthes, years]);

  const disableSubmitButton = () => {
    let today = dayjs(); //monthes, years
    if (
      (Number(years) == 2023 && (Number(monthes) == 1 || Number(monthes) == 2)) ||
      Number(monthes) == 3
    ) {
      return false;
    }
    if (today.date() < 15 || today.date() > 25) {
      return true;
    }
    return false;
  };

  dayjs.locale('ka');

  const georgianLocale: PickerLocale = {
    lang: {
      shortWeekDays: ['ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ', 'კვი'],
    },
  } as PickerLocale & { lang: { weekFormat: string[] } };

  return (
    <div>
      <Button
        style={{ marginTop: 5, marginBottom: 9 }}
        onClick={() => navigate('/Sheet')}
        icon={<LeftOutlined />}
      >
        უკან
      </Button>
      <Calendar
        locale={georgianLocale}
        headerRender={(props: any) => <SheetCalendarHeaderRender props={props} />}
        disabledDate={(date: Dayjs) => disabledDate(date)}
        onSelect={onSelectDate}
        value={defaultValue}
        dateFullCellRender={(value: any) => dateCellRender(value)}
        monthCellRender={monthCellRender}
      />
      {permissions && permissions['Moderator'] ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>
            {' '}
            <Button onClick={() => navigate('/Sheet')} icon={<LeftOutlined />}>
              უკან
            </Button>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 15,
              marginTop: 10,
            }}
          >
            {/* <Button
              loading={submitTimeSheetDetailsLoading}
              onClick={handleSubmit}
              icon={<CheckOutlined />}
              disabled={disableSubmitButton()}
            >
              დადასტურება
            </Button> */}
            <Button
              loading={updateTimeSheetDetailsLoading}
              onClick={handleSave}
              type="primary"
              icon={<SaveOutlined />}
            >
              შენახვა
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default memo(SheetCalendar);
