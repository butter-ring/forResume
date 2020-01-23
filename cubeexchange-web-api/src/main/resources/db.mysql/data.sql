INSERT INTO cubeexchange.cn_role (active, created_at, updated_at, role) VALUES (1, 1549119313348, 1549119313348, 'ROLE_GUEST');
INSERT INTO cubeexchange.cn_role (active, created_at, updated_at, role) VALUES (1, 1549119313357, 1549119313357, 'ROLE_USER');


INSERT INTO cubeexchange.account ( active, created_at, updated_at, account_balance, account_type, available_balance, currency, maker_fee_rate, member_id, taker_fee_rate) VALUES ( 1, null, null, 10.000000000000, '0', 9.999099100000, 'ETH', 0.10, 5, 0.10);
INSERT INTO cubeexchange.account ( active, created_at, updated_at, account_balance, account_type, available_balance, currency, maker_fee_rate, member_id, taker_fee_rate) VALUES ( 1, null, null, 10.000000000000, '0', 10.000000000000, 'ETH', 0.10, 6, 0.10);

INSERT INTO cubeexchange.commodity ( active, created_at, updated_at, minimum_price, previous_closing_index, price_currency, price_limit, symbol, trade_state) VALUES (1, null, null, null, null, 'ETH', null, 'CUBE', 1);