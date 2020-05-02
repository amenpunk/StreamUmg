/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import * as firebase from 'firebase';
import {FBconfig} from './config/firebase';
firebase.initializeApp(FBconfig());
console.disableYellowBox = true;


AppRegistry.registerComponent(appName, () => App);
