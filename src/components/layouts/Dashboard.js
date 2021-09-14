import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faNewspaper, faPhoneSquareAlt, faPlusCircle, faQuestionCircle, faSearchPlus, faShareAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer, } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import News from '../screens/News';
import AboutUs from '../screens/AboutUs';
import ContactUs from '../screens/ContactUs';
import Faq from '../screens/Faq';
import Help from '../screens/Help';
import Home from '../screens/Home';
import AddProperty from '../screens/AddProperty';
import RequestProperty from '../screens/RequestProperty';
import BottomTabNavigator from '../layouts/BottomTabNavigator';
import { IconFill, IconOutline } from "@ant-design/icons-react-native";

const CustomDrawerComponent = props => (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <View style={styles.header}>
            <Image style={styles.logo} source={require('../../../assets/images/logo5.png')} />
        </View>
        <View style={styles.menu}>
            <ScrollView>
                <DrawerItems {...props} />
            </ScrollView>
        </View>
        <View style={styles.footer}>
        </View>
    </View>
);
const styles = StyleSheet.create({
    containert: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "center",
        alignItems: "center"
    },
    header: {
        height: 150,
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        width: 100,
        height: 30,
        marginTop: 40
    },
    menu: {
        flex: 1
    },
    footer: {
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    row: {
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        borderTopColor: "#f2f1f1",
        borderTopWidth: 0.8,
        flex: 1
    },
    title: {
        fontSize: 13,
        fontFamily: "Dana-FaNum-Medium",
        // fontFamily: "Kalameh_Bold",
        color: '#333',
        marginRight: 10
    },
    icon: {
        color: '#9e9e9e',
        //  color: '#83c9a9'
    },
});
const CustomerMyDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: BottomTabNavigator,
        navigationOptions: {
            headerShown: false,
            drawerLabel: (
                <View style={styles.row}>
                    <Text style={styles.title}>صفحه اصلی</Text>
                    <IconOutline name="home" size={20} style={styles.icon} />
                </View>
            ),
        },
        contentOptions: {
            activeTintColor: '#fff',
        }
    },
    AddProperty: {
        screen: AddProperty,
        navigationOptions: {
            headerShown: false,
            drawerLabel: (
                <View style={styles.row}>
                    <Text style={styles.title}>ثبت ملک</Text>
                    <IconOutline name="plus-circle" size={20} style={styles.icon} />
                </View>
            ),
        },
        contentOptions: {
            activeTintColor: '#fff',
        }
    },
    RequestProperty: {
        screen: RequestProperty,
        navigationOptions: {
            headerShown: false,
            drawerLabel: (
                <View style={styles.row}>
                    <Text style={styles.title}>درخواست ملک</Text>
                    <IconOutline name="search" size={20} style={styles.icon} />
                </View>
            ),
        },
        contentOptions: {
            activeTintColor: '#fff',
        }
    },
    News: {
        screen: News,
        navigationOptions: {
            headerShown: false,
            drawerLabel: (
                <View style={styles.row}>
                    <Text style={styles.title}>اخبار پتوس</Text>
                    <Icon size={18} style={styles.icon} name='newspaper-o' />
                </View>
            ),
        },
        contentOptions: {
            activeTintColor: '#fff',
        }
    },
    Faq: {
        screen: Faq,
        navigationOptions: {
            headerShown: false,
            drawerLabel: (
                <View style={styles.row}>
                    <Text style={styles.title}>سوالات متداول</Text>
                    <IconOutline name="question-circle" size={20} style={styles.icon} />
                </View>
            ),
        },
        contentOptions: {
            activeTintColor: '#fff',
        }
    },

    Help: {
        screen: Help,
        navigationOptions: {
            headerShown: false,
            drawerLabel: (
                <View style={styles.row}>
                    <Text style={styles.title}>راهنما</Text>
                    <IconOutline name="read" size={20} style={styles.icon} />
                </View>
            ),
        },
        contentOptions: {
            activeTintColor: '#fff',
        }
    },
    AboutUs: {
        screen: AboutUs,
        navigationOptions: {
            headerShown: false,
            drawerLabel: (
                <View style={styles.row}>
                    <Text style={styles.title}>درباره ما</Text>
                    <IconOutline name="info-circle" size={20} style={styles.icon} />
                </View>
            ),
        },
        contentOptions: {
            activeTintColor: '#fff',
        }
    },
    ContactUs: {
        screen: ContactUs,
        navigationOptions: {
            headerShown: false,
            drawerLabel: (
                <View style={styles.row}>
                    <Text style={styles.title}>تماس با ما</Text>
                    <IconOutline name="phone" size={20} style={styles.icon} />
                </View>
            ),
        },
        contentOptions: {
            activeTintColor: '#fff',
        }
    }
},
    {
        drawerPosition: 'right',
        drawerWidth: 235,

        initialRouteName: 'Home',
        contentComponent: CustomDrawerComponent,
        contentOptions: {
            activeTintColor: '#fff',
            inactiveTintColor: '#fff',
            activeBackgroundColor: '#fff',
            inactiveBackgroundColor: '#fff',
            itemsContainerStyle: {
                backgroundColor: '#fff',
                //  opacity:0.8
            },
        },
    }
)
export default createAppContainer(CustomerMyDrawerNavigator);
