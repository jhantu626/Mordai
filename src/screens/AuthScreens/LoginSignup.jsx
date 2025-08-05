import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { DefaultInput } from '../../components';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { useNavigation } from '@react-navigation/native';
import { validateIndianPhoneNumber } from '../../utils/validations';

const LoginSignup = () => {
  const navigation = useNavigation();

  const [mobileNumber, setMobileNumber] = useState('+91 ');

  // ERROR STATE
  const [error, setError] = useState('');

  useEffect(() => {
    if (mobileNumber.length > 4) {
      if (!validateIndianPhoneNumber(mobileNumber)) {
        setError('Mobile number is not valid');
      } else {
        setError('');
      }
    }
  }, [mobileNumber]);

  // HANDLE SUBMIT
  const handleSubmit = () => {
    if (validateIndianPhoneNumber(mobileNumber)) {
      navigation.navigate('Otp', { mobile: mobileNumber });
    }
  };

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
          maxLength={14}
          minLength={4}
        />
        {error && mobileNumber.length > 4 && (
          <Text style={styles.errorText}>{error}</Text>
        )}
        <TouchableOpacity style={styles.btnContainer} onPress={handleSubmit}>
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
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: -15,
  },
});

export default LoginSignup;
