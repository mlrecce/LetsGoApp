import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LetsGoApp</Text>
      <Text style={styles.subtitle}>Your travel companion</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a73e8',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginTop: 8,
  },
});

export default HomeScreen;
