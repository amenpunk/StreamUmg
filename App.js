import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import LoadingScreen from './components/LoadingScreen';
import RegisterScreen from './components/RegisterScreen';
import LoginScreen from './components/LoginScreen';
import Stream from './components/Main';
import HomeScreen from './components/HomeScreen';
import * as firebase from 'firebase';
import { FBconfig} from './config/firebase';

firebase.initializeApp(FBconfig());


const AppStack = createStackNavigator({
    Home :HomeScreen
})

const AuthStack = createStackNavigator({
    Login : LoginScreen,
    Register : RegisterScreen,
})


export default createAppContainer((
    createSwitchNavigator(
        {
            Loading : LoadingScreen,
            App : AppStack,
            Auth : AuthStack
        },
        {
            initialRouteName : "Loading"
        }
    )
))
