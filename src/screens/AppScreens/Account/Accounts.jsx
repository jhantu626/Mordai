import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Layout from '../../Layout/Layout';
import { ProfileCard, SecondaryHeader } from '../../../components';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import { fonts } from '../../../utils/fonts';

const Accounts = () => {
  return (
    <Layout>
      <SecondaryHeader title="Profile" />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
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
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
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
    marginTop: 5
  },
});

export default Accounts;
