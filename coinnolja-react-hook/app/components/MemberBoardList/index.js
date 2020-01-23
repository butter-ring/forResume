/**
 *
 * MemberBoardList
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { makeStyles, useTheme } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Pagination from 'material-ui-flat-pagination';

//

// const StyledTableCell = withStyles(theme => ({
//   body: {
//     paddingTop: theme.spacing(1),
//     fontSize: 14,
//   },
// }))(TableCell);

// const StyledDateTableCell = withStyles(theme => ({
//   body: {
//     paddingTop: theme.spacing(1),
//     fontSize: 14,
//     color: '#a6a6a6',
//   },
// }))(TableCell);

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
  paging: {
    padding: 15,
    textAlign: 'center',
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
    padding: theme.spacing(0),
    width: '8%',
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
    fontFamily: 'NotoSansCJKkr',
    padding: theme.spacing(0),
    width: '10%',
    fontSize: 11,
    color: '#a6a6a6',
  },
  tableCellBoardName: {
    padding: theme.spacing(0),
    fontFamily: 'NotoSansCJKkr',
    width: '24%',
    fontSize: 11,
    height: 30,
    verticalAlign: 'middle',
  },
  tableCellupVote: {
    padding: theme.spacing(0),
    fontFamily: 'NotoSansCJKkr',
    width: '5%',
    fontSize: 11,
    height: 30,
    verticalAlign: 'middle',
  },
}));

// const StyledTableHeadCellM = withStyles(theme => ({
//   head: {
//     // verticalAlign: 'middle',
//     backgroundColor: '#f2f2f2',
//     color: '#a6a6a6',
//     paddingTop: theme.spacing(1),
//     fontSize: 11,
//     fontFamily: 'NotoSansCJKkr',
//   },
//   body: {
//     // verticalAlign: 'middle',
//   },
// }))(TableCell);

function MemberBoardList({ memberBoard, pageLoad }) {
  const classes = styles();
  const classesm = stylesm();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const { content, pageable } = memberBoard;

  // console.log('memberBoardList check!!!!!!!!!!!!!!!!!!');
  // console.log(memberBoard);

  let tableDisplay;
  let mobileDisplay;

  if (memberBoard) {
    mobileDisplay = (
      <React.Fragment>
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
                    root: classesm.tableCell,
                  }}
                >
                  구분
                </TableCell>
                <TableCell
                  classes={{
                    root: classesm.tableCellBoardName,
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
              {content &&
                content.map(row => (
                  <TableRow key={row.id}>
                    <TableCell
                      // align="center"
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
                        className={classesm.link}
                      >
                        <span className={classesm.titleSpan}>
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
                        root: classesm.tableCell,
                      }}
                    >
                      {row.upVoteCount}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {content.length > 0 && (
            <Pagination
              limit={pageable.pageSize}
              offset={pageable.pageNumber * pageable.pageSize}
              total={memberBoard.totalElements}
              onClick={(e, offset) => pageLoad(offset / pageable.pageSize)}
              innerButtonCount
              className={classes.paging}
            />
          )}
        </div>
      </React.Fragment>
    );
  }

  if (memberBoard) {
    tableDisplay = (
      <React.Fragment>
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
              {content &&
                content.map(row => (
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
                        root: classes.tableCellBoardName,
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
          {content.length > 0 && (
            <Pagination
              limit={pageable.pageSize}
              offset={pageable.pageNumber * pageable.pageSize}
              total={memberBoard.totalElements}
              onClick={(e, offset) => pageLoad(offset / pageable.pageSize)}
              innerButtonCount
              className={classes.paging}
            />
          )}
        </div>
      </React.Fragment>
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
                작성한 글이 없습니다.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  if (matches) {
    return <div>{mobileDisplay}</div>;
  }
  return <div>{tableDisplay}</div>;
}

MemberBoardList.propTypes = {
  memberBoard: PropTypes.any.isRequired,
  pageLoad: PropTypes.func.isRequired,
};

export default memo(MemberBoardList);
