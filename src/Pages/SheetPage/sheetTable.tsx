import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { Button, message, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { Sheet, SHEET_DETAILS } from '../../router/paths';
import {
  accessObjWithoutKey,
  errorMessageAlert,
  getActiveMonthForSheet,
} from '../../utils';
import { Pagination } from '../../types/Pagination';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getEmployees } from '../../redux/slices/employeeSlice';
import { MONTH } from '../../constants';
import {
  fiilSheetDetails,
  fillTimeSheetsFilter,
  getTimeSheets,
} from '../../redux/slices/timeSheets';
import dayjs, { Dayjs } from 'dayjs';

const { Column, ColumnGroup } = Table;

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const MonthTiTle = ({ name }: any) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Tag
        icon={<CalendarOutlined />}
        color="blue"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 600,
          fontSize: 14,
          height: 30,
        }}
      >
        {name}
      </Tag>
    </div>
  );
};

export const SheetTable = () => {
  // const history = useHistory();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { permissions } = useAppSelector(state => state.user.userData);

  const [pagination, setPagination] = useState<Pagination>({
    total: 1,
    current: 1,
    pageSize: 20,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
  });

  const { resources, data } = useAppSelector(state => state.timeSheets.timeSheets);
  const timeSheetsLoading = useAppSelector(
    state => state.timeSheets.timeSheetsLoading
  );

  const currentOrganization = useAppSelector(
    state => state.user.currentOrganization
  );

  const userData = useAppSelector(state => state.user.userData);
  const filter = useAppSelector(state => state.timeSheets.timeSheetsFilter);
  console.log('filter', filter);

  // useEffect(() => {
  //   dispatch(getTimeSheets(filter));
  // }, []);

  useEffect(() => {
    console.log('organization', dayjs().month());
    if (userData.permissions && userData.permissions['Manager']) {
      dispatch(
        getTimeSheets({ ...filter, OrganizationIds: currentOrganization || null })
      );
    }
  }, [userData]);

  useEffect(() => {
    console.log('organizationcurrentOrganization', currentOrganization);
    if (currentOrganization) {
      let newFilter = { ...filter, OrganizationIds: currentOrganization || null };
      // setFilter(newFilter);
      dispatch(fillTimeSheetsFilter(newFilter));
      dispatch(getTimeSheets(newFilter));
    }
  }, [currentOrganization]);

  useEffect(() => {
    if (resources) {
      fillTimeSheetsFilter(resources);
      setPagination({
        current: resources.pageIndex,
        pageSize: resources.pageSize,
        total: resources.totalCount,
      });
    }
  }, [resources]);

  const getMonthName = () => {
    // const date = new Date();
    // date.setMonth(monthNumber - 1);
    let currentActiveMonth = getActiveMonthForSheet();

    // console.log('currentActiveMonthcurrentActiveMonth45', currentActiveMonth,MONTH[currentActiveMonth.month()].name);
    // // return date.toLocaleString('ka-GE', { month: 'long' });
    // console.log('filterfilterfilter', filter);
    console.log('monthNumbermonthNumber87', filter);
    // return MONTH[monthNumber-1].name;
    return dayjs()
      .month(filter.month - 1)
      .format('MMMM');
  };

  const onChangePagination = (pageIndex: any, pageSize: any) => {
    console.log('change pag', pageIndex, pageSize);
    let filterData = {
      ...filter,
      pageIndex: pageIndex,
      pageSize: pageSize,
      // personalNumber: filter.personalNumber,
    };
    dispatch(fillTimeSheetsFilter(filterData));
    dispatch(getTimeSheets(filterData));
  };

  const onShowSizeChangePagination = (current: any, size: any) => {
    console.log(8741, current, size);
    setPagination({ ...pagination, current: 1, pageSize: size });
    let filterData = {
      pageIndex: 1,
      pageSize: size,
      // personalNumber: filter.personalNumber,
    };
    dispatch(fillTimeSheetsFilter(filterData));
    dispatch(getTimeSheets(filterData));
  };

  const goToDetails = (record: any) => {
    console.log('recordrecordrecord', record);
    let newRecord = { ...record };
    console.log('sofiinewRecord', newRecord);
    // if (!newRecord.year) {
    //   newRecord.year = filter.year;
    //   newRecord.month = filter.month;
    // }
    dispatch(fiilSheetDetails(newRecord));
    // navigate(`${newRecord?.id}`);
    navigate(
      `${newRecord?.id}/${newRecord?.contractId}/${filter.month}/${filter.year}`
    );
    // navigate({
    //   pathname: '/Sheet',
    //   search: `?sheetId=${newRecord?.id}contractId=${newRecord?.contractId}`,
    // });
  };
  return (
    <Table
      dataSource={data}
      loading={timeSheetsLoading}
      pagination={{
        ...pagination,
        onChange: onChangePagination,
        onShowSizeChange: onShowSizeChangePagination,
        showTotal: (total: any) => `სულ  ${total} `,
      }}
      rowKey={(row: any, index: any) => {
        return index;
      }}
    >
      <Column
        title="სტატუსი"
        key="action"
        render={(_, record: any) =>
          record?.isFullyFilled ? (
            <CheckCircleOutlined style={{ color: 'lime', fontSize: 25 }} />
          ) : (
            <CloseCircleOutlined style={{ color: 'red', fontSize: 25 }} />
          )
        }
      />
      <Column
        title="სახელი გვარი (პირადი ნომერი)"
        dataIndex="firstNameLastNamePersonalNumber"
        key="firstNameLastNamePersonalNumber"
        render={(_: any, record: any) => (
          <span>
            {record.firstName} {record.lastName} {record.personalId}
          </span>
        )}
      />
      <Column
        title="ფილიალი/პოზიცია"
        dataIndex="branchPosition"
        key="branchPosition"
        render={(_: any, record: any) => (
          <span>
            {record.name} / {record.positionName}
          </span>
        )}
      />
      <Column
        title="განყოფილება"
        dataIndex="departmentName"
        key="departmentName"
        render={(_: any, record: any) => {
          console.log('soporecird', record); // Add the console.log statement here

          return <span>{record.departmentName}</span>;
        }}
      />
      <Column
        title="კონტრაქტის დაწყების თარიღი"
        dataIndex="contractStartDate"
        key="contractStartDate"
        render={(_: any, record: any) => {
          const contractStartDate = dayjs(record.contractStartDate).format(
            'YYYY-MM-DD'
          );
          return <span>{contractStartDate}</span>;
        }}
      />

      <ColumnGroup title={<MonthTiTle name={getMonthName()} />}>
        <Column
          align={'center'}
          title="ფორმა"
          dataIndex="firstName"
          key="firstName"
          render={(_: any, record: any) => (
            <Button
              onClick={() => goToDetails(record)}
              type="primary"
              shape="round"
              icon={<PlusOutlined />}
            >
              {permissions && permissions['Moderator'] ? 'შევსება' : 'ნახვა'}
            </Button>
          )}
        />
      </ColumnGroup>
      <Column
        align={'center'}
        title="ნამუშევარი დღეები"
        dataIndex="totalDays"
        key="totalDays"
      />
      <ColumnGroup title="ნამუშევარი საათები">
        <Column
          align={'center'}
          title="სულ"
          dataIndex="totalHours"
          key="totalHours"
        />
        <Column
          align={'center'}
          title={
            <span
              style={{
                marginLeft: '20px',
                marginBottom: '8px',
                display: 'inline-block',
                transform: 'rotate(-15deg)',
              }}
            >
              ზეგანაკვეთური
            </span>
          }
          dataIndex="overTime"
          key="overTime"
        />
        <Column
          align={'center'}
          title={
            <span style={{ display: 'inline-block', transform: 'rotate(-15deg)' }}>
              ღამე
            </span>
          }
          dataIndex="night"
          key="night"
        />
        <Column
          align={'center'}
          title={
            <span style={{ display: 'inline-block', transform: 'rotate(-15deg)' }}>
              დასვენება
            </span>
          }
          dataIndex="holiday"
          key="holiday"
        />
        <Column
          align={'center'}
          title={
            <span style={{ display: 'inline-block', transform: 'rotate(-15deg)' }}>
              სხვა
            </span>
          }
          dataIndex="other"
          key="other"
        />
      </ColumnGroup>
      <Column
        align={'center'}
        title={
          <span
            style={{
              marginTop: '30px',
              display: 'inline-block',
              transform: 'rotate(-15deg)',
            }}
          >
            გაცემული შრომის ანაზღაურება
          </span>
        }
        dataIndex="salary"
        key="salary"
      />
    </Table>
  );
};
