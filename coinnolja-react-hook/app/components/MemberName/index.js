/**
 *
 * MemberName
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
// import Avatar from '@material-ui/core/Avatar';
import Note from 'components/Note';
import Follow from 'components/Follow';
// import Button from '@material-ui/core/Button';
import useReactRouter from 'use-react-router';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import LevelIcon from 'components/LevelIcon';
import { makeSelectUserData } from 'containers/App/selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(0),
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  svgAnyone: {
    marginRight: 8,
  },
  username: {
    color: '#a6a6a6',
    fontSize: 13,
    fontWeight: 'bold',
    paddingTop: 2,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    // maxWidth: 80,
    width: 80,
    textAlign: 'left',
    // display: 'inline-block',
    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
      width: 50,
      // padding: 0,
    },
  },
  avatar: {
    width: 22,
    height: 22,
    border: 'solid 1px #f1f1f1',
    marginRight: 8,
    [theme.breakpoints.down('xs')]: {
      width: 14,
      height: 14,
    },
  },
  avatarButton: {
    paddingRight: 2,
    // paddingLeft: 2,
    paddingBottom: 0,
    paddingTop: 0,
    textAlign: 'left',
    [theme.breakpoints.down('xs')]: {
      width: 14,
      height: 14,
      // padding: 0,
    },
  },
  sub: {
    display: 'flex',
    alignItems: 'center',
  },
  levelIcon: {
    width: 24,
    height: 24,
    marginRight: 5,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      width: 12,
      height: 12,
      marginRight: 3,
    },
  },
}));
export function MemberName({ member, iconShow, userData }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [openfw, setOpenfw] = React.useState(false);
  const [show, setShow] = React.useState(true);
  const { history } = useReactRouter();

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  useEffect(() => {
    if (iconShow) {
      setShow(iconShow);
    }
  }, [iconShow]);
  function handleClickOpenNote() {
    setAnchorEl(null);
    setOpen(true);
  }

  const handleCloseNote = () => {
    setOpen(false);
  };
  const handleCloseFollow = () => {
    setOpenfw(false);
  };

  function handleClose() {
    setAnchorEl(null);
  }

  function handleFollow() {
    setAnchorEl(null);
    setOpenfw(true);
  }

  function sameid() {
    if (userData.userId === String(member.id)) {
      return true;
    }
    return false;
  }

  function handleDetail() {
    if (userData.userId === String(member.id)) {
      history.push(`/mypage`);
    } else {
      history.push(`/member/${member.id}`);
    }
    // `/api/memberinfo/detail/${memberId}`;
    // history.push(`/search?search=${event.target.search.value}`);
  }

  return (
    <span className={classes.root}>
      <div role="presentation" className={classes.sub} onClick={handleClick}>
        {/* {member && !member.profileImageUrl ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={matches ? 14 : 22}
              height={matches ? 14 : 22}
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
          ) : (
            <Avatar
              alt={member.nickName}
              src={member.profileImageUrl}
              className={classes.avatar}
            />
          )} */}
        {show && (
          <div className={classes.levelIcon}>
            <LevelIcon level={member.level.memberLevel} />
          </div>
        )}
        <span className={classes.username}>{member.nickName}</span>
      </div>
      <Menu
        id={`menu-${member.username}`}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {sameid() ? '' : <MenuItem onClick={handleFollow}>친구추가</MenuItem>}

        <MenuItem onClick={handleDetail}>정보보기</MenuItem>
        <MenuItem onClick={handleClickOpenNote}>쪽지보내기</MenuItem>
      </Menu>
      <Note
        opennote={open}
        closenote={handleCloseNote}
        member={member.username}
      />
      <Follow
        openfollow={openfw}
        closefollow={handleCloseFollow}
        member={member.username}
      />
    </span>
  );
}

MemberName.propTypes = {
  member: PropTypes.object.isRequired,
  iconShow: PropTypes.bool,
  userData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  userData: makeSelectUserData(),
});
const withConnect = connect(mapStateToProps);

export default compose(withConnect)(MemberName);
