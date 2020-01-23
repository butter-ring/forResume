/**
 *
 * BoardTabImage
 *
 */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import BoardTabContent from 'components/BoardTabContent';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#ffffff',
    border: 'solid 1px #dedede',
    marginTop: theme.spacing(1.6),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
  tab: {
    minWidth: 126,
    width: 135,
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
      width: 110,
      minWidth: 100,
      minHeight: 36,
    },
  },
  tabSelected: {
    minWidth: 126,
    width: 135,
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
      minWidth: 110,
      fontSize: 12,
      width: 100,
      minHeight: 36,
    },
  },
  tabs: {
    minHeight: 36,
  },
}));

function BoardTabImage() {
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
        variant="scrollable"
        scrollButtons="auto"
        className={classes.tabs}
      >
        <Tab
          label="연예인갤러리"
          classes={{ root: classes.tab, selected: classes.tabSelected }}
        />
        <Tab
          label="폰카갤러리"
          classes={{ root: classes.tab, selected: classes.tabSelected }}
        />
        <Tab
          label="손익인증게시판"
          classes={{ root: classes.tab, selected: classes.tabSelected }}
        />
        {/* <Tab
          label="자유갤러리"
          classes={{ root: classes.tab, selected: classes.tabSelected }}
        /> */}
      </Tabs>
      <Divider />
      {value === 0 && <BoardTabContent boardMasterId={16} />}
      {value === 1 && <BoardTabContent boardMasterId={17} />}
      {value === 2 && <BoardTabContent boardMasterId={6} />}
      {/* {value === 2 && <BoardTabContent boardMasterId={1} />} */}
    </div>
  );
}

export default BoardTabImage;
