import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  Dimensions,
  Modal,
} from 'react-native';

const { width: winWidth } = Dimensions.get('window');
const SCALE = Platform.OS === 'web' ? 1.0 : 0.82;
const s = (val: number) => val * SCALE;

interface BmiScreenProps {
  height: string; // e.g. "6'0\""
  weight: number; // in kg
  onNext: () => void;
  onBack: () => void;
}

export default function BmiScreen({ height, weight, onNext, onBack }: BmiScreenProps) {
  const [showInfoModal, setShowInfoModal] = useState(false);

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
    return 72; // default 6'0"
  };

  const inches = parseHeightToInches(height);
  const meters = inches * 0.0254;
  const metersSq = meters * meters;
  const bmiVal = weight / metersSq;
  const bmiStr = bmiVal.toFixed(1);

  // Determine Category and supporting copy
  let category: 'Underweight' | 'Normal' | 'Overweight' | 'Obese' = 'Normal';
  let message = 'Great! You fall within a healthy weight range.';
  if (bmiVal < 18.5) {
    category = 'Underweight';
    message = "You're currently below the recommended weight range.";
  } else if (bmiVal < 25.0) {
    category = 'Normal';
    message = 'Great! You fall within a healthy weight range.';
  } else if (bmiVal < 30.0) {
    category = 'Overweight';
    message = "You're slightly above the recommended weight range.";
  } else {
    category = 'Obese';
    message = 'Your BMI suggests elevated health risks associated with excess body weight.';
  }

  // Calculate circular pointer position on the scale
  // Underweight: covers 0% to 25% (BMI 15 to 18.5)
  // Normal: covers 25% to 50% (BMI 18.5 to 25.0)
  // Overweight: covers 50% to 75% (BMI 25.0 to 30.0)
  // Obese: covers 75% to 100% (BMI 30.0 to 35.0)
  const getScalePercentage = (bmi: number): number => {
    if (bmi < 15) return 2;
    if (bmi > 35) return 98;
    if (bmi < 18.5) {
      return 2 + ((bmi - 15) / (18.5 - 15)) * 23;
    } else if (bmi < 25) {
      return 25 + ((bmi - 18.5) / (25 - 18.5)) * 25;
    } else if (bmi < 30) {
      return 50 + ((bmi - 25) / (30 - 25)) * 25;
    } else {
      return 75 + ((bmi - 30) / (35 - 30)) * 23;
    }
  };

  const pointerLeftPct = getScalePercentage(bmiVal);

  // Dynamic Insights data based on category
  interface InsightItem {
    icon: string;
    title: string;
    description: string;
    badgeText: string;
    badgeStyle: 'info' | 'success' | 'warning' | 'danger';
  }

  const getInsights = (): InsightItem[] => {
    switch (category) {
      case 'Underweight':
        return [
          {
            icon: '📉',
            title: 'Below Recommendation',
            description: 'Your BMI is below the healthy standard.',
            badgeText: 'Underweight',
            badgeStyle: 'info',
          },
          {
            icon: '💪',
            title: 'Muscle Opportunity',
            description: 'Focus on progressive training and nutrition.',
            badgeText: 'Focus',
            badgeStyle: 'success',
          },
          {
            icon: '🍽️',
            title: 'Nutrition Focus',
            description: 'Ensure adequate caloric and nutrient intake.',
            badgeText: 'Important',
            badgeStyle: 'warning',
          },
          {
            icon: '⚡',
            title: 'Strength Potential',
            description: 'A caloric surplus will support muscle growth.',
            badgeText: 'High',
            badgeStyle: 'success',
          },
        ];
      case 'Normal':
        return [
          {
            icon: '❤️',
            title: 'Healthy Range',
            description: "You're within the ideal BMI range.",
            badgeText: '18.5 – 24.9',
            badgeStyle: 'success',
          },
          {
            icon: '⚖️',
            title: 'Body Balance',
            description: 'Your weight is well balanced for your height.',
            badgeText: 'Good',
            badgeStyle: 'success',
          },
          {
            icon: '⚡',
            title: 'Energy Levels',
            description: 'People in this range often have optimal energy.',
            badgeText: 'Optimal',
            badgeStyle: 'success',
          },
          {
            icon: '🛡️',
            title: 'Risk Factor',
            description: 'Lower risk of weight-related health issues.',
            badgeText: 'Low',
            badgeStyle: 'success',
          },
        ];
      case 'Overweight':
        return [
          {
            icon: '📈',
            title: 'Moderate Excess Weight',
            description: "Your BMI is slightly above the recommended range.",
            badgeText: 'Overweight',
            badgeStyle: 'warning',
          },
          {
            icon: '🏃',
            title: 'Fat Loss Opportunity',
            description: 'Personalized training will target body fat reduction.',
            badgeText: 'Priority',
            badgeStyle: 'warning',
          },
          {
            icon: '🫀',
            title: 'Cardiovascular Health',
            description: 'Increasing active minutes benefits heart health.',
            badgeText: 'Key',
            badgeStyle: 'success',
          },
          {
            icon: '🦵',
            title: 'Mobility Benefits',
            description: 'Lowering body weight reduces joint stress.',
            badgeText: 'High',
            badgeStyle: 'success',
          },
        ];
      case 'Obese':
        return [
          {
            icon: '🚨',
            title: 'Elevated Health Risk',
            description: 'Your BMI indicates potential long-term health risks.',
            badgeText: 'Obese',
            badgeStyle: 'danger',
          },
          {
            icon: '🎯',
            title: 'Weight Management',
            description: 'Consider a guided, sustainable calorie deficit.',
            badgeText: 'Critical',
            badgeStyle: 'danger',
          },
          {
            icon: '🌱',
            title: 'Long-Term Health',
            description: 'Reducing weight significantly lowers risk profiles.',
            badgeText: 'High Benefit',
            badgeStyle: 'success',
          },
          {
            icon: '🚶',
            title: 'Gradual Change',
            description: 'Start with small, sustainable exercise goals.',
            badgeText: 'Recommended',
            badgeStyle: 'success',
          },
        ];
    }
  };

  const insights = getInsights();

  // Helper to resolve badge background and text colors
  const getBadgeColors = (style: 'info' | 'success' | 'warning' | 'danger') => {
    switch (style) {
      case 'info':
        return { bg: 'rgba(166, 193, 238, 0.2)', text: '#4A90E2' };
      case 'success':
        return { bg: 'rgba(78, 88, 54, 0.1)', text: '#4E5836' };
      case 'warning':
        return { bg: 'rgba(249, 203, 120, 0.2)', text: '#D0851A' };
      case 'danger':
        return { bg: 'rgba(233, 151, 151, 0.2)', text: '#C0392B' };
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Header Logo & Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content Area */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text style={styles.title}>Your BMI</Text>
        <Text style={styles.subtitle}>Here's what your body composition tells us.</Text>

        {/* 1. BMI Result Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>BMI (Body Mass Index)</Text>
            <TouchableOpacity
              onPress={() => setShowInfoModal(true)}
              style={styles.infoIconContainer}
              activeOpacity={0.6}
            >
              <Text style={styles.infoIcon}>ⓘ</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bmiDisplayContainer}>
            <Text style={styles.bmiValue}>{bmiStr}</Text>
            <Text style={styles.bmiCategory}>{category}</Text>
            <Text style={styles.bmiMessage}>{message}</Text>
          </View>

          {/* Scale Visualization */}
          <View style={styles.scaleContainer}>
            {/* The 4 color bars */}
            <View style={styles.scaleBar}>
              <View style={[styles.scaleSegment, { backgroundColor: '#A6C1EE', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }]} />
              <View style={[styles.scaleSegment, { backgroundColor: '#94C385' }]} />
              <View style={[styles.scaleSegment, { backgroundColor: '#F9CB78' }]} />
              <View style={[styles.scaleSegment, { backgroundColor: '#E99797', borderTopRightRadius: 4, borderBottomRightRadius: 4 }]} />

              {/* Indicator Circle */}
              <View style={[styles.scalePointer, { left: `${pointerLeftPct}%` }]}>
                <View style={styles.scalePointerInner} />
              </View>
            </View>

            {/* Scale Labels */}
            <View style={styles.scaleLabelsRow}>
              <View style={styles.scaleLabelCol}>
                <Text style={styles.scaleLabelVal}>&lt; 18.5</Text>
                <Text style={styles.scaleLabelName}>Underweight</Text>
              </View>
              <View style={styles.scaleLabelCol}>
                <Text style={styles.scaleLabelVal}>18.5 – 24.9</Text>
                <Text style={styles.scaleLabelName}>Normal</Text>
              </View>
              <View style={styles.scaleLabelCol}>
                <Text style={styles.scaleLabelVal}>25 – 29.9</Text>
                <Text style={styles.scaleLabelName}>Overweight</Text>
              </View>
              <View style={styles.scaleLabelCol}>
                <Text style={styles.scaleLabelVal}>≥ 30</Text>
                <Text style={styles.scaleLabelName}>Obese</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 2. BMI Calculation Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>BMI Calculation</Text>
            <TouchableOpacity
              onPress={() => setShowInfoModal(true)}
              style={styles.infoIconContainer}
              activeOpacity={0.6}
            >
              <Text style={styles.infoIcon}>ⓘ</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.calcRow}>
            {/* Weight Box */}
            <View style={styles.calcBox}>
              <Text style={styles.calcBoxLabel}>Weight</Text>
              <Text style={styles.calcBoxValue}>{weight} kg</Text>
            </View>

            <Text style={styles.calcOperator}>÷</Text>

            {/* Height Squared Box */}
            <View style={styles.calcBox}>
              <Text style={styles.calcBoxLabel}>Height²</Text>
              <Text style={styles.calcBoxValue}>({meters.toFixed(2)} m²)</Text>
            </View>

            <Text style={styles.calcOperator}>=</Text>

            {/* BMI Box */}
            <View style={styles.calcBox}>
              <Text style={styles.calcBoxLabel}>BMI</Text>
              <Text style={styles.calcBoxValue}>{bmiStr}</Text>
            </View>
          </View>

          <Text style={styles.formulaText}>
            {weight} kg ÷ ({meters.toFixed(2)} m × {meters.toFixed(2)} m) = {bmiStr}
          </Text>
          <Text style={styles.formulaSubText}>Formula: weight (kg) ÷ height² (m²)</Text>
        </View>

        {/* 3. Personalized Insights Card */}
        <View style={styles.card}>
          <Text style={styles.insightsTitle}>Your Insights</Text>

          <View style={styles.insightsList}>
            {insights.map((item, idx) => {
              const badgeColors = getBadgeColors(item.badgeStyle);
              return (
                <View key={idx} style={styles.insightRow}>
                  <View style={styles.insightIconContainer}>
                    <Text style={styles.insightIconText}>{item.icon}</Text>
                  </View>
                  <View style={styles.insightTextContainer}>
                    <Text style={styles.insightRowTitle}>{item.title}</Text>
                    <Text style={styles.insightRowDesc}>{item.description}</Text>
                  </View>
                  <View
                    style={[
                      styles.insightBadge,
                      { backgroundColor: badgeColors.bg },
                    ]}
                  >
                    <Text style={[styles.insightBadgeText, { color: badgeColors.text }]}>
                      {item.badgeText}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          <View style={styles.insightsDivider} />

          <Text style={styles.disclaimerText}>
            Note: BMI is a general indicator and may not reflect muscle mass, bone density, or body composition.
          </Text>
        </View>

        {/* Confirmation Section */}
        <View style={styles.confirmSection}>
          <Text style={styles.confirmTitle}>Everything correct?</Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={onNext} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Proceed</Text>
          <Text style={styles.buttonArrow}> →</Text>
        </TouchableOpacity>

        <View style={styles.dotsContainer}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>

      {/* Info Explanation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showInfoModal}
        onRequestClose={() => setShowInfoModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>About BMI</Text>
            <Text style={styles.modalBody}>
              BMI is a general health indicator calculated using height and weight. It helps estimate whether a person falls within a healthy weight range, but it does not account for muscle mass, bone density, or body composition.
            </Text>
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setShowInfoModal(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.modalCloseBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingBottom: s(24),
  },
  title: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: s(32),
    color: '#000000',
    textAlign: 'center',
    lineHeight: s(40),
    letterSpacing: s(-0.5),
    marginBottom: s(8),
    marginTop: s(12),
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: s(16),
    color: '#4A4A4A',
    textAlign: 'center',
    marginBottom: s(24),
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: s(24),
    borderWidth: 1.5,
    borderColor: '#DCD8D0',
    padding: s(24),
    marginBottom: s(16),
    shadowColor: '#4E5836',
    shadowOffset: { width: 0, height: s(4) },
    shadowOpacity: 0.03,
    shadowRadius: s(8),
    // @ts-ignore
    boxShadow: `0 ${s(4)}px ${s(8)}px rgba(78, 88, 54, 0.03)`,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s(6),
    marginBottom: s(16),
  },
  cardTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: s(14),
    color: '#000000',
  },
  infoIconContainer: {
    padding: s(2),
  },
  infoIcon: {
    fontSize: s(15),
    color: '#6F6C66',
  },
  bmiDisplayContainer: {
    alignItems: 'center',
    marginBottom: s(20),
  },
  bmiValue: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: s(52),
    color: '#4E5836',
    lineHeight: s(60),
  },
  bmiCategory: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: s(20),
    color: '#4E5836',
    marginBottom: s(8),
  },
  bmiMessage: {
    fontFamily: 'Inter_400Regular',
    fontSize: s(14),
    color: '#4A4A4A',
    textAlign: 'center',
    paddingHorizontal: s(8),
  },
  scaleContainer: {
    width: '100%',
    marginTop: s(10),
  },
  scaleBar: {
    flexDirection: 'row',
    height: s(8),
    width: '100%',
    position: 'relative',
    marginBottom: s(12),
  },
  scaleSegment: {
    flex: 1,
    height: '100%',
  },
  scalePointer: {
    position: 'absolute',
    top: s(-5),
    width: s(18),
    height: s(18),
    borderRadius: s(9),
    backgroundColor: '#FAF6F0',
    borderWidth: 2,
    borderColor: '#4E5836',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: s(-9), // offset by radius
  },
  scalePointerInner: {
    width: s(8),
    height: s(8),
    borderRadius: s(4),
    backgroundColor: '#4E5836',
  },
  scaleLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  scaleLabelCol: {
    width: '24%',
    alignItems: 'center',
  },
  scaleLabelVal: {
    fontFamily: 'Inter_700Bold',
    fontSize: s(10),
    color: '#7C7E85',
    marginBottom: s(2),
  },
  scaleLabelName: {
    fontFamily: 'Inter_400Regular',
    fontSize: s(9),
    color: '#7C7E85',
    textAlign: 'center',
  },
  calcRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: s(16),
  },
  calcBox: {
    flex: 1,
    height: s(64),
    borderWidth: 1,
    borderColor: '#DCD8D0',
    borderRadius: s(12),
    backgroundColor: 'rgba(250, 246, 240, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calcBoxLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: s(11),
    color: '#6F6C66',
    marginBottom: s(2),
  },
  calcBoxValue: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: s(15),
    color: '#000000',
  },
  calcOperator: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: s(22),
    color: '#7C7E85',
    width: s(24),
    textAlign: 'center',
  },
  formulaText: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: s(14),
    color: '#000000',
    textAlign: 'center',
    marginBottom: s(4),
  },
  formulaSubText: {
    fontFamily: 'Inter_400Regular',
    fontSize: s(11),
    color: '#7C7E85',
    textAlign: 'center',
  },
  insightsTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: s(18),
    color: '#000000',
    textAlign: 'center',
    marginBottom: s(20),
  },
  insightsList: {
    width: '100%',
    gap: s(14),
  },
  insightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  insightIconContainer: {
    width: s(36),
    height: s(36),
    borderRadius: s(18),
    backgroundColor: 'rgba(78, 88, 54, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: s(12),
  },
  insightIconText: {
    fontSize: s(16),
  },
  insightTextContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: s(8),
  },
  insightRowTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: s(13),
    color: '#000000',
    marginBottom: s(1),
  },
  insightRowDesc: {
    fontFamily: 'Inter_400Regular',
    fontSize: s(11),
    color: '#6F6C66',
  },
  insightBadge: {
    paddingHorizontal: s(10),
    paddingVertical: s(4),
    borderRadius: s(8),
  },
  insightBadgeText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: s(11),
  },
  insightsDivider: {
    height: 1,
    backgroundColor: '#ECEAE4',
    marginVertical: s(16),
  },
  disclaimerText: {
    fontFamily: 'Inter_400Regular',
    fontSize: s(11),
    color: '#7C7E85',
    lineHeight: s(16),
    textAlign: 'center',
  },
  confirmSection: {
    alignItems: 'center',
    marginVertical: s(16),
  },
  confirmTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: s(16),
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: s(24),
  },
  modalContent: {
    width: '100%',
    maxWidth: s(340),
    backgroundColor: '#FFFFFF',
    borderRadius: s(24),
    borderWidth: 1.5,
    borderColor: '#DCD8D0',
    padding: s(24),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  modalTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: s(20),
    color: '#000000',
    marginBottom: s(12),
  },
  modalBody: {
    fontFamily: 'Inter_400Regular',
    fontSize: s(14),
    color: '#4A4A4A',
    lineHeight: s(20),
    textAlign: 'center',
    marginBottom: s(20),
  },
  modalCloseBtn: {
    backgroundColor: '#4E5836',
    paddingHorizontal: s(24),
    paddingVertical: s(10),
    borderRadius: s(12),
  },
  modalCloseBtnText: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: s(14),
    color: '#FAF6F0',
  },
});
