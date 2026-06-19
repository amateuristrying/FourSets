import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image, Dimensions } from 'react-native';

const SCALE = Platform.OS === 'web' ? 1.0 : 0.82;
const s = (val: number) => val * SCALE;

interface NameScreenProps {
  name: string;
  sex: 'Male' | 'Female' | 'Other' | null;
  avatarIndex: number | null;
  onChangeName: (name: string) => void;
  onChangeSex: (sex: 'Male' | 'Female' | 'Other') => void;
  onChangeAvatarIndex: (index: number | null) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function NameScreen({ name, sex, avatarIndex, onChangeName, onChangeSex, onChangeAvatarIndex, onNext, onBack }: NameScreenProps) {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if ((sex === 'Male' || sex === 'Female') && avatarIndex === null) {
      onChangeAvatarIndex(Math.floor(Math.random() * 3) + 1);
    }
  }, [sex, avatarIndex]);

  const handleSelectSex = (selectedSex: 'Male' | 'Female' | 'Other') => {
    onChangeSex(selectedSex);
    if (selectedSex === 'Male' || selectedSex === 'Female') {
      onChangeAvatarIndex(Math.floor(Math.random() * 3) + 1);
    } else {
      onChangeAvatarIndex(null);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      {/* Centered Image (Floating in background) */}
      <View style={styles.imageViewport} pointerEvents="none">
        <Image 
          source={require('../assets/crouching_man.png')}
          style={[
            styles.centeredImage,
            {
              transform: [
                { translateX: s(0) },
                { translateY: s(-224) },
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
          <Text style={styles.title}>What should we call you?</Text>
          <Text style={styles.subtitle}>We'll personalize your fitness journey.</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                isFocused && styles.inputFocused
              ]}
              placeholder="Enter your name"
              placeholderTextColor="#8F8C86"
              value={name}
              onChangeText={(text) => {
                if (text.length > 0) {
                  onChangeName(text.charAt(0).toUpperCase() + text.slice(1));
                } else {
                  onChangeName('');
                }
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              autoCapitalize="words"
            />
          </View>

          {/* Double-lined circular icon */}
          <View style={styles.iconContainer}>
            <View style={styles.outerCircle}>
              <View style={styles.innerCircle}>
                {sex === 'Male' && avatarIndex !== null && (
                  <Image
                    source={
                      avatarIndex === 1
                        ? require('../assets/male_avatar_1.png')
                        : avatarIndex === 2
                        ? require('../assets/male_avatar_2.png')
                        : require('../assets/male_avatar_3.png')
                    }
                    style={[
                      styles.avatarImage,
                      {
                        width: avatarIndex === 1 
                          ? s(74) * 1.40 
                          : s(74) * 1.79,
                        height: avatarIndex === 1 
                          ? s(74) * 1.40 
                          : s(74) * 1.79,
                      }
                    ]}
                  />
                )}
                {sex === 'Female' && avatarIndex !== null && (
                  <Image
                    source={
                      avatarIndex === 1
                        ? require('../assets/female_avatar_1.png')
                        : avatarIndex === 2
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
                {sex === 'Other' && (
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
          </View>

          {/* Sex Selection — three inline buttons, no label */}
          <View style={styles.sexRow}>
            <TouchableOpacity
              style={[styles.sexButton, sex === 'Male' && styles.sexButtonActive]}
              onPress={() => handleSelectSex('Male')}
              activeOpacity={0.8}
            >
              <Text style={[styles.sexButtonText, sex === 'Male' && styles.sexButtonTextActive]}>
                Male
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.sexButton, sex === 'Female' && styles.sexButtonActive]}
              onPress={() => handleSelectSex('Female')}
              activeOpacity={0.8}
            >
              <Text style={[styles.sexButtonText, sex === 'Female' && styles.sexButtonTextActive]}>
                Female
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.sexButton, sex === 'Other' && styles.sexButtonActive]}
              onPress={() => handleSelectSex('Other')}
              activeOpacity={0.8}
            >
              <Text style={[styles.sexButtonText, sex === 'Other' && styles.sexButtonTextActive]}>
                Others+
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.button, (!name.trim() || !sex) && styles.buttonDisabled]} 
          onPress={onNext} 
          disabled={!name.trim() || !sex}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Continue</Text>
          <Text style={styles.buttonArrow}> →</Text>
        </TouchableOpacity>

        <View style={styles.dotsContainer}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
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
  inputContainer: {
    width: '100%',
    paddingHorizontal: s(4),
  },
  sexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: s(10),
    marginTop: s(20),
    paddingHorizontal: s(4),
  },
  sexButton: {
    flex: 1,
    height: s(50),
    borderRadius: s(14),
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderColor: '#DCD8D0',
  },
  sexButtonActive: {
    backgroundColor: '#4E5836',
    borderColor: '#4E5836',
  },
  sexButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: s(14),
    color: '#000000',
  },
  sexButtonTextActive: {
    color: '#FAF6F0',
  },
  input: {
    width: '100%',
    height: s(56),
    borderWidth: 1.5,
    borderColor: '#DCD8D0',
    borderRadius: s(16),
    paddingHorizontal: s(16),
    fontSize: s(16),
    fontFamily: 'Inter_400Regular',
    color: '#000000',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  inputFocused: {
    borderColor: '#4E5836',
    borderWidth: 2,
    backgroundColor: '#FFFFFF',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: s(20),
  },
  outerCircle: {
    width: s(86),
    height: s(86),
    borderRadius: s(43),
    borderWidth: 1.5,
    borderColor: '#DCD8D0',
    justifyContent: 'center',
    alignItems: 'center',
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
