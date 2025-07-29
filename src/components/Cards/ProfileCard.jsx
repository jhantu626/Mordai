import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { fonts } from '../../utils/fonts';
import { colors } from '../../utils/colors';

const ProfileCard = () => {
  return (
    <LinearGradient
      colors={['#d9f99d', '#f7fee7']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <Image
        source={require('./../../../assets/images/default-profile.png')}
        style={styles.image}
      />
      <View style={styles.rihtContainer}>
        <Text style={styles.nameText}>Pritam Bala</Text>
        <Text style={styles.phoneText}>+91 9775746484</Text>
        <View style={{ flexDirection: 'row', gap: 5 }}>
          <LinearGradient
            style={styles.dailyContainer}
            colors={['#85c325', '#65a30d']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.dailyText}>Daily</Text>
          </LinearGradient>
          <Text style={styles.memberText}>Members</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 40,
    flexDirection: 'row',
    gap: 5,
    shadowColor: '#00000080',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 0.6,
    borderColor: '#00000020',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  rihtContainer: {
    height: '100%',
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
  },
  phoneText: {
    fontSize: 14,
    fontFamily: fonts.medium,
  },
  dailyContainer: {
    paddingHorizontal: 10,
    paddingVertical: 1,
    backgroundColor: colors.primary,
    borderRadius: 15,
  },
  dailyText: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: '#fff',
  },
  memberText: {
    fontSize: 12,
    fontFamily: fonts.medium,
  },
});

export default ProfileCard;
