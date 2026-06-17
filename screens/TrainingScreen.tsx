import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Platform } from 'react-native';

const SCALE = Platform.OS === 'web' ? 1.0 : 0.82;
const s = (val: number) => val * SCALE;

interface TrainingScreenProps {
  workoutHours: number;
  workoutMinutes: number;
  trainDays: number;
  hasGymAccess: boolean;
  onChangeHours: (hours: number) => void;
  onChangeMinutes: (mins: number) => void;
  onChangeDays: (days: number) => void;
  onChangeGymAccess: (access: boolean) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function TrainingScreen({
  workoutHours,
  workoutMinutes,
  trainDays,
  hasGymAccess,
  onChangeHours,
  onChangeMinutes,
  onChangeDays,
  onChangeGymAccess,
  onNext,
  onBack,
}: TrainingScreenProps) {
  const safeHours = workoutHours ?? 0;
  const safeMinutes = workoutMinutes ?? 45;
  const safeDays = trainDays ?? 3;
  const safeGymAccess = hasGymAccess ?? true;

  const handleIncrementHours = () => {
    if (safeHours < 12) {
      onChangeHours(safeHours + 1);
    }
  };

  const handleDecrementHours = () => {
    if (safeHours > 0) {
      onChangeHours(safeHours - 1);
    }
  };

  const handleIncrementMinutes = () => {
    if (safeMinutes < 59) {
      // Increment by 5 mins for convenience, or clamp to 59
      const nextMin = Math.min(safeMinutes + 5, 55);
      onChangeMinutes(safeMinutes === 55 ? 59 : nextMin);
    } else {
      onChangeMinutes(0);
    }
  };

  const handleDecrementMinutes = () => {
    if (safeMinutes > 0) {
      if (safeMinutes === 59) {
        onChangeMinutes(55);
      } else {
        onChangeMinutes(Math.max(safeMinutes - 5, 0));
      }
    } else {
      onChangeMinutes(59);
    }
  };

  const handleIncrementDays = () => {
    if (safeDays < 7) {
      onChangeDays(safeDays + 1);
    }
  };

  const handleDecrementDays = () => {
    if (safeDays > 1) {
      onChangeDays(safeDays - 1);
    }
  };

  const formatTwoDigits = (num: number) => {
    const val = num ?? 0;
    return val.toString().padStart(2, '0');
  };

  return (
    <View style={styles.container}>
      {/* Centered Mannequin Image (Floating in background) */}
      <View style={styles.imageViewport} pointerEvents="none">
        <Image 
          source={require('../assets/pushing_man.png')}
          style={[
            styles.centeredImage,
            {
              transform: [
                { translateX: s(0) },
                { translateY: s(-216) },
                { scale: 1.8 }
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
          <Text style={styles.title}>Let's build your{'\n'}training plan</Text>
          <Text style={styles.subtitle}>Tell us how much time and equipment you have available.</Text>

          {/* Compressed Horizontal Input Row */}
          <View style={styles.inputsRow}>
            {/* Column 1: Time per Workout */}
            <View style={styles.inputColumn}>
              <Text style={styles.inputColumnLabel}>Time / Workout</Text>
              <View style={styles.timeSpinnerRow}>
                {/* HH Spinner */}
                <View style={styles.spinnerContainer}>
                  <TouchableOpacity 
                    style={styles.spinnerArrowButton} 
                    onPress={handleIncrementHours}
                    activeOpacity={0.6}
                  >
                    <Text style={styles.spinnerArrow}>▲</Text>
                  </TouchableOpacity>
                  
                  <Text style={styles.spinnerText}>{formatTwoDigits(safeHours)}</Text>
                  
                  <TouchableOpacity 
                    style={styles.spinnerArrowButton} 
                    onPress={handleDecrementHours}
                    activeOpacity={0.6}
                  >
                    <Text style={styles.spinnerArrow}>▼</Text>
                  </TouchableOpacity>
                </View>

                {/* Separator Colon */}
                <Text style={styles.timeColon}>:</Text>

                {/* MM Spinner */}
                <View style={styles.spinnerContainer}>
                  <TouchableOpacity 
                    style={styles.spinnerArrowButton} 
                    onPress={handleIncrementMinutes}
                    activeOpacity={0.6}
                  >
                    <Text style={styles.spinnerArrow}>▲</Text>
                  </TouchableOpacity>
                  
                  <Text style={styles.spinnerText}>{formatTwoDigits(safeMinutes)}</Text>
                  
                  <TouchableOpacity 
                    style={styles.spinnerArrowButton} 
                    onPress={handleDecrementMinutes}
                    activeOpacity={0.6}
                  >
                    <Text style={styles.spinnerArrow}>▼</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Column 2: Days per Week */}
            <View style={styles.inputColumn}>
              <Text style={styles.inputColumnLabel}>Days / Week</Text>
              <View style={styles.daysSpinnerRow}>
                <View style={[styles.spinnerContainer, { width: s(68) }]}>
                  <TouchableOpacity 
                    style={styles.spinnerArrowButton} 
                    onPress={handleIncrementDays}
                    activeOpacity={0.6}
                  >
                    <Text style={styles.spinnerArrow}>▲</Text>
                  </TouchableOpacity>
                  
                  <Text style={styles.spinnerText}>{safeDays}</Text>
                  
                  <TouchableOpacity 
                    style={styles.spinnerArrowButton} 
                    onPress={handleDecrementDays}
                    activeOpacity={0.6}
                  >
                    <Text style={styles.spinnerArrow}>▼</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Gym Access Checkbox */}
          <TouchableOpacity 
            style={styles.checkboxContainer} 
            onPress={() => onChangeGymAccess(!safeGymAccess)}
            activeOpacity={0.8}
          >
            <View style={[
              styles.checkbox,
              safeGymAccess && styles.checkboxChecked
            ]}>
              {safeGymAccess && <Text style={styles.checkboxCheckmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>Do you have access to a gym?</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={onNext} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Continue</Text>
          <Text style={styles.buttonArrow}> →</Text>
        </TouchableOpacity>

        <Text style={styles.stepperText}>Personal Profile • 7 of 7</Text>

        <View style={styles.dotsContainer}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
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
    fontSize: s(32),
    color: '#000000',
    textAlign: 'center',
    lineHeight: s(40),
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
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    gap: s(28),
    marginBottom: s(24),
  },
  inputColumn: {
    alignItems: 'center',
  },
  inputColumnLabel: {
    fontFamily: 'Inter_700Bold',
    fontSize: s(14),
    color: '#000000',
    marginBottom: s(12),
    textAlign: 'center',
  },
  timeSpinnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(8),
  },
  timeColon: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: s(24),
    color: '#000000',
    marginHorizontal: s(2),
  },
  spinnerContainer: {
    width: s(68),
    height: s(80),
    borderWidth: 1.5,
    borderColor: '#DCD8D0',
    borderRadius: s(14),
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: s(4),
  },
  spinnerArrowButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: s(2),
  },
  spinnerArrow: {
    fontSize: s(10),
    color: '#4E5836',
  },
  spinnerText: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: s(18),
    color: '#000000',
    marginVertical: s(1),
  },
  daysSpinnerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: s(6),
    gap: s(10),
    marginBottom: s(8),
  },
  checkbox: {
    width: s(20),
    height: s(20),
    borderRadius: s(5),
    borderWidth: 2,
    borderColor: '#4E5836',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: '#4E5836',
  },
  checkboxCheckmark: {
    color: '#FAF6F0',
    fontSize: s(12),
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontFamily: 'Inter_700Bold',
    fontSize: s(14),
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
