import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View, TouchableOpacity,
    Image, ScrollView,
    StatusBar, Modal, Dimensions
} from 'react-native';
import SMSVerifyCode from 'react-native-sms-verifycode'
const { width, height } = Dimensions.get('window');
import { TextInput, Snackbar } from 'react-native-paper';
import {connect} from "react-redux";
import {mobileChanged,loginUser,tokenChanged} from "../../action/AuthUser";
import AwesomeAlert from 'react-native-awesome-alerts';
 class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAlert: false,
            messageAlert: '',
            mobile: '',
            verifycode: '',
            modalVisibleVerifyCode: false,
            SnackVisible: false,
        };
    }
     onMobileChange(text) {
         this.props.mobileChanged(text)
     }
    randomNumber() {
        var text = '';
        var possible = '123456789';
        for (var i = 0; i < 5; i++) {
            var sup = Math.floor(Math.random() * possible.length);
            text += i > 0 && sup == i ? '0' : possible.charAt(sup);
        }
        return text;
    }

    showAlert = () => {
        this.setState({ showAlert: true });
    };
    hideAlert = () => {
        this.setState({ showAlert: false });
    };

    cancelVerify() {
        this.setState({ modalVisibleVerifyCode: false, mobile: "" });
    }

    onclickVerifycode() {
        if (this.props.mobile === '') {
            this.setState({ messageAlert: 'شماره همراه را وارد نمائید' })
            this.showAlert();
            this.setState({ mobile: '' })
        }
        else if (this.props.mobile.length < 11) {
            this.setState({ messageAlert: 'حداقل طول شماره باید 11 کاراکتر باشد' })
            this.showAlert();
            this.setState({ mobile: '' })
        }
        else {
            this.setState({ verifycode: this.randomNumber() });
            this.setState({ modalVisibleVerifyCode: true });
            // this.sendSMS()
        }
    }


     onInputVerifyCodeCompleted = (text) => {
        this.props.loginUser(this.props.mobile).then((response)=>{
          console.log(response.data['data'].token)
            switch (response.status){
                case 200:{
                    this.props.tokenChanged(response.data['data'].token);
                    this.props.navigation.navigate('Dashboard')
                } break;
                case 403:{
                    this.setState({ messageAlert: 'در ورود اطلاعات مشکل می باشد' });
                    this.showAlert();

                } break;
                case 404:{
                    this.setState({ messageAlert: 'مشکل از سمت سرور می باشد' });
                    this.showAlert();

                } break;
                case 503:{
                    this.setState({ messageAlert: 'مشکل از سمت سرور می باشد' });
                    this.showAlert();
                } break;
            }
        });
     }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={false} backgroundColor='#01A545' />
                <ScrollView>
                    <Image style={styles.image}
                        source={require('../../../assets/images/logo.png')} />
                    <View style={styles.inputContainer}>
                        <TextInput
                            label="شماره موبایل"
                            mode="outlined"
                            style={{ textAlign: "right", fontFamily: "Dana-FaNum-Bold", fontSize: 16, marginTop: 10 }}
                            selectionColor={'#01A545'}

                            keyboardType={'number-pad'}
                            maxLength={11}
                            direction='rtl'
                            fontFamily={'Dana-FaNum-Medium'}
                            theme={{ colors: { primary: '#01A545', underlineColor: 'transparent', background: '#fff', placeholder: '#999' } }}
                            outlineColor={'#9e9e9e'}
                            value={this.props.mobile}
                            onChangeText={this.onMobileChange.bind(this)}

                        />
                        <TouchableOpacity activeOpacity={0.8} style={styles.buttonStyle} onPress={() => { this.onclickVerifycode() }} >
                            <Text style={styles.txtButton}>ورود</Text>
                        </TouchableOpacity>
                    </View>

                    {/* <TouchableOpacity activeOpacity={0.8} style={styles.buttonStyle} onPress={() => this.setState({ SnackVisible: true })}>
                        <Text style={styles.txtButton}>test</Text>
                    </TouchableOpacity>

                    <Snackbar
                        visible={this.state.SnackVisible}
                        onDismiss={this.setState({ SnackVisible: false })}
                        action={{
                            label: 'Undo',
                            onPress: () => {
                                // Do something
                            },
                        }}>
                        Hey there! I'm a Snackbar.
                    </Snackbar> */}
                </ScrollView>
                <Modal
                    // transparent={true}
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
                                <TouchableOpacity activeOpacity={0.8} style={styles.btnReturn} onPress={() => { this.cancelVerify() }}>
                                    <Text style={styles.txtReturn} >لغو</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.8} style={styles.btnVerify} >
                                    <Text style={styles.txtButton} onPress={() => this.onInputVerifyCodeCompleted}>تایید</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

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
const mapStateToProps = state => {
    return {
     mobile:state.AuthUser.mobile
    }
}
export default connect(mapStateToProps, {
    mobileChanged,
    loginUser,
    tokenChanged

})(Login);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {

        width: 70,
        height: 100,
        marginTop: 90,
        alignSelf: "center"
    },
    inputContainer: {
        marginTop: 80,
        width: '80%',
        alignSelf: 'center'
    },
    buttonStyle: {
        backgroundColor: "#01A545",
        paddingHorizontal: 5,
        paddingVertical: 10,
        marginHorizontal: "0.5%",
        borderRadius: 5,
        marginTop: 30,
    },
    txtButton: {
        color: "#fff",
        textAlign: "center",
        fontFamily: "Dana-FaNum-Bold",
    },

    message: {
        textAlign: 'right',
        fontSize: 12,
        color: '#444',
        fontFamily: "Dana-FaNum-Medium",
        marginTop: 10
    },
    row: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
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
    },
    btnVerify: {
        backgroundColor: "#01A545",
        paddingHorizontal: 30,
        paddingVertical: 6,
        borderRadius: 5,
        marginHorizontal: 20,
        marginTop: 20
    },
    btnReturn: {
        backgroundColor: "#fff",
        borderColor: "#01a545",
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderRadius: 5,
        marginHorizontal: 20,
        marginTop: 20
    }
});

