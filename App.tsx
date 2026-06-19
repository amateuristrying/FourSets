import React, { useState, useEffect, useRef } from 'react';
import { ActivityIndicator, StyleSheet, View, Animated } from 'react-native';
import { useFonts } from 'expo-font';

import WebMobileWrapper from './components/WebMobileWrapper';
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import NameScreen from './screens/NameScreen';
import ProfileScreen from './screens/ProfileScreen';
import BodyScreen from './screens/BodyScreen';
import BmiScreen from './screens/BmiScreen';
import GoalScreen from './screens/GoalScreen';
import SummaryScreen from './screens/SummaryScreen';
import TrainingScreen from './screens/TrainingScreen';
import PhysiqueScreen from './screens/PhysiqueScreen';
import SignupScreen from './screens/SignupScreen';
import { ScreenType, OnboardingData, INITIAL_ONBOARDING_DATA } from './types';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');
  const [data, setData] = useState<OnboardingData>(INITIAL_ONBOARDING_DATA);
  const [showSplash, setShowSplash] = useState(true);

  // Animation opacity value for screen transitions
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Initial splash screen timeout on app start
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Trigger screen fade-in animation on every navigation change
  useEffect(() => {
    if (showSplash) return;

    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 350, // smooth 350ms fade-in transition
      useNativeDriver: true,
    }).start();
  }, [currentScreen, showSplash]);

  // Load fonts locally
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold: require('./assets/fonts/PlayfairDisplay_700Bold.ttf'),
    Inter_400Regular: require('./assets/fonts/Inter_400Regular.ttf'),
    Inter_600SemiBold: require('./assets/fonts/Inter_600SemiBold.ttf'),
    Inter_700Bold: require('./assets/fonts/Inter_700Bold.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4E5836" />
      </View>
    );
  }

  // State update helpers
  const updateData = <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleReset = () => {
    setData(INITIAL_ONBOARDING_DATA);
    setCurrentScreen('welcome');
    setShowSplash(true);
    setTimeout(() => {
      setShowSplash(false);
    }, 2000);
  };

  const handleSignUpPress = () => {
    setShowSplash(true);
    setTimeout(() => {
      setCurrentScreen('signup');
      setShowSplash(false);
    }, 2000);
  };

  // Render current screen based on navigation state
  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onNext={() => setCurrentScreen('name')} onSignIn={() => setCurrentScreen('summary')} />;
      case 'name':
        return (
          <NameScreen
            name={data.name}
            sex={data.sex}
            avatarIndex={data.avatarIndex}
            onChangeName={(name) => updateData('name', name)}
            onChangeSex={(sex) => updateData('sex', sex)}
            onChangeAvatarIndex={(index) => updateData('avatarIndex', index)}
            onNext={() => setCurrentScreen('profile')}
            onBack={() => setCurrentScreen('welcome')}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            birthDay={data.birthDay}
            birthMonth={data.birthMonth}
            birthYear={data.birthYear}
            onChangeBirthDay={(d) => updateData('birthDay', d)}
            onChangeBirthMonth={(m) => updateData('birthMonth', m)}
            onChangeBirthYear={(y) => updateData('birthYear', y)}
            onNext={() => setCurrentScreen('body')}
            onBack={() => setCurrentScreen('name')}
          />
        );
      case 'body':
        return (
          <BodyScreen
            height={data.height}
            weight={data.weight}
            diet={data.diet}
            onChangeHeight={(h) => updateData('height', h)}
            onChangeWeight={(w) => updateData('weight', w)}
            onChangeDiet={(d) => updateData('diet', d)}
            onNext={() => setCurrentScreen('bmi')}
            onBack={() => setCurrentScreen('profile')}
          />
        );
      case 'bmi':
        return (
          <BmiScreen
            height={data.height}
            weight={data.weight}
            onNext={() => setCurrentScreen('physique')}
            onBack={() => setCurrentScreen('body')}
          />
        );
      case 'physique':
        return (
          <PhysiqueScreen
            physique={data.physique}
            onChangePhysique={(physique) => updateData('physique', physique)}
            onNext={() => setCurrentScreen('goal')}
            onBack={() => setCurrentScreen('bmi')}
          />
        );
      case 'goal':
        return (
          <GoalScreen
            goal={data.goal}
            onChangeGoal={(g) => updateData('goal', g)}
            onNext={() => setCurrentScreen('training')}
            onBack={() => setCurrentScreen('physique')}
          />
        );
      case 'training':
        return (
          <TrainingScreen
            workoutHours={data.workoutHours}
            workoutMinutes={data.workoutMinutes}
            trainDays={data.trainDays}
            hasGymAccess={data.hasGymAccess}
            onChangeHours={(hours) => updateData('workoutHours', hours)}
            onChangeMinutes={(mins) => updateData('workoutMinutes', mins)}
            onChangeDays={(days) => updateData('trainDays', days)}
            onChangeGymAccess={(access) => updateData('hasGymAccess', access)}
            onNext={() => setCurrentScreen('summary')}
            onBack={() => setCurrentScreen('goal')}
          />
        );
      case 'summary':
        return <SummaryScreen data={data} onSignUp={handleSignUpPress} onBack={() => setCurrentScreen('training')} />;
      case 'signup':
        return <SignupScreen data={data} onBack={() => setCurrentScreen('summary')} />;
      default:
        return <WelcomeScreen onNext={() => setCurrentScreen('name')} onSignIn={() => setCurrentScreen('summary')} />;
    }
  };

  return (
    <WebMobileWrapper>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <Animated.View style={[styles.fadeContainer, { opacity: fadeAnim }]}>
          {renderScreen()}
        </Animated.View>
      )}
    </WebMobileWrapper>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#FAF6F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fadeContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
