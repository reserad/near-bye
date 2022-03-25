
import { ActivityIndicator, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import Colors from '../constants/Colors';

type ButtonProps = {
	color?: 'green' | 'neutral'
	style: StyleProp<ViewStyle>
	value?: string;
	outline?: boolean;
	isLoading?: boolean;
	onPress: () => void;
}

export const Button: React.FC<ButtonProps> = (props) => {
	const { color = 'neutral', style, value, outline, children, isLoading, onPress } = props;

	let buttonStyles: any[] = [];
	switch(color) {
		case 'green':
			buttonStyles.push(styles.buttonGreenSolid);
			if (outline) {
				buttonStyles.push(styles.buttonGreenOutline);
			}
			break;
		case 'neutral':
		default:
			buttonStyles.push(styles.buttonSolid);
			if (outline) {
				buttonStyles.push(styles.buttonOutline);
			}
	}

	return (
		<TouchableOpacity style={[style, styles.button].concat(...buttonStyles)} onPress={onPress}>
			{value &&
				<View style={styles.valueContainer}>
					{isLoading && <ActivityIndicator size="small" color="white" />}
					{!isLoading && <Text style={outline ? styles.buttonOutlineText : styles.buttonSolidText}>{value}</Text>}
				</View>
			}
			{!value && children && { children }}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		height: 50,
		borderRadius: 10,
		width: 287,
		paddingHorizontal: 20,
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonGreenSolid: {
		backgroundColor: Colors.nearByeGreen
	},
	buttonGreenOutline: {
		borderColor: Colors.nearByeGreen,
		borderWidth: 2
	},
	buttonSolid: {
		backgroundColor: Colors.nearByeBlue
	},
	buttonOutline: {
		borderColor: Colors.nearByeGreen,
		borderWidth: 2
	},
	buttonSolidText: {
		color: 'white',
		fontWeight: 'bold'
	},
	buttonOutlineText: {
		color: 'white',
		fontWeight: 'bold'
	},
	valueContainer: {
		alignItems: 'center',
		flexDirection: 'row'
	},
	loadingIndicator: {
		marginEnd: 20
	}
});