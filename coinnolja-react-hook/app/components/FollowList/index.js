/**
 *
 * FollowList
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
import MemberName from 'components/MemberName';
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
    // verticalAlign: 'middle',
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
}));

function FollowList({ pageload, followlist }) {
  const classes = styles();
  const classesm = stylesm();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  let mobileTableDisplay;
  if (followlist) {
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
                친구
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {followlist.content &&
              followlist.content.map(row => (
                <TableRow key={row.id}>
                  <TableCell align="center">
                    {row.targetMember && (
                      <MemberName member={row.targetMember} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            {!followlist.content.length > 0 && (
              <TableRow>
                <StyledTableHeadCell
                  colSpan="4"
                  align="center"
                  height="130"
                  fontSize="14"
                >
                  등록된 친구가 없습니다.
                </StyledTableHeadCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {followlist.content.length > 0 && (
          <Pagination
            align="center"
            limit={followlist.pageable.pageSize}
            offset={followlist.pageable.offset}
            total={followlist.totalElements}
            onClick={(e, offset) =>
              pageload(offset / followlist.pageable.pageSize + 1)
            }
            innerButtonCount
          />
        )}
      </div>
    );
  }
  let tableDisplay;

  if (followlist) {
    tableDisplay = (
      <div className={classes.tableWrapper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableHeadCell width="130" align="center">
                친구
              </StyledTableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {followlist.content &&
              followlist.content.map(row => (
                <TableRow key={row.id} align="center">
                  <TableCell align="center">
                    {row.targetMember && (
                      <MemberName member={row.targetMember} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            {!followlist.content.length > 0 && (
              <TableRow>
                <StyledTableHeadCell
                  colSpan="4"
                  align="center"
                  height="150"
                  fontSize="14"
                >
                  등록된 친구가 없습니다.
                </StyledTableHeadCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {followlist.content.length > 0 && (
          <Pagination
            align="center"
            limit={followlist.pageable.pageSize}
            offset={followlist.pageable.offset}
            total={followlist.totalElements}
            onClick={(e, offset) =>
              pageload(offset / followlist.pageable.pageSize + 1)
            }
            innerButtonCount
          />
        )}
      </div>
    );
  }

  if (matches) {
    return <div>{mobileTableDisplay}</div>;
  }
  return <div>{tableDisplay}</div>;
}

FollowList.propTypes = {
  pageload: PropTypes.func.isRequired,
  followlist: PropTypes.any.isRequired,
};

export default FollowList;
