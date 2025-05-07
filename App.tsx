import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./src/style/style";
import PokemonInfo from "./src/components/PokemonInfo";
import { PokemonType } from "./src/type/Pokemon";

const App: React.FC = () => {
    const [pokemons, setPokemons] = useState<PokemonType[]>([]);
    const [statsPokemon, setStatsPokemon] = useState([]);
    const [searchField, setSearch] = useState('');
    const [erro, setError] = useState('');
    const [visible, setVisible] = useState(false);

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
    <PokemonInfo visibility={visible} />
      <View style={styles.pokemonsView}>
        { pokemons.map((pokemon, index) =>
        <TouchableOpacity style={styles.pokemonBlock} onPress={() => setVisible(true)}>
            <Image style={{width:150, height:160}} source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${++index}.png` }} />
          <Text>{String(pokemon.name).at(0)?.toUpperCase()+String(pokemon.name).slice(1)} {index}</Text>
          </TouchableOpacity>) }
        </View>
    </ScrollView>
  );
}

export default App