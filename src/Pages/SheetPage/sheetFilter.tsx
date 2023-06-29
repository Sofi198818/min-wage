import React, { useEffect, useState } from 'react';
import {
  ClearOutlined,
  LockOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { Button, DatePicker, Form, Input, message, Select, Tooltip } from 'antd';
import { Pagination } from '../../types/Pagination';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router';

import { getEmployees } from '../../redux/slices/employeeSlice';
import { fillTimeSheetsFilter, getTimeSheets } from '../../redux/slices/timeSheets';
import { errorMessageAlert, getActiveMonthForSheet } from '../../utils';
import dayjs, { Dayjs } from 'dayjs';

type FilterData = {
  status: string;
  searchText: string;
  yearMonth: Dayjs;
  IsFullyFilled: boolean;
};
const monthFormat = 'YYYY/MM';

export const SheetFilter: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [pagination, setPagination] = useState<Pagination>({
    total: 1,
    current: 1,
    pageSize: 20,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
  });

  const { timeSheets, timeSheetsErrors, timeSheetsLoading } = useAppSelector(
    state => state.timeSheets
  );

  const currentOrganization = useAppSelector(
    state => state.user.currentOrganization
  );

  const filter = useAppSelector(state => state.timeSheets.timeSheetsFilter);
  // const [filter, setFilter] = useState({
  //   pageIndex: 1,
  //   pageSize: 10,
  //   totalCount: 10,
  //   year: null,
  //   month: null,
  // });

  const onFinish = (values: FilterData) => {
    console.log('Finish:', values, filter);
    let filterData = {
      ...filter,
      pageIndex: 1,
      OrganizationIds: currentOrganization || null,
      searchText: values.searchText,
      IsFullyFilled: values.IsFullyFilled,
      year: values.yearMonth?.year(),
      month: !isNaN(values.yearMonth?.month())
        ? values.yearMonth?.month() + 1
        : null,
    };

    dispatch(fillTimeSheetsFilter(filterData));
    console.log('filterDatafilterData 00', filter);
    console.log('filterDatafilterData 11', filterData);
    dispatch(getTimeSheets(filterData));
  };

  useEffect(() => {
    let currentActiveMonth = getActiveMonthForSheet();
    console.log(
      'currentActiveMonthcurrentActiveMonth',
      currentActiveMonth.toString(),
      dayjs(new Date(filter.year, filter.month - 1, 1).toString())
    );
    form.setFieldsValue({
      // yearMonth: dayjs(new Date(filter.year, filter.month - 1, 1).toString()),
      yearMonth: filter.month
        ? dayjs(new Date(filter.year, filter.month - 1, 1))
        : currentActiveMonth,
    });
  }, []);

  useEffect(() => {
    if (timeSheetsErrors.length) {
      console.log('timeSheetsErrorstimeSheetsErrors', timeSheetsErrors);
      errorMessageAlert(message, timeSheetsErrors);
    }
  }, [timeSheetsErrors]);

  return (
    <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
      <Form.Item name="IsFullyFilled">
        <Select
          placeholder={'სტატუსი'}
          style={{ width: 240 }}
          options={[
            { value: true, label: 'სრულად შევსებული' },
            { value: false, label: 'არასრულად შევსებული' },
          ]}
        />
      </Form.Item>
      <Form.Item name="searchText">
        <Input placeholder="პირადი N, სახელი ან გვარი" />
      </Form.Item>
      <Form.Item name="yearMonth">
        <DatePicker placeholder="წელი-თვე" picker="month" />
      </Form.Item>
      <Form.Item>
        <Button
          loading={timeSheetsLoading}
          type="primary"
          htmlType="submit"
          icon={<SearchOutlined />}
        >
          ძიება
        </Button>
        <Tooltip title="გასუფთავება">
          <Button
            style={{ marginLeft: 15 }}
            onClick={() => form.resetFields()}
            icon={<ClearOutlined />}
          ></Button>
        </Tooltip>
      </Form.Item>
    </Form>
  );
};
