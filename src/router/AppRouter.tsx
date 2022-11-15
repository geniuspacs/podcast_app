import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import { PodcastDetail } from '../pages/PodcastDetail';

export const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: 'podcast/:podcastId',
        element: <PodcastDetail />
    }
]);