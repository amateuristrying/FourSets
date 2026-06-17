import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image, Dimensions } from 'react-native';

const SCALE = Platform.OS === 'web' ? 1.0 : 0.82;
const s = (val: number) => val * SCALE;

interface NameScreenProps {
  name: string;
  onChangeName: (name: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function NameScreen({ name, onChangeName, onNext, onBack }: NameScreenProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      {/* Centered Image (Floating in background) */}
      <View style={styles.imageViewport} pointerEvents="none">
        <Image 
          source={require('../assets/crouching_man.png')}
          style={[
            styles.centeredImage,
            {
              transform: [
                { translateX: s(0) },
                { translateY: s(-169) },
                { scale: 1.3 }
              ]
            }
          ]}
        />
      </View>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content - Bottom Aligned */}
      <View style={styles.content}>
        <View style={styles.bottomAlignContainer}>
          <Text style={styles.title}>What should{'\n'}we call you?</Text>
          <Text style={styles.subtitle}>We'll personalize your fitness journey.</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                isFocused && styles.inputFocused
              ]}
              placeholder="Enter your name"
              placeholderTextColor="#8F8C86"
              value={name}
              onChangeText={onChangeName}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              autoCapitalize="words"
            />
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.button, !name.trim() && styles.buttonDisabled]} 
          onPress={onNext} 
          disabled={!name.trim()}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Continue</Text>
          <Text style={styles.buttonArrow}> →</Text>
        </TouchableOpacity>

        <Text style={styles.stepperText}>Personal Profile • 2 of 7</Text>

        <View style={styles.dotsContainer}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>
    </KeyboardAvoidingView>
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
    marginTop: s(32),
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
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: s(32),
  },
  bottomAlignContainer: {
    width: '100%',
  },
  title: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: s(32),
    color: '#000000',
    textAlign: 'center',
    lineHeight: s(40),
    letterSpacing: s(-0.5),
    marginBottom: s(12),
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: s(16),
    color: '#4A4A4A',
    textAlign: 'center',
    marginBottom: s(48),
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: s(4),
  },
  input: {
    width: '100%',
    height: s(56),
    borderWidth: 1.5,
    borderColor: '#DCD8D0',
    borderRadius: s(16),
    paddingHorizontal: s(16),
    fontSize: s(16),
    fontFamily: 'Inter_400Regular',
    color: '#000000',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  inputFocused: {
    borderColor: '#4E5836',
    borderWidth: 2,
    backgroundColor: '#FFFFFF',
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
  },
  buttonDisabled: {
    backgroundColor: '#9DA685',
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
  stepperText: {
    fontFamily: 'Inter_400Regular',
    fontSize: s(14),
    color: '#000000',
    marginTop: s(20),
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: s(8),
    marginTop: s(12),
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
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredImage: {
    width: s(260),
    height: s(380),
    resizeMode: 'contain',
  },
});
