import { configureStore } from "@reduxjs/toolkit";
import todos from "./slices/todos";

export const store = configureStore({ reducer: { todos } });
