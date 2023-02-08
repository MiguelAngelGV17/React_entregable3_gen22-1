import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './styles/residentInfo.css'

const ResidentInfo = ({ url }) => {

  const [character, setcharacter] = useState()
  useEffect(() => {
    axios.get(url)
      .then(res => setcharacter(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <article className='resident'>
      <header className='resident__header'>
        <img className='resident__img' src={character?.image} alt="" />
        <div className={`resident__container-status ${character?.status}Shadow`}>
          <span className={`status ${character?.status}`}></span> <span> {character?.status}</span>
        </div>
      </header>
      <section>
        <h3 className='resident__name'>{character?.name}</h3>
      </section>
      <ul className='resident__items'>
        <li className='resident__item'><span className='item__info'>Specie: </span>{character?.species}</li>
        <li className='resident__item'><span className='item__info'>Origin: </span>{character?.origin.name}</li>
        <li className='resident__item'><span className='item__info'>Eppisodes where appear: </span>{character?.episode.length}</li>
      </ul>
    </article>
  )
}

export default ResidentInfo