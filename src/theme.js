import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    title: '#fff',
    buttonPrimary: '#0275d8',
    errorColor: '#d73a4a',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System'
    })
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  formFields: {
    borderRadius: 3,
    height: 50,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
};

export default theme;