import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';

const { width: winWidth, height: winHeight, scale: winScale } = Dimensions.get('window');

const SCALE = Platform.OS === 'web' ? 1.0 : 0.82;
const s = (val: number) => val * SCALE;

interface WelcomeScreenProps {
  onNext: () => void;
  onBack?: () => void;
}

export default function WelcomeScreen({ onNext, onBack }: WelcomeScreenProps) {
  return (
    <View style={styles.container}>

      {/* Centered Image (Floating in background) */}
      <View style={styles.imageViewport} pointerEvents="none">
        <Image 
          source={require('../assets/sitting_man.png')}
          style={[
            styles.centeredImage,
            {
              transform: [
                { translateX: s(1) },
                { translateY: s(-119) },
                { scale: 1.8 }
              ]
            }
          ]}
        />
      </View>

      {/* Top Header Logo & Back Button */}
      <View style={[styles.header, !onBack && { justifyContent: 'flex-start' }]}>
        {onBack && (
          <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.headerLogo}>FourSets</Text>
      </View>

      {/* Main Content Area - Bottom Aligned */}
      <View style={styles.content}>
        <Text style={styles.mainTitle}>FourSets</Text>
        <Text style={styles.tagline}>Every Physique{'\n'}Tells a Story.</Text>
        <Text style={styles.subtext}>Let's build yours.</Text>
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <Text style={{ fontSize: s(10), color: '#8F8C86', marginBottom: s(8), fontFamily: 'Inter_400Regular' }}>
          Screen: {winWidth.toFixed(0)} x {winHeight.toFixed(0)} | Scale: {winScale.toFixed(3)}
        </Text>
        <TouchableOpacity style={styles.button} onPress={onNext} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Continue</Text>
          <Text style={styles.buttonArrow}> →</Text>
        </TouchableOpacity>

        {/* Dots indicator - 7 dots */}
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF6F0',
    justifyContent: 'space-between',
    paddingHorizontal: s(24),
  },
  header: {
    height: s(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: s(20),
  },
  backButton: {
    width: s(40),
    height: s(40),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backArrow: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: s(22),
    color: '#000000',
  },
  headerLogo: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: s(20),
    color: '#000000',
    letterSpacing: s(-0.5),
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingBottom: s(36),
  },
  mainTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: s(58),
    color: '#000000',
    marginBottom: s(20),
    letterSpacing: s(-1.5),
    textAlign: 'left',
  },
  tagline: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: s(32),
    color: '#000000',
    textAlign: 'left',
    lineHeight: s(40),
    letterSpacing: s(-0.5),
  },
  subtext: {
    fontFamily: 'Inter_400Regular',
    fontSize: s(16),
    color: '#4A4A4A',
    marginTop: s(20),
    textAlign: 'left',
  },
  footer: {
    paddingBottom: s(24),
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4E5836',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: s(56),
    borderRadius: s(16),
    shadowColor: '#4E5836',
    shadowOffset: { width: 0, height: s(4) },
    shadowOpacity: 0.15,
    shadowRadius: s(8),
    // @ts-ignore
    boxShadow: `0 ${s(4)}px ${s(10)}px rgba(78, 88, 54, 0.2)`,
  },
  buttonText: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: s(18),
    color: '#FAF6F0',
  },
  buttonArrow: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: s(18),
    color: '#FAF6F0',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: s(8),
    marginTop: s(24),
  },
  dot: {
    width: s(8),
    height: s(8),
    borderRadius: s(4),
    backgroundColor: '#DCD8D0',
  },
  dotActive: {
    backgroundColor: '#4E5836',
  },
  imageViewport: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredImage: {
    width: s(260),
    height: s(380),
    resizeMode: 'contain',
  },
});
