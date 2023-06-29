import React from 'react';
import { Button, Result as AntResult } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

export const Result = ({ status }: any) => {
  console.log('statuuuuus', status);
  const navigate = useNavigate();


  return (
    <AntResult
      status={status}
      title={status}
      subTitle="თქვენ არ გაქვთ ამ გვერდზე წვდომის უფლება ."
      extra={<Button onClick={() => navigate(-1)} type="primary" icon = {<LeftOutlined />}>უკან დაბრუნება</Button>}
    />
  );
};
