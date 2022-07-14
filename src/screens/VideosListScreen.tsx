import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import * as RNFS from 'react-native-fs';

import {ScreenProps} from '../Types';
import {DIRECTORY_PATH} from '../Constants';
import {ReadDirItem} from '../Types';
import InfoCard from '../components/InfoCard';

const VideosListScreen: React.FC<ScreenProps> = ({navigation}) => {
  const [videosList, setVideosList] = useState<ReadDirItem[]>([]);

  useEffect(() => {
    const setAllVideos = async () => {
      setVideosList(await RNFS.readDir(DIRECTORY_PATH));
    };
    setAllVideos();
  }, []);

  // console.log(JSON.stringify(videosList));

  const playVideoHandler = (index: number) => {
    // console.log(videosList[index]);
    navigation.navigate('VideoPlayerScreen', {
      videos: JSON.stringify([videosList[index]]),
    });
    return;
  };

  return (
    <View>
      <FlatList
        data={[...videosList]} //, ...videosList, ...videosList, ...videosList]}
        renderItem={({item, index, separators}) => (
          <InfoCard
            item={item}
            index={index}
            separators={separators}
            onPlay={playVideoHandler}
          />
        )}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 2,
  },
});

export default VideosListScreen;
