import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignInContainer from '../components/SignIn';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button

      const { getByPlaceHolderText } = render(<SignInContainer signIn={signInData} />);
      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
      });
    });
  });
});