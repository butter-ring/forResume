/**
 *
 * NoticeLine
 *
 */

import React, { useEffect, useState } from 'react';
import request from 'utils/request';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import dateFns from 'date-fns';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#ffffff',
    border: 'solid 1px #bbc9e0',
    marginTop: theme.spacing(1.6),
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 12,
    paddingBottom: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    verticalAlign: 'middle',
    marginBottom: theme.spacing(1.6),
  },
  notice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3b69c1',
    verticalAlign: 'middle',
  },
  new: {
    width: 21,
    height: 7.4,
    marginLeft: 5,
    borderRadius: 2,
    backgroundColor: '#f05c5c',
    color: '#ffffff',
    fontSize: 11,
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 3,
    paddingBottom: 1,
    verticalAlign: 'middle',
  },
  underline: {
    textDecoration: 'none',
  },
}));

const useStylesm = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    verticalAlign: 'middle',
  },
  content: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 6,
    fontSize: 12,
  },
  notice: {
    color: '#3b69c1',
  },
  noticeText: {
    paddingLeft: 6,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: 200,
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  date: {
    color: '#a6a6a6',
    marginLeft: 8,
  },
  underline: {
    textDecoration: 'none',
  },
}));

function NoticeLine() {
  const classes = useStyles();
  const classesm = useStylesm();
  const theme = useTheme();
  const [noticeTitle, setNoticeTitle] = useState();
  const [noticeDate, setNoticeDate] = useState();
  const [noticeId, setNoticeId] = useState();
  const [newNotice, setNewNotice] = useState(false);
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  useEffect(() => {
    noticeGet();
  }, []);

  const noticeGet = async () => {
    const options = {
      method: 'GET',
      // auth: true,
    };
    try {
      const response = await request(
        `/api/board?boardMasterId=3&pageSize=1`,
        options,
      );
      if (response) {
        setNoticeId(response.data.content[0].id);
        setNoticeTitle(response.data.content[0].title);
        setNoticeDate(
          dateFns.format(
            new Date(response.data.content[0].createdAt),
            'yyyy-MM-dd',
          ),
        );
        if (
          new Date().getTime() - response.data.content[0].createdAt <
          3600000
        ) {
          setNewNotice(true);
        } else {
          setNewNotice(false);
        }
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  // console.log(noticeGet());

  if (matches) {
    return (
      <div className={classesm.root}>
        <div className={classesm.content}>
          <span className={classesm.notice}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="15"
              viewBox="0 0 18 15"
            >
              <path
                fill="#3B69C1"
                fillRule="evenodd"
                d="M8.6 13.307l.482-.467 1.572.496-1.403 1.362a1.06 1.06 0 0 1-1.064.25l-2.921-.915a1.068 1.068 0 0 1-.717-.787l-.437-1.973 1.571.496.153.692a.707.707 0 0 0 .474.52l1.584.493c.249.08.52.016.707-.167zm7.127-1.938c1.11-1.902 1.045-6.53-.302-8.595a.376.376 0 0 0-.615-.02c-1.436 1.919-1.271 6.815.308 8.67.168.197.479.167.609-.055zM2.93 7.823c2.437.772 7.26 2.293 10.23 3.226-1.033-2.347-1.102-5.668-.229-7.932-2.375.971-9.882 4.079-9.882 4.079-.574.237-.43.528-.119.627zm15.057-.93c.167 4.203-1.34 6.806-2.882 6.335-1.214-.373-9.305-2.921-12.629-3.975a1.566 1.566 0 0 0-.479-.078c-.598 0-.995.391-1.326.622-.859-1.038-.901-3.26-.083-4.333.32.157.69.484 1.243.484.192 0 .405-.04.645-.138C5.789 4.439 13.436 1.268 14.61.822c1.396-.527 3.207 1.874 3.376 6.071z"
              />
            </svg>
          </span>
          <Link to={`/board/detail/${noticeId}`} className={classesm.underline}>
            <span className={classesm.noticeText}>
              {noticeTitle}
              {newNotice ? <span className={classes.new}>NEW</span> : <span />}
            </span>
          </Link>
          <span className={classesm.date}>{noticeDate}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Link to={`/board/detail/${noticeId}`} className={classes.underline}>
        <span className={classes.notice}>
          {noticeTitle}

          {newNotice ? <span className={classes.new}>NEW</span> : <span />}
        </span>
      </Link>
      <span className={classes.date}>{noticeDate}</span>
    </div>
  );
}

NoticeLine.propTypes = {};

export default NoticeLine;
