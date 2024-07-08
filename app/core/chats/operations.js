import { createAsyncThunk } from "@reduxjs/toolkit";
import { chatAppAPI } from "../../helpers/api.js";

export const fetchAllChatsThunk = createAsyncThunk(
  "chats/fetchAllChats",
  async (_, thunkAPI) => {
    try {
      const { data } = await chatAppAPI.get("/chats");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addChatThunk = createAsyncThunk(
  "chats/addChat",
  async (chat, thunkAPI) => {
    try {
      const { data } = await chatAppAPI.post("/chats", chat);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editChatThunk = createAsyncThunk(
  "chats/editChat",
  async (chat, thunkAPI) => {
    try {
      const { id, creator, title, messages } = chat;
      const { data } = await chatAppAPI.patch(`/chats/${id}`, {
        creator,
        title,
        messages
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteChatThunk = createAsyncThunk(
  "chats/deleteChat",
  async (id, thunkAPI) => {
    try {
      await chatAppAPI.delete(`/chats/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

