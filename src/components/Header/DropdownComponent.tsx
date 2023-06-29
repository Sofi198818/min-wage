import { Button, Dropdown } from 'antd';
import React, { useState, useEffect } from 'react';
import vector from './ImagesForHeader/v.png';
// import './NewHeader.css'
import Polygon from './ImagesForHeader/Polygon.png';
import { useLocation } from 'react-router';

export const DropdownComponent = ({ title, items }: any) => {
  const location = useLocation();

  const [hide, setHide] = useState(false);

  useEffect(() => {
    setHide(false);
  }, [location]);

  const onChange = (e: any) => {
    setHide(e);
  };
  return (
    <>
      <Dropdown
        onOpenChange={onChange}
        menu={{ items }}
        trigger={['click']}
        className="H-Dropdown"
        placement="bottom"
      >
        <Button className="H-btn">
          <p>{title}</p>
          <img src={vector} />
        </Button>
      </Dropdown>
      <img
        className="polygon"
        style={{ display: hide ? 'block' : 'none' }}
        src={Polygon}
      />
    </>
  );
};
