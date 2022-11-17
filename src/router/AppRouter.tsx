import axios from "axios";
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import { PodcastDetail } from '../pages/PodcastDetail';
import { setPodcastDetail } from "../store/slices";
import { getPodcasts } from "../store/slices/thunks";
import { Podcast } from '../types/podcast';

export const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: 'podcast/:podcastId',
        element: <PodcastDetail />,
        children: [
            {
                path: 'episode/:episodeId',
                element: <h1>Hello!</h1>
            }
        ]
    }
]);