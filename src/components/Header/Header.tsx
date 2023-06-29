import React, { useState, useEffect } from 'react';
import {
  Button,
  Row,
  Col,
  Space,
  Menu,
  Segmented,
  Badge,
  Avatar,
  Select,
} from 'antd';
// import './NewHeader.css';
import { Input } from 'antd';
import Doctor from '../../assets/images/doctor.svg';
import {
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  DownOutlined,
  BarsOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { DropdownComponent } from './DropdownComponent';
import Polygon from './ImagesForHeader/Polygon.png';
import { LOGIN_PAGE } from '../../router/paths';
import { UserDropDown } from './userDropDown';
import { SegmentList } from './segmentList';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getOrganizationsForSelect } from '../../redux/slices/organizationSlice';
import { setCurrentOrganization } from '../../redux/slices/userSlice';

const { Search } = Input;
const { Option } = Select;

const onSearch = (value: string) => console.log(value);

export const Header = () => {
  const organizationsForSelect = useAppSelector(
    state => state.organization.organizationsForSelect
  );
  const currentOrganization = useAppSelector(
    state => state.user.currentOrganization
  );

  const userData = useAppSelector(state => state.user.userData);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const signOut = () => {
    localStorage.clear();
    navigate(LOGIN_PAGE);
    // window.location.reload();

    console.log('გასვლა', localStorage);
  };

  useEffect(() => {
    console.log('userDatauserData', userData);
    if (
      userData.permissions &&
      userData.permissions['Moderator'] &&
      !organizationsForSelect.length
    ) {
      dispatch(getOrganizationsForSelect());
    }
  }, [userData]);

  useEffect(() => {
    let currentOrganization = localStorage.getItem('currentOrganization');
    dispatch(setCurrentOrganization(currentOrganization ?? ''));
  }, []);

  const handleChangeOrganization = (value: any) => {
    console.log('handleChangeOrganization', value);
    localStorage.setItem('currentOrganization', value);
    dispatch(setCurrentOrganization(value));
  };

  return (
    <div
      style={{
        height: '101.75px',
        margin: '10px 100px 0 100px',

        borderRadius: 10,
        padding: 15,
        // backgroundColor: '#DDE0E4',
        backgroundColor: '#ffffff',
      }}
    >
      <Row className="H_Row">
        <Col xl={8} md={8} style={{ display: 'flex' }}>
          <img style={{ width: '48px', height: '48px' }} src={Doctor} />
          <h1 style={{ fontSize: '20px', fontFamily: 'FiraGO', marginLeft: '16px' }}>
            მინიმალური ანაზღაურება
          </h1>
        </Col>
        <Col
          xl={8}
          md={8}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          {/* <Search
            placeholder="   ძიება"
            style={{ width: '357px' }}
            onSearch={onSearch}
          /> */}
          {userData.permissions && userData.permissions['Moderator'] ? (
            <Select
              style={{
                width: '80%',
                borderRadius: '46px',
                marginBottom: '10px',
              }}
              value={currentOrganization}
              onChange={handleChangeOrganization}
              // showSearch
              // optionFilterProp="children"
            >
              {organizationsForSelect?.map((d: any) => {
                return (
                  <Option key={d.id} value={d.id}>
                    {d.actualAddress}
                  </Option>
                );
              })}
            </Select>
          ) : null}
        </Col>
        <Col
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}
          xl={8}
          md={8}
        >
          <UserDropDown />

          <div
            style={{
              display: 'flex',
              width: '210px',
              justifyContent: 'space-between',
            }}
          >
            {/* <Badge count={5} style={{ cursor: 'pointer' }}>
              <BellOutlined style={{ fontSize: '22px', marginLeft: 20 }} />
            </Badge> */}
          </div>
        </Col>
      </Row>
    </div>
  );
};
