
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image, Alert,ScrollView,FlatList} from 'react-native';
import { Button } from 'react-native-paper';
import {AirbnbRating} from 'react-native-elements';
import Header from "../layouts/Header";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendar} from '@fortawesome/free-solid-svg-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SliderBox } from 'react-native-image-slider-box';

export default class PropertyDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ratingUserForAgent: 0,
            gallery: [
                require('../../../assets/images/home.jpg'),
                require('../../../assets/images/home.jpg'),
                require('../../../assets/images/home.jpg'),
            ],
            comments: [
                { id: 1, image: require('../../../assets/images/user.png'), name: "الی", text: "مثل همیشه عالی", Admintext: 'ممنون از شما', date: "98/12/2" },
                { id: 2, image: require('../../../assets/images/user.png'), name: "سارا", text: "مثل همیشه عالی", Admintext: 'ممنون از شما', date: "98/12/2" },
                { id: 3, image: require('../../../assets/images/user.png'), name: "بهتا", text: "مثل همیشه عالی", Admintext: 'ممنون از شما', date: "98/12/2" },
            ],
            index: 0,
            features: [{ id: 0, title: "بالکن" }, { id: 2, title: "تراس" }, { id: 3, title: "انباری" }, { id: 4, title: "استخر" }],
            conditions: [{ id: 0, title: "وام دار" }, { id: 2, title: "قابل معاوضه" }],
            exchanges: [{ id: 0, title: " طلا" }, { id: 2, title: "ماشین" }, { id: 3, title: "ارز" }, { id: 4, title: "زمین" }],
            exchange: [
                "طلا",
                "ماشین",
                "ارز",
                "ملک",
                "زمین",
            ],
            id: 1,
            propertyCode: "30001255",
            propertyUseType: "مسکونی",
            propertyType: "ویلایی",
            address: "خرم آباد مطهری خیابان سازمان",
            title: 'خانه دو خوابه جدید ساز',
            description: "این آگهی خرید آپارتمان 264 متری در محله اباذر و در منطقه 5 شهر تهران واقع شده است و از امکاناتی نظیر آنتن مرکزی، درب ریموت، انباری، سونا، آسانسور و بالکن برخوردار است. این آپارتمان مسکونی نوساز، 4 اتاق خواب دارد. این ملک با قیمت 19 میلیارد تومان به فروش می‌رسد.",
            price: 1200000000,
            transactionType: "فروش",
            priceType: "به قیمت",
            agentName: "الهام گودرزی",
            agentProfile: require('../../../assets/images/admin.png'),
            agentRating: 4,
            agentNumber: "+989168509001",
            bed: 2,
            bath: 1,
            age: 3,
            area: 160,
        };
    }

    currencyFormat(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' تومان '
    }
    componentWillMount() {
    }

    componentWillUnmount() {
    }

    // showFeatures() {
    //     for (i = 0; i <=this.state.features.length; i++) {
    //         return (<Text>{this.state.features.title[i]}</Text>);
    //     }
    // }

    showExchanges() {
        let test = this.state.exchange.map(sub => {
            return (
                <View style={{ flexDirection: 'row', paddingHorizontal: 5 }}>
                    <Text style={{ fontFamily: "Dana-FaNum-Medium", color: "#555" }}>{sub}</Text>
                    <Icon
                        style={{ marginLeft: 5 }}
                        name='check-square-o'
                        size={18}
                        color='#01A545'
                    />
                </View>
            );
        });
        return <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5, paddingHorizontal: 20 }}>{test}</View>
    }

    refreshRating() {
        this.setState({ ratingUserForAgent: 2 })
    }

    ratingCompleted(rating) {
        Alert.alert(
            "ثبت امتیاز",
            "امتیاز که ثبت می شود " + rating + " می باشد آیا مطمئنید؟ ",
            [
                {
                    text: "خیر",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "بله",
                    onPress: this.onPress
                }
            ],
            { cancelable: false }
        );
    }
    render() {
        return (
            <View style={styles.containert}>
                <Header title="مشاهده جزییات" onBackPress={() => { this.props.navigation.goBack() }} />
                <ScrollView>

                    <View>
                        <SliderBox autoplay circleLoop
                            images={this.state.gallery} style={{ width: '100%', height: 330, alignSelf: "center", justifyContent: "center", alignItems: "center" }}
                            position={this.state.position}
                            onPositionChanged={position => this.setState({ position })}
                            dotColor="#01A545"
                            resizeMethod={'resize'}
                            resizeMode={'cover'}
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
                                alignSelf: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                paddingVertical: 10,
                            }}
                        />

                    </View>
                    <View style={styles.badgeContainer}>
                        <View>
                            <Icon style={styles.badge} name='bookmark-o' size={18} color='#01A545' />
                            <Icon style={styles.badge} name='share-alt' size={18} color='#01A545' />
                        </View>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 10 }}>
                            <View>
                                <Text style={styles.transactionType}>{this.state.transactionType}</Text>
                            </View>
                            <View>
                                <Text style={styles.txtInfo}>{["کد ملک:", this.state.propertyCode]}</Text>
                                <Text style={styles.txtInfo}>  {this.state.propertyUseType} / {this.state.propertyType}</Text>
                                <Text style={styles.title}>{this.state.title}</Text>
                                <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                                    <Text style={styles.txtInfo}>{this.state.address}</Text>
                                    <Icon name='map-marker' size={18} color='#a4a4a4' />
                                </View>
                            </View>
                        </View>
                        <Text style={styles.txtInfo}>{this.state.description}</Text>
                        <View style={styles.row}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.icon}>{[this.state.bath, " حمام"]}</Text>
                                <Icon style={{ marginTop: 2 }} name='bath' size={18} color='#a4a4a4' />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.icon}>{[this.state.bed, " خوابه"]}</Text>
                                <View>
                                    <Icon style={{ marginTop: 2 }} name='bed' size={18} color='#a4a4a4' />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.icon}>{[this.state.area, " متر "]}</Text>
                                <Icon name='arrows-alt' size={18} color='#a4a4a4' style={{ marginTop: 2 }} />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.icon}>{[this.state.age, "  سال "]}</Text>
                                <FontAwesomeIcon icon={faCalendar} size={18} style={{ color: '#a4a4a4', marginTop: 2 }} />
                            </View>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.priceType}>{this.state.priceType}</Text>
                            <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                                <Text style={[styles.txtInfo,{color:"#444",fontSize:13}]} >{["قیمت: ", this.currencyFormat(this.state.price)]}</Text>
                                {/* <FontAwesomeIcon icon={faTags} size={18} style={{ color: '#a4a4a4', marginTop: 2 }} /> */}
                            </View>
                        </View>

                        <View style={styles.line}>
                            <Text style={{ fontFamily: "Dana-FaNum-Bold", color: "#777", paddingHorizontal: 20 }}>مشاور:</Text>
                        </View>

                        <View style={styles.row}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Icon size={22} name={'phone'} color={'#01A545'} style={{ padding: 10, borderRadius: 50, marginRight: 10 }}></Icon>
                                <Icon size={22} name={'whatsapp'} color={'#01A545'} style={{ padding: 10, borderRadius: 50 }}></Icon>
                            </View>
                            <AirbnbRating
                                count={5}
                                reviews={["بد", "معمولی", "خوب", "خیلی خوب", "عالی"]}
                                defaultRating={4}
                                size={18}
                                showRating={false}
                                onFinishRating={this.ratingCompleted}
                                style={{marginRight:5}}
                            />
                            <View>
                                <Text style={styles.items}>{this.state.agentName}</Text>
                                <Text style={styles.items}>{["امتیاز: ", this.state.agentRating]}</Text>
                            </View>
                            <Image source={this.state.agentProfile} style={{ width: 30, height: 30, borderRadius: 30, marginLeft: 5 }} />
                        </View>
                        <View style={styles.line}>
                            <Text style={styles.head}>ویژگی ها:</Text>
                        </View>
                        <View>
                            <FlatList
                                contentContainerStyle={{ backgroundColor: '#fcfcfc', paddingHorizontal: 15, alignItems: "flex-end" }}
                                data={this.state.features}
                                numColumns={4}
                                keyExtractor={item => {
                                    return item.id;
                                }}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={styles.row}>
                                            <Text style={styles.items}>{item.title}</Text>
                                            <Icon style={{ marginLeft: 5 }} name='check-square-o' size={20} color='#01A545' />
                                        </View>
                                    );
                                }}
                            />
                        </View>
                        <View style={styles.line}>
                            <Text style={styles.head}>شرایط:</Text>
                        </View>
                        <View>
                            <FlatList
                                contentContainerStyle={{ backgroundColor: '#fcfcfc', paddingHorizontal: 15, alignItems: "flex-end" }}
                                data={this.state.conditions}
                                numColumns={4}
                                keyExtractor={item => {
                                    return item.id;
                                }}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={{ flexDirection: 'row', paddingHorizontal: 15, justifyContent: "center", marginVertical: 5 }}>
                                            <Text style={styles.items}>{item.title}</Text>
                                            <Icon style={{ marginLeft: 5 }} name='check-square-o' size={20} color='#01A545' />
                                        </View>
                                    );
                                }}
                            />
                        </View>
                        <View style={styles.line}>
                            <Text style={styles.head}> شرایط معاوضه:</Text>
                        </View>
                        <View>
                            <FlatList
                                contentContainerStyle={{ backgroundColor: '#fcfcfc', paddingHorizontal: 15, alignItems: "flex-end" }}
                                data={this.state.exchanges}
                                numColumns={5}
                                keyExtractor={item => {
                                    return item.id;
                                }}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={styles.row}>
                                            <Text style={styles.items}>{item.title}</Text>
                                            <Icon style={{ marginLeft: 5 }} name='check-square-o' size={20} color='#01A545' />
                                        </View>
                                    );
                                }}
                            />
                        </View>
                    </View>
                </ScrollView>
                <Button style={{ fontFamily: 'Dana-FaNum-Bold', backgroundColor: '#01A545' }}
                    mode="contained" onPress={() => console.log('Pressed')}>
                    <Text style={{ fontFamily: 'Dana-FaNum-Bold', fontSize: 16 }}>درخواست بازدید</Text>
                </Button>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    containert: {
        flex: 1,
        backgroundColor: '#fff',
    },
    badgeContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginTop: -200
    },
    badge: {
        marginRight: 10,
        backgroundColor: "#fff",
        padding: 8,
        borderRadius: 35,
        marginTop: 5
    },
    infoContainer: {
        backgroundColor: "#fff",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        marginTop: 60,
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    transactionType: {
        fontFamily: 'Dana-FaNum-Bold',
        backgroundColor: "#e7f3ef",
        fontSize: 13,
        color: '#01A545',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 30
    },
    txtInfo: {
        fontFamily: 'Dana-FaNum-Medium',
        fontSize: 12,
        color: '#888',
        paddingHorizontal: 10
    },
    title: {
        fontSize: 14,
        fontFamily: "Dana-FaNum-Bold",
        color: '#666',
    },
    row: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    priceType: {
        fontFamily: 'Dana-FaNum-Bold',
        fontSize: 12,
        color: '#fff',
        backgroundColor: "#01A545",
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 20
    },
    icon: {
        fontFamily: 'Dana-FaNum-Bold',
        fontSize: 10,
        color: '#777',
        marginTop: 4,
        marginRight: 5
    },
    line: {
        borderTopColor: "#ececec",
        borderTopWidth: 0.8,
        marginHorizontal: 10,
        marginTop: 10,
        paddingVertical: 5
    },
    head: {
        fontFamily: "Dana-FaNum-Bold",
        color: "#777",
        paddingHorizontal: 20
    },
    items: {
        fontFamily: "Dana-FaNum-Medium",
        color: "#555",
        fontSize: 12

    }
});
