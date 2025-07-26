import {
  Dimensions,
  FlatList,
  Image,
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
import { useCartContext } from '../../../contexts/CartContext';

const Cart = () => {
  const { carts, addToCart, removeFromCart } = useCartContext();

  const { width } = Dimensions.get('screen');

  const [bottomContainerHeight, setBOttomContainerHeight] = useState(0);

  const totalAmount = carts.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <Layout>
      <SecondaryHeader />
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: bottomContainerHeight }}
        showsVerticalScrollIndicator={false}
        data={carts}
        keyExtractor={(_, index) => 'cart-item-' + index}
        renderItem={({ item, index }) => (
          <CartItem
            item={item}
            key={index + 'cartItem'}
            onDecrease={() => removeFromCart({ item: item })}
            onIncrease={() => addToCart({ cart: item })}
          />
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Image
              style={styles.emptyImage}
              source={require('./../../../../assets/images/empty-cart.png')}
            />
            <Text style={styles.emptyText}>Your cart is empty</Text>
          </View>
        )}
      />

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
            <Text style={styles.amountText}>₹{(totalAmount * 0.05).toFixed(2)}</Text>
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
          <Text style={styles.amountText}>
            ₹{totalAmount + totalAmount * 0.05}
          </Text>
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: '#00000080',
  },
  emptyImage: {
    width: 200,
    height: 200,
  },
});
