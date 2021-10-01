import React, { Component } from "react";
import {
  Dimensions,
  Platform,
  Linking,
  Text,
  TouchableHighlight,
  Image,
  View,
  StyleSheet,
  StatusBar,
  BackHandler,
  Alert,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Searchbar, TextInput } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars, faWarehouse, faCalendar } from "@fortawesome/free-solid-svg-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import { SliderBox } from "react-native-image-slider-box";
import { AirbnbRating, TabView, Tab } from "react-native-elements";
import Carousel from "react-native-snap-carousel";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      scrollWithoutAnimation: true,
      selected: false,
      flag: false,
      itemId: null,
      selectionCat: [],
      routes: [
        { key: "first", title: "مسکونی" },
        { key: "second", title: "تجاری" },
      ],
      index: 0,
      SliderUrl: [
        require("../../../assets/images/banner.jpg"),
        require("../../../assets/images/banner.jpg"),
        require("../../../assets/images/banner.jpg"),
      ],
      propertyType: [
        {
          id: 1,
          title: "ویلایی",
          image: require("../../../assets/images/apartment.png"),
        },
        {
          id: 2,
          title: "آپارتمان",
          image: require("../../../assets/images/apartment.png"),
        },
        {
          id: 3,
          title: "ویلایی",
          image: require("../../../assets/images/apartment.png"),
        },
        {
          id: 4,
          title: "آپارتمان",
          image: require("../../../assets/images/apartment.png"),
        },
        {
          id: 5,
          title: "آپارتمان",
          image: require("../../../assets/images/apartment.png"),
        },
        {
          id: 6,
          title: "آپارتمان",
          image: require("../../../assets/images/apartment.png"),
        },
      ],
      popularProperty: [
        {
          id: 1,
          title: "خانه دو خوابه جدید ساز",
          image: require("../../../assets/images/home.jpg"),
          price: "20000",
          transactionType: "اجاره",
          priceType: 0,
          adress: " کوی اساتید کوچه اساتید 2",
          agentName: "الهام گودرزی",
          agentNumber: "+989168509001",
          agentProfile: require("../../../assets/images/admin.png"),
          agentRating: 3,
          bed: 2,
          bath: 1,
          age: 3,
          area: 160,
        },
        {
          id: 2,
          title: "خانه دو خوابه جدید ساز",
          image: require("../../../assets/images/home.jpg"),
          price: "20000",
          transactionType: "فروش",
          priceType: 1,
          adress: "میدان علوی کوچه آرش 2",
          agentName: "الهام گودرزی",
          agentProfile: require("../../../assets/images/admin.png"),
          agentNumber: "+989168509001",
          agentRating: 3,
          bed: 2,
          bath: 1,
          age: 3,
          area: 160,
        },
        {
          id: 3,
          title: "خانه دو خوابه جدید ساز",
          image: require("../../../assets/images/home.jpg"),
          price: "20000",
          transactionType: "اجاره",
          priceType: 0,
          adress: "میدان 22 بهمن فاز یک",
          agentName: "الهام گودرزی",
          agentProfile: require("../../../assets/images/admin.png"),
          agentNumber: "+989168509001",
          agentRating: 3,
          bed: 2,
          bath: 1,
          age: 3,
          area: 160,
        },
        {
          id: 4,
          title: "خانه دو خوابه جدید ساز",
          image: require("../../../assets/images/home.jpg"),
          price: "20000",
          transactionType: "فروش",
          priceType: 1,
          adress: "خیابان مطهری",
          agentName: "الهام گودرزی",
          agentProfile: require("../../../assets/images/admin.png"),
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


  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backPressed);
  }

  dialCall = (number) => {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  setIndex = e => {
    console.log(e);
    this.setState({ index: e.target.index });
  };

  ratingCompleted(rating) {
    Alert.alert(
      "ثبت امتیاز",
      "امتیاز که ثبت می شود " + rating + " می باشد آیا مطمئنید؟ ",
      [
        {
          text: "خیر",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "بله" },
      ],
      { cancelable: false },
    );
  }

  backPressed = () => {
    let { routeName } = this.props.navigation.state;
    if (this.props.navigation.isFocused()) {
      Alert.alert(
        "خروج از پتوس",
        "آیا قصد خروج از اپلیکیشن را دارید؟",
        [
          {
            text: "خیر",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "بله", onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: false },
      );
      return true;
    }
  };

  toggleDrawer = () => {
    this.props.navigation.openDrawer();
  };

  toggleClick = (id) => {
    this.setState({
      itemId: id, flag: !this.state.flag,
    });
  };

  _renderItem = ({ item, index }) => {
    return (
      <View>
        <View
          style={{ flex: 1, backgroundColor: "#fff", width: 250, borderRadius: 5, padding: 5, marginHorizontal: 5 }}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate("PropertyDetail")}>
            <Image style={{ width: 240, height: 140, alignSelf: "center", borderRadius: 5 }} source={item.image} />
            <View style={[styles.row, { marginTop: -135 }]}>
              <Text
                style={[styles.priceType, { backgroundColor: (item.priceType === 0 ? "#01A545" : "#fdb93c") }]}>{(item.priceType === 0 ? "به قیمت" : "مناسب")}</Text>
              <Text style={[styles.priceType, {
                backgroundColor: "#e7f3ef",
                color: "#01A545",
              }]}>{item.transactionType}</Text>
            </View>
          </TouchableOpacity>
          <View style={{ flex: 1, marginTop: 110 }}>
            <View style={{ flex: 5, marginTop: 5 }}>
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.row}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.icon}>{[item.bath, " حمام"]}</Text>
                  <Icon style={{ marginTop: 2 }} name="bath" size={16} color="#a4a4a4" />
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.icon}>{[item.bed, " خوابه"]}</Text>
                  <View>
                    <Icon style={{ marginTop: 2 }} name="bed" size={16} color="#a4a4a4" />
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.icon}>{[item.area, " متر "]}</Text>
                  <Icon name="arrows-alt" size={14} color="#a4a4a4" style={{ marginTop: 4 }} />
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.icon}>{[item.age, "  سال "]}</Text>
                  <FontAwesomeIcon icon={faCalendar} size={14} style={{ color: "#a4a4a4", marginTop: 4 }} />
                </View>
              </View>
              <View style={{
                alignItems: "flex-end",
                borderTopColor: "#ececec",
                borderTopWidth: 0.8,
                paddingTop: 5,
                paddingHorizontal: 5,
              }}>
                <View style={{ flexDirection: "row", paddingVertical: 5 }}>
                  <Text style={[styles.icon, { marginRight: 3, textAlign: "right" }]}>{item.adress}</Text>
                  <Icon name="map-marker" size={18} color="#a4a4a4" />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  render() {


    const FirstRoute = () => (
      <View style={[styles.scene, { backgroundColor: "#fff" }]}>
        <Text style={{ fontFamily: "Dana-FaNum-Medium", alignSelf: "center", color: "#777" }}>دسته بندی مسکونی</Text>
      </View>
    );
    const SecondRoute = () => (
      <View style={[styles.scene, { backgroundColor: "#fff" }]}>
        <Text style={{ fontFamily: "Dana-FaNum-Medium", alignSelf: "center", color: "#777" }}>دسته بندی تجاری</Text>
      </View>
    );


    return (
      <View style={styles.container}>
        <StatusBar hidden={false} backgroundColor="#01A545" />
        <View style={styles.header}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Icon size={20} name={"sort-amount-desc"} color={"#999"}
                  style={{ backgroundColor: "#f0f1f1", padding: 10, borderRadius: 5, marginRight: 10 }}></Icon>
            <Icon size={20} name={"filter"} color={"#fff"}
                  style={{ backgroundColor: "#01a545", padding: 10, borderRadius: 5 }}></Icon>
          </View>
          <Image source={require("../../../assets/images/logo5.png")} style={{ width: 90, height: 25 }} />
          <FontAwesomeIcon icon={faBars} size={28} style={{ color: "#999", marginLeft: 105 }}
                           onPress={() => this.props.screenProps.openDrawer()} />
        </View>
        <ScrollView>
          <SliderBox autoplay circleLoop
                     images={this.state.SliderUrl} style={styles.slider}
                     position={this.state.position}
                     onPositionChanged={position => this.setState({ position })}
                     dotColor="#01A545"
                     resizeMethod={"resize"}
                     resizeMode={"cover"}
                     inactiveDotColor="#fff"
                     dotStyle={{
                       width: 10,
                       height: 10,
                       borderRadius: 10,
                       marginHorizontal: 2,
                       padding: 0,
                       margin: 0,
                     }}
                     paginationBoxStyle={{
                       position: "absolute",
                       bottom: 0,
                       padding: 0,
                       alignItems: "center",
                       alignSelf: "center",
                       justifyContent: "center",
                       paddingVertical: 10,
                     }} />


          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>
              جدید ترین املاک
            </Text>
          </View>

          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            inverted
            contentContainerStyle={{
              paddingStart: -1,
              paddingEnd: 5,
              marginTop: 2,
            }}
            data={this.state.popularProperty}
            keyExtractor={(item) => {
              return item.id;
            }}
            renderItem={({ item, index }) => {
              return (
                <View>
                  <View style={{
                    flex: 1,
                    backgroundColor: "#fff",
                    width: 250,
                    borderRadius: 5,
                    padding: 5,
                    marginHorizontal: 5,
                  }}>
                    <TouchableOpacity activeOpacity={0.8}
                                      onPress={() => this.props.navigation.navigate("PropertyDetail")}>
                      <Image style={{ width: 240, height: 140, alignSelf: "center", borderRadius: 5 }}
                             source={item.image} />
                      <View style={[styles.row, { marginTop: -135 }]}>
                        <Text
                          style={[styles.priceType, { backgroundColor: (item.priceType === 0 ? "#01A545" : "#fdb93c") }]}>{(item.priceType === 0 ? "به قیمت" : "مناسب")}</Text>
                        <Text style={[styles.priceType, {
                          backgroundColor: "#e7f3ef",
                          color: "#01A545",
                        }]}>{item.transactionType}</Text>
                      </View>
                    </TouchableOpacity>
                    <View style={{ flex: 1, marginTop: 110 }}>
                      <View style={{ flex: 5, marginTop: 5 }}>
                        <Text style={styles.title}>{item.title}</Text>
                        <View style={styles.row}>
                          <View style={{ flexDirection: "row" }}>
                            <Text style={styles.icon}>{[item.bath, " حمام"]}</Text>
                            <Icon style={{ marginTop: 2 }} name="bath" size={16} color="#a4a4a4" />
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <Text style={styles.icon}>{[item.bed, " خوابه"]}</Text>
                            <View>
                              <Icon style={{ marginTop: 2 }} name="bed" size={16} color="#a4a4a4" />
                            </View>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <Text style={styles.icon}>{[item.area, " متر "]}</Text>
                            <Icon name="arrows-alt" size={14} color="#a4a4a4" style={{ marginTop: 4 }} />
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <Text style={styles.icon}>{[item.age, "  سال "]}</Text>
                            <FontAwesomeIcon icon={faCalendar} size={14} style={{ color: "#a4a4a4", marginTop: 4 }} />
                          </View>
                        </View>
                        <View style={{
                          alignItems: "flex-end",
                          borderTopColor: "#ececec",
                          borderTopWidth: 0.8,
                          paddingTop: 5,
                          paddingHorizontal: 5,
                        }}>
                          <View style={{ flexDirection: "row", paddingVertical: 5 }}>
                            <Text style={[styles.icon, { marginRight: 3, textAlign: "right" }]}>{item.adress}</Text>
                            <Icon name="map-marker" size={18} color="#a4a4a4" />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

              );
            }
            }
          />


          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}> پرفروش ترین ها املاک </Text>
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            inverted
            contentContainerStyle={{
              paddingStart: -1,
              paddingEnd: 5,
              marginTop: 2,
            }}
            data={this.state.popularProperty}
            keyExtractor={(item) => {
              return item.id;
            }}
            renderItem={({ item, index }) => {
              return (
                <View style={{ backgroundColor: "#fff", marginVertical: 5, borderRadius: 10 }}>
                  <TouchableOpacity activeOpacity={0.8}>
                    <View style={[styles.row, { backgroundColor: "#fff", marginTop: 5 }]}>
                      <View style={{ flex: 2, flexDirection: "column", marginRight: 10 }}>
                        <Text style={styles.title}>{item.title}</Text>
                        <View>
                          <View style={styles.row}>
                            <View style={{ flexDirection: "row" }}>
                              <Text style={styles.icon}>{[item.bath, " حمام"]}</Text>
                              <Icon style={{ marginTop: 2 }} name="bath" size={18} color="#a4a4a4" />
                            </View>
                            <View style={{ flexDirection: "row" }}>
                              <Text style={styles.icon}>{[item.age, " سال"]}</Text>
                              <FontAwesomeIcon icon={faCalendar} size={16} style={{ color: "#a4a4a4", marginTop: 2 }} />
                            </View>
                          </View>
                          <View style={styles.row}>
                            <View style={{ flexDirection: "row" }}>
                              <Text style={styles.icon}>{[item.area, " متر "]}</Text>
                              <Icon name="arrows-alt" size={16} color="#a4a4a4" style={{ marginTop: 2 }} />
                            </View>
                            <View style={{ flexDirection: "row" }}>
                              <Text style={styles.icon}>{[item.bed, " خوابه"]}</Text>
                              <View>
                                <Icon style={{ marginTop: 2 }} name="bed" size={18} color="#a4a4a4" />
                              </View>
                            </View>
                          </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: "row", marginTop: 5, justifyContent: "space-between" }}>
                          <Text
                            style={[styles.priceType, { backgroundColor: (item.priceType === 0 ? "#01A545" : "#fdb93c") }]}>{(item.priceType === 0 ? "به قیمت" : "مناسب")}</Text>
                          <Text style={{
                            fontFamily: "Dana-FaNum-Medium",
                            fontSize: 12,
                            color: "#01A545",
                            backgroundColor: "#e7f3ef",
                            paddingHorizontal: 20,
                            paddingVertical: 2,
                            borderRadius: 20,
                          }}>{item.transactionType}</Text>
                        </View>
                      </View>
                      <Image source={item.image} style={styles.propertyImage} />
                    </View>
                  </TouchableOpacity>

                  <View style={{
                    flex: 1,
                    flexDirection: "row",
                    borderTopColor: "#ececec",
                    borderTopWidth: 0.8,
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#fff",
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                  }}>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <Icon size={22} name={"phone"} color={"#01A545"}
                            style={{ padding: 10, borderRadius: 50, marginRight: 10 }}
                            onPress={() => {
                              this.dialCall(item.agentNumber);
                            }}></Icon>
                      <Icon size={22} name={"whatsapp"} color={"#01A545"}
                            style={{ padding: 10, borderRadius: 50 }}></Icon>
                    </View>
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
                    <Image source={item.agentProfile} style={{ width: 30, height: 30, borderRadius: 30 }} />
                  </View>
                </View>
              );
            }
            }
          />


          <View style={{ backgroundColor: "#fff", padding: 10, marginHorizontal: 5, borderRadius: 10, marginTop: 10 }}>
            <Tab value={this.state.index} animationtype={"timing"} indicatorStyle={{ borderColor: "#01A545" }}
                 onChange={(i) => this.setState({ index: i })}>
              <Tab.Item title="مسکونی" titleStyle={{ color: "#01A545", fontFamily: "Dana-FaNum-Bold", fontSize: 12 }} />
              <Tab.Item title="تجاری" titleStyle={{ color: "#01A545", fontFamily: "Dana-FaNum-Bold", fontSize: 12 }} />
            </Tab>

            <TabView value={this.state.index} onChange={(i) => this.setState({ index: i })}>
              <TabView.Item style={{ backgroundColor: "#fff", width: "100%" }}>
                <FlatList
                  contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
                  data={this.state.propertyType}
                  numColumns={3}
                  keyExtractor={item => {
                    return item.id;
                  }}
                  renderItem={({ item }) => {
                    return (
                      <TouchableHighlight underlayColor={"#fff"} style={{ marginHorizontal: 10, marginVertical: 15 }}
                                          onPress={() => this.toggleClick(item.id)}>
                        <View style={[styles.touchableStyle, {
                          backgroundColor: (item.id !== this.state.itemId ? "#e7f3ef" : "#f1f1f0"),
                          borderWidth: 1,
                          borderColor: (item.id !== this.state.itemId ? "#01A545" : "#fff"),
                          color: (item.id !== this.state.itemId ? "#fff" : "#01A545"),
                        }]}>
                          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Image source={item.image}
                                   style={{ width: 20, height: 20, borderRadius: 5, marginRight: 5 }}
                                   tintColor={(item.id !== this.state.itemId ? "#01A545" : "#777")} />
                            <Text style={{
                              textAlign: "center",
                              fontFamily: "Dana-FaNum-Medium",
                              color: (item.id !== this.state.itemId ? "#01A545" : "#777"),
                            }}>
                              {item.title}
                            </Text>
                          </View>
                        </View>
                      </TouchableHighlight>
                    );
                  }}
                />
              </TabView.Item>
              <TabView.Item style={{ backgroundColor: "#fff", width: "100%" }}>
                <FlatList
                  contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
                  data={this.state.propertyType}
                  numColumns={3}
                  keyExtractor={item => {
                    return item.id;
                  }}
                  renderItem={({ item }) => {
                    return (
                      <TouchableHighlight underlayColor={"#fff"} style={{ marginHorizontal: 10, marginVertical: 15 }}
                                          onPress={() => this.toggleClick(item.id)}>
                        <View style={[styles.touchableStyle, {
                          backgroundColor: (item.id !== this.state.itemId ? "#e7f3ef" : "#f1f1f0"),
                          borderWidth: 1,
                          borderColor: (item.id !== this.state.itemId ? "#01A545" : "#fff"),
                          color: (item.id !== this.state.itemId ? "#fff" : "#01A545"),
                        }]}>
                          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Image source={item.image}
                                   style={{ width: 20, height: 20, borderRadius: 5, marginRight: 5 }}
                                   tintColor={(item.id !== this.state.itemId ? "#01A545" : "#777")} />
                            <Text style={{
                              textAlign: "center",
                              fontFamily: "Dana-FaNum-Medium",
                              color: (item.id !== this.state.itemId ? "#01A545" : "#777"),
                            }}>
                              {item.title}
                            </Text>
                          </View>
                        </View>
                      </TouchableHighlight>
                    );
                  }}
                />
              </TabView.Item>
            </TabView>
          </View>
        </ScrollView>
        {/* <View style={{ flex: 1 }}>
          <BottomTabNavigator navigation={this.props.navaigation} />
        </View> */}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 25,
    borderBottomColor: "#ececec",
    borderBottomWidth: 1,
  },
  slider: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  row: {
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  touchableStyle: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 35,

  },
  sectionContainer: {
    backgroundColor: "#fff",
    padding: 5,
    marginTop: 10,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 13,
    textAlign: "center",
    fontFamily: "Dana-FaNum-Bold",
    color: "#777",
  },
  title: {
    fontSize: 12,
    fontFamily: "Dana-FaNum-Bold",
    color: "#777",
  },
  propertyImage: {
    flex: 2,
    width: 140,
    height: 120,
    borderRadius: 5,
    marginLeft: 5,
  },
  icon: {
    fontFamily: "Dana-FaNum-Medium",
    fontSize: 10,
    color: "#777",
    marginTop: 4,
    marginHorizontal: 5,
  },
  txtAgent: {
    fontSize: 12,
    color: "#444",
    paddingRight: 5,
    justifyContent: "center",
    alignSelf: "center",
    fontFamily: "Dana-FaNum-Medium",
    marginLeft: 20,
  },
  priceType: {
    fontFamily: "Dana-FaNum-Medium",
    fontSize: 12,
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 20,
  },
});
