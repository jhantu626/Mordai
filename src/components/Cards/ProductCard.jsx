import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';

const ProductCard = ({ product }) => {
  console.log('product', product);
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={product.image} />
        {product.hasOwnProperty('discount') && (
          <View style={styles.discountContainer}>
            <Text style={styles.discountText}>{product.discount}</Text>
          </View>
        )}
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>₹{product.sizes[0].price}</Text>
        <Text style={styles.originalPriceText}>
          ₹{product.sizes[0].originalPrice}
        </Text>
      </View>
      <Text style={styles.weightText}>1 KG</Text>
      <Text style={styles.productName}>{product.name}</Text>
      <TouchableOpacity style={styles.addToCartBtn}>
        <Text style={styles.addToCartText}>Add To Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '49%',
    marginTop: 15,
    padding: 10,
    borderRadius: 10,
  },
  imageContainer: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    backgroundColor: colors.productImageBackgorund,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: colors.secondary,
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 7,
  },
  discountText: {
    fontSize: 12,
    fontFamily: fonts.semiBold,
    color: '#000',
  },
  image: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
  },
  priceContainer: {
    flexDirection: 'row',
    gap: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  priceText: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
  },
  originalPriceText: {
    fontFamily: fonts.semiBold,
    fontStyle: 'italic',
    fontSize: 15,
    color: colors.borderColor,
    textDecorationLine: 'line-through',
  },
  productName: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
  },
  addToCartBtn: {
    backgroundColor: colors.primary,
    width: '100%',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  addToCartText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.inputBackground,
  },
  weightText: {
    fontSize: 12,
    fontFamily: fonts.semiBold,
    marginTop: -5,
  },
});

export default ProductCard;
