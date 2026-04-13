import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { useTripPlan, TIME_SLOTS } from '../context/TripPlanContext';
import { trip } from '../content/active';

/**
 * Full detail view for any content item.
 * Receives `item` via navigation params.
 * Shows all rich fields and an "Add to Day" picker.
 */
const DetailScreen = ({ route }) => {
  const { item } = route.params;
  const plan = useTripPlan();
  const selectedDay = plan.getSelectedDay(item.id);
  const [showDayPicker, setShowDayPicker] = useState(false);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const getDayNumber = (dateStr) => {
    const idx = plan.tripDates.indexOf(dateStr);
    return idx >= 0 ? idx + 1 : null;
  };

  const handleAddToDay = (date) => {
    if (selectedDay) {
      plan.removeFromDay(item.id, selectedDay);
    }
    plan.addToDay(item.id, date, 'all-day');
    setShowDayPicker(false);
  };

  const handleRemove = () => {
    if (selectedDay) {
      plan.removeFromDay(item.id, selectedDay);
    }
  };

  const openMaps = () => {
    if (item.coordinates) {
      const url = `https://maps.apple.com/?ll=${item.coordinates.lat},${item.coordinates.lng}&q=${encodeURIComponent(item.name)}`;
      Linking.openURL(url);
    }
  };

  const openWebsite = () => {
    if (item.website) Linking.openURL(item.website);
  };

  const callPhone = () => {
    if (item.phone) Linking.openURL(`tel:${item.phone}`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{item.name}</Text>
        {item.category && (
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        )}
      </View>

      {/* Selection status */}
      {selectedDay && (
        <View style={styles.selectedBanner}>
          <Text style={styles.selectedText}>
            ✓ Day {getDayNumber(selectedDay)} — {formatDate(selectedDay)}
          </Text>
          <TouchableOpacity onPress={handleRemove}>
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Description */}
      <Text style={styles.description}>{item.description}</Text>

      {/* Info grid */}
      <View style={styles.infoGrid}>
        {item.costEstimate && (
          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>💰</Text>
            <View>
              <Text style={styles.infoLabel}>Cost</Text>
              <Text style={styles.infoValue}>{item.costNote || item.costEstimate}</Text>
            </View>
          </View>
        )}
        {item.hours && (
          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>🕐</Text>
            <View>
              <Text style={styles.infoLabel}>Hours</Text>
              <Text style={styles.infoValue}>{item.hours}</Text>
            </View>
          </View>
        )}
        {item.duration && (
          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>⏱️</Text>
            <View>
              <Text style={styles.infoLabel}>Duration</Text>
              <Text style={styles.infoValue}>{item.duration}</Text>
            </View>
          </View>
        )}
        {item.difficulty && (
          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>📊</Text>
            <View>
              <Text style={styles.infoLabel}>Difficulty</Text>
              <Text style={styles.infoValue}>{item.difficulty}</Text>
            </View>
          </View>
        )}
      </View>

      {/* Action buttons */}
      <View style={styles.actions}>
        {item.coordinates && (
          <TouchableOpacity style={styles.actionButton} onPress={openMaps}>
            <Text style={styles.actionIcon}>🗺️</Text>
            <Text style={styles.actionLabel}>Map</Text>
          </TouchableOpacity>
        )}
        {item.phone && (
          <TouchableOpacity style={styles.actionButton} onPress={callPhone}>
            <Text style={styles.actionIcon}>📞</Text>
            <Text style={styles.actionLabel}>Call</Text>
          </TouchableOpacity>
        )}
        {item.website && (
          <TouchableOpacity style={styles.actionButton} onPress={openWebsite}>
            <Text style={styles.actionIcon}>🌐</Text>
            <Text style={styles.actionLabel}>Website</Text>
          </TouchableOpacity>
        )}
        {item.bookingUrl && (
          <TouchableOpacity style={styles.actionButton} onPress={() => Linking.openURL(item.bookingUrl)}>
            <Text style={styles.actionIcon}>🎟️</Text>
            <Text style={styles.actionLabel}>Book</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Address */}
      {item.address && (
        <TouchableOpacity style={styles.addressRow} onPress={openMaps}>
          <Text style={styles.addressIcon}>📍</Text>
          <Text style={styles.addressText}>{item.address}</Text>
        </TouchableOpacity>
      )}

      {/* Tips */}
      {item.tips && item.tips.length > 0 && (
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Tips</Text>
          {item.tips.map((tip, i) => (
            <View key={i} style={styles.tipRow}>
              <Text style={styles.tipBullet}>💡</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Amenities (for sleep items) */}
      {item.amenities && (
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.chipRow}>
            {item.amenities.map((a, i) => (
              <View key={i} style={styles.chip}>
                <Text style={styles.chipText}>{a}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Where to buy (for shop items) */}
      {item.whereToBuy && (
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Where to Buy</Text>
          {item.whereToBuy.map((place, i) => (
            <Text key={i} style={styles.tipText}>• {place}</Text>
          ))}
        </View>
      )}

      {/* Add to day button */}
      <TouchableOpacity
        style={[styles.addButton, selectedDay && styles.addButtonSelected]}
        onPress={() => setShowDayPicker(!showDayPicker)}
      >
        <Text style={[styles.addButtonText, selectedDay && styles.addButtonTextSelected]}>
          {selectedDay ? `Change Day (currently Day ${getDayNumber(selectedDay)})` : '+ Add to Trip'}
        </Text>
      </TouchableOpacity>

      {/* Day picker */}
      {showDayPicker && (
        <View style={styles.dayPicker}>
          {plan.tripDates.map((date, i) => {
            const dayItinerary = trip.itinerary[i];
            const itemCount = plan.getItemsForDay(date).length;
            return (
              <TouchableOpacity
                key={date}
                style={[
                  styles.dayOption,
                  selectedDay === date && styles.dayOptionSelected,
                ]}
                onPress={() => handleAddToDay(date)}
              >
                <View style={styles.dayOptionLeft}>
                  <Text style={styles.dayOptionNumber}>Day {i + 1}</Text>
                  <Text style={styles.dayOptionDate}>{formatDate(date)}</Text>
                  {dayItinerary && (
                    <Text style={styles.dayOptionTitle}>{dayItinerary.title}</Text>
                  )}
                </View>
                {itemCount > 0 && (
                  <View style={styles.dayCountBadge}>
                    <Text style={styles.dayCountText}>{itemCount}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { paddingBottom: 40 },
  header: { padding: 20, paddingTop: 16 },
  name: { fontSize: 26, fontWeight: '800', color: '#1a1a1a' },
  categoryBadge: { backgroundColor: '#e8f0fe', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start', marginTop: 8 },
  categoryText: { fontSize: 13, color: '#1a73e8', fontWeight: '600' },

  selectedBanner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#e6f4ea', marginHorizontal: 20, padding: 12, borderRadius: 10 },
  selectedText: { color: '#137333', fontWeight: '600', fontSize: 14 },
  removeText: { color: '#d93025', fontWeight: '600', fontSize: 14 },

  description: { fontSize: 16, lineHeight: 24, color: '#333', paddingHorizontal: 20, marginTop: 8 },

  infoGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, marginTop: 20, gap: 12 },
  infoItem: { flexDirection: 'row', alignItems: 'flex-start', width: '47%', backgroundColor: '#fff', borderRadius: 10, padding: 10 },
  infoIcon: { fontSize: 20, marginRight: 8, marginTop: 2 },
  infoLabel: { fontSize: 11, color: '#999', fontWeight: '600', textTransform: 'uppercase' },
  infoValue: { fontSize: 13, color: '#333', marginTop: 2 },

  actions: { flexDirection: 'row', paddingHorizontal: 20, marginTop: 20, gap: 12 },
  actionButton: { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 12, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 },
  actionIcon: { fontSize: 24 },
  actionLabel: { fontSize: 12, color: '#666', marginTop: 4, fontWeight: '600' },

  addressRow: { flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 20, marginTop: 16 },
  addressIcon: { fontSize: 16, marginRight: 6, marginTop: 1 },
  addressText: { fontSize: 14, color: '#1a73e8', flex: 1, lineHeight: 20 },

  tipsSection: { paddingHorizontal: 20, marginTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1a1a1a', marginBottom: 10 },
  tipRow: { flexDirection: 'row', marginBottom: 8, alignItems: 'flex-start' },
  tipBullet: { fontSize: 14, marginRight: 8, marginTop: 1 },
  tipText: { fontSize: 14, color: '#444', lineHeight: 20, flex: 1 },

  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: '#e8f0fe', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  chipText: { fontSize: 12, color: '#1a73e8', fontWeight: '600' },

  addButton: { backgroundColor: '#1a73e8', marginHorizontal: 20, marginTop: 28, padding: 16, borderRadius: 14, alignItems: 'center' },
  addButtonSelected: { backgroundColor: '#fff', borderWidth: 2, borderColor: '#1a73e8' },
  addButtonText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  addButtonTextSelected: { color: '#1a73e8' },

  dayPicker: { marginHorizontal: 20, marginTop: 12 },
  dayOption: { backgroundColor: '#fff', borderRadius: 10, padding: 14, marginBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: '#eee' },
  dayOptionSelected: { borderColor: '#1a73e8', backgroundColor: '#e8f0fe' },
  dayOptionLeft: { flex: 1 },
  dayOptionNumber: { fontSize: 15, fontWeight: '700', color: '#1a1a1a' },
  dayOptionDate: { fontSize: 12, color: '#666', marginTop: 2 },
  dayOptionTitle: { fontSize: 12, color: '#999', marginTop: 2 },
  dayCountBadge: { backgroundColor: '#1a73e8', borderRadius: 12, width: 24, height: 24, justifyContent: 'center', alignItems: 'center' },
  dayCountText: { color: '#fff', fontSize: 12, fontWeight: '700' },
});

export default DetailScreen;
