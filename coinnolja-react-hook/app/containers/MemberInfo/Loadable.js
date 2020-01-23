/**
 *
 * Asynchronously loads the component for MemberInfo
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
