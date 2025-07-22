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

const BannerCardShimmer = () => {
  return (
    <View style={styles.container}>
      <ShimmerLine width={80} height={12} />
      <ShimmerLine width={150} height={20} style={{ marginTop: 5 }} />
      
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        <View style={{ width: 24, height: 24, borderRadius: 12, overflow: 'hidden' }}>
          <ShimmerLine width="100%" height="100%" />
        </View>
        <ShimmerLine width={100} height={12} />
      </View>
      
      <ShimmerLine 
        width={110} 
        height={35} 
        style={{ 
          marginTop: 15,
          borderRadius: 5,
        }} 
      />
      
      <View style={styles.imagePlaceholder}>
        <ShimmerLine width="100%" height="100%" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 180,
    borderRadius: 15,
    overflow: 'hidden',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    position: 'absolute',
    right: 30,
    bottom: 20,
    zIndex: -1,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default BannerCardShimmer;