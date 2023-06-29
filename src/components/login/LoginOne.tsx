import React, { useEffect, useState, useRef, createRef } from 'react';
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
} from 'antd';
import './LoginSof.css';
import Doctor from '../../assets/images/doctor.svg';

import Background from '../../assets/images/background.jpeg';

import { LockOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import { fillUserData, initialState, loginUser } from '../../redux/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { PASSWORDRECOVERY_PAGE } from '../../router/paths';
import PDF from '../../assets/files/help.pdf';
import { USER_MENEGEMENT_URL } from '../../constants';
import { useNavigate } from 'react-router';
import { login } from '../../service/user';
import { errorMessageAlert, showErrorMessage } from '../../utils';
import {
  fillOrganizationForSelect,
  resetOrganizationsForSelectSucces,
} from '../../redux/slices/organizationSlice';
import { BranchModal } from '../passwordChange/BranchModal';
import { getOrganizationsForSelect } from '../../service/organizations';
import { AppFooter } from '../footer/appFooter';
import { HelpSection } from '../help/helpSection';
const { Option } = Select;

export const LoginOne = () => {
  const [form] = Form.useForm();
  const [password, setPassword] = useState<any>(null);
  const [userName, setUserName] = useState<any>(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const organizationsForSelectError = useAppSelector(
    state => state.organization.organizationsForSelectError
  );

  const changeUserName = (e: any) => {
    setUserName(e.target.value);
  };
  const changePassword = (e: any) => {
    setPassword(e.target.value);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form1] = Form.useForm();
  const organizationsForSelect = useAppSelector(
    state => state.organization.organizationsForSelect
  );
  const organizationsForSelectSucces = useAppSelector(
    state => state.organization.organizationsForSelectSucces
  );
  const organizationsForSelectLoading = useAppSelector(
    state => state.organization.organizationsForSelectLoading
  );

  useEffect(() => {
    localStorage.clear();
    dispatch(fillUserData(initialState));
  }, []);

  // useEffect(() =>{
  //   console.log('organizationsForSelectSucces',organizationsForSelectSucces)
  //   if(organizationsForSelectSucces){
  //     showModal()
  //     dispatch(resetOrganizationsForSelectSucces())
  //   }
  // },[organizationsForSelectSucces])

  // useEffect(() =>{
  //   console.log('121212',organizationsForSelectError)
  //   // message.error('121212')
  //   // message.error('121212')
  //   if(organizationsForSelectError){
  //     console.log('121212aaaa',organizationsForSelectError)
  //     errorMessageAlert(message, organizationsForSelectError);
  //     // message.error(`12121212`);
  //     // Object.entries(organizationsForSelectError || {}).forEach(([key, value]) => {
  //     //   console.log('343434',key, value)
  //     //   message.error(`${value}`, 5);
  //     // });
  //   }
  // },[organizationsForSelectError]);

  const onFinish = async (value: any) => {
    console.log('clicked', value);
    if (value.userName.length == 9) {
      message.error('გთხოვთ გაიაროთ ორგანიზაციის ავტორიზაცია');
      return;
    }
    const obj = {
      userName: value.userName,
      password: value.password,
    };

    let formData = new FormData();
    formData.append('userName', value.userName);
    formData.append('password', value.password);

    try {
      setLoginLoading(true);
      let result = await login(formData);
      console.log('resultresult', result);
      // showModal();
      // dispatch(getOrganizationsForSelect());
      let orgSelectResult = await getOrganizationsForSelect();

      console.log('orgSelectResult', orgSelectResult);
      if (orgSelectResult.length) {
        dispatch(fillOrganizationForSelect(orgSelectResult));
        showModal();
      }
      dispatch(fillUserData(result));
      localStorage.setItem('userData', JSON.stringify(result));

      // message.success('');
    } catch (error: any) {
      console.log('errorr', error);
      // showErrorMessage(message, error);
      // message.error('მომხმარებელი ან პაროლი არასწორია !');
      errorMessageAlert(message, error.response.data.Errors);
    }

    setLoginLoading(false);
  };

  const handleClickPassRecovery = () => {
    console.log('you clicked');
    navigate(PASSWORDRECOVERY_PAGE);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinishOrganization = (value: any) => {
    console.log('valuevaluevalue', value);
    localStorage.setItem('currentOrganization', value.organization);
    navigate('/');
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

      <Modal
        width={500}
        title="ფილიალის არჩევა"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <>
          <Row>
            <Col span={24}></Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form
                form={form1}
                name="აირჩიე ფილიალი"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinishOrganization}
              >
                <Form.Item
                  name="organization"
                  style={{
                    textAlign: 'center',
                  }}
                  rules={[
                    {
                      required: true,
                      message: 'აირჩიეთ ფილიალი!',
                    },
                  ]}
                >
                  <Select
                    style={{
                      width: '90%',
                      borderRadius: '46px',
                      marginBottom: '10px',
                    }}
                    placeholder="აირჩიეთ"
                    loading={organizationsForSelectLoading}
                    // showSearch
                    // optionFilterProp="children"
                  >
                    {organizationsForSelect?.map((d: any) => {
                      return (
                        <Option key={d.id} value={d.id}>
                          {d.actualAddress}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>

                <Form.Item>
                  <Button
                    style={{
                      display: 'flex',
                      marginTop: '7px',
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: '0 auto',
                      marginBottom: '120px',
                      backgroundColor: '#046df8',
                      color: '#fff',
                      width: '90%',
                      height: '30px',
                      borderRadius: '46px',
                    }}
                    type="link"
                    // onClick={handleClickChangePass}
                    icon={<LoginOutlined />}
                    onClick={() => form1.submit()}
                  >
                    შესვლა
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </>
      </Modal>

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
                      message: 'ველი სავალდებულოა!',
                    },
                  ]}
                >
                  <Input
                    placeholder="მომხმარებელი"
                    style={{
                      width: '50%',
                      borderRadius: '46px',
                    }}
                    // prefix={<UserOutlined className="" />}
                    onChange={e => changeUserName(e)}
                    // placeholder="Username"
                  />
                </Form.Item>
                <Form.Item
                  style={{
                    textAlign: 'center',
                  }}
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'ველი სავალდებულოა!',
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
                <Form.Item>
                  <Button type="link" onClick={handleClickPassRecovery}>
                    პაროლის აღდგენა
                  </Button>
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
                    loading={loginLoading}
                    htmlType="submit"
                  >
                    შესვლა
                  </Button>
                </Form.Item>
                <div className="">
                  <a href={USER_MENEGEMENT_URL}>ორგანიზაციის ავტორიზაცია</a>
                </div>

                <HelpSection />
                {/* <div style={{marginTop:40}}>
                  <a href={PDF} target="_blank">
                    მომხმარებლის სახელმძღვანელო
                  </a>
                </div>
                <div style={{marginTop:10}}>
                  <a
                    href={'https://www.youtube.com/watch?v=y7QvA_W0nLs'}
                    target="_blank"
                  >
                    ვიდეო ინსტრუქცია
                  </a>
                </div> */}
              </Form>
            </div>
          </section>
        </Col>
      </Row>
      <AppFooter />
    </>
  );
};
