import {
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Layout from '../../Layout/Layout';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { fonts } from '../../../utils/fonts';
import { colors } from '../../../utils/colors';
import {
  CartAdd,
  Loader,
  ProductCard,
  ProductCardShimmer,
} from '../../../components';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { productService } from '../../../services/ProductService';

const Products = () => {
  const navigation = useNavigation();

  const [product, setProduct] = useState([]);
  const [selectedProductBottomSheet, setSelectedProductBottomSheet] = useState(
    {},
  );
  const [pageNo, setPageNo] = useState(1);
  const [hasMorePage, setHasMorePage] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isBottomLoading, setIsBottomLoading] = useState(true);
  // Ref
  const bottomSheetRef = useRef(null);

  const openBottomSheet = ({ product }) => {
    setSelectedProductBottomSheet(product);
    console.log(product);
    bottomSheetRef.current?.expand();
  };

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

  const fetchProduct = async () => {
    try {
      if (pageNo === 1) {
        setIsLoading(true);
      } else {
        setIsBottomLoading(true);
      }

      const data = await productService.getProductsWithPage({ pageno: pageNo });
      if (data?.success) {
        console.log(data);
        const filtData = data?.data.filter(item => item.sizes.length > 0);
        console.log('page', pageNo);
        if (pageNo === 1) {
          setProduct(filtData);
        } else {
          setProduct(prev => [...prev, ...filtData]);
        }
      } else {
        setHasMorePage(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsBottomLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProduct();
    }, []),
  );

  useEffect(() => {
    if (hasMorePage) {
      fetchProduct();
    }
  }, [pageNo]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
            <Pressable
              style={styles.searchInputContainer}
              onPress={() => {
                navigation.navigate('Search');
              }}
            >
              <TextInput
                onPress={() => {
                  navigation.navigate('Search');
                }}
                placeholder="Search"
                style={styles.searchInput}
                selectionColor={'#000'}
                placeholderTextColor={'#00000080'}
                textAlignVertical="center"
                editable={false}
              />
            </Pressable>
          </View>
          {/* Filter Container */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ height: 35, gap: 10, marginVertical: 10 }}
          >
            <TouchableOpacity style={styles.filterContainer}>
              <Ionicons name="filter-outline" color="black" size={20} />
              <Text
                style={{ fontFamily: fonts.regular, fontSize: 14 }}
                textAlignVertical="center"
              >
                Filter
              </Text>
            </TouchableOpacity>
          </ScrollView>
          <FlatList
            data={isLoading ? [0, 1, 2, 3] : product}
            keyExtractor={(_, index) => 'product-' + index}
            renderItem={({ item }) =>
              isLoading ? (
                <ProductCardShimmer key={item + 'product-card-shimmer'} />
              ) : (
                <ProductCard product={item} openBottomSheet={openBottomSheet} />
              )
            }
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', gap: 4 }}
            contentContainerStyle={styles.contentContainerStyle}
            showsVerticalScrollIndicator={false}
            onEndReached={() => {
              if (!isLoading && hasMorePage) {
                setPageNo(prev => prev + 1);
              }
              console.log(pageNo);
            }}
            ListFooterComponent={() =>
              isBottomLoading && pageNo > 1 && <Loader />
            }
            ListFooterComponentStyle={{ marginTop: 10 }}
          />
        </Layout>

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={useMemo(() => ['20%'], [])}
          index={-1}
          enablePanDownToClose
          dynam
          enableOverDrag
          animationConfigs={{
            duration: 300,
          }}
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView>
            <BottomSheetFlatList
              data={selectedProductBottomSheet.sizes || []}
              keyExtractor={(_, index) => 'size-' + index}
              contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
              renderItem={({ item }, index) => (
                <CartAdd
                  product={{
                    id: selectedProductBottomSheet.id,
                    name: selectedProductBottomSheet.name,
                    image: selectedProductBottomSheet.image,
                    price: item.price,
                    size: item.label,
                  }}
                />
              )}
            />
          </BottomSheetView>
        </BottomSheet>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: 50,
  },
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
  searchInputContainer: {
    flex: 1,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    textAlignVertical: 'center',
    fontSize: 14,
    fontFamily: fonts.light,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: colors.borderColor + 80,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Products;
