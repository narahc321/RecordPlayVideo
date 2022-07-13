import React from 'react';
import {
  Text,
  ViewProps,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface Props extends ViewProps {
  recording: Boolean;
  onClick: () => {};
}

const CaptureButton: React.FC<Props> = ({
  style,
  recording,
  onClick,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles.buttonView, style]}
      {...props}
      onPress={onClick}>
      <View style={recording ? styles.innerViewRecording : styles.innerView} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    borderWidth: 4,
    borderColor: 'white',
    width: 75,
    height: 75,
    borderRadius: 100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerView: {
    borderRadius: 100,
    backgroundColor: 'red',
    width: 60,
    height: 60,
  },
  innerViewRecording: {
    borderRadius: 100,
    backgroundColor: 'red',
    width: 40,
    height: 40,
  },
});

export default CaptureButton;
