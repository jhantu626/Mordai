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
  CartAdd,
  CategoryCard,
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

const categories = ['All', 'Fruits', 'Vegetables', 'Juice', 'Dairy', 'Bakery'];

// const product = [
//   {
//     id: 1,
//     name: 'Orange Juice',
//     sizes: [
//       { label: '500ml', price: 30.0, originalPrice: 35.0 },
//       { label: '1L', price: 50.0, originalPrice: 55.0 },
//     ],
//     discount: '10% Off',
//     category: 'Juices',
//     image: require('./../../../../assets/images/product1.png'),
//   },
//   {
//     id: 2,
//     name: 'Capsicum',
//     sizes: [
//       { label: '250g', price: 15.0, originalPrice: 18.0 },
//       { label: '500g', price: 30.0, originalPrice: 35.0 },
//     ],
//     discount: '8% Off',
//     category: 'Vegetables',
//     image: require('./../../../../assets/images/product2.png'),
//   },
//   {
//     id: 3,
//     name: 'Ripe Mango',
//     sizes: [{ label: '1kg', price: 50.0, originalPrice: 55.0 }],
//     discount: '10% Off',
//     category: 'Fruits',
//     image: require('./../../../../assets/images/product3.png'),
//   },
//   {
//     id: 4,
//     name: 'Black Grape',
//     sizes: [{ label: '500g', price: 30.0, originalPrice: 35.0 }],
//     category: 'Fruits',
//     image: require('./../../../../assets/images/product4.png'),
//   },
//   {
//     id: 5,
//     name: 'Fresh Coconut',
//     sizes: [
//       { label: '1 pc', price: 30.0, originalPrice: 35.0 },
//       { label: '2 pcs', price: 55.0, originalPrice: 70.0 },
//     ],
//     category: 'Fruits',
//     image: require('./../../../../assets/images/product5.png'),
//   },
//   {
//     id: 6,
//     name: 'Carrot',
//     sizes: [
//       { label: '250g', price: 12.0, originalPrice: 15.0 },
//       { label: '500g', price: 22.0, originalPrice: 28.0 },
//     ],
//     discount: '7% Off',
//     category: 'Vegetables',
//     image: require('./../../../../assets/images/product6.png'),
//   },
//   {
//     id: 7,
//     name: 'Pineapple Juice',
//     sizes: [
//       { label: '500ml', price: 35.0, originalPrice: 40.0 },
//       { label: '1L', price: 60.0, originalPrice: 65.0 },
//     ],
//     discount: '8% Off',
//     category: 'Juices',
//     image: require('./../../../../assets/images/product7.png'),
//   },
//   {
//     id: 8,
//     name: 'Banana',
//     sizes: [{ label: '1 dozen', price: 40.0, originalPrice: 45.0 }],
//     category: 'Fruits',
//     image: require('./../../../../assets/images/product8.png'),
//   },
//   {
//     id: 9,
//     name: 'Tomato',
//     sizes: [
//       { label: '250g', price: 10.0, originalPrice: 12.0 },
//       { label: '500g', price: 18.0, originalPrice: 22.0 },
//     ],
//     discount: '5% Off',
//     category: 'Vegetables',
//     image: require('./../../../../assets/images/product9.png'),
//   },
//   {
//     id: 10,
//     name: 'Watermelon Slice',
//     sizes: [{ label: '1 slice', price: 25.0, originalPrice: 30.0 }],
//     category: 'Fruits',
//     image: require('./../../../../assets/images/product10.png'),
//   },
// ];

