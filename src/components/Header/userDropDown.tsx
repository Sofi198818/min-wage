import React, { useEffect, useState } from 'react';
import {
  DownOutlined,
  LockOutlined,
  LogoutOutlined,
  SearchOutlined,
  SmileOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router';
import {
  ADD_NEW_EMPLOYEE,
  ADD_NEW_USER,
  LOGIN_PAGE,
  PASSWORDRECOVERY_PAGE,
} from '../../router/paths';

export const UserDropDown: React.FC = () => {
  //   const { user } = useAppSelector(state => state.user.organization);
  const userData = useAppSelector(state => state.user.userData);

  const signOut = () => {
    localStorage.clear();
    navigate(LOGIN_PAGE);
    // window.location.reload();

    console.log('გასვლა', localStorage);
  };
  const [items, setItems] = useState([
    {
      key: '2',
      icon: <LogoutOutlined />,
      label: (
        <div
          style={{
            backgroundColor: '#051C7D',
            borderRadius: '55px',
            color: '#fff',
            fontSize: 'small',
            height: '25px',
            width: '100%',
            padding: '5px 2px 2px 2px',
            margin: '0auto',
            textAlign: 'center',
            marginRight: '20px',
          }}
          onClick={signOut}
        >
          გასვლა
        </div>
      ),
    },
  ]);

  console.log('useruseruser', userData);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('ManagerManager', userData);
    if (userData.permissions && userData.permissions['Manager']) {
      const newObjet = {
        key: '1',
        icon: <UserOutlined />,
        label: (
          <div
            style={{
              backgroundColor: '#051C7D',
              borderRadius: '55px',
              color: '#fff',
              fontSize: 'small',
              height: '25px',
              width: '100%',
              padding: '5px 2px 2px 2px',
              margin: '0auto',
              textAlign: 'center',
              marginRight: '20px',
            }}
            onClick={addEmployee}
          >
            მომხმარებლის მართვა
          </div>
        ),
      };

      setItems([newObjet, ...items]);
    }
  }, [userData]);

  useEffect(() => {
    console.log('ManagerManager', userData);
    if (userData.permissions && !userData.permissions['Manager']) {
      const newObject = {
        key: '1',
        icon: <UserOutlined />,
        label: (
          <div
            style={{
              backgroundColor: '#051C7D',
              borderRadius: '55px',
              color: '#fff',
              fontSize: 'small',
              height: '25px',
              width: '100%',
              padding: '5px 2px 2px 2px',
              margin: '0auto',
              textAlign: 'center',
              marginRight: '20px',
            }}
            onClick={addEmployee}
          >
            პაროლის ცვლილება
          </div>
        ),
      };
      setItems([newObject, ...items]);
    }
  }, [userData]);

  const addEmployee = () => {
    console.log('addEmployeeaddEmployee');
    if (userData.permissions['Manager']) {
      navigate(ADD_NEW_USER);
    } else {
      navigate(PASSWORDRECOVERY_PAGE);
    }
  };
  const resetPass = () => {
    console.log('resetPassresetPass');
  };

  // const items: MenuProps['items'] = [
  //   {
  //     key: '1',
  //     label: <div onClick={addEmployee}>მომხმარებლის მართვა</div>,
  //     icon: <UserAddOutlined />,
  //   },
  //   {
  //     key: '2',
  //     label: <div onClick={resetPass}>პაროლის ცვლილება</div>,
  //     icon: <LockOutlined />,
  //   },
  // ];

  console.log('UserDropDown');
  return (
    <div
      style={{
        backgroundColor: '#051C7D',
        borderRadius: '55px',
        marginLeft: '20px',
      }}
    >
      <Dropdown menu={{ items }} placement="bottomLeft">
        <Button
          style={{ backgroundColor: '#051C7D', borderRadius: '55px' }}
          type="primary"
          icon={<UserOutlined />}
        >
          {userData.user?.firstName} {userData.user?.lastName}
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};
