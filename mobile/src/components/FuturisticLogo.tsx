import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Circle, G, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

const { width } = Dimensions.get('window');
const defaultLogoSize = width * 0.2; // 20% of screen width

interface FuturisticLogoProps {
  size?: number;
}

const FuturisticLogo: React.FC<FuturisticLogoProps> = ({ size = defaultLogoSize }) => {
  return (
    <View style={[styles.container, size !== defaultLogoSize && { marginBottom: 0 }]}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Defs>
          {/* Primary brand gradient */}
          <LinearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#0f6e56" />
            <Stop offset="100%" stopColor="#04342c" />
          </LinearGradient>
          
          <LinearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#f5c842" />
            <Stop offset="100%" stopColor="#e4b429" />
          </LinearGradient>
        </Defs>

        {/* Main talent platform */}
        <Rect
          x="20"
          y="30"
          width="60"
          height="40"
          rx="8"
          fill="url(#brandGradient)"
          stroke="#e4b429"
          strokeWidth="2"
        />

        {/* Rising talent bars */}
        <G>
          {/* Bar 1 - Rising */}
          <Rect x="28" y="45" width="6" height="20" fill="url(#goldGradient)" rx="2" />
          
          {/* Bar 2 - Higher */}
          <Rect x="38" y="40" width="6" height="25" fill="url(#goldGradient)" rx="2" />
          
          {/* Bar 3 - Peak */}
          <Rect x="48" y="35" width="6" height="30" fill="url(#goldGradient)" rx="2" />
          
          {/* Bar 4 - High */}
          <Rect x="58" y="42" width="6" height="23" fill="url(#goldGradient)" rx="2" />
          
          {/* Bar 5 - Rising */}
          <Rect x="68" y="47" width="6" height="18" fill="url(#goldGradient)" rx="2" />
        </G>

        {/* Talent connection dots */}
        <G>
          <Circle cx="31" cy="65" r="2" fill="#e4b429" />
          <Circle cx="41" cy="65" r="2" fill="#e4b429" />
          <Circle cx="51" cy="65" r="2" fill="#e4b429" />
          <Circle cx="61" cy="65" r="2" fill="#e4b429" />
          <Circle cx="71" cy="65" r="2" fill="#e4b429" />
        </G>

        {/* Floating talent elements */}
        <G>
          {/* Top left talent */}
          <Circle cx="25" cy="20" r="3" fill="url(#goldGradient)" />
          <Circle cx="25" cy="20" r="1.5" fill="#0f6e56" />
          
          {/* Top right talent */}
          <Circle cx="75" cy="20" r="3" fill="url(#goldGradient)" />
          <Circle cx="75" cy="20" r="1.5" fill="#0f6e56" />
          
          {/* Bottom left talent */}
          <Circle cx="25" cy="80" r="3" fill="url(#goldGradient)" />
          <Circle cx="25" cy="80" r="1.5" fill="#0f6e56" />
          
          {/* Bottom right talent */}
          <Circle cx="75" cy="80" r="3" fill="url(#goldGradient)" />
          <Circle cx="75" cy="80" r="1.5" fill="#0f6e56" />
        </G>

        {/* Connection lines */}
        <G>
          {/* Top connection */}
          <Path
            d="M25 20 L50 30 L75 20"
            stroke="#e4b429"
            strokeWidth="1"
            opacity="0.6"
            fill="none"
          />
          
          {/* Bottom connection */}
          <Path
            d="M25 80 L50 70 L75 80"
            stroke="#e4b429"
            strokeWidth="1"
            opacity="0.6"
            fill="none"
          />
          
          {/* Left connection */}
          <Path
            d="M20 30 L30 50 L20 70"
            stroke="#e4b429"
            strokeWidth="1"
            opacity="0.6"
            fill="none"
          />
          
          {/* Right connection */}
          <Path
            d="M80 30 L70 50 L80 70"
            stroke="#e4b429"
            strokeWidth="1"
            opacity="0.6"
            fill="none"
          />
        </G>

        {/* Center talent hub */}
        <Circle
          cx="50"
          cy="50"
          r="8"
          fill="url(#goldGradient)"
          stroke="#0f6e56"
          strokeWidth="1.5"
        />
        
        {/* Inner hub symbol */}
        <Path
          d="M50 46 L52 50 L50 54 L48 50 Z"
          fill="#0f6e56"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
});

export default FuturisticLogo;
