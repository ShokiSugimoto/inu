import React from "react";
import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Svg, G, Path } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          height: 300,
          backgroundColor: '#444444'
        }
      }}
    >
      <Stack.Screen name='index' options={{headerShown: false}} />
      <Stack.Screen name='loading' options={{headerShown: false}} />
      <Stack.Screen name='select' options={{headerShown: false}} />
      <Stack.Screen name='relaxation' options={{headerShown: false}} />
      <Stack.Screen
        name='home'
        options={{
          headerShown: true,
          headerTitle: () => false,
          headerLeft: () => (
            <Svg viewBox="0 0 605 177" width={100} height={30} fill="#FFFFFF" style={{marginLeft: 15}}>
              <G>
                <Path d="m220.49,87.87c-.2,24.4-.38,48.81-.65,73.21-.03,2.49-.34,5.05-1.03,7.44-1.65,5.76-5.57,8.53-11.55,8.26-5.63-.25-11.25-.64-16.87-1.13-14.27-1.23-28.53-2.53-42.79-3.83-3.63-.33-7.25-.76-10.89-1.05-1.32-.1-2.11-.66-2.86-1.75-9.92-14.5-19.9-28.96-29.86-43.44-.23-.33-.47-.65-.71-.96-3.52-4.57-8.18-4.74-11.82-.21-3.44,4.29-6.68,8.75-9.93,13.19-6.03,8.24-12.03,16.5-17.98,24.8-1.08,1.51-2.26,2.1-4.15,1.93-11.75-1.07-23.51-2.03-35.27-3.05-4.95-.43-9.9-.94-14.85-1.43-5.71-.57-8.85-3.9-9.01-9.61C.15,145.08,0,139.91.01,134.74.09,99.39.19,64.04.35,28.7c0-1.87.33-3.87,1.03-5.59,1.6-3.88,4.45-6.19,8.9-6.56,14.34-1.21,28.65-2.64,42.98-3.88,19.95-1.73,39.9-3.36,59.86-5.02,16.98-1.41,33.96-2.82,50.94-4.2,13.75-1.12,27.49-2.19,41.24-3.3,9.2-.75,14.48,4.01,14.57,13.32.24,24.8.41,49.6.62,74.41Zm-32.39-1.73c0-1.11.17-3.31-.03-5.48-1-11.03-5.54-20.25-14.39-27.08-7.44-5.74-16.89-5.84-24.64-.51-4.63,3.19-8.06,7.43-10.7,12.35-4.58,8.52-5.04,17.72-4.49,27.09.53,9.03,4.06,16.82,9.95,23.53,5.66,6.45,12.71,9.78,21.42,8.08,5.84-1.14,10.34-4.67,13.99-9.22,6.49-8.07,9.64-17.28,8.89-28.77Zm-124.08,1.22c0-1.44.02-2.5,0-3.56-.17-8.79-2.86-16.7-8.61-23.4-7.61-8.87-19.15-8.67-26.38.51-7.2,9.14-9.33,19.75-8.22,31.1.69,7.03,2.78,13.65,7.03,19.4,3.81,5.16,8.65,8.63,15.41,8.28,6.3-.32,10.74-3.88,14.15-8.81,4.96-7.17,7.03-15.21,6.62-23.52Z"/>
                <Path d="m311.05,107.91c0,4.31.05,8.41-.01,12.51-.07,4.51-.12,9.02-.42,13.52-.49,7.4-3.79,13.5-9.42,18.19-1.76,1.47-4.14,2.37-6.38,3.05-20.16,6.15-40.35,12.2-60.53,18.26-3.91,1.17-7.85,2.27-12.12,3.5.22-.68.23-1.05.42-1.22,3.46-3.15,3.64-7.39,3.71-11.57.24-14.45.49-28.91.51-43.36.03-34.22-.07-68.44-.13-102.66,0-2.45-.27-4.91-.19-7.36.09-3.19-.95-5.83-3.2-8.05-.4-.39-.67-.91-1.37-1.89,2.24.61,3.88,1.03,5.51,1.5,22.95,6.5,45.93,12.95,68.84,19.59,3.38.98,6.66,2.6,9.68,4.42,2.83,1.7,4.45,4.56,4.55,7.99.26,8.99.45,17.99.68,27.46-2.18-.31-3.72-.48-5.24-.74-6.86-1.19-13.71-2.42-20.57-3.59-5.64-.96-9.14,1.48-9.24,7.17-.23,13.52-.08,27.04-.09,40.56,0,3.91,2.06,6.33,5.57,7.59.86.31,1.95.22,2.89.05,8.48-1.55,16.94-3.15,25.41-4.74.25-.05.51-.07,1.14-.15Z"/>
                <Path d="m281.21,84.68c0-5.37,0-10.74,0-16.11,0-3.12,2-5.29,5.17-5.09,3.29.2,6.58.71,9.84,1.28,5.02.88,10.05,1.79,15.02,2.93,4.81,1.1,6.34,2.77,6.46,7.69.17,6.88-.07,13.78-.15,20.67-.03,2.82-1.44,4.77-4.16,5.34-8.74,1.84-17.5,3.63-26.3,5.2-2.99.53-5.88-2.41-5.88-5.4,0-5.5,0-11,0-16.5Z"/>
              </G>
              <G>
                <Path d="m375.29,55.33c-3.79,3.98-10.46,6.5-17.49,6.5s-13.69-2.52-17.48-6.5c-3.07-3.24-5.22-8.1-5.22-13.33s2.16-10.1,5.22-13.34c3.79-3.96,10.45-6.49,17.48-6.49s13.71,2.52,17.49,6.49c3.05,3.24,5.22,8.1,5.22,13.34s-2.17,10.08-5.22,13.33Zm-37.86,92.15v-74.16c0-2.76,2.24-5,5-5h30.91c2.76,0,5,2.24,5,5v74.16c0,2.76-2.24,5-5,5h-30.91c-2.76,0-5-2.24-5-5Z"/>
                <Path d="m395.69,148.16v-75.53c0-2.38,1.93-4.31,4.31-4.31h31.55c2.38,0,4.31,1.93,4.31,4.31h0c0,2.89-.72,5.96-1.61,8.66l.9.18c3.24-4.14,7.92-8.64,11.36-10.99,4.68-3.07,9.55-4.51,15.32-4.51,9.73,0,16.39,3.79,20.55,7.57,8.29,7.92,9.36,18.39,9.36,24.87v49.75c0,2.38-1.93,4.31-4.31,4.31h-32.27c-2.38,0-4.31-1.93-4.31-4.31v-41.46c0-4.15-1.26-5.96-1.81-6.5-1.45-1.61-3.24-1.79-4.7-1.79-1.98,0-3.77.53-5.22,1.98-2.33,2.33-2.52,5.77-2.52,8.29v39.48c0,2.38-1.93,4.31-4.31,4.31h-32.27c-2.38,0-4.31-1.93-4.31-4.31Z"/>
                <Path d="m514.1,68.31h30.91c2.76,0,5,2.24,5,5v40.6c0,2.16.19,4.86,1.98,6.66,1.45,1.63,3.24,1.81,4.87,1.81s3.42-.18,5.05-1.81c1.98-1.98,2.16-4.33,2.16-6.66v-40.6c0-2.76,2.24-5,5-5h30.91c2.76,0,5,2.24,5,5v43.47c0,6.13-1.44,15.32-9.73,23.98-7.92,8.29-21.09,14.06-38.39,14.06s-30.1-5.77-37.85-13.52c-5.94-5.96-9.92-13.71-9.92-23.26v-44.73c0-2.76,2.24-5,5-5Z"/>
              </G>
            </Svg>
          ),
          headerRight: () => (
            <Ionicons name="search" size={32} color="#FFFFFF" style={{marginRight: 15}} />
          )
        }}
      />
      <Stack.Screen name='profile' />
    </Stack>
  );
}
