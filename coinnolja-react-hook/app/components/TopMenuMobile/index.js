/**
 *
 * TopMenuMobile
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Link } from 'react-router-dom';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TopMenuMobileItem from 'components/TopMenuMobileItem';
import { makeSelectUserData } from 'containers/App/selectors';
// import useReactRouter from 'use-react-router';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    borderRadius: 0,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  link: {
    textDecoration: 'none',
    userSelect: 'none',
    color: '#4d4d4d',
  },
  detail: {
    backgroundColor: '#f2f2f2',
    padding: 0,
  },
  list: {
    backgroundColor: '#f2f2f2',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 27,
    color: '#4d4d4d',
  },
  expansionPanel: {
    borderRadius: 0,
  },
  listWrap: {
    width: '100%',
  },
}));
function TopMenuMobile({ menuTitle, setMenu, userData }) {
  const classes = useStyles();

  const { title, subMenus } = menuTitle;
  // const { history } = useReactRouter();
  const handleNavi = () => {
    // history.push(`/board/${menuId}`);
    console.log(userData);
    setMenu(false);
  };

  return (
    <div className={classes.root}>
      <ExpansionPanel className={classes.expansionPanel} square>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="13"
              viewBox="0 0 11 13"
            >
              <path
                fill="#313131"
                fillRule="evenodd"
                d="M6.6 0v1.358l-5.5 2.27v5.668L0 9.75V2.723L6.6 0zM4.4 5.973L11 3.25v7.026L4.4 13V5.973zm4.4-4.348v1.358l-5.5 2.27v5.668l-1.1.454V4.349l6.6-2.724z"
              />
            </svg>
            {` `}
            {title}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.detail}>
          <div className={classes.listWrap}>
            {subMenus &&
              subMenus.map(subMenu => (
                <div
                  // onClick={() => handleNavi(subMenu.menuId)}
                  key={subMenu.menuId}
                  // component={CollisionLink}
                  // className={classes.list}
                >
                  {subMenu.link ? (
                    <div className={classes.list}>
                      <Link
                        to={`/${subMenu.link}`}
                        className={classes.link}
                        onClick={handleNavi}
                      >
                        {subMenu.title}
                      </Link>
                    </div>
                  ) : (
                    <TopMenuMobileItem
                      subMenu={subMenu}
                      handleNavi={handleNavi}
                    />
                  )}
                </div>
              ))}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

TopMenuMobile.propTypes = {
  menuTitle: PropTypes.object.isRequired,
  setMenu: PropTypes.func.isRequired,
  userData: PropTypes.object,
};

// export default TopMenuMobile;
const mapStateToProps = createStructuredSelector({
  userData: makeSelectUserData(),
});
const withConnect = connect(mapStateToProps);

export default compose(withConnect)(TopMenuMobile);
