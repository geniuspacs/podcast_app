import React, { useEffect } from 'react'
import { Card } from 'primereact/card'
import { useDispatch, useSelector } from 'react-redux'
import { getPodcastDetail, getPodcasts } from '../store/slices/thunks';
import { Outlet, useParams } from 'react-router-dom';
import { Podcast, PodcastDetailType } from '../types/podcast'
import { LeftHeaderPanel } from '../components'
import { EpisodesList } from '../components/podcast_detail/episodes_list/EpisodesList';
import { ProgressSpinner } from 'primereact/progressspinner';

export const PodcastDetail = (): JSX.Element => {

    const dispatch = useDispatch();

    const { loadingList, items } = useSelector((state: any) => state.podcasts);
    const { loadingDetail, podcastViewed } = useSelector((state: any) => state.podcastDetail);

    const { podcastId, episodeId } = useParams();

    useEffect(() => {
        if(podcastId) {
            if(!items || items.length <= 0) {
                dispatch(getPodcasts());
            }
            dispatch(getPodcastDetail(podcastId));
        }
    }, [podcastId]);

    
  return (
    <>
        {
            (loadingList || loadingDetail) && <ProgressSpinner />
        }

        {!loadingList && !loadingDetail && 
        <div className='grid'>
            {
                items?.find((it: Podcast) => it.id === podcastId) && 
                <div className="col-12 md:col-4">
                    <Card header={<LeftHeaderPanel podcast={items.find((it: Podcast) => it.id === podcastId)} />}></Card>
                </div>
            }

            {
                !episodeId && podcastViewed?.find((podcast: PodcastDetailType) => podcast.id === podcastId)  && 
                <EpisodesList podcast_detail={podcastViewed?.find((podcast: PodcastDetailType) => podcast.id === podcastId)}/>
            }

            {
                episodeId && <Outlet />
            }
        </div> }
    </>
  )
}
