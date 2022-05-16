import { Pressable, StyleSheet } from 'react-native';
import * as RootNavigation from '../utils/rootNavigation';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  button: {
    height: theme.formFields.height,
    borderRadius: theme.formFields.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  halfButton: {
    flexGrow: 1,
    marginHorizontal: 10,
  },
  backgroundColorPrimary: {
    backgroundColor: theme.colors.buttonPrimary,
  },
  backgroundColorDanger: {
    backgroundColor: theme.colors.errorColor,
  },  
});

const Button = ({ text, backgroundColor, halfButton, route, style, ...props }) => {
  const buttonStyle = [
    backgroundColor === 'primary' && styles.backgroundColorPrimary,
    backgroundColor === 'danger' && styles.backgroundColorDanger,
    halfButton && styles.halfButton,
    styles.button,
    style,
  ];

  const handlePress = () => {
    RootNavigation.navigate(route.screen, {
      itemId: route.id,
    });
  };

  return (
    <Pressable
      onPress={route && handlePress}
      style={({ pressed }) => [
        buttonStyle,
        { opacity: pressed ? 0.5 : 1},
      ]}
      {...props}

    >
      <Text color="title" fontWeight="bold" fontSize="subheading">
        {text}
      </Text>
    </Pressable>
  );
};

export default Button;
