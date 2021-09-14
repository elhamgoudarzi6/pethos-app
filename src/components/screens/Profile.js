import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Share, Image, TouchableOpacity, PermissionsAndroid, FlatList, Modal, Easing, Dimensions, Animated, SectionList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native-paper';
import AwesomeAlert from 'react-native-awesome-alerts';
import ImagePicker from 'react-native-image-picker';
import { IconFill, IconOutline } from "@ant-design/icons-react-native";
import { Appbar } from 'react-native-paper';
import SMSVerifyCode from 'react-native-sms-verifycode'
import { ListItem } from 'react-native-elements';
import Contacts from 'react-native-contacts';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import { Dialog } from 'react-native-simple-dialogs';
const { width, height } = Dimensions.get('window');
import Header from "../layouts/Header";
export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.animatedValue1 = new Animated.Value(0);
        this.state = {
            showAlert: false,
            messageAlert: '',
            textMessageBox: '',
            birthDate: '',
            password: '',
            retypePassword: '',
            userID: '610dab5d4e91686d43f57c81',
            token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjEwZGFiNWQ0ZTkxNjg2ZDQzZjU3YzgxIiwiaWF0IjoxNjMwODgzMzY2LCJleHAiOjE2MzA4ODM0MjZ9.EVmB4JbcKgQUoHqNLISHwpcU8lBsFfBRP5Pso8MRCug',
            level: '',
            fullName: '',
            Image: '',
            walletValue: 0,
            creditAmount: '1000',
            rating: 0,
            mobile: '',
            newMobile: '',
            verifycode: '',
            dialogVisibleOk: false,
            modalVisibleEditInfo: false,
            modalVisibleChangeMobile: false,
            modalVisibleInbox: false,
            modalVisibleWallet: false,
            modalVisibleShare: false,
            modalVisibleMyProperty: false,
            modalVisibleSuggestion: false,
            modalVisibleVerifyCode: false,
            part: [
                { id: 0, title: "مورد علاقه", image: require('../../../assets/images/favorite.png') },
                { id: 1, title: "آگهی من", image: require('../../../assets/images/myhome.png') },
                { id: 2, title: "املاک پیشنهادی", image: require('../../../assets/images/suggest.png') },
            ],
            data: [
                { id: 0, title: "پیام های دریافتی", icon: 'inbox' },
                { id: 1, title: "شارژ کیف پول", icon: 'wallet' },
                { id: 2, title: "ویرایش پروفایل", icon: 'user' },
                { id: 3, title: " دعوت از دوستان", icon: 'mail' },
                { id: 4, title: "تغییر شماره همراه", icon: 'mobile' },
            ],
            inbox: [
                { id: 0, message: "پیام 1" },
                { id: 1, message: "پیام 2" },
            ],
            walletHistory: [
                { id: 0, amount: 8000, date: "1400/5/2", time: "21:35", success: true },
                { id: 1, amount: 7000, date: "1400/5/14", time: "12:20", success: false },
                { id: 2, amount: 7000, date: "1400/5/14", time: "12:25", success: true },
            ]
        };
        this.getUser();
    }

    permissionsContacts() {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
                'title': 'Contacts',
                'message': 'This app would like to view your contacts.',
                'buttonPositive': 'Please accept bare mortal'
            }
        )
            .then(Contacts.getAll)
            .then(contacts => {
            })
    }

    inviteFriends = async () => {
        try {
            const result = await Share.share({
                title: 'وای اپ پتوس رو دیدی؟',
                message: 'من یک اپ در حوزه املاک و ساخت ساز می شناسم به اسم  پتوس که توش میتونی ملکت رو آگهی کنی برای فروش یا اجاره یا اینکه ملک دلخواهت به راحتی پیدا کنی. همین الان رو لینک دعوت زیر بزن و برای عضویت 10 هزار تومن هدیه بگیر.  لینک اپ: https://pethos.app',
                url: 'https://pethos.app',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    randomNumber() {
        var text = '';
        var possible = '123456789';
        for (var i = 0; i < 5; i++) {
            var sup = Math.floor(Math.random() * possible.length);
            text += i > 0 && sup == i ? '0' : possible.charAt(sup);
        }
        return text;
    }

    onclickVerifycode() {
        if (this.state.newMobile === '') {
            this.setState({ messageAlert: 'شماره همراه جدید را وارد نمائید' })
            this.showAlert();
            this.setState({ newMobile: '' })
        }
        else if (this.state.newMobile.length < 11) {
            this.setState({ messageAlert: 'حداقل طول شماره باید 11 کاراکتر باشد' })
            this.showAlert();
            this.setState({ newMobile: '' })
        }
        else {
            this.setState({ verifycode: this.randomNumber() });
            this.sendSMS()
            this.setState({ modalVisibleVerifyCode: true });
        }
    }

    sendSMS() {
        let token;
        fetch('https://RestfulSms.com/api/Token', {
            method: 'POST',
            body: JSON.stringify({
                data: {
                    UserApiKey: 'f2a1c337366e0cd3ddffc337',
                    SecretKey: 'it66)%#teBC!@*&'
                }
            })
        }).then((response) => response.json()).then((responseJson) => {
            if (responseJson.IsSuccessful === true) {
                token = responseJson.TokenKey;

            } else {
                console.log('err')
            }
        }).catch((error) => {
            console.error('err');
        });
        fetch('https://RestfulSms.com/api/UltraFastSend', {
            method: 'POST',
            'headers': {
                'content-type': 'application/json',
                'x-sms-ir-secure-token': token
            },
            body: JSON.stringify({
                data: {
                    ParameterArray: [
                        { Parameter: 'VerificationCode', ParameterValue: this.state.verifycode }
                    ],
                    Mobile: this.state.newMobile,
                    TemplateId: '53415'
                }
            })
        }).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson)
            if (responseJson.IsSuccessful === true) {
                console.log('ok')
            } else {
                console.log('err')
            }
        }).catch((error) => {
            console.error('err');
        });
    }

    onInputVerifyCodeCompleted = (text) => {
        if (text.localeCompare(this.state.verifycode)) {
            this.setState({ modalVisibleVerifyCode: false })
            fetch('http://api.pethos.app/api/v1/user/changeMobileNumber/' + this.state.userID, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mobile: this.state.newMobile,
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ messageAlert: ' با موفقیت ثبت شد' });
                    this.showAlert();
                    this.setState({ newMobile: '' })
                }).catch((error) => {
                });
        }
        else {
            this.setState({ messageAlert: 'کد وارد شده صحیح نمی باشد' });
            this.showAlert();
        }
    }

    currencyFormat(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    clickdialogVisibleOk = (visible) => {
        this.setState({ dialogVisibleOk: visible });
    };
    setModalVisibleMyProperty(visible) {
        this.setState({ modalVisibleMyProperty: visible });
    }
    setModalVisibleSuggestion(visible) {
        this.setState({ modalVisibleSuggestion: visible });
    }
    setModalVisibleInbox(visible) {
        this.setState({ modalVisibleInbox: visible });
    }
    setModalVisibleShare(visible) {
        this.setState({ modalVisibleShare: visible });
    }
    setModalVisibleWallet(visible) {
        this.setState({ modalVisibleWallet: visible });
    }
    setModalVisibleEditInfo(visible) {
        this.setState({ modalVisibleEditInfo: visible });
    }
    setModalVisibleChangeMobile(visible) {
        this.setState({ modalVisibleChangeMobile: visible });
    }

    showPart = (item) => {
        switch (item.id) {
            case 0: this.props.screenProps.navigate('Favorites');
                break;
            case 1: this.setModalVisibleMyProperty(true);
                break;
            case 2: this.setModalVisibleSuggestion(true);
                break;
            default: this.showMessage(`error`)
        }
    }

    showSection = (item) => {
        switch (item.id) {
            case 0: this.setModalVisibleInbox(true);
                break;
            case 1: this.setModalVisibleWallet(true);
                break;
            case 2: this.setModalVisibleEditInfo(true);
                break;
            case 3: this.setModalVisibleShare(true);
                break;
            case 4: this.setModalVisibleChangeMobile(true);
                break;
            default: this.showMessage(`error`)
        }
    }

    showAlert = () => {
        this.setState({ showAlert: true });
    };
    hideAlert = () => {
        this.setState({ showAlert: false });
    };

    componentDidMount() {
        // this.getUser()
        //  this.animate();

    }



    reset = () => {
        this.verifycode.reset()
        this.setState({ codeText: '' })
    }

    // await fetch(Global.base_url + 'discount/category_list', {
    //     method: 'GET',
    //     headers: {
    //         "Auth": Global.user_token,
    //         "Accept": 'application/json',
    //         "Content-Type": 'application/json',
    //     }
    // })
    // .then(response => response.json())
    // .then(data => {
    //     if(data.status == 1) {
    //         Global.category_list = data.data;
    //     } else {
    //         Alert.alert("Warning!", 'Error');
    //     }

    // })
    // .catch(function(error) {
    //     Alert.alert('Warning!', 'Network error.');
    // }); 
    getToken() {
        fetch('http://api.pethos.app/api/v1/user/getToken/' + this.state.userID, {
            method: 'GET',
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
            }
        })
            .then((response) => response.json()).then((responseJson) => {
                this.setState({ token: responseJson.data['token'] });})
            .catch((error) => { console.error(error);});
    }
    
    getUser() {
        fetch('http://api.pethos.app/api/v1/user/getUser/' + this.state.userID, {
            method: 'GET',
            headers: {
                "x-access-token":this.state.token,
                "Accept": 'application/json',
                "Content-Type": 'application/json',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ fullName: responseJson.data['fullName'] });
                this.setState({ mobile: responseJson.data['mobile'] });
                this.setState({ walletValue: responseJson.data['walletValue'] });
                this.setState({ rating: responseJson.data['rating'] });
                this.setState({ Image: responseJson.data['Image'] });
                this.setState({ level: responseJson.data['level'] });
                this.setState({ birthDate: responseJson.data['birthDate'] });
            })
            .catch((error) => {
                console.error(error);
            });
    }


    updateUser = () => {
        fetch('http://api.pethos.app/api/v1/user/updateuser/' + this.state.userID, {
            method: 'PUT',
            headers: {
                "x-access-token":this.state.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fullName: this.state.fullName,
                image: this.state.image,
                birthDate:this.state.birthDate
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                // this.setState({ messageAlert: ' با موفقیت ثبت شد' });
                // this.showAlert();
                this.clickdialogVisibleOk(true)
            }).catch((error) => {
            });
    }

    // changeMobile = () => {
    //         fetch('http://api.pethos.app/api/v1/user/changeMobileNumber/' + this.state.userID, {
    //             method: 'PUT',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 mobile: this.state.newMobile,
    //             })
    //         }).then((response) => response.json())
    //             .then((responseJson) => {
    //                 this.setState({ messageAlert: ' با موفقیت ثبت شد' });
    //                 this.showAlert();
    //                 this.setState({ newMobile: '' })
    //             }).catch((error) => {
    //             });
    // }

    animate() {
        this.animatedValue1.setValue(0);

        const createAnimation = (value, duration, easing, delay = 0) => {
            return Animated.timing(value, {
                toValue: 1,
                duration,
                easing,
                delay,
                useNativeDriver: false
            });
        };
        Animated.sequence([
            createAnimation(this.animatedValue1, 800, Easing.ease),
        ]).start();
    }

    render() {
        const scale = this.animatedValue1.interpolate({
            inputRange: [0, 1],
            outputRange: [0.1, 1],
        });
        // const opacity = this.animatedValue2.interpolate({
        //     inputRange: [0, 1],
        //     outputRange: [0, 1],
        // });
        return (
            <View style={styles.container}>
                <Header title="پروفایل" onBackPress={() => { this.props.navigation.goBack() }} />
                <ScrollView>
                    <View>
                        <View style={styles.colSpan}>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                <View>
                                    <Text style={styles.userType}>{this.state.level}</Text>
                                    <Text style={styles.credit}>{['امتیاز: ', this.state.rating]}</Text>
                                    <Text style={styles.credit}>{['اعتبار: ', this.currencyFormat(this.state.walletValue), ' تومان']}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: "flex-end" }}>
                                    <View style={{ marginTop: 10 }}>
                                        <Text style={styles.titleCol}>{this.state.fullName}</Text>
                                        <Text style={styles.titleCol}>{this.state.mobile}</Text>
                                    </View>
                                    <Image style={styles.Profile} source={require('../../../assets/images/user.png')} />
                                </View>
                            </View>
                        </View>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            numColumns={3}
                            data={this.state.part}
                            contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', marginTop: 5, paddingVertical: 10, alignSelf: 'center' }}
                            keyExtractor={(item) => { return item.id; }}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity activeOpacity={0.8} style={styles.col} onPress={() => this.showPart(item)} >
                                        <Image style={styles.imgCol} source={item.image} />
                                        <Text style={styles.titleCol}>{item.title}</Text>
                                    </TouchableOpacity>
                                )
                            }} />

                        <View style={styles.colSpan}>
                            <View style={{ flexDirection: 'row', justifyContent: "flex-end" }}>
                                <Text style={styles.titleCol}>قصد اجاره یا فروش ملک خود را دارید؟</Text>
                                <Image style={{ width: 55, height: 55, marginTop: -20, marginLeft: 10 }} source={require('../../../assets/images/property.png')} />
                            </View>
                            <TouchableOpacity activeOpacity={0.8} style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('AddProperty')}>
                                <Text style={styles.txtButton}>ثبت ملک</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginTop: 15, backgroundColor: "#fff" }}>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingStart: -1,
                                paddingEnd: 5,
                                marginTop: 10
                            }}
                            data={this.state.data}
                            keyExtractor={(item) => {
                                return item.id;
                            }}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity activeOpacity={0.7} onPress={() => this.showSection(item)}
                                        style={{ paddingHorizontal: '5%', paddingVertical: 15, borderTopWidth: 0.3, borderTopColor: "#bcbcbe" }}>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <Icon name='angle-left' color='#555' size={25} style={{ marginLeft: 5 }} />

                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={{ fontFamily: "Dana-FaNum-Bold", fontSize: 12, color: "#555" }}>{item.title}</Text>
                                                <IconOutline name={item.icon} color='#9e9e9e' size={23} style={{ marginHorizontal: 10 }} />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }} />
                        <View style={{ flexDirection: "row", justifyContent: "flex-end", paddingHorizontal: '5%', paddingVertical: 15 }}>
                            <Text style={{ fontFamily: "Dana-FaNum-Medium", fontSize: 12, color: "#d63032" }}>خروج</Text>
                            <Icon name='sign-out' color='#d74f51' size={20} style={{ marginHorizontal: 10 }} />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "flex-end", paddingHorizontal: '5%', paddingBottom: 10 }}>
                            <Text style={{ fontFamily: "Dana-FaNum-Medium", fontSize: 12, color: "#9e9e9e" }}>نسخه 1.0.0</Text>
                            <IconOutline name="copyright" color='#9e9e9e' size={16} style={{ marginLeft: 5, marginRight: 10 }} />
                        </View>
                    </View>
                </ScrollView>

                <Modal animationType={'center'} transparent={true} position={'center'} coverScreen={true} visible={this.state.modalVisibleEditInfo}>
                    <View style={{ flex: 1, backgroundColor: "#fff" }}>
                        <Appbar.Header style={{ backgroundColor: '#fff' }}>
                            <Appbar.Content titleStyle={styles.Appbar} title='ویرایش پروفایل' />
                            <Appbar.Action size={35} color={'#555'} icon="chevron-right" onPress={() => { this.setModalVisibleEditInfo(false) }} />
                        </Appbar.Header>
                        <ScrollView>
                            <View style={{ marginTop: 40 }}>
                                <Image style={{ alignSelf: "center", width: 80, height: 80, backgroundColor: "#e7f3ef", borderRadius: 60 }} source={require('../../../assets/images/user.png')} />
                                <TouchableOpacity activeOpacity={0.8}
                                //onPress={this._uploadImage.bind(this)}
                                >
                                    <Text style={styles.txtChangeProfile}>تغییر تصویر پروفایل</Text>
                                </TouchableOpacity>
                                <View style={{ marginTop: 15, paddingHorizontal: 30 }}>
                                    <TextInput
                                        autoFocus
                                        direction='rtl'
                                        style={{ textAlign: "right", fontFamily: "Dana-FaNum-Bold", fontSize: 16, marginTop: 20 }}
                                        keyboardAppearance="dark"
                                        selectionColor={'#01A545'}
                                        label="نام و نام خانوادگی"
                                        mode="outlined"
                                        theme={{ colors: { primary: '#01A545', underlineColor: 'transparent', background: '#fff', placeholder: '#bcbcbc' }, fonts: { fontSize: 35 } }}
                                        text={'required'}
                                        outlineColor={'#9e9e9e'}
                                        textContentType={'familyName'}
                                        value={this.state.fullName}
                                        onChangeText={(text) => this.setState({ fullName: text })}
                                    />
                                    <TextInput
                                        label="تاریخ تولد"
                                        mode="outlined"
                                        style={{ textAlign: "right", fontFamily: "Dana-FaNum-Bold", fontSize: 16, marginTop: 10 }}
                                        selectionColor={'#01A545'}
                                        maxLength={11}
                                        fontFamily={'Dana-FaNum-Medium'}
                                        theme={{ colors: { primary: '#01A545', underlineColor: 'transparent', background: '#fff', placeholder: '#999' } }}
                                        outlineColor={'#9e9e9e'}
                                        textContentType={'birthday'}
                                        value={this.state.birthDate}
                                        onChangeText={(text) => this.setState({ birthDate: text })}
                                    />
                                </View>
                                <TouchableOpacity activeOpacity={0.8} style={styles.modalButtonStyle} onPress={this.updateUser}>
                                    <Text style={styles.txtButton}>ثبت مشخصات</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </Modal>


                <Modal animationType={'center'} transparent={true} position={'center'} coverScreen={true} visible={this.state.modalVisibleChangeMobile}>
                    <View style={{ flex: 1, backgroundColor: "#fff" }}>
                        <Appbar.Header style={{ backgroundColor: '#fff' }}>
                            <Appbar.Content titleStyle={styles.Appbar} title='تغییر شماره همراه' />
                            <Appbar.Action size={35} color={'#555'} icon="chevron-right" onPress={() => { this.setModalVisibleChangeMobile(false) }} />
                        </Appbar.Header>
                        <ScrollView>
                            <View style={{ marginTop: 50, marginHorizontal: "8%" }}>
                                <TextInput
                                    autoFocus
                                    label="موبایل"
                                    mode="outlined"
                                    style={{ textAlign: "right", fontFamily: "Dana-FaNum-Bold", fontSize: 16, marginTop: 10 }}
                                    selectionColor={'#01A545'}
                                    keyboardType={'number-pad'}
                                    maxLength={11}
                                    fontFamily={'Dana-FaNum-Medium'}
                                    theme={{ colors: { primary: '#01A545', underlineColor: 'transparent', background: '#fff', placeholder: '#999' } }}
                                    outlineColor={'#9e9e9e'}
                                    value={this.state.newMobile}
                                    onChangeText={(text) => this.setState({ newMobile: text })}
                                />
                            </View>
                            <TouchableOpacity activeOpacity={0.8} style={styles.modalButtonStyle} onPress={() => { this.onclickVerifycode() }} >
                                <Text style={styles.txtButton}>ثبت</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </Modal>

                <Modal
                    transparent={true}
                    animationType={"slide"}
                    position={'center'}
                    visible={this.state.modalVisibleVerifyCode}>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <View style={styles.verifyContainer}>
                            <Text style={styles.message}>کد تایید شماره همراه که برای شما پیامک شده را وارد نمایید</Text>
                            <Text>{this.state.verifycode}</Text>
                            <SMSVerifyCode
                                ref={ref => (this.state.verifycode = ref)}
                                onInputCompleted={this.onInputVerifyCodeCompleted}
                                verifyCodeLength={5}
                                containerPaddingVertical={5}
                                containerPaddingHorizontal={70}
                                containerBackgroundColor="#fff"
                                codeViewBorderColor="#999"
                                focusedCodeViewBorderColor="#01a545"
                                codeViewBorderWidth={1}
                                codeViewBorderRadius={5}
                            />
                            <View style={styles.row}>
                                <TouchableOpacity activeOpacity={0.8} style={styles.btnReturn} >
                                    <Text style={styles.txtReturn} >لغو</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.8} style={styles.btnVerify} >
                                    <Text style={styles.txtButton} >تایید</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal animationType={'center'} transparent={true} position={'center'} coverScreen={true} visible={this.state.modalVisibleInbox}>
                    <View style={{ flex: 1, backgroundColor: "#fff" }}>
                        <Appbar.Header style={{ backgroundColor: '#fff' }}>
                            <Appbar.Content titleStyle={styles.Appbar} title='صندوق ورودی' />
                            <Appbar.Action size={35} color={'#555'} icon="chevron-right" onPress={() => { this.setModalVisibleInbox(false) }} />
                        </Appbar.Header>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            data={this.state.inbox}
                            keyExtractor={(item) => {
                                return item.id;
                            }}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{ borderBottomColor: "#f2f1f1", borderBottomWidth: 1, paddingHorizontal: 20, paddingVertical: 10 }}>
                                        <Text style={styles.message}>{item.message}</Text>
                                    </View>
                                )
                            }} />
                    </View>
                </Modal>

                <Modal animationType={'center'} transparent={true} position={'center'} coverScreen={true} visible={this.state.modalVisibleWallet}>
                    <View style={{ flex: 1, backgroundColor: "#fff" }}>
                        <Appbar.Header style={{ backgroundColor: '#fff' }}>
                            <Appbar.Content titleStyle={styles.Appbar} title='مدیریت کیف پول' />
                            <Appbar.Action size={35} color={'#555'} icon="chevron-right" onPress={() => { this.setModalVisibleWallet(false) }} />
                        </Appbar.Header>
                        <ScrollView>
                            <View style={{ marginTop: 20, marginHorizontal: 40, flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={styles.credit}>{[this.currencyFormat(this.state.walletValue), ' تومان']}</Text>
                                <Text style={[styles.credit, { marginLeft: 5 }]}>اعتبار فعلی شما:</Text>
                            </View>
                            <View style={{ justifyContent: 'center', marginTop: 40, flexDirection: 'row' }}>
                                <Icon name='minus' color='#9e9e9e' size={20} onPress={() => this.setState({ creditAmount: this.state.creditAmount.substr(0, this.state.creditAmount.length - 1) })} style={{ marginTop: 30, marginRight: 20 }} />
                                <TextInput
                                    // autoFocus
                                    label="مبلغ اعتبار (تومان) "
                                    // mode="outlined"
                                    style={{ textAlign: "center", fontFamily: "Dana-FaNum-Bold", fontSize: 16, width: '65%' }}
                                    selectionColor={'#01A545'}
                                    keyboardType={'number-pad'}
                                    fontFamily={'Dana-FaNum-Medium'}
                                    theme={{ colors: { primary: '#01A545', underlineColor: 'transparent', background: '#fff', placeholder: '#999' } }}
                                    outlineColor={'#9e9e9e'}
                                    value={this.state.creditAmount}
                                    onChangeText={(text) => this.setState({ creditAmount: text })}
                                />
                                <Icon name='plus' color='#9e9e9e' size={20} onPress={() => this.setState({ creditAmount: this.state.creditAmount + 0 })} style={{ marginTop: 30, marginLeft: 20 }} />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, paddingHorizontal: 10 }}>
                                <Text style={styles.message}>حداقل شارژ اعتبار {this.currencyFormat(1000)} و حداکثر {this.currencyFormat(1000000)} تومان است</Text>
                                <Icon name='info-circle' color='#9e9e9e' size={18} style={{ marginLeft: 10 }} />
                            </View>
                            <TouchableOpacity activeOpacity={0.8} style={styles.modalButtonStyle}>
                                <Text style={styles.txtButton}>پرداخت اعتبار</Text>
                            </TouchableOpacity>
                            <View style={{ marginTop: 50 }}>
                                <Collapse isExpanded={false} style={styles.Collapse}>
                                    <CollapseHeader style={{ padding: 10 }}>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                            <Icon name='angle-left' color='#555' size={30} style={{ marginLeft: 10 }} />
                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                <Text style={styles.message}>دریافت اعتبار هدیه</Text>
                                                <IconOutline name="gift" color='#9e9e9e' size={30} style={{ marginLeft: 15, marginTop: -5 }} />
                                            </View>
                                        </View>
                                    </CollapseHeader>
                                    <CollapseBody style={{ alignItems: "center", justifyContent: "center", paddingHorizontal: 10, paddingBottom: 15 }}>
                                        <Text style={[styles.message, { color: "#01a545" }]}>
                                            با دعوت از دوستان خود تا یک میلیون تومان هدیه بگیرید
                                        </Text>
                                        <Image source={require('../../../assets/images/invite.png')} style={{ marginTop: 20, width: 100, height: 100 }} />
                                        <Text style={styles.message}>
                                            با دعوت از هر دوست جدید به پتوس، 10 هزار تومان هدیه بگیرید. لینک دعوت خود را برای دوستت ارسال کن و کیف پولت شارژ کن
                                        </Text>
                                        <TouchableOpacity activeOpacity={0.8} onPress={this.permissionsContacts} style={styles.modalButtonStyle2}>
                                            <Text style={{ textAlign: "center", fontFamily: "Dana-FaNum-Medium", color: "#01a545", fontSize: 12 }}>لیست مخاطبین</Text>
                                            <IconOutline name="contacts" color='#01a545' size={30} style={{ marginLeft: 5, marginTop: -5 }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity activeOpacity={0.8} onPress={this.inviteFriends} style={styles.modalButtonStyle}>
                                            <Text style={styles.txtButton}>دعوت از دوستان</Text>
                                        </TouchableOpacity>
                                    </CollapseBody>
                                </Collapse>
                                <Collapse isExpanded={false} style={styles.Collapse}>
                                    <CollapseHeader style={{ padding: 10 }}>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                            <Icon name='angle-left' color='#555' size={30} style={{ marginLeft: 10 }} />
                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                <Text style={styles.message}>تاریخچه اعتبار </Text>
                                                <IconOutline name="history" color='#9e9e9e' size={30} style={{ marginLeft: 15, marginTop: -5 }} />
                                            </View>
                                        </View>
                                    </CollapseHeader>
                                    <CollapseBody>
                                        <View>
                                            {
                                                this.state.walletHistory.map((item, i) => (
                                                    <ListItem key={i} topDivider>
                                                        <Text style={styles.message}>{item.time}</Text>
                                                        <ListItem.Content>
                                                            <Text style={styles.message}>{item.date}</Text>
                                                        </ListItem.Content>
                                                        <View style={{ flexDirection: "row" }}>
                                                            <ListItem.Title style={styles.message}>{[item.amount, " تومان "]}</ListItem.Title>
                                                            <Icon name='check-circle-o' color='#01a545' size={16} style={{ marginLeft: 5, marginTop: 2 }} />
                                                            {/* <IconFill name="heart" />
                                                            <IconOutline name="heart" /> */}
                                                        </View>
                                                    </ListItem>
                                                ))
                                            }
                                        </View>
                                    </CollapseBody>
                                </Collapse>
                            </View>
                        </ScrollView>
                    </View>
                </Modal>
                <Modal animationType={'center'} transparent={true} position={'center'} coverScreen={true} visible={this.state.modalVisibleShare}>
                    <View style={{ flex: 1, backgroundColor: "#fff" }}>
                        <Appbar.Header style={{ backgroundColor: '#fff' }}>
                            <Appbar.Content titleStyle={styles.Appbar} title='دعوت از دوستان' />
                            <Appbar.Action size={35} color={'#555'} icon="chevron-right" onPress={() => { this.setModalVisibleShare(false) }} />
                        </Appbar.Header>
                        <ScrollView>
                            <View style={{ marginTop: 20, marginHorizontal: "8%", justifyContent: 'center', alignItems: "center" }}>
                                <Text style={{ color: "#01a545", fontSize: 12, fontFamily: "Dana-FaNum-Bold" }}>
                                    با دعوت از دوستان خود تا یک میلیون تومان هدیه بگیرید
                                </Text>
                                <Image source={require('../../../assets/images/invite.png')} style={{ marginTop: 20, width: 120, height: 120 }} />
                                <Text style={{ textAlign: "right", fontFamily: "Dana-FaNum-Medium", color: "#555", marginTop: 20, fontSize: 12 }}>
                                    با دعوت از هر دوست جدید به پتوس، 10 هزار تومان هدیه بگیرید. لینک دعوت خود را برای دوستت ارسال کن و کیف پولت شارژ کن
                                </Text>
                                <TouchableOpacity activeOpacity={0.8} onPress={this.permissionsContacts} style={styles.modalButtonStyle2}>
                                    <Text style={{ textAlign: "center", fontFamily: "Dana-FaNum-Medium", color: "#01a545", fontSize: 12 }}>لیست مخاطبین</Text>
                                    <IconOutline name="contacts" color='#01a545' size={30} style={{ marginLeft: 5, marginTop: -5 }} />
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.8} onPress={this.inviteFriends} style={styles.modalButtonStyle}>
                                    <Text style={styles.txtButton}>دعوت از دوستان</Text>
                                </TouchableOpacity>
                            </View>

                        </ScrollView>
                    </View>
                </Modal>

                <Dialog visible={this.state.dialogVisibleOk} dialogStyle={styles.dialog} onTouchOutside={() => this.setState({ dialogVisibleOk: false })}>
                    <Icon name='check-circle' color='#01a545' size={40} onPress={() => { this.clickdialogVisibleOk(false) }} />
                </Dialog>

                <AwesomeAlert
                    show={this.state.showAlert}
                    showProgress={false}
                    message={this.state.messageAlert}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    confirmText="بسیار خب"
                    confirmButtonColor="#01a545"
                    confirmButtonTextStyle={{ fontSize: 12, fontFamily: 'Dana-FaNum-Bold' }}
                    messageStyle={{ fontSize: 12, fontFamily: 'Dana-FaNum-Medium', paddingHorizontal: 10 }}
                    onConfirmPressed={() => { this.hideAlert(); }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    Collapse: {
        backgroundColor: "#fff",
        marginHorizontal: 15,
        marginVertical: 5,
        borderRadius: 5,
        shadowColor: "#9e9e9e",
        shadowOffset: {
            width: 0,
            height: 1,
            marginRight: 12,
            marginTop: 5,
            marginLeft: 10,
            marginBottom: 10,
        },
        shadowOpacity: 0.50,
        shadowRadius: 3.84,
        elevation: 1
    },
    dialog: {
        backgroundColor: '#fff',
        width: 85,
        height: 85,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        shadowColor: "#f8f8f8",
        shadowOffset: {
            width: 0,
            height: 1,
            marginRight: 12,
            marginBottom: 10,
        },
        shadowOpacity: 0.10,
        shadowRadius: 3.84,
        elevation: 5
    },
    col: {
        width: width / 3 - 25,
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingHorizontal: 15,
        marginHorizontal: '2%',
        paddingBottom: 10,
        shadowColor: "#f8f8f8",
        shadowOffset: {
            width: 0,
            height: 1,
            marginRight: 12,
            marginBottom: 10,
        },
        shadowOpacity: 0.10,
        shadowRadius: 3.84,
        elevation: 2
    },
    colSpan: {
        width: "90%",
        marginTop: 10,
        backgroundColor: '#fff',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        paddingVertical: 20,
        paddingHorizontal: 30,
        shadowColor: "#f8f8f8",
        shadowOffset: {
            width: 0,
            height: 1,
            marginRight: 12,
            marginBottom: 10,
        },
        shadowOpacity: 0.10,
        shadowRadius: 3.84,
        elevation: 2
    },
    Profile: {
        marginLeft: 10,
        width: 50,
        height: 50,
        borderRadius: 60,
        backgroundColor: "#e7f3ef"
    },
    credit: {
        fontSize: 12,
        marginTop: -5,
        fontSize: 12,
        color: '#444',
        fontFamily: "Dana-FaNum-Medium"
    },
    imgCol: {
        width: 70,
        height: 70,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    titleCol: {
        alignSelf: 'center',
        fontSize: 12,
        color: '#444',
        fontFamily: "Dana-FaNum-Medium",
    },
    message: {
        textAlign: 'right',
        fontSize: 12,
        color: '#444',
        fontFamily: "Dana-FaNum-Medium",
    },
    buttonStyle: {
        backgroundColor: "#01A545",
        paddingHorizontal: 5,
        paddingVertical: 6,
        marginHorizontal: '3%',
        borderRadius: 10,
        marginTop: 15
    },
    txtButton: {
        color: "#fff",
        textAlign: "center",
        fontFamily: "Dana-FaNum-Bold",
    },
    userType: {
        fontFamily: 'Dana-FaNum-Bold',
        fontSize: 12,
        color: '#01A545',
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 20,
        textAlign: "center",
        marginTop: -5
    },
    txtReturn: {
        color: "#01a545",
        textAlign: "center",
        fontFamily: "Dana-FaNum-Bold",
    },
    verifyContainer: {
        backgroundColor: "#fff",
        marginHorizontal: 30,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#9e9e9e",
        shadowOffset: {
            width: 0,
            height: 1,
            marginRight: 12,
            marginTop: 5,
            marginLeft: 10,
            marginBottom: 10,
        },
        shadowOpacity: 0.50,
        shadowRadius: 3.84,
        elevation: 1,
        paddingVertical: 20,
        borderRadius: 20
    },
    btnVerify: {
        backgroundColor: "#01A545",
        paddingHorizontal: 30,
        paddingVertical: 6,
        borderRadius: 5,
        marginHorizontal: 20,
        marginTop: 10
    },
    btnReturn: {
        backgroundColor: "#fff",
        borderColor: "#01a545",
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderRadius: 5,
        marginHorizontal: 20,
        marginTop: 10
    },
    row: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    ///modal edit info
    Appbar: {
        color: '#444',
        fontFamily: 'Dana-FaNum-Medium',
        fontSize: 14,
        textAlign: 'right',
    },
    section: {
        backgroundColor: "#fff",
        marginHorizontal: 0,
        marginBottom: 10,
        paddingHorizontal: 25,
        paddingVertical: 30
    },
    txtChangeProfile: {
        color: "#666",
        textAlign: "center",
        fontFamily: "Dana-FaNum-Bold",
        marginTop: 15
    },
    modalButtonStyle: {
        backgroundColor: "#01A545",
        paddingHorizontal: 5,
        paddingVertical: 10,
        marginHorizontal: "8%",
        borderRadius: 5,
        marginTop: 30
    },
    modalButtonStyle2: {
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderColor: "#01A545",
        borderWidth: 1,
        borderRadius: 20,
        marginTop: 30,
        flexDirection: "row"
    },
 
});