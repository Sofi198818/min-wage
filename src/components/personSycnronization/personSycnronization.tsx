import React, { useState } from 'react';
import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Row,
  Select,
} from 'antd';
import {
  ClearOutlined,
  LeftOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addEmployee, syncPerson } from '../../service/employee';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { syncUser } from '../../service/user';
import { accessObjWithoutKey, errorMessageAlert } from '../../utils';

type Props = {
  form: any;
  showType: boolean;
  isForServer: boolean;
  setIsForServer: (value: boolean) => void;
  setIsForServerEmail: (value: boolean) => void;
  disabledFields?: boolean;
  editedData: any;
};
export const PersonSyncronization = ({
  form,
  showType,
  isForServer,
  setIsForServer,
  setIsForServerEmail,
  disabledFields,
  editedData,
}: Props) => {
  const [syncLoading, setSuncLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const dispatch = useAppDispatch();
  const params = useParams();

  const handleSyncPerson = async () => {
    console.log('params', window.location.pathname.includes('AddNewUser'));

    let personalId = form.getFieldValue('personalId');
    let lastName = form.getFieldValue('lastName');
    console.log('formform', lastName);
    if (!personalId || personalId.length != 11) {
      message.error('პირადი ნომერი უნდა იყოს 11 ნიშნა !');
      return;
    }
    if (!lastName) {
      message.error('შეავსეთ გვარი');
      return;
    }
    console.log(personalId, lastName);
    // dispatch(syncPerson({
    //   personalId: personalId,
    //   birthYear: birthYear,
    // }))

    setSuncLoading(true);

    let result;

    try {
      if (window.location.pathname.includes('AddNewUser')) {
        result = await syncUser({
          personalId: personalId,
          lastName: lastName,
        });
        console.log('resultresult', result);
        form.setFieldsValue({
          phone: result.phone,
          organizationIds: result.organizations?.map((item: any) => {
            return item.id;
          }),
        });
      } else {
        result = await syncPerson({
          personalId: personalId,
          lastName: lastName,
        });
      }
    } catch (error: any) {
      console.log('errrror tryy', error);
      let { Errors } = error.response.data;
      console.log('ErrorsErrors', Errors);
      let err = accessObjWithoutKey(Errors);
      console.log('errerrerrerrerr', err);
      errorMessageAlert(message, err);
      setSuncLoading(false);
    }

    setIsForServer(result.phone);
    setIsForServerEmail(result.email);

    setSuncLoading(false);

    form.setFieldsValue({
      firstName: result.firstName,
      lastName: result.lastName,
      gender: result.gender == 1 ? 'მამრობითი' : 'მდედრობითი',
      email: result.email,
    });
    console.log('sofiiresultresult', result);
  };

  useEffect(() => {
    console.log('qwqwqw');
    setDisabled(!showType);
  }, [showType]);

  useEffect(() => {
    console.log('1111');
    form.setFieldsValue({
      type: 1,
    });
    setDisabled(true);
  }, []);
  const handleChangeType = (event: any) => {
    console.log('aas', event.target.value);
    setDisabled(event.target.value == 1 ? true : false); //არარეზიდენტზე disabled
  };

  if (window.location.pathname.includes('AddNewUser')) {
    return (
      <>
        <div>
          {showType ? (
            <Form.Item
              name="type"
              rules={[{ required: true, message: 'აირჩიეთ ტიპი !' }]}
            >
              <Radio.Group onChange={handleChangeType} style={{ width: 200 }}>
                <Radio value={1}>რეზიდენტი</Radio>
                <Radio value={2}>არარეზიდენტი</Radio>
              </Radio.Group>
            </Form.Item>
          ) : null}

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="პირადი ნომერი"
                name="personalId"
                rules={[{ required: true, message: 'შეავსეთ ველი !' }]}
              >
                <Input disabled={disabledFields} />
                {/* <InputNumber  /> */}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="გვარი"
                name="lastName"
                rules={[{ required: true, message: 'შეავსეთ ველი !' }]}
              >
                <Input disabled={disabledFields} />
              </Form.Item>
            </Col>
            <Col span={4}>
              {disabled ? (
                disabledFields ? null : (
                  <Form.Item style={{ marginTop: 21 }}>
                    <Button
                      loading={syncLoading}
                      onClick={handleSyncPerson}
                      shape="circle"
                      icon={<SyncOutlined />}
                      size="large"
                    />
                  </Form.Item>
                )
              ) : null}
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="სახელი"
                name="firstName"
                rules={[{ required: true, message: 'შეავსეთ ველი !' }]}
              >
                <Input disabled={disabled} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="გვარი"
                name="lastName"
                rules={[{ required: true, message: 'შეავსეთ ველი !' }]}
              >
                <Input disabled={disabled} />
              </Form.Item>
            </Col>
          </Row>

          {/* <Form.Item
            label="სქესი"
            name="gender"
            rules={[{ required: true, message: 'შეავსეთ ველი !' }]}
          >
            <Input disabled />
          </Form.Item> */}
        </div>
      </>
    );
  }
  const resetField = ()=> {
    const fieldsToReset = ['personalId', 'lastName', 'firstName']
    form.resetFields(fieldsToReset);
  }

  return (
    <>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {showType  && !editedData? (
          <Form.Item
            name="type"
            rules={[{ required: true, message: 'აირჩიეთ ტიპი !' }]}
          >
            <Radio.Group onChange={handleChangeType} style={{ width: 200 }}>
              <Radio value={1}>რეზიდენტი</Radio>
              <Radio value={2}>არარეზიდენტი</Radio>
            </Radio.Group>
          </Form.Item>
        ) : null}

        <Form.Item
          label="პირადი ნომერი"
          name="personalId"
          rules={[{ required: true, message: 'შეავსეთ ველი !' }]}
        >
          <Input disabled={editedData ? true : false} />
          {/* <InputNumber  /> */}
        </Form.Item>
        <Form.Item
          label="გვარი"
          name="lastName"
          rules={[{ required: true, message: 'შეავსეთ ველი !' }]}
        >
          <Input disabled={editedData ? true : false} style={{ width: 180 }} />
        </Form.Item>
        {disabled && !editedData ? (
          <Form.Item style={{ marginTop: 21 }}>
            <Button
              loading={syncLoading}
              onClick={handleSyncPerson}
              shape="circle"
              icon={<SyncOutlined />}
              size="large"
            />
          </Form.Item>
        ) : null}

        <Form.Item
          style={{ marginLeft: 25 }}
          label="სახელი"
          name="firstName"
          rules={[{ required: true, message: 'შეავსეთ ველი !' }]}
        >
          <Input disabled={disabled} />
        </Form.Item>
        <Form.Item
          label="გვარი"
          name="lastName"
          rules={[{ required: true, message: 'შეავსეთ ველი !' }]}
        >
          <Input disabled={disabled} />
        </Form.Item>
        <Button
            style={{ marginLeft: 12, marginTop: '29px' }}
            // onClick={() => form.resetFields()}
            onClick={resetField}
            icon={<ClearOutlined />}
          ></Button>
        {/* <Form.Item
          label="სქესი"
          name="gender"
          rules={[{ required: true, message: 'შეავსეთ ველი !' }]}
        >
          <Input disabled />
        </Form.Item> */}
      </div>
    </>
  );
};
