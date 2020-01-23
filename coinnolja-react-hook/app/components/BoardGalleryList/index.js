/**
 *
 * BoardGalleryList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Divider from '@material-ui/core/Divider';
import { FormattedDate } from 'react-intl';
import Pagination from 'material-ui-flat-pagination';
import MemberName from 'components/MemberName';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import BoardMedia from 'components/BoardMedia';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  groot: {
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
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
  nodata: {
    textAlign: 'center',
    paddingBottom: 10,
    paddingTop: 10,
  },

  boardWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingTop: 6,
    // paddingBottom: 6,
    // paddingLeft: 8,
    // paddingRight: 8,
    borderBottom: 'solid 1px #eaeaea',
  },
  boardid: {
    paddingRight: 7,
  },
  boardContent: {
    paddingLeft: 7,
    flex: 1,
  },

  boardTitleWrap: {
    display: 'flex',
    alignItems: 'center',
    // fontWeight: 'bold',
  },
  boardTitle: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '100%',

    display: 'inline-block',
    [theme.breakpoints.down('xs')]: {
      maxWidth: 220,
    },
  },

  username: {
    color: '#a6a6a6',
    fontSize: 12,
    fontWeight: 'bold',
    paddingTop: 2,
  },

  createdAt: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#a6a6a6',
    // marginLeft: 12,
    display: 'flex',
    alignItems: 'center',
  },
  clock: {
    marginRight: 5,
  },
  clockText: {
    paddingTop: 2,
  },
  cover: {
    width: 40,
    height: 40,
    border: 'solid 1px #eaeaea',
    borderRadius: 3,
  },
  userinfo: {
    display: 'flex',
  },
  boardBanner: {
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottom: 'solid 1px #eaeaea',
  },
  commentCountBox: {
    border: 'solid 1px #5a864c',
    borderRadius: 4,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: '0.75em',
    width: 30,
    color: '#5a864c',
    textAlign: 'center',
  },
  topRow: {
    backgroundColor: '#d6e6fc',
    fontWeight: 'bold',
  },
  topId: {
    paddingRight: 10,
    paddingLeft: 10,
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
  tableWrapper: {
    paddingBottom: 20,
  },
  noticeText: {
    fontfamily: 'NotoSansCJKkr',
    fontSize: 20,
    fontWeight: 'bold',
  },
  noticeWrapper: {
    paddingTop: 15,
    paddingBottom: 5,
    paddingLeft: 20,
  },
}));

function BoardGalleryList({ pageLoad, boardList, tops }) {
  const classes = useStyles();
  const { boardMaster, content, pageable } = boardList;
  console.log('did u get tops?');
  console.log(tops);
  return (
    <div className={classes.root}>
      <div className={classes.tableWrapper}>
        <div className={classes.noticeWrapper}>
          <Typography className={classes.noticeText}>공지사항 </Typography>
        </div>
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
                    <Link
                      to={`/board/detail/${row.id}`}
                      className={classes.link}
                    >
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
      <Divider />
      <div className={classes.groot}>
        <Grid container spacing={2}>
          {content &&
            content.length > 0 &&
            content.map(board => (
              <Grid item xs={12} sm={3}>
                <BoardMedia board={board} />
              </Grid>
            ))}
        </Grid>

        {content && content.length > 0 && (
          <Pagination
            limit={pageable.pageSize}
            offset={(pageable.pageIndex - 1) * pageable.pageSize}
            total={pageable.totalCnt}
            onClick={(e, offset) =>
              pageLoad(
                boardMaster ? boardMaster.id : 0,
                offset / pageable.pageSize + 1,
                '',
                '',
              )
            }
            className={classes.paging}
          />
        )}
        {!content && <div className={classes.nodata}>게시글이 없습니다.</div>}
      </div>
    </div>
  );
}

BoardGalleryList.propTypes = {
  pageLoad: PropTypes.func.isRequired,
  boardList: PropTypes.object.isRequired,
  tops: PropTypes.object.isRequired,
};

export default BoardGalleryList;
