import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';
import React, { useState } from 'react';
import { Outlet } from 'react-router';
import { AppFooter } from '../footer/appFooter';
import { Header } from '../Header/Header';
import { SegmentList } from '../Header/segmentList';

type Props = {
  children: any;
};

export const Layout = (props: Props) => {
  console.log('LayoutLayoutLayout');
  return (
    <div>
      <Header />
      <SegmentList />

      <Content style={{ margin: '20px 100px' }}>
        {/* {props.children} */}
        <Outlet />
      </Content>
     <AppFooter />
    </div>
  );
};
