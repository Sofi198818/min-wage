import React, { useEffect, useState, useRef } from 'react';
import {
  Button,
  Card,
  Checkbox,
  DatePicker,
  Divider,
  Form,
  Input,
  message,
  Select,
  Space,
  Radio,
  Table,
  Upload,
  Alert,
} from 'antd';
import type { InputRef } from 'antd';

// import { saveAs } from 'file-saver';
import moment, { Moment } from 'moment';
import {
  ArrowUpOutlined,
  InfoCircleOutlined,
  LeftOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  SyncOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { UploadProps } from 'antd';
import './employee.css';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  addEmployee,
  downloadFile,
  syncPerson,
  updateEmployee,
} from '../../service/employee';
import { PersonSyncronization } from '../../components/personSycnronization/personSycnronization';
import { getOrganizationsForSelect } from '../../redux/slices/organizationSlice';
import { accessObjWithoutKey, errorMessageAlert } from '../../utils';
import { useNavigate } from 'react-router';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/en';

import { AppointmentPosition } from './AppointmentPosition';
import { getEmployees, resetSertificate } from '../../redux/slices/employeeSlice';

const { Option } = Select;

type EmployeeFormData = {
  personalId: string;
  firstName: string;
  lastName: string;
  birthYear: string;
  gender: string;
  type: string;
  status: string;
  organizationId: string;
  position: string;
  contractStartDate: string;
  contractEndDate: string | null;
  contractExpiredDate: string;
  department: string;
  certificateNumbers: any;
  doc: string;
  otherPositionName: string;
};

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

type Prop = {
  buttonTrack: any;
  resetFormSubmitted: any;
  editedData: any;
  hancleCloseModal: any;
  getEmployeeData?: any;
};

