import { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, TextInput, View } from "react-native";

type OTPProps = {
    pinCount: number;
    triggerAction: (code: string) => Promise<void>;
};

export const OTP = (props: OTPProps) => {
    const input = useRef<TextInput | null>(null);
    const {pinCount, triggerAction} = props;
    const [otpValue, setOtpValue] = useState<string[]>(new Array(pinCount).fill(""));
    const [nextInputIndex, setNextInputIndex] = useState(0);

    const handleChangeText = async (text: string, index: number) => {
        const newOtpValue = [...otpValue];
        newOtpValue[index] = text;
        setOtpValue(newOtpValue);

        const lastInputIndex = pinCount - 1;
        let newInputIndex = 0;
        if (!text) {
            newInputIndex = index === 0 ? 0 : index-1;
        } else {
            newInputIndex = index === lastInputIndex ? lastInputIndex : index + 1;
            if (index+1 === pinCount && newOtpValue.filter(v => v === '').length === 0) {
                const code = newOtpValue.join("");
                if (code) {
                    console.log('hit');
                    // setOtpValue(new Array(pinCount).fill(""));
                    await triggerAction(code);
                }
            }
        }
        
        setNextInputIndex(newInputIndex);
    }

    useEffect(() => {
        if (input.current) {
            input.current!.focus();
        }
    }, [nextInputIndex]);
    
    return (
        <KeyboardAvoidingView style={{alignItems: 'center',}}>
            <View style={{flexDirection: 'row'}}>
                <>
                    {Array(pinCount).fill("").map((_, index) => {
                        const focused = nextInputIndex === index;
                        return (
                            <View key={index} style={focused ? styles.SingleOTPElementFocused : styles.SingleOTPElement }>
                                <TextInput
                                    ref={nextInputIndex === index ? input : null}
                                    keyboardType="numeric"
                                    textContentType="oneTimeCode"
                                    onChangeText={text => handleChangeText(text, index)}
                                    placeholder="0"
                                    maxLength={1}
                                    style={styles.input}
                                    autoFocus={nextInputIndex === 0}
                                />
                        </View>
                        );
                    })}
                </>
            </View>
                
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
	SingleOTPElement: {
        height: 50,
        width: 50,
        marginHorizontal: 5,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#0086A4'
	},
    SingleOTPElementFocused: {
        height: 50,
        width: 50,
        marginHorizontal: 5,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#240071'
	},
    input: {
        flex: 1,
        textAlign: 'center'
    }
});