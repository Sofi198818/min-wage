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
import { addEmployee, downloadFile, syncPerson } from '../../service/employee';
import { PersonSyncronization } from '../../components/personSycnronization/personSycnronization';
import { getOrganizationsForSelect } from '../../redux/slices/organizationSlice';
import { accessObjWithoutKey, errorMessageAlert } from '../../utils';
import { useNavigate } from 'react-router';
import dayjs, { Dayjs } from 'dayjs';
import {
  getApiDepartments,
  postDoctorCertificates,
} from '../../redux/slices/employeeSlice';
import moment from 'moment';
import './appointmentPosition.css';

import { fileURLToPath } from 'url';

const { Option } = Select;

interface DataType {
  key: React.Key;
  title: string;
  dataIndex: string;
}

type Props = {
  form: any;
  getDocument: any;
  formSubmitted: any;
  resetFormSubmitted: any;
  buttonHide: any;
  setButtonHide: any;
  editedData: any;
  addEmployeeLoading?: boolean;
};

export const AppointmentPosition = ({
  form,
  getDocument,
  formSubmitted,
  resetFormSubmitted,
  buttonHide,
  setButtonHide,
  editedData,
  addEmployeeLoading,
}: Props) => {
  let index = 0;
  // const [form] = Form.useForm();
  const [isForServer, setIsForServer] = useState(false);
  const [isForServerEmail, setIsForServerEmail] = useState(false);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [showCertificat, setSshowCertificat] = useState(false);
  const defaultFile = () => {
    return [
      {
        uid: '1',
        name: '',
        status: 'done',
      },
    ];
  };

  const [fileList, setFileList] = useState<any>([]);
  console.log('sofofile', fileList);

  const setFormFile = async (data: any) => {
    if (data.documents.length) {
      const file = await downloadFile(data.documents[0].id);
      console.log('file', file);

      setFileList([
        {
          uid: '2',
          name: data.documents[0].name,
          status: 'done',
          // url: 'http://www.baidu.com/yyy.png',
        },
      ]);

      getDocument([{ originFileObj: file, name: data.documents[0].name }]);
      form.setFieldsValue({
        doc: { originFileObj: file, name: data.documents[0].name },
      });
    } else {
      console.log(565677);
      form.setFieldsValue({
        doc: null,
      });

      setFileList([]);
    }
  };

  useEffect(() => {
    console.log('appoit', editedData);
    if (editedData) {
      setFormFile(editedData);
      setSelectedRowKeys(
        editedData.certificates.map((r: any) => r.certificateNumber)
      );
    }

    if (editedData?.position === 'ექიმი') {
      setSshowCertificat(true);
      setDataSourceCertificate(editedData.certificates);
      console.log('editedData.certificates', editedData.certificates);
    } else {
      setSshowCertificat(false);
    }
  }, [editedData]);

  useEffect(() => {
    console.log('fileList', fileList);
    // if (!editedData) {
    //   getDocument(fileList);
    // }
    getDocument(fileList);
  }, [fileList]);

  useEffect(() => {
    if (formSubmitted) {
      // Reset the file state when formSubmitted changes to true
      setFileList([]);
      // Reset the formSubmitted state in the parent component
      resetFormSubmitted();
    }
  }, [formSubmitted, resetFormSubmitted]);

  const departmentsToolkit = useAppSelector<any>(
    state => state.employee.departments
  );
  console.log('sopoo', fileList);
  // const [items, setItems] = useState(['jack', 'lucy']);
  const [name, setName] = useState('');
  const [departments, setDepartments] = useState<any>([]);
  const certificateCategory = useAppSelector(state => state.employee.certificates);
  console.log('certificateCategory', certificateCategory);
  const [dataSourceCertificate, setDataSourceCertificate] = useState<any>([]);
  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>(
    'checkbox'
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const props: UploadProps = {
    onChange({ file, fileList }: any) {
      console.log(file, 'uploading');

      if (file) {
        console.log('uploading', fileList);
        setFileList(fileList);
      }
      if (file.stats === 'removed') {
        console.log('removed');
        setFileList(null);
      }
    },
    defaultFileList: fileList,
  };
  useEffect(() => {
    if (departmentsToolkit.length) {
      setDepartments(departmentsToolkit);
    }
  }, [departmentsToolkit]);
  const inputRef = useRef<InputRef>(null);
  // const syncLoading = useAppSelector(state => state.employee.loading);
  const organizationsForSelect = useAppSelector(
    state => state.organization.organizationsForSelect
  );
  const asyncLoading = useAppSelector(state => state.employee.loading);
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    console.log('event.target.value', event.target.value);
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
    dispatch(getApiDepartments());
    console.log('depart');
  }, []);

  useEffect(() => {
    if (currentOrganization) {
      form.setFieldsValue({
        organizationId: currentOrganization,
      });
    }
  }, [currentOrganization]);

  const [syncLoading, setSuncLoading] = useState(false);
  const [addLoading, setaddLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinishFailed = (errorInfo: any) => {
    console.log(
      'Success:',
      new Date(errorInfo.values.contractStartDate).toLocaleDateString()
    );
    console.log('Failed:', errorInfo);
  };

  const handleCertificat = (value: any) => {
    if (value === 1) {
      setSshowCertificat(true);
    } else {
      setSshowCertificat(false);
    }
  };
  const handlePositionChange = (value: any) => {
    if (value === 3) {
      setShowOtherInput(true);
    } else {
      setShowOtherInput(false);
    }
    handleCertificat(value);
    console.log('value', value);
  };

  const handleAddData = () => {
    // Perform the necessary logic to add data to the dataSource
    const newData = [...dataSourceCertificate];
    setDataSourceCertificate(newData);
  };
  const dummyRequest = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };
  const handleSyncPerson = () => {
    let personalId = form.getFieldValue('personalId');
    let certificateNumber = form.getFieldValue('certificateNumber');

    const data = {
      personalId: personalId,
      certificateNumber: certificateNumber,
    };

    if (!personalId || personalId.length != 11) {
      message.error('პირადი ნომერი უნდა იყოს 11 ნიშნა !');
    }
    if (!certificateNumber) {
      message.error('მიუთითეთ ნომერი სწორად !');
    }
    console.log(personalId, certificateNumber);

    dispatch(postDoctorCertificates(data));
    // window.location.reload();
    handleAddData();
  };

  const addItem = () => {
    console.log('namename1236', name);
    if (name.trim()) {
      let exist = departments.find((r: any) => r.name == name.trim());
      if (!exist) {
        console.log('exist', exist, departments);
        console.log('namename', name);
        const newItem = { id: name.trim(), name: name.trim() }; // Create the new item object
        setDepartments([...departments, newItem]); // Update the departments array with the new item

        setName('');
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      }
    }
  };

  useEffect(() => {
    if (certificateCategory.length) {
      setDataSourceCertificate(certificateCategory);
    }
  }, [certificateCategory]);

  const columns: ColumnsType<DataType> = [
    { key: 1, title: 'ნომერი', dataIndex: 'certificateNumber' },
    { key: 2, title: 'სპეციალობა', dataIndex: 'speciality' },
    {
      key: 3,
      title: 'მინიჭებულია',
      dataIndex: 'assignmentDate',
      render: text => moment(text).format('YYYY-MM-DD'),
    },
  ];

  const options = departments.map((item: any) => ({
    label: item.name,
    value: item.name,
    key: item.id,
  }));
  return (
    <>
      <h3>პოზიციაზე დანიშვნა</h3>

      <Card bordered={false}>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <Form.Item
            label="ფილიალი"
            name="organizationId"
            rules={[{ required: true, message: 'შეავსეთ ველი !' }]}
          >
            <Select
              disabled={editedData ? true : false}
              // mode="multiple"
              // value={currentOrganization}
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
          <Form.Item
            label="განყოფილება"
            name="department"
            rules={[{ required: true, message: 'შეავსეთ ველი !' }]}
          >
            <Select
              disabled={editedData?.departmentName ? true : false}
              style={{ width: 300 }}
              placeholder="აირჩიეთ განყოფილება"
              dropdownRender={menu => (
                <>
                  {menu}
                  <Divider style={{ margin: '8px 0' }} />
                  <Space style={{ padding: '0 8px 4px' }}>
                    <Input
                      placeholder="დაამატეთ ახალი"
                      // ref={inputRef}
                      // value={name}
                      onChange={onNameChange}
                    />
                    <Button
                      style={{ marginTop: '10px' }}
                      type="text"
                      icon={<PlusOutlined />}
                      onClick={addItem}
                    >
                      სხვა
                    </Button>
                  </Space>
                </>
              )}
              options={options}
            />
          </Form.Item>
          <Form.Item
            label="პოზიცია"
            name="position"
            rules={[{ required: true, message: 'შეავსეთ ველი !' }]}
          >
            <Select
              disabled={editedData ? true : false}
              allowClear
              placeholder="აირჩიეთ პოზიცია"
              onChange={handlePositionChange}
              style={{ width: 180 }}
              options={[
                {
                  value: 1,
                  label: 'ექიმი',
                },
                {
                  value: 2,
                  label: 'ექთანი',
                },
                {
                  value: 3,
                  label: 'სხვა',
                },
              ]}
            />
          </Form.Item>
          {showOtherInput && (
            <Form.Item
              label="დასახელება"
              name="otherPositionName"
              rules={[{ required: true, message: 'შეავსეთ ველი !' }]}
            >
              <Input placeholder="Please enter item" onChange={onNameChange} />
            </Form.Item>
          )}

          {showCertificat && (
            <>
              <Form.Item
                label="სერტიფიკატის N"
                name="certificateNumber"
                rules={[{ required: true, message: 'შეავსეთ ველი !' }]}
              >
                <Input style={{ width: 180 }} />
              </Form.Item>
              <Form.Item style={{ marginTop: 21 }} name={'syncButton'}>
                <Button
                  loading={asyncLoading}
                  onClick={handleSyncPerson}
                  shape="circle"
                  icon={<SyncOutlined />}
                  size="large"
                />
              </Form.Item>
              <Form.Item
                style={{ display: 'none' }}
                name="certificateNumbers"
              ></Form.Item>
            </>
          )}
        </div>
        {showCertificat && <h4>სერტიფიკატები</h4>}
        <div style={{ display: 'flex', gap: '4rem' }}>
          <div style={{ marginTop: '25px' }}>
            {showCertificat && (
              <Table
                rowSelection={{
                  type: selectionType,
                  selectedRowKeys,
                  onChange: selectedKeys => {
                    console.log('selectedKeys', selectedKeys);
                    setSelectedRowKeys(selectedKeys);
                    form.setFieldsValue({
                      certificateNumbers: selectedKeys,
                    });
                  },
                }}
                rowKey={(row: any, index: any) => {
                  return row.certificateNumber;
                }}
                columns={columns}
                loading={syncLoading}
                dataSource={dataSourceCertificate}
                pagination={false}
              />
            )}
          </div>
          <Form.Item
            rules={[{ required: true, message: 'შეავსეთ ველი !' }]}
            label="დაწყების თარიღი"
            name="contractStartDate"
          >
            <DatePicker
              style={{ width: '100%' }}
              disabled={editedData ? true : false}
            />
          </Form.Item>
          <Form.Item
            // rules={[{ required: true, message: 'შეავსეთ ველი !' }]}
            label="გათავისუფლების თარიღი"
            name="contractEndDate"
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          {/* <Form.Item name="date1" label="DatePicker">
            <DatePicker />
          </Form.Item> */}
          <div>
            <Form.Item
              rules={[
                {
                  validator: _ => {
                    console.log('fileListfileList', fileList);
                    if (fileList.length === 0) {
                      return Promise.reject('ატვირთეთ დასაქმებულის ხელშეკრულება!');
                    }
                    return Promise.resolve();
                  },

                  required: true,
                },
                // ({ getFieldValue }) => ({
                //   validator: (_, value) => {
                //     console.log('fileListfileList', getFieldValue('doc'),fileList);
                //     if (!fileList || getFieldValue('doc') === value) {
                //       return Promise.resolve();
                //     }

                //     if (fileList.length === 0) {
                //       return Promise.reject('ატვირთეთ დასაქმებულის ხელშეკრულება!');
                //     }
                //     return Promise.resolve();
                //   },
                // }),
              ]}
              label="შრომის ხელშეკრულება"
              name="doc"
            >
              <Upload
                customRequest={dummyRequest}
                {...props}
                maxCount={1}
                fileList={fileList}
              >
                <Button className="upload-button">
                  ატვირთვა
                  <UploadOutlined style={{ marginLeft: '5px' }} />
                </Button>
              </Upload>{' '}
            </Form.Item>
            <Form.Item name={'saveButton'}>
              <div
                style={{
                  display: 'flex',
                  marginTop: '40px',
                }}
              >
                <Button
                  className="fixedButton"
                  style={{ marginTop: '20px', marginLeft: '100px' }}
                  loading={addEmployeeLoading}
                  type="primary"
                  htmlType="submit"
                >
                  შენახვა
                </Button>
              </div>
            </Form.Item>
          </div>
        </div>
      </Card>
      <br />
    </>
  );
};
