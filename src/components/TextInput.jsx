import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  inputField : {
    paddingLeft: 10,
    borderColor: '#8f8f8f',
    borderWidth: 1,
    borderRadius: theme.formFields.borderRadius,
    height: theme.formFields.height,
    marginBottom: 28,
  },
  error: {
    borderColor: theme.colors.errorColor,
    marginBottom: 0
  },
});

const TextInput = ({ error, ...props }) => {
  const textInputStyle = [
    styles.inputField,
    error && styles.error,
  ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;


