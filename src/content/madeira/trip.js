/**
 * Trip overview data for Madeira, Portugal.
 *
 * This file defines the high-level trip details shown on the landing page:
 * destination metadata, travel dates, flight legs, and hotel bookings.
 *
 * SCHEMA CONTRACT — every destination must export the same shape so the
 * UI layer never has to change when the content folder is swapped.
 */

const trip = {
  destination: {
    name: 'Madeira',
    country: 'Portugal',
    tagline: 'The Pearl of the Atlantic',
    heroImage: 'https://images.unsplash.com/photo-1510739628590-0c601822e0a0?w=1200&q=80',
    flag: '🇵🇹',
  },

  dates: {
    start: '2026-06-15',
    end: '2026-06-22',
    nights: 7,
  },

  flights: [
    {
      id: 'flight-out',
      direction: 'outbound',
      airline: 'TAP Air Portugal',
      flightNumber: 'TP 1691',
      departure: { airport: 'LIS', city: 'Lisbon', time: '2026-06-15T08:30' },
      arrival:   { airport: 'FNC', city: 'Funchal', time: '2026-06-15T10:15' },
      confirmation: '',  // fill with booking ref
    },
    {
      id: 'flight-return',
      direction: 'return',
      airline: 'TAP Air Portugal',
      flightNumber: 'TP 1694',
      departure: { airport: 'FNC', city: 'Funchal', time: '2026-06-22T18:00' },
      arrival:   { airport: 'LIS', city: 'Lisbon', time: '2026-06-22T19:40' },
      confirmation: '',
    },
  ],

  hotels: [
    {
      id: 'hotel-main',
      name: 'Belmond Reid\'s Palace',
      address: 'Estrada Monumental 139, 9000-098 Funchal',
      checkIn: '2026-06-15',
      checkOut: '2026-06-22',
      nights: 7,
      confirmation: '',
      coordinates: { lat: 32.6375, lng: -16.9344 },
      image: null,  // optional property photo
    },
  ],

  itinerary: [
    { day: 1, date: '2026-06-15', title: 'Arrival & Funchal Old Town',     highlights: ['Check in', 'Explore Zona Velha', 'Welcome dinner'] },
    { day: 2, date: '2026-06-16', title: 'Levada Walk & Monte',            highlights: ['Levada dos Balcões', 'Monte Palace Garden', 'Toboggan ride'] },
    { day: 3, date: '2026-06-17', title: 'West Coast Drive',               highlights: ['Cabo Girão skywalk', 'Porto Moniz natural pools'] },
    { day: 4, date: '2026-06-18', title: 'Pico do Arieiro Sunrise Hike',   highlights: ['Summit sunrise', 'PR1 trail to Pico Ruivo'] },
    { day: 5, date: '2026-06-19', title: 'Beach & Wine Day',               highlights: ['Prainha beach', 'Blandy\'s Wine Lodge tour'] },
    { day: 6, date: '2026-06-20', title: 'São Vicente & Laurel Forest',    highlights: ['Volcanic caves', 'UNESCO laurel forest walk'] },
    { day: 7, date: '2026-06-21', title: 'Market, Spa & Farewell Dinner',  highlights: ['Mercado dos Lavradores', 'Spa afternoon', 'Sunset dinner'] },
  ],
};

export default trip;
