import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { OnboardingData } from '../types';

const SCALE = Platform.OS === 'web' ? 1.0 : 0.82;
const s = (val: number) => val * SCALE;

interface SummaryScreenProps {
  data: OnboardingData;
  onReset: () => void;
  onBack: () => void;
}

export default function SummaryScreen({ data, onReset, onBack }: SummaryScreenProps) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>All Set, {data.name}!</Text>
        <Text style={styles.subtitle}>Here is your personalized fitness profile.</Text>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarSection}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {data.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text style={styles.profileName}>{data.name}</Text>
            <Text style={styles.profileGoalBadge}>{data.goal}</Text>
          </View>

          <View style={styles.divider} />

          {/* Grid details */}
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Age</Text>
              <Text style={styles.detailValue}>{data.age} years</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Sex</Text>
              <Text style={styles.detailValue}>{data.sex}</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Height</Text>
              <Text style={styles.detailValue}>{data.height}</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Weight</Text>
              <Text style={styles.detailValue}>{data.weight} kg</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Dietary Preference</Text>
              <Text style={styles.detailValue}>{data.diet}</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Physique Type</Text>
              <Text style={styles.detailValue}>Option {data.physique ?? 'Not selected'}</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Workout Time</Text>
              <Text style={styles.detailValue}>
                {(data.workoutHours ?? 0) > 0 ? `${data.workoutHours}h ` : ''}
                {data.workoutMinutes ?? 45}m
              </Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Frequency</Text>
              <Text style={styles.detailValue}>{data.trainDays ?? 3} days/week</Text>
            </View>

            <View style={[styles.detailItem, { width: '100%' }]}>
              <Text style={styles.detailLabel}>Gym Access</Text>
              <Text style={styles.detailValue}>{(data.hasGymAccess ?? true) ? 'Yes' : 'No'}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.successMessage}>
          Your custom plan has been generated.{'\n'}Welcome to the clan.
        </Text>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={onReset} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Start Over</Text>
        </TouchableOpacity>
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: s(24),
    paddingBottom: s(24),
  },
  title: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: s(32),
    color: '#000000',
    textAlign: 'center',
    letterSpacing: s(-0.5),
    marginBottom: s(8),
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: s(16),
    color: '#4A4A4A',
    textAlign: 'center',
    marginBottom: s(24),
  },
  profileCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: s(24),
    borderWidth: 1.5,
    borderColor: '#DCD8D0',
    padding: s(24),
    shadowColor: '#4E5836',
    shadowOffset: { width: 0, height: s(6) },
    shadowOpacity: 0.05,
    shadowRadius: s(12),
    // @ts-ignore
    boxShadow: `0 ${s(6)}px ${s(16)}px rgba(78, 88, 54, 0.05)`,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: s(20),
  },
  avatar: {
    width: s(70),
    height: s(70),
    borderRadius: s(35),
    backgroundColor: '#4E5836',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: s(12),
  },
  avatarText: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: s(32),
    color: '#FAF6F0',
  },
  profileName: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: s(24),
    color: '#000000',
    marginBottom: s(4),
  },
  profileGoalBadge: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: s(12),
    color: '#4E5836',
    backgroundColor: 'rgba(78, 88, 54, 0.1)',
    paddingHorizontal: s(12),
    paddingVertical: s(4),
    borderRadius: s(12),
    overflow: 'hidden',
  },
  divider: {
    height: 1,
    backgroundColor: '#ECEAE4',
    marginVertical: s(4),
    marginBottom: s(20),
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: s(16),
  },
  detailItem: {
    width: '50%',
  },
  detailLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: s(13),
    color: '#7C7E85',
    marginBottom: s(2),
  },
  detailValue: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: s(16),
    color: '#000000',
  },
  successMessage: {
    fontFamily: 'Inter_400Regular',
    fontSize: s(15),
    color: '#4A4A4A',
    textAlign: 'center',
    lineHeight: s(22),
    marginTop: s(28),
  },
  footer: {
    paddingBottom: s(24),
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4E5836',
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
});
