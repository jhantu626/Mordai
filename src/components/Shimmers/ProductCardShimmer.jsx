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
        { backgroundColor, borderRadius: 6, marginVertical: 4 },
        { width, height },
        style,
      ]}
    />
  );
};

const ProductCardShimmer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ShimmerLine width="100%" height="100%" />
      </View>
      
      <View style={styles.priceContainer}>
        <ShimmerLine width={60} height={14} />
        <ShimmerLine width={40} height={14} />
      </View>
      
      <ShimmerLine width={50} height={12} style={styles.weightPlaceholder} />
      <ShimmerLine width={120} height={14} style={styles.productNamePlaceholder} />
      
      <View style={styles.addToCartPlaceholder}>
        <ShimmerLine width="100%" height={35} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '49%',
    marginTop: 15,
    padding: 10,
    borderRadius: 10,
  },
  imageContainer: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    backgroundColor: colors.productImageBackgorund,
    overflow: 'hidden',
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 10,
    alignItems: 'center',
  },
  weightPlaceholder: {
    marginTop: -5,
    marginBottom: 5,
  },
  productNamePlaceholder: {
    marginBottom: 10,
  },
  addToCartPlaceholder: {
    borderRadius: 5,
    marginTop: 10,
    overflow: 'hidden',
  },
});

export default ProductCardShimmer;