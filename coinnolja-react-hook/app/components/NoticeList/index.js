/**
 *
 * NoticeList
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { makeStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { FormattedDate } from 'react-intl';
import MemberName from 'components/MemberName';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(0),
  },
  tableHead: {
    backgroundColor: '#f2f2f2',
    borderBottom: 'solid 1px #dedede',
    fontfamily: 'NotoSansCJKkr',
    fontSize: 13,
    fontWeight: 'normal',
    color: '#a6a6a6',
  },
  tableColHead: {
    color: '#a6a6a6',
    fontSize: 13,
    paddingTop: 10,
    paddingBottom: 10,
  },
  tableColBody: {
    color: '#313131',
    fontSize: 14,
    paddingTop: 10,
    paddingBottom: 10,
  },
  svgAnyone: {
    marginRight: 8,
  },
  svgNew: {
    marginLeft: 8,
  },
  link: {
    textDecoration: 'none',
    userSelect: 'none',
    color: '#313131',
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  paging: {
    padding: 15,
    textAlign: 'center',
  },
  titleSpan: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    maxWidth: 298,
    display: 'inline-block',
  },
  replySpan: {
    color: '#3b69c1',
    marginLeft: 10,
  },
  topRow: {
    backgroundColor: '#d6e6fc',
    fontWeight: 'bold',
  },
  selectRoot: {
    padding: 0,
  },
  selectMenu: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 20,
    fontSize: 14,
  },
  searchInput: {
    // border: 'solid 1px rgba(224, 224, 224, 1)',
    paddingTop: 4,
    paddingBottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 5,
  },
  searchInputWrap: {
    border: 'solid 1px rgba(224, 224, 224, 1)',
    height: 39,
    display: 'flex',
    alignItems: 'center',
    // marginRight: 10,
  },
  boardSearchWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boardSearch: {
    display: 'flex',
    alignItems: 'center',
  },
  iconButton: {
    padding: 1,
  },
  formControl: {
    marginRight: 6,
  },
}));

function NoticeList({ tops }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Table className={classes.table}>
        <colgroup>
          <col width="9%" />
          <col width="51%" />
          <col width="20%" />
          <col width="10%" />
          <col width="10%" />
        </colgroup>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell
              align="center"
              className={classes.tableColHead}
              size="small"
            >
              번호
            </TableCell>
            <TableCell
              className={classes.tableColHead}
              align="left"
              component="th"
              scope="row"
              size="medium"
            >
              제목
            </TableCell>
            <TableCell className={classes.tableColHead} align="left">
              글쓴이
            </TableCell>
            <TableCell className={classes.tableColHead} size="small">
              작성일
            </TableCell>
            <TableCell className={classes.tableColHead} size="small">
              추천
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tops &&
            tops.content &&
            tops.content.length > 0 &&
            tops.content.map(row => (
              <TableRow key={row.id} hover>
                <TableCell
                  align="center"
                  className={classNames(classes.tableColBody, classes.topRow)}
                  size="small"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                  >
                    <path
                      fill="#F05C5C"
                      fillRule="evenodd"
                      d="M11 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm0 7H9V6h2v5zm9-9v9.893a2 2 0 0 1-2 2h-1.333V18l-5.834-4.107H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"
                    />
                  </svg>
                </TableCell>
                <TableCell
                  className={classNames(classes.tableColBody, classes.topRow)}
                  align="left"
                  component="th"
                  scope="row"
                  size="medium"
                >
                  <Link to={`/board/detail/${row.id}`} className={classes.link}>
                    <span className={classes.titleSpan}>{row.title}</span>
                    <span className={classes.replySpan}>
                      [{row.commentCount}]
                    </span>
                  </Link>

                  {row.new && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      className={classes.svgNew}
                    >
                      <path
                        fill="#F05C5C"
                        fillRule="evenodd"
                        d="M2 0h17a2 2 0 0 1 2 2v17a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm4 16h1.673v-5.186c0-1.196-.137-2.466-.228-3.602h.076l1.171 2.302L12.404 16h1.81V5h-1.673v5.126c0 1.196.137 2.526.228 3.662h-.076l-1.171-2.331L7.81 5H6v11z"
                      />
                    </svg>
                  )}
                </TableCell>
                <TableCell
                  className={classNames(classes.tableColBody, classes.topRow)}
                  align="left"
                >
                  {row.member && <MemberName member={row.member} />}
                </TableCell>
                <TableCell
                  className={classNames(classes.tableColBody, classes.topRow)}
                  size="small"
                >
                  <FormattedDate
                    value={new Date(row.createdAt)}
                    month="2-digit"
                    day="2-digit"
                  />
                </TableCell>
                <TableCell
                  className={classNames(classes.tableColBody, classes.topRow)}
                  size="small"
                >
                  {row.upVoteCount}/{row.downVoteCount}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

NoticeList.propTypes = {
  tops: PropTypes.object.isRequired,
};

export default memo(NoticeList);
