import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Platform, Image } from 'react-native';
import { OnboardingData } from '../types';

const SCALE = Platform.OS === 'web' ? 1.0 : 0.82;
const s = (val: number) => val * SCALE;

interface SummaryScreenProps {
  data: OnboardingData;
  onSignUp: () => void;
  onBack: () => void;
}

export default function SummaryScreen({ data, onSignUp, onBack }: SummaryScreenProps) {
  const calculateAge = () => {
    const today = new Date();
    let age = today.getFullYear() - data.birthYear;
    const monthDiff = today.getMonth() + 1 - data.birthMonth;
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < data.birthDay)) {
      age--;
    }
    return Math.max(0, age);
  };
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
            <View style={styles.outerCircle}>
              <View style={styles.innerCircle}>
                {data.sex === 'Male' && data.avatarIndex !== null && (
                  <Image
                    source={
                      data.avatarIndex === 1
                        ? require('../assets/male_avatar_1.png')
                        : data.avatarIndex === 2
                        ? require('../assets/male_avatar_2.png')
                        : require('../assets/male_avatar_3.png')
                    }
                    style={[
                      styles.avatarImage,
                      {
                        width: data.avatarIndex === 1 
                          ? s(74) * 1.40 
                          : s(74) * 1.79,
                        height: data.avatarIndex === 1 
                          ? s(74) * 1.40 
                          : s(74) * 1.79,
                      }
                    ]}
                  />
                )}
                {data.sex === 'Female' && data.avatarIndex !== null && (
                  <Image
                    source={
                      data.avatarIndex === 1
                        ? require('../assets/female_avatar_1.png')
                        : data.avatarIndex === 2
                        ? require('../assets/female_avatar_2.png')
                        : require('../assets/female_avatar_3.png')
                    }
                    style={[
                      styles.avatarImage,
                      {
                        width: s(74) * 1.68,
                        height: s(74) * 1.68,
                      }
                    ]}
                  />
                )}
                {data.sex === 'Other' && (
                  <Image
                    source={require('../assets/other_avatar.png')}
                    style={[
                      styles.avatarImage,
                      {
                        width: s(74) * 1.30 + 3,
                        height: s(74) * 1.30 + 3,
                      }
                    ]}
                  />
                )}
              </View>
            </View>
            <Text style={styles.profileName}>{data.name}</Text>
            <Text style={styles.profileGoalBadge}>{data.goal}</Text>
          </View>

          <View style={styles.divider} />

          {/* Grid details */}
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Age</Text>
              <Text style={styles.detailValue}>{calculateAge()} years</Text>
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
        <TouchableOpacity style={styles.button} onPress={onSignUp} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Sign up</Text>
          <Text style={styles.buttonArrow}> →</Text>
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
  outerCircle: {
    width: s(86),
    height: s(86),
    borderRadius: s(43),
    borderWidth: 1.5,
    borderColor: '#DCD8D0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: s(12),
  },
  innerCircle: {
    width: s(74),
    height: s(74),
    borderRadius: s(37),
    borderWidth: 1.5,
    borderColor: '#DCD8D0',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
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
});
