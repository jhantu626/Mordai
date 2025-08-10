import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors'; // adjust path based on your project

const ShimmerLine = ({
  width = '100%',
  height = 14,
  borderRadius = 6,
  style,
  duration = 1200,
  startColor = colors.itemBackgrounds,
  midColor = '#F5F5F5',
  endColor = colors.itemBackgrounds,
}) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration,
        useNativeDriver: false,
      }),
    );
    animation.start();
    return () => animation.stop(); // cleanup
  }, [shimmerAnim, duration]);

  const backgroundColor = shimmerAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [startColor, midColor, endColor],
  });

  return (
    <Animated.View
      style={[
        styles.base,
        { width, height, borderRadius, backgroundColor },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    marginVertical: 4,
  },
});

export default ShimmerLine;
