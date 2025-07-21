import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { useCartContext } from '../../contexts/CartContext';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

const ProductCard = ({ product, openBottomSheet }) => {
  const { carts, addToCart, getQuiantity, removeFromCart } = useCartContext();

  const hasProductInCart = carts.some(cart => cart.id === product.id);

  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        navigation.navigate('ProductDetails', { product: product });
        console.log(product);
      }}
    >
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
        {product.sizes[0].originalPrice > 0 && (
          <Text style={styles.originalPriceText}>
            ₹{product.sizes[0].originalPrice}
          </Text>
        )}
      </View>
      <Text style={styles.weightText}>{product.sizes[0].label}</Text>
      <Text style={styles.productName}>{product.name}</Text>
      {product.sizes.length > 1 ? (
        <TouchableOpacity
          style={styles.addToCartBtn}
          onPress={() => {
            openBottomSheet({ product: product });
          }}
        >
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
    </Pressable>
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
    height: 120,
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
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  priceContainer: {
    flexDirection: 'row',
    gap: 15,
    // marginVertical: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  priceText: {
    fontFamily: fonts.medium,
    fontSize: 14,
  },
  originalPriceText: {
    fontFamily: fonts.semiBold,
    fontStyle: 'italic',
    fontSize: 13,
    color: '#FF000080',
    textDecorationLine: 'line-through',
  },
  productName: {
    fontSize: 14,
    fontFamily: fonts.medium,
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
