import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import { DefaultInput } from '../../components';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { useNavigation } from '@react-navigation/native';

const LoginSignup = () => {
  const navigation = useNavigation();

  const [mobileNumber, setMobileNumber] = useState('');
  return (
    <Layout>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
        <Text style={styles.loginText}>Login</Text>
        <Text style={styles.loginTitle}>Login with Mobile Number</Text>
        <DefaultInput
          placeholder={'Enter Mobile Number'}
          keyboardType="phone-pad"
          value={mobileNumber}
          setValue={setMobileNumber}
        />
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => {
            navigation.navigate('Otp');
          }}
        >
          <Text style={styles.btnText}>Send OTP</Text>
        </TouchableOpacity>
        <Text style={styles.otpText}>
          We'll send you a 6-digit OTP to verify your number
        </Text>
      </ScrollView>
      <Text style={styles.publisherText}>Powered by মড়াই</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
    gap: 20,
  },
  loginText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  btnContainer: {
    backgroundColor: colors.primary,
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.inputBackground,
  },
  otpText: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: '#00000080',
  },
  publisherText: {
    fontSize: 12,
    color: '#00000080',
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default LoginSignup;
