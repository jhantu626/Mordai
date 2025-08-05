import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Layout from '../Layout/Layout';
import { fonts } from '../../utils/fonts';
import { colors } from '../../utils/colors';
import { useNavigation, useRoute } from '@react-navigation/native';

const Otp = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { mobile } = route.params || {};
  console.log(mobile);

  const [timer, setTimer] = useState(180);
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Pad with leading zero if needed
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  const handleOtpChange = (text, index) => {
    if (!/^[0-9]*$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (event, index) => {
    if (event.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  return (
    <Layout>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
        <Text style={styles.loginText}>Enter OTP</Text>
        <Text style={styles.otpSentText}>OTP sent to {mobile.replace(' ','-')}</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {otp.map((digit, index) => (
            <View
              key={index}
              style={[styles.otpInputBox, digit ? styles.filledInput : null]}
            >
              <TextInput
                ref={ref => (inputRefs.current[index] = ref)}
                style={[styles.inputText, digit && { color: '#fff' }]}
                maxLength={1}
                selectionColor={digit ? '#fff' : '#000'}
                keyboardType="numeric"
                value={digit}
                onChangeText={text => handleOtpChange(text, index)}
                onKeyPress={event => handleKeyPress(event, index)}
                autoFocus={index === 0}
              />
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => {
            navigation.navigate('Home');
          }}
        >
          <Text style={styles.btnText}>Verify OTP</Text>
        </TouchableOpacity>

        <View style={styles.resendContainer}>
          <Text>Resent OTP in </Text>
          <TouchableOpacity
            disabled={timer > 0}
            style={{ justifyContent: 'center', alignItems: 'center' }}
          >
            {timer > 0 ? (
              <Text style={styles.resendText}>{formatTime(timer)}</Text>
            ) : (
              <Text style={styles.resendText}>Resend</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    fontFamily: fonts.semiBold,
  },
  otpSentText: {
    fontSize: 16,
    fontFamily: fonts.medium,
    marginTop: -10,
  },
  otpInputBox: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: colors.borderColor,
    backgroundColor: colors.inputBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  filledInput: {
    backgroundColor: colors.primary, // Highlight when filled
  },
  inputText: {
    fontSize: 16,
    fontFamily: fonts.medium,
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  btnContainer: {
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  btnText: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: colors.inputBackground,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginTop: 30,
  },
  resendText: {
    color: colors.primary,
    fontFamily: fonts.semiBold,
  },
});

export default Otp;
