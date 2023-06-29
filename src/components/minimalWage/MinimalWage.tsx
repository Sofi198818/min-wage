import React from 'react';
import { Row, Col, Button, Space, Input, Select, Menu, Dropdown } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './MinimalWage.css';
import Doctor from '../../assets/images/doctor.svg';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { LOGIN_PAGE } from '../../router/paths';

export const MinimalWage = () => {
  const navigate = useNavigate();
  const { Option } = Select;

  const onClick = (key: any) => {
    if (key === '3') {
      localStorage.removeItem('accesstoken');
      // navigate('/login');
      window.location.href = LOGIN_PAGE;
      console.log('do something');
      console.log('error occurred');
    }
  };

  const menu = (
    <Menu
      onClick={onClick}
      items={[
        {
          label: 'მომხმარებლის მართვა',
          key: '1',
        },
        {
          label: 'პაროლის ცვლილება',
          key: '2',
        },

        {
          type: 'divider',
        },
        {
          label: 'გასვლა',
          key: '3',
        },
      ]}
    />
  );

  return (
    <>
      <Row>
        <Col span={1}></Col>
        <Col span={22}>
          <header className="flex-minimalwage">
            <div>
              <img
                style={{
                  width: '50px',
                  height: '45px',
                  margin: '0 auto',
                }}
                src={Doctor}
                alt="doctor"
              />
              <h4>მინიმალური ანაზღაურება</h4>
            </div>
            <div>
              <label>
                <div className="position">
                  <Input style={{ width: '12%' }} type="text" placeholder="ძიება" />
                </div>

                <div className="search-icon">
                  {' '}
                  <SearchOutlined />
                </div>
              </label>
            </div>
            <div className="header-user">
              <Dropdown overlay={menu} trigger={['click']}>
                <a onClick={e => e.preventDefault()}>
                  <Space>
                    <h2>ვაჟა ეზუგბაია {/* {user?.firstName} {user?.lastName} */}</h2>
                    <DownOutlined style={{ color: '#0B2180' }} />
                  </Space>
                </a>
              </Dropdown>
            </div>
          </header>
        </Col>
        <Col span={1}></Col>
      </Row>
    </>
  );
};
