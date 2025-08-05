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

const Checkout = () => {
  const [bottomContainerHeight, setBOttomContainerHeight] = useState(0);

  const { carts } = useCartContext();
  const { width } = Dimensions.get('screen');
  const [isPincodeAvailable, setIsPincodeAvailable] = useState(true);

  // Address state
  const [address, setAddress] = useState({
    fullName: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
  });

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

  const handleAddressChange = (field, value) => {
    setAddress(prev => ({ ...prev, [field]: value }));
  };

  const validateAddress = () => {
    const { fullName, phoneNumber, addressLine1, city, state, pincode } =
      address;
    return (
      fullName &&
      phoneNumber &&
      addressLine1 &&
      city &&
      state &&
      pincode &&
      validateIndianPhoneNumber('+91 ' + address.phoneNumber)
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
      description: `Paymenty for Order At Mordai Platform`,
      image: require('./../../../../assets/images/logo.png'),
      currency: 'INR',
      key: 'rzp_test_S7hkZjIJiSVaAd',
      amount: grandTotal * 100,
      name: 'Paymenty',
      theme: { color: colors.primary },
      prefill: {
        contact: address.phoneNumber
      },
    };

    if(selectedPaymentMethod==="online"){
        RazorPay.open(options)
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        console.info('payment completed');
      });
    }
  };

  const checkPincode = async () => {
    try {
      const data = await pincodeService.checkPincodeAvailablity({
        pincode: address.pincode,
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
    if (address.pincode.length === 6) {
      checkPincode();
    }
  }, [address.pincode]);

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
              placeholder="Full Name *"
              value={address.fullName}
              onChangeText={text => handleAddressChange('fullName', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number *"
              value={address.phoneNumber}
              onChangeText={text => handleAddressChange('phoneNumber', text)}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Address Line 1 *"
              value={address.addressLine1}
              onChangeText={text => handleAddressChange('addressLine1', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Address Line 2"
              value={address.addressLine2}
              onChangeText={text => handleAddressChange('addressLine2', text)}
            />
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="City *"
                value={address.city}
                onChangeText={text => handleAddressChange('city', text)}
              />
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="State *"
                value={address.state}
                onChangeText={text => handleAddressChange('state', text)}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Pincode *"
              value={address.pincode}
              onChangeText={text => handleAddressChange('pincode', text)}
              keyboardType="numeric"
              maxLength={6}
            />
            {!isPincodeAvailable && (
              <Text style={styles.errorText}>
                Delivery not available in this area
              </Text>
            )}
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
