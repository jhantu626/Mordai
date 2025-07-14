import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';

const PrimaryHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image
          style={styles.logo}
          source={require('./../../../assets/images/logo.png')}
        />
        <Pressable style={styles.locationContainer}>
          <Octicons name="location" size={18} color="black" />
          <Text style={styles.locationText}>8/1/C Gururdas Dutta</Text>
        </Pressable>
      </View>
      <View style={styles.rightContainer}>
        <Image
          style={styles.accountImage}
          source={require('./../../../assets/images/profile.png')}
          resizeMethod="resize"
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  logo: {
    width: 55,
    height: 55,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  rightContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  accountImage: {
    width: '100%',
    height: '100%',
  },
  locationText: {
    fontSize: 12,
    fontFamily: fonts.regular,
  },
});

export default PrimaryHeader;
