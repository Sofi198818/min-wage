import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import {
  Button,
  Table,
  Form,
  Input,
  Tag,
  Tooltip,
  message,
  InputNumber,
} from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  apiOrganizations,
  putApiOrganizations,
  resetputOrg,
} from '../../redux/slices/organizationSlice';
import { GetStatusType } from '../../Pipes/organizationPipes';
import ButtonCustom from './ButtonCustom';
import './BranchTable.css';
import { errorMessageAlert } from '../../utils';

export const BranchTable = ({ branchData }) => {
  const [dataSource, setDataSource] = useState(branchData);
  const [editingRow, setEditingRow] = useState(null);
  const [mode, setMode] = useState(null);

  const currentOrganization = useAppSelector(
    state => state.user.currentOrganization
  );

  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const putOrganizationObject = useAppSelector(
    state => state.organization.putOrganizationObj
  );

  const { resourcses, data } = useAppSelector(
    state => state.organization.branchTable
  );

  const userData = useAppSelector(state => state.user.userData);
  const errorPutOrganization = useAppSelector(state => state.organization.error);

  const [pagination, setPagination] = useState({
    total: 1,
    current: 1,
    pageSize: 20,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
  });

  const [filter, setFilter] = useState({
    pageIndex: 1,
    pageSize: 10,
    totalCount: 10,
  });

  useEffect(() => {
    if (resourcses) {
      setFilter(resourcses);
      console.log('resourcsesresourcses,resourcses', resourcses);
      setPagination({
        current: resourcses.pageIndex,
        pageSize: resourcses.pageSize,
        total: resourcses.totalCount,
      });
    }
  }, [resourcses]);

  useEffect(() => {
    console.log('organization');
    if (userData.permissions && userData.permissions['Manager']) {
      dispatch(apiOrganizations(filter));
    }
  }, [userData]);

  useEffect(() => {
    console.log('organization');
    if (errorPutOrganization?.length) {
      errorMessageAlert(message, errorPutOrganization);
    }
  }, [errorPutOrganization]);

  useEffect(() => {
    console.log('organization');
    if (currentOrganization) {
      let newFilter = { ...filter, OrganizationIds: currentOrganization || null };
      setFilter(newFilter);
      dispatch(apiOrganizations(newFilter));
    }
  }, [currentOrganization]);

  useEffect(() => {
    setDataSource(branchData);
  }, [branchData]);

  useEffect(() => {
    if (putOrganizationObject) {
      dispatch(apiOrganizations());
      message.success('წარმატებით დაემატა');
    }
  }, [putOrganizationObject]);

  useEffect(() => {
    if (putOrganizationObject) {
      dispatch(resetputOrg());
      console.log(55555);
    }
  }, [putOrganizationObject]);

  const onChangePagination = (pageIndex, pageSize) => {
    console.log('change pag', pageIndex, pageSize);
    setPagination({ ...pagination, current: pageIndex, pageSize: pageSize });
    let newFlter = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      // personalNumber: filter.personalNumber,
    };
    // dispatch(fillFilter(newFlter));
    dispatch(apiOrganizations(newFlter));
  };

  const onShowSizeChangePagination = (current, size) => {
    console.log(8741, current, size);
    setPagination({ ...pagination, current: 1, pageSize: size });
    let newFlter = {
      pageIndex: 1,
      pageSize: size,
      // personalNumber: filter.personalNumber,
    };
    // dispatch(fillFilter(newFlter));
    dispatch(apiOrganizations(newFlter));
  };

  const handleClick = (mode, record) => {
    console.log(333111, mode, editingRow);

    if (mode == 'edit') {
      setMode('edit');
      setEditingRow(record.key);
      console.log('rkey', record.key);
      form.setFieldsValue({
        authPersonFullName: record.authPersonFullName,
        authPersonPhone: record.authPersonPhone,
        authPersonEmail: record.authPersonEmail,
        brandName: record.brandName,
      });
    } else {
      let authPersonPhone = form.getFieldValue('authPersonPhone');
      let isInputValueAllNumbers = /^\d+$/.test(authPersonPhone);
      if (authPersonPhone.length != 9) {
        message.error('ტელეფონის ნომერი უნდა შედგებოდეს 9 სიმბოლოსგან!');
        return;
      }
      if (!isInputValueAllNumbers) {
        message.error('ტელეფონის ნომერი უნდა შედგებოდეს მხოლოდ ციფრებისგან!');
        return;
      }
      setMode('save');

      form.submit();
    }

    // console.log('record.key', record.key);
    // form.setFieldsValue({
    //   authPersonFullName: record.authPersonFullName,
    //   authPersonPhone: record.authPersonPhone,
    //   authPersonEmail: record.authPersonEmail,
    //   brandName: record.brandName,
    // });
  };
  const columns = [
    {
      key: 'status',
      title: 'სტატუსი',
      dataIndex: 'status',
      editable: false,
      render: status => (
        <>
          <Tag color="green">{GetStatusType(status)}</Tag>
        </>
      ),
    },

    {
      key: 'actualRegionName',
      title: 'რეგიონი',
      dataIndex: 'actualRegionName',
      editable: false,
    },
    {
      key: 'actualMunicipalityName',
      title: 'მუნიციპალიტეტი/ქალაქი',
      dataIndex: 'actualMunicipalityName',
      editable: false,
    },
    {
      key: 'actualAddress',
      title: 'მისამართი',
      dataIndex: 'actualAddress',
      editable: false,
    },
    {
      key: 'authPersonFullName',
      title: 'საკონტაქტო პირი',
      dataIndex: 'authPersonFullName',
      editable: true,
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              rules={[{ required: true, message: 'ველი სავალდებულოა!' }]}
              name="authPersonFullName"
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      key: 'authPersonPhone',
      title: 'ტელ.ნომერი',
      dataIndex: 'authPersonPhone',
      editable: true,
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              rules={[{ required: true, message: 'ველი სავალდებულოა!' }]}
              name="authPersonPhone"
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      key: 'authPersonEmail',
      title: 'ელ.ფოსტა',
      dataIndex: 'authPersonEmail',
      editable: true,
      render: (text, record) => {
        if (editingRow === record.key) {
          console.log('keyyyyy', record.key);
          return (
            <Form.Item
              rules={[{ required: true, message: 'ველი სავალდებულოა!' }]}
              name="authPersonEmail"
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      key: 'brandName',
      title: 'ბრენდული.დას.',
      dataIndex: 'brandName',
      editable: true,
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              rules={[{ required: true, message: 'ველი სავალდებულოა!' }]}
              name="brandName"
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },

    {
      title: 'მოქმედებები',
      render: (_, record) => {
        console.log('Sofi56', record.key);
        return (
          <>
            <ButtonCustom mode={mode} handleClick={handleClick} record={record} />
          </>
        );
      },
    },
  ];
  const onFinish = values => {
    console.log('values', values, editingRow);
    let postData = {
      id: editingRow,
      ...values,
    };
    console.log('postData', postData);
    dispatch(putApiOrganizations(postData));
    setEditingRow(null);
  };
  return (
    <div className="App">
      <header className="App-header">
        <Form form={form} onFinish={onFinish}>
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={{
              ...pagination,
              onChange: onChangePagination,
              onShowSizeChange: onShowSizeChangePagination,
              showTotal: total => `სულ  ${total} `,
            }}
          ></Table>
        </Form>
      </header>
    </div>
  );
};

export default BranchTable;
