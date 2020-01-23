/**
 *
 * BoardTabContentItem
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { FormattedDate } from 'react-intl';
import Alink from 'components/Alink';
import MemberName from 'components/MemberName';
import ErrorPop from 'components/ErrorPop';
import { hasReadRole } from 'components/BoardList';
import { makeSelectUserData } from 'containers/App/selectors';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1),
    flexGrow: 1,
    fontFamily: 'NotoSansCJKkr',
    paddingLeft: 24,
    paddingRight: 21,
    paddingBottom: 10,
  },
  nodata: {
    textAlign: 'center',
    paddingBottom: 10,
    paddingTop: 10,
  },
  list: {
    display: 'flex',
    // justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 5,
  },
  title: {
    flex: 6,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    paddingRight: 10,
    fontSize: 14,
  },
  username: {
    flex: 1,
    fontSize: 12,
    color: '#a6a6a6',
  },
  clockText: {
    flex: 1,
    textAlign: 'right',
    fontSize: 12,
    color: '#a6a6a6',
  },
  link: {
    color: '#4d4d4d',
    cursor: 'pointer',
  },
}));

function BoardTabContentItem({ board, userData }) {
  const classes = useStyles();

  const [openError, setOpenError] = useState({
    open: false,
    errorCode: false,
  });

  const handleAuth = () => {
    setOpenError({
      open: true,
      errorCode: {
        code: 401001,
      },
    });
  };

  const handleCloseError = () => {
    setOpenError({
      open: false,
      errorCode: false,
    });
  };
  // console.log(board);
  return (
    <div className={classes.list} key={board.id}>
      <div className={classes.title}>
        {hasReadRole(userData, board.boardMaster) ? (
          <Alink to={`/board/detail/${board.id}`} className={classes.link}>
            • {board.title}
          </Alink>
        ) : (
          <div
            onClick={handleAuth}
            role="presentation"
            className={classes.link}
          >
            • {board.title}
          </div>
        )}
      </div>
      <div className={classes.username}>
        {/* {board.member.username} */}
        <MemberName member={board.member} />
      </div>
      <div className={classes.clockText}>
        <FormattedDate value={new Date(board.createdAt)} year="numeric" />
        -
        <FormattedDate value={new Date(board.createdAt)} month="2-digit" />
        -
        <FormattedDate value={new Date(board.createdAt)} day="2-digit" />
      </div>
      {openError.open && (
        <ErrorPop
          handleClose={handleCloseError}
          openError={openError}
          errorTitle="권한 없음"
        />
      )}
    </div>
  );
}

BoardTabContentItem.propTypes = {
  board: PropTypes.object.isRequired,
  userData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  userData: makeSelectUserData(),
});
const withConnect = connect(mapStateToProps);

export default compose(withConnect)(BoardTabContentItem);

// export default BoardTabContentItem;
