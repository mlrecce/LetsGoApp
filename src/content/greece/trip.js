/**
 * Trip overview data for Greece.
 *
 * 2-week itinerary: Athens (4 nights) -> Nafplio (4 nights) -> Crete (3 nights) -> Santorini (3 nights)
 */

const trip = {
  destination: {
    name: 'Greece',
    country: 'Greece',
    tagline: 'Where Myth Meets the Mediterranean',
    heroImage: 'https://images.unsplash.com/photo-1503152394-c571994fd383?w=1200&q=80',
    flag: '\u{1F1EC}\u{1F1F7}',
  },

  dates: {
    start: '2026-06-14',
    end: '2026-06-28',
    nights: 14,
  },

  flights: [
    {
      id: 'flight-out',
      direction: 'outbound',
      airline: 'Aegean Airlines',
      flightNumber: 'A3 601',
      departure: { airport: 'JFK', city: 'New York', time: '2026-06-13T22:30' },
      arrival:   { airport: 'ATH', city: 'Athens', time: '2026-06-14T14:45' },
      confirmation: '',
    },
    {
      id: 'flight-ath-her',
      direction: 'internal',
      airline: 'Aegean Airlines',
      flightNumber: 'A3 305',
      departure: { airport: 'ATH', city: 'Athens', time: '2026-06-22T13:00' },
      arrival:   { airport: 'HER', city: 'Heraklion', time: '2026-06-22T13:50' },
      confirmation: '',
    },
    {
      id: 'flight-her-jtr',
      direction: 'internal',
      airline: 'Aegean Airlines',
      flightNumber: 'A3 357',
      departure: { airport: 'HER', city: 'Heraklion', time: '2026-06-25T09:30' },
      arrival:   { airport: 'JTR', city: 'Santorini', time: '2026-06-25T10:20' },
      confirmation: '',
    },
    {
      id: 'flight-return',
      direction: 'return',
      airline: 'Aegean Airlines',
      flightNumber: 'A3 600',
      departure: { airport: 'JTR', city: 'Santorini', time: '2026-06-28T10:00' },
      arrival:   { airport: 'JFK', city: 'New York', time: '2026-06-28T15:30' },
      confirmation: '',
    },
  ],

  hotels: [
    {
      id: 'hotel-athens',
      name: 'Hotel Grande Bretagne',
      address: 'Vasileos Georgiou A 1, Syntagma Square, Athens 105 64',
      checkIn: '2026-06-14',
      checkOut: '2026-06-18',
      nights: 4,
      confirmation: '',
      coordinates: { lat: 37.9755, lng: 23.7348 },
      image: null,
    },
    {
      id: 'hotel-nafplio',
      name: 'Amphitryon Hotel',
      address: 'Spiliadou 1, Nafplio 211 00',
      checkIn: '2026-06-18',
      checkOut: '2026-06-22',
      nights: 4,
      confirmation: '',
      coordinates: { lat: 37.5673, lng: 22.7972 },
      image: null,
    },
    {
      id: 'hotel-crete',
      name: 'GDM Megaron Luxury Hotel',
      address: 'Doukos Beaufort 9, Heraklion 712 02, Crete',
      checkIn: '2026-06-22',
      checkOut: '2026-06-25',
      nights: 3,
      confirmation: '',
      coordinates: { lat: 35.3387, lng: 25.1335 },
      image: null,
    },
    {
      id: 'hotel-santorini',
      name: 'Canaves Oia Suites',
      address: 'Oia, Santorini 847 02',
      checkIn: '2026-06-25',
      checkOut: '2026-06-28',
      nights: 3,
      confirmation: '',
      coordinates: { lat: 36.4618, lng: 25.3753 },
      image: null,
    },
  ],

  itinerary: [
    // Athens (4 nights)
    { day: 1,  date: '2026-06-14', title: 'Arrival in Athens',                  highlights: ['Check in at Syntagma', 'Evening stroll through Plaka', 'Rooftop dinner with Acropolis view'] },
    { day: 2,  date: '2026-06-15', title: 'Acropolis & Ancient Athens',          highlights: ['Acropolis & Parthenon', 'Acropolis Museum', 'Ancient Agora & Hephaestus Temple'] },
    { day: 3,  date: '2026-06-16', title: 'Museums & Monastiraki',              highlights: ['National Archaeological Museum', 'Monastiraki Flea Market', 'Psyrri neighborhood dinner'] },
    { day: 4,  date: '2026-06-17', title: 'Day Trip to Delphi',                 highlights: ['Drive to Delphi', 'Temple of Apollo & Oracle', 'Delphi Museum', 'Arachova village'] },
    // Nafplio (4 nights)
    { day: 5,  date: '2026-06-18', title: 'Drive to Nafplio',                   highlights: ['Corinth Canal stop', 'Arrive Nafplio', 'Explore Old Town & waterfront'] },
    { day: 6,  date: '2026-06-19', title: 'Mycenae & Epidaurus',                highlights: ['Lion Gate at Mycenae', 'Treasury of Atreus', 'Ancient Theatre of Epidaurus'] },
    { day: 7,  date: '2026-06-20', title: 'Olympia Day Trip',                   highlights: ['Ancient Olympia', 'Stadium & Temple of Zeus', 'Archaeological Museum'] },
    { day: 8,  date: '2026-06-21', title: 'Palamidi & Nafplio Beaches',         highlights: ['Climb Palamidi Fortress (999 steps)', 'Arvanitia beach', 'Sunset at Bourtzi'] },
    // Crete (3 nights)
    { day: 9,  date: '2026-06-22', title: 'Travel Day: Nafplio to Crete',       highlights: ['Private transfer to Athens Airport', 'Flight to Heraklion', 'Stroll Heraklion harbor', 'Dinner in old town'] },
    { day: 10, date: '2026-06-23', title: 'Knossos & Heraklion Museum',         highlights: ['Knossos Palace guided tour', 'Heraklion Archaeological Museum', 'Lions Square & Morosini Fountain'] },
    { day: 11, date: '2026-06-24', title: 'Beaches & Old Town',                 highlights: ['Morning beach swim', 'Explore Heraklion old town', 'Venetian Fortress (Koules)', 'Harbor-side dinner'] },
    // Santorini (3 nights)
    { day: 12, date: '2026-06-25', title: 'Fly to Santorini',                   highlights: ['Morning flight to Santorini', 'Caldera-view lunch in Fira', 'Oia sunset'] },
    { day: 13, date: '2026-06-26', title: 'Akrotiri & Caldera Walk',            highlights: ['Akrotiri archaeological site', 'Red Beach', 'Fira-to-Oia caldera walk'] },
    { day: 14, date: '2026-06-27', title: 'Farewell Day',                       highlights: ['Amoudi Bay swim', 'Oia shopping', 'Final sunset dinner'] },
  ],
};

export default trip;
