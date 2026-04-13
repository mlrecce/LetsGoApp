import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import SeeScreen from '../screens/SeeScreen';
import ActivitiesScreen from '../screens/ActivitiesScreen';
import ShopScreen from '../screens/ShopScreen';
import SleepScreen from '../screens/SleepScreen';
import EatScreen from '../screens/EatScreen';
import MoveScreen from '../screens/MoveScreen';
import AskClaudeScreen from '../screens/AskClaudeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DetailScreen from '../screens/DetailScreen';

import { trip } from '../content/active';

const Tab = createBottomTabNavigator();

/**
 * Creates a stack navigator that wraps a list screen + the shared detail screen.
 * This lets users tap a card → see the detail → go back, all within the same tab.
 */
function createTabStack(name, ListScreen, headerTitle) {
  const Stack = createNativeStackNavigator();
  return function TabStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#141824' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name={name} component={ListScreen} options={{ title: headerTitle }} />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={({ route }) => ({ title: route.params?.item?.name || 'Details' })}
        />
      </Stack.Navigator>
    );
  };
}

const SeeTab = createTabStack('SeeList', SeeScreen, 'See');
const ActivitiesTab = createTabStack('ActivitiesList', ActivitiesScreen, 'Do');
const SleepTab = createTabStack('SleepList', SleepScreen, 'Sleep');
const EatTab = createTabStack('EatList', EatScreen, 'Eat');

// Home tab with stack for Home, Shop, Move, Settings
function HomeTab() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#141824' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={({ route }) => ({ title: route.params?.item?.name || 'Details' })}
      />
      <Stack.Screen name="Shop" component={ShopScreen} options={{ title: 'Shop' }} />
      <Stack.Screen name="Move" component={MoveScreen} options={{ title: 'Move' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
    </Stack.Navigator>
  );
}

// Ask Claude doesn't need a detail stack
function AskTab() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#141824' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="AskMain" component={AskClaudeScreen} options={{ title: 'Ask Claude' }} />
    </Stack.Navigator>
  );
}

const tabConfig = {
  HomeTab:       { icon: '🏠', label: trip.destination.name },
  SeeTab:        { icon: '👁️', label: 'See' },
  ActivitiesTab: { icon: '🎯', label: 'Do' },
  SleepTab:      { icon: '🛏️', label: 'Sleep' },
  EatTab:        { icon: '🍽️', label: 'Eat' },
  AskTab:        { icon: '💬', label: 'Ask' },
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>
              {tabConfig[route.name]?.icon}
            </Text>
          ),
          tabBarLabel: tabConfig[route.name]?.label,
          tabBarActiveTintColor: '#4da6ff',
          tabBarInactiveTintColor: 'rgba(255,255,255,0.4)',
          tabBarStyle: { paddingBottom: 4, height: 56, backgroundColor: '#141824', borderTopColor: 'rgba(255,255,255,0.08)' },
        })}
      >
        <Tab.Screen name="HomeTab" component={HomeTab} />
        <Tab.Screen name="SeeTab" component={SeeTab} />
        <Tab.Screen name="ActivitiesTab" component={ActivitiesTab} />
        <Tab.Screen name="SleepTab" component={SleepTab} />
        <Tab.Screen name="EatTab" component={EatTab} />
        <Tab.Screen name="AskTab" component={AskTab} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
