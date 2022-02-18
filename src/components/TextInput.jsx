import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  inputField : {
    paddingLeft: 10,
    borderColor: '#8f8f8f',
    borderWidth: 1,
    borderRadius: theme.formFields.borderRadius,
    height: theme.formFields.height,
  },
  error: {
    borderColor: theme.colors.errorColor,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
    styles.inputField,
    error && styles.error,
  ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;


