import React, { useId, useState } from 'react';
import { View, Text, StyleSheet, StyleProp, TextStyle, ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Text as SvgText, TSpan } from 'react-native-svg';
import { COLORS } from '../../theme';

const WIDTH_BUFFER = 28;
const HEIGHT_BUFFER = 8;

type VeriTalentWordmarkProps = {
  fontSize?: number;
  letterSpacing?: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  /** Span parent width and center the wordmark (use on welcome/hero screens). */
  fullWidth?: boolean;
};

export function VeriTalentWordmark({
  fontSize = 44,
  letterSpacing = -0.5,
  style,
  textStyle,
  fullWidth = false,
}: VeriTalentWordmarkProps) {
  const gradientId = useId().replace(/:/g, '');
  const [layout, setLayout] = useState({ width: 0, height: 0 });

  const flattenedTextStyle = StyleSheet.flatten(textStyle) as TextStyle | undefined;
  const measureStyle: TextStyle = {
    fontSize,
    fontWeight: '800',
    letterSpacing,
    ...flattenedTextStyle,
  };

  const svgWidth = layout.width + WIDTH_BUFFER;
  const svgHeight = layout.height + HEIGHT_BUFFER;

  return (
    <View
      style={[
        styles.wrap,
        fullWidth && styles.wrapFullWidth,
        layout.width > 0 && { minHeight: svgHeight },
        style,
      ]}
    >
      <Text
        style={[measureStyle, styles.measure]}
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          setLayout({ width, height });
        }}
      >
        VeriTalent
      </Text>
      {layout.width > 0 ? (
        <View style={[styles.svgStage, fullWidth && styles.svgStageFullWidth]}>
          <Svg width={svgWidth} height={svgHeight}>
            <Defs>
              <LinearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor={COLORS.goldShine} />
                <Stop offset="30%" stopColor={COLORS.gold300} />
                <Stop offset="55%" stopColor={COLORS.gold400} />
                <Stop offset="100%" stopColor={COLORS.gold500} />
              </LinearGradient>
            </Defs>
            <SvgText
              fontSize={fontSize}
              fontWeight="800"
              letterSpacing={letterSpacing}
              x={WIDTH_BUFFER / 2}
              y={fontSize * 0.92}
            >
              <TSpan fill={`url(#${gradientId})`}>Veri</TSpan>
              <TSpan fill={COLORS.white}>Talent</TSpan>
            </SvgText>
          </Svg>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignSelf: 'center',
    overflow: 'visible',
  },
  wrapFullWidth: {
    alignSelf: 'stretch',
    width: '100%',
    alignItems: 'center',
  },
  measure: {
    opacity: 0,
    position: 'absolute',
  },
  svgStage: {
    overflow: 'visible',
  },
  svgStageFullWidth: {
    alignItems: 'center',
    width: '100%',
  },
});

export default VeriTalentWordmark;
