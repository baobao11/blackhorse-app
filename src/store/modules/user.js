// 和用户相关的状态管理

import {createSlice} from '@reduxjs/toolkit'

const useStore = createSlice({
    name: 'user',
    // 数据状态
    initialState: {
       token: '',
    },

    // 同步修改方法
    reducers: {
        setToken(state,action) {
            state.token = action.payload
        }
    }
})


// 解构出actionCreater
const { setToken } = useStore.actions

// 获取reducers函数
const useReducer = useStore.reducer

export { setToken}
export default useReducer