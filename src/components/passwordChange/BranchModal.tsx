import { LoginOutlined } from '@ant-design/icons';
import { Button, Col, Form, Modal, Row, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getOrganizationsForSelect } from '../../redux/slices/organizationSlice';
const { Option } = Select;

export const BranchModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const organizationsForSelect = useAppSelector(
    state => state.organization.organizationsForSelect
  );

  const showModal = () => {
    setIsModalOpen(true);
    dispatch(getOrganizationsForSelect());
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (value: any) => {
    console.log('valuevaluevalue',value)
    localStorage.setItem('currentOrganization',value.organization)
  };

  const onChange = (value: any) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value: any) => {
    console.log('search:', value);
  };
  //   const onClick1 = (e: any, key: any) => {
  //     console.log('here');
  //     Navigate(key);
  //   };

  //   useEffect(() => {
  //     dispatch(getOrganizationsForSelect());
  //   }, []);
  return (
    <>
      <Button type="primary" htmlType="submit" onClick={showModal}>
        შემდეგიiiii
      </Button>
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
                form={form}
                name="აირჩიე ფილიალი"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="organization"
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
                    style={{
                      width: '50%',
                      borderRadius: '46px',
                      marginBottom: '10px',
                    }}
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
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: '0 auto',
                      marginBottom: '120px',
                      backgroundColor: '#046df8',
                      color: '#fff',
                      width: '50%',
                      height: '30px',
                      borderRadius: '46px',
                    }}
                    type="link"
                    // onClick={handleClickChangePass}
                    icon={<LoginOutlined />}
                    onClick={() => form.submit()}
                  >
                    შესვლა
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </>
      </Modal>
    </>
  );
};
