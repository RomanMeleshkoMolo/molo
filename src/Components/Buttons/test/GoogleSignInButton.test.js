import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import GoogleSignInButton from 'Components/Buttons/GoogleSignInButton';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { Alert } from 'react-native';

jest.mock('@react-native-google-signin/google-signin');
jest.mock('@react-native-async-storage/async-storage');

// Мокирование Alert
jest.spyOn(Alert, 'alert');

// Мокирование useNavigation
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      reset: jest.fn(),
    }),
  };
});

test('handles successful sign-in', async () => {
  GoogleSignin.signIn.mockResolvedValueOnce({ type: 'success', data: { idToken: 'token', user: { name: 'Test User' } } });

  const { getByText } = render(
    <NavigationContainer>
      <GoogleSignInButton />
    </NavigationContainer>
  );

  const button = getByText('Продолжить c Google');
  fireEvent.press(button);

  await waitFor(() => {
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('registrationUserGoogleState', 'true');
  });
});

test('handles sign-in cancellation', async () => {
  GoogleSignin.signIn.mockRejectedValueOnce({ code: 'SIGN_IN_CANCELLED' });

  const { getByText } = render(
    <NavigationContainer>
      <GoogleSignInButton />
    </NavigationContainer>
  );

  const button = getByText('Продолжить c Google');
  fireEvent.press(button);

  await waitFor(() => {
    expect(Alert.alert).toHaveBeenCalledWith('Cancelled', 'User cancelled the login flow');
  });
});

