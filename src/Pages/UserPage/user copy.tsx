import React, { useState } from 'react';
import {
  Button,
  Card,
  Checkbox,
  DatePicker,
  Form,
  Input,
  message,
  Radio,
  Select,
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

const { Option } = Select;

export const User: React.FC = () => {
  const [form] = Form.useForm();
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
    formData.organizationIds = [formData.organizationIds];
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
  return (
    <>
      <h3>მომხმარებლის დამატება</h3>{' '}
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
        <Card>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <div>
              <PersonSyncronization editedData={null}
                isForServer={isForServer}
                form={form}
                showType={false}
                setIsForServer={setIsForServer}
                setIsForServerEmail={setIsForServerEmail}
              />
            </div>
            <div>
              <Form.Item
                label="ნომერი"
                name="phone"
                rules={[{ required: true, message: 'შეავსეთ ველი !' }]}
              >
                <Input disabled={isForServer ? true : false} />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="ელ-ფოსტა"
                name="email"
                rules={[{ required: true, message: 'შეავსეთ ველი !' }]}
              >
                <Input />
              </Form.Item>
            </div>
          </div>
        </Card>

        <Card bordered={false}>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <Form.Item
              label="ფილიალი"
              name="organizationIds"
              rules={[{ required: true, message: 'შეავსეთ ველი !' }]}
            >
              <Select
                // mode="multiple"
                allowClear
                placeholder="აირჩიეთ ფილიალი"
                style={{ width: 400 }}
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
          </div>
        </Card>
        <br />

        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button icon={<LeftOutlined />}>უკან</Button>
            <Button
              loading={addUserLoading}
              type="primary"
              htmlType="submit"
              icon={<PlusOutlined />}
            >
              დამატება
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};
