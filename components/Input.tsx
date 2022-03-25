import { StyleSheet, TextInput, TextInputProps, TouchableOpacity } from 'react-native';
import { Text, TextProps } from './Themed';

export function Input(props: TextInputProps) {
  return (
    <TouchableOpacity style={{height: 50}}>
      <TextInput {...props} style={[props.style, styles.input]} />
    </TouchableOpacity>

  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderRadius: 10,
    backgroundColor: 'white',
    width: 287,
    paddingHorizontal: 20
  }
});