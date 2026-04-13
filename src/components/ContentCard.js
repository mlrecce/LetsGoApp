import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

/**
 * Reusable card for list-based screens.
 * Shows selection state when `selectedDay` is provided.
 */
const ContentCard = ({ title, description, chips = [], onPress, selectedDay, costEstimate, hours }) => {
  return (
    <TouchableOpacity
      style={[styles.card, selectedDay && styles.cardSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.topRow}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        {selectedDay && (
          <View style={styles.selectedBadge}>
            <Text style={styles.selectedBadgeText}>Day {selectedDay}</Text>
          </View>
        )}
      </View>

      <Text style={styles.description} numberOfLines={2}>{description}</Text>

      {/* Quick info row */}
      <View style={styles.infoRow}>
        {costEstimate && (
          <Text style={styles.infoText}>💰 {costEstimate}</Text>
        )}
        {hours && (
          <Text style={styles.infoText} numberOfLines={1}>🕐 {hours}</Text>
        )}
      </View>

      {chips.length > 0 && (
        <View style={styles.chipRow}>
          {chips.map((chip, i) => (
            <View key={i} style={styles.chip}>
              <Text style={styles.chipText}>{chip}</Text>
            </View>
          ))}
        </View>
      )}

      <Text style={styles.tapHint}>Tap for details →</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelected: {
    borderColor: '#1a73e8',
    backgroundColor: '#f8fbff',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a1a',
    flex: 1,
  },
  selectedBadge: {
    backgroundColor: '#1a73e8',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginLeft: 8,
  },
  selectedBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 12,
  },
  infoText: {
    fontSize: 12,
    color: '#666',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 6,
  },
  chip: {
    backgroundColor: '#e8f0fe',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  chipText: {
    fontSize: 12,
    color: '#1a73e8',
    fontWeight: '600',
  },
  tapHint: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 10,
    textAlign: 'right',
  },
});

export default ContentCard;
