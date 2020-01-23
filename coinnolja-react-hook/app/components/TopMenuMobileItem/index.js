/**
 *
 * TopMenuMobileItem
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Link } from 'react-router-dom';
// import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeSelectUserData } from 'containers/App/selectors';
import ErrorPop from 'components/ErrorPop';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginTop: theme.spacing(0),
  },
  link: {
    textDecoration: 'none',
    userSelect: 'none',
    color: '#4d4d4d',
  },
  expansionPanel: {
    borderRadius: 0,
    width: '100%',
    backgroundColor: '#ddd',
  },
  list: {
    backgroundColor: '#f2f2f2',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 27,
    color: '#4d4d4d',
    cursor: 'pointer',
    borderBottom: 'solid 1px #fff',
  },
  listWrap: {
    width: '100%',
  },
  detail: {
    backgroundColor: '#f2f2f2',
    padding: 0,
    // borderBottom: 'solid 1px #fff',
  },
}));

function TopMenuMobileItem({ subMenu, handleNavi, userData }) {
  const classes = useStyles();
  // console.log(userData);
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
  if (subMenu.menuId === 0) {
    return (
      <ExpansionPanel className={classes.expansionPanel} square>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{subMenu.title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.detail}>
          <div className={classes.listWrap}>
            {subMenu.subMenus &&
              subMenu.subMenus.map(raw => (
                <div
                  // onClick={() => handleNavi(subMenu.menuId)}
                  key={raw.menuId + Math.random()}
                  // component={CollisionLink}
                  className={classes.list}
                >
                  <a
                    href={raw.link}
                    className={classes.link}
                    // onClick={handleNavi}
                    target="_blank"
                  >
                    {raw.title}
                  </a>
                </div>
              ))}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
  return (
    <div className={classes.list}>
      {subMenu.level && subMenu.level <= userData.memberLevel ? (
        <Link
          to={`/board/${subMenu.menuId}`}
          className={classes.link}
          onClick={handleNavi}
        >
          {subMenu.title}
        </Link>
      ) : (
        <div>
          {!subMenu.level ? (
            <Link
              to={`/board/${subMenu.menuId}`}
              className={classes.link}
              onClick={handleNavi}
            >
              {subMenu.title}
            </Link>
          ) : (
            <div
              onClick={() => handleLevelCheck(subMenu.level)}
              role="presentation"
            >
              {subMenu.title}
            </div>
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

TopMenuMobileItem.propTypes = {
  subMenu: PropTypes.object.isRequired,
  handleNavi: PropTypes.func.isRequired,
  userData: PropTypes.object,
};

// export default TopMenuMobileItem;
const mapStateToProps = createStructuredSelector({
  userData: makeSelectUserData(),
});
const withConnect = connect(mapStateToProps);

export default compose(withConnect)(TopMenuMobileItem);
