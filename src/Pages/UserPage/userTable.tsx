import React from 'react';
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  message,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useEffect } from 'react';
import { createUser, deleteUser, updateIsActiveStatus } from '../../service/user';
import {
  DeleteOutlined,
  QuestionCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { accessObjWithoutKey, errorMessageAlert } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUsers } from '../../redux/slices/userSlice';
import { User } from './user';
import { PersonSyncronization } from '../../components/personSycnronization/personSycnronization';
import { getOrganizationsForSelect } from '../../redux/slices/organizationSlice';
const { Option } = Select;

type Pagination = {
  total: number;
  current: number;
  pageSize: number;
  showSizeChanger?: boolean;
  pageSizeOptions?: Array<string>;
};

const userDefaultValue = {
  id: '',
  personalId: '',
  birthYear: '',
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  organizations: [],
};
export const UserTable = () => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setUser(userDefaultValue);
    setOpen(true);
    form.resetFields();
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

  const handleIsFromServer = (data: any) => {
    setIsForServer(data);
  };
  const onFinish = async (formData: any) => {
    console.log('Success:', formData);
    // formData.organizationIds = [formData.organizationIds];
    let userData = { ...formData };
    if (user.id) {
      userData = { ...userData, id: user.id };
    }

    console.log('user.phoneuser.phone', userData);
    userData = { ...userData, isExist: isForServer ? true : false };

    console.log('userDatauserData', userData);
    try {
      setAddUserLoading(true);
      let result = await createUser(userData);
      console.log('result65', result);
      message.success(result, 8);
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

  // const [userList, setUserList] = useState([]);
  const [userListLoading, setUserListLoading] = useState(false);
  const [user, setUser] = useState(userDefaultValue);
  const [pagination, setPagination] = useState<Pagination>({
    total: 1,
    current: 1,
    pageSize: 20,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
  });

  const { resources, data } = useAppSelector(state => state.user.systemUsers);
  const [filter, setFilter] = useState({
    pageIndex: 1,
    pageSize: 10,
    totalCount: 10,
  });

  useEffect(() => {
    if (resources) {
      setFilter(resources);
      setPagination({
        current: resources.pageIndex,
        pageSize: resources.pageSize,
        total: resources.totalCount,
      });
    }
  }, [resources]);

  const systemUsersLoading = useAppSelector(state => state.user.systemUsersLoading);

  // const getUsersData = async () => {
  //   setUserListLoading(true);
  //   let result = await getUsers();
  //   let { data } = result;
  //   console.log('datadatadata', data);

  //   setUserList(data);
  //   setUserListLoading(false);
  // };

  const handleDeleteUser = async (record: any) => {
    console.log('record', record);
    let result;
    try {
      let data = {
        id: record.id,
        // organizationIds: [record.organizationId],
      };
      result = await updateIsActiveStatus(data);

      message.success('წარმატებით დასრულდა');
      dispatch(getUsers(pagination));
    } catch (error: any) {
      console.log('errrror tryy', error);
      let { Errors } = error.response.data;
      console.log('ErrorsErrors', Errors);
      let err = accessObjWithoutKey(Errors);
      errorMessageAlert(message, err);
    }

    console.log('resultresultresult854', result);
  };

  const editRecord = (record: any) => {
    console.log('record', record);
    setUser(record);
    setOpen(true);
  };

  useEffect(() => {
    if (user) {
      console.log('useruseruser', user);
      form.setFieldsValue({
        personalId: user.personalId,
        birthYear: user.birthYear,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        organizationIds: user.organizations?.map((item: any) => {
          return item.id;
        }),
      });
    }
  }, [user]);

  const columns = [
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Tooltip title="რედაქტირება">
          <Button
            onClick={() => editRecord(record)}
            shape="circle"
            icon={<EditOutlined />}
          />
        </Tooltip>
        // <Popconfirm
        //   // placement="topLeft"
        //   title={record.isActive ? 'გაპასიურება' : 'გააქტიურება'}
        //   description={
        //     record.isActive ? 'გსურთ გაპასიურება? ' : 'გსურთ გააქტიურება?'
        //   }
        //   onConfirm={() => handleDeleteUser(record)}
        //   // onCancel={cancel}
        //   okText="დიახ"
        //   cancelText="დახურვა"
        //   icon={<QuestionCircleOutlined style={{ color: 'yealoow' }} />}
        //   // disabled={!record.isActive}
        // >
        //   {record.isActive ? (
        //     <Tooltip placement="bottom" title="გაპასიურება">
        //       <CloseCircleOutlined style={{ fontSize: 20, color: 'red' }} />
        //     </Tooltip>
        //   ) : (
        //     <Tooltip placement="bottom" title="გააქტიურება">
        //       <CheckCircleOutlined style={{ fontSize: 20, color: 'lime' }} />
        //     </Tooltip>
        //   )}
        //   {/* <Button
        //     disabled={!record.isActive}
        //     shape="circle"
        //     icon={<DeleteOutlined style={{ color: 'red' }} />}
        //   /> */}
        // </Popconfirm>
      ),
    },
    {
      title: 'პირადი ნომერი',
      dataIndex: 'personalId',
      key: 'personalId',
      render: (text: any) => <>{text}</>,
    },
    {
      title: 'სახელი',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'გვარი',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'ტელ. ნომერი',
      key: 'phone',
      dataIndex: 'phone',
    },
    {
      title: 'ელ. ფოსტა',
      key: 'email',
      dataIndex: 'email',
    },
    {
      title: 'ფილიალი',
      key: 'organizationName',
      dataIndex: 'organizationName',
      render: (text: any, record: any) => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
          {record.organizations?.map((item: any) => {
            return <div>{item.actualAddress}</div>;
          })}
        </div>
      ),
    },
    // {
    //   title: 'სტატუსი',
    //   key: 'isActive',
    //   dataIndex: 'isActive',
    //   render: (isActive: boolean) => (
    //     <>
    //       {isActive ? (
    //         <Tag color="green">აქტიური</Tag>
    //       ) : (
    //         <Tag color="volcano">პასიური</Tag>
    //       )}
    //     </>
    //   ),
    // },
  ];

  useEffect(() => {
    // getUsersData();
    console.log('filterfilterfilterfilter', filter);
    dispatch(getUsers(filter));
  }, []);

  const onChangePagination = (pageIndex: any, pageSize: any) => {
    console.log('change pag', pageIndex, pageSize);
    let newFlter = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      // personalNumber: filter.personalNumber,
    };
    // dispatch(fillFilter(newFlter));
    dispatch(getUsers(newFlter));
  };

  const onShowSizeChangePagination = (current: any, size: any) => {
    console.log(8741, current, size);
    setPagination({ ...pagination, current: 1, pageSize: size });
    let newFlter = {
      pageIndex: 1,
      pageSize: size,
      // personalNumber: filter.personalNumber,
    };
    // dispatch(fillFilter(newFlter));
    dispatch(getUsers(newFlter));
  };

  const getTitle = () => {
    console.log('useruser', user);
    return <> მომხარებლის {user.id ? 'რედაქტირება' : 'დამატება'} </>;
  };

  return (
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
              // htmlType="submit"
              icon={<PlusOutlined />}
              onClick={onAdd}
              onDoubleClick={() => console.log('double click !!')}
            >
              {user.id ? 'შენახვა' : 'დამატება'}
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
            setIsForServer={handleIsFromServer}
            setIsForServerEmail={setIsForServerEmail}
            disabledFields={user.id ? true : false}
          />
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="ნომერი"
                name="phone"
                rules={[{ required: true, message: 'შეავსეთ ველი !' }]}
              >
                <Input disabled={isForServer || user.id ? true : false} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="ელ-ფოსტა"
                name="email"
                rules={[{ required: true, message: 'შეავსეთ ველი !' }]}
              >
                <Input disabled={isForServerEmail || user.id ? true : false} />
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
      {/* <User user={user}/> */}
      <Table
        loading={systemUsersLoading}
        columns={columns}
        dataSource={data}
        style={{ marginTop: 15 }}
        pagination={{
          ...pagination,
          onChange: onChangePagination,
          onShowSizeChange: onShowSizeChangePagination,
          showTotal: (total: any) => `სულ  ${total} `,
        }}
      />
    </>
  );
};
