import React, { Component } from 'react';
import {
    StyleSheet, Text, View, StatusBar, ScrollView, FlatList,
    Platform, Linking, TouchableOpacity, Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { TextInput, Button, List, card } from 'react-native-paper';
import Header from "../layouts/Header";
const { width } = Dimensions.get('window');

export default class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            mobile: '',
            message: '',
            supportNumber: '+989168509001',
            helpNumber: '+989168509002',
            agentNumber: '+989168509003',
            whatsAppMsg: "سلام من در سوال دارم",
        };
    }

    dialCall = (number) => {
        let phoneNumber = '';
        if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
        else { phoneNumber = `telprompt:${number}`; }
        Linking.openURL(phoneNumber);
    };

    whatsappMessage = () => {
        let url = "whatsapp://send?text=" + whatsAppMsg + "&phone=" + this.state.supportNumber;
        Linking.openURL(url);
    }
    componentDidMount() {
    }


    render() {
        return (
            <View style={styles.container}>
                <Header title="ارتباط با ما" onBackPress={() => { this.props.navigation.goBack() }} />
                <ScrollView>
                    <View style={styles.section}>
                        <View style={{ marginTop: 5 }}>
                            <Text style={styles.header}>با ما در ارتباط باشید</Text>
                            <Text style={styles.paragraph}>املاک پتوس جهت هرگونه پرسش، انتقاد و پیشنهاد همیشه به روی شما باز است</Text>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <TextInput
                                style={{ textAlign: "right", fontFamily: "Dana-FaNum-Bold", fontSize: 16, marginTop: 10, marginVertical: 5 }}
                                autoFocus
                                label="نام و نام خانوادگی"
                                selectionColor={'#01A545'}
                                mode="outlined"
                                direction ='rtl'
                                textContentType={'familyName'}
                                theme={{ colors: { primary: '#01A545', underlineColor: 'transparent', background: '#fff', placeholder: '#bcbcbc' }, fonts: { fontSize: 35 } }}
                                text={'required'}
                                outlineColor={'#9e9e9e'}
                                value={this.state.name}
                                textAlign='right'

                                onChangeText={(text) => this.setState({ name: text })}
                            />
                            <TextInput
                                style={{ textAlign: "right", fontFamily: "Dana-FaNum-Bold", fontSize: 16, marginTop: 10, marginVertical: 5 }}
                                label="ایمیل"
                                selectionColor={'#01A545'}
                                mode="outlined"
                                textContentType={'familyName'}
                                theme={{ colors: { primary: '#01A545', underlineColor: 'transparent', background: '#fff', placeholder: '#bcbcbc' }, fonts: { fontSize: 35 } }}
                                text={'required'}
                                outlineColor={'#9e9e9e'}
                                value={this.state.email}
                                onChangeText={(text) => this.setState({ email: text })}
                            />
                            <TextInput
                                style={{ textAlign: "right", fontFamily: "Dana-FaNum-Bold", fontSize: 16, marginTop: 10, marginVertical: 5 }}
                                label="موبایل"
                                mode="outlined"
                                selectionColor={'#01A545'}
                                mode="outlined"
                                textContentType={'familyName'}
                                theme={{ colors: { primary: '#01A545', underlineColor: 'transparent', background: '#fff', placeholder: '#bcbcbc' }, fonts: { fontSize: 35 } }}
                                text={'required'}
                                outlineColor={'#9e9e9e'}
                                value={this.state.mobile}
                                onChangeText={(text) => this.setState({ mobile: text })}
                            />
                            <TextInput
                                style={{ textAlign: "right", fontFamily: "Dana-FaNum-Bold", fontSize: 16, marginTop: 10, marginVertical: 5 }}
                                multiline={true} numberOfLines={5}
                                label="پیغام"
                                selectionColor={'#01A545'}
                                mode="outlined"
                                textContentType={'familyName'}
                                theme={{ colors: { primary: '#01A545', underlineColor: 'transparent', background: '#fff', placeholder: '#bcbcbc' }, fonts: { fontSize: 35 } }}
                                text={'required'}
                                outlineColor={'#9e9e9e'}
                                value={this.state.message}
                                onChangeText={(text) => this.setState({ message: text })}
                            />
                            <TouchableOpacity activeOpacity={0.8} style={styles.buttonStyle}>
                                <Text style={styles.txtButton}>ارسال</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <View style={{ marginTop: 5 }}>
                            <Text style={styles.header}>تماس با ما</Text>
                            <Text style={styles.paragraph}>املاک پتوس جهت هرگونه پرسش، انتقاد و پیشنهاد همیشه به روی شما باز است</Text>
                        </View>
                        <Text style={styles.titleTouchable}>راهنما</Text>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => { this.dialCall(this.state.helpNumber) }} style={styles.touchableStyle}>
                            <Text style={styles.txtTouchable}>+98-901-1234567</Text>
                        </TouchableOpacity>

                        <Text style={styles.titleTouchable}>مشاوره</Text>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => { this.dialCall(this.state.agentNumber) }} style={styles.touchableStyle}>
                            <Text style={styles.txtTouchable}>+98-901-1234567</Text>
                        </TouchableOpacity>

                        <Text style={styles.titleTouchable}>پشتیبانی</Text>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => { this.dialCall(this.state.supportNumber) }} style={styles.touchableStyle} >
                            <Text style={styles.txtTouchable}>+98-901-1234567</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.section}>
                        <View style={{ marginTop: 5 }}>
                            <Text style={styles.header}>ما را دنبال کنید</Text>
                            <Text style={styles.paragraph}>آدرس پیج اینستاگرام و تلگرام و.... ما را دنبال کنید</Text>
                        </View>
                        <List.Item
                            title="pethos.app"
                            description="(ساعت پاسخگویی پشتیبانی تلگرامی از ساعت 9 الی 23)"
                            descriptionStyle={styles.descriptionStyle}
                            titleStyle={styles.listTitle}
                            right={props => <Icon type="FontAwesome" name="send-o" style={{ color: '#777', fontSize: 25, marginRight: 10, marginTop: 10 }} />}
                        />
                        <List.Item
                            title="pethos.app"
                            description="(ساعت پاسخگویی پشتیبانی اینستاگرام از ساعت 9 الی 23)"
                            descriptionStyle={styles.descriptionStyle}
                            titleStyle={styles.listTitle}
                            right={props => <Icon type="FontAwesome" name="instagram" style={{ color: '#777', fontSize: 25, marginRight: 10, marginTop: 5 }} />}
                        />

                        <List.Item
                            title="info@pethos.app"
                            description="(ساعت پاسخگویی پشتیبانی ایمیل از ساعت 9 الی 23)"
                            descriptionStyle={styles.descriptionStyle}
                            titleStyle={styles.listTitle}
                            right={props => <Icon type="FontAwesome" name="envelope-o" style={{ color: '#777', fontSize: 25, marginRight: 10, marginTop: 5 }} />}
                        />
                        <List.Item
                            title=" https://pethos.app"
                            description="(وب سایت رسمی اپ پتوس شبانه روز در خدمت شما)"
                            descriptionStyle={styles.descriptionStyle}
                            titleStyle={styles.listTitle}
                            right={props => <Icon type="FontAwesome" name="internet-explorer" style={{ color: '#777', fontSize: 25, marginRight: 10, marginTop: 5 }} />}
                        />
                    </View>
                    <View style={styles.section}>
                        <View style={{ marginTop: 5 }}>
                            <Text style={styles.header}>آدرس ما</Text>
                            <Text style={styles.paragraph}>جهت عقد قرارداد و مشاوره حضوری در صورت نیاز می توانید به آدرس زیر مراجعه کنید</Text>
                        </View>
                        <List.Item
                            title="لرستان خرم آباد خیابان انقلاب املاک سرمایه"
                            description="(ساعات کاری 9-13 و 16-20)"
                            descriptionStyle={styles.descriptionStyle}
                            titleStyle={[styles.listTitle, { fontSize: 12 }]}
                            right={props => <Icon type="FontAwesome" name="map-marker" style={{ color: '#777', fontSize: 25, marginRight: 10, marginTop: 5 }} />}
                        />
                    </View>
                    <View style={{ backgroundColor: '#01A545', paddingVertical: 5, paddingHorizontal: 25 }}>
                        <Text style={styles.txtFooter}> طراحی و پیاده سازی شرکت ایده پردازان پارس آراد</Text>
                        <Text style={styles.txtFooter}>parsarad.com</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
    },
    section: {
        backgroundColor: "#fff",
        marginHorizontal: 0,
        marginBottom: 10,
        paddingHorizontal: 25,
        paddingVertical: 30,
        shadowColor: "#f8f8f8",
        shadowOffset: {
            width: 0,
            height: 1,
            marginRight: 5,
            marginBottom: 3,
        },
        shadowOpacity: 0.10,
        shadowRadius: 3.84,
        elevation: 2
    },
    header: {
        color: "#555",
        fontFamily: 'Dana-FaNum-Bold',
        fontSize: 13,
        textAlign: "right"
    },
    paragraph: {
        color: "#555",
        fontFamily: 'Dana-FaNum-Medium',
        fontSize: 12,
        textAlign: "right"
    },
    touchableStyle: {
        marginHorizontal: 30,
        marginTop: 10,
        marginBottom: 10,
        borderColor: "#01A545",
        borderWidth: 1,
        borderRadius: 30,
        paddingVertical: 7,
        paddingHorizontal: 5
    },
    titleTouchable: {
        fontFamily: 'Dana-FaNum-Bold',
        fontSize: 16,
        color: "#666",
        textAlign: 'center',
        marginTop: 10
    },
    txtTouchable: {
        fontFamily: 'Dana-FaNum-Bold',
        fontSize: 16,
        color: "#01A545",
        textAlign: 'center'
    },
    listTitle: {
        fontSize: 15,
        textAlign: 'right',
        fontFamily: 'Dana-FaNum-Bold',
        marginRight: 20,
        color: "#777",
    },
    descriptionStyle: {
        color: '#01A545',
        fontSize: 12,
        textAlign: 'right',
        fontFamily: 'Dana-FaNum-Medium',
        marginRight: 20,
    },
    txtFooter: {
        fontFamily: 'Dana-FaNum-Medium',
        fontSize: 11,
        color: '#fff',
        textAlign: 'center',
    },
    buttonStyle: {
        backgroundColor: "#01A545",
        paddingHorizontal: 5,
        paddingVertical: 10,
        marginHorizontal: "10%",
        borderRadius: 5,
        marginTop: 25
    },
    txtButton: {
        color: "#fff",
        textAlign: "center",
        fontFamily: "Dana-FaNum-Bold",
    },

});
