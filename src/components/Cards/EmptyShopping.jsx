import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { fonts } from '../../utils/fonts';
import { colors } from '../../utils/colors';

const EmptyShopping = ({title="Time to search some items!"}) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('./../../../assets/images/shoppingbag.png')}
      />
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.subTitleText}>
        Enjoy searching for the best deals
      </Text>
      <TouchableOpacity style={styles.btnContainer}>
        <Text style={styles.btnText}>Browse Products</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 190,
    height: 200,
    alignSelf: 'center',
  },
  titleText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: '#00000080',
    marginTop: 5,
  },
  subTitleText: {
    fontSize: 12,
    fontFamily: fonts.semiBold,
    color: '#00000060',
    marginTop: -5,
  },
  btnContainer: {
    backgroundColor: colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 20
  },
  btnText:{
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: colors.inputBackground
  }
});

export default EmptyShopping;
