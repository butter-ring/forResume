/**
 *
 * CalendarCheck
 *
 */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeSelectSignin } from 'containers/App/selectors';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Calendar from 'components/Calendar';
import SigninRequired from 'components/SigninRequired';
import request from 'utils/request';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';

import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import CardActions from '@material-ui/core/CardActions';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { findMypageById } from 'containers/MyPage/actions';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { attendDayGet, attendListAll } from './actions';
import makeSelectCalendarCheck from './selectors';
import reducer from './reducer';
import saga from './saga';
import './App.css';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  paper: {
    marginTop: 'spacing(3)',
    width: '100%',
    overflowX: 'auto',
    marginBottom: 'spacing(2)',
  },

  table: {
    minWidth: 650,
  },

  container: {
    minHeight: 91,
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: 37,
    marginRight: 11,
    // marginRight: 'spacing(1)',
    paddingLeft: 20,
    width: 644,
    height: 43,
    borderColor: '#a6a6a6',
    border: '1px solid',
    backgroundColor: '#ffffff',
  },
  dense: {
    marginTop: 'spacing(2)',
  },
  menu: {
    width: 200,
  },

  attendmsgtext: {
    width: 644,
    height: 22,
    borderColor: '#a6a6a6',
    border: '1px solid',
    backgroundColor: '#ffffff',
  },

  attendbutton: {
    width: 160,
    height: 43,
    borderRadius: 3,
    backgroundColor: '#4d85f1',
  },

  attendbuttondisabled: {
    width: 160,
    height: 43,
    borderRadius: 3,
    backgroundColor: '#a6a6a6',
  },

  attendbuttontext: {
    minWidth: 83,
    height: 20,
    fontFamily: 'NotoSansCJKkr',
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff',
  },

  rectangle28: {
    width: 896,
    height: 1576,
    backgroundColor: '#ffffff',
    borderColor: '#dedede',
    border: '1px solid',
    // borderWidth: 1,
  },

  backgroundf2: {
    backgroundColor: '#f2f2f2',
    borderColor: '#dedede',
    borderTop: '1px solid',
  },

  attendCheck: {
    width: 256,
    height: 41,
    marginTop: 22,
    marginLeft: 37,
    marginBottom: 21,
    fontFamily: 'NotoSansCJKkr',
    fontSize: 28,
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0,
    color: '#313131',
  },
  yearMonth: {
    width: 110,
    height: 29,
    fontFamily: 'NotoSansCJKkr',
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: -0.3,
    textAlign: 'center',
    color: '#4d4d4d',
  },

  imgStamp: {
    width: 68,
    height: 71,
    objectFit: 'contain',
    // transform: rotate('15deg'),
  },

  margin37: {
    marginLeft: 37,
  },

  attendinfo: {
    width: 170,
    height: 20,
    // marginLeft: 37,
    paddingBottom: 60,
    paddingLeft: 37,
    fontFamily: 'NotoSansCJKkr',
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0,
    color: '#313131',
  },

  attendinfoContents: {
    width: 653,
    height: 60,
    fontFamily: 'NotoSansCJKkr',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0,
    color: '#313131',
  },
}); // END userStyles

// 모바일 디자인
const useStylesm = makeStyles(theme => ({
  root: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: '#f1f1f1',
    paddingTop: theme.spacing(0),
    overflowX: 'auto',
  },
  root2: {
    // width: '100%',
  },
  table: {
    // width: '100%',
    // minWidth: 360,
  },

  rectangle28: {
    backgroundColor: '#ffffff',
    borderColor: '#dedede',
    border: '1px solid',
    // display: 'flex',
    // borderWidth: 1,
  },

  todayDate: {
    width: 360,
    height: 24,
    marginTop: 10,
    fontFamily: 'NotoSansCJKkr',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: -0.2,
    textAlign: 'center',
    // justifyContent: 'right',
    // alignItems: 'right',
    color: '#4d4d4d',
  },

  attendCheck: {
    width: 169,
    height: 24,
    marginTop: 8,
    marginLeft: 16,
    marginBottom: 8,
    fontFamily: 'NotoSansCJKkr',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0,
    color: '#313131',
  },

  textField: {
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 11,
    marginTop: 10,
    width: 320,
    height: 43,
    borderColor: '#a6a6a6',
    border: '1px solid',
    backgroundColor: '#ffffff',
  },
  attendbutton: {
    width: 320,
    height: 34,
    borderRadius: 3,
    backgroundColor: '#4d85f1',
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 10,
  },

  attendbuttondisabled: {
    width: 320,
    height: 34,
    borderRadius: 3,
    backgroundColor: '#a6a6a6',
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 10,
  },

  attendbuttontext: {
    minWidth: 83,
    height: 20,
    fontFamily: 'NotoSansCJKkr',
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff',
  },
  backgroundf2: {
    height: 28,
    backgroundColor: '#f2f2f2',
    borderColor: '#dedede',
    borderTop: '1px solid',
  },
  attendlisttext: {
    height: 17,
    fontFamily: 'NotoSansCJKkr',
    fontSize: 11,
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#979797',
  },

  attendinfo: {
    marginLeft: 20,
    marginBottom: 10,
    width: 68,
    height: 18,
    fontFamily: 'NotoSansCJKkr',
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#a6a6a6',
    borderRight: '1px solid',
    borderColor: '#eaeaea',
  },
  attendinfocontent: {
    width: 232,
    height: 18,
    textAlign: 'right',
    alignItems: 'right',
    fontFamily: 'NotoSansCJKkr',
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0,
    // justifyContent: 'right',
    color: '#4d4d4d',
  },
  flexdis: {
    display: 'flex',
    flexWrap: 'nowrap',
  },

  listhead: {
    paddingRight: 1,
    paddingLeft: 1,
    minWidth: 21,
    height: 17,
    fontFamily: 'NotoSansCJKkr',
    fontSize: 11,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#979797',
  },
  listtext: {
    minWidth: 21,
    height: 17,
    paddingRight: 1,
    paddingLeft: 1,
    fontFamily: 'NotoSansCJKkr',
    fontSize: 11,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#4d4d4d',
  },
  listtextcontent: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    maxWidth: 120,
    minWidth: 21,
    height: 17,
    paddingRight: 1,
    paddingLeft: 1,
    fontFamily: 'NotoSansCJKkr',
    fontSize: 11,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#4d4d4d',
    // width: '100%',
    // display: 'inline-block',
  },
}));

