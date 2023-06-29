import React, { useState } from 'react';
import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  message,
  Radio,
  Row,
  Select,
  Space,
} from 'antd';
import {
  LeftOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addEmployee, syncPerson } from '../../service/employee';
import { PersonSyncronization } from '../../components/personSycnronization/personSycnronization';
import { createUser } from '../../service/user';
import { accessObjWithoutKey, errorMessageAlert } from '../../utils';
import { useEffect } from 'react';
import { getOrganizationsForSelect } from '../../redux/slices/organizationSlice';
import { getUsers } from '../../redux/slices/userSlice';
import { UserFilter } from './userFilter';

const { Option } = Select;

export const User = ({ user }: any) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const phoneFromForm = Form.useWatch('phone', form);
  const [isForServer, setIsForServer] = useState(false);
  const [isForServerEmail, setIsForServerEmail] = useState(false);

  const organizationsForSelect = useAppSelector(
    state => state.organization.organizationsForSelect
  );

  const [syncLoading, setSuncLoading] = useState(false);
  const [addUserLoading, setAddUserLoading] = useState(false);
  const dispatch = useAppDispatch();

  const onFinish = async (formData: any) => {
    console.log('Success:', formData);
    // formData.organizationIds = [formData.organizationIds];
    try {
      setAddUserLoading(true);
      let result = await createUser(formData);
      console.log('result', result);
      message.success('წარმატებით დასრულდა ');
      dispatch(
        getUsers({
          pageIndex: 1,
          pageSize: 10,
        })
      );
      form.resetFields();
    } catch (error: any) {
      console.log('errrror tryy', error);
      let { Errors } = error.response.data;
      console.log('ErrorsErrors', Errors);
      let err = accessObjWithoutKey(Errors);
      console.log('errerrerrerrerr', err);
      errorMessageAlert(message, err);
    }

    setAddUserLoading(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (!organizationsForSelect.length) {
      dispatch(getOrganizationsForSelect());
    }
  }, []);

  const disabledPhone = () => {
    let phone = form.getFieldValue('phone');
    console.log('phone ');
    if (phone) {
      return true;
    }
    return false;
  };

  const onAdd = () => {
    form.submit();
  };

  useEffect(() => {
    console.log('useruser', user);
    if (user) {
      setOpen(true);
    }
  }, [user]);

  const getTitle = () => {
    return <> მომხარებლის {user ? 'რედაქტირება' : 'დამატება'} </>;
  };
  return (
    <>
      <>
        <Button
          style={{ marginTop: 5 }}
          type="primary"
          onClick={showDrawer}
          icon={<PlusOutlined />}
        >
          მომხმარებლის დამატება
        </Button>
        <Drawer
          title={getTitle()}
          width={650}
          onClose={onClose}
          open={open}
          bodyStyle={{
            paddingBottom: 80,
          }}
          extra={
            <Space>
              <Button onClick={onClose}>დახურვა</Button>
              <Button
                loading={addUserLoading}
                type="primary"
                htmlType="submit"
                icon={<PlusOutlined />}
                onClick={onAdd}
              >
                დამატება
              </Button>
            </Space>
          }
        >
          <Form
            form={form}
            name="basic"
            // style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <PersonSyncronization editedData={null}
              isForServer={isForServer}
              form={form}
              showType={false}
              setIsForServer={setIsForServer}
              setIsForServerEmail={setIsForServerEmail}
            />
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="ნომერი"
                  name="phone"
                  rules={[{ required: true, message: 'შეავსეთ ველი !' }]}
                >
                  <Input disabled={isForServer ? true : false} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="ელ-ფოსტა"
                  name="email"
                  rules={[{ required: true, message: 'შეავსეთ ველი !' }]}
                >
                  <Input disabled={isForServerEmail}/>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="ფილიალი"
                  name="organizationIds"
                  // rules={[{ required: true, message: 'შეავსეთ ველი !' }]}
                >
                  <Select
                    mode="multiple"
                    allowClear
                    placeholder="აირჩიეთ ფილიალი"
                    filterOption={(input, option) => {
                      console.log(input, option);
                      return (option?.key ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase());
                    }}
                  >
                    {organizationsForSelect?.map((item: any) => (
                      <Option key={item.actualAddress} value={item.id}>
                        {item.actualAddress}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </>
    </>
  );
};
