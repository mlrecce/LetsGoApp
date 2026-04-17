import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

/**
 * Horizontal scrollable pill bar for filtering content by city.
 * Reads city names from the data itself so it works for any destination.
 *
 * Props:
 *   data       – full array of content items (must have a `city` field)
 *   selected   – currently selected city string, or 'All'
 *   onSelect   – callback(cityName)
 */
const CityFilterBar = ({ data = [], selected = 'All', onSelect }) => {
  // Derive ordered, unique city list from the data
  const cities = ['All'];
  const seen = new Set();
  data.forEach((item) => {
    if (item.city && !seen.has(item.city)) {
      seen.add(item.city);
      cities.push(item.city);
    }
  });

  // Don't render the bar if there's only one city (or none)
  if (cities.length <= 2) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.bar}
      contentContainerStyle={styles.barContent}
    >
      {cities.map((city) => {
        const active = city === selected;
        return (
          <TouchableOpacity
            key={city}
            style={[styles.chip, active && styles.chipActive]}
            onPress={() => onSelect(city)}
            activeOpacity={0.7}
          >
            <Text style={[styles.chipText, active && styles.chipTextActive]}>
              {city}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bar: {
    flexGrow: 0,
    marginBottom: 8,
  },
  barContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  chipActive: {
    backgroundColor: '#4da6ff',
    borderColor: '#4da6ff',
  },
  chipText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#ffffff',
  },
});

export default CityFilterBar;
