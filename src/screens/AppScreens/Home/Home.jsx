import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import Layout from '../../Layout/Layout';
import {
  BannerCard,
  BannerCardShimmer,
  CartAdd,
  CategoryCard,
  CategoryCardShimmer,
  CategoryShimmer,
  PrimaryHeader,
  ProductCard,
  ProductCardShimmer,
  SearchInput,
} from '../../../components';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { productService } from '../../../services/ProductService';
import { useFocusEffect } from '@react-navigation/native';
import { bannerService } from '../../../services/BannerService';
import { categoryService } from '../../../services/CategoryService';

const { width } = Dimensions.get('window');

const Home = () => {
  const [banners, setBanners] = useState([]);
  // const { width } = Dimensions.get('screen');

  const [selectedProductBottomSheet, setSelectedProductBottomSheet] = useState(
    {},
  );
  // Ref
  const bottomSheetRef = useRef(null);

  // State variables
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    id: 0,
    name: 'All',
  });

  // Loading state
  const [isProductLoading, setIsProductLoading] = useState(true);
  const [isBannerLoading, setIsBannerLoading] = useState(true);
  const [isCategoryLoading, setIsCategoryLoading] = useState(true);

  const openBottomSheet = ({ product }) => {
    setSelectedProductBottomSheet(product);
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

  const fetchProducts = async () => {
    try {
      setIsProductLoading(true);
      const data = await productService.getProducts();
      if (data?.success) {
        const filtProduct = data?.data.filter(item => item.sizes.length > 0);
        setProduct(filtProduct);
        console.log('filtProduct', filtProduct);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsProductLoading(false);
    }
  };

  const fetchBanner = async () => {
    try {
      setIsBannerLoading(true);
      const data = await bannerService.getBanners();
      console.log('banner', data);
      if (data?.success) {
        setBanners(data?.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsBannerLoading(false);
    }
  };

  const fetchCategory = async () => {
    try {
      setIsCategoryLoading(true);
      const data = await categoryService.getCategories();
      console.log('category', data.category);
      if (data?.success) {
        setCategory([{ id: 0, name: 'All' }, ...data?.category]);
      }
    } catch (error) {
      console.error(error);
    }finally{
      setIsCategoryLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
      fetchBanner();
      fetchCategory();
    }, []),
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Layout>
        <PrimaryHeader />
        <FlatList
          contentContainerStyle={styles.container}
          data={isProductLoading ? [1, 2, 3, 4] : product}
          keyExtractor={(item, index) => index + 'product'}
          ListHeaderComponent={() => (
            <View style={{ marginTop: 20, gap: 10 }}>
              <SearchInput type="navigation" screen={'Search'} />
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
              >
                {isBannerLoading ? (
                  <View
                    style={{
                      width: width - 20,
                    }}
                  >
                    <BannerCardShimmer />
                  </View>
                ) : (
                  banners.map((banner, index) => {
                    return (
                      <View
                        style={{
                          width: width - 20,
                        }}
                        key={index}
                      >
                        <BannerCard banner={banner} />
                      </View>
                    );
                  })
                )}
              </ScrollView>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {!isCategoryLoading && selectedCategory && (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedCategory(category[0]);
                    }}
                    style={[
                      styles.categoryCont,
                      {
                        backgroundColor: colors.primary,
                      },
                    ]}
                  >
                    <Text style={[styles.categoryText, { color: '#fff' }]}>
                      {selectedCategory?.name}
                    </Text>
                  </TouchableOpacity>
                )}
                {isCategoryLoading ? (
                  <CategoryShimmer count={5} />
                ) : (
                  category.map((cat, index) => {
                    return (
                      selectedCategory?.id !== cat.id && (
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedCategory(cat);
                          }}
                          style={[
                            styles.categoryCont,
                            selectedCategory?.id === cat.id && {
                              backgroundColor: colors.primary,
                            },
                          ]}
                          key={'category-' + index}
                        >
                          <Text
                            style={[
                              styles.categoryText,
                              selectedCategory.id === cat.id && {
                                color: '#fff',
                              },
                            ]}
                          >
                            {cat.name}
                          </Text>
                        </TouchableOpacity>
                      )
                    );
                  })
                )}
              </ScrollView>
            </View>
          )}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={({ item }, index) =>
            isProductLoading ? (
              <ProductCardShimmer />
            ) : (
              <ProductCard
                product={item}
                key={'product-' + index}
                openBottomSheet={openBottomSheet}
              />
            )
          }
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => (
            <View style={styles.footerContent}>
              <Text style={styles.categoryTitle}>Shop by category</Text>
              <View style={styles.categoryContainer}>
                {isCategoryLoading
                  ? [0, 4, 1, 2, 3, 5, 6, 7].map(item => (
                      <CategoryCardShimmer key={item+"category-card-shimmer"}/>
                    ))
                  : category.map((cat, index) => {
                      return cat.id!==0 && (
                        <CategoryCard
                          key={index + 'category-card'}
                          category={cat}
                        />
                      );
                    })}
              </View>
              <View style={styles.poweredBy}>
                <Image
                  style={styles.bottomImage}
                  source={require('./../../../../assets/images/bottom.png')}
                />
                <Text style={styles.poweredByText}>Powered By মড়াই</Text>
              </View>
            </View>
          )}
          // ListFooterComponentStyle={{ marginTop: 20 }}
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
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingBottom: 50,
    // paddingBottom: 10,
  },
  categoryCont: {
    backgroundColor: colors.inputBackground,
    marginHorizontal: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    elevation: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: fonts.regular,
  },
  row: {
    justifyContent: 'space-between',
    gap: 4,
  },
  footerContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: -4,
  },
  footerContent: {
    justifyContent: 'center',
    gap: 6,
    paddingTop: 8,
    marginTop: 10,
  },
  categoryTitle: {
    fontSize: width < 400 ? 14 : 16,
    fontFamily: fonts.semiBold,
    paddingHorizontal: 8,
  },
  poweredBy: {
    // marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    opacity: 0.5,
  },
  poweredByText: {
    fontSize: 16,
    fontFamily: fonts.medium,
    opacity: 0.5,
    marginTop: -55,
  },
});

export default Home;
