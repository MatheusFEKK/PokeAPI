/* eslint-disable react-native/no-inline-styles */
import { Modal, View, Image, Text, Linking, TouchableOpacity } from 'react-native';
import { styles } from '../style/style';
import { useEffect, useState } from 'react';
import { Pokemon } from '../type/Pokemon';

type ModalProps = {
    visibility: boolean;
    pokemonSelected: number;
    changeVisibility?: () => void;
}


const PokemonInfo:React.FC<ModalProps> = (props) => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);

    useEffect(() => {

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
            console.log(props.pokemonSelected + `https://pokeapi.co/api/v2/pokemon/${props.pokemonSelected}/`);
            fetchPokemon();

    },[props.pokemonSelected]);

    return(
        <Modal visible={props.visibility}>
            <View style={styles.modalPokemonInfo}>
                <Image style={{width:150, height:150}} source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.pokemonSelected}.png`}} />
                <Text style={styles.textStyle}>{pokemon?.name.at(0)?.toUpperCase() + String(pokemon?.name).slice(1)}</Text>
                <Text style={styles.textStyle}>{pokemon?.weight}</Text>
                <Text style={styles.textStyle}>{pokemon?.height}</Text>
                <Text style={styles.textStyle}>{pokemon?.base_experience} BXP</Text>
                {pokemon?.Abilities.map((ability, index) => (
                    <Text style={styles.textStyle}>Habilidade {index}: {ability.ability.name} </Text>
                ))}

                {pokemon?.Type.map((types, index) => (
                    <Text style={styles.textStyle}>Tipo {index}: {types.type.name} </Text>
                ))}
                <TouchableOpacity onPress={props.changeVisibility}>
                    <Text>X</Text>
                </TouchableOpacity>
            </View>

        </Modal>
    );
};

export default PokemonInfo;
