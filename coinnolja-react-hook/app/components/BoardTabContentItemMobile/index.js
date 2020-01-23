/**
 *
 * BoardTabContentItemMobile
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
import { titleHeadColor } from 'components/BoardListMobile';
import { makeSelectUserData } from 'containers/App/selectors';
import CardMedia from '@material-ui/core/CardMedia';

const useStylesm = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(0),
  },
  paging: {
    padding: 15,
    textAlign: 'center',
  },
  boardWrap: {
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 8,
    borderBottom: 'solid 1px #eaeaea',
    paddingRight: 8,
    width: '100%',
    justifyContent: 'space-between',
  },
  boardid: {
    paddingRight: 7,
  },
  boardContent: {
    paddingLeft: 7,
    flex: 1,
  },
  svgNew: {
    marginLeft: 8,
  },
  boardTitleWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  boardTitle: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '100%',
    maxWidth: 220,
    display: 'inline-block',
  },
  svgAnyone: {
    marginRight: 4,
  },
  username: {
    color: '#a6a6a6',
    fontSize: 12,
    fontWeight: 'bold',
    paddingTop: 2,
  },
  link: {
    textDecoration: 'none',
    userSelect: 'none',
    color: '#313131',
    display: 'flex',
    cursor: 'pointer',
  },
  createdAt: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#a6a6a6',
    marginLeft: 8,
    display: 'flex',
    alignItems: 'center',
  },
  clock: {
    marginRight: 5,
  },
  clockText: {
    paddingTop: 2,
  },
  userinfo: {
    display: 'flex',
    alignItems: 'center',
  },
  cover: {
    width: 40,
    height: 40,
    border: 'solid 1px #eaeaea',
    borderRadius: 3,
  },
  commentCount: {
    // display: 'flex',
    // textAlign: 'right',
    // justifyContent: 'flex-end',
  },
  commentCountBox: {
    border: 'solid 1px #5a864c',
    borderRadius: 4,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: '0.75em',
    width: 30,
    color: '#5a864c',
    textAlign: 'center',
  },
}));

function BoardTabContentItemMobile({ board, userData }) {
  const classesm = useStylesm();
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
    <div className={classesm.boardWrap}>
      {/* <div className={classesm.boardid}>
      {board.id}
      </div> */}
      {board.thumnailUrl && (
        <div className={classesm.image}>
          <CardMedia className={classesm.cover} image={board.thumnailUrl} />
        </div>
      )}
      <div className={classesm.boardContent}>
        <div className={classesm.boardTitleWrap}>
          {hasReadRole(userData, board.boardMaster) ? (
            <Alink to={`/board/detail/${board.id}`} className={classesm.link}>
              <span className={classesm.boardTitle}>
                {board.titleHead && (
                  <span
                    style={{
                      color: `#${titleHeadColor[board.titleHead]}`,
                    }}
                  >
                    {`[${board.titleHead}]`}&nbsp;
                  </span>
                )}
                {board.title}
              </span>
              {board.new && (
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    className={classesm.svgNew}
                  >
                    <path
                      fill="#F05C5C"
                      fillRule="evenodd"
                      d="M2 0h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm2 10.667h1.116V7.209c0-.797-.092-1.644-.153-2.401h.051l.781 1.534 2.474 4.325h1.207V3.333H8.361v3.418c0 .797.091 1.684.152 2.441h-.05L7.68 7.638 5.207 3.333H4v7.334z"
                    />
                  </svg>
                </div>
              )}
            </Alink>
          ) : (
            <div
              onClick={handleAuth}
              role="presentation"
              className={classesm.link}
            >
              <span className={classesm.boardTitle}>
                {board.titleHead && (
                  <span
                    style={{
                      color: `#${titleHeadColor[board.titleHead]}`,
                    }}
                  >
                    {`[${board.titleHead}]`}&nbsp;
                  </span>
                )}
                {board.title}
              </span>
              {board.new && (
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    className={classesm.svgNew}
                  >
                    <path
                      fill="#F05C5C"
                      fillRule="evenodd"
                      d="M2 0h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm2 10.667h1.116V7.209c0-.797-.092-1.644-.153-2.401h.051l.781 1.534 2.474 4.325h1.207V3.333H8.361v3.418c0 .797.091 1.684.152 2.441h-.05L7.68 7.638 5.207 3.333H4v7.334z"
                    />
                  </svg>
                </div>
              )}
            </div>
          )}
        </div>
        <div className={classesm.userinfo}>
          {board.member && <MemberName member={board.member} />}
          {/* {board.member && !board.member.profileImageUrl && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 22 22"
              className={classesm.svgAnyone}
            >
              <g fill="none" fillRule="evenodd">
                <circle cx="11" cy="11" r="11" fill="#E9E9E9" />
                <path
                  fill="#A6A6A6"
                  d="M18.314 16.5a9.1 9.1 0 0 0 1.853-5.515c0-5.05-4.108-9.152-9.167-9.152-5.06 0-9.167 4.101-9.167 9.152 0 2.07.69 3.98 1.852 5.513.34-.376.874-.674 1.708-.866 1.687-.384 2.813-.695 3.064-1.25.102-.226.051-.522-.156-.904-1.598-2.941-1.902-5.525-.859-7.276C8.153 5.012 9.45 4.33 11 4.33c1.537 0 2.826.673 3.533 1.846 1.043 1.73.747 4.322-.833 7.3-.204.385-.253.683-.15.91.255.556 1.37.864 3.057 1.247.833.192 1.366.491 1.707.868"
                />
              </g>
            </svg>
          )}
          <span className={classesm.username}>
            {board.member && board.member.username}
          </span> */}
          <div className={classesm.createdAt}>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                className={classesm.clock}
              >
                <path
                  fill="#A6A6A6"
                  fillRule="evenodd"
                  d="M10.5 8.167H6.417V3.5h1.166V7H10.5v1.167zM0 7a7 7 0 1 0 14 0A7 7 0 0 0 0 7zm7 6A6 6 0 1 0 7 1a6 6 0 0 0 0 12z"
                />
              </svg>
            </div>
            <div className={classesm.clockText}>
              {/* <FormattedDate value={new Date(board.createdAt)} year="numeric" />
              - */}
              <FormattedDate
                value={new Date(board.createdAt)}
                month="2-digit"
              />
              -
              <FormattedDate value={new Date(board.createdAt)} day="2-digit" />
              <span>
                {' '}
                | 조회수 {board.readCount} |{' '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                >
                  <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z" />
                </svg>{' '}
                {board.upVoteCount}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={classesm.commentCount}>
        <Alink to={`/board/detail/${board.id}`} className={classesm.link}>
          <div className={classesm.commentCountBox}>{board.commentCount}</div>
        </Alink>
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

BoardTabContentItemMobile.propTypes = {
  board: PropTypes.object.isRequired,
  userData: PropTypes.object,
};

// export default BoardTabContentItemMobile;
const mapStateToProps = createStructuredSelector({
  userData: makeSelectUserData(),
});
const withConnect = connect(mapStateToProps);

export default compose(withConnect)(BoardTabContentItemMobile);
