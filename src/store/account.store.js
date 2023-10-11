import { createSlice } from '@reduxjs/toolkit';
const mylocale = () => {
    switch (localStorage.getItem('locale')) {
        case 'en_US':
            return 'en_US'
        case 'zh_CN':
            return 'zh_CN'
        default:
            return 'en_US'
    }
}

const initialState = {
    locale: mylocale(),
    logged: localStorage.getItem('logged') === 'true' || false,
    collapsed: localStorage.getItem('collapsed') === 'true' || false,
    statistics: {}
}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setLocale: (state, action) => {
            localStorage.setItem('locale', action.payload)
            state.locale = action.payload;
        },
        setLogged: (state, action) => {
            localStorage.setItem('logged', action.payload)
            state.logged = action.payload;
        },
        setCollapsed: (state, action) => {
            localStorage.setItem('collapsed', action.payload)
            state.collapsed = action.payload;
        },
        setStatistics: (state, action) => {
            state.statistics = action.payload;
        },
        setStatus: (state, action) => {
            Object.assign(state, action.payload)
            action.payload.locale && localStorage.setItem('locale', action.payload.locale)
            action.payload.logged && localStorage.setItem('logged', action.payload.logged)
            action.payload.collapsed && localStorage.setItem('collapsed', action.payload.collapsed)
        }

    },
});

// 为每个 case reducer 函数生成 Action creators
export const { setLocale, setLogged, setCollapsed, setStatus, setStatistics } = accountSlice.actions;

export default accountSlice.reducer;