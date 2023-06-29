import { FileExcelOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/layout/layout';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fillTimeSheetsFilter } from '../../redux/slices/timeSheets';
import { downloadExport } from '../../service/timeSheets';
import { getActiveMonthForSheet } from '../../utils';
import { SheetFilter } from './sheetFilter';
import { SheetInfo } from './sheetInfo';
import { SheetTable } from './sheetTable';
import dayjs, { Dayjs } from 'dayjs';

export const SheetPage = () => {
  const dispatch = useAppDispatch();

  const filter = useAppSelector(state => state.timeSheets.timeSheetsFilter);
  // const filter = useAppSelector(state => ({
  //   filter: state.timeSheets.timeSheetsFilter,
  //   data: state.timeSheets.timeSheets.data
  // }));
  console.log('filter123', filter)
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   let currentActiveMonth = getActiveMonthForSheet();
  //   let filterData = {
  //     ...filter,
  //     month: currentActiveMonth.month()+1,
  //   };

  //   console.log('filterDatafilterData',filterData)
  //   dispatch(fillTimeSheetsFilter(filterData));
  // }, []);

  const exportData = async () => {
    console.log('asa');
    setLoading(true);
    let result = await downloadExport(filter);

    console.log('resultresult', result.message);
    const url = URL.createObjectURL(
      new Blob([result], { type: 'application/octet-stream' })
    );
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `ექსპორტი - ${dayjs().format('YYYY-MM-DD HH-mm-ss')}.xlsx`
    );
    document.body.appendChild(link);
    link.click();
    setLoading(false);
  };

  return (
    <>
      <SheetInfo />
      <div style={{ marginTop: 25, marginBottom: 35 }}>
        <SheetFilter />
      </div>
      <Button
        loading={loading}
        onClick={exportData}
        style={{ marginBottom: 15 }}
        type="primary"
        icon={<FileExcelOutlined />}
      >
        ექსპორტი
      </Button>
      <SheetTable />
    </>
  );
};
