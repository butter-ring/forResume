/**
 *
 * Asynchronously loads the component for BoardPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
