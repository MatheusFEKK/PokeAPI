/* eslint-disable react/self-closing-comp */
import React, { act, useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, useAnimatedValue, Animated, Linking, PermissionsAndroid } from 'react-native';
import { styles } from '../style/style';
import { Pokemon } from '../type/Pokemon';
import PokemonInfo from '../components/PokemonInfo';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';

export const Home: React.FC = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [statsPokemon, setStatsPokemon] = useState([]);
    const [searchField, setSearch] = useState('');
    const [erro, setError] = useState('');
    const [visible, setVisible] = useState(false);

    const [animationRunning, setAnimation] = useState(true);
    const [pokemonSelected, setPokemonSelect] = useState(0);

    const [URLApp, setURL] = useState<string | null>(null);
    const [loading, setLoad] = useState(true);

    const positionRedSide      = useAnimatedValue(0);
    const positionWhiteSide    = useAnimatedValue(-700);

    const [ activeCamera, setCamera ] = useState(false);
    const devices = useCameraDevice('back')!;
    const { hasPermission, requestPermission } = useCameraPermission();

    const codeScanner = useCodeScanner({
        codeTypes: ['qr'],
        onCodeScanned: (codes) => {
          console.log(codes);
          for (const code of codes)
          {
            const valueCode = code.value;
            const route = valueCode?.toString().replace('pokeapi://', '');
              setPokemonSelect(Number(route));
              setVisible(true);
              setCamera(false);
              console.log(route);
          }
      },
    });

    const AnimationOnLoad = () => {
      if (animationRunning === true)
      {
        Animated.parallel([
         Animated.timing(positionRedSide, {
                           toValue:-400,
                           duration:1500,
                           useNativeDriver:false,
                         }),
                         Animated.timing(positionWhiteSide, {
                           toValue:-1200,
                           duration:1500,
                           useNativeDriver:false,
                         }),
                       ]).start();
      }else {
        positionRedSide.stopAnimation();
        positionWhiteSide.stopAnimation();
        console.log('Stopped the animation!');
      }
    };


    useEffect(() => {
      AnimationOnLoad();
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
        .then((pokemons) => {setPokemons(pokemons.results); setAnimation(false)});
      }catch (erro){
        setError('Error' + erro);
      }
    };

    Linking.addEventListener('url', ({url}) => {
      console.log('Link received, loading...');
       if (url != null){
        const route = url.replace('pokeapi://', '');
        console.log(route);
        if (loading === false){
          setPokemonSelect(Number(route));
          setVisible(true);
        }
      }
    });

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

    if (hasPermission === false)
    {
        return(
            <View style={[styles.container, styles.alignItemsCenter, styles.justifyContentCenter]}>
                <TouchableOpacity style={styles.buttonRed} onPress={() => requestPermission()}>
                    <Text style={[styles.textWhite, styles.fontBold]}>Permitir camera</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (devices == null)
    {
        return(
            <View>
                <Text>No device</Text>
            </View>
        );
    }
  if (activeCamera === true)
  {
    return(
        <View style={[styles.container]}>
            <Camera style={[styles.container]} device={devices} isActive={activeCamera} codeScanner={codeScanner} />
            <TouchableOpacity style={styles.buttonBackFromCamera} onPress={() => setCamera(false)}>
              <Text>X</Text>
            </TouchableOpacity>
        </View>
    );
  }

  return(
    <ScrollView style={styles.container}>
    {animationRunning ? (
       <View style={[styles.container, styles.alignItemsCenter, styles.justifyContentCenter]}>

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
      <View style={{width:'100%', padding:10}}>

        <TouchableOpacity style={{alignSelf:'flex-end'}} onPress={() => setCamera(true)}>
          <Image source={require('../images/cameraIcon.png')} />
        </TouchableOpacity>

        </View>
      <PokemonInfo visibility={visible} changeVisibility={() => setVisible(false)} pokemonSelected={pokemonSelected}/>
    { pokemons.map((pokemon, index) =>
      <TouchableOpacity style={styles.pokemonBlock} onPress={() => {setVisible(true); setPokemonSelect(index);}} key={index}>
        <Image style={{width:150, height:150}} source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${++index}.png`}} />

      <Text>{String(pokemon.name).at(0)?.toUpperCase() + String(pokemon.name).slice(1)} {index}</Text>
      </TouchableOpacity>
    )}
    </View>
  }
  </ScrollView>
  );};
