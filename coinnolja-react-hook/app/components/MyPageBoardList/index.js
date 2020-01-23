/* eslint-disable no-unused-vars */
/**
 *
 * MyPageBoardList
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { makeStyles, withStyles, useTheme } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {format} from 'date-fns';
import { Link } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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
    verticalAlign: 'middle',
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
    textAlign: 'left',
  },
  tableCellDateText: {
    fontFamily: 'NotoSansCJKkr',
    fontSize: 14,
    textAlign: 'center',
    color: '#a6a6a6',
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
    minWidth: 50,
    maxWidth: 190,
    width: '50%',
    padding: theme.spacing(0),
    fontFamily: 'NotoSansCJKkr',
    fontSize: 11,
    height: 30,
    verticalAlign: 'middle',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  tableHead: {
    backgroundColor: '#f8f8f8',
    color: '#a6a6a6',
    height: 26,
  },
  tableCellDate: {
    minWidth: 70,
    width: '20%',
    fontFamily: 'NotoSansCJKkr',
    padding: theme.spacing(0),
    fontSize: 11,
    color: '#a6a6a6',
  },
  tableCellBoardName: {
    minWidth: 70,
    padding: theme.spacing(0),
    fontFamily: 'NotoSansCJKkr',
    fontSize: 11,
    height: 30,
    verticalAlign: 'middle',
  },
  tableCellupVote: {
    minWidth: 38,
    padding: theme.spacing(0),
    fontFamily: 'NotoSansCJKkr',
    width: '12%',
    fontSize: 11,
    height: 30,
    verticalAlign: 'middle',
  },
}));

const StyledTableHeadCellM = withStyles(theme => ({
  head: {
    // verticalAlign: 'middle',
    backgroundColor: '#f2f2f2',
    color: '#a6a6a6',
    paddingTop: theme.spacing(1),
    fontSize: 11,
    fontFamily: 'NotoSansCJKkr',
  },
  body: {
    // verticalAlign: 'middle',
  },
}))(TableCell);

// MyPageBoarList function Start -----------------------------------------------------------------
export function MyPageBoardList({ myBoard }) {
  const classes = styles();
  const classesm = stylesm();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  // console.log('data check!!!');
  // console.log(myBoard);

  // if (myBoard) {
  //   myBoard.map((row, index) => console.log(index));
  // }

  // console.log('check myBoard in MyPageBoardList');
  // console.log(myBoard);

  // console.log('check myBoard');
  // console.log(myBoard);

  let mobileTableDisplay;

  if (myBoard) {
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
                  root: classesm.tableCellDate,
                }}
              >
                작성일시
              </TableCell>
              <TableCell
                align="center"
                classes={{
                  root: classesm.tableCellBoardName,
                }}
              >
                구분
              </TableCell>
              <TableCell
                classes={{
                  root: classesm.tableCell,
                }}
              >
                제목
              </TableCell>
              <TableCell
                align="center"
                classes={{
                  root: classesm.tableCellupVote,
                }}
              >
                추천
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myBoard &&
              myBoard.map(row => (
                <TableRow key={row.id}>
                  <TableCell
                    align="center"
                    classes={{
                      root: classesm.tableCellDate,
                    }}
                  >
                    {format(new Date(row.createdAt), 'yyyy-MM-dd')}
                  </TableCell>
                  <TableCell
                    align="center"
                    classes={{
                      root: classesm.tableCellBoardName,
                    }}
                  >
                    {row.boardMaster.boardName}
                  </TableCell>
                  <TableCell
                    align="left"
                    classes={{
                      root: classesm.tableCell,
                    }}
                  >
                    <Link
                      to={`/board/detail/${row.id}`}
                      className={classes.link}
                    >
                      <span className={classes.titleSpan}>
                        {row.boardMaster && row.boardMaster.boardSubName && (
                          <span
                            style={{
                              color: `#${row.boardMaster.boardSubNameColor}`,
                              fontWeight: 'bold',
                            }}
                          >
                            {`[${row.boardMaster.boardSubName}]`}&nbsp;
                          </span>
                        )}
                        {row.title}
                      </span>
                    </Link>
                  </TableCell>
                  <TableCell
                    align="center"
                    classes={{
                      root: classesm.tableCellupVote,
                    }}
                  >
                    {row.upVoteCount}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  } else {
    mobileTableDisplay = (
      <div className={classesm.tableWrapper}>
        <Table className={classesm.table}>
          <TableHead>
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
                classes={{
                  root: classesm.tableCell,
                }}
              >
                제목
              </TableCell>
              <TableCell
                align="center"
                classes={{
                  root: classesm.tableCell,
                }}
              >
                추천
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan="4" align="center" height="100" fontSize="14">
                최근 작성한 글이 없습니다.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  let tableDisplay;

  if (myBoard) {
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
                classes={{
                  root: classes.tableCellTitle,
                }}
              >
                제목
              </TableCell>
              <TableCell
                align="center"
                classes={{
                  root: classes.tableCell,
                }}
              >
                추천
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myBoard &&
              myBoard.map(row => (
                <TableRow key={row.id}>
                  <TableCell
                    align="center"
                    classes={{
                      root: classes.tableCellDateText,
                    }}
                  >
                    {format(new Date(row.createdAt), 'yyyy-MM-dd')}
                  </TableCell>
                  <TableCell
                    classes={{
                      root: classes.tableCell,
                    }}
                  >
                    {row.boardMaster.boardName}
                  </TableCell>
                  <TableCell
                    classes={{
                      root: classes.tableCellTitle,
                    }}
                  >
                    <Link
                      to={`/board/detail/${row.id}`}
                      className={classes.link}
                    >
                      <span className={classes.titleSpan}>
                        {row.boardMaster && row.boardMaster.boardSubName && (
                          <span
                            style={{
                              color: `#${row.boardMaster.boardSubNameColor}`,
                              fontWeight: 'bold',
                            }}
                          >
                            {`[${row.boardMaster.boardSubName}]`}&nbsp;
                          </span>
                        )}
                        {row.title}
                      </span>
                    </Link>
                  </TableCell>
                  <TableCell
                    align="center"
                    classes={{
                      root: classes.tableCell,
                    }}
                  >
                    {row.upVoteCount}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  } else {
    tableDisplay = (
      <div className={classes.tableWrapper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>작성일시</TableCell>
              <TableCell>구분</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>추천</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan="4" align="center" height="180" fontSize="14">
                최근 작성한 글이 없습니다.
              </TableCell>
            </TableRow>
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
// MyPageBoardList function End -----------------------------------------------------

MyPageBoardList.propTypes = {
  myBoard: PropTypes.any.isRequired,
};

export default memo(MyPageBoardList);
