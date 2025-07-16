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
import React, { useMemo, useRef, useState } from 'react';
import Layout from '../../Layout/Layout';
import {
  BannerCard,
  CartAdd,
  PrimaryHeader,
  ProductCard,
  SearchInput,
} from '../../../components';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import Entypo from 'react-native-vector-icons/Entypo';

const categories = ['All', 'Fruits', 'Vegetables', 'Juice', 'Dairy', 'Bakery'];

const product = [
  {
    id: 1,
    name: 'Orange Juice',
    sizes: [
      { label: '500ml', price: 30.0, originalPrice: 35.0 },
      { label: '1L', price: 50.0, originalPrice: 55.0 },
    ],
    discount: '10% Off',
    category: 'Juices',
    orderCode: '12345625',
    purchaseDate: '31 May 2023',
    paymentMethod: 'Online payment',
    image: require('./../../../../assets/images/product1.png'),
  },
  {
    id: 2,
    name: 'Capsicum',
    sizes: [
      { label: '250g', price: 15.0, originalPrice: 18.0 },
      { label: '500g', price: 30.0, originalPrice: 35.0 },
    ],
    discount: '8% Off',
    category: 'Vegetables',
    image: require('./../../../../assets/images/product2.png'),
  },
  {
    id: 3,
    name: 'Ripe Mango',
    sizes: [{ label: '1kg', price: 50.0, originalPrice: 55.0 }],
    discount: '10% Off',
    category: 'Fruits',
    orderCode: '12345678',
    purchaseDate: '31 May 2023',
    paymentMethod: 'Online payment',
    image: require('./../../../../assets/images/product3.png'),
  },
  {
    id: 4,
    name: 'Black Grape',
    sizes: [{ label: '500g', price: 30.0, originalPrice: 35.0 }],
    category: 'Fruits',
    orderCode: '12345678',
    purchaseDate: '31 May 2023',
    paymentMethod: 'Online payment',
    image: require('./../../../../assets/images/product4.png'),
  },
  {
    id: 5,
    name: 'Fresh Coconut',
    sizes: [
      { label: '1 pc', price: 30.0, originalPrice: 35.0 },
      { label: '2 pcs', price: 55.0, originalPrice: 70.0 },
    ],
    category: 'Fruits',
    orderCode: '12344672',
    purchaseDate: '31 May 2023',
    paymentMethod: 'Online payment',
    image: require('./../../../../assets/images/product1.png'),
  },
];

const Home = () => {
  const [banners, setBanners] = useState([
    {
      id: 1,
      title: 'Savon Stories',
      subtitle: 'Cold Process Organic',
      offer: 'BUY 1 GET 1 FREE',
      buttonText: 'Shop Now',
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
  const { width } = Dimensions.get('screen');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [selectedProductBottomSheet, setSelectedProductBottomSheet] = useState(
    {},
  );
  // Ref
  const bottomSheetRef = useRef(null);

  const openBottomSheet = ({ product }) => {
    setSelectedProductBottomSheet(product);
    console.log(product);
    bottomSheetRef.current?.expand();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Layout>
        <PrimaryHeader />
        <FlatList
          contentContainerStyle={styles.container}
          data={product}
          keyExtractor={(item, index) => index + 'product'}
          ListHeaderComponent={() => (
            <View style={{ marginTop: 20, gap: 10 }}>
              <SearchInput />
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
              >
                {banners.map((banner, index) => {
                  return (
                    <View
                      style={{
                        width: width - 40,
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
          renderItem={({ item }, index) => (
            <ProductCard
              product={item}
              key={'product-' + index}
              openBottomSheet={openBottomSheet}
            />
          )}
          showsVerticalScrollIndicator={false}
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
          duration: 200,
        }}
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
    paddingBottom: 50,
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
});

export default Home;