export function CalendarCheck({
  attendDaySubmit,
  attendListSubmit,
  attendDayData,
  attendList,
  isSignin,
  findMypageByIdGet,
}) {
  const classes = useStyles();
  const classesm = useStylesm();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const [loading, setLoading] = useState(false);
  const attendDate = dateFns.format(new Date(), 'yyyy-MM-dd');

  useInjectReducer({ key: 'calendarCheck', reducer });
  useInjectSaga({ key: 'calendarCheck', saga });
  useEffect(() => {
    findMypageByIdGet();
    attendDaySubmit(attendDayData);
    attendListSubmit(attendList);
    attendButton();
  }, []);

  const [memo, setMemo] = useState('');

  const handleMemo = e => {
    setMemo(e.target.value);
  };

  const content = attendList.attendDayData;

  const attendButton = () => {
    if (content.length > 0) {
      if (
        content &&
        content[content.length - 1].attendDate ===
          dateFns.format(new Date(), 'yyyy-MM-dd')
      ) {
        // 데이터와 현재날짜 같을경우
        return true;
      }
      // 데이터와 현재날짜 같지 않다
      return false;
    }
    return false;
  };

  // 출석체크 하기
  const clickHandler = async () => {
    setLoading(true);
    const options = {
      method: 'POST',
      auth: true,
      data: {
        memo,
        attendDate,
      },
    };
    try {
      const response = await request(`/api/attend`, options);
      console.log(response);
      attendDaySubmit(attendDayData);
      attendListSubmit(attendList);
      findMypageByIdGet();
      setMemo('');
    } catch (err) {
      console.log(err.response);
    }
    setLoading(false);
  };

  const today = dateFns.format(new Date(), 'yyyy년 MM월 dd');

  if (!isSignin) {
    return <SigninRequired />;
  }
  // 모바일 화면
  // 모바일 화면
  // 모바일 화면
  if (matches) {
    return (
      <div className={classesm.root}>
        <div className={classesm.rectangle28}>
          <Divider />
          <div className={classesm.attendCheck}>출석체크</div>
          <Divider />
          <div className={classesm.flexdis}>
            <div className={classesm.todayDate}>{today}</div>
          </div>
          <List>
            <div className={classesm.flexdis}>
              <span className={classesm.attendinfo}>출석혜택</span>
              <span align="right" className={classesm.attendinfocontent}>
                포인트 5 점 , 경험치 100 점
              </span>{' '}
            </div>
            <div className={classesm.flexdis}>
              <span className={classesm.attendinfo}>출석권한</span>
              <span align="right" className={classesm.attendinfocontent}>
                로그인 사용자
              </span>{' '}
            </div>
            <div className={classesm.flexdis}>
              <span className={classesm.attendinfo}>출석시간</span>
              <span align="right" className={classesm.attendinfocontent}>
                AM 00시 00분 00초 ~ PM 12시 59분 59초
              </span>{' '}
            </div>
            <div>
              <Divider />
              <form id="memoform" noValidate autoComplete="off">
                <div>
                  <input
                    type="text"
                    className={classesm.textField}
                    placeholder="출석체크 합니다~^^"
                    value={memo}
                    onChange={handleMemo}
                    name="memo"
                    maxLength="30"
                  />
                </div>
                <div>
                  {loading && <CircularProgress />}
                  {attendButton() ? (
                    <Button className={classesm.attendbuttondisabled} disabled>
                      <span className={classesm.attendbuttontext}>
                        출석체크 완료
                      </span>
                    </Button>
                  ) : (
                    <Button
                      className={classesm.attendbutton}
                      onClick={clickHandler}
                    >
                      <span className={classesm.attendbuttontext}>
                        출석체크 하기
                      </span>
                    </Button>
                  )}
                </div>
              </form>
              <div className={classesm.root2}>
                <Table className={classesm.table} size="small">
                  <TableHead className={classesm.backgroundf2}>
                    <TableRow>
                      <TableCell align="left" className={classesm.listhead}>
                        등수
                      </TableCell>
                      <TableCell align="left" className={classesm.listhead}>
                        출석시간
                      </TableCell>
                      <TableCell align="left" className={classesm.listhead}>
                        닉네임
                      </TableCell>
                      <TableCell
                        align="center"
                        maxLength="50"
                        className={classesm.listhead}
                      >
                        출석인사
                      </TableCell>
                      <TableCell align="right" className={classesm.listhead}>
                        코인백 포인트
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {attendList.attendList &&
                      attendList.attendList.map((row, index) => (
                        <TableRow key={row.id}>
                          <TableCell
                            align="center"
                            className={classesm.listtext}
                            component="th"
                            scope="row"
                          >
                            {index + 1}
                          </TableCell>
                          <TableCell align="left" className={classesm.listtext}>
                            {dateFns.format(
                              new Date(Number(row.createdAt)),
                              'HH:mm:ss',
                            )}
                          </TableCell>
                          <TableCell align="left" className={classesm.listtext}>
                            {row.member.nickName}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classesm.listtextcontent}
                          >
                            {row.memo}
                          </TableCell>
                          <TableCell
                            align="right"
                            className={classesm.listtext}
                          >
                            {row.point} 점
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </List>
        </div>
      </div>
    );
  }

  // Web 화면
  // Web 화면
  // Web 화면
  return (
    <React.Fragment>
      <div className={classes.rectangle28}>
        <List>
          <div className={classes.attendCheck}>출석체크</div>
          <Divider />
          <div className="App">
            <main>
              <Calendar listNameFromParent={attendList.attendDayData} />
            </main>
            <br />
          </div>

          <CardActions>
            <div className={classes.attendinfo}>* 출석부 이용안내</div>
            <span className={classes.attendinfoContents}>
              - 출석시간 : AM 00시 00분 00초 ~ PM 12시 59분 59초
              <br />
              - 출석혜택 : 포인트 5 점 , 경험치 100 점
              <br />
            </span>
          </CardActions>
          <Divider />

          <form
            id="memoform"
            className={classes.container}
            noValidate
            autoComplete="off"
          >
            <CardActions>
              <input
                type="text"
                className={classes.textField}
                placeholder="출석체크 합니다~^^"
                value={memo}
                onChange={handleMemo}
                name="memo"
                maxLength="30"
              />
              {loading && <CircularProgress />}
              {attendButton() ? (
                <Button className={classes.attendbuttondisabled} disabled>
                  <span className={classes.attendbuttontext}>
                    출석체크 완료
                  </span>
                </Button>
              ) : (
                <Button className={classes.attendbutton} onClick={clickHandler}>
                  <span className={classes.attendbuttontext}>
                    출석체크 하기
                  </span>
                </Button>
              )}
            </CardActions>
          </form>

          <div className={classes.root}>
            <Table className={classes.table} size="small">
              <TableHead className={classes.backgroundf2}>
                <TableRow>
                  <TableCell>등수</TableCell>
                  <TableCell align="left">출석시간</TableCell>
                  <TableCell align="left">닉네임</TableCell>
                  <TableCell align="left" maxLength="50">
                    출석인사
                  </TableCell>
                  <TableCell align="right">코인백 포인트</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendList.attendList &&
                  attendList.attendList.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="left">
                        {dateFns.format(
                          new Date(Number(row.createdAt)),
                          'HH:mm:ss',
                        )}
                      </TableCell>
                      <TableCell align="left">{row.member.nickName}</TableCell>
                      <TableCell align="left">{row.memo}</TableCell>
                      <TableCell align="right">{row.point} 점</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </List>
      </div>
    </React.Fragment>
  );
}

CalendarCheck.propTypes = {
  attendDaySubmit: PropTypes.func,
  attendDayData: PropTypes.any,
  attendListSubmit: PropTypes.func,
  attendList: PropTypes.any,
  isSignin: PropTypes.any,
  findMypageByIdGet: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  attendDayData: makeSelectCalendarCheck(),
  attendList: makeSelectCalendarCheck(),
  isSignin: makeSelectSignin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    attendDaySubmit: attendDayData => {
      dispatch(attendDayGet(attendDayData));
    },
    attendListSubmit: attendList => {
      dispatch(attendListAll(attendList));
    },
    findMypageByIdGet: () => {
      dispatch(findMypageById());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CalendarCheck);
