import React from 'react'
import { Image } from 'primereact/image'
import { Link } from 'react-router-dom'

export const LeftHeaderPanel = ({podcast}: any): JSX.Element => {
    return (
        <Link style={{
            textDecoration: 'none',
            color: 'black'
        }} to={`/podcast/${podcast.id}`} >
            <div className='p-3'>
            <Image src={podcast.img} />
            <div className="p-card-title my-3">
                {podcast.title}
            </div>
            <div className="p-card-subTitle my-3">
                {podcast.author}
            </div>

            <div>
                <h5>Description:</h5>
                <i>{podcast.summary}</i>
            </div>
            </div>
        </Link>
    )
}