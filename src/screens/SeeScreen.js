import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { see } from '../content/active';
import ContentCard from '../components/ContentCard';

const SeeScreen = () => {
  return (
    <FlatList
      style={styles.container}
      data={see}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      ListHeaderComponent={
        <Text style={styles.header}>Things to See</Text>
      }
      renderItem={({ item }) => (
        <ContentCard
          title={item.name}
          description={item.description}
          chips={[item.category, ...(item.tips ? [item.tips[0]] : [])]}
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

export default SeeScreen;
