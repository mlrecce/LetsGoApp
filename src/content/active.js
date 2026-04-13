/**
 * Active destination pointer.
 *
 * This is the ONLY file the UI imports from. To switch destinations,
 * change the import below to point at a different content folder.
 *
 * e.g.  import destination from './kyoto';
 */

import destination from './madeira';

export default destination;
export const { trip, see, activities, shop, sleep, move } = destination;
