/**
 * Things to see in Madeira.
 *
 * Each item follows a standard POI (point-of-interest) shape that the
 * SeeScreen component renders as a scrollable card list.
 */

const see = [
  {
    id: 'see-cabo-girao',
    name: 'Cabo Girão Skywalk',
    category: 'viewpoint',
    description: 'One of the highest sea cliffs in Europe at 580 m, with a glass-floor skywalk offering vertigo-inducing views of the terraced vineyards below.',
    coordinates: { lat: 32.6569, lng: -17.0097 },
    image: null,
    tips: ['Go early morning to avoid crowds', 'Free entry'],
  },
  {
    id: 'see-monte-palace',
    name: 'Monte Palace Tropical Garden',
    category: 'garden',
    description: 'A lush 70,000 m² garden above Funchal with exotic plants, koi ponds, and a tile collection spanning six centuries.',
    coordinates: { lat: 32.6681, lng: -16.9022 },
    image: null,
    tips: ['Take the cable car up from Funchal', 'Allow 2-3 hours'],
  },
  {
    id: 'see-pico-ruivo',
    name: 'Pico Ruivo',
    category: 'nature',
    description: 'Madeira\'s highest peak at 1,862 m. Accessible via the iconic PR1 trail from Pico do Arieiro with stunning ridge-line views above the clouds.',
    coordinates: { lat: 32.7603, lng: -16.9453 },
    image: null,
    tips: ['Start before sunrise at Pico do Arieiro', 'Bring layers — it\'s cold at the top'],
  },
  {
    id: 'see-zona-velha',
    name: 'Zona Velha (Old Town)',
    category: 'culture',
    description: 'Funchal\'s historic quarter with cobblestone streets, painted doors by local artists, and a lively restaurant scene.',
    coordinates: { lat: 32.6450, lng: -16.9020 },
    image: null,
    tips: ['Best in the evening', 'Look for the painted doors along Rua de Santa Maria'],
  },
  {
    id: 'see-porto-moniz',
    name: 'Porto Moniz Natural Pools',
    category: 'nature',
    description: 'Volcanic rock pools filled by the Atlantic on the northwest coast — a natural swimming experience unlike any other.',
    coordinates: { lat: 32.8667, lng: -17.1667 },
    image: null,
    tips: ['Bring water shoes', 'There are two pool complexes — the natural ones are free'],
  },
  {
    id: 'see-mercado',
    name: 'Mercado dos Lavradores',
    category: 'market',
    description: 'Funchal\'s vibrant farmers\' market filled with tropical fruit, fresh flowers, and a lively fish hall on the lower level.',
    coordinates: { lat: 32.6486, lng: -16.9053 },
    image: null,
    tips: ['Go on a weekday morning', 'Try passion fruit and custard apple samples'],
  },
];

export default see;
