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
          headerStyle: { backgroundColor: '#1a73e8' },
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
const ShopTab = createTabStack('ShopList', ShopScreen, 'Shop');
const SleepTab = createTabStack('SleepList', SleepScreen, 'Sleep');
const EatTab = createTabStack('EatList', EatScreen, 'Eat');
const MoveTab = createTabStack('MoveList', MoveScreen, 'Move');

// Home also needs a stack for navigating to detail from the plan
function HomeTab() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
    </Stack.Navigator>
  );
}

// Ask Claude doesn't need a detail stack
function AskTab() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1a73e8' },
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
  ShopTab:       { icon: '🛍️', label: 'Shop' },
  SleepTab:      { icon: '🛏️', label: 'Sleep' },
  EatTab:        { icon: '🍽️', label: 'Eat' },
  MoveTab:       { icon: '🚗', label: 'Move' },
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
          tabBarActiveTintColor: '#1a73e8',
          tabBarInactiveTintColor: '#999',
          tabBarStyle: { paddingBottom: 4, height: 56 },
        })}
      >
        <Tab.Screen name="HomeTab" component={HomeTab} />
        <Tab.Screen name="SeeTab" component={SeeTab} />
        <Tab.Screen name="ActivitiesTab" component={ActivitiesTab} />
        <Tab.Screen name="ShopTab" component={ShopTab} />
        <Tab.Screen name="SleepTab" component={SleepTab} />
        <Tab.Screen name="EatTab" component={EatTab} />
        <Tab.Screen name="MoveTab" component={MoveTab} />
        <Tab.Screen name="AskTab" component={AskTab} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
