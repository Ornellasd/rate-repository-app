import { Pressable, StyleSheet } from 'react-native';
import * as RootNavigation from '../utils/rootNavigation';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  button: {
    flexGrow: 1,
    marginHorizontal: 15,
    paddingHorizontal: 20,
    height: theme.formFields.height,
    borderRadius: theme.formFields.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundColorPrimary: {
    backgroundColor: theme.colors.buttonPrimary,
  },
  backgroundColorDanger: {
    backgroundColor: theme.colors.errorColor,
  },  
});

const Button = ({ text, backgroundColor, route, ...props }) => {
  const buttonStyle = [
    styles.button,
    backgroundColor === 'primary' && styles.backgroundColorPrimary,
    backgroundColor === 'danger' && styles.backgroundColorDanger,
  ];

  const handlePress = () => {
    RootNavigation.navigate(route.screen, {
      itemId: route.id,
    });
  };

  return (
    <Pressable
      onPress={handlePress}
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
