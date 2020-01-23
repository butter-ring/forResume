package com.coinnolja.web.api.coinindex;

import com.coinnolja.web.api.exchange.ExchangeRate;
import com.coinnolja.web.api.exchange.ExchangeRateRepository;
import com.coinnolja.web.api.member.MemberCoinIndexExchangeRepository;
import com.coinnolja.web.api.member.MemberCoinIndexTokenRepository;
import com.coinnolja.web.api.member.model.MemberCoinIndexExchange;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.netty.channel.ChannelOption;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import reactor.netty.http.client.HttpClient;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ForkJoinPool;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Slf4j
@Service
public class CoinIndexService {
    private static final String MIME_TYPE = "application/json";
    private static final String CRYPTOWATCH_API_BASE_URL = "https://api.cryptowat.ch/markets";
    private static final String UPBIT_API_BASE_URL = "https://api.upbit.com/v1/ticker";
    private static final String BITHUMB_API_BASE_URL = "https://api.bithumb.com/public/ticker";
    private static final String KOBIT_API_BASE_URL = "https://api.korbit.co.kr/v1/ticker/detailed";
    private static final String COINONE_API_BASE_URL = "https://api.coinone.co.kr/ticker";

    private static final HttpClient httpClient = HttpClient.create()
            .tcpConfiguration(client ->
                    client.option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 10000));


    private final WebClient webClient;
    private final RestTemplate restTemplate;
    private final ExchangeRateRepository exchangeRateRepository;
    private final CoinIndexUtils coinIndexUtils;
    private final MemberCoinIndexExchangeRepository memberCoinIndexExchangeRepository;
    private final MemberCoinIndexTokenRepository memberCoinIndexTokenRepository;

    public CoinIndexService(
            ExchangeRateRepository exchangeRateRepository
            , CoinIndexUtils coinIndexUtils
            , MemberCoinIndexExchangeRepository memberCoinIndexExchangeRepository
            , MemberCoinIndexTokenRepository memberCoinIndexTokenRepository
    ) {
        this.exchangeRateRepository = exchangeRateRepository;
        this.coinIndexUtils = coinIndexUtils;
        this.memberCoinIndexExchangeRepository = memberCoinIndexExchangeRepository;
        this.memberCoinIndexTokenRepository = memberCoinIndexTokenRepository;

        this.webClient = WebClient.builder()
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .baseUrl(CRYPTOWATCH_API_BASE_URL)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MIME_TYPE)
                .build();
        this.restTemplate = new RestTemplate();
    }


    /**
     * TODO: 깔끔하게 리팩토링 할 것
     * cryptowatch: https://api.cryptowat.ch/markets/bithumb/btckrw/summary
     * upbit: https://api.upbit.com/v1/ticker?markets=KRW-BTC
     * bithumb: https://api.bithumb.com/public/ticker/BTC
     * kobit: https://api.korbit.co.kr/v1/ticker/detailed?currency_pair=btc_krw
     */
    public Mono<List<CoinIndexList>> findBTC() {

        ExchangeRate exchangeRate = exchangeRateRepository.findFirstByOrderByCreatedAtDesc();
        List<CoinIndexList> coinIndexLists = new ArrayList<>();
        coinIndexLists.add(makeCoinIndex("BTC", exchangeRate));

        CoinIndexList coinIndexList = new CoinIndexList();
        /** BTC start */
        List<CoinIndex> coinIdexesBTC = new ArrayList<>();
        ResponseEntity<String> binanceBtc
                = restTemplate.getForEntity(CRYPTOWATCH_API_BASE_URL + "/binance/btcusdt/summary", String.class);
        CoinIndex coinIndex = coinIndexUtils.getCoinIndexForCryptowatch(binanceBtc, "binance", "BTC", exchangeRate, "USD", null);

        ResponseEntity<String> bithumbBtc
                = restTemplate.getForEntity(BITHUMB_API_BASE_URL + "/BTC", String.class);
        coinIdexesBTC.add(coinIndexUtils.getCoinIndexForBithumb(bithumbBtc, "bithumb", "BTC", exchangeRate, coinIndex.getPriceKrw()));

        ResponseEntity<String> upbitBtc
                = restTemplate.getForEntity(UPBIT_API_BASE_URL + "?markets=KRW-BTC", String.class);
        coinIdexesBTC.add(coinIndexUtils.getCoinIndexForUpbit(upbitBtc, "upbit", "BTC", exchangeRate, coinIndex.getPriceKrw()));

        ResponseEntity<String> coinoneBtc
                = restTemplate.getForEntity(CRYPTOWATCH_API_BASE_URL + "/coinone/btckrw/summary", String.class);
        coinIdexesBTC.add(coinIndexUtils.getCoinIndexForCryptowatch(coinoneBtc, "coinone", "BTC", exchangeRate, "KRW", coinIndex.getPriceKrw()));

        ResponseEntity<String> kobitBtc
                = restTemplate.getForEntity(KOBIT_API_BASE_URL + "?currency_pair=btc_krw", String.class);
        coinIdexesBTC.add(coinIndexUtils.getCoinIndexForKobit(kobitBtc, "kobit", "BTC", exchangeRate, coinIndex.getPriceKrw()));

        ResponseEntity<String> bitfinexBtc
                = restTemplate.getForEntity(CRYPTOWATCH_API_BASE_URL + "/bitfinex/btcusd/summary", String.class);
        coinIdexesBTC.add(coinIndexUtils.getCoinIndexForCryptowatch(bitfinexBtc, "bitfinex", "BTC", exchangeRate, "USD", null));

        coinIdexesBTC.add(coinIndex);
        coinIndexList.setCoinIndexes(coinIdexesBTC);
        coinIndexList.setSymbol("BTC");
        log.debug("]-----] coinIdexes [-----[ {}", coinIdexesBTC);
        /** BTC end */


        /** BTC start */
        List<CoinIndex> coinIdexesETH = new ArrayList<>();
        ResponseEntity<String> binanceEth
                = restTemplate.getForEntity(CRYPTOWATCH_API_BASE_URL + "/binance/ethusdt/summary", String.class);
        CoinIndex coinIndexETH = coinIndexUtils.getCoinIndexForCryptowatch(binanceBtc, "binance", "BTC", exchangeRate, "USD", null);

        ResponseEntity<String> bithumbEth
                = restTemplate.getForEntity(BITHUMB_API_BASE_URL + "/BTC", String.class);
        coinIdexesBTC.add(coinIndexUtils.getCoinIndexForBithumb(bithumbBtc, "bithumb", "BTC", exchangeRate, coinIndexETH.getPriceKrw()));

        ResponseEntity<String> upbitEth
                = restTemplate.getForEntity(UPBIT_API_BASE_URL + "?markets=KRW-BTC", String.class);
        coinIdexesBTC.add(coinIndexUtils.getCoinIndexForUpbit(upbitBtc, "upbit", "BTC", exchangeRate, coinIndexETH.getPriceKrw()));

        ResponseEntity<String> coinoneEth
                = restTemplate.getForEntity(CRYPTOWATCH_API_BASE_URL + "/coinone/btckrw/summary", String.class);
        coinIdexesBTC.add(coinIndexUtils.getCoinIndexForCryptowatch(coinoneBtc, "coinone", "BTC", exchangeRate, "KRW", coinIndexETH.getPriceKrw()));

        ResponseEntity<String> kobitEth
                = restTemplate.getForEntity(KOBIT_API_BASE_URL + "?currency_pair=btc_krw", String.class);
        coinIdexesBTC.add(coinIndexUtils.getCoinIndexForKobit(kobitBtc, "kobit", "BTC", exchangeRate, coinIndexETH.getPriceKrw()));

        ResponseEntity<String> bitfinexEth
                = restTemplate.getForEntity(CRYPTOWATCH_API_BASE_URL + "/bitfinex/btcusd/summary", String.class);
        coinIdexesBTC.add(coinIndexUtils.getCoinIndexForCryptowatch(bitfinexBtc, "bitfinex", "BTC", exchangeRate, "USD", null));

        coinIdexesBTC.add(coinIndex);
        coinIndexList.setCoinIndexes(coinIdexesBTC);
        coinIndexList.setSymbol("BTC");
        log.debug("]-----] coinIdexes ETH [-----[ {}", coinIdexesETH);
        /** BTC end */

        return Mono.just(coinIndexLists);

    }


    //    @Cacheable("coinindex.indexes")
    public List<CoinIndexList> findAllIndex() {

        ExchangeRate exchangeRate = exchangeRateRepository.findFirstByOrderByCreatedAtDesc();
        List<CoinIndexList> coinIndexLists = new ArrayList<>();

        Stream<String> symbols = Stream.of("BTC", "ETH", "LTC", "ETC", "XRP", "BCH", "QTUM", "EOS");

        //Convert a Stream to List
        ForkJoinPool customThreadPool = new ForkJoinPool(4);
        try {
            customThreadPool.submit(
                    () -> symbols.collect(Collectors.toList()).parallelStream().forEach(s -> {
                        coinIndexLists.add(makeCoinIndex(s, exchangeRate));
                    })).get();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }

//        symbols.collect(Collectors.toList()).parallelStream().forEach(s -> {
//            coinIndexLists.add(makeCoinIndex(s, exchangeRate));
//        });

//        Arrays.parallelStream() (symbols).forEach(s -> {
//            coinIndexLists.add(makeCoinIndex(s, exchangeRate));
//        });


//        coinIndexLists.add(makeCoinIndex("ETH", exchangeRate));
//        coinIndexLists.add(makeCoinIndex("LTC", exchangeRate));
//        coinIndexLists.add(makeCoinIndex("ETC", exchangeRate));
//        coinIndexLists.add(makeCoinIndex("XRP", exchangeRate));
//        coinIndexLists.add(makeCoinIndex("BCH", exchangeRate));
//        coinIndexLists.add(makeCoinIndex("QTUM", exchangeRate));
//        coinIndexLists.add(makeCoinIndex("EOS", exchangeRate));

        log.debug("]-----] coinIndexLists [-----[ {}", coinIndexLists);
        log.debug("]-----] coinIndexLists [-----[ {}", coinIndexLists.size());
        return coinIndexLists;
    }


    //    @Cacheable("coinindex.indexes")
    public CoinIndexList findBySymbol(String symbol) {
        ExchangeRate exchangeRate = exchangeRateRepository.findFirstByOrderByCreatedAtDesc();
        return makeCoinIndex(symbol, exchangeRate);
    }

    public CoinIndexList makeCoinIndex(String symbol, ExchangeRate exchangeRate) {
        CoinIndexList coinIndexList = new CoinIndexList();
        List<CoinIndex> coinIdexes = new ArrayList<>();
        log.debug("]-----] makeCoinIndex::symbol [-----[ {}", symbol);

        String binanceSymbol = symbol.toLowerCase();
        if ("BCH".equals(symbol)) {
            binanceSymbol = "bcc";
        }
        ResponseEntity<String> binanceBtc
                = restTemplate.getForEntity(CRYPTOWATCH_API_BASE_URL + "/binance/" + binanceSymbol + "usdt/summary", String.class);
        CoinIndex coinIndex = coinIndexUtils.getCoinIndexForCryptowatch(binanceBtc, "binance", symbol, exchangeRate, "USD", null);

        ResponseEntity<String> bithumbBtc
                = restTemplate.getForEntity(BITHUMB_API_BASE_URL + "/" + symbol, String.class);
        coinIdexes.add(coinIndexUtils.getCoinIndexForBithumb(bithumbBtc, "bithumb", symbol, exchangeRate, coinIndex.getPriceKrw()));

        ResponseEntity<String> upbitBtc
                = restTemplate.getForEntity(UPBIT_API_BASE_URL + "?markets=KRW-" + symbol, String.class);
        coinIdexes.add(coinIndexUtils.getCoinIndexForUpbit(upbitBtc, "upbit", symbol, exchangeRate, coinIndex.getPriceKrw()));


//        https://api.coinone.co.kr/ticker?currency=eos
        ResponseEntity<String> coinoneBtc
                = restTemplate.getForEntity(COINONE_API_BASE_URL + "?currency=" + symbol.toLowerCase(), String.class);
        coinIdexes.add(coinIndexUtils.getCoinIndexForCoinone(coinoneBtc, "coinone", symbol, exchangeRate, coinIndex.getPriceKrw()));


        if (!"EOS".equals(symbol)) {
            ResponseEntity<String> kobitBtc
                    = restTemplate.getForEntity(KOBIT_API_BASE_URL + "?currency_pair=" + symbol.toLowerCase() + "_krw", String.class);
            coinIdexes.add(coinIndexUtils.getCoinIndexForKobit(kobitBtc, "kobit", symbol, exchangeRate, coinIndex.getPriceKrw()));

        }

        ResponseEntity<String> bitfinexBtc
                = restTemplate.getForEntity(CRYPTOWATCH_API_BASE_URL + "/bitfinex/" + symbol.toLowerCase() + "usd/summary", String.class);
        coinIdexes.add(coinIndexUtils.getCoinIndexForCryptowatch(bitfinexBtc, "bitfinex", symbol, exchangeRate, "USD", null));


//        if ("BTC".equals(symbol)) {
//            ResponseEntity<String> bitflyerBtc
//                    = restTemplate.getForEntity(CRYPTOWATCH_API_BASE_URL + "/bitflyer/" + binanceSymbol + "usd/summary", String.class);
//            coinIdexes.add(coinIndexUtils.getCoinIndexForCryptowatch(bitflyerBtc, "bitflyer", symbol, exchangeRate, "USD", null));
//        } else if ("ETH".equals(symbol)) {
//            ResponseEntity<String> bitflyerBtc
//                    = restTemplate.getForEntity(CRYPTOWATCH_API_BASE_URL + "/bitflyer/" + binanceSymbol + "btc/summary", String.class);
//            coinIdexes.add(coinIndexUtils.getCoinIndexForCryptowatch(bitflyerBtc, "bitflyer", symbol, exchangeRate, "BTC", null));
//        }
//
//
//        ResponseEntity<String> poloniexBtc
//                = restTemplate.getForEntity(CRYPTOWATCH_API_BASE_URL + "/poloniex/" + binanceSymbol + "usdt/summary", String.class);
//        coinIdexes.add(coinIndexUtils.getCoinIndexForCryptowatch(poloniexBtc, "poloniex", symbol, exchangeRate, "USD", null));
//
//        ResponseEntity<String> bittrexBtc
//                = restTemplate.getForEntity(CRYPTOWATCH_API_BASE_URL + "/bittrex/" + binanceSymbol + "usd/summary", String.class);
//        coinIdexes.add(coinIndexUtils.getCoinIndexForCryptowatch(bittrexBtc, "bittrex", symbol, exchangeRate, "USD", null));
//
//        ResponseEntity<String> okcoinBtc
//                = restTemplate.getForEntity(CRYPTOWATCH_API_BASE_URL + "/okcoin/" + binanceSymbol + "usd/summary", String.class);
//        coinIdexes.add(coinIndexUtils.getCoinIndexForCryptowatch(okcoinBtc, "okcoin", symbol, exchangeRate, "USD", null));
//
//        ResponseEntity<String> huobiBtc
//                = restTemplate.getForEntity(CRYPTOWATCH_API_BASE_URL + "/huobi/" + binanceSymbol + "usdt/summary", String.class);
//        coinIdexes.add(coinIndexUtils.getCoinIndexForCryptowatch(huobiBtc, "huobi", symbol, exchangeRate, "USD", null));

        coinIdexes.add(coinIndex);
        coinIndexList.setCoinIndexes(coinIdexes);
        coinIndexList.setSymbol(symbol);
        return coinIndexList;
    }


    //    @Cacheable("coinindex.indexes")
    public CoinIndexList makeCoinIndexPan(String symbol) {
        CoinIndexList coinIndexList = new CoinIndexList();
        List<CoinIndex> coinIdexes = new ArrayList<>();
        log.debug("]-----] makeCoinIndex::symbol [-----[ {}", symbol);
//        if ("BCH".equals(symbol)) {
//            symbol = "bcc";
//        }

        ResponseEntity<String> coinpan
                = restTemplate.getForEntity("https://coinpan.com/files/currency/update.json?ts=" + LocalDateTime.now(ZoneId.of("Asia/Seoul")).toEpochSecond(ZoneOffset.UTC), String.class);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = null;
        String[] exchanges = {"bithumb", "upbit", "coinone", "kobit", "bitfinex", "bitflyer", "poloniex", "bittrex", "okcoin", "huobi"};
        try {
            root = mapper.readTree(coinpan.getBody());
            if (root != null) {
                JsonNode result = root.get("prices");
//                log.debug("]-----] makeCoinIndex::result [-----[ {}", result);
                for (String exchange : exchanges) {

                    if (result.has(exchange)) {
                        JsonNode excangeNode = result.get(exchange);
                        if (excangeNode.has(symbol)) {

//                            log.debug("]-----] makeCoinIndex::bithumbBtc [-----[ {}", result.get(exchange).get(symbol));
                            JsonNode excangeNodeSub = excangeNode.get(symbol);
                            if (excangeNodeSub.get("available").booleanValue()) {
                                CoinIndex coinIndexPan = new CoinIndex();
                                coinIndexPan.setExchangeName(exchange);
                                coinIndexPan.setPriceKrw(new BigDecimal(excangeNodeSub.get("now_price").asDouble()).setScale(0, RoundingMode.FLOOR));
                                coinIndexPan.setPriceUsd(excangeNodeSub.get("now_price_usd").decimalValue().setScale(2, RoundingMode.FLOOR));
                                coinIndexPan.setVariationValueForDay(new BigDecimal(excangeNodeSub.get("diff_24hr").asDouble()).setScale(0, RoundingMode.FLOOR));
                                coinIndexPan.setVariationRateForDay(new BigDecimal(excangeNodeSub.get("diff_24hr_percent").asDouble()).setScale(2, RoundingMode.FLOOR));
                                coinIndexPan.setGapKrw(excangeNodeSub.get("korea_premium").decimalValue());
                                coinIndexPan.setGapKrwRate(excangeNodeSub.get("korea_premium_percent").decimalValue().setScale(2, RoundingMode.FLOOR));

                                coinIndexPan.setTotalExcangeForDay(new BigDecimal(excangeNodeSub.get("units_traded").asDouble()).setScale(2, RoundingMode.FLOOR));
//                                log.debug("]-----] makeCoinIndex::coinIndexPan [-----[ {}", coinIndexPan);
                                coinIdexes.add(coinIndexPan);
                            }
//                            log.debug("]-----] makeCoinIndex::now_price [-----[ {}", excangeNodeSub.get("now_price"));
//                            log.debug("]-----] makeCoinIndex::now_price [-----[ {}", excangeNodeSub.get("now_price").toString());

                        }
                    }


                }

            }
        } catch (IOException e) {
            e.printStackTrace();
            log.error("]-----] getCoinIndexForCryptowatch error [-----[ {}", e);
        }


        coinIndexList.setCoinIndexes(coinIdexes);
        coinIndexList.setSymbol(symbol);
        return coinIndexList;
    }


    public Mono<CoinIndexList> makeCoinIndexPan(String symbol, Long memberId) {
        CoinIndexList coinIndexList = new CoinIndexList();
        List<CoinIndex> coinIdexes = new ArrayList<>();
        log.debug("]-----] makeCoinIndex::symbol [-----[ {}", symbol);

        ResponseEntity<String> coinpan
                = restTemplate.getForEntity("https://coinpan.com/files/currency/update.json?ts=" + LocalDateTime.now(ZoneId.of("Asia/Seoul")).toEpochSecond(ZoneOffset.UTC), String.class);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = null;

        String[] exchanges = {"bithumb", "upbit", "coinone", "kobit", "bitfinex", "bitflyer", "poloniex", "bittrex", "okcoin", "huobi"};

        List<MemberCoinIndexExchange> memberCoinIndexExchanges = memberCoinIndexExchangeRepository.findAllByMemberIdAndSelected(memberId, true);
        if (memberCoinIndexExchanges != null) {
            if (memberCoinIndexExchanges.size() > 0) {
                exchanges = new String[memberCoinIndexExchanges.size()];
                for (int i = 0; i < memberCoinIndexExchanges.size(); i++) {
                    exchanges[i] = memberCoinIndexExchanges.get(i).getExchangeCode();
                }
            }
        }
        try {
            root = mapper.readTree(coinpan.getBody());
            if (root != null) {
                JsonNode result = root.get("prices");
//                log.debug("]-----] makeCoinIndex::result [-----[ {}", result);
                for (String exchange : exchanges) {

                    if (result.has(exchange)) {
                        JsonNode excangeNode = result.get(exchange);
                        if (excangeNode.has(symbol)) {

//                            log.debug("]-----] makeCoinIndex::bithumbBtc [-----[ {}", result.get(exchange).get(symbol));
                            JsonNode excangeNodeSub = excangeNode.get(symbol);
                            if (excangeNodeSub.get("available").booleanValue()) {
                                CoinIndex coinIndexPan = new CoinIndex();
                                coinIndexPan.setExchangeName(exchange);
                                coinIndexPan.setPriceKrw(new BigDecimal(excangeNodeSub.get("now_price").asDouble()).setScale(0, RoundingMode.FLOOR));
                                coinIndexPan.setPriceUsd(excangeNodeSub.get("now_price_usd").decimalValue().setScale(2, RoundingMode.FLOOR));
                                coinIndexPan.setVariationValueForDay(new BigDecimal(excangeNodeSub.get("diff_24hr").asDouble()).setScale(0, RoundingMode.FLOOR));
                                coinIndexPan.setVariationRateForDay(new BigDecimal(excangeNodeSub.get("diff_24hr_percent").asDouble()).setScale(2, RoundingMode.FLOOR));
                                coinIndexPan.setGapKrw(excangeNodeSub.get("korea_premium").decimalValue());
                                coinIndexPan.setGapKrwRate(excangeNodeSub.get("korea_premium_percent").decimalValue().setScale(2, RoundingMode.FLOOR));

                                coinIndexPan.setTotalExcangeForDay(new BigDecimal(excangeNodeSub.get("units_traded").asDouble()).setScale(2, RoundingMode.FLOOR));
//                                log.debug("]-----] makeCoinIndex::coinIndexPan [-----[ {}", coinIndexPan);
                                coinIdexes.add(coinIndexPan);
                            }
//                            log.debug("]-----] makeCoinIndex::now_price [-----[ {}", excangeNodeSub.get("now_price"));
//                            log.debug("]-----] makeCoinIndex::now_price [-----[ {}", excangeNodeSub.get("now_price").toString());

                        }
                    }


                }

            }
        } catch (IOException e) {
            e.printStackTrace();
            log.error("]-----] getCoinIndexForCryptowatch error [-----[ {}", e);
        }


        coinIndexList.setCoinIndexes(coinIdexes);
        coinIndexList.setSymbol(symbol);
        return Mono.justOrEmpty(coinIndexList);
    }

}
