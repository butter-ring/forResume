/**
 *
 * Asynchronously loads the component for CoinMarkets
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
