/**
 *
 * BoardPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import LoadingIndicator from 'components/LoadingIndicator';
import BoardList from 'components/BoardList';
import BoardListMobile from 'components/BoardListMobile';
import BoardGalleryList from 'components/BoardGalleryList';
import { makeSelectSignin, makeSelectUserData } from 'containers/App/selectors';
import NoticeLine from 'components/NoticeLine';
import TopBanner from 'components/TopBanner';
import MainCoinIndex from 'components/MainCoinIndex';

import {
  makeSelectBoardPage,
  makeSelectBoardList,
  makeSelectError,
  makeSelectLoading,
  makeSelectTops,
} from './selectors';

import { boradsLoad, topsLoad } from './actions';
import reducer from './reducer';
import saga from './saga';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f1f1f1',
    paddingTop: theme.spacing(0),
  },
  notice: {
    backgroundColor: '#ffffff',
    marginBottom: 14,
  },
  contentWrap: {
    backgroundColor: '#ffffff',
    border: 'solid 1px #dedede',
    paddingBottom: 6,
    marginBottom: 14,
  },
  contentTop: {
    backgroundColor: '#ffffff',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottom: 'solid 1px #dedede',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 16,
      paddingBottom: 14,
    },
  },
  boardTitle: {
    width: '100%',
    verticalAlign: 'middle',
    fontFamily: 'NotoSansCJKkr',
    fontSize: 28,
    fontWeight: 'bold',
    alignItems: 'center',
    display: 'inline-flex',

    lineHeight: 0,
    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
    },
  },
  menuIcon: {
    maxWidth: 30,
    maxHeight: 30,
    width: '100%',
    height: '100%',
    marginRight: 12,
  },
  buttonWrite: {},
  link: {
    textDecoration: 'none',
    userSelect: 'none',
    // color: '#ffffff',
  },
  contentTab: {
    backgroundColor: '#ffffff',
    paddingLeft: 36,
    paddingRight: 36,
    paddingTop: 14,
    paddingBottom: 15,
    borderBottom: 'solid 1px #dedede',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonMenu: {},
  buttonMenuActive: {},
  writeButton: {
    minWidth: 80,
    [theme.breakpoints.down('xs')]: {
      padding: 2,
    },
  },
  noAuth: {
    textAlign: 'center',
    backgroundColor: '#ffffff',
    border: 'solid 1px #dedede',
    padding: 25,
  },
}));

export function BoardPage({
  match,
  loading,
  boardList,
  boardLoad,
  isSignin,
  userData,
  tops,
  topsActionLoad,
}) {
  useInjectReducer({ key: 'boardPage', reducer });
  useInjectSaga({ key: 'boardPage', saga });
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(false);
  // const [searchKey, setSearchKey] = useState(0);
  // const [searchVal, setSearchVal] = useState('');
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!page) {
      pageLoad(match.params.boardId, 1, '', '');
      topsActionLoad(match.params.boardId);
    }
  }, [page, match.params.boardId, isSignin]);

  const pageLoad = (boardMasterId, pageIndex, searchKeySend, searchValSend) => {
    // console.log(boardMasterId);
    // console.log(pageIndex);
    if (loading) {
      return false;
    }
    boardLoad(boardMasterId, pageIndex, searchKeySend, searchValSend);
    return true;
  };

  // const { userId } = query;

  // console.log(userData);
  const { boardMaster } = boardList;
  // useEffect(() => {
  //   if (boardList) {
  //     setSearchKey(pageable.searchKey);
  //     setSearchVal(pageable.setSearchVal);
  //   }
  // }, [boardList]);

  if (!boardList) {
    return <LoadingIndicator />;
  }

  // console.log(boardMaster);
  if (boardMaster.levelLimit) {
    if (boardMaster.levelLimit > userData.memberLevel) {
      return <div className={classes.noAuth}>접근 권한이 없습니다.</div>;
    }
    if (!userData.memberLevel) {
      return <div className={classes.noAuth}>접근 권한이 없습니다.</div>;
    }
  }

  return (
    <div className={classes.root}>
      <MainCoinIndex />
      {!matches && (
        <div className={classes.topBanner}>
          <TopBanner />
        </div>
      )}
      {!matches && <NoticeLine />}
      <div className={classes.contentWrap}>
        <div className={classes.contentTop}>
          <span className={classes.boardTitle}>
            {!matches && <MenuIcon className={classes.menuIcon} />}
            <span>{boardMaster.boardName}</span>
          </span>
          {isSignin && hasRole(userData, boardMaster) && (
            <Link
              to={`/board/post/${match.params.boardId}/${
                boardMaster.boardType
              }`}
              className={classes.link}
            >
              <Button
                variant="outlined"
                color="primary"
                className={classes.writeButton}
              >
                글쓰기
              </Button>
            </Link>
          )}
        </div>
        {/* <div className={classes.contentTab}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            전체
          </Button>
        </div> */}
        {matches ? (
          <div className={classes.contentTable}>
            <BoardListMobile
              pageLoad={pageLoad}
              boardList={boardList}
              tops={tops}
            />
            {/* {boardMaster.boardType === 'GALLERY' ? (
              <BoardGalleryList pageLoad={pageLoad} boardList={boardList} />
            ) : (
              <BoardListMobile pageLoad={pageLoad} boardList={boardList} />
            )} */}
          </div>
        ) : (
          <div className={classes.contentTable}>
            {boardMaster && boardMaster.boardType === 'GALLERY' ? (
              <BoardGalleryList
                pageLoad={pageLoad}
                boardList={boardList}
                tops={tops}
              />
            ) : (
              <BoardList
                pageLoad={pageLoad}
                boardList={boardList}
                tops={tops}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

BoardPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  // error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  boardList: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  boardLoad: PropTypes.func.isRequired,
  topsActionLoad: PropTypes.func.isRequired,
  isSignin: PropTypes.any,
  userData: PropTypes.object,
  tops: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  boardPage: makeSelectBoardPage(),
  boardList: makeSelectBoardList(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  isSignin: makeSelectSignin(),
  userData: makeSelectUserData(),
  tops: makeSelectTops(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    boardLoad: (boardMasterId, page, searchKey, searchVal) => {
      dispatch(boradsLoad(boardMasterId, page, searchKey, searchVal));
    },
    topsActionLoad: boardMasterId => {
      dispatch(topsLoad(boardMasterId));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(BoardPage);

export const hasRole = (userData, boardMaster) => {
  const { roles } = userData;
  if (roles && boardMaster.writeRoles) {
    const roleArray = roles.split(',');
    const boardRoleArray = boardMaster.writeRoles.split('|');
    let matchCount = 0;
    for (let i = 0; i < roleArray.length; i += 1) {
      for (let j = 0; j < boardRoleArray.length; j += 1) {
        if (roleArray[i] === boardRoleArray[j]) {
          matchCount += 1;
        }
      }
    }
    if (matchCount > 0) {
      return true;
    }
  }
  return false;
};
