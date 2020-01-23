/**
 *
 * MyPageReplyList
 *
 */

import React from 'react';
import { makeStyles, useTheme, withStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const styles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(0),
    verticalAlign: 'middle',
  },
  table: {
    fontFamily: 'NotoSansCJKkr',
    width: '100%',
    marginTop: 16,
  },
  tableWrapper: {
    fontFamily: 'NotoSansCJKkr',
  },
  titleSpan: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    maxWidth: 298,
    display: 'inline-block',
  },
  tableCellDate: {
    fontFamily: 'NotoSansCJKkr',
    width: '15%',
    fontSize: 14,
    textAlign: 'center',
  },
  tableHead: {
    fontFamily: 'NotoSansCJKkr',
    backgroundColor: '#f2f2f2',
    height: 40,
  },
  tableCell: {
    fontFamily: 'NotoSansCJKkr',
    fontSize: 14,
    textAlign: 'center',
  },
  tableCellleft: {
    fontFamily: 'NotoSansCJKkr',
    fontSize: 14,
    textAlign: 'left',
  },
  tableCellBoardName: {
    width: '17%',
    fontFamily: 'NotoSansCJKkr',
    fontSize: 14,
    textAlign: 'center',
  },
  tableCellTitle: {
    width: '50%',
    fontFamily: 'NotoSansCJKkr',
    fontSize: 14,
    textAlign: 'center',
  },
  tableCellDateText: {
    fontFamily: 'NotoSansCJKkr',
    fontSize: 14,
    textAlign: 'center',
    color: '#a6a6a6',
  },
  underline: {
    textDecoration: 'none',
  },
}));

// mobile Styles -----------------------------------------------------------
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
    minWidth: 65,
    width: '20%',
    fontFamily: 'NotoSansCJKkr',
    padding: theme.spacing(0),
    fontSize: 11,
    color: '#a6a6a6',
  },
  tableCellContent: {
    padding: theme.spacing(0),
    fontFamily: 'NotoSansCJKkr',
    width: '50%',
    minWidth: 80,
    maxWidth: 200,
    fontSize: 11,
    height: 30,
    verticalAlign: 'middle',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  tableHead: {
    backgroundColor: '#f8f8f8',
    color: '#a6a6a6',
    height: 26,
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

function MyPageReplyList(myReply) {
  const classes = styles();
  const classesm = stylesm();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  let mobileTableDisplay;

  // console.log('::::::::myReply::::::::::');
  // console.log(myReply.myReply);

  if (myReply) {
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
                작성일시
              </TableCell>
              <TableCell
                align="center"
                classes={{
                  root: classesm.tableCell,
                }}
              >
                구분
              </TableCell>
              <TableCell
                align="center"
                classes={{
                  root: classesm.tableCellContent,
                }}
              >
                내용
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myReply.myReply &&
              myReply.myReply.map(row => (
                <TableRow key={row.id}>
                  <TableCell
                    align="center"
                    classes={{
                      root: classesm.tableCell,
                    }}
                  >
                    {format(new Date(row.createdAt), 'yyyy-MM-dd HH:mm:ss')}
                  </TableCell>
                  <TableCell
                    align="center"
                    classes={{
                      root: classesm.tableCell,
                    }}
                  >
                    {row.board.boardMaster.boardName}
                  </TableCell>
                  <TableCell
                    align="left"
                    classes={{
                      root: classesm.tableCellContent,
                    }}
                  >
                    <Link
                      className={classes.underline}
                      to={`/board/detail/${row.boardId}#comment_${row.id}`}
                    >
                      {row.content}
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            {myReply.myReply && !myReply.myReply.length > 0 && (
              <TableRow>
                <StyledTableHeadCellM
                  colSpan="4"
                  align="center"
                  height="130"
                  fontSize="16"
                >
                  작성한 댓글이 없습니다.
                </StyledTableHeadCellM>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  }
  let tableDisplay;

  if (myReply) {
    tableDisplay = (
      <div className={classes.tableWrapper}>
        <Table className={classes.table}>
          <TableHead
            classes={{
              root: classes.tableHead,
            }}
          >
            <TableRow>
              <TableCell
                align="center"
                classes={{
                  root: classes.tableCellDate,
                }}
              >
                작성일시
              </TableCell>
              <TableCell
                align="center"
                classes={{
                  root: classes.tableCellBoardName,
                }}
              >
                구분
              </TableCell>
              <TableCell
                align="center"
                classes={{
                  root: classes.tableCellTitle,
                }}
              >
                내용
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myReply.myReply &&
              myReply.myReply.map(row => (
                <TableRow key={row.id}>
                  <TableCell
                    align="center"
                    classes={{
                      root: classes.tableCellDateText,
                    }}
                  >
                    {format(new Date(row.createdAt), 'yyyy-MM-dd HH:mm:ss')}
                  </TableCell>
                  <TableCell
                    classes={{
                      root: classes.tableCell,
                    }}
                  >
                    {row.board.boardMaster.boardName}
                  </TableCell>
                  <TableCell
                    align="left"
                    classes={{
                      root: classes.tableCellleft,
                    }}
                  >
                    <Link
                      className={classes.underline}
                      to={`/board/detail/${row.boardId}#comment_${row.id}`}
                    >
                      {row.content}
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            {myReply.myReply && !myReply.myReply.length > 0 && (
              <TableRow>
                <StyledTableHeadCellM
                  colSpan="4"
                  align="center"
                  height="130"
                  fontSize="16"
                >
                  작성한 댓글이 없습니다.
                </StyledTableHeadCellM>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (matches) {
    return <div>{mobileTableDisplay}</div>;
  }
  return <div>{tableDisplay}</div>;
}

MyPageReplyList.propTypes = {
  // myReply: PropTypes.any.isRequired,
};

export default MyPageReplyList;
