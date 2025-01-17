import React from 'react';
import { StatusBar } from 'react-native';

import Navigation from './src/Navigations/Navigations';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
export default function App() {
  return (
    <PaperProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
          <Navigation />
        </NavigationContainer>
      </PaperProvider>
  );
}

