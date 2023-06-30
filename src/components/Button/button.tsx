import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";
import { Theme } from "../../shared/theme";
import AnimatedLottieView from "lottie-react-native";
import animation from "../../assets/button-load.json";

export interface ButtonProps extends ViewProps {
  text: string;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  loading?: boolean;
  disabled?: boolean;
}
export const Button = (props: ButtonProps) => {
  const { text, style, loading = false, disabled = false, onPress } = props;
  return disabled ? (
    <View style={[style, styles.container, styles.disabled]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  ) : (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} disabled={disabled}>
      <View style={[style, styles.container]}>
        {loading ? (
          <AnimatedLottieView source={animation} loop={true} autoPlay={true} />
        ) : (
          <Text style={styles.text}>{text}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.color.purple,
    height: Theme.input.height,
    borderRadius: Theme.padding.P8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: Theme.padding.P2,
  },
  text: {
    color: Theme.color.white,
    fontSize: Theme.fontSize.medium,
  },
  disabled: {
    backgroundColor: Theme.color.prupleDisabled,
  },
});
