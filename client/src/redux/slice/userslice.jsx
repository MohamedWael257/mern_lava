import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    usersdata: []
}
export const getUsers = createAsyncThunk('users/getUsers', async () => {
    return fetch(`${process.env.BASE_API_URL_HOST}/auth/getAllUsers`)
        // return fetch(`${process.env.BASE_API_URL_HOST}/auth/getAllUsers-no-admin`)
        .then((respons) => { return respons.json() })
});
const userslice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, () => { })
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.usersdata = []
            for (const key in action.payload) {
                state.usersdata.push({
                    id: action.payload[key]._id,
                    username: action.payload[key].username,
                    email: action.payload[key].email,
                    phoneNumber: action.payload[key].phoneNumber,
                    // fullname: action.payload[key].fullname,
                    photoimage: action.payload[key].photoimage,
                    // address: action.payload[key].address,
                    // gender: action.payload[key].gender,
                    // provider: action.payload[key].provider,
                    role: action.payload[key].role,
                    // resetPasswordToken: action.payload[key]?.resetPasswordToken,
                    // resetPasswordExpires: action.payload[key]?.resetPasswordExpires,
                    // updated: action.payload[key]?.updated,
                    // created: action.payload[key]?.created
                })
            }

        })
        builder.addCase(getUsers.rejected, () => { })
    }
});
export default userslice;
export const usersdata = (state) => state.users.usersdata;
