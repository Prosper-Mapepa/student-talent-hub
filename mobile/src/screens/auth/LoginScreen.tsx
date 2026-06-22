import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../types';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '../../store';
import { login, clearError } from '../../store/slices/authSlice';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import { COLORS, GRADIENTS } from '../../theme';
import AuthScreenLayout, { authFormStyles } from '../../components/auth/AuthScreenLayout';
import AuthBranding from '../../components/auth/AuthBranding';

const { width } = Dimensions.get('window');
const isTablet = width >= 768 || (Platform.OS === 'ios' && Platform.isPad);
const isLargeTablet = width >= 1024;

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [hasStoredCredentials, setHasStoredCredentials] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Login'>>();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const checkBiometricAvailability = async () => {
      try {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        const storedEmail = await SecureStore.getItemAsync('userEmail');
        const storedPassword = await SecureStore.getItemAsync('userPassword');

        setBiometricAvailable(hasHardware && isEnrolled);
        const hasCredentials = !!(storedEmail && storedPassword);
        setHasStoredCredentials(hasCredentials);

        if (hasCredentials && storedEmail) {
          setEmail(storedEmail);
        }
      } catch (e) {
        console.error('Error checking biometric availability:', e);
      }
    };

    checkBiometricAvailability();
  }, []);

  useEffect(() => {
    setIsFormValid(email.length > 0 && password.length > 0);
  }, [email, password]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => dispatch(clearError()), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      if (error && navigation.isFocused()) return;
    }, [error, navigation])
  );

  const handleLogin = async () => {
    if (!isFormValid) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      await dispatch(login({ email, password })).unwrap();
      try {
        await SecureStore.setItemAsync('userEmail', email);
        await SecureStore.setItemAsync('userPassword', password);
      } catch (e) {
        console.error('Error storing credentials:', e);
      }
    } catch {
      // Error handled by slice
    }
  };

  const handleBiometricLogin = async () => {
    try {
      if (!biometricAvailable) {
        Alert.alert('Biometric Unavailable', 'Biometric authentication is not available on this device.');
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to sign in',
        fallbackLabel: 'Use password',
        disableDeviceFallback: false,
      });

      if (result.success) {
        const storedEmail = await SecureStore.getItemAsync('userEmail');
        const storedPassword = await SecureStore.getItemAsync('userPassword');

        if (storedEmail && storedPassword) {
          setEmail(storedEmail);
          setPassword(storedPassword);
          try {
            await dispatch(login({ email: storedEmail, password: storedPassword })).unwrap();
          } catch {
            // Error handled by slice
          }
        } else {
          Alert.alert('Error', 'No stored credentials found. Please sign in with your email and password.');
        }
      }
    } catch (e) {
      console.error('Biometric authentication error:', e);
      Alert.alert('Authentication Error', 'Biometric authentication failed. Please use your password.');
    }
  };

  const iconSize = isTablet ? (isLargeTablet ? 26 : 24) : 20;

  return (
    <AuthScreenLayout centerContent>
      <AuthBranding subtitle="Sign in to your account" />

      <View style={[authFormStyles.form, isTablet && authFormStyles.formTablet]}>
        <View style={[authFormStyles.inputContainer, isEmailFocused && authFormStyles.inputContainerFocused]}>
          <Ionicons
            name="mail-outline"
            size={iconSize}
            color={isEmailFocused ? COLORS.teal700 : COLORS.muted}
            style={authFormStyles.inputIcon}
          />
          <TextInput
            style={authFormStyles.input}
            placeholder="Email"
            placeholderTextColor={COLORS.muted}
            value={email}
            onChangeText={setEmail}
            onFocus={() => setIsEmailFocused(true)}
            onBlur={() => setIsEmailFocused(false)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={[authFormStyles.inputContainer, isPasswordFocused && authFormStyles.inputContainerFocused]}>
          <Ionicons
            name="lock-closed-outline"
            size={iconSize}
            color={isPasswordFocused ? COLORS.teal700 : COLORS.muted}
            style={authFormStyles.inputIcon}
          />
          <TextInput
            style={authFormStyles.input}
            placeholder="Password"
            placeholderTextColor={COLORS.muted}
            value={password}
            onChangeText={setPassword}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
            secureTextEntry={!showPassword}
            autoCorrect={false}
          />
          <TouchableOpacity style={styles.passwordToggle} onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={iconSize} color={COLORS.muted} />
          </TouchableOpacity>
        </View>

        {error ? (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle-outline" size={16} color={COLORS.destructive} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {biometricAvailable && hasStoredCredentials ? (
          <>
            <TouchableOpacity style={styles.biometricButton} onPress={handleBiometricLogin} disabled={isLoading}>
              <Ionicons name="finger-print-outline" size={iconSize + 4} color={COLORS.teal700} />
              <Text style={styles.biometricButtonText}>
                {Platform.OS === 'ios' ? 'Use Face ID' : 'Use Fingerprint'}
              </Text>
            </TouchableOpacity>
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>
          </>
        ) : null}

        <TouchableOpacity
          style={[authFormStyles.primaryButton, !isFormValid && styles.disabledButton]}
          onPress={handleLogin}
          disabled={isLoading || !isFormValid}
        >
          <LinearGradient
            colors={isFormValid ? [...GRADIENTS.button] : ['#ccc', '#ccc']}
            style={authFormStyles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.white} size="small" />
            ) : (
              <Text style={authFormStyles.primaryButtonText}>Sign In</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        {biometricAvailable ? (
          <View style={styles.disclaimerContainer}>
            <Ionicons name="information-circle-outline" size={14} color={COLORS.muted} />
            <Text style={styles.disclaimerText}>
              Your biometric data is stored only on your device and is never shared with our servers.
            </Text>
          </View>
        ) : null}

        <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={authFormStyles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={styles.registerSection}>
          <Text style={authFormStyles.mutedText}>Don&apos;t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={authFormStyles.linkText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthScreenLayout>
  );
};

const styles = StyleSheet.create({
  passwordToggle: { padding: 8 },
  errorContainer: {
    backgroundColor: '#fff5f5',
    borderColor: '#fed7d7',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    color: COLORS.destructive,
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  disabledButton: { opacity: 0.6 },
  biometricButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.teal700,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  biometricButtonText: {
    color: COLORS.teal700,
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 14,
    color: COLORS.muted,
    fontWeight: '500',
  },
  disclaimerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.mint50,
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 11,
    color: COLORS.muted,
    marginLeft: 8,
    lineHeight: 15,
  },
  forgotPassword: {
    alignItems: 'center',
    marginBottom: 20,
  },
  registerSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
