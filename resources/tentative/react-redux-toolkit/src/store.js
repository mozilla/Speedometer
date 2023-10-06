import { configureStore } from "@reduxjs/toolkit";
import todos from "./slices/todos";
import pathname from "./slices/pathname";
import viewOptions from "./slices/view-options";

export const store = configureStore({ reducer: { todos, pathname, viewOptions } });
