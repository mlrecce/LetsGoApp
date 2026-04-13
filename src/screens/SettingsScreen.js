import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTripPlan } from '../context/TripPlanContext';
import { trip } from '../content/active';

/**
 * Settings screen for the travel app.
 * Allows users to clear selections, view trip info, and share plans.
 */
const SettingsScreen = () => {
  const plan = useTripPlan();
  const { destination, dates } = trip;

  const formatDate = (dateStr) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear All Selections?',
      'This will remove all items from your trip plan. This action cannot be undone.',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Clear All',
          onPress: () => {
            plan.clearAll();
            Alert.alert('Success', 'Your trip plan has been cleared.');
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleShareTrip = () => {
    Alert.alert('Share Trip Plan', 'Share functionality coming soon!');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Trip Info Header */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trip Information</Text>
        <View style={styles.tripInfoCard}>
          <View style={styles.tripInfoRow}>
            <Text style={styles.tripInfoLabel}>Destination</Text>
            <Text style={styles.tripInfoValue}>{destination.name}, {destination.country}</Text>
          </View>
          <View style={[styles.tripInfoRow, styles.tripInfoRowBorder]}>
            <Text style={styles.tripInfoLabel}>Dates</Text>
            <Text style={styles.tripInfoValue}>{formatDate(dates.start)} – {formatDate(dates.end)}</Text>
          </View>
          <View style={styles.tripInfoRow}>
            <Text style={styles.tripInfoLabel}>Duration</Text>
            <Text style={styles.tripInfoValue}>{dates.nights} nights</Text>
          </View>
        </View>
      </View>

      {/* Trip Management */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trip Management</Text>
        <TouchableOpacity style={styles.button} onPress={handleShareTrip}>
          <Text style={styles.buttonIcon}>📤</Text>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Share Trip Plan</Text>
            <Text style={styles.buttonSubtext}>Share your plan with friends</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonDanger]} onPress={handleClearAll}>
          <Text style={styles.buttonIcon}>🗑️</Text>
          <View style={styles.buttonContent}>
            <Text style={[styles.buttonText, styles.buttonTextDanger]}>Clear All Selections</Text>
            <Text style={[styles.buttonSubtext, styles.buttonSubtextDanger]}>Remove all items from your plan</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.aboutCard}>
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>App Version</Text>
            <Text style={styles.aboutValue}>1.0.0</Text>
          </View>
          <View style={[styles.aboutRow, styles.aboutRowBorder]}>
            <Text style={styles.aboutLabel}>Built with</Text>
            <Text style={styles.aboutValue}>React Native</Text>
          </View>
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>Powered by</Text>
            <Text style={styles.aboutValue}>Claude AI</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Have feedback? We'd love to hear from you!
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1f2e' },
  content: { paddingBottom: 40 },

  section: { paddingHorizontal: 16, marginTop: 24, marginBottom: 8 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#ffffff', marginBottom: 12 },

  tripInfoCard: { backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)' },
  tripInfoRow: { paddingHorizontal: 16, paddingVertical: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tripInfoRowBorder: { borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
  tripInfoLabel: { fontSize: 14, color: 'rgba(255,255,255,0.55)', fontWeight: '600' },
  tripInfoValue: { fontSize: 14, color: '#ffffff', fontWeight: '600' },

  button: { backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, marginBottom: 12, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)' },
  buttonDanger: { backgroundColor: 'rgba(217,48,37,0.12)', borderColor: 'rgba(217,48,37,0.25)' },
  buttonIcon: { fontSize: 20, marginRight: 12 },
  buttonContent: { flex: 1 },
  buttonText: { fontSize: 16, fontWeight: '600', color: '#ffffff' },
  buttonTextDanger: { color: '#f28b82' },
  buttonSubtext: { fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 2 },
  buttonSubtextDanger: { color: 'rgba(242,139,130,0.7)' },

  aboutCard: { backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)' },
  aboutRow: { paddingHorizontal: 16, paddingVertical: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  aboutRowBorder: { borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
  aboutLabel: { fontSize: 14, color: 'rgba(255,255,255,0.55)', fontWeight: '600' },
  aboutValue: { fontSize: 14, color: '#ffffff', fontWeight: '600' },

  footer: { paddingHorizontal: 16, marginTop: 32, marginBottom: 32, alignItems: 'center' },
  footerText: { fontSize: 13, color: 'rgba(255,255,255,0.4)', textAlign: 'center', lineHeight: 20 },
});

export default SettingsScreen;