const category = [
  {
    id: 1,
    name: 'Cart 1',
    image: require('./../../../../assets/images/cat1.png'),
  },
  {
    id: 2,
    name: 'Cart 2',
    image: require('./../../../../assets/images/cat2.png'),
  },
  {
    id: 3,
    name: 'Cart 3',
    image: require('./../../../../assets/images/cat3.png'),
  },
  {
    id: 4,
    name: 'Cart 4',
    image: require('./../../../../assets/images/cart4.png'),
  },
  {
    id: 5,
    name: 'Cart 5',
    image: require('./../../../../assets/images/cat1.png'),
  },
  {
    id: 6,
    name: 'Cart 6',
    image: require('./../../../../assets/images/cat2.png'),
  },
  {
    id: 7,
    name: 'Cart 7',
    image: require('./../../../../assets/images/cat3.png'),
  },
  {
    id: 8,
    name: 'Cart 8',
    image: require('./../../../../assets/images/cart4.png'),
  },
  {
    id: 9,
    name: 'Cart 9',
    image: require('./../../../../assets/images/cat1.png'),
  },
  {
    id: 10,
    name: 'Cart 10',
    image: require('./../../../../assets/images/cat2.png'),
  },
  {
    id: 15,
    name: 'Cart 15',
    image: require('./../../../../assets/images/cat3.png'),
  },
  {
    id: 18,
    name: 'Cart 18',
    image: require('./../../../../assets/images/cat2.png'),
  },
  {
    id: 19,
    name: 'Cart 19',
    image: require('./../../../../assets/images/cat3.png'),
  },
  {
    id: 20,
    name: 'Cart 20',
    image: require('./../../../../assets/images/cart4.png'),
  },
];

const { width } = Dimensions.get('window');

const Home = () => {
  const [banners, setBanners] = useState([
    {
      id: 1,
      title: 'Savon Stories',
      subtitle: 'Cold Process Organic',
      offer: 'BUY 1 GET 1 FREE',
      buttonText: 'Shop Now',
      category: 'Fruits',
      backgroundColor: '#fef07a',
      image: require('./../../../../assets/images/straw.png'),
    },
    {
      id: 2,
      title: 'Fresh Farm',
      subtitle: 'Cold Process Organic',
      offer: '20% Off',
      buttonText: 'Shop Now',
      backgroundColor: '#dceccf',
      image: require('./../../../../assets/images/banner2.png'),
    },
    {
      id: 3,
      title: 'Juicy Deals',
      subtitle: 'Cold Pressed Juices',
      offer: 'Flat 15% Off',
      buttonText: 'Buy Now',
      backgroundColor: '#ffd6a5',
      image: require('./../../../../assets/images/banner.png'),
    },
    {
      id: 4,
      title: 'Green Basket',
      subtitle: 'Fresh Vegetables',
      offer: 'Buy 2 Get 1 Free',
      buttonText: 'Explore',
      backgroundColor: '#caffbf',
      image: require('./../../../../assets/images/banner3.png'),
    },
  ]);
  // const { width } = Dimensions.get('screen');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [selectedProductBottomSheet, setSelectedProductBottomSheet] = useState(
    {},
  );
  // Ref
  const bottomSheetRef = useRef(null);

  // State variables
  const [product, setProduct] = useState([]);

  // Loading state
  const [isProductLoading, setIsProductLoading] = useState(true);

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
        console.log("filtProduct",filtProduct);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsProductLoading(false);
    }
  };

  const fetchBanner=async ()=>{
    
  }

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
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
                {banners.map((banner, index) => {
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
                })}
              </ScrollView>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedCategory(category);
                  }}
                  style={[
                    styles.categoryCont,
                    {
                      backgroundColor: colors.primary,
                    },
                  ]}
                >
                  <Text style={[styles.categoryText, { color: '#fff' }]}>
                    {selectedCategory}
                  </Text>
                </TouchableOpacity>
                {categories.map((category, index) => {
                  return (
                    selectedCategory !== category && (
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedCategory(category);
                        }}
                        style={[
                          styles.categoryCont,
                          selectedCategory === category && {
                            backgroundColor: colors.primary,
                          },
                        ]}
                        key={'category-' + index}
                      >
                        <Text
                          style={[
                            styles.categoryText,
                            selectedCategory === category && { color: '#fff' },
                          ]}
                        >
                          {category}
                        </Text>
                      </TouchableOpacity>
                    )
                  );
                })}
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
                {category.map((cat, index) => {
                  return (
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
