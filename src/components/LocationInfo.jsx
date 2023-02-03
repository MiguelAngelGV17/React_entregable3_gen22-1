import React from 'react'
import './styles/location.css'

const LocationInfo = ({location}) => {

  return (
    <article className='location'>
        <h2 className='location__name'>{location?.name}</h2>
        {/* <hr className='location__hr'/> */}
        <ul className='location__list'>
            <li className='location__item'><span className='location__label'>Type: </span>{location?.type}</li>
            <li className='location__item'><span className='location__label'>Population: </span>{location?.residents.length}</li>
            <li className='location__item'><span className='location__label'>Dimension: </span>{location?.dimension}</li>
        </ul>
    </article>
  )
}

export default LocationInfo