export const Employee = ({
  buttonTrack,
  resetFormSubmitted,
  editedData,
  hancleCloseModal,
  getEmployeeData,
}: Prop) => {
  let index = 0;
  const [form] = Form.useForm();
  const [isForServer, setIsForServer] = useState(false);
  const [isForServerEmail, setIsForServerEmail] = useState(false);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [items, setItems] = useState(['jack', 'lucy']);
  const [name, setName] = useState('');
  const [file, setfile] = useState<any>([]);
  const [setCertificate, setSeeCertificate] = useState(false);
  const { pagination } = useAppSelector(state => state.employee);
  const { filter } = useAppSelector(state => state.employee);

  const [appointmentPositions, setAppointmentPositions] = useState<
    React.ReactElement[]
  >([]);
  const [showAppointmentPosition, setShowAppointmentPosition] = useState(false);

  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>(
    'checkbox'
  );

  useEffect(() => {
    console.log('editedDataeditedData', editedData);
    if (editedData) {
      console.log('formformformform', editedData);

      if (editedData.documents.length) {
        form.setFieldsValue({
          doc: editedData.documents[0].name,
        });
      } else {
        console.log(5656);
        form.setFieldsValue({
          doc: null,
        });
      }
      form.setFieldsValue({
        personalId: editedData.personalId,
        lastName: editedData.lastName,
        firstName: editedData.firstName,
        department: editedData.departmentName,

        organizationId: editedData.organizationId,
        position: editedData.position,
        contractStartDate: editedData?.contractStartDate
          ? dayjs(editedData.contractStartDate)
          : null,
        contractEndDate: editedData?.contractEndDate
          ? dayjs(editedData.contractEndDate)
          : null,
      });
      if (editedData.position == 'ექიმი') {
        form.setFieldsValue({
          certificateNumber: editedData.certificates[0]?.certificateNumber || null,
          certificateNumbers: editedData.certificates?.map((item: any) => {
            return item.certificateNumber;
          }),
        });
      }
    }
  }, [editedData]);

  useEffect(() => {
    if (buttonTrack) {
      setbuttonHide(false);
      resetFormSubmitted();
    }
  }, [buttonTrack, resetFormSubmitted]);

  const handleAddEmployee = () => {
    const newPosition = (
      <AppointmentPosition
        editedData={editedData}
        key={appointmentPositions.length}
        form={form}
        getDocument={getDocument}
        buttonHide={buttonHide}
        setButtonHide={setbuttonHide}
        formSubmitted={formSubmitted}
        resetFormSubmitted={() => setFormSubmitted(false)}
      />
    );
    setAppointmentPositions(prevPositions => [...prevPositions, newPosition]);
  };

  const getDocument = (doc: any) => {
    console.log('doc 78', doc);
    setfile(doc);
  };

  const props: UploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file?.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file?.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const inputRef = useRef<InputRef>(null);
  // const syncLoading = useAppSelector(state => state.employee.loading);
  const organizationsForSelect = useAppSelector(
    state => state.organization.organizationsForSelect
  );

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const currentOrganization = useAppSelector(
    state => state.user.currentOrganization
  );

  useEffect(() => {
    if (!organizationsForSelect.length) {
      dispatch(getOrganizationsForSelect());
    }
  }, []);

  useEffect(() => {
    if (currentOrganization) {
      form.setFieldsValue({
        organizationId: currentOrganization,
      });
    }
  }, [currentOrganization]);

  const [syncLoading, setSuncLoading] = useState(false);
  const [addEmployeeLoading, setAddEmployeeLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [buttonHide, setbuttonHide] = useState(true);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const fileUploadRef = useRef<HTMLInputElement | null>(null);
  const onFinish = async (formData: EmployeeFormData) => {
    console.log(
      'formData',
      formData
      // 'Success:',
      // new Date(formData.contractStartDate).toLocaleDateString()
    );
    // console.log('contractEndDate:', formData.contractEndDate.toString());
    formData.contractStartDate = dayjs(formData.contractStartDate).format(
      'YYYY-MM-DD'
    );
    formData.contractEndDate = formData.contractEndDate
      ? dayjs(formData.contractEndDate).format('YYYY-MM-DD')
      : null;
    const postData = new FormData();

    postData.append('FirstName', formData.firstName);
    postData.append('LastName', formData.lastName);
    postData.append('PersonalId', formData.personalId);
    postData.append('Type', formData.type);
    postData.append('OrganizationId', formData.organizationId);

    postData.append('Position', formData.position);
    postData.append('ContractStartDate', formData.contractStartDate);
    if (formData.contractEndDate) {
      postData.append('ContractEndDate', formData.contractEndDate);
    }
    postData.append('Department', formData.department);
    postData.append('OtherPositionName', formData.otherPositionName);
    // postData.append('CertificateNumbers', formData.certificateNumbers);

    console.log('file.file', file);
    formData.certificateNumbers?.forEach((item: any, i: any) => {
      postData.append(`CertificateNumbers[${i}]`, item);
    });
    // postData.append('CertificateNumbers', formData.certificateNumbers);
    if (file && file.length > 0) {
      console.log('file[0].originFileObj',file[0].originFileObj)
      postData.append('Doc', new File([file[0].originFileObj], file[0].name));
    } else {
      console.log('file[0].originFileObj elseeeee',file[0].originFileObj)
      var fileFromBlob = new File([file[0].originFileObj], file[0].name);

      postData.append('Doc', fileFromBlob);
    }

    try {
      setAddEmployeeLoading(true);

      if (editedData) {
        postData.append('id', editedData.id);
        await updateEmployee(postData);
        console.log('red');
        hancleCloseModal();
      } else {
        await addEmployee(postData);

        const fieldsToReset = [
          'organizationId',
          'position',
          'department',
          'contractStartDate',
          'contractEndDate',
          'certificateNumber',
          'otherPositionName',
        ];
        form.resetFields(fieldsToReset);
        setfile(null);
        dispatch(resetSertificate(''));
        // setFileList(null);
        setFormSubmitted(true);
        if (fileUploadRef.current) {
          fileUploadRef.current.value = '';
        }
      }
      // setFormSubmitted(true);

      // console.log('result', result);
      message.success('წარმატებით დასრულდა ');
      // dispatch(
      //   getUsers({
      //     pageIndex: 1,
      //     pageSize: 10,
      //   })
      // );

      console.log('paginationpagination', pagination);
      let newFlter = {
        ...filter,
        pageIndex: pagination.current,
        pageSize: pagination.pageSize,
      };

      dispatch(getEmployees(newFlter));
    } catch (error: any) {
      console.log('errrror tryy', error);
      let { Errors } = error.response.data;
      console.log('ErrorsErrors', Errors);
      let err = accessObjWithoutKey(Errors);
      console.log('errerrerrerrerr', err);
      errorMessageAlert(message, err);
      setAddEmployeeLoading(false);
    }

    setAddEmployeeLoading(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log(
      'Success:',
      new Date(errorInfo.values.contractStartDate).toLocaleDateString()
    );
    console.log('Failed:', errorInfo);
  };

  const handlePositionChange = (value: any) => {
    if (value === 3) {
      setShowOtherInput(true);
    } else {
      setShowOtherInput(false);
    }
  };

  const handleSyncPerson = async () => {
    let personalId = form.getFieldValue('personalId');
    let birthYear = form.getFieldValue('birthYear');
    if (!personalId || personalId.length != 11) {
      message.error('პირადი ნომერი უნდა იყოს 11 ნიშნა !');
      return;
    }
    if (!birthYear || birthYear.length != 4) {
      message.error('მიუთითეთ წელი სწორად !');
      return;
    }
    console.log(personalId, birthYear);

    // dispatch(syncPerson({
    //   personalId: personalId,
    //   birthYear: birthYear,
    // }))

    setSuncLoading(true);
    let result = await syncPerson({
      personalId: personalId,
      birthYear: birthYear,
    });
    setSuncLoading(false);

    form.setFieldsValue({
      firstName: result.firstName,
      lastName: result.lastName,
      gender: result.gender == 1 ? 'მამრობითი' : 'მდედრობითი',
    });
    console.log('resultresult', result);
  };

  const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'ნომერი',
      dataIndex: 'name',
    },
    {
      title: 'სპეციალობა',
      dataIndex: 'age',
    },
    {
      title: 'მინიჭებულია',
      dataIndex: 'address',
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      name: '',
      age: 32,
      address: '',
    },
    {
      key: '2',
      name: '',
      age: 42,
      address: '',
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      );
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  const handleDownload = () => {
    // Code to download PDF file
    const pdfBlob = new Blob(['PDF file content'], { type: 'application/pdf' });
    // saveAs(pdfBlob, 'file.pdf');
  };

  return (
    <>
      {!editedData ? <h3>თანამშრომლის დამატება</h3> : null}

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
        <Card bordered={false}>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <div>
              <PersonSyncronization
                editedData={editedData}
                form={form}
                showType={true}
                isForServer={isForServer}
                setIsForServer={setIsForServer}
                setIsForServerEmail={setIsForServerEmail}
              />
            </div>
          </div>
        </Card>
        {/* {showAppointmentPosition && (
          <AppointmentPosition
            editedData={editedData}
            form={form}
            getDocument={getDocument}
            buttonHide={buttonHide}
            setButtonHide={setbuttonHide}
            formSubmitted={formSubmitted}
            resetFormSubmitted={() => setFormSubmitted(false)}
            addEmployeeLoading={addEmployeeLoading}
          />
        )} */}
        <AppointmentPosition
          editedData={editedData}
          form={form}
          getDocument={getDocument}
          buttonHide={buttonHide}
          setButtonHide={setbuttonHide}
          formSubmitted={formSubmitted}
          resetFormSubmitted={() => setFormSubmitted(false)}
          addEmployeeLoading={addEmployeeLoading}
        />
        {!editedData ? <div style={{ display: 'flex' }}></div> : null}
      </Form>
      {appointmentPositions.map(position => position)}
    </>
  );
};
