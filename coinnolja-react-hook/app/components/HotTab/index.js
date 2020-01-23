/**
 *
 * HotTab
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import HotTabSearch from 'components/HotTabSearch';
import HotTabBoard from 'components/HotTabBoard';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#ffffff',
    border: 'solid 1px #dedede',
    marginTop: theme.spacing(1.6),
    marginBottom: theme.spacing(1.6),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(1),
    },
  },
  tab: {
    minWidth: 126,
    width: 86,
    height: 24,
    fontFamily: 'NotoSansCJKkr',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#a6a6a6',
    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
      width: 90,
      minWidth: 50,
      // height: 18,
      minHeight: 36,
    },
  },
  tabSelected: {
    minWidth: 126,
    width: 107,
    height: 24,
    fontFamily: 'NotoSansCJKkr',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#3b69c1',
    [theme.breakpoints.down('xs')]: {
      minWidth: 50,
      fontSize: 12,
      width: 90,
      // height: 18,
      minHeight: 36,
    },
  },
  tabs: {
    minHeight: 36,
  },
}));
function HotTab() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  return (
    <div className={classes.root}>
      <Tabs
        position="static"
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        // variant="fullWidth"
        variant="scrollable"
        scrollButtons="auto"
        className={classes.tabs}
      >
        <Tab
          label="인기 검색어"
          classes={{ root: classes.tab, selected: classes.tabSelected }}
        />
        <Tab
          label="인기 게시글"
          classes={{ root: classes.tab, selected: classes.tabSelected }}
        />
      </Tabs>
      <Divider />
      {value === 0 && <HotTabSearch />}
      {value === 1 && <HotTabBoard />}
    </div>
  );
}

HotTab.propTypes = {};

export default HotTab;
