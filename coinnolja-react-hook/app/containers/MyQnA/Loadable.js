/**
 *
 * Asynchronously loads the component for MyQnA
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
