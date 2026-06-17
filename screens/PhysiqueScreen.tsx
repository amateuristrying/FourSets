import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Platform } from 'react-native';

const SCALE = Platform.OS === 'web' ? 1.0 : 0.82;
const s = (val: number) => val * SCALE;

interface PhysiqueScreenProps {
  physique: number | null;
  onChangePhysique: (physique: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function PhysiqueScreen({
  physique,
  onChangePhysique,
  onNext,
  onBack,
}: PhysiqueScreenProps) {
  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content - Bottom Aligned */}
      <View style={styles.content}>
        <View style={styles.bottomAlignContainer}>
          <Text style={styles.title}>Describe your current{'\n'}physique</Text>
          <Text style={styles.subtitle}>This helps us personalize your plan better.</Text>

          {/* 3x3 Grid of 9 empty boxes */}
          <View style={styles.grid}>
            {options.map((num) => {
              const isActive = physique === num;
              return (
                <TouchableOpacity
                  key={num}
                  style={[
                    styles.card,
                    isActive ? styles.cardActive : styles.cardInactive
                  ]}
                  onPress={() => onChangePhysique(num)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.cardNumber}>{num}</Text>
                  {num === 9 && (
                    <View style={styles.cardContent}>
                      <Image 
                        source={require('../assets/peter_griffin.png')}
                        style={styles.cardImage}
                      />
                      <Text style={styles.cardLabel}>Obese</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Info text */}
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>ⓘ Select the option that looks most like you right now.</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.button, physique === null && styles.buttonDisabled]} 
          onPress={onNext} 
          disabled={physique === null}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Continue</Text>
          <Text style={styles.buttonArrow}> →</Text>
        </TouchableOpacity>

        <Text style={styles.stepperText}>Personal Profile • 5 of 7</Text>

        <View style={styles.dotsContainer}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
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
    paddingHorizontal: s(12),
  },
  header: {
    height: s(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: s(20),
    paddingHorizontal: s(12),
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
    paddingBottom: s(16),
  },
  bottomAlignContainer: {
    width: '100%',
  },
  title: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: s(30),
    color: '#000000',
    textAlign: 'center',
    lineHeight: s(38),
    letterSpacing: s(-0.5),
    marginBottom: s(8),
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: s(15),
    color: '#4A4A4A',
    textAlign: 'center',
    marginBottom: s(24),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: s(8),
    width: '100%',
    marginBottom: s(12),
  },
  card: {
    width: s(124),
    height: s(164),
    borderRadius: s(16),
    borderWidth: 1.5,
    padding: s(12),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  cardActive: {
    backgroundColor: 'rgba(78, 88, 54, 0.08)',
    borderColor: '#4E5836',
    borderWidth: 2.5,
  },
  cardInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderColor: '#DCD8D0',
  },
  cardNumber: {
    fontFamily: 'Inter_700Bold',
    fontSize: s(14),
    color: '#000000',
  },
  cardImage: {
    width: '100%',
    height: s(95),
    resizeMode: 'contain',
    marginTop: s(2),
    alignSelf: 'center',
  },
  cardContent: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: s(11),
    color: '#000000',
    textAlign: 'center',
    marginTop: s(2),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: s(8),
  },
  infoText: {
    fontFamily: 'Inter_400Regular',
    fontSize: s(13),
    color: '#6F6C66',
    textAlign: 'center',
  },
  footer: {
    paddingBottom: s(24),
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: s(12),
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
});
