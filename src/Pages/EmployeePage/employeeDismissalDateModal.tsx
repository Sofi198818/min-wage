import React, { useState } from 'react';
import { Button, DatePicker, Modal } from 'antd';
import { UserDeleteOutlined } from '@ant-design/icons';

type Props = {
  handleChange: (data: any) => void;
  record: any;
  loading: boolean;
};
export const EmployeeDismissalDateModal = ({ record, handleChange,loading }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState(false);
  // const [loading, setloading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log('dateStringdateString', date, record);
    handleChange({
      id: record.id,
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

  const disabled = () => {
    console.log(
      'record.contractEndDate',
      new Date(record.contractEndDate) > new Date()
    );
    if (!record.contractEndDate) {
      return false;
    }
    return new Date(record.contractEndDate) < new Date();
  };
  return (
    <>
      <Button
        disabled={disabled()}
        onClick={showModal}
        shape="circle"
        icon={<UserDeleteOutlined style={{ color: 'red' }} />}
      />
      <Modal
        title="განთავისუფლების თარიღი"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={500}
        okText={'შენახვა'}
        okButtonProps={{loading: loading}}
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
          <DatePicker style={{ width: 280 }} onChange={onChange} />
        </div>
      </Modal>
    </>
  );
};
