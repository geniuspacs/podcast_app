import React, { useEffect } from 'react'
import { Card } from 'primereact/card'
import { useDispatch, useSelector } from 'react-redux'
import { getPodcastDetail } from '../store/slices/thunks';
import { useParams } from 'react-router-dom';
export const PodcastDetail = (): JSX.Element => {

    const dispatch = useDispatch();

    const {loading, podcastDetail} = useSelector((state: any) => state.podcast);

    const { podcastId } = useParams();

    useEffect(() => {
        if(podcastId) {
            dispatch(getPodcastDetail(podcastId));
        }
    }, [podcastId])
    

  return (
    <div className='grid'>
        <div className="col-2 offset-3">
            <Card>
                {/* {podcastDetail} */}
            </Card>
        </div>
    </div>
  )
}
