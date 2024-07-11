import React, { useRef, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { SearchContext } from '../../../context/SearchContext';

const New = () => {
  const formRef = useRef(null);
  const [stats, setStats] = useState({
    hp: 50,
    attack: 50,
    defense: 50,
    height: 1.0,
    weight: 1.0
  });

  const { searchPokemon, updateSearch } = useContext(SearchContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    const newPokemon = {
      id: data.id,
      name: data.name,
      sprites: { other: { "official-artwork": { front_default: data.img } } },
      types: [{ type: { name: data.typeOne } }, data.typeTwo ? { type: { name: data.typeTwo } } : null].filter(Boolean),
      height: stats.height,
      weight: stats.weight,
      stats: [
        { base_stat: stats.hp, stat: { name: 'HP' } },
        { base_stat: stats.attack, stat: { name: 'Attack' } },
        { base_stat: stats.defense, stat: { name: 'Defense' } }
      ],
    };
    updateSearch([...searchPokemon, newPokemon]);
    console.log(searchPokemon);
    formRef.current.reset();
  };

  const handleStatChange = (e) => {
    const { name, value } = e.target;
    setStats(prevStats => ({
      ...prevStats,
      [name]: parseFloat(value)
    }));
  };

  const typeOne = watch("typeOne");
  const typeTwo = watch("typeTwo");

  return (
    <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
      <label>ID</label>
      <input {...register("id", { min: 1303, required: true })} />
      {errors.id && (
        <p>Pokemon ID must be greater than 1302</p>
      )}

      <label>Nombre de tu Pokemon</label>
      <input
        {...register("name", {
          required: true,
          maxLength: 20,
          minLength: 3,
          pattern: /^[A-Za-z]+$/i
        })}
      />
      {errors?.name?.type === "required" && <p>This field is required</p>}
      {errors?.name?.type === "maxLength" && (
        <p>First name cannot exceed 20 characters</p>
      )}
      {errors?.name?.type === "minLength" && (
        <p>First name must exceed 3 characters</p>
      )}
      {errors?.name?.type === "pattern" && (
        <p>Alphabetical characters only</p>
      )}

      <label>Tipo Uno</label>
      <select {...register("typeOne", { required: true })}>
        <option value='' disabled>--Selecciona el tipo uno--</option>
        <option value="normal">Normal</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="electric">Electric</option>
        <option value="grass">Grass</option>
        <option value="ice">Ice</option>
        <option value="fighting">Fighting</option>
        <option value="poison">Poison</option>
        <option value="ground">Ground</option>
        <option value="flying">Flying</option>
        <option value="psychic">Psychic</option>
        <option value="bug">Bug</option>
        <option value="rock">Rock</option>
        <option value="ghost">Ghost</option>
        <option value="dragon">Dragon</option>
        <option value="dark">Dark</option>
        <option value="steel">Steel</option>
        <option value="fairy">Fairy</option>
      </select>

      <label>Tipo Dos</label>
      <select {...register("typeTwo")}>
        <option value='' disabled>--Selecciona el tipo dos--</option>
        <option value=''></option>
        <option value="normal">Normal</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="electric">Electric</option>
        <option value="grass">Grass</option>
        <option value="ice">Ice</option>
        <option value="fighting">Fighting</option>
        <option value="poison">Poison</option>
        <option value="ground">Ground</option>
        <option value="flying">Flying</option>
        <option value="psychic">Psychic</option>
        <option value="bug">Bug</option>
        <option value="rock">Rock</option>
        <option value="ghost">Ghost</option>
        <option value="dragon">Dragon</option>
        <option value="dark">Dark</option>
        <option value="steel">Steel</option>
        <option value="fairy">Fairy</option>
      </select>

      {typeOne && typeTwo && typeOne === typeTwo && <p>Both types must not be the same</p>}

      <label>Imagen URL</label>
      <input
        placeholder="Introduce la URL"
        {...register("img", {
          required: true,
          pattern: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/i
        })}
      />
      {errors?.img?.type === "required" && <p>This field is required</p>}
      {errors?.img?.type === "pattern" && (
        <p>Image must be a valid URL</p>
      )}

      <label>HP (Vida)</label>
      <input
        type="range"
        name="hp"
        min="0"
        max="100"
        value={stats.hp}
        onChange={handleStatChange}
      />
      <span>{stats.hp}</span>

      <label>Ataque</label>
      <input
        type="range"
        name="attack"
        min="0"
        max="100"
        value={stats.attack}
        onChange={handleStatChange}
      />
      <span>{stats.attack}</span>

      <label>Defensa</label>
      <input
        type="range"
        name="defense"
        min="0"
        max="100"
        value={stats.defense}
        onChange={handleStatChange}
      />
      <span>{stats.defense}</span>

      <label>Altura (m)</label>
      <input
        type="range"
        name="height"
        min="0"
        step="0.1"
        value={stats.height}
        onChange={handleStatChange}
      />
      <span>{stats.height} m</span>

      <label>Peso (kg)</label>
      <input
        type="range"
        name="weight"
        min="0"
        step="0.1"
        value={stats.weight}
        onChange={handleStatChange}
      />
      <span>{stats.weight} kg</span>

      <input type="submit" />
    </form>
  );
}

export default New;