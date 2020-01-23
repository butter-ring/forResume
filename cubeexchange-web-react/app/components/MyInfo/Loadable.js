/**
 *
 * Asynchronously loads the component for MyInfo
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
