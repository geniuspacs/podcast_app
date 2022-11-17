import axios from "axios";
import { Podcast, PodcastDetailType, PodcastEpisode } from "../../types/podcast";
import { setError, setPodcastDetail, startLoadingPodcastDetail, stopLoadingPodcastDetail } from "./podcast_detail_slice";
import { setPodcastList, startLoading, stopLoading } from "./podcast_slice";

export const getPodcasts = (): any => {
    return async(dispatch: any, getState: Function) => {

        const {podcasts} = getState();
        const {items} = podcasts;

        if(!items || items.length <= 0) {
            dispatch(startLoading());

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
            
            dispatch(stopLoading());
        }
    }
};

export const getPodcastDetail = (id: string): any => {
    return async(dispatch: any, getState: Function) => {
        const {podcastDetail} = getState();
        const {podcastViewed} = podcastDetail;

        const itemSelected = podcastViewed.find((podcast: PodcastDetailType) => podcast.id === id);

        if(!itemSelected) {
            dispatch(startLoadingPodcastDetail());

            try {
                const { data } = await axios.get(import.meta.env.VITE_PODCAST_DETAIL_BASE, {
                    params: {
                        url: `${import.meta.env.VITE_PODCAST_DETAIL}?id=${id}&media=podcast&entity=podcastEpisode&limit=200`
                    },
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                
                dispatch(setPodcastDetail({
                    id,
                    episodes: data.results
                        .filter((podc: any) => podc.kind === 'podcast-episode')
                        .map((episode: any): PodcastEpisode => (
                            {
                                id: episode.trackId,
                                title: episode.trackName,
                                date: episode.releaseDate,
                                duration: episode.trackTimeMillis
                            }
                        )
                    ),
                    episodesNumber: data.resultCount - 1
                }));
            } catch (error) {
                dispatch(setError({error}))
            }

            dispatch(stopLoadingPodcastDetail());
        }
    }
}