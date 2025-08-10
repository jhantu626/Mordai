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
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Layout from '../../Layout/Layout';
import { DottedDivider, SecondaryHeader } from '../../../components';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';
import { useCartContext } from '../../../contexts/CartContext';
import { pincodeService } from '../../../services/PincodeService';
import { validateIndianPhoneNumber } from '../../../utils/validations';
import RazorPay from 'react-native-razorpay';
import { StackActions, useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useAddress } from '../../../contexts/AddressContext';

const Checkout = () => {
  const { address } = useAddress();
  const [selectedAddress, setSelectedAddress] = useState(null);

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

  const bottomSheetRef = useRef(null);

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

  const renderBackdrop = useMemo(
    () => props =>
      (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
        />
      ),
    [],
  );
  const snapPoints = useMemo(() => ['75%'], []);

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
          navigation.dispatch(StackActions.replace('ThankYou'));
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {});
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

  const getAddressIcon = label => {
    switch (label?.toLowerCase()) {
      case 'home':
        return '🏠';
      case 'office':
        return '🏢';
      case 'work':
        return '💼';
      default:
        return '📍';
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
            <TouchableOpacity
              style={styles.addressBtn}
              onPress={() => bottomSheetRef.current?.expand()}
            >
              <Feather name="map-pin" size={20} color={colors.primary} />
              <Text style={styles.addressBtnText}>Select Address</Text>
            </TouchableOpacity>
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
                  {['Home', 'Office', 'Other'].map(labelType => (
                    <TouchableOpacity
                      key={labelType}
                      style={[
                        styles.labelButton,
                        label === labelType && styles.selectedLabel,
                      ]}
                      onPress={() => setLabel(labelType)}
                    >
                      <Text
                        style={[
                          styles.labelButtonText,
                          label === labelType && styles.selectedLabelText,
                        ]}
                      >
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
            <View
              style={{
                gap: 10,
              }}
            >
              {paymentMethods.map(method => (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    styles.paymentMethod,
                    selectedPaymentMethod === method.id &&
                      styles.selectedPaymentMethod,
                    {
                      padding: 10,
                    },
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
              <Text style={styles.amountText}>
                ₹{shippingCharge.toFixed(2)}
              </Text>
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
      <BottomSheet
        ref={bottomSheetRef}
        enablePanDownToClose
        handleComponent={null}
        backdropComponent={renderBackdrop}
        snapPoints={snapPoints}
        index={-1}
        animationConfigs={{
          duration: 200,
        }}
      >
        <BottomSheetView style={styles.bottomSheet}>
          <Text style={styles.bottomSheetTitle}>Select Delivery Address</Text>
          <View
            style={{
              gap: 10,
              marginTop: 10
            }}
          >
            {address.length > 0 ? (
              address.map(
                ({
                  id,
                  house,
                  building,
                  area,
                  pincode,
                  labe,
                  reciverName,
                  reciverPhone,
                }) => (
                  <TouchableOpacity
                    key={id}
                    style={[
                      styles.paymentMethod,
                      selectedAddress === id && styles.selectedPaymentMethod,
                      {
                        paddingHorizontal: 10,
                      },
                    ]}
                    onPress={() => {
                      console.log(
                        '{',
                        id,
                        area,
                        building,
                        house,
                        labe,
                        pincode,
                        reciverName,
                        reciverPhone,
                        '}',
                      );
                      setSelectedAddress(id);
                      setArea(area);
                      setBuilding(building);
                      setHouse(house);
                      setLabel(labe);
                      setPincode(pincode);
                      setReciverName(reciverName);
                      setReciverPhone(reciverPhone);
                      bottomSheetRef.current?.close();
                    }}
                    activeOpacity={0.8}
                    accessible={true}
                    accessibilityRole="button"
                  >
                    <Text style={styles.paymentIcon}>
                      {getAddressIcon(label)}
                    </Text>

                    <View style={styles.paymentText}>
                      <Text style={styles.addressLabel}>{labe}</Text>
                      <Text style={styles.addressText}>
                        {house}, {building}
                      </Text>
                      <Text style={styles.addressText}>
                        {area}, {pincode}
                      </Text>
                      <Text style={styles.receiverInfo}>
                        {reciverName} • {reciverPhone}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.radioButton,
                        selectedAddress === id && styles.radioButtonSelected,
                      ]}
                    />
                  </TouchableOpacity>
                ),
              )
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  style={styles.emptyAddressImage}
                  source={require('./../../../../assets/images/address.png')}
                />
              </View>
            )}
          </View>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

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
    padding: 0,
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
  addressBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 10,
  },
  addressBtnText: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: colors.primary,
  },
  bottomSheet: {
    // backgroundColor: '#d4f0bd',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  bottomSheetTitle: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.primary,
  },
  addressLabel: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: '#000000',
    marginBottom: 2,
  },
  addressText: {
    fontSize: 13,
    fontFamily: fonts.regular,
    color: '#666666',
    lineHeight: 18,
  },
  receiverInfo: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: '#888888',
    marginTop: 4,
  },
  emptyAddressImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default Checkout;
