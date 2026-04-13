import React from 'react';
import { TripPlanProvider } from './src/context/TripPlanContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <TripPlanProvider>
      <AppNavigator />
    </TripPlanProvider>
  );
};

export default App;
