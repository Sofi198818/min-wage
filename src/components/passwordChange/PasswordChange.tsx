import React, { useEffect, useState, useRef, createRef } from 'react';
import { Button, Col, Form, Input, message, Row } from 'antd';
import './PasswordChange.css';
import Doctor from '../../assets/images/doctor.svg';
import Background from '../../assets/images/background.jpeg';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { fillPasswordRecoveryObject, loginUser } from '../../redux/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { LOGIN_PAGE, PASSWORDRECOVERY_PAGE } from '../../router/paths';
import { useNavigate } from 'react-router';
import { confirmRecovery } from '../../service/user';
import { showErrorMessage } from '../../utils';
import { BranchModal } from './BranchModal';

export const PasswordChange = () => {
  const [form] = Form.useForm();
  const [password, setPassword] = useState<any>(null);
  const [userName, setUserName] = useState<any>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const passwordRecoveryObject = useAppSelector(
    state => state.user.passwordRecoveryObject
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeUserName = (e: any) => {
    setUserName(e.target.value);
  };
  const changePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const onFinish = async (value: any) => {
    console.log('clicked', value);
    let resetObject = {
      ...passwordRecoveryObject,
      newPassword: value.newPassword,
      confirmPassword: value.repeatPassword,
    };

    try {
      setConfirmLoading(true);
      let result = await confirmRecovery(resetObject);

      message.success('პაროლი წარმატებით შეიცვალა');
      message.success('გაიარეთ ავტორიზაცია');
      navigate(LOGIN_PAGE);
    } catch (error: any) {
      console.log('errrror tryy', error);
      showErrorMessage(message, error);
    }
    setConfirmLoading(false);
    // dispatch(
    //   fillPasswordRecoveryObject({
    //     newPassword: value.newPassword,
    //     confirmPassword: value.repeatPassword,
    //   })
    // );

    console.log('resetObjectresetObject', resetObject);
    // dispatch(loginUser(obj));
  };
  const onClick1 = (e: any, key: any) => {
    navigate(key);
  };
  return (
    <>
      <Row>
        <Col span={24}></Col>
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
                  style={{
                    textAlign: 'center',
                  }}
                  name="newPassword"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Password!',
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="პაროლი"
                    style={{
                      width: '50%',
                      borderRadius: '46px',
                    }}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    onChange={e => changePassword(e)}
                  />
                </Form.Item>
                <Form.Item
                  style={{
                    textAlign: 'center',
                  }}
                  name="repeatPassword"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Password!',
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="გაიმეორეთ"
                    style={{
                      width: '50%',
                      borderRadius: '46px',
                    }}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    onChange={e => changePassword(e)}
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
                      borderRadius: '46px',
                    }}
                    loading={confirmLoading}
                    htmlType="submit"
                  >
                    შენახვა
                  </Button>
                  <Button
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: '15px auto',
                      // backgroundColor: '#046df8',
                      // color: '#fff',
                      width: '50%',
                      borderRadius: '46px',
                    }}
                    onClick={() => navigate(-1)}
                  >
                    უკან დაბრუნება
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
