import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const LoginUser = createAsyncThunk(
  "auth/LoginUser",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://ventus.up.railway.app/api/auth/login",
        {
          email: user.email,
          password: user.password,
        }
      );
      let token = response.data.token;
      localStorage.setItem("token", token);
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const GetMe = createAsyncThunk("auth/GetMe", async (_, thunkAPI) => {
  try {
    let token = localStorage.getItem("token");

    if (!token) {
      return thunkAPI.rejectWithValue("Login ke Akun Anda ");
    }

    const response = await axios.get(
      "https://ventus.up.railway.app/api/auth/dashboard",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

export const LogOut = createAsyncThunk("auth/LogOut", async () => {
  await axios.delete("https://ventus.up.railway.app/api/auth/logout");
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //Get Dashboard
    builder.addCase(GetMe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(GetMe.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(LogOut.fulfilled, (state) => {
      state.user = null;
      localStorage.removeItem("token");
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
