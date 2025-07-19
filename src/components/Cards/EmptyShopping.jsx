import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { fonts } from '../../utils/fonts';

const EmptyShopping = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('./../../../assets/images/shoppingbag.png')}
      />
      <Text style={styles.titleText}>Time to search some items!</Text>
      <Text style={styles.subTitleText}>
        Enjoy searching for the best deals
      </Text>
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
    marginTop: 5
  },
  subTitleText: {
    fontSize: 12,
    fontFamily: fonts.semiBold,
    color: '#00000060',
    marginTop: -5,
  },
});

export default EmptyShopping;
