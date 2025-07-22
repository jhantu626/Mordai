import React, { useRef, useEffect } from 'react';
import { Animated, View, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';

const { width } = Dimensions.get('window');

const CARD_CONTAINER_WIDTH = width / 4 - 11;
const CARD_IMAGE_SIZE = CARD_CONTAINER_WIDTH * 0.95;

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

const CategoryCardShimmer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ShimmerLine width="100%" height="100%" />
      </View>
      <ShimmerLine width="80%" height={14} style={styles.textPlaceholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_CONTAINER_WIDTH,
    height: CARD_CONTAINER_WIDTH + 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    marginVertical: 0,
  },
  imageContainer: {
    width: CARD_IMAGE_SIZE,
    height: CARD_IMAGE_SIZE,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  textPlaceholder: {
    marginTop: 6,
    alignSelf: 'center',
  },
});

export default CategoryCardShimmer;