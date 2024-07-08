import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  fetchAllMessagesThunk,
  addMessageThunk,
  editMessageThunk,
  deleteMessageThunk,
} from "./operations";

const initialState = {
  messages: [],
  loading: false,
  error: null,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  selectors: {
    selectChats: (state) => state.chats.chats,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMessagesThunk.fulfilled, (state, { payload }) => {
        state.messages = payload;
      })
      .addCase(addMessageThunk.fulfilled, (state, { payload }) => {
        const { messages } = state;
        state.messages = [...messages, payload];
      })
      .addCase(editMessageThunk.fulfilled, (state, { payload }) => {
        state.messages = state.messages.map((message) =>
          message.id === payload.id ? payload : message
        );
      })
      .addCase(deleteMessageThunk.fulfilled, (state, { payload }) => {
        state.messages = state.messages.filter(
          (message) => message.id !== payload
        );
      })
      .addMatcher(
        isAnyOf(
          fetchAllMessagesThunk.pending,
          addMessageThunk.pending,
          editMessageThunk.pending,
          deleteMessageThunk.pending
        ),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchAllMessagesThunk.fulfilled,
          addMessageThunk.fulfilled,
          editMessageThunk.fulfilled,
          deleteMessageThunk.fulfilled
        ),
        (state) => {
          state.loading = false;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchAllMessagesThunk.rejected,
          addMessageThunk.rejected,
          editMessageThunk.rejected,
          deleteMessageThunk.rejected
        ),
        (state) => {
          state.loading = false;
          state.error = true;
        }
      );
  },
});

export const messagesReducer = messagesSlice.reducer;
