import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useRef } from 'react';
import Layout from '../../Layout/Layout';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../../../utils/fonts';
import { colors } from '../../../utils/colors';
import {
  EmptyShopping,
  ExploreNewCategory,
  PopularProducts,
} from '../../../components';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { flatten } from 'react-native/types_generated/Libraries/StyleSheet/StyleSheetExports';

const Search = () => {
  const navigation = useNavigation();

  // REf Variables
  const inputRef=useRef(null);

  useFocusEffect(useCallback(()=>{
    inputRef.current.focus();
  },[]))

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Layout>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainerStyle}>
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
              ref={inputRef}
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <EmptyShopping />
          </View>

          {/* Categories */}
          <View>
            <ExploreNewCategory />
          </View>

          <View style={{ marginTop: 0 }}>
            <PopularProducts />
          </View>

          
        </ScrollView>
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
  contentContainerStyle:{
    paddingBottom: 50
  }
});

export default Search;
