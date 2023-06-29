import React, { useState, useRef, useEffect } from 'react';
import { BadgeProps, Card, message, Spin, Tooltip } from 'antd';
import { Badge, Calendar, Popover, Button, Tag, Input, InputNumber } from 'antd';
import type { Dayjs } from 'dayjs';
import { CheckOutlined, FieldTimeOutlined, SaveOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import SheetDetailInfo from './sheetDetailInfo';
import { SheetDetailFilter } from './sheetDetailFilter';
import SheetCalendar from './sheetCalendar';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  addTimeSheetDetailsComment,
  getTimeSheetDetailsById,
  reseAddTimeSheetDetailsCommentSuccess,
} from '../../../redux/slices/timeSheets';
import SheetDetailComments from './sheetDetailComments';
import { useNavigate, useParams } from 'react-router';
const { Search } = Input;

const SearchInput = () => {
  const onSearch = (value: string) => console.log(value);

  return <Search placeholder="input search text" onSearch={onSearch} />;
};

export const SheetDetails = () => {
  const sheetDetail = useAppSelector(state => state.timeSheets.sheetDetails);
  const { permissions } = useAppSelector(state => state.user.userData);
  const navigate = useNavigate();

  const { id, contractId } = useParams();

  const getTimeSheetDetailsByIdLoading = useAppSelector(
    state => state.timeSheets.getTimeSheetDetailsByIdLoading
  );

  const addTimeSheetDetailsCommentLoading = useAppSelector(
    state => state.timeSheets.addTimeSheetDetailsCommentLoading
  );
  const addTimeSheetDetailsCommentSuccess = useAppSelector(
    state => state.timeSheets.addTimeSheetDetailsCommentSuccess
  );

  const addTimeSheetDetailsCommentErrors = useAppSelector(
    state => state.timeSheets.addTimeSheetDetailsCommentErrors
  );

  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');

  const myRefname = useRef(null);
  const openPop = () => {
    console.log(122);
    setOpen(true);
  };

  useEffect(() => {
    console.log('idid', id, contractId);
    if (id != 'null') {
      console.log('sofiId', id);
      dispatch(getTimeSheetDetailsById(id ?? ''));
    } else {
      if (contractId) {
        console.log('soficontractId', contractId);
        dispatch(getTimeSheetDetailsById(contractId));
      }
    }
  }, [id, contractId]);

  useEffect(() => {
    console.log('985874', addTimeSheetDetailsCommentSuccess);
    if (addTimeSheetDetailsCommentSuccess) {
      message.success('წარმატებით დასრულდა');
      setComment('');
      dispatch(getTimeSheetDetailsById(sheetDetail.id));

      dispatch(reseAddTimeSheetDetailsCommentSuccess(false));
    }
  }, [addTimeSheetDetailsCommentSuccess]);

  // const onSelectDate = () => {
  //   console.log("onselect", myRefname.current);
  //   // myRefname.current.click();
  //   openPop();
  // };

  const handleCommentChange = (e: any) => {
    console.log('ee', e.target.value);
    setComment(e.target.value);
  };

  const addComment = () => {
    console.log('commentcomment', comment);
    dispatch(
      addTimeSheetDetailsComment({
        timeSheetId: sheetDetail.id,
        text: comment,
      })
    );
  };

  return (
    <div>
      <Spin tip="იტვირთება..." spinning={getTimeSheetDetailsByIdLoading}>
        <div>
          <SheetDetailInfo />
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {/* <div>
            <SheetDetailFilter />
          </div> */}
          <div>
            <div style={{ margin: '5px 0 5px 0' }}>
              <SheetCalendar />
            </div>
            <>
              {permissions && permissions['Moderator'] ? (
                <>
                  <div>
                    <div style={{ marginBottom: -6 }}>
                      <h4>კომენტარი</h4>
                    </div>
                    <TextArea
                      rows={4}
                      value={comment}
                      onChange={handleCommentChange}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 15,
                        marginTop: 10,
                      }}
                    >
                      <Button
                        loading={addTimeSheetDetailsCommentLoading}
                        onClick={addComment}
                        type="primary"
                        icon={<SaveOutlined />}
                      >
                        კომენტარის შენახვა
                      </Button>
                    </div>
                  </div>{' '}
                </>
              ) : null}
            </>

            <div>
              <div style={{ marginBottom: -6 }}>
                <h4>კომენტარების ისტორია</h4>
              </div>
              <div>
                <SheetDetailComments />
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </div>
  );
};
