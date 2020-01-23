/**
 *
 * MyQnAList
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
import Pagination from 'material-ui-flat-pagination';
import { Link } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// import MainCoinIndex from 'components/MainCoinIndex';

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
    // maxWidth: 298,
    display: 'inline-block',
  },
  tableCellDate: {
    fontFamily: 'NotoSansCJKkr',
    width: '15%',
    fontSize: 14,
    textAlign: 'left',
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
    // width: '17%',
    fontFamily: 'NotoSansCJKkr',
    fontSize: 14,
    // textAlign: 'center',
  },
  tableCellTitle: {
    // width: '50%',
    fontFamily: 'NotoSansCJKkr',
    fontSize: 14,
    textAlign: 'center',
  },
  tableCellDateText: {
    // width: '12%',
    fontFamily: 'NotoSansCJKkr',
    fontSize: 14,
    // textAlign: 'center',
    color: '#a6a6a6',
  },
  tableCellNothing: {
    height: 180,
    fontSize: 14,
  },
  line1: {
    height: 1,
    backgroundColor: '#dedede',
    marginTop: 17,
  },
  tableCellupVote: {
    padding: theme.spacing(0),
    fontFamily: 'NotoSansCJKkr',
    width: '12%',
    fontSize: 14,
    verticalAlign: 'middle',
    textAlign: 'center',
  },
  link: {
    textDecoration: 'none',
    userSelect: 'none',
    color: '#313131',
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

  myPageTitle: {
    fontFamily: 'NotoSansCJKkr',
    width: '100%',
    paddingLeft: 16,
    paddingTop: 8,
    paddingBottom: 8,
    verticalAlign: 'middle',
  },
  myPageTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0,
    color: '#313131',
  },
  line1: {
    height: 1,
    backgroundColor: '#dedede',
    marginBottom: 21,
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
    width: '12%',
    fontSize: 11,
    height: 30,
    verticalAlign: 'middle',
    textAlign: 'center',
  },
}));

export function MyQnAList({ myQnA, pageload }) {
  const classes = styles();
  const classesm = stylesm();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  // console.log('list check');
  // console.log(myQnA);
  // console.log(myQnA.content);

  const { content, pageable } = myQnA;
  // console.log(pageable);

  // if (myQnA) {
  //   content.map(row => console.log(row.title));
  // }

  // const clickHandler = () => {
  //   console.log('check');
  // };

  let pcDisplay;
  let mobileDisplay;

  if (myQnA) {
    mobileDisplay = (
      <div>
        <div className={classesm.line1} />
        <Table>
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
                작성일
              </TableCell>
              <TableCell
                classes={{
                  root: classesm.tableCellBoardName,
                }}
              >
                제목
              </TableCell>
              <TableCell
                classes={{
                  root: classesm.tableCellupVote,
                }}
              >
                답변여부
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {content &&
              content.map(row => (
                <TableRow key={row.id}>
                  <TableCell
                    classes={{
                      root: classesm.tableCellDate,
                    }}
                    align="center"
                  >
                    {format(new Date(row.createdAt), 'yyyy-MM-dd')}
                  </TableCell>
                  <TableCell
                    classes={{
                      root: classesm.tableCellBoardName,
                    }}
                  >
                    <Link to={`/qnadetail/${row.id}`}>{row.title}</Link>
                  </TableCell>
                  <TableCell
                    classes={{
                      root: classesm.tableCellupVote,
                    }}
                  >
                    {row.hasAnswer === 0 ? '대기중' : '완료'}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div align="center">
          {content && content.length > 0 && (
            <Pagination
              textAlign="center"
              limit={pageable.pageSize}
              offset={pageable.pageNumber * pageable.pageSize}
              total={myQnA.totalElements}
              onClick={(e, offset) => pageload(offset / pageable.pageSize)}
              className={classes.paging}
            />
          )}
        </div>
      </div>
    );
  } else {
    mobileDisplay = (
      <div>
        <div className={classesm.line1} />
        <Table>
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
                작성일
              </TableCell>
              <TableCell
                classes={{
                  root: classesm.tableCellBoardName,
                }}
              >
                제목
              </TableCell>
              <TableCell
                classes={{
                  root: classesm.tableCellupVote,
                }}
              >
                답변여부
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                colSpan="3"
                align="center"
                classes={{
                  root: classesm.tableCellNothing,
                }}
              >
                작성한 문의가 없습니다.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  if (myQnA) {
    pcDisplay = (
      <div>
        <div className={classes.line1} />
        <Table>
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
                작성일
              </TableCell>
              <TableCell
                classes={{
                  root: classes.tableCellBoardName,
                }}
              >
                제목
              </TableCell>
              <TableCell
                classes={{
                  root: classes.tableCellupVote,
                }}
              >
                답변여부
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {content &&
              content.map(row => (
                <TableRow key={row.id}>
                  <TableCell
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
                    <Link to={`/qnadetail/${row.id}`} className={classes.link}>
                      {row.title}
                    </Link>
                  </TableCell>
                  <TableCell
                    classes={{
                      root: classes.tableCellupVote,
                    }}
                  >
                    {row.hasAnswer === 0 ? '대기중' : '완료'}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div align="center">
          {content && content.length > 0 && (
            <Pagination
              textAlign="center"
              limit={pageable.pageSize}
              offset={pageable.pageNumber * pageable.pageSize}
              total={myQnA.totalElements}
              onClick={(e, offset) => pageload(offset / pageable.pageSize)}
              className={classes.paging}
            />
          )}
        </div>
      </div>
    );
  } else {
    pcDisplay = (
      <div>
        <Table>
          <TableHead
            classes={{
              root: classes.tableHead,
            }}
          >
            <TableRow>
              <TableCell
                align="center"
                classes={{
                  root: classes.tableCell,
                }}
              >
                작성일
              </TableCell>
              <TableCell
                classes={{
                  root: classes.tableCellBoardName,
                }}
              >
                제목
              </TableCell>
              <TableCell
                align="right"
                classes={{
                  root: classes.tableCell,
                }}
              >
                답변여부
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                colSpan="3"
                align="center"
                classes={{
                  root: classes.tableCellNothing,
                }}
              >
                작성한 문의가 없습니다.
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
  return <div>{pcDisplay}</div>;
}

MyQnAList.propTypes = {
  myQnA: PropTypes.any.isRequired,
  pageload: PropTypes.func.isRequired,
};

export default memo(MyQnAList);
