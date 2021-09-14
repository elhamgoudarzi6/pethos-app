import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import AddProperty from '../screens/AddProperty';
import Favorites from '../screens/Favorites';
import Chat from '../screens/Chat';
import { IconFill, IconOutline } from "@ant-design/icons-react-native";
export default class BottomTabNavigator extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <AppContainer screenProps={this.props.navigation} />;
    }
}
const AppMaterialTopTabNavigator = createMaterialBottomTabNavigator(
    {
        Profile: {
            screen: Profile,
            navigationOptions: {
                tabBarLabel:<Text style={{fontFamily: 'Dana-FaNum-Medium',fontSize: 11}}>حساب من</Text> ,
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <IconOutline name="user" size={20} style={{ color: tintColor }} />
                    </View>),
            }
        },
        Favorites: {
            screen: Favorites,
            navigationOptions: {
                tabBarLabel:<Text style={{fontFamily: 'Dana-FaNum-Medium',fontSize: 11}}>علاقه مندی</Text> ,
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        {/* <{tintColor === '#01A545' ? IconFill : IconOutline} name="heart" size={20} style={{ color: tintColor }} /> */}
                        <IconOutline name="heart" size={20} style={{ color: tintColor }} />
                    </View>),
            }
        },
        AddProperty: {
            screen: AddProperty,
            navigationOptions: {
                tabBarLabel:<Text style={{fontFamily: 'Dana-FaNum-Medium',fontSize: 11}}>ثبت ملک</Text> ,
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <IconOutline name="plus-circle" size={20} style={{ color: tintColor }} />
                    </View>),
            }
        },
        Chat: {
            screen: Chat,
            navigationOptions: {
                tabBarLabel:<Text style={{fontFamily: 'Dana-FaNum-Medium',fontSize: 11}}>گفتگو</Text> ,
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <IconOutline name="message" size={20} style={{ color: tintColor }} />
                    </View>
                ),
            }
        },
        Home: {
            screen: Home,
            navigationOptions: {
                tabBarLabel:<Text style={{fontFamily: 'Dana-FaNum-Medium',fontSize: 11}}>صفحه اصلی</Text> ,
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <IconOutline name="home" size={20} style={{ color: tintColor }} />
                    </View>
                ),
            }
        },

    },
    {
        initialRouteName: 'Home',
        activeColor: '#01A545',
        inactiveTintColor: '#333',
        barStyle: { backgroundColor: '#fff', borderTopWidth: 0.8, borderTopColor: "#ececec" },
        swipeEnabled: true,
        animationEnabled: true,
        shifting: false,
        tabBarLabel: { titleStyle: { fontFamily: 'Dana-FaNum-Medium', fontSize: 30 } },
    },
);

const AppContainer = createAppContainer(AppMaterialTopTabNavigator);
