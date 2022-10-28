import React, { useState, useEffect } from "react";
import axios from "axios";
import { IcLogoPokemon, IcSearch } from "../assets/Icon/Icon";
import PokemonCard from "../components/PokemonCard";

const AllPokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getAllPokemon = async () => {
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon?limit=151`)
        .then((response) => {
          const { data } = response;
          const { results } = data;
          const newPokemonData = [];
          results.forEach(async (pokemon, index) => {
            // let pokemonDetails = await axios.get(`${pokemon.url}`);
            // const obj = {
            //   name: pokemonDetails.data.name,
            //   id: pokemonDetails.data.id,
            //   types: pokemonDetails.data.types,
            //   image:
            //     pokemonDetails.data.sprites.other["official-artwork"]
            //       .front_default,
            // };
            const obj = {
              id: index + 1,
              name: pokemon.name,
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                index + 1
              }.png`,
            };
            newPokemonData.push(obj);
            setPokemons(newPokemonData);
          });
        });
    };

    getAllPokemon();
  }, []);

  let typingTimeout = 0;
  const handleChange = (e) => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
      setLoading(true);
    }

    let keyword = e.target.value;

    typingTimeout = setTimeout(() => {
      setSearchQuery(keyword);
      setLoading(false);
    }, 1000);
  };

  const renderPokemonsList = () => {
    const pokemonsList = [];

    pokemons.forEach((pokemon) => {
      if (!pokemon.name.includes(searchQuery)) {
        return;
      }

      pokemonsList.push(<PokemonCard key={pokemon.id} pokemon={pokemon} />);
    });

    return pokemonsList;
  };

  return (
    <>
      <div className="flex flex-row py-5">
        <img src={IcLogoPokemon} alt="pokemon-logo" className="mr-[16px]" />
        <h1 className="font-bold text-2xl">Pokédex</h1>
      </div>
      <div className="relative mb-5 text-gray-600">
        <input
          type="search"
          name="search"
          className="border-2 border-gray-300 bg-white h-10 w-full px-5 pr-16 rounded-xl text-sm focus:outline-none"
          placeholder="Search..."
          onChange={handleChange}
        />

        <img
          className="absolute right-0 top-0 mt-3 mr-4 w-[18px]"
          src={IcSearch}
          alt="search-icon"
        />
      </div>
      <div className="flex flex-col items-center pb-10">
        {loading && <></>}
        <div className="grid sm:grid-cols-2 place-content-center lg:grid-cols-3 gap-x-20 gap-y-10">
          {/* {pokemonList.map((pokemon, index) => (
            <PokemonCard key={index} pokemon={pokemon} />
          ))} */}

          {renderPokemonsList()}
        </div>
      </div>
    </>
  );
};

export default AllPokemons;
