import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Input, Progress } from 'antd';
import { useAppSelector } from '../../hooks';
import dayjs, { Dayjs } from 'dayjs';
import './sheetInfo.css';

export const SheetInfo = ({ onFinish }: any) => {
  const { resources } = useAppSelector(state => state.timeSheets.timeSheets);
  const [currentDay, setCurrentDay] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [branch, setBranch] = useState('');

  interface Location {
    id: string;
    actualAddress: string;
  }
  const organizationsForSelect: Location[] = useAppSelector(
    state => state.organization.organizationsForSelect
  );
  console.log('organizationsForSelect', organizationsForSelect);

  const findAddressNameById = () => {
    const addressFromStorage = localStorage.getItem('currentOrganization');
    const address: any = organizationsForSelect.find(
      address => address.id === addressFromStorage
    );
    console.log('sofiaddress', address);
    return address ? address.actualAddress : null;
  };

  useEffect(() => {
    findAddressNameById();
  }, []);

  const calculateLeftDays = () => {
    const today = dayjs();
    const isAfter25th = today.date() > 26;
    const next25th = today
      // .clone()
      .date(26)
      .add(isAfter25th ? 1 : 0, 'month');
    const daysUntilNext25th = next25th.diff(today, 'day');

    return daysUntilNext25th;
  };

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    setCurrentDate(`${day}.${month}.${year}`);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        gap: 30,
      }}
    >
      <Card
        className="card"
        style={{
          width: 600,
          color: '#fff',
          background:
            'linear-gradient(180deg, #051C7D 0%, rgba(5, 28, 125, 0.95) 25%, rgba(5, 28, 125, 0.85) 50%, rgba(5, 28, 125, 0.75) 75%, rgba(5, 28, 125, 0.65) 99.48%)',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 150 }}>
          <div>
            <p>ფილიალი</p>
            {<p>{findAddressNameById()}</p>}
          </div>
          <div>
            <p>თარიღი</p> <p>{currentDate}</p>
          </div>
        </div>
      </Card>
      <Card style={{ background: '#046DF8', color: '#fff' }}>
        <div style={{ display: 'flex' }}>
          <div>
            <Progress
              strokeWidth={10}
              trailColor="#051C7D"
              strokeColor={'#fff'}
              type="circle"
              percent={Math.round(resources.lambdaCount)}
              width={80}
            />
          </div>
          <div style={{ marginLeft: 15 }}>
            <p>სულ შევსებულია {Math.round(resources.lambdaCount)}%</p>
            {/* <button onClick={calculateLeftDays}></button> */}
            <p>გადაგზავნამდე დარჩენილია {calculateLeftDays()} დღე</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
