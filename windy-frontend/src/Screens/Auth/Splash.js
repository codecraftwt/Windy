import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet, StatusBar} from 'react-native';
import {logo} from '../../Assets';

export default function SplashScreen({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 4000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#A6E3E9" />
      <Image resizeMode="contain" style={styles.logo} source={logo} />
      <Text style={styles.welcomeText}>Worry Me Not</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A6E3E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 350,
    height: 350,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 28,
    color: '#084C61',
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
  },
  tagline: {
    fontSize: 16,
    color: '#084C61',
    fontFamily: 'Montserrat-Medium',
    marginTop: 10,
    textAlign: 'center',
  },
});
