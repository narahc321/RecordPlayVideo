import React from 'react';
import {
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {ReadDirItem} from '../Types';

interface Props extends ListRenderItemInfo<ReadDirItem> {
  onPlay: (index: number) => void;
}

const InfoCard: React.FC<Props> = ({index, item, onPlay}) => {
  // return <Text>{JSON.stringify([index, separators, item])}</Text>;
  return (
    <View style={styles.container}>
      <Text style={styles.videoName}>
        {JSON.stringify(item.path.split('/').slice(-1)[0])}
      </Text>
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={() => {
          onPlay(index);
        }}>
        <Text>Play</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.uploadButton}>
        <Text>Upload</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    margin: 1,
  },
  videoName: {
    flex: 1,
  },
  uploadButton: {
    backgroundColor: 'lavender',
    padding: 10,
    margin: 2,
    borderRadius: 10,
  },
});

export default InfoCard;
