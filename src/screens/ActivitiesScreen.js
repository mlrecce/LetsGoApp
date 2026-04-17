import React, { useState, useMemo } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { activities } from '../content/active';
import { useTripPlan } from '../context/TripPlanContext';
import ContentCard from '../components/ContentCard';
import CityMapSelector from '../components/CityMapSelector';

const ActivitiesScreen = ({ navigation }) => {
  const plan = useTripPlan();
  const [city, setCity] = useState('Athens');

  const filtered = useMemo(
    () => activities.filter((i) => i.city === city),
    [city],
  );

  const getDayLabel = (itemId) => {
    const date = plan.getSelectedDay(itemId);
    if (!date) return null;
    return plan.tripDates.indexOf(date) + 1;
  };

  return (
    <FlatList
      style={styles.container}
      data={filtered}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      ListHeaderComponent={
        <>
          <Text style={styles.header}>Things to Do</Text>
          <CityMapSelector selected={city} onSelect={setCity} />
        </>
      }
      renderItem={({ item }) => (
        <ContentCard
          title={item.name}
          description={item.description}
          chips={[item.category, item.difficulty].filter(Boolean)}
          costEstimate={item.costEstimate}
          hours={item.duration}
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
  header: { fontSize: 24, fontWeight: '800', color: '#ffffff', marginHorizontal: 16, marginBottom: 12 },
});

export default ActivitiesScreen;
