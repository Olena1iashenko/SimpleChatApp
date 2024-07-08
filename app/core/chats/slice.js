import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  fetchAllChatsThunk,
  addChatThunk,
  editChatThunk,
  deleteChatThunk,
} from "./operations";

const initialState = {
  chats: [],
  messages: [],
  loading: false,
  error: null,
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  selectors: {
    selectChats: (state) => state.chats.chats,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllChatsThunk.fulfilled, (state, { payload }) => {
        state.chats = payload;
      })
      .addCase(addChatThunk.fulfilled, (state, { payload }) => {
        const { chats } = state;
        state.chats = [...chats, payload];
      })
      .addCase(editChatThunk.fulfilled, (state, { payload }) => {
        state.chats = state.chats.map((chat) =>
          chat.id === payload.id ? payload : chat
        );
      })
      .addCase(deleteChatThunk.fulfilled, (state, { payload }) => {
        state.chats = state.chats.filter((chat) => chat.id !== payload);
      })
      .addMatcher(
        isAnyOf(
          fetchAllChatsThunk.pending,
          addChatThunk.pending,
          editChatThunk.pending,
          deleteChatThunk.pending
        ),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchAllChatsThunk.fulfilled,
          addChatThunk.fulfilled,
          editChatThunk.fulfilled,
          deleteChatThunk.fulfilled
        ),
        (state) => {
          state.loading = false;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchAllChatsThunk.rejected,
          addChatThunk.rejected,
          editChatThunk.rejected,
          deleteChatThunk.rejected
        ),
        (state) => {
          state.loading = false;
          state.error = true;
        }
      );
  },
});

export const chatsReducer = chatsSlice.reducer;
// export const { selectChats } = chatsSlice.actions;
