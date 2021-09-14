import React, { Component } from 'react';
import { View, StatusBar,StyleSheet } from "react-native";
import { Appbar } from 'react-native-paper';
export default class Header extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View>
                <StatusBar hidden={false} backgroundColor='#01A545' />
                <Appbar.Header style={{ backgroundColor: '#fff', marginTop: 25 }}>
                    <Appbar.Content titleStyle={styles.Appbar} title={this.props.title} />
                 <Appbar.Action size={35} color={'#555'} icon="chevron-right" onPress={this.props.onBackPress} />
                </Appbar.Header>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
 
    Appbar: {
        color: '#444',
        fontFamily: 'Dana-FaNum-Medium',
        fontSize: 14,
       textAlign: 'right',
    },
});