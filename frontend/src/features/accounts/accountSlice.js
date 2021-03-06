import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import accountService from "./accountService";

const initialState = {
  accounts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new account
export const createAccount = createAsyncThunk(
  "accounts/create",
  async (accountData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await accountService.createAccount(accountData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user account
export const getAccounts = createAsyncThunk(
  "account/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await accountService.getAccounts(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user account
export const deleteAccount = createAsyncThunk(
  "accounts/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await accountService.deleteAccount(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
);

// deposit
export const deposit = createAsyncThunk(
  "accounts/deposit",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await accountService.deposit(data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// withdraw
export const withdraw = createAsyncThunk(
  "accounts/withdraw",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await accountService.withdraw(data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Withdraw and deposit
export const balance = createAsyncThunk(
  "accounts/balance",
  async (data, thunkAPI) => {
    console.log("accountid", data);
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await accountService.balance(data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.accounts.push(action.payload);
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAccounts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.accounts = action.payload;
      })
      .addCase(getAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.accounts = state.accounts.filter(
          (account) => account._id !== action.payload.id
        );
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deposit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deposit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.accounts = state.accounts.filter(
        //   (account) => account._id !== action.payload.id
        // );
        state.message=action.payload;
      })
      .addCase(deposit.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      


      .addCase(withdraw.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(withdraw.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.accounts = state.accounts.filter(
        //   (account) => account._id !== action.payload.id
        // );
        state.message=action.payload;
      })
      .addCase(withdraw.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = accountSlice.actions;
export default accountSlice.reducer;
