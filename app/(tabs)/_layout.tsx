import { Tabs } from 'expo-router';
import React from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabLayout() {
  const tint = useThemeColor({}, 'tint');

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tint,
        headerShown: false, 
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              name={focused ? 'checkmark.circle.fill' : 'checkmark.circle'} 
              color={color} 
            />
          ),
        }}
      />

      <Tabs.Screen
        name="stats"
        options={{
          title: 'Stats',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              name={focused ? 'chart.bar.fill' : 'chart.bar'} 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}