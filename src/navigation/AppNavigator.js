import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import SeeScreen from '../screens/SeeScreen';
import ActivitiesScreen from '../screens/ActivitiesScreen';
import ShopScreen from '../screens/ShopScreen';
import SleepScreen from '../screens/SleepScreen';
import MoveScreen from '../screens/MoveScreen';
import AskClaudeScreen from '../screens/AskClaudeScreen';

import { trip } from '../content/active';

const Tab = createBottomTabNavigator();

/**
 * Tab icon helper — uses emoji for now; swap for a proper icon
 * library (e.g. react-native-vector-icons) when ready.
 */
const tabConfig = {
  Home:       { icon: '🏠', label: trip.destination.name },
  See:        { icon: '👁️', label: 'See' },
  Activities: { icon: '🎯', label: 'Do' },
  Shop:       { icon: '🛍️', label: 'Shop' },
  Sleep:      { icon: '🛏️', label: 'Sleep' },
  Move:       { icon: '🚗', label: 'Move' },
  AskClaude:  { icon: '💬', label: 'Ask' },
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: '#1a73e8' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>
              {tabConfig[route.name]?.icon}
            </Text>
          ),
          tabBarLabel: tabConfig[route.name]?.label,
          tabBarActiveTintColor: '#1a73e8',
          tabBarInactiveTintColor: '#999',
          tabBarStyle: {
            paddingBottom: 4,
            height: 56,
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="See" component={SeeScreen} />
        <Tab.Screen name="Activities" component={ActivitiesScreen} />
        <Tab.Screen name="Shop" component={ShopScreen} />
        <Tab.Screen name="Sleep" component={SleepScreen} />
        <Tab.Screen name="Move" component={MoveScreen} />
        <Tab.Screen name="AskClaude" component={AskClaudeScreen} options={{ title: 'Ask Claude' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
