import React, { useEffect, useState } from "react";
import axios from "axios";
import colorFromType from "../utils/colorFromType";
import numberPad from "../utils/numberPad";
import { IcPokeball } from "../assets/Icon/Icon";

const PokemonCard = (props) => {
  const [pokemon, setPokemon] = useState([]);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingImage, setLoadingImage] = useState(true);
  const [loadingType, setLoadingType] = useState(true);

  useEffect(() => {
    const getPokemon = async () => {
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${props.pokemon.id}/`)
        .then((response) => {
          const { data } = response;
          setType(data.types[0].type.name);
          setPokemon(data);
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getPokemon();
    setLoadingType(false);
    setLoading(false);
  }, [props.pokemon.id]);

  return loading ? (
    <></>
  ) : (
    <div
      className="flex flex-col overflow-hidden  rounded-xl bg-white shadow-md duration-200 hover:scale-105 hover:shadow-xl relative"
      style={{
        border: `2px solid ${colorFromType(type)}`,
      }}
    >
      <div className="pt-3 pr-3 text-right">
        <span
          className="text-right font-bold"
          style={{ color: `${colorFromType(type)}` }}
        >
          #{numberPad(props.pokemon.id, 3)}
        </span>
      </div>
      {/* {loadingImage ? <h1>Loading</h1> : null} */}
      <div
        className="w-[19em] sm:w-[15em] lg:w-[15em] xl:w-[20em] 
                   h-[15em] sm:h-[12em] lg:h-[11em] xl:h-[15em] 
                   relative flex justify-center"
      >
        <img
          onLoad={() => {
            setLoadingImage(false);
          }}
          src={props.pokemon.image}
          className="w-1/2 md:w-1/1 self-center my-5 z-10"
          alt="pokemon-image"
        />
        <img
          src={IcPokeball}
          className="text-center self-center my-auto absolute z-0 top-0 mt-5 sm:mt-2 w-[65%]"
          alt="pokeball"
        />
      </div>
      <div
        className="p-3 z-10"
        style={{ background: `${colorFromType(type)}` }}
      >
        <h3 className=" text-lg lg:text-xl font-semibold capitalize text-slate-50">
          {props.pokemon.name}
        </h3>
      </div>
    </div>
  );
};

export default PokemonCard;
