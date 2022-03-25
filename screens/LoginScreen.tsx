import { ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Text, View } from '../components/Themed';
import { Input } from '../components/Input';
import { useState } from 'react';
import { Button } from '../components/Button';
import AuthService from '../services/authService';
import { navigate } from '../navigation';
import Colors from '../constants/Colors';

export default function LoginScreen() {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [isLoading, setIsloading] = useState(false);

	const handleContinuePress = async () => {
		if (phoneNumber && phoneNumber.length >= 10) {
			setIsloading(true);
			//await AuthService.login(phoneNumber);
			setIsloading(false);

			navigate('MagicCodeVerify', {phoneNumber});
		}
	}

	return (
		<ScrollView
			keyboardShouldPersistTaps='handled'
			contentInsetAdjustmentBehavior="automatic"
			contentContainerStyle={{ flexGrow: 1 }}
		>
			<LinearGradient colors={[Colors.nearByeBlue, Colors.nearByePurple]} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={styles.container}>
				<View style={styles.spacer}>
					<Text style={styles.title}>NearBye</Text>
					<Text style={styles.titleBody}>An anonymous proximity-based social platform</Text>
				</View>
				<View style={styles.center}>
					<Input selectTextOnFocus keyboardType='phone-pad' placeholder='Phone number' value={phoneNumber} onChangeText={setPhoneNumber} maxLength={14} />
					<Button color='green' style={{ marginTop: 40 }} value='Continue' isLoading={isLoading} onPress={handleContinuePress} />
				</View>
				<View style={styles.spacer} />
			</LinearGradient>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		height: '100%'
	},
	title: {
		color: 'white',
		fontSize: 45,
		fontWeight: 'bold',
		letterSpacing: 8,
		marginTop: 80,
		fontFamily: 'Roboto'
	},
	titleBody: {
		color: 'white',
		fontSize: 16,
		marginTop: 30,
		fontFamily: 'Roboto',
		width: 300,
		textAlign: 'center',
		flex: 1
	},
	spacer: {
		minHeight: 300,
		alignItems: 'center',
		backgroundColor: 'transparent'
	},
	center: {
		flex: 1,
		backgroundColor: 'transparent',
		justifyContent: 'center'
	},
	flexChild: {
		flex: 1
	}
});