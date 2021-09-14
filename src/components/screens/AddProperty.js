import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Header from "../layouts/Header";

export default class AddProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Header title="ثبت ملک" onBackPress={() => { this.props.navigation.goBack() }} />
        <Text>AddProperty</Text>
      </View>
    );
  }
}

// React Native Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});