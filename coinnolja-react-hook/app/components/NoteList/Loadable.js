/**
 *
 * Asynchronously loads the component for Notelist
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
