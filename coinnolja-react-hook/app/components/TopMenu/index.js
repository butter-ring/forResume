/**
 *
 * TopMenu
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import TopMenuItem from 'components/TopMenuItem';

// import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    // display: 'flex',
    display: 'inline-block',
    maxWidth: 100,
  },
  paper: {
    borderRadius: 0,
    // backgroundColor: '#4d85f1',
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
    zIndex: 99,
  },
  button: {
    maxWidth: 150,
    // minWidth: 80,
    fontFamily: 'NotoSansCJKkr',
    fontSize: 18,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.7)',
    marginRight: 35,
    '&:hover': {
      color: '#fff',
      fontWeight: 'bold',
    },
    zIndex: 1,
  },
  buttonSelected: {
    fontWeight: 'bold',
    color: '#ffffff',
  },

  popper: {
    paddingTop: 33,
    zIndex: 10,
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

  linkTextWide: {
    fontFamily: 'Noto Sans KR',
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    // letterSpacing: 0,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover': {
      color: '#fff',
      fontWeight: 'bold',
    },
  },
  widemenu: {
    minWidth: 600,
    maxWidth: 650,
    // width: '100%',
    marginTop: 1,
    fontSize: 12,
  },
  menuList: {
    overflow: 'hidden',
  },
}));

function TopMenu({ menuTitle, selected }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorEl = React.useRef(null);
  const { title, menuId, subMenus, wide } = menuTitle;
  function handleToggle() {
    setOpen(!open);
  }
  function menuOpen() {
    setOpen(true);
  }
  function menuClose() {
    setOpen(false);
  }

  const handleClose = event => {
    if (anchorEl.current.contains(event.target)) {
      console.log('handleClose');
      return;
    }
    setOpen(false);
  };

  return (
    <div
      onMouseEnter={menuOpen}
      onMouseLeave={menuClose}
      onClick={handleToggle}
      role="presentation"
    >
      <Button
        buttonRef={anchorEl}
        aria-owns={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        // onMouseEnter={menuOpen}
        // onMouseLeave={menuClose}
        // onClick={handleToggle}
        className={classNames(
          classes.button,
          menuId === selected ? classes.buttonSelected : null,
        )}
        color="primary"
      >
        {menuId > 0 ? (
          <Link to={`/board/${menuId}`} className={classes.link}>
            <Button className={classes.linkText} onClick={handleToggle}>
              {title}
            </Button>
          </Link>
        ) : (
          <Button className={classes.linkText}>{title}</Button>
        )}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorEl.current}
        transition
        disablePortal
        className={classes.popper}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            id="menu-list-grow"
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper className={classes.paper}>
              <ClickAwayListener onClickAway={handleClose}>
                {wide ? (
                  <div className={classes.widemenu}>
                    <Grid container spacing={0}>
                      {subMenus &&
                        subMenus.map(subMenu => (
                          <Grid item xs={2}>
                            {subMenu.link ? (
                              <Link
                                to={`/${subMenu.link}`}
                                className={classes.link}
                              >
                                <Button
                                  className={classes.linkTextWide}
                                  onClick={handleClose}
                                >
                                  {subMenu.title}
                                </Button>
                              </Link>
                            ) : (
                              <Link
                                to={`/board/${subMenu.menuId}`}
                                className={classes.link}
                              >
                                <Button
                                  className={classes.linkTextWide}
                                  onClick={handleClose}
                                >
                                  {subMenu.title}
                                </Button>
                              </Link>
                            )}
                          </Grid>
                        ))}
                    </Grid>
                  </div>
                ) : (
                  <MenuList className={classes.menuList}>
                    {subMenus &&
                      subMenus.map(subMenu => (
                        <MenuItem
                          // onClick={() => handleMove(subMenu.menuId)}
                          key={subMenu.menuId}
                          // component={CollisionLink}
                        >
                          {subMenu.link ? (
                            <Link
                              to={`/${subMenu.link}`}
                              className={classes.link}
                            >
                              <Button
                                className={classes.linkText}
                                onClick={handleClose}
                              >
                                {subMenu.title}
                              </Button>
                            </Link>
                          ) : (
                            <TopMenuItem subMenu={subMenu} />
                            // <Link
                            //   to={`/board/${subMenu.menuId}`}
                            //   className={classes.link}
                            // >
                            //   <Button
                            //     className={classes.linkText}
                            //     onClick={handleClose}
                            //   >
                            //     {subMenu.title}
                            //   </Button>
                            // </Link>
                          )}
                        </MenuItem>
                      ))}
                  </MenuList>
                )}
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

TopMenu.propTypes = {
  menuTitle: PropTypes.object.isRequired,
  selected: PropTypes.number.isRequired,
};

export default TopMenu;
