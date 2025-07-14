import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { fonts } from '../../utils/fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../utils/colors';

const BannerCard = ({ banner }) => {
  return (
    <View
      style={[styles.container, { backgroundColor: banner.backgroundColor }]}
    >
      <Text style={styles.miniTitle}>{banner.subtitle}</Text>
      <Text style={styles.title}>{banner.title}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        <MaterialIcons name="check-circle" size={24} color={colors.primary} />
        <Text style={styles.offerText}>{banner.offer}</Text>
      </View>
      <TouchableOpacity style={styles.shopBtn}>
        <Text style={styles.btnText}>{banner.buttonText}</Text>
      </TouchableOpacity>
      <Image style={styles.image} source={banner.image} resizeMode='contain'/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 180,
    borderRadius: 15,
    overflow: 'hidden',
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    elevation: 0.5,
  },
  miniTitle: {
    fontSize: 12,
    fontFamily: fonts.semiBold,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.bold,
  },
  offerText: {
    fontSize: 12,
    fontFamily: fonts.semiBold,
    color: colors.primary,
  },
  shopBtn: {
    width: 110,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 5,
    marginTop: 15,
  },
  btnText: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: colors.inputBackground,
  },
  image: {
    width: 150,
    height: 150,
    position: 'absolute',
    right: 30,
    bottom: 20,
    zIndex: -1,
  },
});

export default BannerCard;