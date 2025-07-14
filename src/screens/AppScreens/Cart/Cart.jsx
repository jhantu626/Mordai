import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Layout from '../../Layout/Layout';
import { CartItem, DottedDivider, SecondaryHeader } from '../../../components';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

const Cart = () => {
  const { width } = Dimensions.get('screen');

  const [bottomContainerHeight, setBOttomContainerHeight] = useState(0);

  return (
    <Layout>
      <SecondaryHeader />
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: bottomContainerHeight }}
        showsVerticalScrollIndicator={false}
        data={[...Array(5)]}
        keyExtractor={(_, index) => 'cart-item-' + index}
        renderItem={() => <CartItem />}
      />

      <View
        style={[styles.bottomContainer, { width: width }]}
        onLayout={e => setBOttomContainerHeight(e.nativeEvent.layout.height)}
      >
        <View style={{ gap: 7 }}>
          <View style={styles.bottomSubContainer}>
            <Text style={styles.totalAmountText}>Total Amount</Text>
            <Text style={styles.amountText}>₹500</Text>
          </View>
          <View style={styles.bottomSubContainer}>
            <Text style={styles.totalAmountText}>Shipping Charge</Text>
            <Text style={styles.amountText}>₹50</Text>
          </View>
          <View style={styles.bottomSubContainer}>
            <Text style={styles.totalAmountText}>Packing Charge</Text>
            <Text style={styles.amountText}>₹0</Text>
          </View>
        </View>
        <DottedDivider />
        <View style={styles.bottomSubContainer}>
          <Text style={[styles.totalAmountText, { fontFamily: fonts.bold }]}>
            SubTotal
          </Text>
          <Text style={styles.amountText}>₹500</Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn}>
          <Text style={styles.checkoutBtnText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default Cart;

const styles = StyleSheet.create({
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 30,
    // backgroundColor: '#ecf6e5',
    backgroundColor: '#d4f0bd',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    opacity: 1,
  },
  checkoutBtn: {
    width: '100%',
    height: 45,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 20,
  },
  checkoutBtnText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.inputBackground,
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
});
