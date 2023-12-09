import React from "react";
import { Stack } from "expo-router";
import { Svg, G, Path } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {

  const fadeIn = ({ current }) => ({
    cardStyle: {
      opacity: current.progress
    }
  });

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#444444'
        }
      }}
    >
      <Stack.Screen name='index' options={{headerShown: false}} />
      <Stack.Screen name='loading' options={{headerShown: false}} />
      <Stack.Screen name='loading_2' options={{headerShown: false}} />
       <Stack.Screen name='login_toroku' options={{headerShown: false}} />
       <Stack.Screen name='login' options={{headerShown: false}} />
       <Stack.Screen name='toroku' options={{headerShown: false}} />
      <Stack.Screen
        name='select'
        options={{
          animation: fadeIn,
          headerShown: false,
          gestureEnabled: false
        }}
      />
      <Stack.Screen name='relaxation' options={{headerShown: false}} />
      <Stack.Screen
        name='homeLoading'
        options={{
          animation: fadeIn,
          headerShown: false,
          gestureEnabled: false
        }}
      />
      <Stack.Screen
        name='(tabs)'
        options={{
          animation: fadeIn,
          headerShown: false,
          gestureEnabled: false
        }}
      />
      <Stack.Screen
        name='contents'
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='usersContents'
        options={{
          headerShown: false
        }}
      />
    </Stack>
  );
}
