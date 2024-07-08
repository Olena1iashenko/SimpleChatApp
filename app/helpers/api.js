import axios from "axios";

export const chatAppAPI = axios.create({
  baseURL: "https://f4772171-4ce4-41d8-b073-bf10a0bdaad8.mock.pstmn.io",
});
