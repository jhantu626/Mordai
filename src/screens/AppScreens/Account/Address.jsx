import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
import Layout from '../../Layout/Layout';
import { DottedDivider, SecondaryHeader } from '../../../components';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fonts } from '../../../utils/fonts';
import { colors } from '../../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../contexts/AuthContext';
import { useAddress } from '../../../contexts/AddressContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

const Address = () => {
  const [hasSavedAddress, setHasSavedAddress] = useState(true);
  const navigation = useNavigation();

  // REF VARIABLES
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%'], []);

  const { address, removeAddress } = useAddress();

  // STATE VARIABLES
  const [selectedAddress, setSelectedAddress] = useState(address[0]);

  const renderBackdrop = useMemo(
    () => props =>
      (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
        />
      ),
    [],
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Layout>
        <SecondaryHeader title={'Address'} />
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.container}
        >
          <TouchableOpacity
            style={styles.addCard}
            onPress={() => {
              navigation.navigate('AddAddress');
            }}
          >
            <View style={styles.leftContainer}>
              <AntDesign name="plus" size={20} color={colors.pinkColor} />
              <Text style={styles.addText}>Add New Address</Text>
            </View>
            <Entypo name="chevron-small-right" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.savedText}>Saved Addresses</Text>
          {!hasSavedAddress && (
            <View style={styles.notFOundContainer}>
              <Image
                style={styles.image}
                source={require('./../../../../assets/images/address.png')}
              />
              <Text style={styles.notFoundText}>No Saved Address</Text>
            </View>
          )}
          <View style={styles.addreddContainer}>
            <FlatList
              data={address}
              keyExtractor={(_, index) => index + '-addresses'}
              renderItem={({ item, index }) => (
                <View>
                  <View style={styles.addressCard}>
                    <View
                      style={[styles.leftContainer, { gap: 10, width: '80%' }]}
                    >
                      <Octicons name="location" size={24} color={'#00000090'} />
                      <View>
                        <View style={{ flexDirection: 'row', gap: 5 }}>
                          <Text style={styles.titleText}>{item.labe}</Text>
                          {index === 0 && (
                            <Text style={styles.selectedText}>Selected</Text>
                          )}
                        </View>
                        <Text numberOfLines={1} style={styles.addressText}>
                          {item.house}, {item.building}, {item.area},{' '}
                          {item.pincode},{' '}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        bottomSheetRef.current.expand();
                        setSelectedAddress(item);
                      }}
                    >
                      <Entypo
                        name="dots-three-vertical"
                        size={20}
                        color="#00000090"
                      />
                    </TouchableOpacity>
                  </View>
                  {index !== 2 && <DottedDivider borderWidth={1} />}
                </View>
              )}
              ListEmptyComponent={() => {
                return (
                  <View style={styles.notFOundContainer}>
                    <Image
                      style={styles.image}
                      source={require('./../../../../assets/images/address.png')}
                    />
                    <Text style={styles.notFoundText}>No Saved Address</Text>
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>
      </Layout>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1}
        backdropComponent={renderBackdrop}
        animationConfigs={{
          duration: 200,
        }}
        enablePanDownToClose
        handleComponent={null}
      >
        <BottomSheetView style={styles.bottomSheetContainer}>
          <View>
            <Text style={styles.bottomsheetTitleText}>
              {selectedAddress?.labe}
            </Text>
            <Text style={styles.bottomsheetAddressText}>
              {selectedAddress?.house}, {selectedAddress?.building},{' '}
              {selectedAddress?.area}, {selectedAddress?.pincode}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              navigation.navigate('AddAddress', {
                add: selectedAddress,
                mode: 'edit',
              });
            }}
          >
            <AntDesign name="edit" size={36} color="#000000" />
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={async () => {
              console.log('delete', selectedAddress);
              await removeAddress({ add: selectedAddress });
              bottomSheetRef.current.close();
            }}
          >
            <MaterialIcons name="delete-outline" size={36} color="#FF0000" />
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 15,
  },
  addCard: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignItems: 'center',
    gap: 10,
  },
  addText: {
    fontSize: 13,
    fontFamily: fonts.semiBold,
    color: '#ff389bff',
  },
  savedText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: '#000000',
    letterSpacing: 0.5,
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  notFOundContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: '#00000080',
  },
  addreddContainer: {
    width: '100%',
    paddingVertical: 20,
    paddingLeft: 15,
    paddingRight: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    gap: 10,
  },
  addressCard: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },
  titleText: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: '#000000',
  },
  selectedText: {
    fontSize: 10,
    fontFamily: fonts.semiBold,
    color: colors.pinkColor,
    backgroundColor: '#FF69B420',
    paddingHorizontal: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  addressText: {
    fontSize: 12,
    fontFamily: fonts.light,
    color: '#000000',
  },
  bottomSheetContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    gap: 15,
  },
  bottomsheetTitleText: {
    fontSize: 15,
    fontFamily: fonts.semiBold,
    color: '#000000',
  },
  bottomsheetAddressText: {
    fontSize: 13,
    fontFamily: fonts.regular,
    color: '#000000',
    width: '90%',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: '#000000',
  },
});

export default Address;
