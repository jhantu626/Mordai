import React, { useRef, useEffect } from 'react';
import { Animated, View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

const { width } = Dimensions.get('window');

const ShimmerLine = ({ width = '100%', height = 14, style, radius = 6 }) => {
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
        { backgroundColor, borderRadius: radius, marginVertical: 4 },
        { width, height },
        style,
      ]}
    />
  );
};

const ProductDetailsShimmer = () => {
  return (
    <ScrollView
      contentContainerStyle={[styles.container, { paddingBottom: 120 }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Image Carousel Placeholder */}
      <View style={styles.topView}>
        <View style={styles.imageContainer}>
          <ShimmerLine width="100%" height="100%" radius={0} />
        </View>
        {/* Dots Placeholder */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 10 }}>
          {[1, 2, 3, 4].map((_, i) => (
            <ShimmerLine key={i} width={7.5} height={7.5} radius={5} />
          ))}
        </View>
      </View>

      {/* Category & Product Name */}
      <View style={styles.contentContainer}>
        <ShimmerLine width={150} height={22} style={{ marginBottom: 8 }} />
        <ShimmerLine width={200} height={20} style={{ marginBottom: 15 }} />
        {/* Description */}
        <ShimmerLine width="100%" height={14} />
        <ShimmerLine width="90%" height={14} />
        <ShimmerLine width="80%" height={14} />
        <ShimmerLine width="70%" height={14} />
      </View>

      {/* Related Products Title */}
      <View style={[styles.contentContainer, { marginTop: 30 }]}>
        <ShimmerLine width={120} height={20} />
      </View>
      {/* Related Products Grid */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginHorizontal: 10 }}>
        {[1, 2, 3, 4].map((_, i) => (
          <View key={i} style={{ width: '48%', marginBottom: 15 }}>
            <ShimmerLine width="100%" height={120} radius={10} />
            <ShimmerLine width={60} height={16} style={{ marginTop: 8 }} />
            <ShimmerLine width={40} height={14} style={{ marginTop: 4 }} />
            <ShimmerLine width={100} height={16} style={{ marginTop: 8 }} />
          </View>
        ))}
      </View>

      {/* Bottom Price & Add to Cart */}
      <View style={styles.bottomContainer}>
        <View style={styles.priceContainer}>
          <ShimmerLine width={80} height={22} />
          <ShimmerLine width={60} height={14} style={{ marginLeft: 10 }} />
          <ShimmerLine width={50} height={14} style={{ marginTop: -10 }} />
        </View>
        <ShimmerLine width={150} height={45} radius={10} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  topView: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  imageContainer: {
    width: width - 20,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.productImageBackgorund,
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
  bottomContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width - 20,
    paddingHorizontal: 20,
    bottom: 5,
    left: 10,
  },
  priceContainer: {
    flexDirection: 'column',
    gap: 5,
  },
});

export default ProductDetailsShimmer;
