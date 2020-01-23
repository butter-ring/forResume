/**
 *
 * CoinMarkets
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import numeral from 'numeral';
// import styled from 'styled-components';

const useStyles = makeStyles(theme => ({
  root: {
    // width: '100%',
    marginTop: theme.spacing(3),
    // overflowX: 'auto',
    // flexGrow: 1,
    backgroundColor: '#171b23',
    display: 'flex',
  },
  table: {
    minWidth: 650,
    backgroundColor: '#1d212b',
    // color: '#ffffff',
    width: 1300,
    // border: '1px solid #212529',
    // borderBlockColor: '#212529',
    borderColor: '#212529',
    // borderInlineColor: '#212529',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  img: {
    width: 30,
    height: 30,
  },
  appBar: {
    backgroundColor: '#171b23',
    // width: '30%',
  },
  tablerow: {
    backgroundColor: '#1d212b',
    borderColor: '#171b23',
  },
  tableHead: {
    fontFamily: 'NotoSansCJKkr',
    // color: '#6d717a',
    backgroundColor: '#242936',
    height: 40,
    borderColor: '#171b23',
  },
  tableCellHead: {
    fontFamily: 'NotoSansCJKkr',
    color: '#6d717a',
    fontWeight: 'bold',
    textAlign: 'right',
    fontSize: 14,
    borderColor: '#171b23',
  },
  tableCellBody: {
    fontFamily: 'NotoSansCJKkr',
    textAlign: 'right',
    borderColor: '#171b23',
    color: '#e2e3e4',
    fontSize: 14,
  },
  tableCellHeadName: {
    fontFamily: 'NotoSansCJKkr',
    color: '#6d717a',
    fontWeight: 'bold',
    textAlign: 'left',
    borderColor: '#171b23',
    fontSize: 14,
    // padding: 20,
  },
  tableCellHeadNameRank: {
    fontFamily: 'NotoSansCJKkr',
    color: '#6d717a',
    fontWeight: 'bold',
    textAlign: 'center',
    borderColor: '#171b23',
    fontSize: 14,
    // padding: 20,
  },
  tableCellBodyName: {
    fontFamily: 'NotoSansCJKkr',
    // color: '#2c2c2c',
    // fontWeight: 700,
    // padding: 20,
    textAlign: 'left',
    borderColor: '#171b23',
    color: '#e2e3e4',
    fontSize: 14,
  },
  tableCellBodyMinus: {
    fontFamily: 'NotoSansCJKkr',
    textAlign: 'right',
    borderColor: '#171b23',
    color: '#f25430',
    fontSize: 14,
  },
  tableCellBodyPlus: {
    fontFamily: 'NotoSansCJKkr',
    textAlign: 'right',
    borderColor: '#171b23',
    color: '#3dcc88',
    fontSize: 14,
  },
  tableCellBodyGray: {
    fontFamily: 'NotoSansCJKkr',
    textAlign: 'right',
    borderColor: '#171b23',
    color: '#a0a5af',
    fontSize: 14,
  },
  tableCellBodyNameRank: {
    fontFamily: 'NotoSansCJKkr',
    // color: '#2c2c2c',
    // fontWeight: 700,
    // padding: 20,
    textAlign: 'center',
    borderColor: '#171b23',
    color: '#e2e3e4',
    fontSize: 14,
  },
}));

function CoinMarkets({ coinMarket, value }) {
  const classes = useStyles();

  // console.log(coinMarket);

  return (
    <Paper className={classes.root}>
      <Table
        classes={{
          root: classes.table,
        }}
      >
        <TableHead
          classes={{
            root: classes.tableHead,
          }}
        >
          <TableRow>
            <TableCell
              classes={{
                root: classes.tableCellHeadNameRank,
              }}
            >
              순위
            </TableCell>
            <TableCell
              classes={{
                root: classes.tableCellHeadName,
              }}
            >
              이미지
            </TableCell>
            <TableCell
              classes={{
                root: classes.tableCellHeadName,
              }}
            >
              이름
            </TableCell>
            <TableCell
              classes={{
                root: classes.tableCellHead,
              }}
            >
              심볼
            </TableCell>
            <TableCell
              classes={{
                root: classes.tableCellHead,
              }}
            >
              시세
              {value === 0 && '(KRW)'}
              {value === 1 && '(USD)'}
              {value === 2 && '(BTC)'}
            </TableCell>
            <TableCell
              classes={{
                root: classes.tableCellHead,
              }}
            >
              24시간
            </TableCell>
            <TableCell
              classes={{
                root: classes.tableCellHead,
              }}
            >
              최고가
              {value === 0 && '(KRW)'}
              {value === 1 && '(USD)'}
              {value === 2 && '(BTC)'}
            </TableCell>
            <TableCell
              classes={{
                root: classes.tableCellHead,
              }}
            >
              최저가
              {value === 0 && '(KRW)'}
              {value === 1 && '(USD)'}
              {value === 2 && '(BTC)'}
            </TableCell>
            <TableCell
              classes={{
                root: classes.tableCellHead,
              }}
            >
              유통량
            </TableCell>
            <TableCell
              classes={{
                root: classes.tableCellHead,
              }}
            >
              시가총액
              {value === 0 && '(KRW)'}
              {value === 1 && '(USD)'}
              {value === 2 && '(BTC)'}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coinMarket &&
            coinMarket.map(row => (
              <TableRow key={row.id}>
                <TableCell
                  classes={{
                    root: classes.tableCellBodyNameRank,
                  }}
                >
                  {row.market_cap_rank}
                </TableCell>
                <TableCell
                  classes={{
                    root: classes.tableCellBodyName,
                  }}
                >
                  <img src={row.image} alt={row.name} className={classes.img} />
                </TableCell>
                <TableCell
                  classes={{
                    root: classes.tableCellBodyName,
                  }}
                >
                  {/* {row.name} */}
                  <CoinName name={row.name} />
                </TableCell>
                <TableCell
                  classes={{
                    root: classes.tableCellBody,
                  }}
                >
                  {row.symbol.toUpperCase()}
                </TableCell>
                <TableCell
                  classes={{
                    root: classes.tableCellBody,
                  }}
                >
                  {value === 0 && numeral(row.current_price).format('0,0')}
                  {value === 1 && numeral(row.current_price).format('0,0.000')}
                  {value === 2 &&
                    numeral(row.current_price).format('0.00000000')}
                </TableCell>
                {row.price_change_percentage_24h < 0 ? (
                  <TableCell
                    classes={{
                      root: classes.tableCellBodyMinus,
                    }}
                  >
                    {row.price_change_percentage_24h.toFixed(2)}&#37;
                  </TableCell>
                ) : (
                  <TableCell
                    classes={{
                      root: classes.tableCellBodyPlus,
                    }}
                  >
                    {row.price_change_percentage_24h.toFixed(2)}&#37;
                  </TableCell>
                )}
                {/* {row.price_change_percentage_24h.toFixed(2)}&#37; */}
                <TableCell
                  classes={{
                    root: classes.tableCellBodyGray,
                  }}
                >
                  {/* {row.high_24h.toLocaleString()} */}
                  {value === 0 && numeral(row.high_24h).format('0,0')}
                  {value === 1 && numeral(row.high_24h).format('0,0.000')}
                  {value === 2 && numeral(row.high_24h).format('0.00000000')}
                </TableCell>
                <TableCell
                  classes={{
                    root: classes.tableCellBodyGray,
                  }}
                >
                  {/* {row.low_24h.toLocaleString()} */}
                  {value === 0 && numeral(row.low_24h).format('0,0')}
                  {value === 1 && numeral(row.low_24h).format('0,0.000')}
                  {value === 2 && numeral(row.low_24h).format('0.00000000')}
                </TableCell>
                <TableCell
                  classes={{
                    root: classes.tableCellBodyGray,
                  }}
                >
                  {row.circulating_supply.toLocaleString()}
                </TableCell>
                <TableCell
                  classes={{
                    root: classes.tableCellBodyGray,
                  }}
                >
                  {row.market_cap.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

CoinMarkets.propTypes = {
  coinMarket: PropTypes.any,
  value: PropTypes.any,
};

export default memo(CoinMarkets);

function CoinName(props) {
  switch (props.name) {
    case 'Bitcoin':
      return '비트코인';
    case 'Ethereum':
      return '이더리움';
    case 'XRP':
      return '리플코인';
    case 'Bitcoin Cash':
      return '비트코인캐시';
    case 'Litecoin':
      return '라이트코인';
    case 'EOS':
      return '이오스';
    case 'Binance Coin':
      return '바이낸스 코인';
    case 'Bitcoin SV':
      return 'Bitcoin SV';
    case 'Tether':
      return '테더';
    case 'Cardano':
      return '에이다';
    case 'TRON':
      return '트론';
    case 'Stellar':
      return '스텔라루멘';
    case 'Monero':
      return '모네로';
    case 'LEO Token':
      return 'LEO Token';
    case 'Dash':
      return '대시';
    case 'Cosmos':
      return 'Cosmos';
    case 'NEO':
      return '네오';
    case 'ChainLink':
      return '체인링크';
    case 'IOTA':
      return '아이오타';
    case 'Huobi Token':
      return '후오비토큰';
    case 'Tezos':
      return '테조스';
    case 'Ontology':
      return '온톨로지';
    case 'Ethereum Classic':
      return '이더리움클래식';
    case 'NEM':
      return '넴';
    case 'Zcash':
      return '지캐시';
    case 'Crypto.com Chain':
      return 'Crypto.com Chain';
    case 'Maker':
      return '메이커';
    case 'OKB':
      return 'OKB';
    case 'Bitcoin Gold':
      return '비트코인골드';
    case 'Qtum':
      return '퀸텀';
    case 'Dogecoin':
      return '도지코인';

    default:
      return props.name;
  }
}

CoinName.propTypes = {
  name: PropTypes.string.isRequired,
};
