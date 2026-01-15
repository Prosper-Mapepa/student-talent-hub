import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Image,
  Animated,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '../../store';
import { apiService } from '../../services/api';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../types';

const { width, height } = Dimensions.get('window');
const isTablet = width >= 768 || (Platform.OS === 'ios' && Platform.isPad);
const isLargeTablet = width >= 1024;

const ForgotPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isEmailSent, setIsEmailSent] = useState(false);

  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(20))[0];
  const logoScaleAnim = useState(new Animated.Value(0.8))[0];
  const formSlideAnim = useState(new Animated.Value(30))[0];

  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'ForgotPassword'>>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Smooth fade-in animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(logoScaleAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(formSlideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await apiService.forgotPassword(email);
      setIsEmailSent(true);
      Alert.alert(
        'Reset Link Sent',
        'If an account with this email exists, you will receive a password reset link shortly.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.fullScreen}>
      <StatusBar barStyle="light-content" backgroundColor="#8F1A27" translucent />
      <LinearGradient
        colors={['#8F1A27', '#6A0032', '#8F1A27']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <ScrollView 
              contentContainerStyle={[styles.scrollContent, isTablet && styles.scrollContentTablet]}
              showsVerticalScrollIndicator={false}
            >
              {/* Futuristic Background Elements */}
              <View style={styles.backgroundElements}>
                <View style={styles.geometricShape1} />
                <View style={styles.geometricShape2} />
                <View style={styles.geometricShape3} />
              </View>

              {/* Header Section */}
              <Animated.View 
                style={[
                  styles.header,
                  {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }]
                  }
                ]}
              >
                <Animated.View 
                  style={[
                    styles.logoContainer,
                    {
                      transform: [{ scale: logoScaleAnim }]
                    }
                  ]}
                >
                  <View style={styles.logoGlow} />
                  <Image 
                    source={require('../../../assets/ss.png')} 
                    style={styles.logo} 
                  />
                </Animated.View>
                
                <Animated.Text 
                  style={[
                    styles.title,
                    {
                      opacity: fadeAnim,
                      transform: [{ translateY: slideAnim }]
                    }
                  ]}
                >
                  CMU <Text style={styles.title2}>TALENT</Text>HUB
                </Animated.Text>
                
                <Animated.Text 
                  style={[
                    styles.subtitle,
                    {
                      opacity: fadeAnim,
                      transform: [{ translateY: slideAnim }]
                    }
                  ]}
                >
                  Reset your Password
                </Animated.Text>
              </Animated.View>

              {/* Form */}
              <Animated.View 
                style={[
                  styles.form,
                  isTablet && styles.formTablet,
                  {
                    opacity: fadeAnim,
                    transform: [{ translateY: formSlideAnim }]
                  }
                ]}
              >
                <Text style={styles.formDescription}>
                  Enter your email address and we'll send you a link to reset your password.
                </Text>

                <View style={styles.inputContainer}>
                  <Ionicons name="mail-outline" size={isTablet ? (isLargeTablet ? 28 : 26) : 20} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    placeholderTextColor="#666"
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
                {errors.email && <Text style={styles.fieldError}>{errors.email}</Text>}

                <TouchableOpacity
                  style={[styles.resetButton, isLoading && styles.disabledButton]}
                  onPress={handleResetPassword}
                  disabled={isLoading}
                >
                  <LinearGradient
                    colors={['#8F1A27', '#6A0032', '#8F1A27']}
                    style={styles.buttonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    {isLoading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.resetButtonText}>Send Reset Link</Text>
                    )}
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.backButton}
                  onPress={handleBackToLogin}
                >
                  <Ionicons name="arrow-back-outline" size={isTablet ? (isLargeTablet ? 28 : 26) : 20} color="#8F1A27" />
                  <Text style={styles.backButtonText}>Back to Login</Text>
                </TouchableOpacity>
              </Animated.View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: Platform.OS === 'ios' ? 0 : 40,
  },
  scrollContentTablet: {
    paddingHorizontal: isLargeTablet ? 100 : 80,
    maxWidth: isLargeTablet ? 700 : 600,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    alignItems: 'center',
    marginTop: isTablet ? (isLargeTablet ? 40 : 50) : 60,
    marginBottom: isTablet ? (isLargeTablet ? 50 : 45) : 40,
    zIndex: 1,
  },
  logoContainer: {
    position: 'relative',
    marginBottom: isTablet ? (isLargeTablet ? 50 : 40) : 30,
  },
  logo: {
    width: isTablet ? (isLargeTablet ? 280 : 240) : 170, 
    height: isTablet ? (isLargeTablet ? 200 : 170) : 120,
    borderRadius: 25,
    zIndex: 2,
  },
  logoGlow: {
    position: 'absolute',
    top: -9,
    left: -9,
    right: -9,
    bottom: -9,
    // borderRadius: 100,
    // backgroundColor: '#FFFFFF',
    zIndex: 1,
  },
  title: {
    fontSize: isTablet ? (isLargeTablet ? 56 : 48) : 28,
    fontWeight: 'bold',
    color: '#FFC540',
    marginBottom: isTablet ? 12 : 8,
    textAlign: 'center',
    textShadowColor: '#FFC540',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    letterSpacing: 2,
  },
  title2: {
    color: '#ffffff',
  },
  subtitle: {
    fontSize: isTablet ? (isLargeTablet ? 22 : 20) : 14,
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 1,
  },
  form: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: isTablet ? (isLargeTablet ? 50 : 45) : 30,
    paddingHorizontal: isTablet ? (isLargeTablet ? 45 : 40) : 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
  },
  formTablet: {
    maxWidth: isLargeTablet ? 650 : 550,
    alignSelf: 'center',
    width: '100%',
  },
  formDescription: {
    fontSize: isTablet ? (isLargeTablet ? 20 : 19) : 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: isTablet ? (isLargeTablet ? 28 : 26) : 24,
    lineHeight: isTablet ? (isLargeTablet ? 28 : 26) : 22,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: isTablet ? (isLargeTablet ? 24 : 22) : 16,
    backgroundColor: '#f8f9fa',
    height: isTablet ? (isLargeTablet ? 70 : 64) : 52,
    marginBottom: isTablet ? (isLargeTablet ? 24 : 22) : 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: isTablet ? (isLargeTablet ? 20 : 19) : 16,
    color: '#333',
    height: '100%',
  },
  fieldError: {
    color: '#ff4444',
    fontSize: isTablet ? (isLargeTablet ? 14 : 13) : 12,
    marginTop: -12,
    marginBottom: 8,
    marginLeft: 4,
  },
  resetButton: {
    borderRadius: 12,
    height: isTablet ? (isLargeTablet ? 70 : 64) : 52,
    overflow: 'hidden',
    shadowColor: '#8F1A27',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: isTablet ? (isLargeTablet ? 28 : 26) : 20,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  resetButtonText: {
    color: 'white',
    fontSize: isTablet ? (isLargeTablet ? 22 : 20) : 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: isTablet ? 16 : 12,
  },
  backButtonText: {
    color: '#8F1A27',
    fontSize: isTablet ? (isLargeTablet ? 18 : 17) : 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  backgroundElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  geometricShape1: {
    position: 'absolute',
    top: 100,
    right: -50,
    width: 100,
    height: 100,
    backgroundColor: 'rgba(255, 197, 64, 0.1)',
    borderRadius: 20,
    transform: [{ rotate: '45deg' }],
  },
  geometricShape2: {
    position: 'absolute',
    bottom: 200,
    left: -30,
    width: 80,
    height: 80,
    backgroundColor: 'rgba(143, 26, 39, 0.1)',
    borderRadius: 40,
  },
  geometricShape3: {
    position: 'absolute',
    top: 300,
    left: 50,
    width: 60,
    height: 60,
    backgroundColor: 'rgba(106, 0, 50, 0.1)',
    borderRadius: 30,
    transform: [{ rotate: '30deg' }],
  },
});

export default ForgotPasswordScreen; 