/**
 * CONTENT SCHEMA REFERENCE
 *
 * Every content item across all tabs (see, activities, shop, sleep, eat)
 * follows this unified shape. Not all fields are required — only `id`,
 * `name`, `tab`, and `description` are mandatory.
 *
 * {
 *   id:            string     — unique across the whole destination
 *   tab:           string     — which tab owns this item: 'see'|'activities'|'shop'|'sleep'|'eat'|'move'
 *   name:          string     — display name
 *   description:   string     — 1-3 sentence summary
 *
 *   // Rich fields (optional)
 *   photos:        string[]   — array of image URIs or require() paths
 *   heroPhoto:     any        — primary image (require or URI)
 *   category:      string     — sub-type (e.g. 'hiking', 'luxury', 'market')
 *   tags:          string[]   — searchable tags
 *
 *   // Location
 *   address:       string
 *   coordinates:   { lat: number, lng: number }
 *   mapUrl:        string     — deep link to Google/Apple Maps
 *
 *   // Practical info
 *   hours:         string     — human-readable hours, e.g. '9am – 6pm daily'
 *   closedOn:      string     — e.g. 'Mondays'
 *   phone:         string
 *   website:       string
 *   costEstimate:  string     — '$' to '$$$$' scale
 *   costNote:      string     — e.g. 'Free entry' or '€15-35 per person'
 *   duration:      string     — e.g. '2 hours'
 *   difficulty:    string     — for activities: 'easy'|'moderate'|'hard'
 *   bookingRequired: boolean
 *   bookingUrl:    string
 *
 *   // Tips
 *   tips:          string[]   — insider tips shown on the detail screen
 *
 *   // Planning metadata (set by the app, not content authors)
 *   _selectable:   boolean    — defaults to true; false hides the "add to day" button
 * }
 */

export const COST_SCALE = {
  FREE: 'Free',
  $: '$',
  $$: '$$',
  $$$: '$$$',
  $$$$: '$$$$',
};

export const TABS = ['see', 'activities', 'shop', 'sleep', 'eat', 'move'];
