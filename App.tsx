import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./src/style/style";


const App: React.FC = () => {
    const [pokemons, setPokemons] = useState([]);
    const [statsPokemon, setStatsPokemon] = useState([]);
    const [searchField, setSearch] = useState('');
    const [erro, setError] = useState('');

    useEffect(() => {
      fetchPokemons();
    },[])

    const fetchPokemons = () => {
      try {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=250')
        .then((response) => response.json())
        .then((pokemons) => setPokemons(pokemons.results));
      }catch (erro){
        setError('Error'+erro);
      }
    }

    const fetchImage = (id: any) => {
      try {
        fetch('https://pokeapi.co/api/v2/pokemon-form/'+id+'/')
        .then((response) => response.json())
        .then((statsPokemon) => setStatsPokemon(statsPokemon.sprites))
      }catch (erro){
        setError('Error unexpected in fetch image'+erro)
      }
    }

  return(
    <ScrollView style={styles.container}> 
      { pokemons.map((pokemon, index) =>
      <TouchableOpacity>
          <Image style={{width:100, height:100}} source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${++index}.png` }} />
        <Text>{String(pokemon.name).at(0)?.toUpperCase()+String(pokemon.name).slice(1)} {index}</Text>
        </TouchableOpacity>) }
    </ScrollView>
  );
}

export default App