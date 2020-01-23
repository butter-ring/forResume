/* eslint-disable no-nested-ternary */
/**
 *
 * Otp
 *
 */

import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import history from 'utils/history';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import request from 'utils/request';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: 30,
  },
  title: {
    fontSize: 28,
    color: '#323232',
    paddingLeft: 20,
    paddingBottom: 20,
  },
  buttonProgress: {
    position: 'relative',
  },
  textField: {
    marginLeft: 37,
    marginRight: 11,
    paddingLeft: 25,
    // textDecoration: 'none',
    width: 202,
    height: 43,
    border: '1px solid #a6a6a6',
    borderRadius: 3,
    backgroundColor: '#ffffff',
    fontSize: 13,
    // webkitappearance: 'none',
  },
  authactive: {
    marginLeft: 37,
    marginRight: 11,
    width: 202,
    height: 43,
    border: '1px solid #00000042',
    borderRadius: 3,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontSize: 12,
  },
  button: {
    width: 90,
    height: 43,
    // backgroundColor: '#ffffff',
    border: '1px solid #ffba32',
    borderRadius: 3,
    color: '#787878',
    fontSize: 12,
    // margin: theme.spacing(1),
  },
  buttondisabled: {
    width: 90,
    height: 43,
    border: '1px solid #00000042',
    borderRadius: 3,
    color: '#787878',
    fontSize: 12,
  },
  qrcodeimg: {
    width: 202,
    height: 202,
    marginLeft: 37,
    marginRight: 11,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    border: '1px solid #b5b5b6',
    borderRadius: 2,
  },
});

export function Otp() {
  const classes = useStyles();
  const [otpkey, setOtpkey] = useState('');
  const [otpqrcode, setOtpqrcode] = useState('');
  const [otpdigit, setOtpdigit] = useState('');
  const [otpdigitplace, setOtpdigitplace] = useState('   OTP 코드 입력');
  const [otpactive, setOtpactive] = useState(false);
  const [loadingAll, setLoadingAll] = useState(false);
  const [useridnum, setUseridnum] = useState('');

  if (!sessionStorage.getItem('accessToken')) {
    history.push('/');
  }
  useEffect(() => {
    generateOtp();
    setUseridnum(sessionStorage.getItem('userId'));
  }, []);

  const EnterEvent = event => {
    if (event.key === 'Enter' && otpdigit.length === 6) {
      Otpcheck();
    }
  };

  const handleChange = e => {
    const numberonly = e.target.validity.valid ? e.target.value : '';
    setOtpdigit(numberonly);
  };

  const generateOtp = async () => {
    // setLoading(true);
    setLoadingAll(true);
    const options = {
      method: 'GET',
      auth: true,
    };

    console.log(options);
    try {
      const response = await request(`/api/otp`, options);
      console.log(response);
      if (response.data !== null) {
        console.log(response.data.authKey);
        setOtpkey(response.data.authKey);
        setOtpqrcode(response.data.authKeyurl);
        setOtpactive(response.data.authKeyactive);
        setLoadingAll(false);
      }
    } catch (err) {
      console.log(err.response);
      setLoadingAll(false);
    }
    // setLoading(false);
    setLoadingAll(false);
  };

  const Otpcheck = async () => {
    // setLoading(true);
    setLoadingAll(true);
    const options = {
      method: 'POST',
      auth: true,
      data: {
        otpdigit,
        useridnum,
      },
    };

    console.log(options);
    try {
      const response = await request(`/api/otp/otpcheck`, options);
      console.log(response);
      if (response.data !== null) {
        console.log(response.data);
        if (response.data === false) {
          setOtpdigit('');
          setOtpdigitplace(' 잘못된 OTP 코드 입니다');
        }
        if (response.data === true) {
          setOtpactive(response.data);
        }

        // console.log(response.data.authKey);
        // setOtpkey(response.data.authKey);
        // setOtpqrcode(response.data.authKeyurl);
        setLoadingAll(false);
      }
    } catch (err) {
      console.log(err.response);
      setLoadingAll(false);
    }
    // setLoading(false);
    setLoadingAll(false);
  };

  return (
    <div className={classes.root}>
      {loadingAll && (
        <CircularProgress size={50} className={classes.buttonProgress} />
      )}
      <div className={classes.title}>OTP 인증</div>
      <Divider />
      <br />
      STEP 1. OTP앱을 다운로드해 주십시오.
      <br />
      Apple App Store및 Google Play Store에서 Google OTP인증 앱을 휴대기기에
      다운로드해 주십시오.
      <br />
      <br />
      <Divider />
      <br />
      STEP 2. 카메라로 QR code 스캔 또는 16자리 코드번호 입력
      <br />
      위에서 설치한 OTP 인증 앱을 실행한 후, ‘바코드 스캔’을 실시하여 아래에
      표시된 QR 코드를 스마트폰으로 스캔해 주십시오.
      <br />
      또는 ‘제공된 키 입력’을 선택하시어 16자리 코드번호를 입력하셔도 됩니다.
      <br />
      <br />
      <div>
        <div className={classes.qrcodeimg}>
          <img src={otpqrcode} alt="" />
        </div>
        <input
          type="text"
          // placeholder="Google OTP"
          value={otpkey}
          className={classes.textField}
          name="otpkey"
          disabled
        />
        <br />
        <br />
        <div>
          ** OTP가 등록된 휴대기기를 분실하시거나 교체하시는 경우를 위해 위에
          표시된 16자리 코드번호를 수첩이나 메모장에 적어 안전한 장소에
          보관하십시오.
          <br />
          동일 휴대기기 또는 컴퓨터에 위의 코드를 저장하는 것은 보안 상의 위험이
          높기 때문에 권장하지 않습니다.
        </div>
        <br />
      </div>
      <Divider />
      <br />
      <br />
      STEP 3. OTP앱에 생성된 6자리 코드를 입력하십시오.
      <br />
      <br />
      {!loadingAll && !otpactive ? (
        <input
          className={classes.textField}
          type="text"
          name="otpCode"
          // type="number"
          pattern="[0-9]*"
          value={otpdigit}
          onChange={handleChange}
          maxLength="6"
          max="999999"
          onKeyPress={EnterEvent}
          // onKeyPress="return event.charCode >= 48 && event.charCode <= 57"
          // pattern="\d*"
          placeholder={otpdigitplace}
        />
      ) : (
        <Button
          onClick={Otpcheck}
          color="primary"
          disabled
          className={classes.authactive}
        >
          OTP 인증 완료
        </Button>
      )}
      {!loadingAll && !otpactive ? (
        otpdigit.length === 6 ? (
          <Button onClick={Otpcheck} color="primary" className={classes.button}>
            OTP 인증
          </Button>
        ) : (
          <Button
            onClick={Otpcheck}
            color="primary"
            disabled
            className={classes.buttondisabled}
          >
            OTP 인증
          </Button>
        )
      ) : (
        ''
      )}
    </div>
  );
}

Otp.propTypes = {};

export default Otp;

// export default compose(withConnect)(Otp);
