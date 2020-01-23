/**
 *
 * BoardSearchBox
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  selectRoot: {
    padding: theme.spacing(0),
  },
  selectMenu: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 20,
    fontSize: 14,
  },
  searchInput: {
    // border: 'solid 1px rgba(224, 224, 224, 1)',
    paddingTop: 4,
    paddingBottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 5,
  },
  searchInputWrap: {
    border: 'solid 1px rgba(224, 224, 224, 1)',
    height: 39,
    display: 'flex',
    alignItems: 'center',
    // marginRight: 10,
  },
  boardSearchWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boardSearch: {
    display: 'flex',
    alignItems: 'center',
  },
  iconButton: {
    padding: 1,
  },
  formControl: {
    marginRight: 6,
  },
}));
function BoardSearchBox({ pageLoadSearch, searchKey, searchVal }) {
  const classes = useStyles();

  const [searchKeyBox, setSearchKeyBox] = useState(0);
  const [searchValBox, setSearchValBox] = useState('');

  useEffect(() => {
    // searchKey;
    setSearchKeyBox(searchKey);
    setSearchValBox(searchVal);
  }, [searchVal]);
  const onSubmitFormInit = event => {
    event.preventDefault();
    // console.log(event.target.searchVal);
    const searchBool = Boolean(event.target.searchVal.value);
    if (searchBool) {
      // console.log(event.target.searchVal.value);
      // console.log(event.target.searchKey.value);
      pageLoadSearch(
        event.target.searchKey.value,
        event.target.searchVal.value,
      );
    }
  };

  return (
    <form onSubmit={onSubmitFormInit}>
      <div className={classes.boardSearch}>
        <FormControl variant="outlined" className={classes.formControl}>
          {/* <InputLabel htmlFor="outlined-age-simple">Gender</InputLabel> */}
          <Select
            value={searchKeyBox}
            onChange={e => setSearchKeyBox(e.target.value)}
            displayEmpty
            input={
              <OutlinedInput
                // labelWidth={state.labelWidth}
                name="searchKey"
                id="outlined-age-simple"
                classes={{
                  // root: classes.outlinedInput,
                  notchedOutline: classes.notchedOutline,
                }}
              />
            }
            classes={{
              root: classes.selectRoot,
              selectMenu: classes.selectMenu,
            }}
          >
            <MenuItem value={0}>
              <span className={classes.selectNoneTest}>제목+내용</span>
            </MenuItem>
            <MenuItem value={1}>제목</MenuItem>
            <MenuItem value={2}>내용</MenuItem>
          </Select>
        </FormControl>
        <div className={classes.searchInputWrap}>
          <InputBase
            className={classes.searchInput}
            placeholder="검색어를 입력해 주세요"
            inputProps={{
              'aria-label': '검색어를 입력해 주세요',
              maxLength: 20,
              name: 'searchVal',
            }}
            value={searchValBox}
            onChange={e => setSearchValBox(e.target.value)}
          />
          <IconButton
            className={classes.iconButton}
            aria-label="Search"
            type="submit"
          >
            <SearchIcon />
          </IconButton>
        </div>
        {/* <input
      type="text"
      // value={searchVal}
      name="searchVal"
      maxLengh="20"
      // onChange={e => setSearchVal(e.target.value)}
    /> */}
      </div>
    </form>
  );
}

BoardSearchBox.propTypes = {
  pageLoadSearch: PropTypes.func.isRequired,
  searchKey: PropTypes.func.isRequired,
  searchVal: PropTypes.func.isRequired,
};

export default BoardSearchBox;
