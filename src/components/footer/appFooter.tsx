import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';
import React, { useState } from 'react';
import { Outlet } from 'react-router';
import { Header } from '../Header/Header';
import { SegmentList } from '../Header/segmentList';



export const AppFooter = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '20px 100px',
        }}
      >
        <div>
          <Button icon={<MailOutlined />} type="link">
            {' '}
            <a href="mailto: appsupport@ita.gov.ge"> appsupport@ita.gov.ge</a>
          </Button>
          <Button icon={<PhoneOutlined />} type="link">
            <a href="tel:1616">ტელ: 1616 </a>
            <a href="tel:0322510021 ">/ 032 251 00 21 </a>
          </Button>
        </div>

        <div>ყველა უფლება დაცულია © {new Date().getFullYear()}</div>
      </div>
    </Footer>
  );
};
