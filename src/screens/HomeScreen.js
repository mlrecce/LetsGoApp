import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { trip, see, activities, shop, sleep, eat } from '../content/active';
import { useTripPlan } from '../context/TripPlanContext';
import TripTile from '../components/TripTile';

/**
 * Landing page — trip summary tiles + composed day-by-day itinerary
 * built from the user's selections.
 */

// Build a lookup map of all content items by ID for quick resolution
const buildItemMap = () => {
  const map = {};
  [see, activities, shop, sleep, eat].flat().forEach((item) => {
    map[item.id] = item;
  });
  return map;
};

const HomeScreen = ({ navigation }) => {
  const plan = useTripPlan();
  const { destination, dates, flights, hotels } = trip;
  const outbound = flights.find((f) => f.direction === 'outbound');
  const mainHotel = hotels[0];
  const itemMap = useMemo(() => buildItemMap(), []);

  const totalSelected = plan.getAllSelectedIds().size;

  const formatDate = (dateStr) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const tabIcon = (tab) => {
    const icons = { see: '👁️', activities: '🎯', shop: '🛍️', sleep: '🛏️', eat: '🍽️', move: '🚗' };
    return icons[tab] || '📌';
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.flag}>{destination.flag}</Text>
        <Text style={styles.destination}>{destination.name}</Text>
        <Text style={styles.country}>{destination.country}</Text>
        <Text style={styles.tagline}>{destination.tagline}</Text>
      </View>

      {/* Quick tiles */}
      <View style={styles.grid}>
        <TripTile icon="✈️" title="Flight" subtitle={`${outbound.flightNumber}\n${outbound.departure.city} → ${outbound.arrival.city}`} color="#1a73e8" />
        <TripTile icon="📅" title="Dates" subtitle={`${formatDate(dates.start)} – ${formatDate(dates.end)}\n${dates.nights} nights`} color="#0d652d" />
        <TripTile icon="🏨" title="Hotel" subtitle={mainHotel.name} color="#e8710a" />
        <TripTile icon="📋" title="Planned" subtitle={`${totalSelected} items selected`} color="#9334e6" />
      </View>

      {/* Composed itinerary */}
      <Text style={styles.sectionTitle}>Your Trip Plan</Text>
      {totalSelected === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🗓️</Text>
          <Text style={styles.emptyText}>Browse the tabs below and tap items to add them to your day-by-day plan.</Text>
        </View>
      )}

      {plan.tripDates.map((date, dayIndex) => {
        const daySelections = plan.getItemsForDay(date);
        const itineraryDay = trip.itinerary[dayIndex];
        if (daySelections.length === 0 && totalSelected > 0) return null; // hide empty days when planning

        return (
          <View key={date} style={styles.dayBlock}>
            <View style={styles.dayHeader}>
              <View style={styles.dayBadge}>
                <Text style={styles.dayNumber}>{dayIndex + 1}</Text>
              </View>
              <View style={styles.dayHeaderText}>
                <Text style={styles.dayTitle}>
                  {itineraryDay?.title || `Day ${dayIndex + 1}`}
                </Text>
                <Text style={styles.dayDate}>{formatDate(date)}</Text>
              </View>
            </View>

            {daySelections.length === 0 ? (
              <Text style={styles.noItems}>No items planned yet</Text>
            ) : (
              daySelections.map(({ itemId }) => {
                const item = itemMap[itemId];
                if (!item) return null;
                return (
                  <TouchableOpacity
                    key={itemId}
                    style={styles.planItem}
                    onPress={() => navigation.navigate(
                      item.tab === 'see' ? 'SeeTab' :
                      item.tab === 'activities' ? 'ActivitiesTab' :
                      item.tab === 'shop' ? 'ShopTab' :
                      item.tab === 'sleep' ? 'SleepTab' :
                      item.tab === 'eat' ? 'EatTab' : 'SeeTab',
                      { screen: 'Detail', params: { item } }
                    )}
                  >
                    <Text style={styles.planItemIcon}>{tabIcon(item.tab)}</Text>
                    <View style={styles.planItemInfo}>
                      <Text style={styles.planItemName}>{item.name}</Text>
                      <Text style={styles.planItemMeta}>
                        {[item.costEstimate, item.duration || item.hours].filter(Boolean).join(' · ')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { paddingBottom: 32 },

  hero: { backgroundColor: '#1a73e8', paddingTop: 60, paddingBottom: 32, paddingHorizontal: 24, alignItems: 'center' },
  flag: { fontSize: 48 },
  destination: { fontSize: 32, fontWeight: '800', color: '#fff', marginTop: 8 },
  country: { fontSize: 16, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  tagline: { fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 4, fontStyle: 'italic' },

  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 16, marginTop: -20 },

  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#1a1a1a', marginHorizontal: 16, marginTop: 24, marginBottom: 12 },

  emptyState: { alignItems: 'center', padding: 32, marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 12 },
  emptyIcon: { fontSize: 40, marginBottom: 12 },
  emptyText: { fontSize: 15, color: '#666', textAlign: 'center', lineHeight: 22 },

  dayBlock: { marginHorizontal: 16, marginBottom: 16, backgroundColor: '#fff', borderRadius: 12, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  dayHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  dayBadge: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#1a73e8', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  dayNumber: { color: '#fff', fontWeight: '700', fontSize: 16 },
  dayHeaderText: { flex: 1 },
  dayTitle: { fontSize: 16, fontWeight: '700', color: '#1a1a1a' },
  dayDate: { fontSize: 12, color: '#999', marginTop: 2 },

  noItems: { fontSize: 13, color: '#ccc', fontStyle: 'italic', marginLeft: 48 },

  planItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 4, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  planItemIcon: { fontSize: 20, marginRight: 12 },
  planItemInfo: { flex: 1 },
  planItemName: { fontSize: 15, fontWeight: '600', color: '#1a1a1a' },
  planItemMeta: { fontSize: 12, color: '#888', marginTop: 2 },
});

export default HomeScreen;
