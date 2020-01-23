/**
 *
 * Asynchronously loads the component for FindMyInfo
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
