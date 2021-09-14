import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

//global screens
import Splash from './components/screens/Splash';
import Home from './components/screens/Home';
import  Dashboard from './components/layouts/Dashboard';
import  PropertyDetail from './components/screens/PropertyDetail';
import  Login from './components/screens/Login';
import  Search from './components/screens/Search';

import {connect} from 'react-redux';
const RootStack = createStackNavigator({
        Splash: {screen: Splash,navigationOptions: ({navigation}) => ({
            headerShown: false
            })
        },
        Search: {
            screen: Search,
            navigationOptions: ({navigation}) => ({
                headerShown: false
            })
        },
        Home: {
            screen: Home,
            navigationOptions: ({navigation}) => ({
                headerShown: false
            })
        },
        Dashboard: {
            screen: Dashboard,
            navigationOptions: ({navigation}) => ({
                headerShown: false
            })
        },
        PropertyDetail: {
            screen: PropertyDetail,
            navigationOptions: ({navigation}) => ({
                headerShown: false
            })
        },
        Login: {
            screen: Login,
            navigationOptions: ({navigation}) => ({
                headerShown: false
            })
        },
    },
    {
        initialRouteName: 'Splash',
    },
    {
        defaultNavigationOptions: {headerShown: false}
    }
);

const mapStateToProps = state => {
    return {
        dataLogin: state.AuthUser.dataLogin,
    };
};
export default connect(mapStateToProps)(createAppContainer(RootStack));
//export default createAppContainer(RootStack);
