// 和用户相关的状态管理

import { createSlice } from "@reduxjs/toolkit";
import { request, setToken as _setToken, getToken, removeToken } from "@/utils";
const useStore = createSlice({
  name: "user",
  // 数据状态
  initialState: {
    token: getToken() || "",
    userInfo: {},
  },

  // 同步修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      // 本地存一份
      _setToken(action.payload);
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    clearUserInfo(state) {
      state.token = "";
      state.userInfo = {};
      removeToken();
    },
  },
});

// 解构出actionCreater
const { setToken, setUserInfo, clearUserInfo } = useStore.actions;

// 获取reducers函数
const useReducer = useStore.reducer;

// 异步方法  完成登录获取token
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    // 1、发送异步请求
    const res = await request.post("/authorizations", loginForm);
    // 2、提交同步action进行token的存入
    dispatch(setToken(res.data.token));
  };
};

const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await request.get("/user/profile");
    dispatch(setUserInfo(res.data));
  };
};

export { fetchLogin, setToken, fetchUserInfo, clearUserInfo };
export default useReducer;
