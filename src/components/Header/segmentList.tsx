import React, { useState } from 'react';
import { Button, Row, Col, Space, Menu, Segmented, Affix } from 'antd';
import './segmentList.css';
import { Input } from 'antd';
import Doctor from '../../assets/images/doctor.svg';
import {
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  DownOutlined,
  BarsOutlined,
  AppstoreOutlined,
  UsergroupAddOutlined,
  TableOutlined,
  BranchesOutlined,
  BankOutlined,
} from '@ant-design/icons';

import type { MenuProps } from 'antd';
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';

export const SegmentList = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [active, setActive] = useState('/branch');

  useEffect(() => {
    console.log('window.location.pathname', window.location.pathname);
    let paths = window.location.pathname;
    setActive(paths);
  }, [window.location.pathname]);

  const segmentChange = (value: string | number) => {
    console.log('value', value, window.location.pathname);
    setActive(value.toString());
    navigate(value.toString());
  };

  return (
    <Affix offsetTop={0}>
      <Row>
        <Col
          style={{
            width: '89%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#046DF8',
            margin: '0px 100px 0px ',
            padding: '6px',
            borderRadius: '55px',
          }}
        >
          <div className="segment">
            <Segmented
              style={{
                backgroundColor: '#046DF8',
                color: '#fff',
                fontFamily: 'FiraGO',
                borderRadius: '55px',
              }}
              value={active}
              onChange={segmentChange}
              //   style={{ backgroundColor:'#046DF8'}}
              options={[
                {
                  label: 'ფილიალი',

                  value: '/branch',
                  icon: <BankOutlined />,
                },
                {
                  label: 'თანამშრომლები',
                  value: '/Employees',
                  icon: <UsergroupAddOutlined />,
                },
                {
                  label: 'ტაბელი',
                  value: '/Sheet',
                  icon: <TableOutlined />,
                },
              ]}
              onResize={undefined}
              onResizeCapture={undefined}
            />
          </div>
        </Col>
      </Row>
    </Affix>
  );
};
