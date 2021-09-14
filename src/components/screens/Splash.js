import React, {Component} from 'react';
import {
    StyleSheet,
    Animated,
    Easing,
    View,
    Alert,
    Image,
    Text,
    StatusBar,
} from 'react-native';
export default class Splash extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.animatedValue1 = new Animated.Value(0);
        this.animatedValue2 = new Animated.Value(0);
        this.animatedValue3 = new Animated.Value(0);
    }

    componentDidMount() {
        this.animate();
        this.splash();
    }
    splash() {
        setTimeout(() => {
           this.props.navigation.navigate('Login');

        }, 6000);
    }

    animate() {
        this.animatedValue1.setValue(0);
        this.animatedValue2.setValue(0);
        this.animatedValue3.setValue(0);
        const createAnimation = (value, duration, easing, delay = 0) => {
            return Animated.timing(value, {
                toValue: 1,
                duration,
                easing,
                delay,
                useNativeDriver:false
            });
        };
        Animated.sequence([
            createAnimation(this.animatedValue1, 1000, Easing.ease),
            createAnimation(this.animatedValue2, 1000, Easing.ease),
            createAnimation(this.animatedValue3, 1000, Easing.ease),

        ]).start();
    }

    render() {
        const scale = this.animatedValue1.interpolate({
            inputRange: [0, 1],
            outputRange: [0.1, 1],
        });
        const opacity = this.animatedValue2.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        });
        const introtext = this.animatedValue3.interpolate({
            inputRange: [0, 1],
            outputRange: [-200, 10],
        });

        return (
            <View style={styles.container}>
                <StatusBar hidden={true} translucent={true} networkActivityIndicatorVisible={true}
                           barStyle="light-content"/>
                <View style={{flex: 1, justifyContent: 'center',alignItems: 'center'}}>
                <Animated.View style={{transform: [{scale: scale}]}}>
                <Image style={styles.logo} source={require('../../../assets/images/logo.png')}/>
                    </Animated.View>
                    {/* <Animated.View style={{opacity}}>
                        <Text style={styles.brand}>اپلیکیشن املاک پتوس</Text>
                    </Animated.View> */}
                </View>                
                {/* <Animated.View style={{bottom: introtext}}>
                <Text style={styles.textversion}>طراحی و پیاده سازی شرکت ایده پردازان پارس آراد</Text>
                </Animated.View> */}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    logo: {
        width: 100,
         height: 150
        },
    brand:{
        color:'#888',
        fontSize:28,
        alignSelf:'center',
        fontFamily:"Kalameh_Bold",
        marginTop:30
    },
    textversion: {
        fontSize: 11,
         color: '#777',
         marginBottom:15,
         justifyContent:'center',
         alignSelf:'center', 
         fontFamily:"Dana-FaNum-Medium"
    },
});