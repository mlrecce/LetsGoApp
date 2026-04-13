import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { activities } from '../content/active';
import ContentCard from '../components/ContentCard';

const ActivitiesScreen = () => {
  return (
    <FlatList
      style={styles.container}
      data={activities}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      ListHeaderComponent={
        <Text style={styles.header}>Things to Do</Text>
      }
      renderItem={({ item }) => (
        <ContentCard
          title={item.name}
          description={item.description}
          chips={[
            item.category,
            item.difficulty,
            item.duration,
            item.estimatedCost,
          ].filter(Boolean)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  list: { paddingTop: 16, paddingBottom: 32 },
  header: { fontSize: 24, fontWeight: '800', color: '#1a1a1a', marginHorizontal: 16, marginBottom: 16 },
});

export default ActivitiesScreen;
