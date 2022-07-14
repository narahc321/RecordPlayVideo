import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';
import VideosListScreen from './screens/VideosListScreen';
import VideoPlayerScreen from './screens/VideoPlayerScreen';

const Stack = createNativeStackNavigator();

const StackNavigation: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
      <Stack.Screen name="VideosListScreen" component={VideosListScreen} />
      <Stack.Screen name="VideoPlayerScreen" component={VideoPlayerScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
