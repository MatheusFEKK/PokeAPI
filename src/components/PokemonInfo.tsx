import { Animated, Modal, View } from "react-native";
import { styles } from "../style/style";

type ModalProps = {
    visibility: boolean;
    changeVisibility?: () => void;
}


const PokemonInfo:React.FC<ModalProps> = (props) => {
    return(
        <Modal style={styles.modalPokemonInfo} visible={props.visibility}>
            <Animated.View style={styles.Block1}>
                <View style={styles.Circle1}>
                    <View style={styles.CircleInside}>
                        <View style={styles.CircleInsideCircle}>
                        </View>
                    </View>
                </View>
            </Animated.View>

            <Animated.View style={styles.Block2}>
                <View style={styles.Circle2}>
                    <View style={styles.CircleInside2}>
                        <View style={styles.CircleInsideCircle2}>
                        </View>
                    </View>
                </View>
            </Animated.View>
        </Modal>
    );
}

export default PokemonInfo;