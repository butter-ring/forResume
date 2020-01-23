/**
 *
 * BoardTabContentItemGallery
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import { FormattedDate } from 'react-intl';
import Alink from 'components/Alink';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(0),
    paddingLeft: 4,
    paddingRight: 4,
    paddingBottom: 20,
  },
  cover: {
    width: '100%',
    maxWidth: 202,
    height: 120,
    border: 'solid 1px #eaeaea',
    // borderRadius: 3,
  },
  text: {
    paddingTop: 14,
    fontSize: 14,
    fontWeight: 'bold',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    maxWidth: 201,
  },
  date: {
    fontSize: 12,
    color: '#a6a6a6',
  },
}));
function BoardTabContentItemGallery({ board }) {
  const classes = useStyles();
  return (
    <Grid item xs={6} sm={3}>
      <Alink to={`/board/detail/${board.id}`} className={classes.link}>
        <CardMedia className={classes.cover} image={board.thumnailUrl} />
      </Alink>
      <div className={classes.text}>{board.title}</div>
      <div className={classes.date}>
        <FormattedDate value={new Date(board.createdAt)} year="numeric" />
        -
        <FormattedDate value={new Date(board.createdAt)} month="2-digit" />
        -
        <FormattedDate value={new Date(board.createdAt)} day="2-digit" />
      </div>
    </Grid>
  );
}

BoardTabContentItemGallery.propTypes = {
  board: PropTypes.object.isRequired,
};

export default BoardTabContentItemGallery;
