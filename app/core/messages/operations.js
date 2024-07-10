import { createAsyncThunk } from "@reduxjs/toolkit";
// import { chatAppAPI } from "../../helpers/api.js";

export const fetchAllMessagesThunk = createAsyncThunk(
  "messages/fetchAllmessages",
  async (_, thunkAPI) => {
    try {
      const { data } = await chatAppAPI.get("/messages");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addMessageThunk = createAsyncThunk(
  "messages/addMessage",
  async (message, thunkAPI) => {
    try {
      const { data } = await chatAppAPI.post("/messages", message);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editMessageThunk = createAsyncThunk(
  "messages/editMessage",
  async (message, thunkAPI) => {
    try {
      const { id, sender, message } = message;
      const { data } = await chatAppAPI.patch(`/messages/${id}`, {
        sender,
        message,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteMessageThunk = createAsyncThunk(
  "messages/deleteMessage",
  async (id, thunkAPI) => {
    try {
      await chatAppAPI.delete(`/messages/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
