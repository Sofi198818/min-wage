import React, { memo, useEffect, useState } from 'react';
import {
  CalendarOutlined,
  CheckCircleOutlined,
  FieldTimeOutlined,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Alert, Button, Card, Form, Input, Progress, Tag } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fiilSheetDetails } from '../../../redux/slices/timeSheets';
import '../index.css';
import './sheetDetails.css';
import dayjs from 'dayjs';

const SheetDetailInfo = () => {
  const sheetDetail = useAppSelector(state => state.timeSheets.sheetDetails);
  const dispatch = useAppDispatch();

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    const newValue = value < 0 ? 0 : value; // If value is negative, set it to zero
    dispatch(
      fiilSheetDetails({ ...sheetDetail, [name]: newValue ? newValue : null })
    );
  };

  const getDayText = () => {
    const today = dayjs();

    const tenthDay = dayjs().date(11);

    const isBeforeTenth = today.isBefore(tenthDay);

    if (isBeforeTenth) {
      return 'მიმდინარე';
    } else {
      return 'მომდევნო';
    }
  };

  const disabledInputs = () => {
    return false;
  };

  return (
    <div>
      <Card className="card-style">
        <div style={{ display: 'flex' }}>
          <div style={{ marginTop: '40px', marginRight: '30px' }}>
            <p>
              {sheetDetail.firstName} {sheetDetail.lastName}
            </p>

            <p>{sheetDetail.positionName}</p>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div style={{ marginTop: '40px' }}>
              <CalendarOutlined style={{ fontSize: 19, color: '#fff' }} />
              <span style={{ marginLeft: 7 }}>
                დღე - <Tag color="blue">{sheetDetail.totalDays}</Tag>
              </span>
            </div>
            <div style={{ marginTop: 15 }}>
              <FieldTimeOutlined style={{ fontSize: 19, color: '#fff' }} />
              <span style={{ marginLeft: 7 }}>
                საათების ჯამი - <Tag color="blue">{sheetDetail.totalHours}</Tag>
              </span>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              marginLeft: '20px',
            }}
          >
            <div>შეავსეთ ველები და აღრიცხეთ გაცემული შრომის ანაზღაურება</div>
            <div style={{ display: 'flex', gap: 20 }}>
              <div>
                <p>ზეგანაკვეთური</p>
                <Input
                  value={sheetDetail.overTime}
                  name="overTime"
                  onChange={handleChangeInput}
                  type={'number'}
                  style={{
                    width: 100,
                    borderRadius: '40px',
                    background: 'rgba(218, 236, 255, 0.4)',
                  }}
                  placeholder="დრო"
                  prefix={<FieldTimeOutlined />}
                  disabled={disabledInputs()}
                />
              </div>
              <div>
                <p style={{ display: 'flex', justifyContent: 'center' }}>ღამე</p>
                <Input
                  value={sheetDetail.night}
                  name="night"
                  onChange={handleChangeInput}
                  type={'number'}
                  style={{
                    width: 100,
                    borderRadius: '40px',
                    background: 'rgba(218, 236, 255, 0.4)',
                  }}
                  placeholder="დრო"
                  prefix={<FieldTimeOutlined />}
                />
              </div>
              <div>
                <p style={{ display: 'flex', justifyContent: 'center' }}>
                  დასვენება
                </p>
                <Input
                  value={sheetDetail.holiday}
                  name="holiday"
                  onChange={handleChangeInput}
                  type={'number'}
                  style={{
                    width: 100,
                    borderRadius: '40px',
                    background: 'rgba(218, 236, 255, 0.4)',
                  }}
                  placeholder="დრო"
                  prefix={<FieldTimeOutlined />}
                />
              </div>
              <div>
                <p style={{ display: 'flex', justifyContent: 'center' }}>სხვა</p>
                <Input
                  value={sheetDetail.other}
                  name="other"
                  onChange={handleChangeInput}
                  type={'number'}
                  style={{
                    width: 100,
                    borderRadius: '40px',
                    background: 'rgba(218, 236, 255, 0.4)',
                  }}
                  placeholder="დრო"
                  prefix={<FieldTimeOutlined />}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              marginLeft: '30px',
              marginTop: '23px',
            }}
          >
            <p>გაცემული შრომის ანაზღაურება</p>{' '}
            <Input
              value={sheetDetail.salary}
              name="salary"
              onChange={handleChangeInput}
              type={'number'}
              style={{
                width: 150,
                borderRadius: '40px',
                background: 'rgba(218, 236, 255, 0.4)',
              }}
              placeholder="თანხა"
              prefix="₾"
            />
          </div>
        </div>
      </Card>
      <div style={{ display: 'flex', gap: 15, marginTop: 15 }}>
        <div className="warning-div">
          <p style={{ textAlign: 'center' }}>
            გთხოვთ, გაითვალისწინოთ! მიმდინარე თვის სამუშაო საათების აღრიცხვის ფორმა,{' '}
            მარეგულირებელ ორგანოში გაიგზავნება {getDayText()} თვის 25 რიცხვში.
          </p>
        </div>
        <Card
          size="small"
          style={{
            borderRadius: '20px',
            padding: 10,
            background:
              'linear-gradient(180deg, #051C7D 0%, rgba(5, 28, 125, 0.95) 25%, rgba(5, 28, 125, 0.85) 50%, rgba(5, 28, 125, 0.75) 75%, rgba(5, 28, 125, 0.65) 99.48%)',
          }}
        >
          <p style={{ color: '#FFFFFF' }}>
            პირობითი აღნიშვნის დასასმელად, დააჭირეთ სასურველ თარიღს და აირჩიეთ.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default memo(SheetDetailInfo);
