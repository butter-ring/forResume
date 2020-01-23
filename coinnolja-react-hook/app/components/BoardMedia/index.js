/**
 *
 * BoardMedia
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { FormattedDate } from 'react-intl';

const useStyles = makeStyles({
  card: {
    maxWidth: '100%',
    border: 'solid 1px #dedede',
    backgroundColor: '#f8f8f8',
  },
  media: {
    height: 140,
  },
  usernameWrap: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  username: {
    color: '#313131',
    fontSize: 12,
    fontWeight: 'bold',
    paddingTop: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 8,
    paddingBottom: 8,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  content: {
    paddingLeft: 12,
    paddingRight: 12,
  },
  svgAnyone: {
    marginRight: 8,
    width: 20,
    height: 20,
  },
  link: {
    textDecoration: 'none',
    userSelect: 'none',
    color: '#313131',
  },
  bottom: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#a6a6a6',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'top',
  },
  clock: {
    marginRight: 5,
  },
});
function BoardMedia({ board }) {
  const classes = useStyles();
  // console.log(board);
  return (
    <div className={classes.card}>
      <Link to={`/board/detail/${board.id}`} className={classes.link}>
        <div className={classes.title}>{board.title}</div>
        <div>
          <div
            className={classes.media}
            style={{
              backgroundImage: `url(${board.thumnailUrl})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
            // title="Contemplative Reptile"
          />
          <div
            style={{
              backgroundColor: '#dedede',
            }}
          />
        </div>
      </Link>
      <div className={classes.content}>
        <div className={classes.usernameWrap}>
          {board.member && !board.member.profileImageUrl && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              className={classes.svgAnyone}
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
          <span className={classes.username}>
            {board.member && board.member.username}
          </span>
        </div>
        <div className={classes.bottom}>
          <span>
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
            <FormattedDate value={new Date(board.createdAt)} year="numeric" />
            -
            <FormattedDate value={new Date(board.createdAt)} month="2-digit" />
            -
            <FormattedDate value={new Date(board.createdAt)} day="2-digit" />
          </span>
          <span>{board.commentCount}</span>
        </div>
      </div>
    </div>
  );
}

BoardMedia.propTypes = {
  board: PropTypes.object.isRequired,
};

export default BoardMedia;
