/**
 *
 * Asynchronously loads the component for ChatPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
