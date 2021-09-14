import {
  MOBILE_CHANGED,
  USER_LOGIN_ATTEMP,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS, GET_USER, TOKEN_CHANGED,
} from "./Type";
import AwesomeAlert from "react-native-awesome-alerts";
import React from "react";
import { NavigationActions } from "react-navigation";
import { Alert, View } from "react-native";
import { storeData } from "../storage";
import axios from "axios";
var Config = require("../config");
export const mobileChanged = (text) => {
  return {
    type: MOBILE_CHANGED,
    payload: text,
  };
};
export const tokenChanged = (text) => {
  return {
    type: TOKEN_CHANGED,
    payload: text,
  };
};
export const userGetData = (text) => {
  return {
    type: GET_USER,
    payload: text,
  };
};

export const loginUser = (mobile, navigation) => {
  return (dispatch) => {
    dispatch({ type: USER_LOGIN_ATTEMP });
    var data = JSON.stringify({ mobile: mobile });
    var config = {
      method: "post",
      url: Config.baseUrl + Config.authUser,
      headers: {"Content-Type": "application/json",},
      data: data,
    };
    return axios(config).then((res) => {
      if (res.status === 200) {
        return {
          success: true,
          data: res.data,
          status: 200,
        };
      }
    })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            return {
              success: false,
              status: 401,
            };
          }
          if (error.response.status === 404) {
            return {
              success: false,
              status: 404,
            };
          }
          if (error.response.status === 403) {
            return {
              data: error.response.data,
              success: false,
              status: 403,
            };
          }
          if (error.response.status === 500) {
            return {
              success: false,
              status: 500,
            };
          }
          if (error.response.status === 502) {
            return {
              success: false,
              status: 502,
            };
          }
        }
        else {
          if (error.code === "ECONNABORTED") {
            return {
              success: false,
              status: "ECONNABORTED",
            };
          } else {
            if (error.message === "Network Error") {
              return {
                success: false,
                status: "Network Error",
              };
            }
          }
        }
      });
    // dispatch({ type: USER_LOGIN_ATTEMP });

  };
};

const loginSuccess = (dispatch, navigation, data) => {
  dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  const NavigationAction = NavigationActions.navigate({ routeName: "Dashboard", params: {} });
  navigation.dispatch(NavigationAction);
};
const loginFail = (dispatch, error) => {
  dispatch({ type: USER_LOGIN_FAIL, payload: error });
};
export const message = () => {
  return (<View><AwesomeAlert
      show={true}
      showProgress={false}
      title="اطلاعات  را به طور کامل وارد نمائید"
      message="fgdfgdfgfd"
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      showConfirmButton={true}
      titleStyle={{ fontSize: 14, fontFamily: "IRANSansMobile(FaNum)" }}
      messageStyle={{ fontSize: 15, fontFamily: "IRANSansMobile(FaNum)" }}
      confirmText="بله"
      confirmButtonColor="#3d933c"
      confirmButtonStyle={{}}
      confirmButtonTextStyle={{ fontSize: 17, fontFamily: "IRANSansMobile(FaNum)" }} /></View>
  );
};
