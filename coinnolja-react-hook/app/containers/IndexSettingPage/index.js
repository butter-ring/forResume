/**
 *
 * IndexSettingPage
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectSignin } from 'containers/App/selectors';
import MainCoinIndex from 'components/MainCoinIndex';
import MenuIcon from '@material-ui/icons/Menu';
import request from 'utils/request';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import makeSelectIndexSettingPage from './selectors';
import reducer from './reducer';
import saga from './saga';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f1f1f1',
    paddingTop: theme.spacing(0),
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
  boardTitle: {
    width: '100%',
    verticalAlign: 'middle',
    fontFamily: 'NotoSansCJKkr',
    fontSize: 28,
    fontWeight: 'bold',
    alignItems: 'center',
    display: 'inline-flex',

    lineHeight: 0,
    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
    },
  },
  menuIcon: {
    maxWidth: 30,
    maxHeight: 30,
    width: '100%',
    height: '100%',
    marginRight: 12,
  },
  noAuth: {
    textAlign: 'center',
    backgroundColor: '#ffffff',
    border: 'solid 1px #dedede',
    padding: 25,
  },
  exchangeRow: {
    display: 'flex',
  },
  exchangeRowUp: {
    display: 'flex',
  },
  checkWrap: {
    display: 'flex',
    marginTop: 10,
  },
  contentTable: {
    padding: 16,
  },
  exchangeList: {
    marginRight: 25,
  },
  buttonInit: {
    marginLeft: 10,
  },
}));

const useStyles2 = makeStyles(theme => ({
  paper: {
    position: 'relative',
    width: 250,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

export function IndexSettingPage({ isSignin }) {
  useInjectReducer({ key: 'indexSettingPage', reducer });
  useInjectSaga({ key: 'indexSettingPage', saga });

  const classes = useStyles();
  const classesmodal = useStyles2();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const [loading, setLoading] = React.useState(false);
  const [openm, setOpenm] = React.useState(false);

  const [exchanges, setExchanges] = useState(exchangeListExp);
  const [tokens, setTokens] = useState(tokenListExp);
  const [modalStyle] = React.useState(getModalStyle);
  // const { history } = useReactRouter();

  const postReComment = () => {
    setOpenm(true);
  };

  const handleCloseModal = () => {
    setOpenm(false);
    window.location.href = '/indexsetting';
  };

  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const handlerMoveDown = value => {
    const index = value;
    let newPos = index + 1;
    if (index === -1) throw new Error('Element not found in  content');
    const newContents = JSON.parse(JSON.stringify(exchanges));
    if (newPos >= exchanges.length) newPos = exchanges.length;
    const findObj = newContents[index];
    newContents.splice(index, 1);
    newContents.splice(newPos, 0, findObj);
    setExchanges(newContents);
  };

  const handlerMoveUp = value => {
    const index = value;
    if (index < 1) {
      return false;
    }
    let newPos = index - 1;
    if (index === -1) throw new Error('Element not found in  content');
    const newContents = JSON.parse(JSON.stringify(exchanges));
    if (newPos >= exchanges.length) {
      newPos = exchanges.length;
    }
    const findObj = newContents[index];
    newContents.splice(index, 1);
    newContents.splice(newPos, 0, findObj);
    setExchanges(newContents);
    return newContents;
  };

  const handlerMoveDownToken = value => {
    const index = value;
    let newPos = index + 1;
    if (index === -1) throw new Error('Element not found in  content');
    const newContents = JSON.parse(JSON.stringify(tokens));
    if (newPos >= tokens.length) newPos = tokens.length;
    const findObj = newContents[index];
    newContents.splice(index, 1);
    newContents.splice(newPos, 0, findObj);
    setTokens(newContents);
  };

  const handlerMoveUpToken = value => {
    const index = value;
    if (index < 1) {
      return false;
    }
    let newPos = index - 1;
    if (index === -1) throw new Error('Element not found in  content');
    const newContents = JSON.parse(JSON.stringify(tokens));
    if (newPos >= tokens.length) {
      newPos = tokens.length;
    }
    const findObj = newContents[index];
    newContents.splice(index, 1);
    newContents.splice(newPos, 0, findObj);
    setTokens(newContents);
    return newContents;
  };
  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    if (!loading) {
      setLoading(true);
      const options = {
        method: 'GET',
        auth: true,
      };

      const result = await request(`/api/membercoinindex`, options);
      console.log(result);
      if (result) {
        if (result.data) {
          const {
            memberCoinIndexExchanges,
            memberCoinIndexTokens,
          } = result.data;

          if (memberCoinIndexExchanges.length > 0) {
            const memberCoinIndexExchangesGet = [];
            for (let i = 0; i < memberCoinIndexExchanges.length; i += 1) {
              memberCoinIndexExchangesGet.push({
                code: memberCoinIndexExchanges[i].exchangeCode,
                checked: memberCoinIndexExchanges[i].selected,
              });
            }
            // console.log(memberCoinIndexExchangesGet);
            setExchanges(memberCoinIndexExchangesGet);
          }

          if (memberCoinIndexTokens.length > 0) {
            const memberCoinIndexTokenGet = [];
            for (let i = 0; i < memberCoinIndexTokens.length; i += 1) {
              memberCoinIndexTokenGet.push({
                name: memberCoinIndexTokens[i].tokenCode,
                checked: memberCoinIndexTokens[i].selected,
              });
            }
            setTokens(memberCoinIndexTokenGet);
          }
        }
      }

      setLoading(false);
    }
    return true;
  };

  const onSubmitFormInit = async event => {
    event.preventDefault();
    // console.log(exchangeList.length);
    // console.log(tokenList.length);
    const data = new FormData(event.target);
    const options = {
      method: 'POST',
      data,
      auth: true,
    };
    // console.log(tokenListExp.length);
    const result = await request(`/api/membercoinindex`, options);
    console.log(result);
  };

  const handleChecked = (event, index) => {
    // console.log(event.target.checked);
    const newContents = JSON.parse(JSON.stringify(exchanges));

    const findObj = newContents[index];
    findObj.checked = event.target.checked;
    newContents.splice(index, 0);
    newContents.splice(index, 1, findObj);
    setExchanges(newContents);
  };
  const handleCheckedToken = (event, index) => {
    // console.log(event.target.checked);
    const newContents = JSON.parse(JSON.stringify(tokens));

    const findObj = newContents[index];
    findObj.checked = event.target.checked;
    newContents.splice(index, 0);
    newContents.splice(index, 1, findObj);
    setTokens(newContents);
  };
  const handleInit = () => {
    // console.log(tokenListExp.length);
    setExchanges(exchangeListExp);
    setTokens(tokenListExp);
  };
  if (!isSignin) {
    return <div className={classes.noAuth}>로그인이 필요한 페이지 입니다.</div>;
  }

  return (
    <div className={classes.root}>
      <MainCoinIndex />
      <div className={classes.contentWrap}>
        <div className={classes.contentTop}>
          <span className={classes.boardTitle}>
            {!matches && <MenuIcon className={classes.menuIcon} />}
            <span>시세표 설정</span>
          </span>
        </div>
        <div className={classes.contentTable}>
          <form onSubmit={onSubmitFormInit} className={classes.form}>
            {!matches ? (
              <p>* 선택하신 코인은 최대 12개까지 노출됩니다.</p>
            ) : (
              <p>* 선택하신 코인은 최대 7개까지 노출됩니다.</p>
            )}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.buttonPost}
              onClick={postReComment}
            >
              시세표 적용
            </Button>
            <Button
              variant="outlined"
              color="primary"
              type="button"
              className={classes.buttonInit}
              onClick={handleInit}
            >
              초기화
            </Button>
            <div className={classes.checkWrap}>
              <div className={classes.exchangeList}>
                {exchanges.map((exchange, idx) => (
                  <div className={classes.exchangeRow}>
                    <div className={classes.exchangeRowUp}>
                      <div
                        onClick={() => handlerMoveUp(idx)}
                        role="presentation"
                      >
                        ▲
                      </div>{' '}
                      <div
                        onClick={() => handlerMoveDown(idx)}
                        role="presentation"
                      >
                        ▼
                      </div>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        // name={`selected[${idx}]`}
                        checked={exchange.checked && true}
                        onChange={e => handleChecked(e, idx)}
                      />
                      <input
                        type="hidden"
                        name={`exchangeCode[${idx}]`}
                        value={exchange.code}
                      />
                      <input
                        type="hidden"
                        name={`selected[${idx}]`}
                        value={exchange.checked}
                      />
                      <input
                        type="hidden"
                        name={`exchangeName[${idx}]`}
                        value={exchange.code}
                      />
                      {exchangeNames[exchange.code]}
                    </div>
                  </div>
                ))}
              </div>
              <div className={classes.tokenList}>
                {tokens.map((token, idx) => (
                  <div className={classes.exchangeRow}>
                    <div className={classes.exchangeRowUp}>
                      <div
                        onClick={() => handlerMoveUpToken(idx)}
                        role="presentation"
                      >
                        ▲
                      </div>{' '}
                      <div
                        onClick={() => handlerMoveDownToken(idx)}
                        role="presentation"
                      >
                        ▼
                      </div>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        // name={`selected[${idx}]`}
                        checked={token.checked && true}
                        onChange={e => handleCheckedToken(e, idx)}
                      />
                      <input
                        type="hidden"
                        name={`tokenCode[${idx}]`}
                        value={token.name}
                      />
                      <input
                        type="hidden"
                        name={`tokenName[${idx}]`}
                        value={token.title}
                      />
                      <input
                        type="hidden"
                        name={`selectedToken[${idx}]`}
                        value={token.checked}
                      />
                      {token.name}({tokenNames[token.name]})
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {!matches ? (
              <p>* 선택하신 코인은 최대 12개까지 노출됩니다.</p>
            ) : (
              <p>* 선택하신 코인은 최대 7개까지 노출됩니다.</p>
            )}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.buttonPost}
              onClick={postReComment}
            >
              시세표 적용
            </Button>
            <Button
              variant="outlined"
              color="primary"
              type="button"
              className={classes.buttonInit}
              onClick={handleInit}
            >
              초기화
            </Button>
          </form>
        </div>
      </div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={openm}
        onClose={handleCloseModal}
      >
        <div style={modalStyle} className={classesmodal.paper} align="center">
          <Typography variant="h6" id="simple-modal-description">
            저장이 완료됐습니다.
          </Typography>
          <br />
          <Button
            onClick={handleCloseModal}
            className={classesmodal.button}
            variant="outlined"
            size="medium"
            color="primary"
          >
            닫기
          </Button>
        </div>
      </Modal>
    </div>
  );
}

IndexSettingPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  isSignin: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  indexSettingPage: makeSelectIndexSettingPage(),
  isSignin: makeSelectSignin(),
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

export default compose(withConnect)(IndexSettingPage);

const exchangeListExp = [
  { name: '빗썸', code: 'bithumb', checked: true },
  { name: '업비트', code: 'upbit', checked: true },
  { name: '코인원', code: 'coinone', checked: true },
  { name: '코빗', code: 'kobit', checked: true },
  { name: '비트플라이어', code: 'bitflyer', checked: true },
  { name: '바이낸스', code: 'binance', checked: true },
  { name: '비트파이넥스', code: 'bitfinex', checked: true },
  { name: '오케이코인', code: 'okcoin', checked: true },
  { name: '후오비', code: 'huobi', checked: false },
  { name: '코인네스트', code: 'coinnest', checked: false },
  { name: '코인제스트', code: 'coinzest', checked: false },
  { name: '비트렉스', code: 'bittrex', checked: false },
  { name: '폴로닉스', code: 'poloniex', checked: false },
];

const exchangeNames = {
  bithumb: '빗썸',
  upbit: '업비트',
  coinone: '코인원',
  kobit: '코빗',
  bitflyer: '비트플라이어',
  binance: '바이낸스',
  bitfinex: '비트파이넥스',
  okcoin: '오케이코인',
  huobi: '후오비',
  coinnest: '코인네스트',
  coinzest: '코인제스트',
  bittrex: '비트렉스',
  poloniex: '폴로닉스',
};

const tokenListExp = [
  { name: 'BTC', title: '비트코인', checked: true },
  { name: 'ETH', title: '이더리움', checked: true },
  { name: 'LTC', title: '라이트코인', checked: true },
  { name: 'ETC', title: '이더리움 클래식', checked: true },
  { name: 'XRP', title: '리플', checked: true },
  { name: 'BCH', title: '비트코인 캐시', checked: true },
  { name: 'BTT', title: '비트토렌트', checked: false },
  { name: 'HDAC', title: '에이치닥', checked: false },
  { name: 'EDR', title: '엔도르', checked: false },
  { name: 'BSV', title: '비트코인에스브이', checked: false },
  { name: 'XMR', title: '모네로', checked: false },
  { name: 'QTUM', title: '퀀텀', checked: false },
  { name: 'EOS', title: '이오스', checked: true },
  { name: 'TRX', title: '트론', checked: false },
  { name: 'BTG', title: '비트코인 골드', checked: false },
  { name: 'DASH', title: '대시', checked: false },
  { name: 'ZEC', title: '지캐시', checked: false },
  { name: 'ADA', title: '에이다', checked: false },
  { name: 'VET', title: '비체인', checked: false },
  { name: 'EMC2', title: '아인스타이늄', checked: false },
  { name: 'SNT', title: '스테이터스', checked: false },
  { name: 'XLM', title: '스텔라루멘', checked: false },
  { name: 'ARDR', title: '아더', checked: false },
  { name: 'NEO', title: '네오', checked: false },
  { name: 'ICX', title: '아이콘', checked: false },
  { name: 'OMG', title: '오미세고', checked: false },
  { name: 'STORJ', title: '스토리지', checked: false },
  { name: 'STORM', title: '스톰', checked: false },
  { name: 'GRS', title: '그로스톨', checked: false },
  { name: 'ELF', title: '엘프', checked: false },
  { name: 'MITH', title: '미스릴', checked: false },
  { name: 'GNT', title: '골렘', checked: false },
  { name: 'NPXS', title: '펀디엑스', checked: false },
  { name: 'MCO', title: '모나코', checked: false },
  { name: 'KNC', title: '카이버네트워크', checked: false },
  { name: 'SC', title: '시아코인', checked: false },
  { name: 'XVG', title: '버지', checked: false },
  { name: 'GTO', title: '기프토', checked: false },
  { name: 'NXT', title: '엔엑스티', checked: false },
  { name: 'RDD', title: '레드코인', checked: false },
  { name: 'SRN', title: '시린토큰', checked: false },
  { name: 'IGNIS', title: '이그니스', checked: false },
  { name: 'ONT', title: '온톨로지', checked: false },
  { name: 'HC', title: '하이퍼캐시', checked: false },
  { name: 'DCR', title: '디크레드', checked: false },
  { name: 'BCN', title: '바이트코인', checked: false },
  { name: 'STEEM', title: '스팀', checked: false },
  { name: 'IOTA', title: '아이오타', checked: false },
  { name: 'ZIL', title: '질리카', checked: false },
  { name: 'ETHOS', title: '에토스', checked: false },
  { name: 'REP', title: '어거', checked: false },
  { name: 'PAY', title: '텐엑스페이토큰', checked: false },
  { name: 'WAX', title: '왁스', checked: false },
  { name: 'POWR', title: '파워렛저', checked: false },
  { name: 'LRC', title: '루프링', checked: false },
  { name: 'STRAT', title: '스트라티스', checked: false },
  { name: 'ZRX', title: '제로엑스', checked: false },
  { name: 'POLY', title: '폴리매쓰', checked: false },
  { name: 'AE', title: '애터니티', checked: false },
  { name: 'XEM', title: '뉴이코노미무브먼트', checked: false },
  { name: 'LOOM', title: '룸 네트워크', checked: false },
  { name: 'BAT', title: '베이직어텐션토큰', checked: false },
  { name: 'ADX', title: '애드엑스', checked: false },
  { name: 'ADT', title: '애드토큰', checked: false },
  { name: 'IOST', title: '아이오에스티', checked: false },
  { name: 'RFR', title: '리퍼리움', checked: false },
  { name: 'DMT', title: '디마켓', checked: false },
  { name: 'OST', title: '오에스티', checked: false },
  { name: 'PPT', title: '파퓰러스', checked: false },
  { name: 'CTXC', title: '코르텍스', checked: false },
  { name: 'CMT', title: '사이버마일스', checked: false },
  { name: 'THETA', title: '쎄타토큰', checked: false },
  { name: 'WTC', title: '월튼체인', checked: false },
  { name: 'ITC', title: '아이오티체인', checked: false },
  { name: 'ABT', title: '아크블록', checked: false },
  { name: 'TRUE', title: '트루체인', checked: false },
  { name: 'PLY', title: '플레이코인', checked: false },
  { name: 'RNT', title: '원루트네트워크', checked: false },
  { name: 'WAVES', title: '웨이브', checked: false },
  { name: 'LINK', title: '체인링크', checked: false },
  { name: 'ENJ', title: '엔진코인', checked: false },
  { name: 'PST', title: '프리마스', checked: false },
  { name: 'SALT', title: '솔트', checked: false },
  { name: 'RDN', title: '레이든네트워크토큰', checked: false },
  { name: 'BHPC', title: '비에이치피캐시', checked: false },
  { name: 'INS', title: '아이앤에스', checked: false },
  { name: 'PIVX', title: '피벡스', checked: false },
  { name: 'BCD', title: '비트코인다이아몬드', checked: false },
  { name: 'BZNT', title: '베잔트', checked: false },
  { name: 'OCN', title: '오디세이', checked: false },
  { name: 'GAS', title: '가스', checked: false },
  { name: 'ONG', title: '온톨로지가스', checked: false },
  { name: 'MEDX', title: '메디블록', checked: false },
  { name: 'NXY', title: '넥시', checked: false },
  { name: 'COZ', title: '코즈', checked: false },
  { name: 'KST', title: '스타코인', checked: false },
  { name: 'ROM', title: '롬', checked: false },
  { name: 'ROMTV', title: '롬티비', checked: false },
  { name: 'PAT', title: '패트론', checked: false },
  { name: 'COSM', title: '코스모코인', checked: false },
  { name: 'AUTO', title: '큐브', checked: false },
  { name: 'GXC', title: '지엑스체인', checked: false },
  { name: 'QKC', title: '쿼크체인', checked: false },
  { name: 'MOC', title: '모스코인', checked: false },
  { name: 'TFUEL', title: '쎄타퓨엘', checked: false },
  { name: 'MANA', title: '디센트럴랜드', checked: false },
  { name: 'CPT', title: '콘텐츠프로토콜토큰', checked: false },
  { name: 'MTL', title: '메탈', checked: false },
  { name: 'TTC', title: '티티씨프로토콜', checked: false },
];

const tokenNames = {
  BTC: '비트코인',
  ETH: '이더리움',
  LTC: '라이트코인',
  ETC: '이더리움 클래식',
  XRP: '리플',
  BCH: '비트코인 캐시',
  BTT: '비트토렌트',
  HDAC: '에이치닥',
  EDR: '엔도르',
  BSV: '비트코인에스브이',
  XMR: '모네로',
  QTUM: '퀀텀',
  EOS: '이오스',
  TRX: '트론',
  BTG: '비트코인 골드',
  DASH: '대시',
  ZEC: '지캐시',
  ADA: '에이다',
  VET: '비체인',
  EMC2: '아인스타이늄',
  SNT: '스테이터스',
  XLM: '스텔라루멘',
  ARDR: '아더',
  NEO: '네오',
  ICX: '아이콘',
  OMG: '오미세고',
  STORJ: '스토리지',
  STORM: '스톰',
  GRS: '그로스톨',
  ELF: '엘프',
  MITH: '미스릴',
  GNT: '골렘',
  NPXS: '펀디엑스',
  MCO: '모나코',
  KNC: '카이버네트워크',
  SC: '시아코인',
  XVG: '버지',
  GTO: '기프토',
  NXT: '엔엑스티',
  RDD: '레드코인',
  SRN: '시린토큰',
  IGNIS: '이그니스',
  ONT: '온톨로지',
  HC: '하이퍼캐시',
  DCR: '디크레드',
  BCN: '바이트코인',
  STEEM: '스팀',
  IOTA: '아이오타',
  ZIL: '질리카',
  ETHOS: '에토스',
  REP: '어거',
  PAY: '텐엑스페이토큰',
  WAX: '왁스',
  POWR: '파워렛저',
  LRC: '루프링',
  STRAT: '스트라티스',
  ZRX: '제로엑스',
  POLY: '폴리매쓰',
  AE: '애터니티',
  XEM: '뉴이코노미무브먼트',
  LOOM: '룸 네트워크',
  BAT: '베이직어텐션토큰',
  ADX: '애드엑스',
  ADT: '애드토큰',
  IOST: '아이오에스티',
  RFR: '리퍼리움',
  DMT: '디마켓',
  OST: '오에스티',
  PPT: '파퓰러스',
  CTXC: '코르텍스',
  CMT: '사이버마일스',
  THETA: '쎄타토큰',
  WTC: '월튼체인',
  ITC: '아이오티체인',
  ABT: '아크블록',
  TRUE: '트루체인',
  PLY: '플레이코인',
  RNT: '원루트네트워크',
  WAVES: '웨이브',
  LINK: '체인링크',
  ENJ: '엔진코인',
  PST: '프리마스',
  SALT: '솔트',
  RDN: '레이든네트워크토큰',
  BHPC: '비에이치피캐시',
  INS: '아이앤에스',
  PIVX: '피벡스',
  BCD: '비트코인다이아몬드',
  BZNT: '베잔트',
  OCN: '오디세이',
  GAS: '가스',
  ONG: '온톨로지가스',
  MEDX: '메디블록',
  NXY: '넥시',
  COZ: '코즈',
  KST: '스타코인',
  ROM: '롬',
  ROMTV: '롬티비',
  PAT: '패트론',
  COSM: '코스모코인',
  AUTO: '큐브',
  GXC: '지엑스체인',
  QKC: '쿼크체인',
  MOC: '모스코인',
  TFUEL: '쎄타퓨엘',
  MANA: '디센트럴랜드',
  CPT: '콘텐츠프로토콜토큰',
  MTL: '메탈',
  TTC: '티티씨프로토콜',
};
