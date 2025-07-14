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

const Cart = () => {
  const { width } = Dimensions.get('screen');

  const [bottomContainerHeight, setBOttomContainerHeight] = useState(0);

  const [cartItems, setCartItems] = useState([
    {
      name: 'Orange Juice',
      price: 50.0,
      originalPrice: 55.0,
      discount: '10% Off',
      category: 'Juices',
      orderCode: '12345625',
      purchaseDate: '31 May 2023',
      paymentMethod: 'Online payment',
      quantity: 1,
      size: '500 ml',
      image: require('./../../../../assets/images/product1.png'),
    },
    {
      name: 'Capsicum',
      price: 30.0,
      originalPrice: 35.0,
      discount: '8% Off',
      category: 'Vegetables',
      quantity: 1,
      size: '500 gm',
      image: require('./../../../../assets/images/product2.png'),
    },
    {
      name: 'Ripe Mango',
      price: 50.0,
      originalPrice: 55.0,
      discount: '10% Off',
      category: 'Fruits',
      orderCode: '12345678',
      purchaseDate: '31 May 2023',
      paymentMethod: 'Online payment',
      quantity: 1,
      size: '500 gm',
      image: require('./../../../../assets/images/product3.png'),
    },
    {
      name: 'Black Grape',
      price: 30.0,
      originalPrice: 35.0,
      category: 'Fruits',
      orderCode: '12345678',
      purchaseDate: '31 May 2023',
      paymentMethod: 'Online payment',
      quantity: 1,
      size: '500 gm',
      image: require('./../../../../assets/images/product4.png'),
    },
    {
      name: 'Fresh Coconut',
      price: 30.0,
      originalPrice: 35.0,
      category: 'Fruits',
      orderCode: '12344672',
      purchaseDate: '31 May 2023',
      paymentMethod: 'Online payment',
      quantity: 1,
      size: '1 pc',
      image: require('./../../../../assets/images/product1.png'),
    },
  ]);

  const increase = index => {
    setCartItems(prev => {
      const newCartItems = [...prev];
      newCartItems[index].quantity += 1;
      return newCartItems;
    });
  };

  const decrease = index => {
    setCartItems(prev => {
      if (prev[index].quantity === 1) {
        return prev.filter((_, i) => i !== index);
      }
      const newCartItems = [...prev];
      newCartItems[index].quantity -= 1;
      return newCartItems;
    });
  };

  return (
    <Layout>
      <SecondaryHeader />
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: bottomContainerHeight }}
        showsVerticalScrollIndicator={false}
        data={cartItems}
        keyExtractor={(_, index) => 'cart-item-' + index}
        renderItem={({ item, index }) => (
          <CartItem
            item={item}
            key={index + 'cartItem'}
            onDecrease={() => decrease(index)}
            onIncrease={() => increase(index)}
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
