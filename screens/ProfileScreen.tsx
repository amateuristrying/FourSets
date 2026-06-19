import React, { useRef, useCallback, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  PanResponder,
  TextInput,
  KeyboardAvoidingView,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';

const SCALE = Platform.OS === 'web' ? 1.0 : 0.82;
const s = (val: number) => val * SCALE;

// ─── Helpers ────────────────────────────────────────────────────────
const getDaysInMonth = (month: number, year: number) => {
  if (month === 2) {
    const leap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    return leap ? 29 : 28;
  }
  return [4, 6, 9, 11].includes(month) ? 30 : 31;
};

const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(Math.round(val), min), max);

const calculateAge = (day: number, month: number, year: number) => {
  const today = new Date();
  let age = today.getFullYear() - year;
  const monthDiff = today.getMonth() + 1 - month;
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < day)) {
    age--;
  }
  return Math.max(0, age);
};

const MONTH_ABBR = [
  '', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

// ─── Single Scroll Column ──────────────────────────────────────────
interface ScrollColumnProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (val: number) => void;
  displayFn?: (val: number) => string;
  width?: number;
}

const ScrollColumn = ({ label, value, min, max, onChange, displayFn, width }: ScrollColumnProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState('');
  const accumulatedDelta = useRef(0);
  const startValue = useRef(value);

  const SCROLL_SENSITIVITY = 18; // pixels per tick

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_: GestureResponderEvent, gs: PanResponderGestureState) =>
        Math.abs(gs.dy) > 5,
      onPanResponderGrant: () => {
        accumulatedDelta.current = 0;
        startValue.current = value;
      },
      onPanResponderMove: (_: GestureResponderEvent, gs: PanResponderGestureState) => {
        // Swipe UP → increase, swipe DOWN → decrease
        const ticks = Math.round(-gs.dy / SCROLL_SENSITIVITY);
        const newVal = clamp(startValue.current + ticks, min, max);
        if (newVal !== value) {
          onChange(newVal);
        }
      },
      onPanResponderRelease: () => {},
    })
  ).current;

  // Keep startValue in sync for the panResponder
  startValue.current = value;

  const increment = () => onChange(clamp(value + 1, min, max));
  const decrement = () => onChange(clamp(value - 1, min, max));

  const handleTap = () => {
    setEditText(String(value));
    setIsEditing(true);
  };

  const handleSubmit = () => {
    const parsed = parseInt(editText, 10);
    if (!isNaN(parsed)) {
      onChange(clamp(parsed, min, max));
    }
    setIsEditing(false);
  };

  const displayValue = displayFn ? displayFn(value) : String(value).padStart(2, '0');

  return (
    <View style={[scrollStyles.column, width ? { width: s(width) } : {}]}>
      {/* Up Arrow */}
      <TouchableOpacity
        onPress={increment}
        style={scrollStyles.arrowBtn}
        activeOpacity={0.6}
        hitSlop={{ top: 6, bottom: 6, left: 10, right: 10 }}
      >
        <Text style={scrollStyles.arrowText}>▲</Text>
      </TouchableOpacity>

      {/* Value Box — scrollable + tappable to edit */}
      <View {...panResponder.panHandlers}>
        <TouchableOpacity
          onPress={handleTap}
          activeOpacity={0.8}
          style={scrollStyles.valueBox}
        >
          {isEditing ? (
            <TextInput
              style={scrollStyles.valueInput}
              value={editText}
              onChangeText={setEditText}
              onBlur={handleSubmit}
              onSubmitEditing={handleSubmit}
              keyboardType="number-pad"
              autoFocus
              selectTextOnFocus
              maxLength={4}
            />
          ) : (
            <Text style={scrollStyles.valueText}>{displayValue}</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Down Arrow */}
      <TouchableOpacity
        onPress={decrement}
        style={scrollStyles.arrowBtn}
        activeOpacity={0.6}
        hitSlop={{ top: 6, bottom: 6, left: 10, right: 10 }}
      >
        <Text style={scrollStyles.arrowText}>▼</Text>
      </TouchableOpacity>
    </View>
  );
};

const scrollStyles = StyleSheet.create({
  column: {
    alignItems: 'center',
    width: s(62),
  },
  arrowBtn: {
    paddingVertical: s(4),
    paddingHorizontal: s(10),
  },
  arrowText: {
    fontSize: s(10),
    color: '#4E5836',
    fontFamily: 'Inter_600SemiBold',
  },
  valueBox: {
    width: s(56),
    height: s(48),
    borderRadius: s(12),
    borderWidth: 1.5,
    borderColor: '#DCD8D0',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueText: {
    fontFamily: 'Inter_700Bold',
    fontSize: s(18),
    color: '#000000',
  },
  valueInput: {
    fontFamily: 'Inter_700Bold',
    fontSize: s(18),
    color: '#000000',
    textAlign: 'center',
    width: '100%',
    height: '100%',
    padding: 0,
  },
});

// ─── Profile Screen ─────────────────────────────────────────────────
interface ProfileScreenProps {
  birthDay: number;
  birthMonth: number;
  birthYear: number;
  onChangeBirthDay: (d: number) => void;
  onChangeBirthMonth: (m: number) => void;
  onChangeBirthYear: (y: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ProfileScreen({
  birthDay,
  birthMonth,
  birthYear,
  onChangeBirthDay,
  onChangeBirthMonth,
  onChangeBirthYear,
  onNext,
  onBack,
}: ProfileScreenProps) {
  const maxDay = getDaysInMonth(birthMonth, birthYear);
  const currentYear = new Date().getFullYear();
  const age = calculateAge(birthDay, birthMonth, birthYear);

  // Auto-clamp day when month/year changes reduce max days
  const handleMonthChange = useCallback(
    (m: number) => {
      onChangeBirthMonth(m);
      const newMax = getDaysInMonth(m, birthYear);
      if (birthDay > newMax) onChangeBirthDay(newMax);
    },
    [birthDay, birthYear, onChangeBirthMonth, onChangeBirthDay]
  );

  const handleYearChange = useCallback(
    (y: number) => {
      onChangeBirthYear(y);
      const newMax = getDaysInMonth(birthMonth, y);
      if (birthDay > newMax) onChangeBirthDay(newMax);
    },
    [birthDay, birthMonth, onChangeBirthYear, onChangeBirthDay]
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
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

          {/* Date of Birth */}
          <View style={styles.dobSection}>
            <Text style={styles.label}>
              Date of Birth{' '}
              <Text style={styles.ageChip}>({age} yrs)</Text>
            </Text>

            <View style={styles.dobRow}>
              <ScrollColumn
                label="DD"
                value={birthDay}
                min={1}
                max={maxDay}
                onChange={onChangeBirthDay}
              />
              <ScrollColumn
                label="MM"
                value={birthMonth}
                min={1}
                max={12}
                onChange={handleMonthChange}
                displayFn={(v) => MONTH_ABBR[v] || String(v).padStart(2, '0')}
                width={64}
              />
              <ScrollColumn
                label="YY"
                value={birthYear}
                min={1930}
                max={currentYear}
                onChange={handleYearChange}
                displayFn={(v) => String(v)}
                width={70}
              />
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

        <View style={styles.dotsContainer}>
          <View style={styles.dot} />
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
    paddingBottom: s(12),
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
  ageChip: {
    fontFamily: 'Inter_400Regular',
    fontSize: s(13),
    color: '#4E5836',
  },
  dobSection: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: s(4),
    marginBottom: s(40),
  },
  dobRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: s(10),
    gap: s(10),
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
