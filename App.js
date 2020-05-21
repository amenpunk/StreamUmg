import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoadingScreen from './components/LoadingScreen';
import RegisterScreen from './components/RegisterScreen';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import FormScreen from './components/FormScreen';
import AddScreen from './components/AddScreen';
import MessageScreen from './components/MessageScreen';
import WatchScreen from './components/WatchScreen';
import EmitScreen from './components/EmitScreen';
import ImageScreen from './components/ImageScreen';

const AppStack = createStackNavigator(
    {
        Home: HomeScreen,
        Form: FormScreen,
        Add: AddScreen,
        Mess: MessageScreen,
        Watch: WatchScreen,
        Emit: EmitScreen,
        Image: ImageScreen
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
        },
        {
            initialRouteName: 'Loading',
        },
    ),
);
