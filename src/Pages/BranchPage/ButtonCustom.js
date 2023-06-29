import { EditOutlined, SaveOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

import React, { useState } from 'react';
import { useAppSelector } from '../../hooks';

const ButtonCustom = ({ handleClick, icon, htmlType, record, mode }) => {
  const [isEditing, setIsEditing] = useState(false);

  const userData = useAppSelector(state => state.user.userData);


  const handleEdit = () => {
    setIsEditing(false);
  };

  const handleButtonClick = mode => {
    setIsEditing(prev => !prev);

    handleClick(mode, record);
  };

  if (userData.permissions && userData.permissions['Moderator']) {
    return null;
  }

  return (
    <>
      {/* {mode === 'edit' ? ( */}
      {isEditing ? (
        <>
          <Tooltip title="შენახვა">
            <Button
              icon={<SaveOutlined />}
              shape="circle"
              onClick={() => handleButtonClick('save')}
            ></Button>
          </Tooltip>
        </>
      ) : (
        <Tooltip title="რედაქტირება">
          <Button
            onClick={() => handleButtonClick('edit')}
            shape="circle"
            icon={<EditOutlined />}
          />
        </Tooltip>
      )}
    </>
  );
};

export default ButtonCustom;
