import React, { Component } from 'react';
import {Text, View,StyleSheet} from 'react-native';
export default class RequestProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
}   
  render() {
  return (
    <View style={styles.container}>
      <Text>RequestProperty</Text>
    </View>
  );
}
}

// React Native Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});