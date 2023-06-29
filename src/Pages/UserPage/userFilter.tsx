import React, { useEffect, useState } from 'react';
import {
  ClearOutlined,
  LockOutlined,
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, Select, Tooltip } from 'antd';
import { useNavigate } from 'react-router';
import { ADD_NEW_EMPLOYEE, ADD_NEW_USER } from '../../router/paths';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUsers } from '../../redux/slices/userSlice';
import { getEmployees } from '../../redux/slices/employeeSlice';

export const UserFilter: React.FC = () => {
  const userData = useAppSelector(state => state.user.userData);
  const organizationsForSelect = useAppSelector(
    state => state.organization.organizationsForSelect
  );

  const navigate = useNavigate();

  const [form] = Form.useForm();
  const { Option } = Select;
  const dispatch = useAppDispatch();

  const onFinish = (values: any) => {
    console.log('Finish:', values);

    // dispatch(getEmployees(values));
    dispatch(getUsers(values));
  };

  return (
    <Form
      style={{ display: 'flex', justifyContent: 'space-between' }}
      form={form}
      name="horizontal_login"
      layout="inline"
      onFinish={onFinish}
    >
      <div style={{ display: 'flex' }}>
        <Form.Item name="personalId">
          <Input placeholder="პირადი N" />
        </Form.Item>

        <Form.Item name="firstName">
          <Input placeholder="სახელი" />
        </Form.Item>
        <Form.Item name="lastName">
          <Input placeholder="გვარი" />
        </Form.Item>
        <Form.Item
          name="organizationIds"
          // rules={[{ required: true, message: 'შეავსეთ ველი !' }]}
        >
          <Select
            mode="multiple"
            style={{ width: 300 }}
            allowClear
            placeholder="აირჩიეთ ფილიალი"
            filterOption={(input, option) => {
              console.log(input, option);
              return (option?.key ?? '').toLowerCase().includes(input.toLowerCase());
            }}
          >
            {organizationsForSelect?.map((item: any) => (
              <Option key={item.actualAddress} value={item.id}>
                {item.actualAddress}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
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
      </div>
      {userData.permissions && userData.permissions['Moderator'] ? (
        <Form.Item>
          <Button
            onClick={() => navigate(ADD_NEW_EMPLOYEE)}
            type="primary"
            icon={<PlusOutlined />}
          >
            თანამშრომლის დამატება
          </Button>
        </Form.Item>
      ) : null}
    </Form>
  );
};
