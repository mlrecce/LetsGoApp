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
    {
      id: 'move-fly-her',
      mode: 'flight',
      title: 'Flying to Heraklion (HER)',
      description: 'Nikos Kazantzakis Airport is Crete\'s main gateway. Domestic flights from Athens take approximately 50 minutes, with frequent daily service from Aegean Airlines and Olympic Air. Seasonal international charters also fly direct.',
      tips: ['Flights from Athens run multiple times daily year-round', 'Airport is just 5 km east of Heraklion city center', 'Book early in peak summer — seats fill up fast'],
    },
    {
      id: 'move-transfer-nafplio-ath',
      mode: 'private transfer',
      title: 'Private Transfer Nafplio to Athens Airport',
      description: 'A 2-hour scenic drive from Nafplio through the Peloponnese countryside to Athens International Airport. A convenient option for connecting the Nafplio leg of the itinerary to your onward flight to Crete or the islands.',
      tips: ['Book in advance through your hotel or a transfer service like Welcome Pickups', 'Route passes near the Corinth Canal — ask the driver for a quick photo stop', 'Early morning departures recommended to avoid Athens traffic'],
    },
  ],

  gettingAround: [
    {
      id: 'move-rental-car',
      mode: 'car',
      title: 'Rental Car (Peloponnese)',
      description: 'Essential for the Nafplio/Peloponnese leg. Greek highways are modern; secondary roads can be narrow. Pick up in Athens, drop off in Athens before flying to Santorini.',
      tips: ['Book automatic transmission in advance — most Greek cars are manual', 'Olympia day trip is ~2.5 hours each way from Nafplio', 'Fuel is more expensive than the US — budget accordingly'],
      estimatedCost: '€35-60/day',
    },
    {
      id: 'move-atv-santorini',
      mode: 'ATV/scooter',
      title: 'ATV or Scooter (Santorini)',
      description: 'Popular way to explore Santorini independently. Roads are paved but can be busy. An ATV handles the hills well.',
      tips: ['International license required for scooters over 50cc', 'Wear sunscreen — there is no shade on an ATV', 'Helmets are required and enforced'],
      estimatedCost: '€25-40/day',
    },
    {
      id: 'move-bus-athens',
      mode: 'bus',
      title: 'Athens Metro & Bus',
      description: 'Athens has a modern metro (3 lines), extensive bus network, and a tram. The metro covers all major tourist areas including Acropolis, Syntagma, and Monastiraki.',
      tips: ['Buy a 5-day tourist ticket for unlimited rides', 'Metro stations at Syntagma and Acropolis have archaeological displays', 'Validate your ticket before boarding'],
      estimatedCost: '€1.20 per ride / €9 for 5-day pass',
    },
    {
      id: 'move-bus-santorini',
      mode: 'bus',
      title: 'KTEL Bus (Santorini)',
      description: 'Local bus network connects Fira to Oia, Kamari, Perissa, Akrotiri, and the airport. Fira is the central hub.',
      tips: ['Buses run every 30 min to Oia in summer', 'Last buses can be early — check schedules', 'Exact change helpful'],
      estimatedCost: '€1.80-2.50 per ride',
    },
    {
      id: 'move-taxi',
      mode: 'taxi',
      title: 'Taxis & Transfers',
      description: 'Yellow taxis in Athens are metered. In Santorini, pre-book transfers as taxis are scarce. Use the BEAT app for Athens ride-hailing.',
      tips: ['Athens airport to city center ~€40 (flat rate)', 'Always confirm the meter is running in Athens', 'Santorini taxis: agree on price before departure'],
      estimatedCost: '€5-50 depending on distance',
    },
    {
      id: 'move-water-taxi',
      mode: 'boat',
      title: 'Water Taxis & Day Boats (Santorini)',
      description: 'Small boats from Amoudi Bay to Thirassia island, and excursion boats to the volcano and hot springs from the Old Port in Fira.',
      tips: ['Book volcano/hot springs tours a day ahead in peak season', 'Amoudi Bay to Thirassia ~€10 each way', 'Wear water shoes for the hot springs'],
      estimatedCost: '€10-50 per trip',
    },
    {
      id: 'move-bus-heraklion',
      mode: 'bus',
      title: 'Heraklion City Bus (Crete)',
      description: 'KTEL buses cover Heraklion city and the surrounding area, including nearby beaches like Ammoudara and Karteros. Routes also connect to major sites and coastal towns along the northern coast.',
      tips: ['Main bus station (Bus Station A) is near the harbor', 'Buses to Knossos depart frequently from the city center', 'Pick up a route map at the station — signage can be limited'],
      estimatedCost: '€1.50-2.50 per ride',
    },
    {
      id: 'move-taxi-heraklion',
      mode: 'taxi',
      title: 'Taxi in Heraklion (Crete)',
      description: 'Taxis are readily available in Heraklion for getting to Knossos (~20 min) and around town. Metered fares apply within the city. Convenient for reaching archaeological sites and the airport.',
      tips: ['Heraklion to Knossos is a short ~20 min ride', 'Taxi ranks at the airport, Eleftherias Square, and the port', 'Agree on fare for longer trips outside the city — meters may not apply'],
      estimatedCost: '€8-20 depending on destination',
    },
  ],
};

export default move;
