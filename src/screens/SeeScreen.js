import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { see } from '../content/active';
import { useTripPlan } from '../context/TripPlanContext';
import ContentCard from '../components/ContentCard';

const SeeScreen = ({ navigation }) => {
  const plan = useTripPlan();

  const getDayLabel = (itemId) => {
    const date = plan.getSelectedDay(itemId);
    if (!date) return null;
    return plan.tripDates.indexOf(date) + 1;
  };

  return (
    <FlatList
      style={styles.container}
      data={see}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      ListHeaderComponent={<Text style={styles.header}>Things to See</Text>}
      renderItem={({ item }) => (
        <ContentCard
          title={item.name}
          description={item.description}
          chips={[item.category]}
          costEstimate={item.costEstimate}
          hours={item.hours}
          heroPhoto={item.heroPhoto}
          selectedDay={getDayLabel(item.id)}
          onPress={() => navigation.navigate('Detail', { item })}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1f2e' },
  list: { paddingTop: 16, paddingBottom: 32 },
  header: { fontSize: 24, fontWeight: '800', color: '#ffffff', marginHorizontal: 16, marginBottom: 16 },
});

export default SeeScreen;
