import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';
import { StackActions, useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const ThankYou = ({ route }) => {
  const navigation = useNavigation();
  // Get order details from route params
  const { orderDetails } = route.params || {};

  // Animation values
  const checkmarkScale = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(50)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleTranslateY = useRef(new Animated.Value(30)).current;
  const orderInfoOpacity = useRef(new Animated.Value(0)).current;
  const orderInfoTranslateY = useRef(new Animated.Value(40)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(0.8)).current;
  const backgroundScale = useRef(new Animated.Value(0)).current;

  // Confetti animations
  const confetti1 = useRef(new Animated.Value(-100)).current;
  const confetti2 = useRef(new Animated.Value(-150)).current;
  const confetti3 = useRef(new Animated.Value(-80)).current;
  const confetti4 = useRef(new Animated.Value(-120)).current;
  const confetti5 = useRef(new Animated.Value(-90)).current;
  const confetti6 = useRef(new Animated.Value(-110)).current;

  useEffect(() => {
    // Start animations sequence
    startAnimations();
  }, []);

  const startAnimations = () => {
    // Background circle animation
    Animated.spring(backgroundScale, {
      toValue: 1,
      tension: 50,
      friction: 8,
      useNativeDriver: true,
    }).start();

    // Confetti falling animation
    const confettiAnimations = [
      confetti1,
      confetti2,
      confetti3,
      confetti4,
      confetti5,
      confetti6,
    ].map((confetti, index) =>
      Animated.timing(confetti, {
        toValue: height + 100,
        duration: 3000 + index * 200,
        useNativeDriver: true,
      }),
    );

    Animated.stagger(100, confettiAnimations).start();

    // Checkmark animation
    setTimeout(() => {
      Animated.spring(checkmarkScale, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }).start();
    }, 300);

    // Title animation
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(titleTranslateY, {
          toValue: 0,
          tension: 80,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }, 600);

    // Subtitle animation
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(subtitleOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(subtitleTranslateY, {
          toValue: 0,
          tension: 80,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }, 900);

    // Order info animation
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(orderInfoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(orderInfoTranslateY, {
          toValue: 0,
          tension: 80,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1200);

    // Button animation
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(buttonScale, {
          toValue: 1,
          tension: 80,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1500);
  };

  const handleContinueShopping = () => {
    navigation.dispatch(StackActions.replace('Home'));
  };

  const handleTrackOrder = () => {
    navigation.navigate('Orders');
  };

  const ConfettiPiece = ({ animatedValue, color, left, size = 8 }) => (
    <Animated.View
      style={[
        styles.confetti,
        {
          backgroundColor: color,
          left: left,
          width: size,
          height: size,
          transform: [{ translateY: animatedValue }],
        },
      ]}
    />
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />

      {/* Background Circle */}
      <Animated.View
        style={[
          styles.backgroundCircle,
          {
            transform: [{ scale: backgroundScale }],
          },
        ]}
      />

      {/* Confetti */}
      <ConfettiPiece animatedValue={confetti1} color="#FFD700" left={50} />
      <ConfettiPiece
        animatedValue={confetti2}
        color="#FF6B6B"
        left={100}
        size={10}
      />
      <ConfettiPiece animatedValue={confetti3} color="#4ECDC4" left={150} />
      <ConfettiPiece
        animatedValue={confetti4}
        color="#45B7D1"
        left={200}
        size={12}
      />
      <ConfettiPiece animatedValue={confetti5} color="#96CEB4" left={250} />
      <ConfettiPiece
        animatedValue={confetti6}
        color="#FFEAA7"
        left={300}
        size={9}
      />

      {/* Success Checkmark */}
      <Animated.View
        style={[
          styles.checkmarkContainer,
          {
            transform: [{ scale: checkmarkScale }],
          },
        ]}
      >
        <Text style={styles.checkmark}>✓</Text>
      </Animated.View>

      {/* Thank You Title */}
      <Animated.View
        style={[
          styles.titleContainer,
          {
            opacity: titleOpacity,
            transform: [{ translateY: titleTranslateY }],
          },
        ]}
      >
        <Text style={styles.thankYouTitle}>Thank You!</Text>
      </Animated.View>

      {/* Subtitle */}
      <Animated.View
        style={[
          styles.subtitleContainer,
          {
            opacity: subtitleOpacity,
            transform: [{ translateY: subtitleTranslateY }],
          },
        ]}
      >
        <Text style={styles.subtitle}>
          Your order has been placed successfully
        </Text>
      </Animated.View>

      {/* Order Information */}
      <Animated.View
        style={[
          styles.orderInfoContainer,
          {
            opacity: orderInfoOpacity,
            transform: [{ translateY: orderInfoTranslateY }],
          },
        ]}
      >
        <View style={styles.orderInfoCard}>
          <View style={styles.orderInfoRow}>
            <Text style={styles.orderInfoLabel}>Order ID:</Text>
            <Text style={styles.orderInfoValue}>
              #
              {orderDetails?.orderId || 'ORD' + Date.now().toString().slice(-6)}
            </Text>
          </View>
          <View style={styles.orderInfoRow}>
            <Text style={styles.orderInfoLabel}>Total Amount:</Text>
            <Text style={styles.orderInfoValue}>
              ₹{orderDetails?.grandTotal?.toFixed(2) || '0.00'}
            </Text>
          </View>
          <View style={styles.orderInfoRow}>
            <Text style={styles.orderInfoLabel}>Estimated Delivery:</Text>
            <Text style={styles.orderInfoValue}>3-5 business days</Text>
          </View>
        </View>
      </Animated.View>

      {/* Action Buttons */}
      <Animated.View
        style={[
          styles.buttonContainer,
          {
            opacity: buttonOpacity,
            transform: [{ scale: buttonScale }],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.trackOrderBtn}
          onPress={handleTrackOrder}
        >
          <Text style={styles.trackOrderBtnText}>Track Order</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.continueShoppingBtn}
          onPress={handleContinueShopping}
        >
          <Text style={styles.continueShoppingBtnText}>Continue Shopping</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Bottom Message */}
      <View style={styles.bottomMessage}>
        <Text style={styles.bottomMessageText}>
          🎉 We'll send you updates about your order via SMS & Email
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  backgroundCircle: {
    position: 'absolute',
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: (width * 1.5) / 2,
    backgroundColor: colors.primary + '15',
    top: -width * 0.3,
  },
  confetti: {
    position: 'absolute',
    borderRadius: 2,
  },
  checkmarkContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    elevation: 10,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  checkmark: {
    fontSize: 60,
    color: 'white',
    fontWeight: 'bold',
  },
  titleContainer: {
    marginBottom: 15,
  },
  thankYouTitle: {
    fontSize: 32,
    fontFamily: fonts.bold,
    color: colors.primary,
    textAlign: 'center',
  },
  subtitleContainer: {
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
  orderInfoContainer: {
    width: '100%',
    marginBottom: 40,
  },
  orderInfoCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  orderInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  orderInfoLabel: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: '#666666',
  },
  orderInfoValue: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: '#000000',
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  trackOrderBtn: {
    width: '100%',
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  trackOrderBtnText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: 'white',
  },
  continueShoppingBtn: {
    width: '100%',
    height: 50,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueShoppingBtnText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.primary,
  },
  bottomMessage: {
    position: 'absolute',
    bottom: 40,
    paddingHorizontal: 20,
  },
  bottomMessageText: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: '#888888',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default ThankYou;
