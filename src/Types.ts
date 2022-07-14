import {NavigationProp} from '@react-navigation/native';
import * as RNFS from 'react-native-fs';

export type ScreenProps = {
  navigation: NavigationProp<any, any>;
};

export type ReadDirItem = RNFS.ReadDirItem;
