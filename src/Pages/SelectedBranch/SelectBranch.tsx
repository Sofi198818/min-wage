import React, { useEffect, useState, useRef, createRef } from 'react';
import { Button, Checkbox, Col, Form, Input, Row, Tooltip } from 'antd';
import { Select } from 'antd';
import './SelectedBranch.css';
import Doctor from '../../assets/images/doctor.svg';

import Background from '../../assets/images/background.jpeg';

import { LockOutlined, UserOutlined } from '@ant-design/icons';

import { loginUser } from '../../redux/slices/userSlice';
import { useAppDispatch } from '../../hooks';

import { USER_MENEGEMENT_URL } from '../../constants';

import FormItem from 'antd/es/form/FormItem';

import { Navigate, useNavigate } from 'react-router';

export const SelectedBranch = () => {
  const [form] = Form.useForm();
  const [smsCode, setSmsCode] = useState<any>(null);
  const [password, setPassword] = useState<any>(null);
  const [userName, setUserName] = useState<any>(null);
  const [mobileNumber, setMobileNumber] = useState<any>('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeUserName = (e: any) => {
    setUserName(e.target.value);
  };
  const changePassword = (e: any) => {
    setPassword(e.target.value);
  };

  // const onFinish = (value: any) => {
  //   console.log('clicked', value);
  //   const obj = {
  //     userName: value.userName,
  //     password: value.password,
  //   };
  //   dispatch(loginUser(obj));
  // };

  const onChange = (value: any) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value: any) => {
    console.log('search:', value);
  };
  const onClick1 = (e: any, key: any) => {
    console.log('here');
    Navigate(key);
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <div className="flex-header">
            <img src={Doctor} alt="doctor" />
            <h3>მინიმალური ანაზღაურება</h3>
          </div>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <section className="bg">
            <div className="content-inside">
              <Form
                form={form}
                name="აირჩიე ფილიალი"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                // onFinish={onFinish}
              >
                <Form.Item
                  name="userName"
                  style={{
                    textAlign: 'center',
                  }}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Username!',
                    },
                  ]}
                >
                  <Select
                    style={{ width: '50%', borderRadius: '46px' }}
                    showSearch
                    placeholder="ვაჟა-ფშაველა"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    options={[
                      {
                        value: 'jack',
                        label: 'Jack',
                      },
                      {
                        value: 'lucy',
                        label: 'Lucy',
                      },
                      {
                        value: 'tom',
                        label: 'Tom',
                      },
                    ]}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: '0 auto',
                      backgroundColor: '#046df8',
                      color: '#fff',
                      width: '50%',
                      height: '30px',
                      borderRadius: '46px',
                    }}
                    type="link"
                    // onClick={handleClickChangePass}
                  >
                    შემდეგი
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </section>
        </Col>
      </Row>
    </>
  );
};
