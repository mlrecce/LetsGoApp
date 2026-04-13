import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

/**
 * Reusable card for list-based screens (See, Activities, Shop, etc.).
 * Displays a title, description, and optional metadata chips.
 */
const ContentCard = ({ title, description, chips = [], onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description} numberOfLines={3}>{description}</Text>
      {chips.length > 0 && (
        <View style={styles.chipRow}>
          {chips.map((chip, i) => (
            <View key={i} style={styles.chip}>
              <Text style={styles.chipText}>{chip}</Text>
            </View>
          ))}
        </View>
      )}
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
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
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
});

export default ContentCard;
