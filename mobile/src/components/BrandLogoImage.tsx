import React from 'react';
import { Image, ImageStyle, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { COLORS } from '../theme';

/** VeriTalent brand mark — use instead of legacy CMU TalentHub / adaptive-icon assets. */
export const BRAND_LOGO = require('../../assets/ss.png');

type BrandLogoImageProps = {
  size?: number;
  style?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  rounded?: boolean;
  backgroundColor?: string;
};

export function BrandLogoImage({
  size = 40,
  style,
  containerStyle,
  rounded = false,
  backgroundColor,
}: BrandLogoImageProps) {
  const image = (
    <Image
      source={BRAND_LOGO}
      style={[{ width: size, height: size }, style]}
      resizeMode="contain"
    />
  );

  if (!rounded && !backgroundColor && !containerStyle) {
    return image;
  }

  return (
    <View
      style={[
        rounded && { width: size, height: size, borderRadius: size / 2, overflow: 'hidden' },
        backgroundColor != null && {
          backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
        },
        containerStyle,
      ]}
    >
      {image}
    </View>
  );
}

type UserAvatarProps = {
  size?: number;
  imageUri?: string | null;
  style?: StyleProp<ViewStyle>;
};

/** Profile photo when available, otherwise VeriTalent logo on mint background. */
export function UserAvatar({ size = 44, imageUri, style }: UserAvatarProps) {
  if (imageUri) {
    return (
      <Image
        source={{ uri: imageUri }}
        style={[
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 2,
            borderColor: '#f3f4f6',
          },
          style,
        ]}
        resizeMode="cover"
      />
    );
  }

  return (
    <View
      style={[
        styles.avatarFallback,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}
    >
      <Image
        source={BRAND_LOGO}
        style={{ width: size * 0.62, height: size * 0.62 }}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  avatarFallback: {
    backgroundColor: COLORS.mint50,
    borderWidth: 2,
    borderColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

export default BrandLogoImage;
