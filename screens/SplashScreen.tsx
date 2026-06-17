import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.logoText, { opacity: fadeAnim }]}>
        FourSets
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 58,
    color: '#000000',
    letterSpacing: -1.5,
  },
});
