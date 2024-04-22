import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import { Link } from 'react-router-dom';


function Pokemon() {
  const { id } = useParams(); // Using useParams() to get the id parameter
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      }
    };
    fetchData();
  }, [id]); // Fetch data whenever id changes

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
    <div className='pokemon'>
      <div className='pokemon-left'>
        <h1>{pokemon.name}</h1>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>
      <div className='pokemon-right'>
        <div className='stat'>
          <h2>Type(s):</h2>
          <ul>
            {pokemon.types.map((type, index) => (
              <li key={index}>{type.type.name}</li>
            ))}
          </ul>
        </div>
        <div className='stat'>
        <h2>Stats:</h2>
        <ul>
          {pokemon.stats.map((stat, index) => (
            <li key={index}>{stat.stat.name}: {stat.base_stat}</li>
          ))}
        </ul>
        </div>
        <div className='stat'>
        <h2>Abilities:</h2>
        <ul>
          {pokemon.abilities.map((ability, index) => (
            <li key={index}>{ability.ability.name}</li>
          ))}
        </ul>
        </div>
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>
      </div>
     </div>
     <Link to="/pokedex-viktor-2">
      Back
     </Link>
     </div>
  );
}

export default Pokemon;
