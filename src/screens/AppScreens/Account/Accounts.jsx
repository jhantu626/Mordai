import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Layout from '../../Layout/Layout';
import {
  DottedDivider,
  ProfileCard,
  SecondaryHeader,
} from '../../../components';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fonts } from '../../../utils/fonts';

const Accounts = () => {
  return (
    <Layout>
      <SecondaryHeader title="Profile" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <ProfileCard />
        <View style={styles.cardContainer}>
          <TouchableOpacity style={styles.card}>
            <Feather name="shopping-bag" size={30} color="#000000" />
            <Text numberOfLines={2} style={styles.cartText}>
              Your Orders
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Octicons name="comment-discussion" size={24} color="#000000" />
            <Text numberOfLines={2} style={styles.cartText}>
              Help & Support
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ gap: 5 }}>
          <Text style={styles.infoTextMain}>Your Information</Text>
          <View style={styles.infoContainer}>
            <TouchableOpacity style={styles.infoCard}>
              <View style={styles.infoCardLeft}>
                <Ionicons
                  name="person-circle-outline"
                  size={24}
                  color="#000000"
                />
                <Text style={styles.infoText}>Profile</Text>
              </View>
              <Entypo name="chevron-small-right" size={24} color="#000000" />
            </TouchableOpacity>
            <DottedDivider borderWidth={1} />
            <TouchableOpacity style={styles.infoCard}>
              <View style={styles.infoCardLeft}>
                <Ionicons name="location-outline" size={24} color="#000000" />
                <Text style={styles.infoText}>Saved Address</Text>
              </View>
              <Entypo name="chevron-small-right" size={24} color="#000000" />
            </TouchableOpacity>
            <DottedDivider borderWidth={1} />
            <TouchableOpacity style={styles.infoCard}>
              <View style={styles.infoCardLeft}>
                <Feather name="shopping-bag" size={24} color="#000000" />
                <Text style={styles.infoText}>Your Orders</Text>
              </View>
              <Entypo name="chevron-small-right" size={24} color="#000000" />
            </TouchableOpacity>
            <DottedDivider borderWidth={1} />
            <TouchableOpacity style={styles.infoCard}>
              <View style={styles.infoCardLeft}>
                <Octicons name="comment-discussion" size={24} color="#000000" />
                <Text style={styles.infoText}>Help & Support</Text>
              </View>
              <Entypo name="chevron-small-right" size={24} color="#000000" />
            </TouchableOpacity>
            <DottedDivider borderWidth={1} />
            <TouchableOpacity style={styles.infoCard}>
              <View style={styles.infoCardLeft}>
                <MaterialIcons name="security" size={24} color="#000000" />
                <Text style={styles.infoText}>Privecy Policy</Text>
              </View>
              <Entypo name="chevron-small-right" size={24} color="#000000" />
            </TouchableOpacity>
            <DottedDivider borderWidth={1} />
            <TouchableOpacity style={styles.infoCard}>
              <View style={styles.infoCardLeft}>
                <MaterialIcons name="assignment" size={24} color="#000000" />
                <Text style={styles.infoText}>Terms & Conditions</Text>
              </View>
              <Entypo name="chevron-small-right" size={24} color="#000000" />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutContainer}>
          <MaterialIcons name="logout" size={24} color="#000000" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.publisherText}>Powered by মড়াই</Text>
          <Text style={styles.licenseText}>Licensed © 2025, owned by মড়াই</Text>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 15,
    paddingBottom: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  card: {
    width: '48%',
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartText: {
    fontSize: 12,
    fontFamily: fonts.medium,
    width: 70,
    textAlign: 'center',
    marginTop: 5,
  },
  infoTextMain: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    marginLeft: 10,
  },
  infoContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 0.5,
    gap: 5,
  },
  infoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  infoCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoText: {
    fontSize: 12,
    fontFamily: fonts.medium,
  },
  logoutContainer: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
  },
  logoutText: {
    fontSize: 13,
    fontFamily: fonts.semiBold,
  },
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  publisherText:{
    opacity: 0.5,
    fontSize: 12,
    fontFamily: fonts.semiBold,
    color: '#00000080',
  },
  licenseText: {
    opacity: 0.5,
    fontSize: 12,
    fontFamily: fonts.semiBold,
    color: '#00000080',
  },
});

export default Accounts;
