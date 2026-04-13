import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { trip } from '../content/active';
import TripTile from '../components/TripTile';

/**
 * Landing page — trip summary with tile grid.
 */
const HomeScreen = () => {
  const { destination, dates, flights, hotels, itinerary } = trip;
  const outbound = flights.find(f => f.direction === 'outbound');
  const mainHotel = hotels[0];

  const formatDate = (dateStr) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Hero header */}
      <View style={styles.hero}>
        <Text style={styles.flag}>{destination.flag}</Text>
        <Text style={styles.destination}>{destination.name}</Text>
        <Text style={styles.country}>{destination.country}</Text>
        <Text style={styles.tagline}>{destination.tagline}</Text>
      </View>

      {/* Tile grid */}
      <View style={styles.grid}>
        <TripTile
          icon="✈️"
          title="Flight"
          subtitle={`${outbound.flightNumber}\n${outbound.departure.city} → ${outbound.arrival.city}`}
          color="#1a73e8"
        />
        <TripTile
          icon="📅"
          title="Dates"
          subtitle={`${formatDate(dates.start)} – ${formatDate(dates.end)}\n${dates.nights} nights`}
          color="#0d652d"
        />
        <TripTile
          icon="🏨"
          title="Hotel"
          subtitle={mainHotel.name}
          color="#e8710a"
        />
        <TripTile
          icon="🗓️"
          title="Itinerary"
          subtitle={`${itinerary.length} days planned`}
          color="#9334e6"
        />
      </View>

      {/* Day-by-day summary */}
      <Text style={styles.sectionTitle}>Day by Day</Text>
      {itinerary.map((day) => (
        <View key={day.day} style={styles.dayRow}>
          <View style={styles.dayBadge}>
            <Text style={styles.dayNumber}>{day.day}</Text>
          </View>
          <View style={styles.dayInfo}>
            <Text style={styles.dayTitle}>{day.title}</Text>
            <Text style={styles.dayHighlights}>{day.highlights.join(' · ')}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { paddingBottom: 32 },
  hero: {
    backgroundColor: '#1a73e8',
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  flag: { fontSize: 48 },
  destination: { fontSize: 32, fontWeight: '800', color: '#fff', marginTop: 8 },
  country: { fontSize: 16, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  tagline: { fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 4, fontStyle: 'italic' },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: -20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  dayBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1a73e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  dayNumber: { color: '#fff', fontWeight: '700', fontSize: 16 },
  dayInfo: { flex: 1 },
  dayTitle: { fontSize: 15, fontWeight: '600', color: '#1a1a1a', marginBottom: 2 },
  dayHighlights: { fontSize: 13, color: '#666', lineHeight: 18 },
});

export default HomeScreen;
