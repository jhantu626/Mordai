import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Layout from '../../Layout/Layout';
import { LabelInput, SecondaryHeader } from '../../../components';
import { getActionFromState } from '@react-navigation/native';
import { fonts } from '../../../utils/fonts';
import { colors } from '../../../utils/colors';

const AddAddress = () => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Layout>
        <SecondaryHeader title="Add Address" />
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ gap: 10 }} showsVerticalScrollIndicator={false}>
          <LabelInput label="House No. & Flat No." />
          <LabelInput label="Building & Block No. (If Any)" />
          <LabelInput label="Landmark & Area Name(If Any)" />
          <LabelInput label="Pincode(required**)" />
          <View style={styles.addressLabel}>
            <Text style={styles.addressLabelText}>Add Address Label</Text>
            <View style={styles.addressLabelTypeContainer}>
              <TouchableOpacity
                style={[styles.addressLabelType, { backgroundColor: '#000' }]}
              >
                <Text style={[styles.addressLabelText, { color: '#fff' }]}>
                  Home
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addressLabelType}>
                <Text style={styles.addressLabelText}>Work</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addressLabelType}>
                <Text style={styles.addressLabelText}>Other</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.reciverContainer}>
            <Text style={styles.addressLabelText}>Reciver Details</Text>
            <LabelInput label="Reciver's Name" />
            <LabelInput label="Reciver's Phone Number" />
          </View>
        </ScrollView>
      </Layout>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.saveBtn}>
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
