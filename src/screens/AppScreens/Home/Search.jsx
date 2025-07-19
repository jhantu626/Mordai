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
import { fonts } from '../../../utils/fonts';
import { colors } from '../../../utils/colors';
import { EmptyShopping, ExploreNewCategory } from '../../../components';
import { useNavigation } from '@react-navigation/native';

const Search = () => {
  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Layout>
        <View style={styles.searchContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="chevron-back" size={20} color="#00000080" />
          </TouchableOpacity>
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            selectionColor={'#000'}
            placeholderTextColor={'#00000080'}
            textAlignVertical="center"
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <EmptyShopping />
        </View>

        {/* Categories */}
        <View style={{ marginTop: 20 }}>
          <ExploreNewCategory />
        </View>
      </Layout>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    width: '100%',
    height: 45,
    backgroundColor: '#e5e7e9',
    borderWidth: 0.7,
    borderRadius: 5,
    borderColor: '#00000050',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    textAlignVertical: 'center',
    fontSize: 14,
    fontFamily: fonts.light,
  },
});

export default Search;
