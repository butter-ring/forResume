/**
 *
 * ExpHistoryPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { makeSelectSignin, makeSelectUserData } from 'containers/App/selectors';

import LoadingIndicator from 'components/LoadingIndicator';
import LevelText from 'components/LevelText';
import Pagination from 'material-ui-flat-pagination';
import { FormattedDate } from 'react-intl';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import classNames from 'classnames';
import Tooltip from '@material-ui/core/Tooltip';

import Level1 from '../../images/level/M1.gif';
import Level2 from '../../images/level/M2.gif';
import Level3 from '../../images/level/M3.gif';
import Level4 from '../../images/level/M4.gif';
import Level5 from '../../images/level/M5.gif';
import Level6 from '../../images/level/M6.gif';
import Level7 from '../../images/level/M7.gif';
import Level8 from '../../images/level/M8.gif';
import Level9 from '../../images/level/M10.gif';
import Level10 from '../../images/level/M11.gif';
import Level11 from '../../images/level/M12.gif';
import Level12 from '../../images/level/M13.gif';
import Level13 from '../../images/level/M14.gif';
import Level14 from '../../images/level/M15.gif';
import Level15 from '../../images/level/M16.gif';
import Level16 from '../../images/level/M17.gif';
import Level17 from '../../images/level/M18.gif';
import Level18 from '../../images/level/M19.gif';
import Level19 from '../../images/level/M20.gif';

import {
  makeSelectExpHistoryPage,
  makeSelectHistory,
  makeSelectError,
  makeSelectLoading,
} from './selectors';
import { historyLoad } from './actions';
import reducer from './reducer';
import saga from './saga';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f1f1f1',
    paddingTop: theme.spacing(0),
  },
  contentWrap: {
    backgroundColor: '#ffffff',
    border: 'solid 1px #dedede',
    paddingBottom: 6,
    marginBottom: 14,
  },
  noAuth: {
    textAlign: 'center',
    backgroundColor: '#ffffff',
    border: 'solid 1px #dedede',
    padding: 25,
  },
  tableColBody: {
    color: '#313131',
    fontSize: 12,
  },
  tableCellBody: {
    padding: 8,
  },
  pageWrap: {
    textAlign: 'center',
  },
  level: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
      flexWrap: 'wrap',
    },
  },
  grayscale: {
    // filter: 'url(data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id=…cale'><feColorMatrix type='saturate' values='0'/></filter></svg>#grayscale)',
    // '-webkit-filter': 'grayscale(1)',
    filter: 'grayscale(1)',
    // filter: gray;
  },
  unit: {
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      marginBottom: 10,
    },
  },
  leveltext: {
    paddingTop: 5,
  },
  unitMobile: {
    width: '10%',
  },
}));

export function ExpHistoryPage({
  loading,
  history,
  historyLoadAction,
  isSignin,
  userData,
}) {
  useInjectReducer({ key: 'expHistoryPage', reducer });
  useInjectSaga({ key: 'expHistoryPage', saga });
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  // const [page, setPage] = useState(false);

  useEffect(() => {
    if (isSignin) {
      pageLoad(0);
    }
  }, [isSignin]);

  const pageLoad = pageIndex => {
    if (loading && isSignin) {
      return false;
    }
    historyLoadAction(pageIndex);
    return true;
  };

  if (!isSignin) {
    return <div className={classes.noAuth}>로그인이 필요한 페이지 입니다.</div>;
  }
  // console.log(history);

  if (!history) {
    return <LoadingIndicator />;
  }
  const { content, pageable, totalElements } = history;
  const { memberLevel } = userData;
  // console.log(pageable);
  const levelUnit = [
    { unit: Level1, exp: 0 },
    { unit: Level2, exp: 100 },
    { unit: Level3, exp: 1000 },
    { unit: Level4, exp: 5000 },
    { unit: Level5, exp: 12000 },
    { unit: Level6, exp: 20000 },
    { unit: Level7, exp: 30000 },
    { unit: Level8, exp: 40000 },
    { unit: Level9, exp: 50000 },
    { unit: Level10, exp: 70000 },
    { unit: Level11, exp: 100000 },
    { unit: Level12, exp: 200000 },
    { unit: Level13, exp: 300000 },
    { unit: Level14, exp: 450000 },
    { unit: Level15, exp: 600000 },
    { unit: Level16, exp: 950000 },
    { unit: Level17, exp: 1500000 },
    { unit: Level18, exp: 2800000 },
    { unit: Level19, exp: 3800000 },
  ];
  return (
    <div className={classes.root}>
      <div className={classNames(classes.contentWrap, classes.level)}>
        {levelUnit.map((row, idx) => (
          <div
            className={classNames(classes.unit, matches && classes.unitMobile)}
          >
            <Tooltip title={`Exp : ${row.exp}`} placement="top">
              <img
                src={row.unit}
                alt=""
                className={memberLevel !== idx + 1 && classes.grayscale}
              />
            </Tooltip>
            <div className={classes.leveltext}>
              <LevelText level={idx + 1} />
            </div>
          </div>
        ))}
      </div>
      <div className={classes.contentWrap}>
        <Table className={classes.table}>
          <colgroup>
            <col width="20%" />
            <col width="30%" />
            <col width="30%" />
            <col width="20%" />
          </colgroup>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell className={classes.tableColHead} size="small">
                경험치
              </TableCell>
              <TableCell
                className={classes.tableColHead}
                align="left"
                component="th"
                scope="row"
                size="medium"
              >
                내용
              </TableCell>
              <TableCell className={classes.tableColHead} size="small">
                일시
              </TableCell>
              <TableCell className={classes.tableColHead} size="small">
                ip
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {content.length > 0 &&
              content.map(row => (
                <TableRow key={row.id} hover>
                  <TableCell
                    className={classes.tableColBody}
                    size="small"
                    align="center"
                    classes={{
                      root: classes.tableCellBody,
                    }}
                  >
                    {row.experience}
                  </TableCell>
                  <TableCell
                    className={classes.tableColBody}
                    align="left"
                    component="th"
                    scope="row"
                    size="medium"
                    classes={{
                      root: classes.tableCellBody,
                    }}
                  >
                    {row.experienceType === 'SIGNUP' && '회원가입'}
                    {row.experienceType === 'ATTENDANCE' && '출석체크'}
                    {row.experienceType === 'WRITE' && '글쓰기'}
                    {row.experienceType === 'REPLY' && '댓글달기'}
                    {row.experienceType === 'VOTE' && '추천받기'}
                    {row.experienceType === 'WRITE_INFO' && '정보글쓰기'}
                  </TableCell>
                  <TableCell
                    className={classes.tableColBody}
                    size="small"
                    classes={{
                      root: classes.tableCellBody,
                    }}
                  >
                    <FormattedDate
                      value={new Date(row.createdAt)}
                      year="numeric"
                      month="2-digit"
                      day="2-digit"
                    />
                  </TableCell>
                  <TableCell
                    className={classes.tableColBody}
                    size="small"
                    classes={{
                      root: classes.tableCellBody,
                    }}
                  >
                    {row.ipAddress}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {content.length > 0 && (
          <div className={classes.pageWrap}>
            <Pagination
              limit={pageable.pageSize}
              offset={pageable.pageNumber * pageable.pageSize}
              total={totalElements}
              onClick={(e, offset) => pageLoad(offset / pageable.pageSize)}
              className={classes.paging}
            />
          </div>
        )}
      </div>
    </div>
  );
}

ExpHistoryPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  history: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  historyLoadAction: PropTypes.func.isRequired,
  isSignin: PropTypes.any,
  userData: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  expHistoryPage: makeSelectExpHistoryPage(),
  history: makeSelectHistory(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  isSignin: makeSelectSignin(),
  userData: makeSelectUserData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    historyLoadAction: page => {
      dispatch(historyLoad(page));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ExpHistoryPage);
