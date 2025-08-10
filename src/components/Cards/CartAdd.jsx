import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { fonts } from '../../utils/fonts';
import { colors } from '../../utils/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import { useCartContext } from '../../contexts/CartContext';

const CartAdd = ({ product }) => {
  const { getQuiantity, addToCart, removeFromCart } = useCartContext();

  return (
    <View style={styles.sizeContainer}>
      <View style={styles.leftCOntainer}>
        <Image style={styles.image} source={{ uri: product.image }} />
        <View>
          <Text style={styles.cartProductName}>
            {product.name.length > 15
              ? product.name.slice(0, 18) + '...'
              : product.name}
          </Text>
          <Text style={styles.cartProductSize}>
            {product.size} {'\u2022'} ₹{product.price}
          </Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() =>
            removeFromCart({
              item: {
                id: product.id,
                size: product.size,
              },
            })
          }
        >
          <Entypo name="minus" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>
          {getQuiantity({ item: { id: product.id, size: product.size } })}
        </Text>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => addToCart({ cart: product })}
        >
          <Entypo name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  leftCOntainer: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
  },
  cartProductName: {
    fontSize: 13,
    fontFamily: fonts.semiBold,
  },
  cartProductSize: {
    fontSize: 12,
    fontFamily: fonts.regular,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  btnContainer: {
    width: 30,
    height: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
  },
});

export default CartAdd;
