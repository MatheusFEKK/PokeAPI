import { Animated, Modal, useAnimatedValue, View, Text } from "react-native";
import { styles } from "../style/style";
import { useEffect, useState } from "react";

type ModalProps = {
    visibility: boolean;
    changeVisibility?: () => void;
}


const PokemonInfo:React.FC<ModalProps> = (props) => {
    

    useEffect(() => {
        
    },[])

    return(
        <Modal style={styles.modalPokemonInfo} visible={props.visibility}>
            
                    
                        
        </Modal>
    );
}

export default PokemonInfo;