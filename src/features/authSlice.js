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
  "auth/loginUser",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://ventus.up.railway.app/api/auth/login",
        {
          email: user.email,
          password: user.password,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const GetMe = createAsyncThunk("auth/getme", async (_, thunkAPI) => {
  try {
    const response = await axios.get(
      "http://ventus.up.railway.app/api/auth/dashboard",
      {
        withCredentials: true,
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
  await axios.delete("http://ventus.up.railway.app/api/auth/logout", {
    withCredentials: true,
  });
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
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
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(GetMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.message = "";
      state.user = action.payload;
    });
    builder.addCase(GetMe.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload || "Error";
      state.user = null;
    });
    builder.addCase(LogOut.fulfilled, (state) => {
      state.user = null;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
