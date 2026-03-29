import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import UseStatePage from './src/01-useState';
import UseEffectPage from './src/02-useEffect';

export default function App() {
  return (
    <View style={styles.container}>
      <UseStatePage />
      <UseEffectPage />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
});
