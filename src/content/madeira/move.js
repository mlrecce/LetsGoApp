/**
 * Transportation and getting-around info for Madeira.
 */

const move = {
  gettingThere: [
    {
      id: 'move-fly',
      mode: 'flight',
      title: 'Flying to Funchal (FNC)',
      description: 'Cristiano Ronaldo International Airport is the main gateway. Direct flights from Lisbon (~1h45), Porto, London, and several European cities. The runway approach over the ocean is famously scenic.',
      tips: ['Book window seat on the left side for best landing views', 'TAP and easyJet have the most routes'],
    },
    {
      id: 'move-ferry',
      mode: 'ferry',
      title: 'Ferry from Porto Santo',
      description: 'Lobo Marinho ferry connects Porto Santo island to Funchal in about 2.5 hours. Useful if combining both islands.',
      tips: ['Book in advance during summer', 'Take seasickness medication if sensitive'],
    },
  ],

  gettingAround: [
    {
      id: 'move-rental',
      mode: 'car',
      title: 'Rental Car',
      description: 'The best way to explore the island freely. Mountain roads are winding but well-maintained. Many scenic viewpoints are only reachable by car.',
      tips: ['Book a small car — roads are narrow', 'Get full insurance for mountain driving', 'Fuel stations close early in rural areas'],
      estimatedCost: '€25-50/day',
    },
    {
      id: 'move-bus',
      mode: 'bus',
      title: 'Horários do Funchal (City Bus)',
      description: 'Reliable city buses cover Funchal and surrounding parishes. The SAM and Rodoeste companies handle longer inter-city routes.',
      tips: ['Buy a Giro card for cheaper fares', 'Routes 56 and 103 are scenic'],
      estimatedCost: '€1.50-5 per ride',
    },
    {
      id: 'move-taxi',
      mode: 'taxi',
      title: 'Taxis & Transfers',
      description: 'Yellow taxis are metered. For airport transfers or full-day tours, pre-booked transfers offer fixed rates.',
      tips: ['Agree on price before long trips', 'Airport to Funchal center ~€25-30'],
      estimatedCost: '€25-80 depending on distance',
    },
    {
      id: 'move-cable-car',
      mode: 'cable car',
      title: 'Teleférico do Funchal',
      description: 'Cable car from Funchal\'s old town up to Monte (15 min). Great views and connects to the Monte Palace Garden and toboggan ride.',
      tips: ['Buy a round trip or combine with the toboggan down', 'Less crowded before 10am'],
      estimatedCost: '€12 one-way / €18 return',
    },
  ],
};

export default move;
