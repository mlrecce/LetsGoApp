/**
 * Madeira, Portugal — destination content bundle.
 *
 * Every destination folder must export this exact shape.
 * The UI layer imports from `../content/active` which points here.
 */

import trip from './trip';
import see from './see';
import activities from './activities';
import shop from './shop';
import sleep from './sleep';
import move from './move';

const madeira = {
  trip,
  see,
  activities,
  shop,
  sleep,
  move,
};

export default madeira;
export { trip, see, activities, shop, sleep, move };
