/* eslint-disable react-native/no-inline-styles */
import { Modal, View, Image, Text, Linking, TouchableOpacity } from 'react-native';
import { styles } from '../style/style';
import { useEffect, useState } from 'react';
import { Pokemon } from '../type/Pokemon';
import { SpeciesInfo } from '../type/SpeciesInfo';

type ModalProps = {
    visibility: boolean;
    pokemonSelected: number;
    changeVisibility?: () => void;
}


const PokemonInfo:React.FC<ModalProps> = (props) => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [pokemonColor, setPokemonColor] = useState<SpeciesInfo | null>(null);

    useEffect(() => {
            console.log(props.pokemonSelected + `https://pokeapi.co/api/v2/pokemon/${props.pokemonSelected}/`);
            fetchPokemon();
            getColor();
            

    },[props.pokemonSelected]);

    const fetchPokemon = () => {
          try {
            console.log('Fetching the pokemon');
            fetch(`https://pokeapi.co/api/v2/pokemon/${props.pokemonSelected}/`)
            .then((response) => response.json())
            .then((statsPokemon) => setPokemon({
                name: statsPokemon.name,
                weight: statsPokemon.weight / 10,
                height : statsPokemon.height / 10,
                base_experience: statsPokemon.base_experience,
                Abilities: statsPokemon.abilities.map((ability:any) => ({
                    ability: {
                        name: ability.ability.name,
                        url: ability.ability.url,
                    },
                })),
                Type: statsPokemon.types.map((typesPoke:any) => ({
                    type: {
                        name: typesPoke.type.name,
                    },
                })),
            }));
          }catch (erro){
            console.log('Something goes wrong' + erro);
          }
        };

        const getColor = () => {
            try{
                console.log("Getting the pokemon's color");
                fetch(`https://pokeapi.co/api/v2/pokemon-species/${props.pokemonSelected}/`)
                .then((response) => response.json())
                .then((colorPokemon) => setPokemonColor({
                    color:{
                        name: colorPokemon.color.name,
                        url: colorPokemon.color.url,
                    },
                }));
                console.log(pokemonColor);
            }
            catch(error)
            {
                console.log("Something goes wrong while trying to get the pokemon's color " + error);
            }
        } 


    return(
        <Modal visible={props.visibility}>
            <View style={[styles.modalPokemonInfo, {backgroundColor:String(pokemonColor?.color.name)}]}>
                <View style={[styles.headerContainer]}>
                    <TouchableOpacity style={[styles.buttonClose, styles.shadow]} onPress={props.changeVisibility}>
                        <Text style={{color:'white'}}>X</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Image style={{width:150, height:150}} source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.pokemonSelected}.png`}} />
                    <Text style={styles.textStyle}>{pokemon?.name.at(0)?.toUpperCase() + String(pokemon?.name).slice(1)}</Text>
                    <Text style={styles.textStyle}>Weight: {pokemon?.weight}</Text>
                    <Text style={styles.textStyle}>Height: {pokemon?.height}</Text>
                    <Text style={styles.textStyle}>Base Experience: {pokemon?.base_experience} BXP</Text>
                    {pokemon?.Abilities.map((ability, index) => (
                        <Text style={styles.textStyle} key={index}>Ability's: {ability.ability.name} </Text>
                    ))}
                    {pokemon?.Type.map((types, index) => (
                        <Text style={styles.textStyle} key={index}>Tipo: {types.type.name} </Text>
                    ))}  
                </View>
            </View>
        </Modal>
    );
};

export default PokemonInfo;
