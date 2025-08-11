import React, { useRef, useEffect } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

const ShimmerLine = ({ width = '100%', height = 14, style }) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: false,
      }),
    ).start();
  }, [shimmerAnim]);

  const backgroundColor = shimmerAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [colors.itemBackgrounds, '#F5F5F5', colors.itemBackgrounds],
  });

  return (
    <Animated.View
      style={[{ backgroundColor, borderRadius: 6 }, { width, height }, style]}
    />
  );
};

const SmallProductCardShimmer = ({ count = 5 }) => {
  return (
    <View>
      <ShimmerLine
        width={70}
        height={70}
        style={{
          borderRadius: 70 / 2,
        }}
      />
      <ShimmerLine height={10} style={{ marginTop: 5 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '50%',
    height: '5%',
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: '48%',
    marginBottom: 16,
  },
  imageContainer: {
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: colors.itemBackgrounds,
  },
  textContainer: {
    paddingHorizontal: 4,
  },
});

export default SmallProductCardShimmer;
