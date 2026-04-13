import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { TripPlanProvider } from './src/context/TripPlanContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <TripPlanProvider>
      <StatusBar style="light" />
      <AppNavigator />
    </TripPlanProvider>
  );
};

export default App;
