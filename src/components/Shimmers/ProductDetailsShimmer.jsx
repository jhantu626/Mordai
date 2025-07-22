import React, { useRef, useEffect } from 'react';
import { Animated, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { colors } from '../../utils/colors';

const { width } = Dimensions.get('window');

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

const ProductDetailsShimmer = () => {
  return (
    <View style={styles.container}>
      {/* Image Gallery Placeholder */}
      <View style={styles.imageGalleryContainer}>
        <View style={styles.imagePlaceholder}>
          <ShimmerLine width="100%" height="100%" />
        </View>
        <View style={styles.dotsContainer}>
          {[0, 1, 2, 3].map((_, index) => (
            <View key={index} style={styles.dotPlaceholder} />
          ))}
        </View>
      </View>

      {/* Content Placeholder */}
      <View style={styles.contentContainer}>
        <ShimmerLine width={150} height={22} style={styles.categoryPlaceholder} />
        <ShimmerLine width={200} height={24} style={styles.titlePlaceholder} />
        
        {/* Description Placeholder */}
        <ShimmerLine width="100%" height={14} />
        <ShimmerLine width="90%" height={14} />
        <ShimmerLine width="80%" height={14} />
        <ShimmerLine width="70%" height={14} />
        <ShimmerLine width="60%" height={14} />
      </View>

      {/* Related Products Placeholder */}
      <View style={styles.relatedContainer}>
        <ShimmerLine width={150} height={20} style={styles.sectionTitle} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[0, 1, 2].map((_, index) => (
            <View key={index} style={styles.relatedProduct}>
              <View style={styles.relatedImagePlaceholder}>
                <ShimmerLine width="100%" height="100%" />
              </View>
              <ShimmerLine width={80} height={14} style={styles.relatedPrice} />
              <ShimmerLine width={60} height={12} />
              <ShimmerLine width={100} height={14} />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Bottom Bar Placeholder */}
      <View style={styles.bottomBar}>
        <View style={styles.pricePlaceholder}>
          <ShimmerLine width={60} height={22} />
          <ShimmerLine width={40} height={16} />
        </View>
        <View style={styles.addToCartPlaceholder}>
          <ShimmerLine width={150} height={45} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.inputBackground,
    paddingBottom: 100,
  },
  imageGalleryContainer: {
    height: 300,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imagePlaceholder: {
    width: width - 20,
    height: 250,
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 10,
  },
  dotPlaceholder: {
    width: 7.5,
    height: 7.5,
    borderRadius: 5,
    backgroundColor: colors.itemBackgrounds,
  },
  contentContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  categoryPlaceholder: {
    marginBottom: 5,
  },
  titlePlaceholder: {
    marginBottom: 15,
  },
  relatedContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    marginBottom: 15,
    marginLeft: 10,
  },
  relatedProduct: {
    width: 150,
    marginRight: 15,
    padding: 10,
  },
  relatedImagePlaceholder: {
    width: 130,
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  relatedPrice: {
    marginBottom: 5,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  pricePlaceholder: {
    gap: 5,
  },
  addToCartPlaceholder: {
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default ProductDetailsShimmer;