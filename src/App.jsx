import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import LocationInfo from './components/LocationInfo'
import ResidentInfo from './components/ResidentInfo'
import getRandomLocation from './utils/getRandomLocation'

function App() {

  const [location, setLocation] = useState()
  const [numberLocation, setNumberLocation] = useState(getRandomLocation())
  const [currentSelection, setCurrentSelection] = useState()
  const [hasError, setHasError] = useState()
  const [listLocation, setListLocation] = useState()
  const [isShow, setIsShow] = useState(false)
  const [selection, setSelection] = useState()
  const [closeList, setCloseList] = useState(false)


  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${numberLocation}` /*-- Buscar por numero de location*/
    axios.get(url)
      .then(res => {
        setLocation(res.data)
        setHasError(false)
      }
      )
      .catch(err => {
        console.log(err)
        setHasError(true)
      }
      )
  }, [numberLocation])

  const handleChange = e => {
    const url = `https://rickandmortyapi.com/api/location/?name=${e.target.value.trim()}`
    axios.get(url)
    .then(res => setListLocation(res.data.results))
    .catch(err => {
      console.log(err)
      setHasError(true)
    })
    setSelection(e.target.value.trim())
  }
  
  const handleSubmit = e => {
    e.preventDefault()
    if (e.target.inputLocation.value.trim().length === 0) {
      setNumberLocation(getRandomLocation)
    } else {
      setNumberLocation(currentSelection)
      setIsShow(false)
    }
  }

  const handleFocus = e => {
    console.log(e.target.inputLocation === undefined)
    setIsShow(true)
  }
  const handleBlur = () => {
    setTimeout(() => {
      setIsShow(false)
    }, 120);
  }

  return (
    <div className="app">
      <div className='app__bgImage'></div>
      <form className='form' onSubmit={handleSubmit}>
        <input
          className='form__input'
          id='inputLocation'
          type="text"
          placeholder='Press "Search" for a ramdom search'
          value={selection}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlurCapture={handleBlur}
        />
        <button className='form__btn'>Search</button>
      </form>
      {
        <ul className={`form__suggestion ${isShow}`}>
          {
            listLocation?.map(loc => (
              <li
                className='form__suggItem'
                id='location'
                onClick={e => {
                  setCurrentSelection(loc.id)
                  setSelection(loc.name)
                }}
                key={loc.id}
              >
                {loc.name}
              </li>
            ))
          }
        </ul>
      }
      {
        hasError ?
          <h2 className='app__error'>❌You must choose an option from the list❌</h2>
          :
          <>
            <LocationInfo location={location} />
            <div className='residents__container'>
              {
                location?.residents.map(url => (
                  <ResidentInfo
                    key={url}
                    url={url}
                  />
                ))
              }
            </div>
          </>
      }
      <a href="https://github.com/MiguelAngelGV17/React_entregable3_gen22-1.git" target="_blank"><i class='bx bxl-github bx-tada' ></i></a>
      
    </div>
  )
}

export default App
