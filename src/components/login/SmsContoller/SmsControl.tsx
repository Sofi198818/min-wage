import React, { useCallback, useState, useEffect } from 'react';
// import { Button } from "react-bootstrap";
// import Swal from "sweetalert2";
import { Button, Input, message } from 'antd';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { passwordRecovery } from '../../../service/user';
import { showErrorMessage } from '../../../utils';

// import OperatorAddSteitment from "../../../store/OperatorAddSteitment";
// import { observer } from "mobx-react-lite";
type smsProps = {
  userName?: string;
  mobileNumber?: string;
};

export const SmsControl = (props: smsProps) => {
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (smsLoginError) {
  //     message.error('პაროლი არასწორია!');
  //   }
  // }, [smsLoginError]);

  // useEffect(() => {
  //   if (smsLoginSuccess) {
  //     message.success('sms გამოგზავნილია მითითებულ ნომერზე');
  //   }
  // }, [smsLoginSuccess]);

  // const onFinish = (user: UserDTO) => {
  //   console.log('Received values of form: ', user);

  //   let formData = new FormData();
  //   formData.append('password', user.password);
  //   formData.append('userName', user.userName);
  //   formData.append('userName', user.smsCode);

  //   dispatch(loginUser(formData));
  // };

  const [smsData, setSmsData] = useState<any>(null);
  const [smsSecconds, setSmsSecconds] = useState<number>(6);
  const [smsShow, setSmsShow] = useState<boolean>(false);
  const [smsInterval, setSmsInterval] = useState<any>(null);
  const [startCounter, setStartCounter] = useState<boolean>(false);

  // const [smsCode, setSmsCode] = useState<any>(null);

  // const [smsInfo, setSmsInfo] = useState([
  //   {
  //     userName: '',
  //     password: '',
  //   },
  // ]);

  // const changeSmsCod = (e: any) => {
  //   console.log(e.target.value, 'e')
  //   setSmsCode(e.target.value)
  // }

  useEffect(() => {
    // console.log(props.userName, "userName")
    // console.log(props.password, "password")

    // console.log(startCounter, "zeda", smsCode, 'smsCode')

    if (startCounter === true) {
      console.log(startCounter);
      setSmsShow(true);

      const timerId = setInterval(() => setSmsSecconds(smsSecconds - 1), 1000);
      return () => clearInterval(timerId);
      // if (smsSecconds > 0) {
      //   setSmsSecconds(smsSecconds - 1)
      // }
      // // smsSecconds > 0 && setInterval(() => setSmsSecconds(smsSecconds - 1), 1000);
      // return () => clearInterval(smsInterval)
    }
  }, [smsSecconds, startCounter]);

  useEffect(() => {
    if (smsSecconds === 0 && startCounter === true) {
      console.log(smsSecconds, startCounter);
      setStartCounter(false);
      setSmsSecconds(60);
      setSmsShow(false);

      // setSmsSecconds(5)
      // resetTimer();
      // timerControl();
    }
  }, [smsSecconds, startCounter]);

  const handleSmsClick = async () => {
    setStartCounter(true);
    const obj = {
      userName: props.userName,
      mobileNumber: props.mobileNumber,
    };

    console.log('obj', obj);

    try {
      let result = await passwordRecovery(obj.userName ?? '');
      console.log('resultresult', result);
      message.success('სმს გაიგზავნა წარმატებით')
    } catch (error: any) {
      console.log('errrror tryy', error);
      showErrorMessage(message, error);
    }
  };

  const resetTimer = () => {
    console.log('შეჩერდა ტაიმერი');
    setSmsSecconds(6);
    setSmsShow(false);
    clearInterval(smsInterval);
  };

  const timerControl = () => {
    // console.log(smsShow, 'შოუ სმს')
    // if (smsShow) {
    return (
      <>
        <Input.Group compact>
          {/* <Input style={{ width: 'calc(100% - 200px)' }}
            onChange={(e) => changeSmsCod(e)}
          /> */}
          {smsShow ? (
            <Button
              // variant="outline-secondary sms-button"
              disabled
              className="smsBtn"
              onClick={handleSmsClick}
              style={{ zIndex: 1 }}
            >
              {smsSecconds}
            </Button>
          ) : (
            <Button
              // variant="outline-secondary sms-button"
              className="smsBtn"
              onClick={handleSmsClick}
            >
              SMS კოდი
            </Button>
          )}
        </Input.Group>
      </>
    );
    // }
    // return (
    //   <Input.Group compact>
    //     <Input style={{ width: 'calc(100% - 200px)' }} placeholder="sms კოდი"
    //       onChange={(e) => changeSmsCod(e)}
    //     />
    //     <Button
    //       // variant="outline-secondary sms-button"
    //       onClick={handleSmsClick}
    //       style={{ zIndex: 0, width: "150px" }}
    //     >
    //       sms კოდი
    //     </Button>
    //   </Input.Group >
    // );
  };

  return <>{timerControl()}</>;
};
