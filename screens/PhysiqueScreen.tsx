import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Platform } from 'react-native';

const SCALE = Platform.OS === 'web' ? 1.0 : 0.82;
const s = (val: number) => val * SCALE;

const IMAGE_SCALE = 1.46; // Skinny card fixed scale
const FIT_IMAGE_SCALE = 1.33; // Fit card fixed scale
const OVERWEIGHT_IMAGE_SCALE = 1.50; // Overweight card fixed scale

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
  return (
    <View style={styles.container}>
      {/* Header - Back button only */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content - Bottom Aligned */}
      <View style={styles.content}>
        <View style={styles.bottomAlignContainer}>
          <Text style={styles.title}>Which of the below{"\n"}categories define your body type.</Text>
          <Text style={styles.subtitle}>This helps us personalize your plan better.</Text>

          {/* 3 selectable cards in a single horizontal row */}
          <View style={styles.cardsRow}>
            {/* Skinny Card */}
            <TouchableOpacity
              style={[
                styles.card,
                physique === 1 ? styles.cardActive : styles.cardInactive
              ]}
              onPress={() => onChangePhysique(1)}
              activeOpacity={0.85}
            >
              <View style={styles.cardImageContainer}>
                <Image 
                  source={require('../assets/skinny_man.png')}
                  style={[
                    styles.cardImage,
                    { transform: [{ scale: IMAGE_SCALE }, { translateY: s(3) }] }
                  ]}
                />
              </View>
              <Text style={styles.cardLabel}>Skinny</Text>
            </TouchableOpacity>

            {/* Fit Card */}
            <TouchableOpacity
              style={[
                styles.card,
                physique === 2 ? styles.cardActive : styles.cardInactive
              ]}
              onPress={() => onChangePhysique(2)}
              activeOpacity={0.85}
            >
              <View style={styles.cardImageContainer}>
                <Image 
                  source={require('../assets/fit_man.png')}
                  style={[
                    styles.cardImage,
                    { transform: [{ scale: FIT_IMAGE_SCALE }, { translateY: s(-3) }] }
                  ]}
                />
              </View>
              <Text style={styles.cardLabel}>Fit</Text>
            </TouchableOpacity>

            {/* Overweight Card */}
            <TouchableOpacity
              style={[
                styles.card,
                physique === 3 ? styles.cardActive : styles.cardInactive
              ]}
              onPress={() => onChangePhysique(3)}
              activeOpacity={0.85}
            >
              <View style={styles.cardImageContainer}>
                <Image 
                  source={require('../assets/overweight_man.png')}
                  style={[
                    styles.cardImage,
                    { transform: [{ scale: OVERWEIGHT_IMAGE_SCALE }] }
                  ]}
                />
              </View>
              <Text style={styles.cardLabel}>Overweight</Text>
            </TouchableOpacity>
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

        {/* Progress Dots - step 6 of 8 */}
        <View style={styles.dotsContainer}>
          <View style={styles.dot} />
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
    fontSize: s(28),
    color: '#000000',
    textAlign: 'left',
    lineHeight: s(36),
    letterSpacing: s(-0.5),
    marginBottom: s(8),
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: s(15),
    color: '#6F6C66',
    textAlign: 'left',
    marginBottom: s(24),
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: s(10),
    width: '100%',
    marginBottom: s(24),
  },
  card: {
    flex: 1,
    height: s(265),
    borderRadius: s(16),
    borderWidth: 1.5,
    paddingTop: s(16),
    paddingBottom: s(16),
    paddingHorizontal: s(8),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardActive: {
    backgroundColor: 'rgba(78, 88, 54, 0.05)',
    borderColor: '#4E5836',
    borderWidth: 2,
  },
  cardInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderColor: '#DCD8D0',
  },
  cardImageContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  cardLabel: {
    fontFamily: 'Inter_700Bold',
    fontSize: s(14),
    color: '#000000',
    textAlign: 'center',
    marginTop: s(8),
  },
  footer: {
    paddingBottom: s(24),
    alignItems: 'center',
    width: '100%',
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
});
