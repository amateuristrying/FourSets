import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Image } from 'react-native';
import { OnboardingData } from '../types';

const SCALE = Platform.OS === 'web' ? 1.0 : 0.82;
const s = (val: number) => val * SCALE;

interface SignupScreenProps {
  data: OnboardingData;
  onBack: () => void;
}

export default function SignupScreen({ data, onBack }: SignupScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Title & Subtitle */}
        <Text style={styles.title}>Create Your Gymbros Account</Text>
        <Text style={styles.subtitle}>
          Save your personalized plan{'\n'}and continue your fitness journey.
        </Text>

        {/* Avatar Section with Sparkles */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            {/* 3 Sparkles absolute positioned around the circle */}
            <Text style={[styles.sparkle, styles.sparkleTopLeft]}>✦</Text>
            <Text style={[styles.sparkle, styles.sparkleTopRight]}>✦</Text>
            <Text style={[styles.sparkle, styles.sparkleBottomLeft]}>✦</Text>

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
                          ? s(86) * 1.40 
                          : s(86) * 1.79,
                        height: data.avatarIndex === 1 
                          ? s(86) * 1.40 
                          : s(86) * 1.79,
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
                        width: s(86) * 1.68,
                        height: s(86) * 1.68,
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
                        width: s(86) * 1.30 + 3,
                        height: s(86) * 1.30 + 3,
                      }
                    ]}
                  />
                )}
              </View>
            </View>
          </View>
        </View>

        {/* Card Form Container */}
        <View style={styles.cardContainer}>
          {/* Continue with Google */}
          <TouchableOpacity style={styles.googleButton} activeOpacity={0.85}>
            <View style={styles.googleLogoContainer}>
              <Text style={{ color: '#EA4335', fontSize: s(16), fontWeight: 'bold' }}>G</Text>
            </View>
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* OR Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Email Address Input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputIcon}>✉</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Email address"
              placeholderTextColor="#A09C94"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputIcon}>🔒</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              placeholderTextColor="#A09C94"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity 
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
              activeOpacity={0.7}
            >
              <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
            </TouchableOpacity>
          </View>

          {/* Create Account Button */}
          <TouchableOpacity style={styles.createButton} activeOpacity={0.85}>
            <Text style={styles.createButtonText}>Create Account</Text>
            <Text style={styles.createButtonArrow}> →</Text>
          </TouchableOpacity>

          {/* Already have an account? Sign In */}
          <View style={styles.signInRow}>
            <Text style={styles.signInTextPrefix}>Already have an account? </Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.signInTextLink}>Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* Disclaimer terms */}
          <Text style={styles.disclaimerText}>
            By signing up, you agree to our <Text style={styles.boldDisclaimer}>Terms of Service</Text>{'\n'}and <Text style={styles.boldDisclaimer}>Privacy Policy</Text>.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF6F0',
    paddingHorizontal: s(24),
  },
  header: {
    height: s(50),
    flexDirection: 'row',
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
    alignItems: 'center',
    paddingBottom: s(32),
  },
  title: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: s(28),
    color: '#000000',
    textAlign: 'center',
    letterSpacing: s(-0.5),
    lineHeight: s(36),
    marginBottom: s(8),
    marginTop: s(8),
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: s(14),
    color: '#4A4A4A',
    textAlign: 'center',
    lineHeight: s(20),
    marginBottom: s(24),
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: s(16),
  },
  avatarWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerCircle: {
    width: s(100),
    height: s(100),
    borderRadius: s(50),
    borderWidth: 1.5,
    borderColor: '#E6E2DA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: s(86),
    height: s(86),
    borderRadius: s(43),
    borderWidth: 1.5,
    borderColor: '#E6E2DA',
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
  sparkle: {
    position: 'absolute',
    fontSize: s(14),
    color: '#C0BAAF',
    fontFamily: 'Inter_600SemiBold',
  },
  sparkleTopLeft: {
    top: s(12),
    left: s(-15),
  },
  sparkleTopRight: {
    top: s(22),
    right: s(-22),
  },
  sparkleBottomLeft: {
    bottom: s(15),
    left: s(-22),
  },
  cardContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: s(28),
    borderWidth: 1.5,
    borderColor: '#E6E2DA',
    paddingHorizontal: s(20),
    paddingVertical: s(24),
    shadowColor: '#4E5836',
    shadowOffset: { width: 0, height: s(6) },
    shadowOpacity: 0.04,
    shadowRadius: s(12),
    // @ts-ignore
    boxShadow: `0 ${s(6)}px ${s(16)}px rgba(78, 88, 54, 0.04)`,
  },
  googleButton: {
    flexDirection: 'row',
    height: s(50),
    borderRadius: s(12),
    borderWidth: 1,
    borderColor: '#DCD8D0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: s(16),
  },
  googleLogoContainer: {
    width: s(24),
    height: s(24),
    borderRadius: s(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: s(8),
    borderWidth: 1,
    borderColor: '#ECEAE4',
  },
  googleButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: s(14),
    color: '#000000',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: s(16),
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ECEAE4',
  },
  dividerText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: s(11),
    color: '#A09C94',
    marginHorizontal: s(12),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: s(50),
    borderRadius: s(12),
    borderWidth: 1,
    borderColor: '#ECEAE4',
    paddingHorizontal: s(16),
    marginBottom: s(12),
    backgroundColor: '#FAF6F0',
  },
  inputIcon: {
    fontSize: s(16),
    marginRight: s(10),
    color: '#7C7E85',
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontFamily: 'Inter_400Regular',
    fontSize: s(14),
    color: '#000000',
  },
  eyeButton: {
    padding: s(4),
  },
  eyeIcon: {
    fontSize: s(16),
    color: '#7C7E85',
  },
  createButton: {
    backgroundColor: '#4E5836',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: s(52),
    borderRadius: s(14),
    marginTop: s(4),
    marginBottom: s(16),
  },
  createButtonText: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: s(16),
    color: '#FAF6F0',
  },
  createButtonArrow: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: s(16),
    color: '#FAF6F0',
  },
  signInRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: s(16),
  },
  signInTextPrefix: {
    fontFamily: 'Inter_400Regular',
    fontSize: s(13),
    color: '#7C7E85',
  },
  signInTextLink: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: s(13),
    color: '#4E5836',
  },
  disclaimerText: {
    fontFamily: 'Inter_400Regular',
    fontSize: s(11),
    color: '#A09C94',
    textAlign: 'center',
    lineHeight: s(16),
  },
  boldDisclaimer: {
    fontFamily: 'Inter_600SemiBold',
    color: '#4E5836',
  },
});
