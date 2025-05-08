import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Image, useAnimatedValue, Animated } from "react-native";
import { styles } from "./src/style/style";
import { PokemonType } from "./src/type/Pokemon";

const App: React.FC = () => {
    const [pokemons, setPokemons] = useState<PokemonType[]>([]);
    const [statsPokemon, setStatsPokemon] = useState([]);
    const [searchField, setSearch] = useState('');
    const [erro, setError] = useState('');
    const [visible, setVisible] = useState(false);

    const [animationRunning, setAnimation] = useState(true);
    const [spritePokemon, setSprite] = useState('');

    const positionRedSide      = useAnimatedValue(-400);
    const positionWhiteSide    = useAnimatedValue(-1500);

    useEffect(() => {;
                  Animated.parallel([
                      Animated.timing(positionRedSide, {
                          toValue:0,
                          duration:1500,
                          useNativeDriver:false
                      }),
                      Animated.timing(positionWhiteSide, {
                          toValue:-700,
                          duration:1500,
                          useNativeDriver:false
                      }),
                  ]).start(({finished}) => {
                      setAnimation(false);
                  });

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

const getSprites = (id: any) => {
  console.log(id);
}

    setInterval(() => {
      
    }, 250);

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
    {animationRunning ? (
       <View style={{flex:1}}>

       <Animated.View style={[styles.Block1, {position:'absolute', top:positionRedSide}]}>
               <View style={styles.Circle1}>
                   <View style={styles.CircleInside}>
                       <View style={styles.CircleInsideCircle}>
                       </View>
                   </View>
               </View>
           </Animated.View>
       

       
           <Animated.View style={[styles.Block2, {position:'absolute', bottom:positionWhiteSide}]}>
               <View style={styles.Circle2}>
                   <View style={styles.CircleInside2}>
                       <View style={styles.CircleInsideCircle2}>
                       </View>
                   </View>
               </View>
           </Animated.View>

       </View>
    ) : <View style={styles.pokemonsView}>
    { pokemons.map((pokemon, index) =>
    <TouchableOpacity style={styles.pokemonBlock} onPress={() => setVisible(true)}>
        <Image onLoad={() => getSprites(index)} style={{width:150, height:160}} source={{uri: spritePokemon }} />
      <Text>{String(pokemon.name).at(0)?.toUpperCase()+String(pokemon.name).slice(1)} {index}</Text>
      </TouchableOpacity>) }
    </View>
  }
  </ScrollView>
  );
}

export default App