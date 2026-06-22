import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../types';
import { LinearGradient } from 'expo-linear-gradient';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../theme';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'WelcomeHome'>>();
  const videoRef = useRef<Video>(null);

  const handleContinue = () => {
    navigation.navigate('WelcomeHome');
  };

  return (
    <View style={styles.fullScreen}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <Video
        ref={videoRef}
        source={require('../../../assets/v2.mp4')}
        style={styles.videoBackground}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        isMuted
        volume={0}
      />
      {/* Clean, bright filter: light wash so video stays vivid */}
      <View style={styles.videoFilterOverlay} pointerEvents="none">
        <LinearGradient
          colors={[
            'rgba(255, 255, 255, 0.12)',
            'rgba(255, 248, 240, 0.08)',
            'rgba(255, 255, 255, 0.1)',
          ]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
        <LinearGradient
          colors={['transparent', 'transparent', 'rgba(0,0,0,0.15)']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
      </View>
      <View style={styles.tapArea} pointerEvents="box-none">
        <TouchableOpacity
          style={styles.continueHint}
          onPress={handleContinue}
          activeOpacity={0.8}
          accessible
          accessibilityRole="button"
          accessibilityLabel="Continue to next screen"
        >
          <Ionicons name="chevron-forward" size={32} color="rgba(255,255,255,0.9)" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  videoBackground: {
    ...StyleSheet.absoluteFillObject,
    width: screenWidth,
    height: screenHeight,
  },
  videoFilterOverlay: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  tapArea: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 50 : 40,
  },
  continueHint: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(15, 110, 86, 0.45)',
    borderWidth: 1,
    borderColor: 'rgba(228, 180, 41, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WelcomeScreen;
