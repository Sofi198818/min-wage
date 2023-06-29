import React, { useEffect, useState } from 'react';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, List, Progress, Radio, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useNavigate, useParams } from 'react-router';
import {
  fiilSheetDetails,
  getTimeSheetDetailsById,
  getTimeSheets,
  resetTimeSheetDetailsById,
} from '../../../redux/slices/timeSheets';
import { filter } from 'lodash';

const { Search } = Input;

const SearchInput = ({ dispatch, years, monthes, navigate }: any) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const { data } = useAppSelector(state => state.timeSheets.timeSheets);
  const currentOrganization = useAppSelector(
    state => state.user.currentOrganization
  );

  interface User {
    id: string;
    contractId: string;
    month: string;
    year: string;
  }
  const onSearch = (value: string, item: any) => {
    console.log('value', value);
    let paramsData = {
      ...filter,
      searchText: value,
      year: years,
      month: monthes,
      organizationIds: item.currentOrganization,
    };
    console.log('paramsData', paramsData);
    dispatch(getTimeSheets(paramsData));
    // const user: User[] = data.filter(
    //   (item: any) => `${item.firstName}` === value || `${item.lastName}` === value
    // );
    // console.log('user', user);
    console.log('data', data);
    // if (user) {
    //   dispatch(fiilSheetDetails(paramsData));
    //   // navigate(
    //   //   `${user[0].id}/${user[0].contractId}/${user[0].month}/${user[0].year}`
    //   // );
    // } else {
    //   console.log('User not found');
    // }

    // console.log('user', user);
    // console.log('user123', user);
  };

  return (
    <div style={{ marginTop: '10px' }}>
      <Search
        style={{ width: '90%', marginTop: '20px' }}
        placeholder="პირადი N, სახელი ან გვარი"
        onSearch={onSearch}
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />
    </div>
  );
};

export const SheetDetailFilter = () => {
  const { id, contractId, monthes, years } = useParams();
  const currentUserId = id;
  const currentContractId = contractId;

  const { data } = useAppSelector(state => state.timeSheets.timeSheets);
  console.log('sofidata', data);
  const { userId } = useAppSelector(state => state.timeSheets.sheetDetails);
  const filter = useAppSelector(state => state.timeSheets.timeSheetsFilter);
  const currentOrganization = useAppSelector(
    state => state.user.currentOrganization
  );
  console.log('sofiid', id);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');

  const onChange = (e: any, item: any) => {
    let paramsData = {
      ...filter,
      year: years,
      month: monthes,
      contractId: item.contractId,
    };
    console.log('itemss', item);
    if (item.id) {
      console.log('item.id', item.id);
      dispatch(getTimeSheetDetailsById(item.id));
    } else {
      console.log('paramsData', paramsData);
      // dispatch(getTimeSheets(paramsData));
      navigate(
        `/Sheet/${item?.id}/${item?.contractId}/${filter.month}/${filter.year}`
      );
      dispatch(resetTimeSheetDetailsById());
    }
    setValue(e.target.value);
    console.log('eeeee', e.target.value);
  };
  // const onSearch = (value: string, item: any) => {
  //   let paramsData = {
  //     ...filter,
  //     searchText: value,
  //     year: years,
  //     month: monthes,
  //     contractId: contractId,
  //   };
  //   console.log('paramsData', paramsData);
  //   // const user = data.find(
  //   //   (item: any) => `${item.firstName} ${item.lastName}` === value
  //   // );
  //   // dispatch(fiilSheetDetails(value));
  //   dispatch(getTimeSheets(paramsData));
  //   console.log('value', value);
  // };

  const filteredData = data.filter((item: any) =>
    `${item.firstName} ${item.lastName}`
      .toLowerCase()
      .includes(searchValue.toLowerCase())
  );

  // useEffect(() => {
  //   if (userId) {
  //     setValue(userId);
  //   }
  // }, [userId]);

  // useEffect(() => {
  //   if (currentUserId) {
  //     setValue(currentUserId);
  //     dispatch(getTimeSheetDetailsById(currentUserId));
  //   }
  // }, [currentUserId, dispatch, currentContractId]);

  useEffect(() => {
    if (currentContractId) {
      setValue(currentContractId);
      dispatch(getTimeSheetDetailsById(currentContractId));
    }
  }, [dispatch, currentContractId]);

  return (
    <>
      <div
        style={{
          backgroundColor: 'rgb(218, 236, 255)',
          width: 302,
          height: '80px',
          marginTop: 50,

          color: '#fff',
          margin: '0auto',
        }}
      >
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <SearchInput
            filter={filter}
            dispatch={dispatch}
            T
            years={years}
            monthes={monthes}
            contractId={contractId}
            navigate={navigate}
          />
        </div>
      </div>
      <List
        bordered
        dataSource={data}
        renderItem={(item: any) => {
          console.log('itemsof', item); // Output: the value of the item variable
          return (
            <Radio.Group onChange={(e: any) => onChange(e, item)} value={value}>
              <List.Item style={{ width: 300 }}>
                <Typography.Text>
                  <Radio value={item.contractId}>
                    {item.firstName} {item.lastName}
                  </Radio>
                </Typography.Text>
              </List.Item>
            </Radio.Group>
          );
        }}
      />
    </>
  );
};
