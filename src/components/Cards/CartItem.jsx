import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { useCartContext } from '../../contexts/CartContext';

const CartItem = ({ item, onIncrease, onDecrease }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{ uri: item.image }}
          />
        </View>
        <View style={styles.leftRightContainer}>
          <Text style={styles.productName}>
            {item.name.length > 15 ? item.name.slice(0, 18) + '...' : item.name}
          </Text>
          <Text style={styles.weightText}>{item.size}</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => onDecrease()}
        >
          <Entypo name="minus" size={21} color="black" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => onIncrease()}
        >
          <Entypo name="plus" size={21} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
  },
  leftContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    height: '100%',
  },
  imageContainer: {
    width: 65,
    height: 65,
    backgroundColor: colors.inputBackground,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 0.7,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  leftRightContainer: {},
  productName: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: '#00000099',
  },
  weightText: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: '#00000080',
    marginTop: -3,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  btnContainer: {
    width: 35,
    height: 35,
    backgroundColor: colors.productImageBackgorund,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 0.7,
  },
  quantityText: {
    fontSize: 16,
    fontFamily: fonts.medium,
  },
});

export default CartItem;
