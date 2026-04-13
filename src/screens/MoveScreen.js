import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { move } from '../content/active';
import ContentCard from '../components/ContentCard';

const MoveScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.list}>
      <Text style={styles.header}>Getting There</Text>
      {move.gettingThere.map((item) => (
        <ContentCard
          key={item.id}
          title={item.title}
          description={item.description}
          chips={[item.mode]}
        />
      ))}

      <Text style={styles.header}>Getting Around</Text>
      {move.gettingAround.map((item) => (
        <ContentCard
          key={item.id}
          title={item.title}
          description={item.description}
          chips={[item.mode, item.estimatedCost].filter(Boolean)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1f2e' },
  list: { paddingTop: 16, paddingBottom: 32 },
  header: { fontSize: 24, fontWeight: '800', color: '#ffffff', marginHorizontal: 16, marginBottom: 16, marginTop: 8 },
});

export default MoveScreen;
