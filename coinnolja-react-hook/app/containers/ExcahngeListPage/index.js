/**
 *
 * ExcahngeListPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import NoticeLine from 'components/NoticeLine';
import TopBanner from 'components/TopBanner';
import MainCoinIndex from 'components/MainCoinIndex';
import MenuIcon from '@material-ui/icons/Menu';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import makeSelectExcahngeListPage from './selectors';
import reducer from './reducer';
import saga from './saga';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f1f1f1',
    paddingTop: theme.spacing(0),
  },
  notice: {
    backgroundColor: '#ffffff',
    marginBottom: 14,
  },
  contentWrap: {
    backgroundColor: '#ffffff',
    border: 'solid 1px #dedede',
    paddingBottom: 6,
    marginBottom: 14,
  },
  contentTop: {
    backgroundColor: '#ffffff',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottom: 'solid 1px #dedede',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 16,
      paddingBottom: 14,
    },
  },
  menuIcon: {
    maxWidth: 30,
    maxHeight: 30,
    width: '100%',
    height: '100%',
    marginRight: 12,
  },
  listWrap: {
    display: 'flex',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    border: 'solid 1px #dedede',
  },
  contentTable: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  listLink: {
    paddingLeft: 20,
  },
}));
export function ExcahngeListPage({ match }) {
  useInjectReducer({ key: 'excahngeListPage', reducer });
  useInjectSaga({ key: 'excahngeListPage', saga });
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  // console.log(match.params.type);
  return (
    <div className={classes.root}>
      <MainCoinIndex />
      {!matches && (
        <div className={classes.topBanner}>
          <TopBanner />
        </div>
      )}
      {!matches && <NoticeLine />}
      <div className={classes.contentWrap}>
        <div className={classes.contentTop}>
          <span className={classes.boardTitle}>
            {!matches && <MenuIcon className={classes.menuIcon} />}
            <span>목록</span>
          </span>
        </div>
        <div className={classes.contentTable}>
          <Table className={classes.table}>
            <colgroup>
              <col width="10%" />
              <col width="20%" />
              <col width="70%" />
            </colgroup>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell className={classes.tableColHead} size="small">
                  번호
                </TableCell>
                <TableCell
                  className={classes.tableColHead}
                  align="left"
                  component="th"
                  scope="row"
                  size="medium"
                >
                  이름
                </TableCell>
                <TableCell className={classes.tableColHead} align="left">
                  링크
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list[match.params.type - 1].map((row, idx) => (
                <TableRow key={row.title} hover>
                  <TableCell className={classes.tableColBody} size="small">
                    {idx + 1}
                  </TableCell>
                  <TableCell
                    className={classes.tableColBody}
                    align="left"
                    component="th"
                    scope="row"
                    size="medium"
                  >
                    {row.title}
                  </TableCell>
                  <TableCell className={classes.tableColBody} align="left">
                    <a href={row.link} target="_blank">
                      {row.link}
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

ExcahngeListPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  excahngeListPage: makeSelectExcahngeListPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ExcahngeListPage);
const list = [
  [
    { title: '빗썸', menuId: 0, link: 'https://www.bithumb.com/' },
    { title: '업비트', menuId: 0, link: 'https://www.upbit.com/' },
    { title: '코인원', menuId: 0, link: 'https://coinone.co.kr/' },
    { title: '코빗', menuId: 0, link: 'https://www.korbit.co.kr/' },
    {
      title: '코인네스트',
      menuId: 0,
      link: 'https://www.coinnest.co.kr/',
    },
    {
      title: '후오비코리아',
      menuId: 0,
      link: 'https://www.huobi.co.kr/ko-KR/',
    },
    {
      title: '오케이코인코리아',
      menuId: 0,
      link: 'https://okcoinkr.com/',
    },
    {
      title: '코인제스트',
      menuId: 0,
      link: 'https://www.coinzest.co.kr/',
    },
    { title: '비트젯', menuId: 0, link: 'https://www.bitzet.co.kr/' },
    {
      title: '캐셔레스트',
      menuId: 0,
      link: 'https://www.cashierest.com/',
    },
    { title: '코인이즈', menuId: 0, link: 'https://www.coinis.co.kr/' },
    { title: '바이맥스', menuId: 0, link: 'https://www.bimax.io/' },
    { title: '네임빗', menuId: 0, link: 'https://new.namebit.co.kr/' },
    { title: '코인빗', menuId: 0, link: 'https://www.coinbit.co.kr/' },
    { title: '뉴비트', menuId: 0, link: 'http://newbitkorea.com/' },
    { title: '알트메카', menuId: 0, link: 'https://www.altmeca.com/' },
    { title: '에스빗', menuId: 0, link: 'https://s-bit.co.kr/' },
    { title: '케이덱스', menuId: 0, link: 'https://kdex.io/' },
    { title: '나인빗', menuId: 0, link: 'https://ninebit.io/' },
  ],
  [
    { title: '바이낸스', menuId: 0, link: 'https://www.binance.com/' },
    {
      title: '비트파이넥스',
      menuId: 0,
      link: 'https://www.bitfinex.com/',
    },
    { title: '비트플라이어', menuId: 0, link: 'https://bitflyer.jp/ko/' },
    { title: '비트렉스', menuId: 0, link: 'https://bittrex.com/' },
    { title: '폴로닉스', menuId: 0, link: 'https://poloniex.com/' },
    { title: '오케이코인', menuId: 0, link: 'https://www.okcoin.cn/' },
    { title: '비둘기지갑', menuId: 0, link: 'https://dovewallet.com/' },
    { title: 'CHBTC', menuId: 0, link: 'https://www.chbtc.com/' },
    { title: '크라켄', menuId: 0, link: 'https://www.kraken.com/' },
    { title: 'GDAX', menuId: 0, link: 'https://www.gdax.com/' },
    { title: '후오비', menuId: 0, link: 'https://www.huobi.com/' },
    { title: '비트스탬프', menuId: 0, link: 'https://www.bitstamp.net/' },
    { title: '빗컴', menuId: 0, link: 'http://bitcom.com/' },
  ],
  [
    { title: '코인마켓캡', menuId: 0, link: 'http://coinmarketcap.com/' },
    {
      title: '크립토워치',
      menuId: 0,
      link: 'https://cryptowat.ch/',
    },
    {
      title: '비트코인위즈덤',
      menuId: 0,
      link: 'https://bitcoinwisdom.com/',
    },
    {
      title: '프로차트',
      menuId: 0,
      link: 'https://coinone.co.kr/chart/',
    },
    { title: 'Luka7', menuId: 0, link: 'http://luka7.net/' },
    { title: '와이즈바디', menuId: 0, link: 'http://wisebody.co.kr' },
  ],
];
