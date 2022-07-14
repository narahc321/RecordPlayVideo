import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {ScreenProps} from '../Types';

const HomeScreen: React.FC<ScreenProps> = props => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          props.navigation.navigate('CameraScreen');
        }}>
        <Text>Open Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          props.navigation.navigate('VideosListScreen');
        }}>
        <Text>Show Videos List</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text>Play Videos</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 6,
    width: 200,
    alignItems: 'center',
  },
});

export default HomeScreen;
