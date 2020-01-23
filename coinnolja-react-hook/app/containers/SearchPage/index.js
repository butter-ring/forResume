/**
 *
 * SearchPage
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuIcon from '@material-ui/icons/Menu';
import LoadingIndicator from 'components/LoadingIndicator';
import BoardList from 'components/BoardList';
import BoardListMobile from 'components/BoardListMobile';
import NoticeLine from 'components/NoticeLine';
import TopBanner from 'components/TopBanner';
import MainCoinIndex from 'components/MainCoinIndex';

import {
  makeSelectSearchPage,
  makeSelectSearchResult,
  // makeSelectError,
  makeSelectLoading,
} from './selectors';
import { searchLoad } from './actions';
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
}));

export function SearchPage({
  match,
  loading,
  searchResult,
  searchLoadAction,
  history,
}) {
  useInjectReducer({ key: 'searchPage', reducer });
  useInjectSaga({ key: 'searchPage', saga });

  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(false);
  const searchVal = history.location.search.substring(8);
  // console.log(searchVal);
  useEffect(() => {
    if (!page) {
      pageLoad(0, 1, '', searchVal);
    }
  }, [page, match.params.boardId, searchVal]);

  // eslint-disable-next-line no-unused-vars
  const pageLoad = (boardMasterId, pageIndex, searchKey, searchValChild) => {
    if (loading) {
      return false;
    }
    searchLoadAction(pageIndex, searchVal);
    return true;
  };

  if (!searchResult) {
    return <LoadingIndicator />;
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
            <span>{} 검색결과</span>
          </span>
        </div>

        {matches ? (
          <div className={classes.contentTable}>
            <BoardListMobile pageLoad={pageLoad} boardList={searchResult} />
          </div>
        ) : (
          <div className={classes.contentTable}>
            <BoardList pageLoad={pageLoad} boardList={searchResult} />
          </div>
        )}
      </div>
    </div>
  );
}

SearchPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  searchResult: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  searchLoadAction: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  searchPage: makeSelectSearchPage(),
  searchResult: makeSelectSearchResult(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    searchLoadAction: (page, searchVal) => {
      dispatch(searchLoad(page, searchVal));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SearchPage);
