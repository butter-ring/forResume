// /**
//  *
//  * BoardTabContent
//  *
//  */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import LinearProgress from '@material-ui/core/LinearProgress';
import BoardTabContentItem from 'components/BoardTabContentItem';
import BoardTabContentItemMobile from 'components/BoardTabContentItemMobile';
import BoardTabContentItemGallery from 'components/BoardTabContentItemGallery';
import Grid from '@material-ui/core/Grid';

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
  gallery: {
    paddingLeft: 26,
    paddingRight: 26,
    paddingTop: 16,
    paddingBottom: 20,
  },
}));

function BoardTabContent({ boardMasterId }) {
  const classes = useStyles();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const [data, setData] = useState(false);
  const [boardMaster, setBoardMaster] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios(
        `${
          process.env.API_URL
        }/api/board?boardMasterId=${boardMasterId}&pageSize=${
          matches ? 9 : 12
        }`,
      );
      // console.log(result.data);
      if (result.data.content) {
        if (result.data.content.length > 0) {
          setData(result.data.content);
          setBoardMaster(result.data.boardMaster);
        }
      }

      setIsLoading(false);
    };
    fetchData();
  }, [boardMasterId]);

  if (!data) {
    return <div className={classes.nodata}>게시글이 없습니다.</div>;
  }
  if (boardMaster && boardMaster.boardType === 'GALLERY') {
    return (
      <div className={classes.gallery}>
        <Grid container spacing={2}>
          {data.length > 0 &&
            data.map(board => <BoardTabContentItemGallery board={board} />)}
        </Grid>
      </div>
    );
  }
  return (
    <div className={!matches && classes.root}>
      {isLoading && <LinearProgress />}
      {data &&
        data.length > 0 &&
        data.map(board =>
          matches ? (
            <BoardTabContentItemMobile board={board} />
          ) : (
            <BoardTabContentItem board={board} />
          ),
        )}

      {!data && <div className={classes.nodata}>게시글이 없습니다.</div>}
    </div>
  );
}

BoardTabContent.propTypes = {
  boardMasterId: PropTypes.number.isRequired,
};

export default BoardTabContent;
