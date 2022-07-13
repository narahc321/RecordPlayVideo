import React, {useRef, useState, useCallback} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {Camera, useCameraDevices, VideoFile} from 'react-native-vision-camera';
import {useIsFocused} from '@react-navigation/native';

import {useIsAppForeground} from '../hooks/useIsAppForeground';
import CaptureButton from './CaptureButton';

const CameraView: React.FC = () => {
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.back;
  const isAppForeground = useIsAppForeground();
  const isFocused = useIsFocused();

  const [isRecording, setIsRecording] = useState<Boolean>(false);

  // const saveVideo = useCallback(async () => {
  // try {
  // setSavingState('saving');

  //   await CameraRoll.save(`file://${path}`, {
  //     type: type,
  //   });
  //   setSavingState('saved');
  // } catch (e) {
  //   const message = e instanceof Error ? e.message : JSON.stringify(e);
  //   setSavingState('none');
  //   Alert.alert(
  //     'Failed to save!',
  //     `An unexpected error occured while trying to save your ${type}. ${message}`,
  //   );
  // }
  // }, [path, type]);

  const saveVideo = async (video: VideoFile) => {
    console.log(video);
  };

  const clickHandler = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };

  const startRecording = async () => {
    setIsRecording(true);
    camera.current?.startRecording({
      onRecordingFinished: video => saveVideo(video),
      onRecordingError: error => console.error(error),
    });
  };

  const stopRecording = async () => {
    await camera.current?.stopRecording();
    setIsRecording(false);
  };

  if (device == null) {
    return <ActivityIndicator style={styles.container} size="large" />;
  }

  return (
    <React.Fragment>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isAppForeground && isFocused}
        video={true}
        audio={true}
      />
      <CaptureButton
        style={styles.captureButton}
        recording={isRecording}
        onClick={clickHandler}
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  captureButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 70,
  },
});

export default CameraView;
