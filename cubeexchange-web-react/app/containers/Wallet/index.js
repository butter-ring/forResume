/**
 *
 * Wallet
 *
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import request from 'utils/request';
import CircularProgress from '@material-ui/core/CircularProgress';
// import SigninRequired from 'components/SigninRequired';
// import SwiperSlide from 'components/SwiperSlide';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import WonIcon from '../../images/coinIcon/icons8-won-80.png';
import Checked from '../../images/checked.svg';
import makeSelectWallet from './selectors';
import reducer from './reducer';
import saga from './saga';
import { findMyAccount } from './actions';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: 30,
    // overflowX: 'auto',
    // margin: 0,
    // padding: 0,
    // height: 500,
    // flex: 1,
    // flexGrow: 1,
    // marginTop: 56,
    // backgroundColor: '#171b23',
    // borderColor: '#dedede',
    // border: '1px solid',
    // borderWidth: 1,
    marginTop: 30,
    marginLeft: 30,
    backgroundColor: '#ffffff',
  },
  paper: {
    // marginTop: 'spacing(3)',
    width: '95%',
    overflowX: 'auto',
    // marginBottom: 'spacing(2)',
    // backgroundColor: '#ffffff',
    padding: 30,
  },
  container: {
    minHeight: 91,
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: 37,
    marginRight: 11,
    // marginRight: 'spacing(1)',
    paddingLeft: 20,
    width: 400,
    height: 43,
    borderColor: '#a6a6a6',
    border: '1px solid',
    backgroundColor: '#ffffff',
  },
  dense: {
    marginTop: 'spacing(2)',
  },
  menu: {
    width: 200,
  },

  attendmsgtext: {
    width: 644,
    height: 22,
    borderColor: '#a6a6a6',
    border: '1px solid',
    backgroundColor: '#ffffff',
  },

  attendbutton: {
    width: 100,
    height: 43,
    borderRadius: 3,
    borderColor: '#dedede',
    border: '1px solid',
    backgroundColor: '#ffffff',
  },

  attendbuttondisabled: {
    width: 160,
    height: 43,
    borderRadius: 3,
    backgroundColor: '#a6a6a6',
  },

  attendbuttontext: {
    minWidth: 83,
    height: 20,
    fontFamily: 'NotoSansCJKkr',
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff',
  },
  backgroundf2: {
    backgroundColor: '#f2f2f2',
    borderColor: '#dedede',
    borderTop: '1px solid',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  topCardWrapper: {
    display: 'flex',
  },
  card: {
    width: 140,
    // padding: '2rem 2.4rem',
    height: 99,
    padding: 15,
    border: '1px solid #ececec',
  },
  title: {
    color: '#f09614',
    fontSize: 15,
    textAlign: 'center',
    paddingBottom: 5,
  },
  value: {
    fontWeight: 'bold',
    fontSize: 25,
    paddingRight: 15,
  },
  totalAssetSummary: {
    marginLeft: 20,
    width: '100%',
  },
  krwAssetWrapper: {
    marginTop: 20,
  },
  krwWrapper: {
    display: 'flex',
    verticalAlign: 'middle',
  },
  krwImg: {
    // padding: 10,
    paddingTop: 10,
    paddingRight: 10,
  },
  wonIcon: {
    width: 25,
  },
  buttonWrapper: {
    display: 'flex',
    textAlign: 'right',
  },
  middleWrpper: {
    // paddingLeft: 20,
    // paddingRight: 20,
    paddingTop: 20,
    display: 'flex',
    justifyContent: 'space-between',
  },
  middleButtons: {
    display: 'flex',
  },
  search: {
    display: 'flex',
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    // position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    // color: 'inherit',
    border: '1px solid #ececec',
    // backgroundColor: '#dedede',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  checkedImg: {
    width: 12,
    marginRight: 8,
  },
  status: {
    paddingTop: 35,
    paddingBottom: 20,
    fontWeight: 'bold',
    verticalAlign: 'middle',
  },
  coinNameWrapper: {
    display: 'flex',
    verticalAlign: 'middle',
  },
  coinImgWrapper: {
    padding: 10,
  },
  coinImg: {
    width: 25,
  },
  tableButtons: {
    display: 'flex',
  },
  tableHead: {
    fontFamily: 'NotoSansCJKkr',
    backgroundColor: '#f2f2f2',
    height: 40,
  },
  table: {
    textAlign: 'right',
  },
  tableCellHead: {
    fontFamily: 'NotoSansCJKkr',
    color: '#2c2c2c',
    fontWeight: 700,
    textAlign: 'right',
  },
  tableCellBody: {
    fontFamily: 'NotoSansCJKkr',
    textAlign: 'right',
  },
  tableCellHeadKrw: {
    fontFamily: 'NotoSansCJKkr',
    color: '#2c2c2c',
    fontWeight: 700,
    padding: 20,
  },
  tableCellBodyKrw: {
    fontFamily: 'NotoSansCJKkr',
    // color: '#2c2c2c',
    // fontWeight: 700,
    // padding: 20,
    textAlign: 'left',
  },
  button: {
    fontFamily: 'NotoSansCJKkr',
    marginRight: 8,
    fontSize: 11,
  },
  button2: {
    fontFamily: 'NotoSansCJKkr',
    fontSize: 11,
  },
  currencyTitle: {
    fontFamily: 'NotoSansCJKkr',
    fontSize: 13,
    fontWeight: 'bold',
  },
  currencySymbol: {
    fontFamily: 'NotoSansCJKkr',
    fontSize: 13,
  },
  qrcodeimg: {
    width: 202,
    height: 202,
    marginLeft: 37,
    marginRight: 11,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    border: '1px solid #b5b5b6',
    borderRadius: 2,
  },
})); // END userStyles

export function Wallet({ wallet, findMyAccountGet }) {
  useInjectReducer({ key: 'wallet', reducer });
  useInjectSaga({ key: 'wallet', saga });

  const classes = useStyles();
  const [ethaddr, setEthaddr] = useState('');
  const [qrcode, setQrcode] = useState('');
  const [qrcodeval, setQrcodeval] = useState(false);
  const [loadingAll, setLoadingAll] = useState(false);
  useEffect(() => {
    console.log(':::: findMyAccountGet useEffect ::::');
    console.log(wallet.account.ethPublic);
    findMyAccountGet();
    //   setQrcode(
    //   'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=0xEcacFdC6746ae3726724540E2933808787c8eA8a&choe=UTF-8response.data',
    // );

    if (
      wallet.account.ethPublic !== null &&
      wallet.account.ethPublic !== '' &&
      wallet.account.ethPublic !== undefined
    ) {
      console.log(':::: 이더 주소가 있을경우 ::::');
      const qrcodeUrl = `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${
        wallet.account.ethPublic
      }&choe=UTF-8response.data`;
      setQrcode(qrcodeUrl);
    }
  }, [wallet.account.ethPublic]);

  console.log(':::: findMyAccountGet ::::');
  console.log(wallet.account);

  const generateWallet = async () => {
    // setLoading(true);
    setLoadingAll(true);
    const options = {
      method: 'GET',
      auth: true,
    };

    console.log(options);
    try {
      const response = await request(`/api/wallet/generate`, options);
      console.log(response);
      if (response.data !== null) {
        setEthaddr(response.data);
        const qrcodeUrl = `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${
          response.data
        }&choe=UTF-8response.data`;
        setQrcode(qrcodeUrl);
        setQrcodeval(true);
      }
    } catch (err) {
      console.log(err.response);
      setLoadingAll(false);
    }
    // setLoading(false);
    setLoadingAll(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.paper}>
        <div className={classes.topCardWrapper}>
          <div className={classes.card}>
            <Typography className={classes.title}>총 자산 평가액</Typography>
            <span className={classes.value}>0</span>
            <span className={classes.won}>ETH</span>
          </div>
          <div className={classes.totalAssetSummary}>
            <Table className={classes.table}>
              <TableHead
                classes={{
                  root: classes.tableHead,
                }}
              >
                <TableRow>
                  <TableCell
                    classes={{
                      root: classes.tableCellHead,
                    }}
                  >
                    총 매수 금액
                  </TableCell>
                  <TableCell
                    classes={{
                      root: classes.tableCellHead,
                    }}
                  >
                    총 평가 금액
                  </TableCell>
                  <TableCell
                    classes={{
                      root: classes.tableCellHead,
                    }}
                  >
                    총 평가 손익률
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell
                    classes={{
                      root: classes.tableCellBody,
                    }}
                  >
                    0
                  </TableCell>
                  <TableCell
                    classes={{
                      root: classes.tableCellBody,
                    }}
                  >
                    0
                  </TableCell>
                  <TableCell
                    classes={{
                      root: classes.tableCellBody,
                    }}
                  >
                    0(0.00%)
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        <div className={classes.krwAssetWrapper}>
          <Table>
            <TableHead
              classes={{
                root: classes.tableHead,
              }}
            >
              <TableRow>
                <TableCell
                  classes={{
                    root: classes.tableCellHeadKrw,
                  }}
                >
                  ETH 자산
                </TableCell>
                <TableCell
                  classes={{
                    root: classes.tableCellHead,
                  }}
                >
                  총 보유 금액
                </TableCell>
                <TableCell
                  classes={{
                    root: classes.tableCellHead,
                  }}
                >
                  미체결 금액
                </TableCell>
                <TableCell
                  classes={{
                    root: classes.tableCellHead,
                  }}
                >
                  거래 가능 금액
                </TableCell>
                <TableCell
                  classes={{
                    root: classes.tableCellHead,
                  }}
                >
                  <Button variant="outlined" className={classes.button2}>
                    입출금 계좌 관리
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  classes={{
                    root: classes.tableCellBodyKrw,
                  }}
                >
                  <div className={classes.krwWrapper}>
                    <div className={classes.krwImg}>
                      <img
                        src={WonIcon}
                        alt="wonicon"
                        className={classes.wonIcon}
                      />
                    </div>
                    <div className={classes.krwText}>
                      <Typography className={classes.currencyTitle}>
                        이더리움
                      </Typography>
                      <Typography className={classes.currencySymbol}>
                        ETH
                      </Typography>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  classes={{
                    root: classes.tableCellBody,
                  }}
                >
                  0
                </TableCell>
                <TableCell
                  classes={{
                    root: classes.tableCellBody,
                  }}
                >
                  0
                </TableCell>
                <TableCell
                  classes={{
                    root: classes.tableCellBody,
                  }}
                >
                  0
                </TableCell>
                <TableCell
                  classes={{
                    root: classes.tableCellBody,
                  }}
                >
                  <Link to="/deposit">
                    <Button variant="outlined" className={classes.button}>
                      입금
                    </Button>
                  </Link>

                  <Button variant="outlined" className={classes.button2}>
                    출금
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className={classes.middleWrpper}>
          <div className={classes.middleButtons}>
            <Button variant="outlined" className={classes.button}>
              보유
            </Button>
            <Button variant="outlined" className={classes.button2}>
              즐겨찾기
            </Button>
          </div>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="이름/심볼 검색"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'Search' }}
            />
          </div>
        </div>
        <div className={classes.status}>
          <span>
            <img src={Checked} alt="checked" className={classes.checkedImg} />
          </span>
          <span>암호화폐 출금 가능</span>
        </div>
        <div className={classes.balanceListWrapper}>
          <Table>
            <TableHead
              classes={{
                root: classes.tableHead,
              }}
            >
              <TableRow>
                <TableCell
                  classes={{
                    root: classes.tableCellHeadKrw,
                  }}
                >
                  이름
                </TableCell>
                <TableCell
                  classes={{
                    root: classes.tableCellHead,
                  }}
                >
                  총 보유 수량
                </TableCell>
                <TableCell
                  classes={{
                    root: classes.tableCellHead,
                  }}
                >
                  미체결 수량
                </TableCell>
                <TableCell
                  classes={{
                    root: classes.tableCellHead,
                  }}
                >
                  거래 가능 수량
                </TableCell>
                <TableCell
                  classes={{
                    root: classes.tableCellHead,
                  }}
                >
                  <Button variant="outlined" className={classes.button2}>
                    출금 주소 관리
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  classes={{
                    root: classes.tableCellBodyKrw,
                  }}
                >
                  <div className={classes.coinNameWrapper}>
                    <div className={classes.coinImgWrapper}>
                      <img
                        src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
                        alt="Bitcoin"
                        className={classes.coinImg}
                      />
                    </div>
                    <div className={classes.coinNameText}>
                      <Typography className={classes.currencyTitle}>
                        비트코인
                      </Typography>
                      <Typography className={classes.currencySymbol}>
                        BTC
                      </Typography>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  classes={{
                    root: classes.tableCellBody,
                  }}
                >
                  0
                </TableCell>
                <TableCell
                  classes={{
                    root: classes.tableCellBody,
                  }}
                >
                  0
                </TableCell>
                <TableCell
                  classes={{
                    root: classes.tableCellBody,
                  }}
                >
                  0
                </TableCell>
                <TableCell
                  classes={{
                    root: classes.tableCellBody,
                  }}
                >
                  <Button variant="outlined" className={classes.button}>
                    입금
                  </Button>
                  <Button variant="outlined" className={classes.button2}>
                    출금
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        {/* <SigninRequired /> */}
        {/* <SwiperSlide /> */}
        이더리움 지갑생성
        <br /> <br />
        <div>
          {!wallet.account.ethPublic && !qrcodeval && (
            <Button
              onClick={generateWallet}
              color="primary"
              className={classes.attendbutton}
            >
              주소생성
            </Button>
          )}
          {!wallet.account.ethPublic ? (
            <input
              type="text"
              placeholder="이더주소"
              value={ethaddr}
              className={classes.textField}
              name="ethaddr"
              disabled
            />
          ) : (
            <input
              type="text"
              placeholder=""
              value={wallet.account.ethPublic}
              className={classes.textField}
              name="ethaddr"
              disabled
            />
          )}

          <span className={classes.qrcodeimg}>
            <img src={qrcode} alt="" />
          </span>
        </div>
        {/* <img src={qrcode} alt="" /> */}
        {loadingAll && (
          <CircularProgress size={50} className={classes.buttonProgress} />
        )}
      </div>
    </div>
  );
}

Wallet.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  wallet: PropTypes.any,
  findMyAccountGet: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  wallet: makeSelectWallet(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    findMyAccountGet: () => {
      dispatch(findMyAccount());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Wallet);
