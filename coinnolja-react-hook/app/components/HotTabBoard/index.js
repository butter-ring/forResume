/**
 *
 * HotTabBoard
 *
 */

import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import classNames from 'classnames';
import Alink from 'components/Alink';

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

  rankNum: {
    fontWeight: 'bold',
    colot: '#434343',
  },
  rankNum1: {
    color: 'red',
  },
  rankNum2: {
    color: '#00a6d4',
  },
  rankNum3: {
    color: '#333',
  },
  link: {
    color: '#313131',
  },
  wrap: {
    paddingTop: 3,
    paddingBottom: 3,
    // paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
}));

function HotTabBoard() {
  const classes = useStyles();
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (loading) {
        return false;
      }
      setLoading(true);
      const result = await axios(`${process.env.API_URL}/api/boardrank`);
      // console.log(result.data);
      if (result.data) {
        if (result.data.length > 0) {
          setData(result.data);
        }
      }

      setLoading(false);
      return true;
    };
    fetchData();
  }, [data]);

  if (!data) {
    return <div className={classes.nodata}>인기 게시물이 없습니다.</div>;
  }
  return (
    <div className={classes.root}>
      {loading && <LinearProgress />}
      {data &&
        data.length > 0 &&
        data.map((raw, idx) => (
          <div className={classes.wrap}>
            <span
              className={classNames(
                classes.rankNum,
                idx === 0 && classes.rankNum1,
                idx === 1 && classes.rankNum2,
                idx === 2 && classes.rankNum3,
              )}
            >
              {idx + 1}위.
            </span>
            &nbsp;
            <span>
              <Alink to={`/board/detail/${raw.id}`} className={classes.link}>
                {raw.title}
              </Alink>
            </span>
          </div>
        ))}

      {!data && <div className={classes.nodata}>게시글이 없습니다.</div>}
    </div>
  );
}

HotTabBoard.propTypes = {};

export default HotTabBoard;
