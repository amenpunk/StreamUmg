import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoadingScreen from './components/LoadingScreen';
import RegisterScreen from './components/RegisterScreen';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import FormScreen from './components/FormScreen';

const AppStack = createStackNavigator(
    {
        Home: HomeScreen,
        Form: FormScreen
    },
    {
        headerMode: 'none',
    },
);

const AuthStack = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen,
});

export default createAppContainer(
    createSwitchNavigator(
        {
            Loading: LoadingScreen,
            App: AppStack,
            Auth: AuthStack,
            Form: FormScreen
        },
        {
            initialRouteName: 'Loading',
        },
    ),
);
