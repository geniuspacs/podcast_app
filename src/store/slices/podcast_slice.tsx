import { createSlice } from "@reduxjs/toolkit";
import { PodcastSliceState } from "../../types/podcast";

const initialState: PodcastSliceState = {
    loadingList: false,
    items: []
};

export const PodcastSlice = createSlice({
    name: 'Podcast',
    initialState,
    reducers: {
        startLoading: (state) => ({
            ...state,
            loadingList: true
        }),
        stopLoading: (state) => ({
            ...state,
            loadingList: false
        }),
        setPodcastList: (state, action) => ({
            ...state,
            items: action.payload.podcasts
        })
    }
});

export const { startLoading, stopLoading, setPodcastList } = PodcastSlice.actions;