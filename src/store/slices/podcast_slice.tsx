import { createSlice } from "@reduxjs/toolkit";
import { PodcastSliceState } from "../../types/podcast";

const initialState: PodcastSliceState = {
    loading: false,
    items: []
};

export const PodcastSlice = createSlice({
    name: 'Podcast',
    initialState,
    reducers: {
        startLoadingList: (state) => ({
            ...state,
            loading: true
        }),
        stopLoadingList: (state) => ({
            ...state,
            loading: false
        }),
        setPodcastList: (state, action) => ({
            ...state,
            items: action.payload.podcasts
        }),
    }
});

export const { startLoadingList, stopLoadingList, setPodcastList } = PodcastSlice.actions;