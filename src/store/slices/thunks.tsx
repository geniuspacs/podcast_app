import axios from "axios";
import { Podcast } from "../../types/podcast";
import { setError, setPodcastDetail, startLoadingPodcastDetail, stopLoadingPodcastDetail } from "./podcast_detail_slice";
import { setPodcastList, startLoadingList, stopLoadingList } from "./podcast_slice";

export const getPodcasts = (): any => {
    return async(dispatch: any, getState: Function) => {

        const {podcasts} = getState();
        const {items} = podcasts;

        if(!items || items.length <= 0) {
            dispatch(startLoadingList());

            const {data} = await axios.get(import.meta.env.VITE_PODCAST_LIST_URL);

            dispatch(setPodcastList({
                podcasts: data.feed.entry.map((podcast: any): Podcast => ({
                    id: podcast.id.attributes['im:id'],
                    title: podcast.title.label,
                    summary: podcast.summary.label,
                    img: podcast['im:image'][podcast['im:image'].length-1].label,
                    author: podcast['im:artist'].label
                }))
            }));
            
            dispatch(stopLoadingList());
        }
    }
};

export const getPodcastDetail = (id: string): any => {
    return async(dispatch: any, getState: Function) => {
        const {podcast} = getState();

        const {podcastDetail} = podcast;

        if(!podcastDetail) {
            dispatch(startLoadingPodcastDetail());

            try {
                const { data } = await axios.get(import.meta.env.VITE_PODCAST_DETAIL_BASE, {
                    params: {
                        url: `${import.meta.env.VITE_PODCAST_DETAIL}?id=${id}&media=podcast&entity=podcastEpisode&limit=100`
                    },
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                dispatch(setPodcastDetail({
                    podcast: {
                        podcast: data.results
                    }
                }));
            } catch (error) {
                dispatch(setError({error}))
            }

            dispatch(stopLoadingPodcastDetail());
        }
    }
}