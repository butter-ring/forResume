/**
 *
 * TopMenuItem
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeSelectUserData } from 'containers/App/selectors';
import ErrorPop from 'components/ErrorPop';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginTop: theme.spacing(0),
    overflow: 'hidden',
    float: 'left',
    width: '100%',
  },
  link: {
    textDecoration: 'none',
    userSelect: 'none',
    color: '#ffffff',
  },
  linkText: {
    fontFamily: 'Noto Sans KR',
    fontSize: 18,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover': {
      color: '#fff',
      fontWeight: 'bold',
    },
  },
  subLink: {
    marginLeft: 20,
  },
  submenu: {
    // position: '',
    top: 0,
    right: -20,
    backgroundColor: '#dddddd',
    zIndex: 99,
    clear: 'left',
    display: 'block',
  },
}));

function TopMenuItem({ subMenu, userData }) {
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [openError, setOpenError] = useState({
    open: false,
    errorCode: false,
  });

  const handleLevelCheck = level => {
    if (level === 12) {
      setOpenError({
        open: true,
        errorCode: {
          code: 403002,
        },
      });
    } else if (19) {
      setOpenError({
        open: true,
        errorCode: {
          code: 403003,
        },
      });
    }

    return false;
  };

  const handleCloseError = () => {
    setOpenError({
      open: false,
      errorCode: false,
    });
  };
  function handleToggle() {
    setMenuOpen(!menuOpen);
  }

  // console.log(subMenu);
  if (subMenu.menuId === 0) {
    return (
      <div
        className={classes.root}
        onMouseEnter={handleToggle}
        onMouseLeave={handleToggle}
      >
        {subMenu.pclink ? (
          <Link to={`/${subMenu.pclink}`} className={classes.link}>
            <Button className={classes.linkText}>{subMenu.title}</Button>
          </Link>
        ) : (
          <Button
            className={classes.linkText}
            // onClick={handleToggle}
          >
            {subMenu.title}
          </Button>
        )}

        {/* {open && <div className={classes.submenu}>AAAA</div>} */}
      </div>
    );
  }

  return (
    <div>
      {subMenu.level && subMenu.level <= userData.memberLevel ? (
        <Link to={`/board/${subMenu.menuId}`} className={classes.link}>
          <Button className={classes.linkText}>{subMenu.title}</Button>
        </Link>
      ) : (
        <div>
          {!subMenu.level ? (
            <Link to={`/board/${subMenu.menuId}`} className={classes.link}>
              <Button className={classes.linkText}>{subMenu.title}</Button>
            </Link>
          ) : (
            <Button
              className={classes.linkText}
              onClick={() => handleLevelCheck(subMenu.level)}
              // role="presentation"
            >
              {subMenu.title}
            </Button>
          )}
        </div>
      )}
      {openError.open && (
        <ErrorPop
          handleClose={handleCloseError}
          openError={openError}
          errorTitle="권한 없음"
        />
      )}
    </div>
  );
}

TopMenuItem.propTypes = {
  subMenu: PropTypes.object.isRequired,
  userData: PropTypes.object,
};

// export default TopMenuItem;
const mapStateToProps = createStructuredSelector({
  userData: makeSelectUserData(),
});
const withConnect = connect(mapStateToProps);

export default compose(withConnect)(TopMenuItem);
