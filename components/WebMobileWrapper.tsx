import React from 'react';
import { StyleSheet, View, Text, Platform, StatusBar } from 'react-native';

interface WebMobileWrapperProps {
  children: React.ReactNode;
}

export default function WebMobileWrapper({ children }: WebMobileWrapperProps) {
  if (Platform.OS !== 'web') {
    return (
      <View style={styles.nativeContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#FAF6F0" />
        <View style={styles.phoneContent}>
          {children}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.webViewport}>
      {/* Background backdrop decoration for web */}
      <View style={styles.backgroundDecor1} />
      <View style={styles.backgroundDecor2} />
      
      <View style={styles.phoneContainer}>
        {/* Notch */}
        <View style={styles.notch} />

        {/* Mock Status Bar */}
        <View style={styles.mockStatusBar}>
          <Text style={styles.mockTime}>9:41</Text>
          <View style={styles.mockIcons}>
            {/* Signal Strength Icon */}
            <View style={styles.signalIcon}>
              <View style={[styles.signalBar, { height: 4 }]} />
              <View style={[styles.signalBar, { height: 6 }]} />
              <View style={[styles.signalBar, { height: 8 }]} />
              <View style={[styles.signalBar, { height: 10 }]} />
            </View>
            {/* WiFi Icon Mock */}
            <Text style={styles.statusText}>wifi</Text>
            {/* Battery Icon */}
            <View style={styles.batteryIcon}>
              <View style={styles.batteryBody} />
              <View style={styles.batteryTip} />
            </View>
          </View>
        </View>

        {/* App Content */}
        <View style={styles.phoneContent}>
          {children}
        </View>

        {/* Mock Home Indicator */}
        <View style={styles.homeIndicatorContainer}>
          <View style={styles.homeIndicator} />
        </View>
      </View>

      <Text style={styles.webInstructions}>
        FourSets Onboarding • Mobile Preview Shell
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  nativeContainer: {
    flex: 1,
    backgroundColor: '#FAF6F0',
  },
  webViewport: {
    width: '100vw' as any,
    height: '100vh' as any,
    backgroundColor: '#111318',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    fontFamily: 'system-ui, sans-serif',
  },
  backgroundDecor1: {
    position: 'absolute',
    width: 600,
    height: 600,
    borderRadius: 300,
    backgroundColor: 'rgba(78, 88, 54, 0.15)',
    top: '-10%',
    left: '-10%',
    filter: 'blur(100px)',
  },
  backgroundDecor2: {
    position: 'absolute',
    width: 500,
    height: 500,
    borderRadius: 250,
    backgroundColor: 'rgba(40, 40, 45, 0.4)',
    bottom: '-10%',
    right: '-10%',
    filter: 'blur(100px)',
  },
  phoneContainer: {
    width: 436, // 412px logical width + 24px (12px borders)
    height: 948, // 924px logical height + 24px (12px borders)
    borderRadius: 40,
    backgroundColor: '#FAF6F0',
    borderWidth: 12,
    borderColor: '#25262c',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.5,
    shadowRadius: 40,
    // Web only styling via standard box shadow
    // @ts-ignore
    boxShadow: '0 30px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
  },
  notch: {
    position: 'absolute',
    top: 15,
    left: '50%',
    transform: [{ translateX: -7 }],
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#25262c',
    zIndex: 100,
  },
  mockStatusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 44,
    paddingHorizontal: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 99,
  },
  mockTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  mockIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  signalIcon: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 1.5,
    height: 10,
  },
  signalBar: {
    width: 2.5,
    backgroundColor: '#1A1A1A',
    borderRadius: 0.5,
  },
  batteryIcon: {
    width: 20,
    height: 10,
    borderWidth: 1,
    borderColor: '#1A1A1A',
    borderRadius: 2.5,
    padding: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  batteryBody: {
    flex: 1,
    height: '100%',
    backgroundColor: '#1A1A1A',
    borderRadius: 1,
  },
  batteryTip: {
    width: 1.5,
    height: 4,
    backgroundColor: '#1A1A1A',
    borderTopRightRadius: 1,
    borderBottomRightRadius: 1,
    marginLeft: 1,
  },
  phoneContent: {
    flex: 1,
    paddingTop: 44, // Space for status bar
    paddingBottom: 34, // Space for home indicator
  },
  homeIndicatorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  homeIndicator: {
    width: 130,
    height: 5,
    backgroundColor: '#25262c',
    borderRadius: 2.5,
  },
  webInstructions: {
    marginTop: 20,
    color: '#7C7E85',
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});
