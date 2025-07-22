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
      })
    ).start();
  }, [shimmerAnim]);

  const backgroundColor = shimmerAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [colors.itemBackgrounds, '#F5F5F5', colors.itemBackgrounds],
  });

  return (
    <Animated.View
      style={[
        { backgroundColor, borderRadius: 6 },
        { width, height },
        style,
      ]}
    />
  );
};

const CategoryShimmer = ({ count = 5 }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, index) => (
        <View style={styles.categoryPlaceholder} key={`category-shimmer-${index}`}>
          <ShimmerLine width={60 + Math.random() * 40} height={35} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
    marginVertical: 0,
  },
  categoryPlaceholder: {
    borderRadius: 20,
    overflow: 'hidden',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
});

export default CategoryShimmer;