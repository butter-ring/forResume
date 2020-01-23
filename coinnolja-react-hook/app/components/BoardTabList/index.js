/**
 *
 * BoardTabList
 *
 */
import React from 'react';
import { makeStyles } from '@material-ui/styles';
// import useMediaQuery from '@material-ui/core/useMediaQuery';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import BoardTabContent from 'components/BoardTabContent';

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
      width: 80,
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
      width: 80,
      // height: 18,
      minHeight: 36,
    },
  },
  tabs: {
    minHeight: 36,
  },
}));

function BoardTabList() {
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
          label="코인정보"
          classes={{ root: classes.tab, selected: classes.tabSelected }}
        />
        <Tab
          label="자유게시판"
          classes={{ root: classes.tab, selected: classes.tabSelected }}
        />
        <Tab
          label="유머/감동"
          classes={{ root: classes.tab, selected: classes.tabSelected }}
        />
        <Tab
          label="비트코인"
          classes={{ root: classes.tab, selected: classes.tabSelected }}
        />
        <Tab
          label="가입인사"
          classes={{ root: classes.tab, selected: classes.tabSelected }}
        />
      </Tabs>
      <Divider />
      {value === 0 && <BoardTabContent boardMasterId={1} />}
      {value === 1 && <BoardTabContent boardMasterId={5} />}
      {value === 2 && <BoardTabContent boardMasterId={7} />}
      {value === 3 && <BoardTabContent boardMasterId={10} />}
      {value === 4 && <BoardTabContent boardMasterId={8} />}
    </div>
  );
}

export default BoardTabList;
