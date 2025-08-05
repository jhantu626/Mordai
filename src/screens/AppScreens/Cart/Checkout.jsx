import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Layout from '../../Layout/Layout';
import { DottedDivider, SecondaryHeader } from '../../../components';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';
import { useCartContext } from '../../../contexts/CartContext';
import { pincodeService } from '../../../services/PincodeService';
import { validateIndianPhoneNumber } from '../../../utils/validations';
import RazorPay from 'react-native-razorpay';
import { StackActions, useNavigation } from '@react-navigation/native';

const Checkout = () => {
  const navigation = useNavigation();
  const [bottomContainerHeight, setBOttomContainerHeight] = useState(0);

  const { carts } = useCartContext();
  const { width } = Dimensions.get('screen');
  const [isPincodeAvailable, setIsPincodeAvailable] = useState(true);

  // Address state - using separate state variables
  const [house, setHouse] = useState('');
  const [building, setBuilding] = useState('');
  const [area, setArea] = useState('');
  const [pincode, setPincode] = useState('');
  const [label, setLabel] = useState('Home');
  const [reciverName, setReciverName] = useState('');
  const [reciverPhone, setReciverPhone] = useState('+91 ');

  // Payment method state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cod');

  // Calculate totals
  const totalAmount = carts.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const shippingCharge = totalAmount * 0.05;
  const packingCharge = 0;
  const grandTotal = totalAmount + shippingCharge + packingCharge;

  const paymentMethods = [
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: '💵',
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      icon: '👛',
    },
    {
      id: 'online',
      name: 'Pay Online (UPI / Credit / Debit Card)',
      icon: '🌐',
    },
  ];

  const validateAddress = () => {
    return (
      reciverName &&
      reciverPhone &&
      house &&
      area &&
      pincode &&
      validateIndianPhoneNumber(reciverPhone)
    );
  };

  const handlePlaceOrder = () => {
    if (!validateAddress()) {
      ToastAndroid.show(
        'Please fill in all the required fields',
        ToastAndroid.SHORT,
      );
      return;
    }

    if (isPincodeAvailable) {
      ToastAndroid.show(
        'Delivery to this pincode is not available',
        ToastAndroid.LONG,
      );
      return;
    }

    if (carts.length === 0) {
      ToastAndroid.show('Your cart is empty', ToastAndroid.SHORT);
      return;
    }

    const options = {
      description: `Payment for Order At Mordai Platform`,
      image: require('./../../../../assets/images/logo.png'),
      currency: 'INR',
      key: 'rzp_test_S7hkZjIJiSVaAd',
      amount: grandTotal * 100,
      name: 'Payment',
      theme: { color: colors.primary },
      prefill: {
        contact: reciverPhone.replace('+91 ', ''),
      },
    };

    if (selectedPaymentMethod === 'online') {
      RazorPay.open(options)
        .then(data => {
          console.log(data);
          navigation.dispatch(StackActions.replace('ThankYou'));
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          console.info('payment completed');
        });
    } else {
      // Handle COD or other payment methods
      navigation.dispatch(StackActions.replace('ThankYou'));
    }
  };

  const checkPincode = async () => {
    try {
      const data = await pincodeService.checkPincodeAvailablity({
        pincode: pincode,
      });
      console.log(data);
      if (data?.success) {
        setIsPincodeAvailable(true);
      } else {
        setIsPincodeAvailable(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (pincode.length === 6) {
      checkPincode();
    }
  }, [pincode]);

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <View style={styles.orderItemInfo}>
        <Text style={styles.orderItemName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.orderItemPrice}>₹{item.price}</Text>
      </View>
      <Text style={styles.orderItemQuantity}>Qty: {item.quantity}</Text>
      <Text style={styles.orderItemTotal}>
        ₹{(item.price * item.quantity).toFixed(2)}
      </Text>
    </View>
  );

  return (
    <Layout>
      <SecondaryHeader title="Checkout" />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottomContainerHeight }}
      >
        {/* Delivery Address Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <View style={styles.addressContainer}>
            <TextInput
              style={styles.input}
              placeholder="Receiver Name *"
              value={reciverName}
              onChangeText={setReciverName}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number *"
              value={reciverPhone}
              onChangeText={setReciverPhone}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="House/Flat No. *"
              value={house}
              onChangeText={setHouse}
            />
            <TextInput
              style={styles.input}
              placeholder="Building/Apartment Name"
              value={building}
              onChangeText={setBuilding}
            />
            <TextInput
              style={styles.input}
              placeholder="Area/Locality *"
              value={area}
              onChangeText={setArea}
            />
            <TextInput
              style={styles.input}
              placeholder="Pincode *"
              value={pincode}
              onChangeText={setPincode}
              keyboardType="numeric"
              maxLength={6}
            />
            {!isPincodeAvailable && pincode.length === 6 && (
              <Text style={styles.errorText}>
                Delivery not available in this area
              </Text>
            )}
            
            {/* Address Label */}
            <View style={styles.labelContainer}>
              <Text style={styles.labelTitle}>Save address as:</Text>
              <View style={styles.labelButtons}>
                {['Home', 'Work', 'Other'].map((labelType) => (
                  <TouchableOpacity
                    key={labelType}
                    style={[
                      styles.labelButton,
                      label === labelType && styles.selectedLabel
                    ]}
                    onPress={() => setLabel(labelType)}
                  >
                    <Text style={[
                      styles.labelButtonText,
                      label === labelType && styles.selectedLabelText
                    ]}>
                      {labelType}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Payment Method Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentContainer}>
            {paymentMethods.map(method => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentMethod,
                  selectedPaymentMethod === method.id &&
                    styles.selectedPaymentMethod,
                ]}
                onPress={() => setSelectedPaymentMethod(method.id)}
              >
                <Text style={styles.paymentIcon}>{method.icon}</Text>
                <Text style={styles.paymentText}>{method.name}</Text>
                <View
                  style={[
                    styles.radioButton,
                    selectedPaymentMethod === method.id &&
                      styles.radioButtonSelected,
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Order Summary Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.orderSummary}>
            <FlatList
              data={carts}
              renderItem={renderOrderItem}
              keyExtractor={(_, index) => 'order-item-' + index}
              scrollEnabled={false}
            />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Summary */}
      <View
        style={[styles.bottomContainer, { width: width }]}
        onLayout={e => setBOttomContainerHeight(e.nativeEvent.layout.height)}
      >
        <View style={{ gap: 7 }}>
          <View style={styles.bottomSubContainer}>
            <Text style={styles.totalAmountText}>Total Amount</Text>
            <Text style={styles.amountText}>₹{totalAmount.toFixed(2)}</Text>
          </View>
          <View style={styles.bottomSubContainer}>
            <Text style={styles.totalAmountText}>Shipping Charge</Text>
            <Text style={styles.amountText}>₹{shippingCharge.toFixed(2)}</Text>
          </View>
          <View style={styles.bottomSubContainer}>
            <Text style={styles.totalAmountText}>Packing Charge</Text>
            <Text style={styles.amountText}>₹{packingCharge.toFixed(2)}</Text>
          </View>
        </View>
        <DottedDivider />
        <View style={styles.bottomSubContainer}>
          <Text style={[styles.totalAmountText, { fontFamily: fonts.bold }]}>
            Grand Total
          </Text>
          <Text style={[styles.amountText, { fontFamily: fonts.bold }]}>
            ₹{grandTotal.toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.placeOrderBtn}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.placeOrderBtnText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: '#000000',
    marginBottom: 15,
  },

  // Address Styles
  addressContainer: {
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    fontFamily: fonts.medium,
    backgroundColor: '#FAFAFA',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },

  // Label Styles
  labelContainer: {
    marginTop: 5,
  },
  labelTitle: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: '#000000',
    marginBottom: 10,
  },
  labelButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  labelButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FAFAFA',
  },
  selectedLabel: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  labelButtonText: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: '#666666',
  },
  selectedLabelText: {
    color: '#FFFFFF',
  },

  // Payment Method Styles
  paymentContainer: {
    gap: 10,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FAFAFA',
  },
  selectedPaymentMethod: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  paymentIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  paymentText: {
    flex: 1,
    fontSize: 14,
    fontFamily: fonts.medium,
    color: '#000000',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  radioButtonSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },

  // Order Summary Styles
  orderSummary: {
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    padding: 15,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  orderItemInfo: {
    flex: 1,
  },
  orderItemName: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: '#000000',
  },
  orderItemPrice: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: '#666666',
  },
  orderItemQuantity: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: '#666666',
    marginHorizontal: 15,
  },
  orderItemTotal: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: '#000000',
  },

  // Bottom Container Styles
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#d4f0bd',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  bottomSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalAmountText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: '#00000080',
  },
  amountText: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: '#000000',
  },
  placeOrderBtn: {
    width: '100%',
    height: 45,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 20,
  },
  placeOrderBtnText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.inputBackground,
  },
  errorText: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: 'red',
    marginTop: -8,
    marginLeft: 5,
  },
});