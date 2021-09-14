import React, { Component } from 'react';
import { Text, View, StyleSheet,Image, FlatList,ScrollView,TouchableHighlight } from 'react-native';
import { Slider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propertyType: [
        {
          id: 1,
          title: 'ویلایی',
          image: require('../../../assets/images/apartment.png')
        },
        {
          id: 2,
          title: 'آپارتمان',
          image: require('../../../assets/images/apartment.png')
        },
        {
          id: 3,
          title: 'ویلایی',
          image: require('../../../assets/images/apartment.png')
        }
      ],
      flag:false,
      value: 5,
      multiSliderValue: 3,

    };
  }
  toggleClick(id) {
    this.setState({
      flag: !this.state.flag,
    });
  }

  enableScroll = () => this.setState({ scrollEnabled: true });
  disableScroll = () => this.setState({ scrollEnabled: false });
  render() {
    return (
      <View style={styles.container}>

        <FlatList
          contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
          data={this.state.propertyType}
          numColumns={3}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={({ item }) => {
            return (
              <TouchableHighlight underlayColor={'#fff'} style={{ marginHorizontal: 10, marginVertical: 15 }}
                onPress={(index) => this.toggleClick(index)}>
                <View style={[styles.touchableStyle, {
                  backgroundColor: (this.state.flag === true ? '#e7f3ef' : '#f1f1f0'),
                  borderWidth: 1, borderColor: (this.state.flag === true ? '#01A545' : '#fff'), color: (this.state.flag === true ? '#fff' : '#01A545')
                }]}>
                  <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <Image source={item.image} style={{ width: 20, height: 20, borderRadius: 5, marginRight: 5 }} tintColor={(this.state.flag === true ? '#01A545' : '#777')} />
                    <Text style={{ textAlign: "center", fontFamily: "Dana-FaNum-Medium", color: (this.state.flag === true ? '#01A545' : '#777') }}>
                      {item.title}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
            );
          }}
        />
        <Text>Search</Text>
        <ScrollView scrollEnabled={this.state.scrollEnabled}>
          {/* <MultiSlider
            isMarkersSeparated={true}
            onValuesChangeStart={this.disableScroll}
            onValuesChangeFinish={this.enableScroll}
          /> */}
          {/* <View>
            <Text>Two Markers:</Text>
            <Text >{multiSliderValue[0]} </Text>
            <Text>{multiSliderValue[1]}</Text>
          </View> */}
          {/* <MultiSlider
            values={[this.state.multiSliderValue[0], this.state.multiSliderValue[1]]}
            sliderLength={250}
            // onValuesChange={multiSliderValuesChange}
            min={0}
            max={10}
            step={1}
            allowOverlap
            snapped
            customLabel={'ok'}
          /> */}

{/* 
          <MultiSlider
            values={[this.state.multiSliderValue[0], this.state.multiSliderValue[1]]}
            sliderLength={250}
            //  onValuesChange={multiSliderValuesChange}
            min={0}
            max={10}
            step={1}
            allowOverlap
            snapped
            customLabel={'ok'}
          /> */}


        </ScrollView>
        <Slider
          value={this.state.value}
          onValueChange={(value) => this.setState({ value })}
          maximumValue={5000}
          minimumValue={50}
          step={1}
          orientation={'rtl'}
          trackStyle={{ height: 10, backgroundColor: 'transparent' }}
          thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
          maximumTrackTintColor={'#01a545'}
          minimumTrackTintColor={'#c9c9c9'}
          thumbProps={{
            children: (
              <Icon
                name="circle"
                type="font-awesome"
                size={20}
                reverse
                containerStyle={{ bottom: 20, right: 20 }}
                color="#01a545"
              />
            ),
          }}
        />
      </View>
    );
  }
}



// React Native Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  touchableStyle: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 35,

  },
});