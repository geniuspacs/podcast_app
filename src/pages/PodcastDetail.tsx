import React, { useContext, useEffect } from 'react'
import { Card } from 'primereact/card'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom';
import { Podcast, PodcastDetailType } from '../types/podcast';
import { EpisodesList, LeftHeaderPanel } from '../components';
import { PodcastListProvider } from '../providers/PodcastListProvider';
import { getPodcastDetail } from '../store/slices/thunks';

export const PodcastDetail = (): JSX.Element => {

    const { podcastId } = useParams();

    const dispatch = useDispatch();

    const { podcastList } = useContext(PodcastListProvider);

    useEffect(() => {
        if(podcastId) {
            dispatch(getPodcastDetail(podcastId));
        }
    }, [podcastId]);

  return (
    <div className='grid'>
        {
            podcastList?.find((it: Podcast) => it.id === podcastId) && 
            <div className="col-12 md:col-4">
                <Card header={<LeftHeaderPanel podcast={podcastList.find((it: Podcast) => it.id === podcastId)} />}></Card>
            </div>
        }

        <div className="col-12 md:col-8">
            <Outlet />
        </div>

    </div>
  )
}
