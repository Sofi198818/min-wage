import React from 'react';
import {
  Button,
  DatePicker,
  message,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tag,
  Tooltip,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useEffect } from 'react';
import { deleteUser } from '../../service/user';
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  FilePdfOutlined,
  QuestionCircleOutlined,
  UserDeleteOutlined,
} from '@ant-design/icons';
import { accessObjWithoutKey, errorMessageAlert } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUsers } from '../../redux/slices/userSlice';
import { fillPagination, getEmployees } from '../../redux/slices/employeeSlice';
import { EmployeeDismissalDateModal } from './employeeDismissalDateModal';
import { downloadFile, EmployeeDismissal } from '../../service/employee';
import { GetDate } from '../../Pipes/DatePipes';
import { Pagination } from '../../types/Pagination';
import './index.css';
import { Employee } from './employee';

export const EmployeeTable = ({ getEmployeeData }: any) => {
  // const [userList, setUserList] = useState([]);
  const { permissions } = useAppSelector(state => state.user.userData);

  const [dismissalLoading, setDismissalLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState(false);
  const [buttonTrack, setbuttonTrack] = useState(false);

  const [editedRecord, setEditedRecord] = useState({
    id: null,
  });
  const [editedEmployee, setEditedEmployee] = useState(null);

  // const [pagination, setPagination] = useState<Pagination>({
  //   total: 1,
  //   current: 1,
  //   pageSize: 20,
  //   showSizeChanger: true,
  //   pageSizeOptions: ['10', '20', '50', '100'],
  // });
  const { pagination } = useAppSelector(state => state.employee);
  const { filter } = useAppSelector(state => state.employee);

  const { resources, data } = useAppSelector(state => state.employee.employees);
  const employeesLoading = useAppSelector(state => state.employee.employeesLoading);
  const currentOrganization = useAppSelector(
    state => state.user.currentOrganization
  );

  const handleButton = () => {
    setbuttonTrack(true);
  };

  const userData = useAppSelector(state => state.user.userData);

  useEffect(() => {
    if (resources) {
      dispatch(
        fillPagination({
          current: resources.pageIndex,
          pageSize: resources.pageSize,
          total: resources.totalCount,
        })
      );
    }
  }, [resources]);

  const dispatch = useAppDispatch();

  const handleDismissalDate = async (data: any) => {
    console.log('edited', data);
    let result;

    try {
      setDismissalLoading(true);
      result = await EmployeeDismissal(data);
      message.success('წარმატებით დასრულდა');
      let newFilter = { ...filter, OrganizationIds: currentOrganization || null };
      dispatch(getEmployees(newFilter));
      setIsModalOpen(false);
    } catch (error: any) {
      console.log('errrror tryy', error);
      let { Errors } = error.response.data;
      console.log('ErrorsErrors', Errors);
      let err = accessObjWithoutKey(Errors);
      errorMessageAlert(message, err);
    }

    setDismissalLoading(false);
  };

  const disabled = (record: any) => {
    if (!record.contractEndDate) {
      return false;
    }
    return new Date(record.contractEndDate) < new Date();
  };
  const [pending, setPending] = useState(false);
  const download = async (record: any) => {
    console.log('record', record);
    setPending(true);
    let result;
    try {
      result = await downloadFile(record.documents[0].id);
      console.log('result', result);
    } catch (error: any) {
      console.log('errrror tryy', error);
      message.error(error.message, 5);
      setPending(false);
    }

    console.log('resultresult', result.message);
    const url = URL.createObjectURL(
      new Blob([result], { type: 'application/octet-stream' })
    );
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', record.documents[0].name);
    document.body.appendChild(link);
    link.click();
    setPending(false);
  };

  const getSpecialityNames = (row: any) => {
    let names = '';
    row?.certificates?.forEach((element: any) => {
      names += `${element.speciality} , `;
    });

    return names;
  };
  const columns = [
    {
      title: 'პირადი ნომერი',
      dataIndex: 'personalId',
      key: 'personalId',
      render: (text: any) => <>{text}</>,
    },
    {
      title: 'სახელი გვარი',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (text: any, record: any) => (
        <>
          {record.firstName} {record.lastName}
        </>
      ),
    },
    {
      title: 'ფილიალი',
      dataIndex: 'organizationAddress',
      key: 'organizationAddress',
    },
    {
      title: 'განყოფილება',
      dataIndex: 'departmentName',
      key: 'departmentName',
    },
    {
      title: 'პოზიცია',
      key: 'position',
      dataIndex: 'position',
    },
    {
      title: 'სპეციალობა',
      key: 'specialityName',
      dataIndex: 'specialityName',
      render: (text: any, row: any) => <>{getSpecialityNames(row)}</>,
    },
    {
      title: 'დანიშვნის თარიღი',
      key: 'contractStartDate',
      dataIndex: 'contractStartDate',
      render: (text: any) => <>{GetDate(text)}</>,
    },
    {
      title: 'განთავისუფლების თარიღი',
      key: 'contractEndDate',
      dataIndex: 'contractEndDate',
      render: (text: any) => <>{GetDate(text)}</>,
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
    {
      title: 'მოქმედებები',
      key: 'action',
      render: (_: any, record: any) => {
        if (permissions && permissions['Moderator']) {
          return (
            <>
              <Tooltip placement="bottom" title="რედაქტირება">
                <Button
                  disabled={disabled(record)}
                  onClick={() => showModal(record)}
                  shape="circle"
                  icon={<EditOutlined style={{ color: 'black' }} />}
                />
              </Tooltip>
              <Tooltip placement="bottom" title="გადმოწერა">
                <Button
                  style={{ marginLeft: 10 }}
                  disabled={record.documents?.length ? false : true}
                  onClick={() => download(record)}
                  shape="circle"
                  icon={<DownloadOutlined style={{ color: 'black' }} />}
                />
              </Tooltip>
            </>
          );
        }
      },
    },
  ];

  useEffect(() => {
    console.log('organization');
    if (userData.permissions && userData.permissions['Manager']) {
      dispatch(getEmployees(filter));
    }
  }, [userData]);

  useEffect(() => {
    console.log('organizationcurrentOrganization', currentOrganization);
    if (currentOrganization) {
      let newFilter = { ...filter, OrganizationIds: currentOrganization || null };
      dispatch(getEmployees(newFilter));
    }
  }, [currentOrganization]);

  const onChangePagination = (pageIndex: any, pageSize: any) => {
    console.log('change pag', pageIndex, pageSize);

    let newFlter = {
      ...filter,
      pageIndex: pageIndex,
      pageSize: pageSize,
      // personalNumber: filter.personalNumber,
    };
    // dispatch(fillFilter(newFlter));
    dispatch(getEmployees(newFlter));
  };

  const onShowSizeChangePagination = (current: any, size: any) => {
    console.log(8741, current, size);
    dispatch(fillPagination({ ...pagination, current: 1, pageSize: size }));
    let newFlter = {
      pageIndex: 1,
      pageSize: size,
      // personalNumber: filter.personalNumber,
    };
    // dispatch(fillFilter(newFlter));
    dispatch(getUsers(newFlter));
  };

  const showModal = (record: any) => {
    setEditedEmployee(record);
    console.log('record', record);
    handleButton();
    setEditedRecord(record);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log('dateStringdateString', date, editedRecord);
    handleDismissalDate({
      id: editedRecord.id,
      contractEndDate: date,
    });
    // setIsModalOpen(false);
    // setloading(true)
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (date: any, dateString: any) => {
    console.log(date, dateString);
    setDate(dateString);
  };

  return (
    <>
      <Modal
        footer={null}
        title="რედაქტირება"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1150}
        okText={'შენახვა'}
        okButtonProps={{ loading: dismissalLoading }}
        cancelText={'დახურვა'}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 25,
            marginBottom: 25,
          }}
        >
          <Employee
            editedData={editedEmployee}
            buttonTrack={buttonTrack}
            resetFormSubmitted={() => setbuttonTrack(false)}
            hancleCloseModal={handleCancel}
            getEmployeeData={() => getEmployeeData(pagination)}
          />
        </div>
      </Modal>

      <Table
        rowClassName={(record, index) =>
          disabled(record) ? 'table-row-red' : 'table-row-light'
        }
        loading={employeesLoading}
        columns={columns}
        dataSource={data}
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
