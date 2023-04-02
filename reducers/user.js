import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: { 
		token: null,
		email: null 
	},
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action) => {
			state.value.token = action.payload.token;
			state.value.email = action.payload.email;
		},
		logout: (state, action) => {
			state.value.isConnected = null;
			state.value.token = null;
		},
	},
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;