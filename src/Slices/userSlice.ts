import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  id: number
  email: string
  membership: object
  first_name: string
  last_name: string
  is_staff: boolean
  is_active: boolean
}

const initialState: UserState = {
  id: 0,
  email: "",
  membership: {},
  first_name: "",
  last_name: "",
  is_staff: false,
  is_active: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.membership = action.payload.membership;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.is_staff = action.payload.is_staff;
      state.is_active = action.payload.is_active;
    },
    reset(state) {
      state.id = 0
      state.email = ""
      state.membership = {}
      state.first_name = ""
      state.last_name = ""
      state.is_staff = false
      state.is_active = false
    },
  },
});

export const { setUser, reset } = userSlice.actions;
export const selectUser = (state: any) => state.user;
export default userSlice.reducer;
