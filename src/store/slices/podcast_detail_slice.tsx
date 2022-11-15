import { createSlice } from "@reduxjs/toolkit";
import { PodcastDetailSliceState } from "../../types/podcast";

const initialState: PodcastDetailSliceState = {
    loading: false,
    podcastDetail: []
};

export const PodcastDetailSlice = createSlice({
    name: 'Podcast',
    initialState,
    reducers: {
        startLoadingPodcastDetail: (state) => ({
            ...state,
            loading: true
        }),
        stopLoadingPodcastDetail: (state) => ({
            ...state,
            loading: false
        }),
        setPodcastDetail: (state, action) => ({
            ...state,
            podcastDetail: action.payload.podcast,
            error: action.payload.error
        }),
        resetPodcastDetail: (state): any => ({
            ...state,
            podcastDetail: null
        }),
        setError: (state, action) => ({
            ...state,
            error: action.payload.error
        })
    }
});

export const { startLoadingPodcastDetail, stopLoadingPodcastDetail, setPodcastDetail, resetPodcastDetail, setError } = PodcastDetailSlice.actions;