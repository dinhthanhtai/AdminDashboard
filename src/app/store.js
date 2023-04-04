import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from "../features/theme/themeSlice";

export default configureStore({
    reducer: {
        theme: ThemeReducer,
    }
});