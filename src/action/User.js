import {
  AUTH_USER,
  GET_USER,
  UPDATE_USER,
  DELETE_USER,
  CHANGE_MOBILE_NUMBER,
  GET_TOKEN
} from "./types";
import axios from "axios";
var Config = require("../config");

export const getUser = (id, token) => async (dispatch) => {
  try {
    var config = {
      method: "get",
      url: Config.baseUrl + Config.getUser+ id,
      headers: { "Content-Type": "application/json", "x-access-token": token },
    };
    const res = await axios(config);
    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};


export const getToken = (id) => async (dispatch) => {
  try {
    var data = JSON.stringify({ secretKey: Config.SECRET_KEY });
    var config = {
      method: "post",
      url: Config.baseUrl + Config.getToken + id,
      headers: { "Content-Type": "application/json", "x-access-token": token },
      data: data,
    };
    const res = await axios(config);
    dispatch({
      type: GET_TOKEN,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};


export const changeMobileNumber = (id, data, token) => async (dispatch) => {
  try {
    const res = await UserService.changeMobileNumber(id, data, token);
    dispatch({
      type: CHANGE_MOBILE_NUMBER,
      payload: data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateUser = (id, data, token) => async (dispatch) => {
  try {
    const res = await UserService.updateUser(id, data, token);
    dispatch({
      type: UPDATE_USER,
      payload: data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    await UserService.deleteUser(id, token);
    dispatch({
      type: DELETE_USER,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

