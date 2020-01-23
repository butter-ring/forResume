/* eslint-disable indent */
/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
/**
 *
 * CoinIndexTable
 *
 */

import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// import axios from 'axios';
import classNames from 'classnames';
import { FormattedNumber } from 'react-intl';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import LinearProgress from '@material-ui/core/LinearProgress';
import request from 'utils/request';

import CoinoneIcon from '../../images/icon/coinone-2@3x.png';
import KobitIcon from '../../images/icon/kobit-icon.png';
import BitfinexIcon from '../../images/icon/bitfinex-1.png';
import BitflyerIcon from '../../images/icon/bitflyer.png';

import PoloniexIcon from '../../images/icon/poloniex.png';
import BittrexIcon from '../../images/icon/bittrex.png';
import OkcoinIcon from '../../images/icon/okcoin.png';
import HuobiIcon from '../../images/icon/huobi.png';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    fontFamily: 'NotoSansCJKkr',
  },
  exchangeLogo: {
    marginRight: theme.spacing(1),
    objectFit: 'contain',
    maxWidth: 20,
    maxHeight: 20,
  },
  table: {
    border: 'solid 1px #dedede',
  },
  tableHead: {
    height: 40,
    maxHeight: 40,
    backgroundColor: '#f8f8f8',
  },
  tableCell: {
    borderTop: 'solid 1px #dedede',
    fontFamily: 'NotoSansCJKkr',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0,
    color: '#a6a6a6',
    paddingTop: 11,
    paddingBottom: 11,

    // border: 'none',
  },
  tableCellBody: {
    fontSize: 14,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottom: 'none',
    color: '#4d4d4d',
  },

  tableRow: {
    // borderBottom: 'none',
    borderBottom: '1px solid #eaeaea',
    '&:before': {
      // content: `''`,
      position: 'absolute',
      right: 0,
      top: 0,
      height: 1,
      width: '70%',
      display: 'block',
      borderBottom: '1px solid magenta',
      // marginTop:1.2em; /*move the border below the text*/
    },
  },

  tableBody: {
    // paddingLeft: 10,
    // paddingRight: 10,
  },
  exchangeNameSpan: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  currencyKrw: {
    marginLeft: 5,
    color: '#a6a6a6',
  },
  currencyUsd: {
    marginLeft: 5,
  },
  currencyRate: {
    fontWeight: 'bold',
  },
  currencyMinus: {
    // color: '#1b94f6',
    color: '#ea4444',
  },
  currencyPlus: {
    // color: '#ea4444',
    color: '#2b8f28',
  },
}));

const useStylesm = makeStyles(theme => ({
  root: {
    borderTop: '1px solid #eaeaea',
  },
  tableCell: {
    fontSize: 10,
    padding: theme.spacing(0),
  },
  exchangeLogo: {
    marginRight: theme.spacing(0.5),
    objectFit: 'contain',
    maxWidth: 10,
    maxHeight: 10,
  },
  exchangeNameSpan: {
    fontSize: 11,
  },
  tableCellBody: {
    padding: 0,
    fontSize: 11,
    backgroundColor: '#ffffff',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 10,
    paddingBottom: 8,
  },
  rateText: {
    marginLeft: 3,
    fontSize: 8,
    color: '#fb1e0c',
  },
  rateGapText: {
    marginLeft: 3,
    fontSize: 8,
    color: '#2b8f28',
  },
  valueText: {
    color: '#fb1e0c',
  },
  minusText: {
    color: '#0c84ed',
  },
  minusRateText: {
    color: '#0c84ed',
    marginLeft: 3,
    fontSize: 8,
  },
  minusRateGapText: {
    color: '#ea4444',
    marginLeft: 3,
    fontSize: 8,
  },
}));

