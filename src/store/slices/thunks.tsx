import axios from "axios";
import moment from "moment";
import { Podcast, PodcastDetailType, PodcastEpisode } from "../../types/podcast";
import { setError, setSelectedPodcast, startLoading, stopLoading } from "./podcast_slice";

export const getPodcastDetail = (id: string): any => {
    return async(dispatch: any, getState: Function) => {
        const {details} = getState();

        const {podcasts} = details;

        const existingPodcast: PodcastDetailType = podcasts.find((podcast: PodcastDetailType) => podcast.id === id);

        if(!existingPodcast || moment(existingPodcast.lastView, 'DD/MM/yyyy').diff(moment().format('DD/MM/yyyy'), 'days') !== 0) {
            dispatch(startLoading());

            try {
                const { data } = await axios.get(import.meta.env.VITE_PODCAST_DETAIL_BASE, {
                    params: {
                        url: `${import.meta.env.VITE_PODCAST_DETAIL}?id=${id}&media=podcast&entity=podcastEpisode&limit=100`
                    },
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                dispatch(setSelectedPodcast({
                    id,
                    episodes: data.results
                        .filter((podc: any) => podc.kind === 'podcast-episode')
                        .map((episode: any): PodcastEpisode => (
                            {
                                id: episode.trackId,
                                title: episode.trackName,
                                date: episode.releaseDate,
                                duration: episode.trackTimeMillis,
                                description: episode.description,
                                shortDescription: episode.shortDescription,
                                episodeUrl: episode.episodeUrl,
                                episodeFileExtension: episode.episodeFileExtension
                            }
                        )
                    ),
                    episodesNumber: data.resultCount - 1,
                    lastView: moment().format('DD/MM/yyyy')
                }));
            } catch (error) {
                dispatch(setError({error}))
            }

            dispatch(stopLoading());
        }
    }
}