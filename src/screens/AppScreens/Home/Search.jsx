import {
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Layout from '../../Layout/Layout';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../../../utils/fonts';
import {
  EmptyShopping,
  ExploreNewCategory,
  Loader,
  PopularProducts,
} from '../../../components';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { flatten } from 'react-native/types_generated/Libraries/StyleSheet/StyleSheetExports';
import { searchService } from '../../../services/SearchService';
import { categoryService } from '../../../services/CategoryService';

const Search = () => {
  const navigation = useNavigation();

  // STATE VARIABLES
  const [query, setQuery] = useState('');
  const [searchProducts, setSearchProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // REf Variables
  const inputRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      inputRef.current.focus();
    }, []),
  );

  useEffect(() => {
    if (query.length >= 3) {
      fetchSearchResults();
    }
  }, [query]);

  const fetchSearchResults = async () => {
    try {
      setIsLoading(true);
      const data = await searchService.searchByQuery({ query });
      console.info(data);
      if (data?.success) {
        setSearchProducts(data?.products || []);
      } else {
        setSearchProducts([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setCategoryLoading(true);
      const data = await categoryService.getCategories();
      console.log('categoris', data);
      setCategories(data?.category || []);
    } catch (error) {
      console.log(error);
    } finally {
      setCategoryLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleProductPress = id => {
    navigation.navigate('ProductDetails', { id: id });
  };

  const renderSearchItem = ({ item }) => (
    <TouchableOpacity
      style={styles.searchItem}
      onPress={() => handleProductPress(item.id)}
      activeOpacity={0.6}
    >
      <View style={styles.productIcon}>
        <Ionicons name="basket-outline" size={24} color="#4A90E2" />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.productCategory}>{item.category}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Layout>
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
        >
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
              value={query}
              onChangeText={text => setQuery(text)}
              maxLength={50}
            />
          </View>
          {searchProducts.length > 0 ? (
            <FlatList
              contentContainerStyle={styles.searchContentContainer}
              data={searchProducts}
              keyExtractor={(_, index) => index + 'searchProducts'}
              renderItem={renderSearchItem}
              nestedScrollEnabled
              style={{ maxHeight: 350 }}
            />
          ) : isLoading ? (
            <View style={{ minHeight: 300 }}>
              <Loader />
            </View>
          ) : (
            <View style={{ marginTop: 20 }}>
              <EmptyShopping
                title={
                  query.length > 3 && searchProducts.length === 0
                    ? 'No results found'
                    : 'Time to search some items!'
                }
              />
            </View>
          )}

          {/* Categories */}
          <View>
            <ExploreNewCategory
              isLoading={categoryLoading}
              categories={categories}
            />
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
  contentContainerStyle: {
    paddingBottom: 50,
  },
  searchContentContainer: {
    minHeight: 300,
    paddingTop: 20,
    paddingLeft: 5,
    gap: 2,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 0,
    paddingHorizontal: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5EA',
  },
  productIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontFamily: fonts.medium || 'System',
    color: '#1C1C1E',
    marginBottom: 0,
  },
  productCategory: {
    fontSize: 13,
    color: '#8E8E93',
    fontFamily: fonts.light || 'System',
  },
});

export default Search;
