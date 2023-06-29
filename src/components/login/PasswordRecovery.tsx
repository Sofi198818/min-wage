import React, { useEffect, useState, useRef, createRef } from 'react';
import { Button, Checkbox, Col, Form, Input, Row, Tooltip } from 'antd';
import './LoginSof.css';
import Doctor from '../../assets/images/doctor.svg';

import Background from '../../assets/images/background.jpeg';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { fillPasswordRecoveryObject, loginUser } from '../../redux/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  HOME_PATH,
  PASSWORDCHANGE_PAGE,
  PASSWORDRECOVERY_PAGE,
} from '../../router/paths';
import PDF from '../../assets/images/resume.pdf';
import { USER_MENEGEMENT_URL } from '../../constants';
import FormItem from 'antd/es/form/FormItem';
import { SmsControl } from './SmsContoller/SmsControl';
import { Navigate, useNavigate } from 'react-router';
import { HelpSection } from '../help/helpSection';

export const PasswordRecovery = ({ toggleForm }: any) => {
  const [form] = Form.useForm();
  const [smsCode, setSmsCode] = useState<any>(null);
  const [password, setPassword] = useState<any>(null);
  const [userName, setUserName] = useState<any>(null);
  const [mobileNumber, setMobileNumber] = useState<any>('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { personalID } = useAppSelector(state => state.user.userData.user);

  const changeUserName = (e: any) => {
    setUserName(e.target.value);
  };
  const changePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleClickChangePass = () => {
    console.log('you clicked');
    let securityCode = form.getFieldValue('securityCode');
    let userName = form.getFieldValue('userName');
    console.log('securityCodesecurityCode', securityCode, userName);

    dispatch(
      fillPasswordRecoveryObject({
        loginName: userName,
        securityCode: securityCode,
      })
    );
    navigate(PASSWORDCHANGE_PAGE);
  };
  const onFinish = (value: any) => {
    console.log('clicked', value);
    const obj = {
      userName: value.userName,
      password: value.password,
    };
    // dispatch(loginUser(obj));

    handleClickChangePass();
  };

  useEffect(() => {
    console.log('personalIDpersonalID', personalID);
    if (personalID) {
      form.setFieldsValue({
        userName: personalID,
      });
      setUserName(personalID);
    }
  }, [personalID]);

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
                name="ავტორიზაცია"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="userName"
                  style={{
                    textAlign: 'center',
                  }}
                  rules={[
                    {
                      required: true,
                      message: 'შეავსეთ მომხმარებელი!',
                    },
                  ]}
                >
                  <Input
                    placeholder="მომხმარებელი"
                    style={{
                      width: '50%',
                      borderRadius: '46px',
                      color: '#160303',
                    }}
                    color="#db1717"
                    prefix={<UserOutlined className="" />}
                    onChange={e => changeUserName(e)}
                    disabled={personalID ? true : false}
                  />
                </Form.Item>

                <Input.Group compact>
                  <FormItem
                    name="securityCode"
                    rules={[
                      {
                        required: true,
                        message: 'შეიყვანეთ კოდი!',
                      },
                    ]}
                    className="for-labelColor"
                  >
                    <Input
                      style={{
                        width: '88%',
                        height: '33px',
                        borderRadius: '46px',
                      }}
                      placeholder="__ __ __ __"
                      className="sms-input"
                      maxLength={4}
                      onChange={e => setSmsCode(e.target.value)}
                      prefix={
                        <Tooltip>
                          <SmsControl
                            userName={userName}
                            mobileNumber={mobileNumber}
                          />
                        </Tooltip>
                      }
                    />
                  </FormItem>
                </Input.Group>

                <Form.Item></Form.Item>

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
                    htmlType="submit"
                  >
                    შემდეგი
                  </Button>
                </Form.Item>
                <div className="">
                  <a href={USER_MENEGEMENT_URL}>ორგანიზაციის ავტორიზაცია</a>
                </div>
                <HelpSection />
              </Form>
            </div>
          </section>
        </Col>
      </Row>
    </>
  );
};
