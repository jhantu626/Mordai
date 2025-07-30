import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Layout from '../../Layout/Layout';
import { LabelInput, SecondaryHeader } from '../../../components';
import { getActionFromState } from '@react-navigation/native';
import { fonts } from '../../../utils/fonts';
import { colors } from '../../../utils/colors';
import {
  validateIndianPhoneNumber,
  validateIndianPincode,
  validatePersonName,
} from '../../../utils/validations';
import { pincodeService } from '../../../services/PincodeService';

const AddAddress = () => {
  // STATE VARIABLES
  const [house, setHouse] = useState('');
  const [building, setBuilding] = useState('');
  const [area, setArea] = useState('');
  const [pincode, setPincode] = useState('');
  const [labe, setLabel] = useState('Home');
  const [reciverName, setReciverName] = useState('');
  const [reciverPhone, setReciverPhone] = useState('+91 ');

  // VALIDATION STATES
  const [isPincodeAvailable, setIsPincodeAvailable] = useState(true);

  // ERROR STATES
  const [error, setError] = useState({
    mobileError: '',
    houseError: '',
    areaError: '',
    pincodeError: '',
    labelError: '',
    buildingError: '',
    reciverNameError: '',
    reciverPhoneError: '',
    labelError: '',
    buildingError: '',
    reciverNameError: '',
  });

  // MOBILE USESTATE VARIFICATION
  useEffect(() => {
    if (reciverPhone.length > 4) {
      if (!validateIndianPhoneNumber(reciverPhone)) {
        setError({
          mobileError: 'Invalid Mobile Number',
        });
      } else {
        setError(prev => ({
          ...prev,
          mobileError: '',
        }));
      }
    }
  }, [reciverPhone]);

  // PINCODE DELIVERY AVAILABLITY
  useEffect(() => {
    if (pincode.length === 6) {
      checkPincodeAvailablity();
    }
  }, [pincode]);

  // VALIDATE ALL FUNCTIONS
  const validation = () => {
    if (!house) {
      setError({
        houseError: 'House No. & Flat No. is required',
      });
      return false;
    } else if (!area) {
      setError({
        areaError: 'Landmark & Area Name is required',
      });
      return false;
    } else if (!pincode || !validateIndianPincode(pincode)) {
      setError({
        pincodeError: 'Pincode is required',
      });
      return false;
    } else if (!reciverName || !validatePersonName(reciverName)) {
      setError({
        reciverNameError: 'Reciver Name is required',
      });
      return false;
    } else if (!reciverPhone || !validateIndianPhoneNumber(reciverPhone)) {
      setError({
        mobileError: 'Reciver Phone is required',
      });
      return false;
    }
  };

  const handleSubmit = () => {
    if (validation()) {
      console.log({
        house,
        building,
        area,
        pincode,
        labe,
        reciverName,
        reciverPhone,
      });
    }
  };

  const checkPincodeAvailablity = async () => {
    try {
      const data = await pincodeService.checkPincodeAvailablity({
        pincode: pincode,
      });
      if (data?.success) {
        setIsPincodeAvailable(true);
        console.log(data.data);
      } else {
        setIsPincodeAvailable(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Layout>
        <SecondaryHeader title="Add Address" />
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ gap: 10, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <LabelInput
            label="House No. & Flat No."
            value={house}
            setValue={setHouse}
            error={error.houseError}
          />
          <LabelInput
            label="Building & Block No. (If Any)"
            value={building}
            setValue={setBuilding}
          />
          <LabelInput
            label="Landmark & Area Name*"
            value={area}
            setValue={setArea}
            error={error.areaError}
          />
          <LabelInput
            label="Pincode(required**)"
            value={pincode}
            setValue={setPincode}
            error={
              !isPincodeAvailable ? 'Service Not Available' : error.pincodeError
            }
            maxLenth={6}
            keyboardType={'number-pad'}
          />
          <View style={styles.addressLabel}>
            <Text style={styles.addressLabelText}>Add Address Label</Text>
            <View style={styles.addressLabelTypeContainer}>
              {['Home', 'Office', 'Other'].map((item, index) => (
                <TouchableOpacity
                  key={index + 'addressLabelType'}
                  onPress={() => setLabel(item)}
                  style={[
                    styles.addressLabelType,
                    item === labe && { backgroundColor: '#000' },
                  ]}
                >
                  <Text
                    style={[
                      styles.addressLabelText,
                      item === labe && { color: '#fff' },
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.reciverContainer}>
            <Text style={styles.addressLabelText}>Reciver Details</Text>
            <LabelInput
              label="Reciver's Name"
              value={reciverName}
              setValue={setReciverName}
              error={error.reciverNameError}
            />
            <LabelInput
              label="Reciver's Phone Number"
              value={reciverPhone}
              setValue={setReciverPhone}
              minLength={4}
              maxLenth={14}
              error={error.mobileError}
            />
          </View>
        </ScrollView>
      </Layout>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={handleSubmit}
          disabled={isPincodeAvailable ? false : true}
        >
          <Text style={styles.saveBtnText}>SAVE ADDRESS</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  addressLabel: {
    marginTop: 15,
    gap: 10,
  },
  addressLabelText: {
    fontSize: 14,
    fontFamily: fonts.medium,
  },
  addressLabelType: {
    width: 85,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  addressLabelText: {
    fontSize: 14,
    fontFamily: fonts.medium,
  },
  addressLabelTypeContainer: {
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'center',
  },
  bottomContainer: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveBtn: {
    width: '90%',
    height: 45,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  saveBtnText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.inputBackground,
  },
  reciverContainer: {
    marginTop: 15,
    gap: 10,
  },
});

export default AddAddress;
