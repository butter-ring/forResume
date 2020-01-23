/**
 *
 * NoteList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles, withStyles, useTheme } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Pagination from 'material-ui-flat-pagination';
import dateFns from 'date-fns';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import request from 'utils/request';

const StyledTableHeadCell = withStyles(theme => ({
  head: {
    verticalAlign: 'middle',
    backgroundColor: '#f2f2f2',
    color: '#a6a6a6',
    paddingTop: theme.spacing(1),
    fontSize: 14,
    fontFamily: 'NotoSansCJKkr',
  },
  body: {
    // verticalAlign: 'middle',
  },
}))(TableCell);

const StyledTableCell = withStyles(theme => ({
  body: {
    paddingTop: theme.spacing(1),
    fontSize: 14,
  },
}))(TableCell);

const StyledDateTableCell = withStyles(theme => ({
  body: {
    paddingTop: theme.spacing(1),
    fontSize: 14,
    color: '#a6a6a6',
  },
}))(TableCell);

const styles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(0),
  },
  table: {
    fontFamily: 'NotoSansCJKkr',
    verticalAlign: 'middle',
    width: '100%',
    // maxWidth: 884,
    marginTop: 16,
  },
  tableWrapper: {
    fontFamily: 'NotoSansCJKkr',
  },
}));

const stylesm = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(0),
  },
  table: {
    fontFamily: 'NotoSansCJKkr',
    verticalAlign: 'middle',
    marginTop: 16,
  },
  tableWrapper: {
    fontFamily: 'NotoSansCJKkr',
  },
  tableCell: {
    minWidth: 70,
    padding: theme.spacing(0),
    fontFamily: 'NotoSansCJKkr',
    fontSize: 11,
    height: 30,
    verticalAlign: 'middle',
  },
  tableCellcontent: {
    minWidth: 70,
    paddingTop: 8,
    paddingBottom: 8,
    padding: theme.spacing(0),
    fontFamily: 'NotoSansCJKkr',
    fontSize: 11,
    height: 30,
    verticalAlign: 'middle',
  },
  tableHead: {
    backgroundColor: '#f8f8f8',
    color: '#a6a6a6',
    height: 26,
  },
  tableCellDate: {
    minWidth: 70,
    fontFamily: 'NotoSansCJKkr',
    padding: theme.spacing(0),
    fontSize: 11,
    color: '#a6a6a6',
  },
  button: {
    minWidth: 30,
    padding: theme.spacing(0),
    fontSize: 11,
  },
}));

const StyledTableHeadCellM = withStyles(theme => ({
  head: {
    verticalAlign: 'middle',
    backgroundColor: '#f2f2f2',
    color: '#a6a6a6',
    paddingTop: theme.spacing(1),
    fontSize: 11,
    fontFamily: 'NotoSansCJKkr',
  },
  body: {
    verticalAlign: 'middle',
  },
}))(TableCell);

const modalStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 280,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
    outline: 'none',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

export function NoteList({ pageload, notelist }) {
  const classes = styles();
  const classesm = stylesm();
  const classesmodal = modalStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const [openm, setOpenm] = React.useState(false);
  const [sendAt, setSendAt] = React.useState();
  const [senderId, setSenderId] = React.useState();
  const [modalStyle] = React.useState(getModalStyle);

  const handleOpenModal = (sendat, senderid) => {
    setOpenm(true);
    setSendAt(sendat);
    setSenderId(senderid);
  };

  const handleCloseModal = () => {
    setOpenm(false);
  };

  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const clickHandlerDel = async () => {
    // setLoading(true);

    const options = {
      method: 'POST',
      auth: true,
      data: {
        senderId,
        sendAt,
      },
    };

    console.log(options);
    try {
      const response = await request(`/api/notelist/del`, options);
      console.log(response);
      handleCloseModal();
      pageload(notelist.pageable.offset / notelist.pageable.pageSize + 1);
    } catch (err) {
      console.log(err.response);
    }
    // setLoading(false);
  };

  // 모바일 화면
  // 모바일 화면
  // 모바일 화면
  let mobileTableDisplay;
  if (notelist) {
    mobileTableDisplay = (
      <div className={classesm.tableWrapper}>
        <Table className={classesm.table}>
          <TableHead
            classes={{
              root: classesm.tableHead,
            }}
          >
            <TableRow>
              <TableCell
                align="center"
                classes={{
                  root: classesm.tableCell,
                }}
              >
                받은일시
              </TableCell>
              <TableCell
                align="center"
                classes={{
                  root: classesm.tableCell,
                }}
              >
                보낸이
              </TableCell>
              <TableCell
                classes={{
                  root: classesm.tableCell,
                }}
                align="center"
              >
                내용
              </TableCell>
              <TableCell width="70" />
            </TableRow>
          </TableHead>
          <TableBody>
            {notelist.content &&
              notelist.content.map(row => (
                <TableRow key={row.id}>
                  <TableCell
                    align="center"
                    classes={{
                      root: classesm.tableCellDate,
                    }}
                  >
                    {dateFns.format(
                      new Date(row.sendAt),
                      'yyyy-MM-dd HH:mm:ss',
                    )}
                  </TableCell>
                  <TableCell
                    align="center"
                    classes={{
                      root: classesm.tableCell,
                    }}
                  >
                    {row.senderUsername}
                  </TableCell>
                  <TableCell
                    align="left"
                    classes={{
                      root: classesm.tableCellcontent,
                    }}
                  >
                    {row.content}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      align="right"
                      onClick={() => handleOpenModal(row.sendAt, row.senderId)}
                      variant="outlined"
                      color="primary"
                      size="small"
                      className={classesm.button}
                    >
                      삭제
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

            {!notelist.content.length > 0 && (
              <TableRow>
                <StyledTableHeadCellM
                  colSpan="4"
                  align="center"
                  height="130"
                  fontSize="14"
                >
                  받은 쪽지가 없습니다.
                </StyledTableHeadCellM>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {notelist.content.length > 0 && (
          <Pagination
            align="center"
            limit={notelist.pageable.pageSize}
            offset={notelist.pageable.offset}
            total={notelist.totalElements}
            onClick={(e, offset) =>
              pageload(offset / notelist.pageable.pageSize + 1)
            }
            innerButtonCount
          />
        )}
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={openm}
          onClose={handleCloseModal}
        >
          <div style={modalStyle} className={classesmodal.paper} align="center">
            <Typography variant="h6" id="simple-modal-description">
              쪽지를 삭제 하시겠습니까?
            </Typography>
            <br />
            <Button
              onClick={handleCloseModal}
              className={classesmodal.button}
              variant="outlined"
              size="medium"
              color="primary"
            >
              닫기
            </Button>
            <Button
              onClick={clickHandlerDel}
              className={classesmodal.button}
              variant="outlined"
              size="medium"
              color="primary"
            >
              삭제
            </Button>
          </div>
        </Modal>
      </div>
    );
  }

  let tableDisplay;

  if (notelist) {
    tableDisplay = (
      <div className={classes.tableWrapper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableHeadCell width="130" align="center">
                받은일시
              </StyledTableHeadCell>
              <StyledTableHeadCell width="130" align="center">
                보낸이
              </StyledTableHeadCell>
              <StyledTableHeadCell align="center" width="503">
                내용
              </StyledTableHeadCell>
              <StyledTableHeadCell width="70" />
            </TableRow>
          </TableHead>
          <TableBody>
            {notelist.content &&
              notelist.content.map(row => (
                <TableRow key={row.id}>
                  <StyledDateTableCell align="center">
                    {dateFns.format(
                      new Date(row.sendAt),
                      'yyyy-MM-dd HH:mm:ss',
                    )}
                  </StyledDateTableCell>
                  <StyledTableCell align="center">
                    {row.senderUsername}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.content}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button
                      align="right"
                      onClick={() => handleOpenModal(row.sendAt, row.senderId)}
                      variant="outlined"
                      color="primary"
                    >
                      삭제
                    </Button>
                  </StyledTableCell>
                </TableRow>
              ))}
            {!notelist.content.length > 0 && (
              <TableRow>
                <StyledTableHeadCell
                  colSpan="4"
                  align="center"
                  height="150"
                  fontSize="14"
                >
                  받은 쪽지가 없습니다.
                </StyledTableHeadCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {notelist.content.length > 0 && (
          <Pagination
            align="center"
            limit={notelist.pageable.pageSize}
            offset={notelist.pageable.offset}
            total={notelist.totalElements}
            onClick={(e, offset) =>
              pageload(offset / notelist.pageable.pageSize + 1)
            }
            innerButtonCount
          />
        )}
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={openm}
          onClose={handleCloseModal}
        >
          <div style={modalStyle} className={classesmodal.paper} align="center">
            <Typography variant="h6" id="simple-modal-description">
              쪽지를 삭제 하시겠습니까?
            </Typography>
            <br />
            <Button
              onClick={handleCloseModal}
              className={classesmodal.button}
              variant="outlined"
              size="medium"
              color="primary"
            >
              닫기
            </Button>
            <Button
              onClick={clickHandlerDel}
              className={classesmodal.button}
              variant="outlined"
              size="medium"
              color="primary"
            >
              삭제
            </Button>
          </div>
        </Modal>
      </div>
    );
  }

  if (matches) {
    return <div>{mobileTableDisplay}</div>;
  }
  return <div>{tableDisplay}</div>;
}

NoteList.propTypes = {
  pageload: PropTypes.func.isRequired,
  notelist: PropTypes.any.isRequired,
};

export default NoteList;
