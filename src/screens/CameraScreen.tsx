import React, {useEffect, useState} from 'react';
import {
  Text,
  Linking,
  TouchableOpacity,
  PermissionsAndroid,
  StyleSheet,
  PermissionStatus,
  Platform,
} from 'react-native';
import {Camera, CameraPermissionStatus} from 'react-native-vision-camera';
import {SafeAreaView} from 'react-native-safe-area-context';

import CameraView from '../components/CameraView';

const CameraScreen: React.FC = () => {
  const [cameraPermissionStatus, setCameraPermissionStatus] = useState<
    CameraPermissionStatus | undefined
  >('not-determined');

  const [microphonePermissionStatus, setMicrophonePermissionStatus] = useState<
    CameraPermissionStatus | undefined
  >('not-determined');

  const [storagePermissionStatus, setStoragePermissionStatus] = useState<
    PermissionStatus | undefined
  >('denied');

  useEffect(() => {
    const requestPermissons = async () => {
      const cameraPermission: CameraPermissionStatus =
        await Camera.getCameraPermissionStatus();
      const microphonePermission: CameraPermissionStatus =
        await Camera.getMicrophonePermissionStatus();

      setCameraPermissionStatus(cameraPermission);
      setMicrophonePermissionStatus(microphonePermission);

      // if (cameraPermission === 'not-determined') {
      const newCameraPermission = await Camera.requestCameraPermission();
      setCameraPermissionStatus(newCameraPermission);
      // }

      // if (microphonePermission === 'not-determined') {
      const newMicrophonePermission =
        await Camera.requestMicrophonePermission();
      setMicrophonePermissionStatus(newMicrophonePermission);
      // }

      const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
      if (Platform.OS === 'android' && permission !== null) {
        if (await PermissionsAndroid.check(permission)) {
          setStoragePermissionStatus('granted');
        } else {
          setStoragePermissionStatus(
            await PermissionsAndroid.request(permission),
          );
        }
      }
    };

    requestPermissons();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {cameraPermissionStatus !== 'authorized' ||
      microphonePermissionStatus !== 'authorized' ||
      storagePermissionStatus !== 'granted' ? (
        <React.Fragment>
          <Text style={styles.text}>
            Camera Permission : {cameraPermissionStatus}
          </Text>
          <Text style={styles.text}>
            Microphone Permission : {microphonePermissionStatus}
          </Text>
          <Text style={styles.text}>
            Storage Permission : {storagePermissionStatus}
          </Text>
          <Text style={styles.text}>
            Please grant Camera, Microphone and Storage permissions from
            settings to continue.
          </Text>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={Linking.openSettings}>
            <Text style={styles.text}>Open Settings</Text>
          </TouchableOpacity>
        </React.Fragment>
      ) : (
        <CameraView />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    padding: 12,
    textAlign: 'center',
    fontSize: 18,
  },
  settingsButton: {
    borderWidth: 1,
    padding: 6,
    margin: 6,
    width: 200,
    textAlign: 'center',
    borderRadius: 6,
  },
});

export default CameraScreen;
