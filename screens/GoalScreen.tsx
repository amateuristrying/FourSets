import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Platform } from 'react-native';

const SCALE = Platform.OS === 'web' ? 1.0 : 0.82;
const s = (val: number) => val * SCALE;

interface GoalScreenProps {
  goal: 'Build Muscle' | 'Lose Fat' | 'Get Stronger' | 'Improve Fitness' | null;
  onChangeGoal: (goal: 'Build Muscle' | 'Lose Fat' | 'Get Stronger' | 'Improve Fitness') => void;
  onNext: () => void;
  onBack: () => void;
}

export default function GoalScreen({
  goal,
  onChangeGoal,
  onNext,
  onBack,
}: GoalScreenProps) {
  const goals = [
    'Build Muscle',
    'Lose Fat',
    'Get Stronger',
    'Improve Fitness',
  ] as const;

  return (
    <View style={styles.container}>
      {/* Centered Image (Floating in background) */}
      <View style={styles.imageViewport} pointerEvents="none">
        <Image 
          source={require('../assets/stretching_man.png')}
          style={[
            styles.centeredImage,
            {
              transform: [
                { translateX: s(0) },
                { translateY: s(-192) },
                { scale: 1.6 }
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
          <Text style={styles.title}>What's your goal?</Text>
          <Text style={styles.subtitle}>Choose the physique you want to achieve.</Text>

          {/* 2x2 Grid */}
          <View style={styles.grid}>
            {goals.map((g) => {
              const isActive = goal === g;
              return (
                <TouchableOpacity
                  key={g}
                  style={[
                    styles.card,
                    isActive ? styles.cardActive : styles.cardInactive
                  ]}
                  onPress={() => onChangeGoal(g)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.cardText}>{g}</Text>
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

        <Text style={styles.stepperText}>Personal Profile • 6 of 7</Text>

        <View style={styles.dotsContainer}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
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
    marginBottom: s(48),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: s(16),
    width: '100%',
  },
  card: {
    width: '47%', // roughly split 2 columns with gaps
    flexGrow: 1,
    height: s(120),
    borderRadius: s(20),
    justifyContent: 'center',
    alignItems: 'center',
    padding: s(16),
    borderWidth: 1.5,
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
  cardText: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: s(18),
    color: '#000000',
    textAlign: 'center',
    lineHeight: s(22),
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
