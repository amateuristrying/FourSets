import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';

const SCALE = Platform.OS === 'web' ? 1.0 : 0.82;
const s = (val: number) => val * SCALE;

interface BodyScreenProps {
  height: string; // e.g. "6'0\""
  weight: number; // in kg
  diet: 'Herbivore' | 'Omnivore' | 'Carnivore' | null;
  onChangeHeight: (height: string) => void;
  onChangeWeight: (weight: number) => void;
  onChangeDiet: (diet: 'Herbivore' | 'Omnivore' | 'Carnivore') => void;
  onNext: () => void;
  onBack: () => void;
}

export default function BodyScreen({
  height,
  weight,
  diet,
  onChangeHeight,
  onChangeWeight,
  onChangeDiet,
  onNext,
  onBack,
}: BodyScreenProps) {

  // Parse height string "6'0\"" to total inches
  const parseHeightToInches = (hStr: string): number => {
    try {
      const match = hStr.match(/(\d+)'(\d+)"/);
      if (match) {
        const ft = parseInt(match[1], 10);
        const inch = parseInt(match[2], 10);
        return ft * 12 + inch;
      }
    } catch (e) {
      // fallback
    }
    return 72; // default 6'0" (72 inches)
  };

  // Format total inches to "6'0\""
  const formatInchesToHeightString = (totalInches: number): string => {
    const ft = Math.floor(totalInches / 12);
    const inch = totalInches % 12;
    return `${ft}'${inch}"`;
  };

  const handleIncrementHeight = () => {
    const currentInches = parseHeightToInches(height);
    if (currentInches < 96) { // max 8'0"
      onChangeHeight(formatInchesToHeightString(currentInches + 1));
    }
  };

  const handleDecrementHeight = () => {
    const currentInches = parseHeightToInches(height);
    if (currentInches > 36) { // min 3'0"
      onChangeHeight(formatInchesToHeightString(currentInches - 1));
    }
  };

  const handleIncrementWeight = () => {
    onChangeWeight(weight + 1);
  };

  const handleDecrementWeight = () => {
    if (weight > 20) {
      onChangeWeight(weight - 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Centered Image (Floating in background) */}
      <View style={styles.imageViewport} pointerEvents="none">
        <Image 
          source={require('../assets/jumping_man.png')}
          style={[
            styles.centeredImage,
            {
              transform: [
                { translateX: s(0) },
                { translateY: s(-170) },
                { scale: 1.9 }
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
          <Text style={styles.title}>Tell us about{'\n'}your body</Text>
          <Text style={styles.subtitle}>We'll use this to build your personalized fitness journey.</Text>

          {/* Spinners Row */}
          <View style={styles.spinnersRow}>
            {/* Height Spinner */}
            <View style={styles.spinnerContainerWrapper}>
              <View style={styles.spinnerContainer}>
                <TouchableOpacity 
                  style={styles.spinnerArrowButton} 
                  onPress={handleIncrementHeight}
                  activeOpacity={0.6}
                >
                  <Text style={styles.spinnerArrow}>▲</Text>
                </TouchableOpacity>
                
                <Text style={styles.spinnerText}>{height}</Text>
                
                <TouchableOpacity 
                  style={styles.spinnerArrowButton} 
                  onPress={handleDecrementHeight}
                  activeOpacity={0.6}
                >
                  <Text style={styles.spinnerArrow}>▼</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.spinnerLabel}>Height</Text>
            </View>

            {/* Weight Spinner */}
            <View style={styles.spinnerContainerWrapper}>
              <View style={styles.spinnerContainer}>
                <TouchableOpacity 
                  style={styles.spinnerArrowButton} 
                  onPress={handleIncrementWeight}
                  activeOpacity={0.6}
                >
                  <Text style={styles.spinnerArrow}>▲</Text>
                </TouchableOpacity>
                
                <Text style={styles.spinnerText}>{weight} <Text style={styles.spinnerUnit}>kg</Text></Text>
                
                <TouchableOpacity 
                  style={styles.spinnerArrowButton} 
                  onPress={handleDecrementWeight}
                  disabled={weight <= 20}
                  activeOpacity={0.6}
                >
                  <Text style={[styles.spinnerArrow, weight <= 20 && styles.spinnerArrowDisabled]}>▼</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.spinnerLabel}>Weight</Text>
            </View>
          </View>

          {/* Dietary preference label */}
          <Text style={styles.sectionLabel}>What's your dietary preference?</Text>

          {/* Dietary preference toggle row */}
          <View style={styles.toggleRow}>
            {(['Herbivore', 'Omnivore', 'Carnivore'] as const).map((option) => {
              const isActive = diet === option;
              return (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.toggleButton,
                    isActive ? styles.toggleButtonActive : styles.toggleButtonInactive
                  ]}
                  onPress={() => onChangeDiet(option)}
                  activeOpacity={0.8}
                >
                  <Text style={[
                    styles.toggleText,
                    isActive ? styles.toggleTextActive : styles.toggleTextInactive
                  ]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={onNext} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Continue</Text>
          <Text style={styles.buttonArrow}> →</Text>
        </TouchableOpacity>

        <Text style={styles.stepperText}>Personal Profile • 4 of 7</Text>

        <View style={styles.dotsContainer}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
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
  spinnersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: s(16),
    marginBottom: s(36),
  },
  spinnerContainerWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  spinnerContainer: {
    width: '100%',
    height: s(96),
    borderWidth: 1.5,
    borderColor: '#DCD8D0',
    borderRadius: s(16),
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: s(8),
  },
  spinnerArrowButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: s(4),
  },
  spinnerArrow: {
    fontSize: s(12),
    color: '#4E5836',
  },
  spinnerArrowDisabled: {
    color: '#DCD8D0',
  },
  spinnerText: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: s(22),
    color: '#000000',
    marginVertical: s(2),
  },
  spinnerUnit: {
    fontFamily: 'Inter_400Regular',
    fontSize: s(14),
    color: '#000000',
  },
  spinnerLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: s(14),
    color: '#000000',
    marginTop: s(8),
  },
  sectionLabel: {
    fontFamily: 'Inter_700Bold',
    fontSize: s(16),
    color: '#000000',
    textAlign: 'center',
    marginBottom: s(16),
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: s(10),
  },
  toggleButton: {
    flex: 1,
    height: s(48),
    borderRadius: s(12),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
  },
  toggleButtonActive: {
    backgroundColor: 'rgba(78, 88, 54, 0.05)',
    borderColor: '#4E5836',
    borderWidth: 2,
  },
  toggleButtonInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderColor: '#DCD8D0',
  },
  toggleText: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: s(15),
  },
  toggleTextActive: {
    color: '#4E5836',
  },
  toggleTextInactive: {
    color: '#000000',
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
