/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-catch-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, useAnimatedValue, Animated, Linking } from 'react-native';
import { styles } from './src/style/style';
import { Pokemon } from './src/type/Pokemon';
import PokemonInfo from './src/components/PokemonInfo';

const App: React.FC = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [statsPokemon, setStatsPokemon] = useState([]);
    const [searchField, setSearch] = useState('');
    const [erro, setError] = useState('');
    const [visible, setVisible] = useState(false);

    const [animationRunning, setAnimation] = useState(true);
    const [pokemonSelected, setPokemonSelect] = useState(0);

    // const [SpritePokemon, setSprite] = useState(0);
    const [URLApp, setURL] = useState<string | null>(null);
    const [loading, setLoad] = useState(true);

    const positionRedSide      = useAnimatedValue(-400);
    const positionWhiteSide    = useAnimatedValue(-1500);


    useEffect(() => {
      Animated.parallel([
        Animated.timing(positionRedSide, {
                          toValue:0,
                          duration:1500,
                          useNativeDriver:false,
                        }),
                        Animated.timing(positionWhiteSide, {
                          toValue:-700,
                          duration:1500,
                          useNativeDriver:false,
                        }),
                      ]).start(({finished}) => {
                        setAnimation(false);
                      });
                      fetchPokemons();

    },[]);

    useEffect(() => {
      console.log('Loading detected');
      if (visible === true){
        setVisible(false);
        deepURL();
      }else
      {
        deepURL();
      }
    },[loading]);

    const fetchPokemons = () => {
      try {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=50')
        .then((response) => response.json())
        .then((pokemons) => setPokemons(pokemons.results));
      }catch (erro){
        setError('Error' + erro);
      }
    };

    const deepURL = async () =>{
      console.log('Called the Function that returns the URL custom');
      const URL = await Linking.getInitialURL()
      .then((response) => {setURL(response); setLoad(false);});
      if (URLApp != null){
        const route = URLApp.replace('pokeapi://', '');
        console.log(route);
        if (loading === false){
          setPokemonSelect(Number(route));
          setVisible(true);
        }
      }
      console.log(URLApp);
    };

    // let index = 0;

    /* function getSprites(id:number)
    {
      const SpritesPokemon:Array<string> = new Array(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${id}.png`);

      setInterval(() => {
        setSprite(SpritesPokemon[index]);
        index = (index + 1) % SpritesPokemon.length;
        console.log('Image changed');
      }, 5000);

    }
      */



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
      <PokemonInfo visibility={visible} changeVisibility={() => setVisible(false)} pokemonSelected={pokemonSelected}/>
    { pokemons.map((pokemon, index) =>
    <TouchableOpacity style={styles.pokemonBlock} onPress={() => {setVisible(true); setPokemonSelect(index);}}>
      <Image style={{width:150, height:150}} source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${++index}.png`}} />
      <Text>{String(pokemon.name).at(0)?.toUpperCase() + String(pokemon.name).slice(1)} {index}</Text>
      </TouchableOpacity>) }
    </View>
  }
  </ScrollView>
  );
};

export default App;
