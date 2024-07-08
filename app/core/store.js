import { configureStore } from "@reduxjs/toolkit";
import { devToolsEnhancer } from "redux-devtools-extension";

import { chatsReducer } from "./chats/slice";
import { messagesReducer } from "./messages/slice";

const store = configureStore({
  reducer: {
    chats: chatsReducer,
    messages: messagesReducer,
  },
  enhancers: [devToolsEnhancer()],
});

export default store;
