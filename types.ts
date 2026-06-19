export type ScreenType = 'welcome' | 'name' | 'profile' | 'body' | 'bmi' | 'physique' | 'goal' | 'training' | 'summary' | 'signup' | 'signin';

export interface OnboardingData {
  name: string;
  birthDay: number;
  birthMonth: number;
  birthYear: number;
  sex: 'Male' | 'Female' | 'Other' | null;
  height: string; // formatted e.g., 6'0" or 5'11"
  weight: number; // in kg
  diet: 'Herbivore' | 'Omnivore' | 'Carnivore' | null;
  physique: number | null;
  goal: 'Build Muscle' | 'Lose Fat' | 'Get Stronger' | 'Improve Fitness' | null;
  workoutHours: number;
  workoutMinutes: number;
  trainDays: number;
  hasGymAccess: boolean;
  avatarIndex: number | null;
}

export const INITIAL_ONBOARDING_DATA: OnboardingData = {
  name: '',
  birthDay: 1,
  birthMonth: 1,
  birthYear: 2008,
  sex: null, // User must explicitly select on NameScreen
  height: `6'0"`, // Default to match height in screenshot
  weight: 60, // Default to match weight in screenshot
  diet: null, // Default to null (initially no selection)
  physique: null,
  goal: 'Build Muscle', // Default to match goal in screenshot
  workoutHours: 0,
  workoutMinutes: 45, // Default 45 mins per workout
  trainDays: 3, // Default 3 days per week
  hasGymAccess: true, // Default to true
  avatarIndex: null,
};
