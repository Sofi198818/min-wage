import React, { memo, useEffect, useState } from 'react';
import {
  CalendarOutlined,
  CheckCircleOutlined,
  FieldTimeOutlined,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Card, Form, Input, List, Progress, Space, Tag } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fiilSheetDetails } from '../../../redux/slices/timeSheets';
import { GetDateTime } from '../../../Pipes/DatePipes';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const ListDescription = ({ item }: any) => {
  console.log('itemitem', item);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>{item?.text}</div>
      <div>{GetDateTime(item?.dateCreated)}</div>
    </div>
  );
};
const SheetDetailComments = () => {
  const sheetDetail = useAppSelector(state => state.timeSheets.sheetDetails);

  return (
    <div style={{marginBottom: 80}}>
      <List
        // itemLayout="vertical"
        style={
          sheetDetail.comments?.length > 4 ? { overflowY: 'scroll', height: 350 } : {}
        }
        itemLayout="horizontal"
        dataSource={sheetDetail.comments ?? []}
        renderItem={(item: any) => (
          <List.Item
          // actions={[
          //   <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
          //   <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
          //   <IconText
          //     icon={MessageOutlined}
          //     text="2"
          //     key="list-vertical-message"
          //   />,
          // ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  style={{ marginTop: 15 }}
                  size="large"
                  icon={<UserOutlined />}
                />
              }
              title={item.userName}
              description={<ListDescription item={item} />}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default memo(SheetDetailComments);
