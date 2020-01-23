/**
 *
 * History
 *
 */

import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/styles';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
// import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
// import FilledInput from '@material-ui/core/FilledInput';
// import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import makeSelectHistory from './selectors';
import reducer from './reducer';
import saga from './saga';

// #323232
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: 40,
  },
  title: {
    fontSize: 32,
    color: '#323232',
    paddingLeft: 30,
    paddingBottom: 30,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export function History() {
  useInjectReducer({ key: 'history', reducer });
  useInjectSaga({ key: 'history', saga });
  const [value, setValue] = React.useState(0);
  const [symbol, setSymbol] = React.useState('');

  const classes = useStyles();

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  const handleTabsChange = e => {
    setSymbol(e.targer.value);
  };

  useEffect(() => {}, []);

  return (
    <div className={classes.root}>
      <div className={classes.title}>거래기록</div>
      <div className={classes.tabsWrapper}>
        <Tabs
          value={value}
          // indicatorColor="primary"
          textColor="inherit"
          onChange={handleChange}
        >
          <Tab label="입금/출금" />
          <Tab label="구매/판매" />
        </Tabs>
      </div>
      <Divider variant="middle" />
      <div>
        <FormControl variant="outlined" className={classes.formControl}>
          <Select
            value={symbol}
            onChange={handleTabsChange}
            input={<OutlinedInput name="age" id="outlined-age-simple" />}
          >
            <MenuItem value="all">전체 코인명</MenuItem>
            <MenuItem value="KRW">KRW</MenuItem>
            <MenuItem value="ETH">ETH</MenuItem>
            <MenuItem value="BTC">BTC</MenuItem>
            <MenuItem value="BTC">BCH</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

History.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  history: makeSelectHistory(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(History);
