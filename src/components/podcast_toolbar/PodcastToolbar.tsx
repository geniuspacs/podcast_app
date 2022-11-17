import React, { ChangeEvent, useContext, useState } from 'react'
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';

const rightContents = (
  <>
    
  </>
);

type PodcastToolbarProps = {
  filter: string | undefined,
  onSetFilter: (value: string) => void
}

export const PodcastToolbar = ({filter, onSetFilter}: PodcastToolbarProps) => {
  return (
    <Toolbar 
      className='bg-primary text-light border-none border-noround' 
      left={<h1>Podcast APP</h1>} 
      right={
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText value={filter} onChange={(e) => onSetFilter(e.target.value.trim())} placeholder="Search" />
        </span>
      }>
      </Toolbar>
  )
}
