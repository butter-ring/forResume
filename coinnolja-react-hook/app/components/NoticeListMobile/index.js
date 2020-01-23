/**
 *
 * NoticeListMobile
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedDate } from 'react-intl';
// import styled from 'styled-components';
import { makeStyles } from '@material-ui/styles';
// import CardMedia from '@material-ui/core/CardMedia';
import Alink from 'components/Alink';
import MemberName from 'components/MemberName';

const useStyles = makeStyles(theme => ({
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
    justifyContent: 'space-between',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 8,
    paddingRight: 8,
    borderBottom: 'solid 1px #eaeaea',
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
    // fontWeight: 'bold',
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
  },
  createdAt: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#a6a6a6',
    // marginLeft: 12,
    display: 'flex',
    alignItems: 'center',
  },
  clock: {
    marginRight: 5,
  },
  clockText: {
    paddingTop: 2,
  },
  cover: {
    width: 40,
    height: 40,
    border: 'solid 1px #eaeaea',
    borderRadius: 3,
  },
  userinfo: {
    display: 'flex',
  },
  boardBanner: {
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottom: 'solid 1px #eaeaea',
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
  topRow: {
    // backgroundColor: '#f3f8ff',
    backgroundColor: '#f1f1f1f1',
    fontWeight: 'bold',
  },
  topId: {
    paddingRight: 10,
    paddingLeft: 10,
  },
}));

function NoticeListMobile({ tops }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {tops &&
        tops.content &&
        tops.content.length > 0 &&
        tops.content.map(row => (
          <div className={classes.topRow}>
            <div className={classes.boardWrap}>
              <div className={classes.topId}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="18"
                  viewBox="0 0 20 18"
                >
                  <path
                    fill="#F05C5C"
                    fillRule="evenodd"
                    d="M11 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm0 7H9V6h2v5zm9-9v9.893a2 2 0 0 1-2 2h-1.333V18l-5.834-4.107H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"
                  />
                </svg>
              </div>
              <div className={classes.boardContent}>
                <div className={classes.boardTitleWrap}>
                  <Link to={`/board/detail/${row.id}`} className={classes.link}>
                    <span className={classes.boardTitle}>
                      [공지] {row.title}
                    </span>

                    {row.new && (
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          className={classes.svgNew}
                        >
                          <path
                            fill="#F05C5C"
                            fillRule="evenodd"
                            d="M2 0h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm2 10.667h1.116V7.209c0-.797-.092-1.644-.153-2.401h.051l.781 1.534 2.474 4.325h1.207V3.333H8.361v3.418c0 .797.091 1.684.152 2.441h-.05L7.68 7.638 5.207 3.333H4v7.334z"
                          />
                        </svg>
                      </div>
                    )}
                  </Link>
                </div>
                <div className={classes.userinfo}>
                  {row.member && <MemberName member={row.member} />}
                  <div className={classes.createdAt}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      className={classes.clock}
                    >
                      <path
                        fill="#A6A6A6"
                        fillRule="evenodd"
                        d="M10.5 8.167H6.417V3.5h1.166V7H10.5v1.167zM0 7a7 7 0 1 0 14 0A7 7 0 0 0 0 7zm7 6A6 6 0 1 0 7 1a6 6 0 0 0 0 12z"
                      />
                    </svg>
                    <div className={classes.clockText}>
                      {/* <FormattedDate
                      value={new Date(row.createdAt)}
                      year="numeric"
                    />
                    - */}
                      <FormattedDate
                        value={new Date(row.createdAt)}
                        month="2-digit"
                      />
                      -
                      <FormattedDate
                        value={new Date(row.createdAt)}
                        day="2-digit"
                      />
                      <span className={classes.clockText}>
                        {' '}
                        | 조회수 {row.readCount} |{' '}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                        >
                          <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z" />
                        </svg>{' '}
                        {row.upVoteCount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes.commentCount}>
                <Alink to={`/board/detail/${row.id}`} className={classes.link}>
                  <div className={classes.commentCountBox}>
                    {row.commentCount}
                  </div>
                </Alink>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

NoticeListMobile.propTypes = {
  tops: PropTypes.any,
};

export default memo(NoticeListMobile);
