import 'react-native-gesture-handler';
import { AppRegistry, ScrollView } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import Geolocation from '@react-native-community/geolocation';
ScrollView.defaultProps = {
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
  bounces: false,
  keyboardDismissMode: 'on-drag',
};

Geolocation.setRNConfiguration({
  authorizationLevel: 'whenInUse',
  skipPermissionRequests: false,
});

AppRegistry.registerComponent(appName, () => App);
