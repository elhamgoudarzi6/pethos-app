import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
const { width, height } = Dimensions.get('window');
import { AirbnbRating, TabView, Tab } from 'react-native-elements';
import { IconFill, IconOutline } from "@ant-design/icons-react-native";
import Header from "../layouts/Header";
export default class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritesProperty: [
        {
          id: 1,
          title: 'خانه دو خوابه جدید ساز',
          image: require('../../../assets/images/home.jpg'),
          price: '20000',
          transactionType: "اجاره",
          priceType: 0,
          adress: " کوی اساتید کوچه اساتید 2",
          agentName: "الهام گودرزی",
          agentNumber: "+989168509001",
          agentProfile: require('../../../assets/images/admin.png'),
          agentRating: 3,
          bed: 2,
          bath: 1,
          age: 3,
          area: 160,
        },
        {
          id: 2,
          title: 'خانه دو خوابه جدید ساز',
          image: require('../../../assets/images/home.jpg'),
          price: '20000',
          transactionType: "فروش",
          priceType: 1,
          adress: "میدان علوی کوچه آرش 2",
          agentName: "الهام گودرزی",
          agentProfile: require('../../../assets/images/admin.png'),
          agentNumber: "+989168509001",
          agentRating: 3,
          bed: 2,
          bath: 1,
          age: 3,
          area: 160,
        },
        {
          id: 3,
          title: 'خانه دو خوابه جدید ساز',
          image: require('../../../assets/images/home.jpg'),
          price: '20000',
          transactionType: "اجاره",
          priceType: 0,
          adress: "میدان 22 بهمن فاز یک",
          agentName: "الهام گودرزی",
          agentProfile: require('../../../assets/images/admin.png'),
          agentNumber: "+989168509001",
          agentRating: 3,
          bed: 2,
          bath: 1,
          age: 3,
          area: 160,
        },
        {
          id: 4,
          title: 'خانه دو خوابه جدید ساز',
          image: require('../../../assets/images/home.jpg'),
          price: '20000',
          transactionType: "فروش",
          priceType: 1,
          adress: "خیابان مطهری",
          agentName: "الهام گودرزی",
          agentProfile: require('../../../assets/images/admin.png'),
          agentNumber: "+989168509001",
          agentRating: 3,
          bed: 2,
          bath: 1,
          age: 3,
          area: 160,
        },

      ],
    };
  }

  dialCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    else { phoneNumber = `telprompt:${number}`; }
    Linking.openURL(phoneNumber);
  };
  render() {
    return (
      <View style={styles.container}>
        <Header title="مورد علاقه" onBackPress={() => { this.props.navigation.goBack() }} />
        <FlatList
          showsHorizontalScrollIndicator={false}
          inverted
          contentContainerStyle={{
            paddingStart: -1,
            paddingEnd: 5,
            marginTop: 2
          }}
          data={this.state.favoritesProperty}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={({ item, index }) => {
            return (
              <View>
                <View style={{
                  flex: 1, width: '95%', borderRadius: 10, padding: 5, marginHorizontal: 10, marginVertical: 5}}>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('PropertyDetail')}>
                    <Image style={{ width: width - 50, height: 200, alignSelf: 'center', borderRadius: 15, marginTop: 5 }} source={item.image} />
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: -175, paddingHorizontal: 15 }}>
                      <Text style={[styles.priceType, { backgroundColor: '#01A545', color: "#fff" }]}>{item.transactionType}</Text>
                      <IconFill name="heart" size={18} style={{ color: '#01a545', backgroundColor: "#fff", padding: 6, borderRadius: 30, marginRight: 15 }} />
                    </View>
                  </TouchableOpacity>
                  <View style={{ flex: 1, marginTop: 155, marginHorizontal: 20 }}>
                    <View>
                      <View style={styles.row}>
                      <Text style={[styles.priceType, { backgroundColor: (item.priceType === 0 ? '#01A545' : '#fdb93c') }]}>{(item.priceType === 0 ? 'به قیمت' : 'مناسب')}</Text>

                        <Text style={styles.title}>{item.title}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', paddingVertical: 5, justifyContent: "flex-end" }}>
                        <Text style={[styles.icon, { marginRight: 3, textAlign: "right" }]} >{item.adress}</Text>
                        <Icon name='map-marker' size={20} color='#a4a4a4' />
                      </View>
                      <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between", borderTopColor: "#bcbcbc", borderTopWidth: 0.2, paddingVertical: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={styles.icon}>{[item.bath, " حمام"]}</Text>
                          <Icon style={{ marginTop: 2 }} name='bath' size={16} color='#a4a4a4' />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={styles.icon}>{[item.bed, " خوابه"]}</Text>
                          <View>
                            <Icon style={{ marginTop: 2 }} name='bed' size={16} color='#a4a4a4' />
                          </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={styles.icon}>{[item.area, "m"]}</Text>
                          <Icon name='arrows-alt' size={14} color='#a4a4a4' style={{ marginTop: 4 }} />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={styles.icon}>{[item.age, "  سال "]}</Text>
                          <FontAwesomeIcon icon={faCalendar} size={14} style={{ color: '#a4a4a4', marginTop: 4 }} />
                        </View>
                      </View>
                      {/* 
                      <View style={styles.row}>
                        <Text style={[styles.priceType, { backgroundColor: (item.priceType === 0 ? '#01A545' : '#fdb93c') }]}>{(item.priceType === 0 ? 'به قیمت' : 'مناسب')}</Text>
                        <Text style={[styles.priceType, { backgroundColor: '#e7f3ef', color: "#01A545" }]}>{item.transactionType}</Text>
                      </View> */}
                      <View style={{ flex: 1, flexDirection: 'row', borderTopColor: "#bcbcbc", borderTopWidth: 0.2, alignItems: 'center', justifyContent: 'space-between', paddingVertical: 5 }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                          <Icon size={22} name={'phone'} color={'#01A545'} style={{ padding: 10, marginRight: 5 }}
                            onPress={() => { this.dialCall(item.agentNumber) }}></Icon>
                          <Icon size={22} name={'whatsapp'} color={'#01A545'} style={{ padding: 10 }}></Icon>
                        </View>
                        <View style={styles.row}>

                          <AirbnbRating style={{ marginTop: -10 }}
                            count={5}
                            reviews={["بد", "معمولی", "خوب", "خیلی خوب", "عالی"]}
                            defaultRating={3}
                            size={18}
                            showRating={false}
                            onFinishRating={this.ratingCompleted}
                          />
                          <View>
                            <Text style={styles.txtAgent}>{item.agentName}</Text>
                            <Text style={styles.txtAgent}>امتیاز {item.agentRating}/5</Text>
                          </View>
                          <Image source={item.agentProfile} style={{ width: 30, height: 30, borderRadius: 30, }} />

                        </View>
                      </View>

                    </View>
                  </View>
                </View>
              </View>

            )
          }
          }
        />
      </View>
    );
  }
}

// React Native Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  row: {
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  touchableStyle: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 35,

  },
  sectionContainer: {
    backgroundColor: '#fff',
    padding: 5,
    marginTop: 10,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionTitle: {
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'Dana-FaNum-Bold',
    color: '#777',
  },
  title: {
    fontSize: 12,
    fontFamily: "Dana-FaNum-Bold",
    color: '#555',
  },
  propertyImage: {
    flex: 2,
    width: 140,
    height: 120,
    borderRadius: 5,
    marginLeft: 5
  },
  icon: {
    fontFamily: 'Dana-FaNum-Medium',
    fontSize: 10,
    color: '#777',
    marginTop: 4,
    marginHorizontal: 5
  },
  txtAgent: {
    fontSize: 12,
    color: '#444',
    paddingRight: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    fontFamily: "Dana-FaNum-Medium",
    marginLeft: 20
  },
  priceType: {
    fontFamily: 'Dana-FaNum-Medium',
    fontSize: 12,
    color: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderRadius: 15
  }
});