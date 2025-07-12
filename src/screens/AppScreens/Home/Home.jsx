import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Layout from '../../Layout/Layout';
import { PrimaryHeader, SearchInput } from '../../../components';

const Home = () => {
  return (
    <Layout>
      <PrimaryHeader />
      <View style={{ marginTop: 20 }}>
        <SearchInput />
      </View>
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({});
