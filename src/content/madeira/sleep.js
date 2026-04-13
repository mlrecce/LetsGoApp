/**
 * Accommodation options in Madeira.
 *
 * Includes the booked hotel (isBooked: true) plus alternative / recommended
 * places for future trips or day-visit interest.
 */

const sleep = [
  {
    id: 'sleep-reids',
    name: 'Belmond Reid\'s Palace',
    category: 'luxury',
    isBooked: true,
    description: 'Iconic cliffside hotel since 1891, with subtropical gardens, an ocean-view spa, and impeccable service. Winston Churchill\'s favourite Madeira retreat.',
    address: 'Estrada Monumental 139, 9000-098 Funchal',
    coordinates: { lat: 32.6375, lng: -16.9344 },
    priceRange: '€€€€',
    amenities: ['Pool', 'Spa', 'Fine dining', 'Garden', 'Ocean view'],
    image: null,
  },
  {
    id: 'sleep-savoy',
    name: 'Savoy Palace',
    category: 'luxury',
    isBooked: false,
    description: 'Modern five-star with a rooftop infinity pool, multiple restaurants, and a large spa in the hotel zone.',
    address: 'Avenida do Infante 25, 9004-542 Funchal',
    coordinates: { lat: 32.6389, lng: -16.9306 },
    priceRange: '€€€€',
    amenities: ['Rooftop pool', 'Spa', 'Multiple restaurants', 'Kids club'],
    image: null,
  },
  {
    id: 'sleep-quinta',
    name: 'Quinta da Casa Branca',
    category: 'boutique',
    isBooked: false,
    description: 'Boutique hotel set in a historic banana plantation estate with lush gardens and a contemporary wing.',
    address: 'Rua da Casa Branca 7, 9000-088 Funchal',
    coordinates: { lat: 32.6408, lng: -16.9358 },
    priceRange: '€€€',
    amenities: ['Garden', 'Pool', 'Restaurant', 'Quiet location'],
    image: null,
  },
];

export default sleep;
