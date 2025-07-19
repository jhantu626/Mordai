import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Layout from '../../Layout/Layout';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Search = () => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Layout>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={30} color="black" />
        </TouchableOpacity>
      </Layout>
    </KeyboardAvoidingView>
  );
};

export default Search;

const styles = StyleSheet.create({});
