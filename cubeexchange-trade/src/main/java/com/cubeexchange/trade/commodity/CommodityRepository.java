package com.cubeexchange.trade.commodity;

import org.springframework.data.repository.CrudRepository;


public interface CommodityRepository extends CrudRepository<Commodity, Long> {
    Commodity findBySymbolAndActive(String symbol, int active);
}
