import { configureStore } from "@reduxjs/toolkit";
import { PodcastSlice } from "./slices";

const store = configureStore({
    reducer: {
        details: PodcastSlice.reducer,
    }
});

export default store;