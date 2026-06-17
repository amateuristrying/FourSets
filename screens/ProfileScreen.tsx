import React, { useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, PanResponder, Platform } from 'react-native';

const SCALE = Platform.OS === 'web' ? 1.0 : 0.82;
const s = (val: number) => val * SCALE;

interface AgeSliderProps {
  value: number;
  min: number;
  max: number;
  onChange: (val: number) => void;
}

const AgeSlider = ({ value, min, max, onChange }: AgeSliderProps) => {
  const trackWidthRef = useRef(0);
  const startValueRef = useRef(value);

  // Keep value ref in sync during render so it is fresh inside callbacks
  const valueRef = useRef(value);
  valueRef.current = value;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        if (trackWidthRef.current <= 0) return;
        
        // Record starting value
        const initialVal = valueRef.current;
        startValueRef.current = initialVal;
        
        // Handle immediate tap change
        const x = evt.nativeEvent.locationX;
        const progress = Math.min(Math.max(x / trackWidthRef.current, 0), 1);
        const tapVal = min + progress * (max - min);
        startValueRef.current = tapVal;
        onChange(Math.round(tapVal));
      },
      onPanResponderMove: (evt, gestureState) => {
        if (trackWidthRef.current <= 0) return;
        
        // Calculate incremental change relative to initial touch point
        const deltaProgress = gestureState.dx / trackWidthRef.current;
        const startProgress = (startValueRef.current - min) / (max - min);
        const newProgress = Math.min(Math.max(startProgress + deltaProgress, 0), 1);
        onChange(Math.round(min + newProgress * (max - min)));
      },
    })
  ).current;

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <View 
      style={styles.ageSliderContainer}
      onLayout={(evt) => {
        trackWidthRef.current = evt.nativeEvent.layout.width;
      }}
      {...panResponder.panHandlers}
    >
      <View style={styles.ageSliderTrack} pointerEvents="none" />
      <View style={[styles.ageSliderTrackActive, { width: `${percentage}%` }]} pointerEvents="none" />
      <View style={[styles.ageSliderKnob, { left: `${percentage}%` }]} pointerEvents="none" />
    </View>
  );
};

interface ProfileScreenProps {
  age: number;
  sex: 'Male' | 'Female' | 'Other' | null;
  onChangeAge: (age: number) => void;
  onChangeSex: (sex: 'Male' | 'Female' | 'Other') => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ProfileScreen({
  age,
  sex,
  onChangeAge,
  onChangeSex,
  onNext,
  onBack,
}: ProfileScreenProps) {
  return (
    <View style={styles.container}>
      {/* Centered Image (Floating in background) */}
      <View style={styles.imageViewport} pointerEvents="none">
        <Image 
          source={require('../assets/sprinter_man.png')}
          style={[
            styles.centeredImage,
            {
              transform: [
                { translateX: s(0) },
                { translateY: s(-200) },
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
          <Text style={styles.title}>Tell us about{'\n'}yourself.</Text>
          <Text style={styles.subtitle}>We'll use this to personalize your fitness plan.</Text>

          {/* Combined Inputs Row (Sex and Age) */}
          <View style={styles.inputsRow}>
            {/* Sex Column */}
            <View style={styles.columnSex}>
              <Text style={styles.label}>Sex</Text>
              <View style={styles.sexButtonsContainer}>
                <TouchableOpacity
                  style={[styles.sexButton, sex === 'Male' && styles.sexButtonActive]}
                  onPress={() => onChangeSex('Male')}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.sexButtonText, sex === 'Male' && styles.sexButtonTextActive]}>
                    Male
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.sexButton, sex === 'Female' && styles.sexButtonActive]}
                  onPress={() => onChangeSex('Female')}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.sexButtonText, sex === 'Female' && styles.sexButtonTextActive]}>
                    Female
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Age Column */}
            <View style={styles.columnAge}>
              <Text style={styles.label}>Age: <Text style={styles.ageValue}>{age}</Text></Text>
              <View style={styles.ageSliderWrapper}>
                <AgeSlider value={age} min={12} max={80} onChange={onChangeAge} />
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={onNext} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Continue</Text>
          <Text style={styles.buttonArrow}> →</Text>
        </TouchableOpacity>

        <Text style={styles.stepperText}>Personal Profile • 3 of 7</Text>

        <View style={styles.dotsContainer}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
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
    marginBottom: s(36),
  },
  label: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: s(16),
    color: '#000000',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: s(4),
    marginBottom: s(40),
  },
  columnSex: {
    width: '46%',
  },
  columnAge: {
    width: '46%',
  },
  sexButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: s(8),
    marginTop: s(12),
  },
  sexButton: {
    flex: 1,
    height: s(48),
    borderRadius: s(12),
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderColor: '#DCD8D0',
  },
  sexButtonActive: {
    backgroundColor: '#4E5836',
    borderColor: '#4E5836',
  },
  sexButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: s(14),
    color: '#000000',
  },
  sexButtonTextActive: {
    color: '#FAF6F0',
  },
  ageSliderWrapper: {
    marginTop: s(18),
    height: s(30),
    justifyContent: 'center',
  },
  ageSliderContainer: {
    width: '100%',
    height: s(20),
    justifyContent: 'center',
    position: 'relative',
  },
  ageSliderTrack: {
    width: '100%',
    height: s(4),
    borderRadius: s(2),
    backgroundColor: '#DCD8D0',
  },
  ageSliderTrackActive: {
    height: s(4),
    borderRadius: s(2),
    backgroundColor: '#4E5836',
    position: 'absolute',
    left: 0,
  },
  ageSliderKnob: {
    width: s(16),
    height: s(16),
    borderRadius: s(8),
    backgroundColor: '#4E5836',
    position: 'absolute',
    marginLeft: s(-8),
  },
  ageValue: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: s(20),
    color: '#4E5836',
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
