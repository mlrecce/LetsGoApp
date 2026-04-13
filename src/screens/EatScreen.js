import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { eat } from '../content/active';
import { useTripPlan } from '../context/TripPlanContext';
import ContentCard from '../components/ContentCard';

const EatScreen = ({ navigation }) => {
  const plan = useTripPlan();

  const getDayLabel = (itemId) => {
    const date = plan.getSelectedDay(itemId);
    if (!date) return null;
    return plan.tripDates.indexOf(date) + 1;
  };

  return (
    <FlatList
      style={styles.container}
      data={eat}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      ListHeaderComponent={<Text style={styles.header}>Places to Eat</Text>}
      renderItem={({ item }) => (
        <ContentCard
          title={item.name}
          description={item.description}
          chips={[item.category, item.costEstimate]}
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

export default EatScreen;
