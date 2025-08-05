import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Layout from '../../Layout/Layout';
import { LabelInput, SecondaryHeader } from '../../../components';
import {
  getActionFromState,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { fonts } from '../../../utils/fonts';
import { colors } from '../../../utils/colors';
import {
  validateIndianPhoneNumber,
  validateIndianPincode,
  validatePersonName,
} from '../../../utils/validations';
import { pincodeService } from '../../../services/PincodeService';
import { useAddress } from '../../../contexts/AddressContext';

const AddAddress = () => {
  const { addAddress, address, updateAddress } = useAddress();
  const navigation = useNavigation();
  const route = useRoute();
  console.log(route.params);
  const { mode, add } = route.params || { mode: 'create', add: {} };

  // STATE VARIABLES
  const [house, setHouse] = useState(mode === 'edit' ? add.house : '');
  const [building, setBuilding] = useState(mode === 'edit' ? add.building : '');
  const [area, setArea] = useState(mode === 'edit' ? add.area : '');
  const [pincode, setPincode] = useState(mode === 'edit' ? add.pincode : '');
  const [labe, setLabel] = useState(mode === 'edit' ? add.labe : 'Home');
  const [reciverName, setReciverName] = useState(
    mode === 'edit' ? add.reciverName : '',
  );
  const [reciverPhone, setReciverPhone] = useState(
    mode === 'edit' ? add.reciverPhone : '+91 ',
  );

  // LOADING STATE
  const [isLoading, setIsLoading] = useState(false);

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

    return true;
  };

  const handleSubmit = async () => {
    if (validation()) {
      try {
        setIsLoading(true);
        if (mode === 'edit') {
          const payload = {
            id: add.id,
            house,
            building,
            area,
            pincode,
            labe,
            reciverName,
            reciverPhone,
          };
          await updateAddress({ add: payload });
          ToastAndroid.show('Address updated successfully', ToastAndroid.SHORT);
          resetForm();
          navigation.navigate('Address');
          return;
        }
        const payload = {
          id: new Date().toISOString(),
          house,
          building,
          area,
          pincode,
          labe,
          reciverName,
          reciverPhone,
        };
        await addAddress({ add: payload });
        ToastAndroid.show('Address added successfully', ToastAndroid.SHORT);
        resetForm();
        navigation.navigate('Address');
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
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

  const resetForm = () => {
    setHouse('');
    setBuilding('');
    setArea('');
    setPincode('');
    setLabel('Home');
    setReciverName('');
    setReciverPhone('+91 ');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Layout>
        <SecondaryHeader
          title={mode === 'edit' ? 'Edit Address' : 'Add Address'}
        />
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
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size={'large'} color={'#fff'} />
          ) : (
            <Text style={styles.saveBtnText}>
              {mode === 'edit' ? 'UPDATE' : 'SAVE'} ADDRESS
            </Text>
          )}
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
