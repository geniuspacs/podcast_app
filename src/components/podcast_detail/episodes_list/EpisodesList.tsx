import moment from 'moment'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React from 'react'
import { Link } from 'react-router-dom'
import { PodcastDetailType, PodcastEpisode } from '../../../types/podcast'


export const EpisodesList = ({podcast_detail}: any) => {

    const {episodesNumber, episodes} = podcast_detail;

    const title = ({title, id}: PodcastEpisode) => (<Link to={`episode/${id}`}>{title}</Link>)

    const formatDate = ({date}: PodcastEpisode) => moment(date).format('DD/MM/yyyy');

    const duration = ({duration}: PodcastEpisode) => moment.duration(duration).minutes() + ':' + moment.duration(duration).seconds();

  return (
    <div className="col-12 md:col-8">
        <Card title={`Episodes ${episodesNumber}`}></Card>
        <Card className='mt-4'>
            <DataTable 
                value={episodes}
                paginator
                responsiveLayout='scroll'
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                rows={10}
            >
                <Column field="title" header="Title" className='col' body={title}></Column>
                <Column field="date" header="Date" className='col' body={formatDate}></Column>
                <Column field="duration" header="Duration" className='col' body={duration}></Column>
            </DataTable>
        </Card>
    </div>
  )
}
