/**
 * Transportation and getting-around info for Greece.
 */

const move = {
  gettingThere: [
    {
      id: 'move-fly-ath',
      mode: 'flight',
      title: 'Flying to Athens (ATH)',
      description: 'Athens International Airport (Eleftherios Venizelos) is the main hub. Direct flights from most major US and European cities. Metro line 3 connects the airport to central Athens in 40 minutes.',
      tips: ['Metro runs every 30 min to Syntagma/Monastiraki', 'Airport Express bus X95 is a cheaper alternative (runs 24/7)'],
    },
    {
      id: 'move-fly-jtr',
      mode: 'flight',
      title: 'Flying to Santorini (JTR)',
      description: 'Santorini (Thira) Airport has domestic flights from Athens (~45 min) and seasonal international routes. Small airport that gets very busy in summer.',
      tips: ['Book Athens-Santorini flights early in summer', 'Airport is 6 km from Fira — taxis and buses available'],
    },
    {
      id: 'move-ferry-santorini',
      mode: 'ferry',
      title: 'Ferry to Santorini',
      description: 'High-speed ferries from Piraeus (Athens) to Santorini take 5-8 hours depending on the route. Blue Star Ferries and SeaJets are the main operators.',
      tips: ['Book deck class for budget, business class for comfort', 'The scenic approach to the caldera is unforgettable'],
    },
  ],

  gettingAround: [
    {
      id: 'move-rental-car',
      mode: 'car',
      title: 'Rental Car (Peloponnese)',
      description: 'Essential for the Nafplio/Peloponnese leg. Greek highways are modern; secondary roads can be narrow. Pick up in Athens, drop off in Athens before flying to Santorini.',
      tips: ['Book automatic transmission in advance — most Greek cars are manual', 'Olympia day trip is ~2.5 hours each way from Nafplio', 'Fuel is more expensive than the US — budget accordingly'],
      estimatedCost: '\u20AC35-60/day',
    },
    {
      id: 'move-atv-santorini',
      mode: 'ATV/scooter',
      title: 'ATV or Scooter (Santorini)',
      description: 'Popular way to explore Santorini independently. Roads are paved but can be busy. An ATV handles the hills well.',
      tips: ['International license required for scooters over 50cc', 'Wear sunscreen — there is no shade on an ATV', 'Helmets are required and enforced'],
      estimatedCost: '\u20AC25-40/day',
    },
    {
      id: 'move-bus-athens',
      mode: 'bus',
      title: 'Athens Metro & Bus',
      description: 'Athens has a modern metro (3 lines), extensive bus network, and a tram. The metro covers all major tourist areas including Acropolis, Syntagma, and Monastiraki.',
      tips: ['Buy a 5-day tourist ticket for unlimited rides', 'Metro stations at Syntagma and Acropolis have archaeological displays', 'Validate your ticket before boarding'],
      estimatedCost: '\u20AC1.20 per ride / \u20AC9 for 5-day pass',
    },
    {
      id: 'move-bus-santorini',
      mode: 'bus',
      title: 'KTEL Bus (Santorini)',
      description: 'Local bus network connects Fira to Oia, Kamari, Perissa, Akrotiri, and the airport. Fira is the central hub.',
      tips: ['Buses run every 30 min to Oia in summer', 'Last buses can be early — check schedules', 'Exact change helpful'],
      estimatedCost: '\u20AC1.80-2.50 per ride',
    },
    {
      id: 'move-taxi',
      mode: 'taxi',
      title: 'Taxis & Transfers',
      description: 'Yellow taxis in Athens are metered. In Santorini, pre-book transfers as taxis are scarce. Use the BEAT app for Athens ride-hailing.',
      tips: ['Athens airport to city center ~\u20AC40 (flat rate)', 'Always confirm the meter is running in Athens', 'Santorini taxis: agree on price before departure'],
      estimatedCost: '\u20AC5-50 depending on distance',
    },
    {
      id: 'move-water-taxi',
      mode: 'boat',
      title: 'Water Taxis & Day Boats (Santorini)',
      description: 'Small boats from Amoudi Bay to Thirassia island, and excursion boats to the volcano and hot springs from the Old Port in Fira.',
      tips: ['Book volcano/hot springs tours a day ahead in peak season', 'Amoudi Bay to Thirassia ~\u20AC10 each way', 'Wear water shoes for the hot springs'],
      estimatedCost: '\u20AC10-50 per trip',
    },
  ],
};

export default move;
