import { ActivityIndicator, Dimensions, Keyboard, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Text, View } from '../components/Themed';
import authService from '../services/authService';
import { OTP } from '../components/OTP';
import { useState } from 'react';
import { handleResponse } from '../helpers/httpResponseHelper';
import { Button } from '../components/Button';
import Colors from '../constants/Colors';
import { goBack } from '../navigation';

export default function MagicCodeVerifyScreen(props: { route: { params: {phoneNumber: string} } }) {
	const { phoneNumber } = props.route.params;
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const {width} = Dimensions.get('window');
	const verifyMagicCode = async (code: string) => {
		//Keyboard.dismiss();
		setError(null);
		setLoading(true);
		try {
		const test = await authService.verifyMagicCode(phoneNumber, code);
		} catch (err) {
			console.log(err);
		}
		// const response = await handleResponse(authService.verifyMagicCode(phoneNumber, code));
		// if (response.success) {

		// } else if (response.error) {
		// 	setError(response.error)
		// }
		setLoading(false);
	}

	const handleBackPress = () => {
		goBack();
	}

	return (
		<ScrollView
			keyboardShouldPersistTaps='handled'
			contentInsetAdjustmentBehavior="automatic"
			contentContainerStyle={{ flexGrow: 1 }}
		>
			<LinearGradient colors={[Colors.nearByeBlue, Colors.nearByePurple]} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={styles.container}>
				<View style={styles.body}>
					<View style={[styles.panel, {width: width * 0.8}]}>
						<Text style={styles.title}>NearBye</Text>
						<View style={{backgroundColor: 'transparent', flexDirection: 'row', marginBottom: 15, justifyContent: 'center'}}>
							<Text style={styles.verifyCode}>Verify your code</Text>
							{loading && !error && <ActivityIndicator size="small" color={Colors.nearByeBlue} style={{marginStart: 10}} />}
						</View>
						<OTP pinCount={5} triggerAction={verifyMagicCode} />
						{error && <ErrorBubble message={error} />}
						<Button style={{ marginTop: 40 }} value='Back' onPress={handleBackPress} />
					</View>
				</View>
			</LinearGradient>
		</ScrollView>
	);
}

type ErrorBubbleProps = {
	message: string;
}

const ErrorBubble = (props: ErrorBubbleProps) => {
	const {message} = props;
	return (
		<View style={styles.errorBubble}>
			<Text style={styles.errorText}>{message}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		height: '100%',
		padding: 20
	},
	title: {
		fontSize: 30,
		color: Colors.nearByeBlue,
		textAlign: 'center',
		marginBottom: 20,
		fontWeight: '600'
	},
	body: {
		flex: 1,
		backgroundColor: 'transparent',
		justifyContent: 'center',
	},
	panel: {
		maxWidth: 500,
		padding: 20,
		backgroundColor: 'white',
		borderRadius: 10,
		alignItems: 'center'
	},
	verifyCode: {
		fontSize: 20,
		color: Colors.nearByeBlue,
		textAlign: 'center'
	},
	errorBubble: {
		padding: 10,
		borderRadius: 5,
		backgroundColor: Colors.nearByeRed,
		marginTop: 15,
		maxWidth: 287,
		width: '100%'
	},
	errorText: {
		textAlign: 'center'
	}
});