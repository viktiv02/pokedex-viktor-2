import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  
  async function fetchPokemonData(page) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=24&offset=${(page - 1) * 24}`);
      const data = await response.json();
      
      const pokemonList = data.results.map((pokemon, index) => {
        const pokemonNumber = (page - 1) * 25 + index + 1; // Calculate Pokémon number based on page and index
        return {
          name: pokemon.name,
          number: pokemonNumber,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNumber}.png`
        };
      });

      return pokemonList;
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
      return [];
    }
  }

  useEffect(() => {
    fetchPokemonData(currentPage)
      .then(data => setPokemonList(data))
      .catch(error => console.error('Error fetching Pokémon data:', error));
  }, [currentPage]);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className='pokedex'>
      <h1>Pokémon List</h1>
      <div className="pokemon-container">
        {pokemonList.map(pokemon => (
          <Link key={pokemon.number} to={`/pokemon/${pokemon.number}`}>
            <div className="pokemon-card">
              <img src={pokemon.imageUrl} alt={pokemon.name} />
              <div>
                <h2>{pokemon.name}</h2>
                <p>Number: {pokemon.number}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className='button-container'>
        <button className='button' onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</button>
        <button className='button' onClick={goToNextPage}>Next</button>
      </div>
    </div>
  );
}

export default Pokedex;
