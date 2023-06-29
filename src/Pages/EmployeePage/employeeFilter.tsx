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
import { fillFilter, getEmployees } from '../../redux/slices/employeeSlice';

export const EmployeeFilter = () => {
  const userData = useAppSelector(state => state.user.userData);
  const navigate = useNavigate();
  const currentOrganization = useAppSelector(
    state => state.user.currentOrganization
  );
  const [form] = Form.useForm();
  const { Option } = Select;
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState();

  const onFinish = (values: any) => {
    console.log('Finish:', values);
    let newFilter = { ...values, OrganizationIds: currentOrganization || null };
    setFilter(newFilter);
    dispatch(fillFilter(newFilter));
    dispatch(getEmployees(newFilter));
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
        <Form.Item name="Position">
          <Select
            allowClear
            placeholder="აირჩიეთ პოზიცია"
            style={{ width: 180 }}
            options={[
              {
                value: 1,
                label: 'ექიმი',
              },
              {
                value: 2,
                label: 'ექთანი',
              },
            ]}
          />
        </Form.Item>

        <Form.Item name="firstName">
          <Input placeholder="სახელი" />
        </Form.Item>
        <Form.Item name="lastName">
          <Input placeholder="გვარი" />
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
