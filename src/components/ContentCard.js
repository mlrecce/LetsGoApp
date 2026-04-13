import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

/**
 * Reusable card for list-based screens.
 * When heroPhoto is provided the entire card uses it as a background image
 * with a dark gradient overlay so text remains readable.
 */
const ContentCard = ({ title, description, chips = [], onPress, selectedDay, costEstimate, hours, heroPhoto }) => {
  const inner = (
    <>
      <View style={styles.topRow}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        {selectedDay && (
          <View style={styles.selectedBadge}>
            <Text style={styles.selectedBadgeText}>Day {selectedDay}</Text>
          </View>
        )}
      </View>

      <Text style={styles.description} numberOfLines={2}>{description}</Text>

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
    </>
  );

  return (
    <TouchableOpacity
      style={[styles.card, selectedDay && styles.cardSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {heroPhoto ? (
        <ImageBackground
          source={{ uri: heroPhoto }}
          style={styles.bgImage}
          imageStyle={styles.bgImageInner}
        >
          <View style={styles.overlay}>
            {inner}
          </View>
        </ImageBackground>
      ) : (
        <View style={styles.noImageFallback}>
          {inner}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  cardSelected: {
    borderColor: '#4da6ff',
  },
  bgImage: {
    width: '100%',
  },
  bgImageInner: {
    borderRadius: 13,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingTop: 80,
  },
  noImageFallback: {
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
    flex: 1,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
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
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 19,
    paddingHorizontal: 16,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 12,
    paddingHorizontal: 16,
  },
  infoText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 6,
    paddingHorizontal: 16,
  },
  chip: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  chipText: {
    fontSize: 11,
    color: '#ffffff',
    fontWeight: '600',
  },
  tapHint: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.4)',
    marginTop: 10,
    textAlign: 'right',
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
});

export default ContentCard;