function CoinIndexTable({ symbol }) {
  const classes = useStyles();
  const classesm = useStylesm();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const [data, setData] = useState({ coinIndexes: [] });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const options = {
        method: 'GET',
        auth: true,
      };
      const result = await request(`/api/coinindex/${symbol}`, options);
      // const result = await axios(
      //   `${process.env.API_URL}/api/coinindex/${symbol}`,
      // );

      // console.log(result);
      setData(result.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (matches) {
    return (
      <div className={classesm.root}>
        {isLoading && <LinearProgress />}
        <Table className={classesm.table}>
          <TableHead
            // className={classes.tableHead}
            classes={{
              root: classesm.tableHead, // class name, e.g. `classes-nesting-root-x`
              // label: classes.label, // class name, e.g. `classes-nesting-label-x`
            }}
            // component="div"
          >
            <TableRow>
              <TableCell
                align="center"
                classes={{
                  root: classesm.tableCell,
                }}
              >
                거래소
              </TableCell>
              <TableCell
                align="center"
                classes={{
                  root: classesm.tableCell,
                }}
              >
                시세(KRW)
              </TableCell>

              <TableCell
                align="center"
                classes={{
                  root: classesm.tableCell,
                }}
              >
                24시간 변동률
              </TableCell>
              <TableCell
                align="center"
                classes={{
                  root: classesm.tableCell,
                }}
              >
                프리미엄(KRW)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            classes={{
              root: classes.tableBody,
            }}
          >
            {data.coinIndexes.map(row => (
              <TableRow
                key={row.exchangeName}
                classes={{
                  root: classesm.tableRow,
                }}
              >
                <TableCell
                  align="left"
                  scope="row"
                  classes={{
                    root: classesm.tableCellBody,
                  }}
                >
                  <ExchangeLogo
                    exchangeName={row.exchangeName}
                    // className={classesm.exchangeLogo}
                  />
                  <span className={classesm.exchangeNameSpan}>
                    <ExchangeName exchangeName={row.exchangeName} />
                  </span>
                </TableCell>

                <TableCell
                  align="center"
                  classes={{
                    root: classesm.tableCellBody,
                  }}
                >
                  <FormattedNumber value={row.priceKrw} />
                  {/* <span className={classes.currencyKrw}>KRW</span> */}
                </TableCell>

                <TableCell
                  align="center"
                  classes={{
                    root: classesm.tableCellBody,
                  }}
                >
                  <span
                    className={
                      row.variationValueForDay > 0
                        ? classesm.valueText
                        : row.variationValueForDay < 0
                        ? classesm.minusText
                        : classesm.nomalText
                    }
                  >
                    {row.variationValueForDay > 0 && `▲ +`}
                    {row.variationValueForDay < 0 && `▼`}
                    {row.variationValueForDay !== 0 ? (
                      <FormattedNumber value={row.variationValueForDay} />
                    ) : (
                      `-`
                    )}
                  </span>
                  {row.variationRateForDay !== 0 && (
                    <span
                      className={
                        row.variationRateForDay > 0
                          ? classesm.rateText
                          : row.variationRateForDay < 0
                          ? classesm.minusRateText
                          : classesm.nomalText
                      }
                    >
                      {row.variationRateForDay > 0 && `+`}
                      <FormattedNumber value={row.variationRateForDay} />%
                    </span>
                  )}
                </TableCell>
                <TableCell
                  align="center"
                  classes={{
                    root: classNames(
                      classesm.tableCellBody,
                      classes.currencyRate,
                      row.gapKrw < 0
                        ? classes.currencyMinus
                        : classes.currencyPlus,
                    ),
                  }}
                >
                  {row.gapKrw !== 0 ? (
                    <span>
                      {row.gapKrw < 0 ? `` : row.gapKrw > 0 ? `+` : ``}
                      <FormattedNumber value={row.gapKrwRate} />%
                    </span>
                  ) : (
                    <span>-</span>
                  )}
                  {/* {row.gapKrw < 0 ? `-` : row.gapKrw > 0 ? `+` : ``} */}
                  {/* <FormattedNumber value={row.gapKrw} /> */}
                  {/* <FormattedNumber value={row.gapKrwRate} />% */}
                  {/* <span className={classes.currencyUsd}>KRW</span> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {isLoading && <LinearProgress />}
      <Table className={classes.table}>
        <TableHead
          // className={classes.tableHead}
          classes={{
            root: classes.tableHead, // class name, e.g. `classes-nesting-root-x`
            // label: classes.label, // class name, e.g. `classes-nesting-label-x`
          }}
          // component="div"
        >
          <TableRow>
            <TableCell
              align="center"
              classes={{
                root: classes.tableCell,
              }}
            >
              거래소
            </TableCell>
            <TableCell
              align="center"
              classes={{
                root: classes.tableCell,
              }}
            >
              시세(KRW)
            </TableCell>
            <TableCell
              align="center"
              classes={{
                root: classes.tableCell,
              }}
            >
              시세(USD)
            </TableCell>
            <TableCell
              align="center"
              classes={{
                root: classes.tableCell,
              }}
            >
              24시간 변동률
            </TableCell>
            <TableCell
              align="center"
              classes={{
                root: classes.tableCell,
              }}
            >
              한국프리미엄
            </TableCell>
            <TableCell
              align="center"
              classes={{
                root: classes.tableCell,
              }}
            >
              거래량
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          classes={{
            root: classes.tableBody,
          }}
        >
          {data.coinIndexes.map(row => (
            <TableRow
              key={row.exchangeName}
              classes={{
                root: classes.tableRow,
              }}
            >
              <TableCell
                align="left"
                scope="row"
                classes={{
                  root: classes.tableCellBody,
                }}
              >
                <ExchangeLogo exchangeName={row.exchangeName} />
                <span className={classes.exchangeNameSpan}>
                  <ExchangeName exchangeName={row.exchangeName} />
                </span>
              </TableCell>

              <TableCell
                align="center"
                classes={{
                  root: classes.tableCellBody,
                }}
              >
                <FormattedNumber value={row.priceKrw} />
                <span className={classes.currencyKrw}>KRW</span>
              </TableCell>
              <TableCell
                align="center"
                classes={{
                  root: classes.tableCellBody,
                }}
              >
                <FormattedNumber value={row.priceUsd} />
                <span className={classes.currencyUsd}>USD</span>
              </TableCell>
              <TableCell
                align="center"
                classes={{
                  root: classes.tableCellBody,
                }}
              >
                {/* <span>
                  <FormattedNumber value={row.variationRateForDay} />%
                </span> */}
                <span
                  className={
                    row.variationValueForDay > 0
                      ? classesm.valueText
                      : row.variationValueForDay < 0
                      ? classesm.minusText
                      : classesm.nomalText
                  }
                >
                  {row.variationValueForDay > 0 && `▲ +`}
                  {row.variationValueForDay < 0 && `▼`}
                  {row.variationValueForDay !== 0 ? (
                    <FormattedNumber value={row.variationValueForDay} />
                  ) : (
                    `-`
                  )}
                </span>
                {row.variationRateForDay !== 0 && (
                  <span
                    className={
                      row.variationRateForDay > 0
                        ? classesm.rateText
                        : row.variationRateForDay < 0
                        ? classesm.minusRateText
                        : classesm.nomalText
                    }
                  >
                    {row.variationRateForDay > 0 && `+`}
                    <FormattedNumber value={row.variationRateForDay} />%
                  </span>
                )}
              </TableCell>
              <TableCell
                align="center"
                classes={{
                  root: classNames(
                    classes.tableCellBody,
                    classes.currencyRate,
                    row.gapKrw < 0
                      ? classes.currencyMinus
                      : classes.currencyPlus,
                  ),
                }}
              >
                {row.gapKrw !== 0 ? (
                  <span>
                    {row.gapKrw < 0 ? `` : row.gapKrw > 0 ? `+` : ``}
                    <FormattedNumber value={row.gapKrw} />

                    {row.gapKrw !== 0 ? (
                      <span
                        className={
                          row.gapKrw > 0
                            ? classesm.rateGapText
                            : row.gapKrw < 0
                            ? classesm.minusRateGapText
                            : classesm.nomalText
                        }
                      >
                        {row.gapKrw < 0 ? `` : row.gapKrw > 0 ? `+` : ``}
                        <FormattedNumber value={row.gapKrwRate} />%
                      </span>
                    ) : (
                      <span>-</span>
                    )}
                    {/* <FormattedNumber value={row.gapKrwRate} /> */}
                  </span>
                ) : (
                  <span>-</span>
                )}

                {/* </span> */}
              </TableCell>
              <TableCell
                align="right"
                classes={{
                  root: classes.tableCellBody,
                }}
              >
                <FormattedNumber value={row.totalExcangeForDay} />
                <span className={classes.currencyUsd}>{symbol}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

CoinIndexTable.propTypes = {
  symbol: PropTypes.string.isRequired,
};

export default memo(CoinIndexTable);

function ExchangeName(props) {
  switch (props.exchangeName) {
    case 'upbit':
      return '업비트';
    case 'bithumb':
      return '빗썸';
    case 'coinone':
      return '코인원';
    case 'kobit':
      return '코빗';
    case 'bitfinex':
      return '비피넥스';
    case 'binance':
      return '바이낸스';
    case 'bitflyer':
      return '플라이어';
    case 'poloniex':
      return '폴로닉스';
    case 'bittrex':
      return '비트렉스';
    case 'okcoin':
      return '오케이코인';
    case 'huobi':
      return '후오비';
    case 'coinnest':
      return '코인네스트';
    case 'coinzest':
      return '코인제스트';

    default:
      return null;
  }
}

ExchangeName.propTypes = {
  exchangeName: PropTypes.string.isRequired,
};

function ExchangeLogo(props) {
  const classes = useStyles();
  const classesm = useStylesm();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  switch (props.exchangeName) {
    case 'upbit':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          className={matches ? classesm.exchangeLogo : classes.exchangeLogo}
        >
          <g fill="none" fillRule="nonzero">
            <circle cx="9.994" cy="9.994" r="9.994" fill="#093687" />
            <path
              fill="#FFF"
              d="M9.384 13.576l1.783-5.416.859.28-.614-2.028h5.307c.963 0 1.464.86 1.118 1.918L17.5 9.353l-.015.04-.014.038c-.093.252-.22.489-.38.705-.506.686-1.274 1.132-1.96 1.136H12.47l-.756 2.303-2.329.001zm3.478-3.5h1.413c.354 0 .745-.316.872-.705l.348-1.056c.127-.39-.057-.705-.41-.705h-1.414l-.81 2.466zm-9.597 3.5a1.612 1.612 0 0 1-.473-.089 1.052 1.052 0 0 1-.479-.326 1.184 1.184 0 0 1-.178-.322 1.36 1.36 0 0 1-.054-.18c-.068-.31-.04-.622.046-.926l.042-.14 1.703-5.18H6.22L4.49 11.675c-.094.287-.021.543.185.652a.428.428 0 0 0 .217.052h1.16l1.96-5.966h2.654L8.722 8.44l1.05-.28-1.783 5.416H3.265z"
            />
          </g>
        </svg>
      );
    case 'bithumb':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="22"
          viewBox="0 0 17 22"
          className={matches ? classesm.exchangeLogo : classes.exchangeLogo}
        >
          <defs>
            <linearGradient
              id="a"
              x1="92.068%"
              x2="24.005%"
              y1="109.261%"
              y2="23.186%"
            >
              <stop offset="41%" stopColor="#F47320" />
              <stop offset="50%" stopColor="#F16D21" />
              <stop offset="62%" stopColor="#E95C22" />
              <stop offset="75%" stopColor="#DC4125" />
              <stop offset="81%" stopColor="#D53127" />
            </linearGradient>
          </defs>
          <g fill="none" fillRule="nonzero">
            <path
              fill="#D53127"
              d="M1.197 5.234h3.15l-2.45 5.95s-1.28-.02-1.671-1.132a1.754 1.754 0 0 1-.027-1.02l.998-3.798z"
            />
            <path
              fill="#F47320"
              d="M13.416 5.362l-4.006-.07.901-2.952a1.8 1.8 0 0 0-.277-1.604A1.828 1.828 0 0 0 8.572 0H4.916L.736 14.909s-1.498 6.376 4.18 6.953c0 0 8.977 1.822 11.857-8.948 0 0 1.52-6.515-3.357-7.552zm-2.738 7.394s-.16 2.75-2.25 3.233a1.363 1.363 0 0 1-.922-.094c-.327-.166-.666-.51-.657-1.232.005-.21.039-.416.1-.616l.772-2.863h2.107s.954.309.85 1.572z"
            />
            <path
              fill="url(#a)"
              d="M16.965 9.911c-.383-4.376-3.549-4.55-3.549-4.55L9.41 5.293 7.689 11.22H9.79c.386.02 1.09.653.861 1.772"
            />
          </g>
        </svg>
      );
    case 'coinone':
      return (
        <img
          src={CoinoneIcon}
          className={matches ? classesm.exchangeLogo : classes.exchangeLogo}
          alt="coinoneicon"
        />
      );
    case 'kobit':
      return (
        <img
          src={KobitIcon}
          className={matches ? classesm.exchangeLogo : classes.exchangeLogo}
          alt="kobiticon"
        />
      );
    case 'bitfinex':
      return (
        <img
          src={BitfinexIcon}
          className={matches ? classesm.exchangeLogo : classes.exchangeLogo}
          alt="bitfinexIcon"
        />
      );
    case 'binance':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          className={matches ? classesm.exchangeLogo : classes.exchangeLogo}
        >
          <g fill="#F3BA2F" fillRule="nonzero">
            <path d="M6.1 8.378l3.872-3.87 3.874 3.873 2.252-2.253L9.972 0 3.846 6.126zM0 9.97l2.252-2.253L4.506 9.97l-2.254 2.252zM6.1 11.56l3.872 3.873 3.874-3.874 2.253 2.25-6.126 6.128-6.127-6.123zM15.433 9.97l2.252-2.253 2.254 2.252-2.254 2.255z" />
            <path d="M12.257 9.969L9.972 7.682l-1.69 1.69-.195.193-.4.4 2.285 2.284 2.285-2.279z" />
          </g>
        </svg>
      );
    case 'bitflyer':
      return (
        <img
          src={BitflyerIcon}
          className={matches ? classesm.exchangeLogo : classes.exchangeLogo}
          alt="bitfinexIcon"
        />
      );

    case 'poloniex':
      return (
        <img
          src={PoloniexIcon}
          className={matches ? classesm.exchangeLogo : classes.exchangeLogo}
          alt="bitfinexIcon"
        />
      );
    case 'bittrex':
      return (
        <img
          src={BittrexIcon}
          className={matches ? classesm.exchangeLogo : classes.exchangeLogo}
          alt="bitfinexIcon"
        />
      );
    case 'okcoin':
      return (
        <img
          src={OkcoinIcon}
          className={matches ? classesm.exchangeLogo : classes.exchangeLogo}
          alt="bitfinexIcon"
        />
      );
    case 'huobi':
      return (
        <img
          src={HuobiIcon}
          className={matches ? classesm.exchangeLogo : classes.exchangeLogo}
          alt="bitfinexIcon"
        />
      );
    default:
      return null;
  }
}

ExchangeLogo.propTypes = {
  exchangeName: PropTypes.string.isRequired,
};
