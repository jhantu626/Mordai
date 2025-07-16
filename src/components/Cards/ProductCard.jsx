import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { useCartContext } from '../../contexts/CartContext';
import Entypo from 'react-native-vector-icons/Entypo';

const ProductCard = ({ product }) => {
  const { carts, addToCart, getQuiantity,removeFromCart } = useCartContext();

  const hasProductInCart = carts.some(cart => cart.id === product.id);

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
      {product.sizes.length > 1 ? (
        <TouchableOpacity style={styles.addToCartBtn}>
          <Text style={styles.addToCartText}>
            {hasProductInCart ? 'Increase Quantity' : 'Add To Cart'}
          </Text>
        </TouchableOpacity>
      ) : hasProductInCart ? (
        <View
          style={[
            styles.addToCartBtn,
            { backgroundColor: 'transparent', flexDirection: 'row', gap: 5 },
          ]}
        >
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => {
              console.log(product);
              removeFromCart({
                item: {
                  id: product.id,
                  size: product.sizes[0].label,
                },
              });
            }}
          >
            <Entypo name="minus" size={21} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>
            {getQuiantity({
              item: { id: product.id, size: product.sizes[0].label },
            })}
          </Text>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => {
              addToCart({
                cart: {
                  id: product.id,
                  size: product.sizes[0].label,
                },
              });
            }}
          >
            <Entypo name="plus" size={21} color="#fff" />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.addToCartBtn}
          onPress={() =>
            addToCart({
              cart: {
                id: product.id,
                size: product.sizes[0].label,
                price: product.sizes[0].price,
                originalPrice: product.sizes[0].originalPrice,
                image: product.image,
                name: product.name,
              },
            })
          }
        >
          <Text style={styles.addToCartText}>Add To Cart</Text>
        </TouchableOpacity>
      )}
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
  btnContainer: {
    width: 40,
    height: '100%',
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    marginHorizontal: 10,
  },
});

export default ProductCard;
