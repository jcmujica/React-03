import React, { Component, useState, useEffect } from 'react';
import TableFilter from './components/TableFilter'
import HeroTable from './components/HeroTable'
import HeroForm from './components/HeroForm'
import './App.css';

const heroesAux = {
  '1': { id: '1', name: 'Gandalf', race: 'Maia', age: '2019', weapon: 'Staff 🏑' },
  '2': { id: '2', name: 'Aragorn', race: 'Human', age: '120', weapon: 'Sword ⚔' },
  '3': { id: '3', name: 'Legolas', race: 'Elf', age: '200', weapon: 'Bow 🏹' },
  '4': { id: '4', name: 'Gimli', race: 'Dwarf', age: '139', weapon: 'Axe ⚒' },
  '5': { id: '5', name: 'Frodo', race: 'Hobbit', age: '33', weapon: 'Dagger 🗡' }
}

const App = () => {
  const [filterText, setFitlerText] = useState('')
  const [heroes, setHeroes] = useState(heroesAux)
  const [heroesList, setHeroesList] = useState(['1', '2', '3', '4', '5'])
  const [heroIdUsingRing, setHeroIdUsingRing] = useState(null)
  const [usingForm, setUsingForm] = useState(false)
  const [usingRing, setUsingRing] = useState(false)

  useEffect(() => {
    if (usingRing) {
      document.title = 'Someone is using the Ring'
    }
  })

  const killHero = (id) => {
    let listWithoutKilledHero = heroesList.filter(heroId => heroId !== id )
    setHeroes({
      ...heroes,
      [id]: {
        ...heroes[id],
        status: 'dead'
      }})
      setHeroesList([...listWithoutKilledHero, id])
  }

  const putRing = (id) => {
    setHeroes({
      ...heroes,
      [id]: {
        ...heroes[id],
        status: 'using-ring',
      }
    })
    setHeroIdUsingRing(id)
    setUsingRing(true)
  }

  const recoverRing = () => {
    console.log(heroIdUsingRing)
    setHeroes({
        ...heroes,
        [heroIdUsingRing]: {
          ...heroes[heroIdUsingRing],
          status: ''
        }
    })
    setHeroIdUsingRing(null)
    setUsingRing(false)
  }

  const handleInputChange = (e) => {
    setFitlerText(e.target.value)
  }

  const toggleForm = () => {
    setUsingForm(!usingForm)
  }

  const saveHero = (values) => {
    const newId = heroesList.length + 1
    setHeroes({
      ...heroes,
      [newId]: {
        ...values,
        id: newId
      }
    })
    setHeroesList([...heroesList, newId])
    setUsingForm(false)
  }


  let filteredHeroes = heroesList.map(heroId => heroes[heroId])
  console.log(filteredHeroes)
  console.log(heroesList)
  console.log(heroes)
  if (filterText) {
    filteredHeroes = filteredHeroes.filter(hero => {
      return hero.name.toLowerCase().includes(filterText)
    })
  }

  return (
    <div className="index">
      <h2>Fellowship of the Ring</h2>

      {heroIdUsingRing && <button onClick={recoverRing}>Mostrar Anillo</button>}
      <button onClick={toggleForm}>Agregar Nuevo Heroe</button>

      {!usingForm && (
        <div className="container">
          <TableFilter
            filterText={filterText}
            handleChange={handleInputChange}
            placeHolder='Input search...'
          />

          {filteredHeroes.length > 0 && (
            <HeroTable
              heroes={filteredHeroes}
              killHero={killHero}
              putRing={putRing}
              usingRing={heroIdUsingRing}
            />
          ) }

          {filteredHeroes.length === 0 && <div>No heroes....</div> }
        </div>
      )}

      {usingForm && <HeroForm heroSubmit={saveHero} />}
      
    </div>
  )
}

export default App
