import { configureStore } from "@reduxjs/toolkit";
import { PodcastDetailSlice, PodcastSlice } from "./slices";

const store = configureStore({
    reducer: {
        podcasts: PodcastSlice.reducer,
        podcast: PodcastDetailSlice.reducer,
    }
});

export default store;