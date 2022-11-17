import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import { PodcastDetail } from '../pages/PodcastDetail';
import { PodcastDetailList } from '../pages/PodcastDetailList';
import { PodcastDirectory } from "../pages/PodcastDirectory";
import { PodcastPlayer } from "../pages/PodcastPlayer";

export const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <PodcastDirectory />,
            },
            {
                path: 'podcast/:podcastId',
                element: <PodcastDetail />,
                children: [
                    {
                        path: '',
                        element: <PodcastDetailList />
                    },
                    {
                        path: 'episode/:episodeId',
                        element: <PodcastPlayer /> 
                    }
                ]
            }
        ]
    }
]);