import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
import Layout from '../../Layout/Layout';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CartAdd, ReletedProduct, SecondaryHeader } from '../../../components';
import { colors } from '../../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import { fonts } from '../../../utils/fonts';
import { useCartContext } from '../../../contexts/CartContext';
import Entypo from 'react-native-vector-icons/Entypo';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

const { width } = Dimensions.get('window');

const ProductDetails = () => {
  // Context
  const { addToCart, removeFromCart, getQuiantity, isCartPresent } =
    useCartContext();

  const [product, setProduct] = useState({
    id: 25,
    name: '\u09b2\u0999\u09cd\u0995\u09be (Green Chili)',
    description: '',
    category: '\u09b8\u09ac\u099c\u09bf \u09ac\u09be\u099c\u09be\u09b0',
    image: require('./../../../../assets/images/product1.png'),
    gallery: [
      require('./../../../../assets/images/product1.png'),
      require('./../../../../assets/images/product2.png'),
      require('./../../../../assets/images/product3.png'),
      require('./../../../../assets/images/product4.png'),
    ],
    sizes: [
      {
        id: 77,
        label: '100 Gm',
        price: 16,
        original_price: 0,
        stock: 5,
        sku: null,
      },
      {
        id: 77,
        label: '200 Gm',
        price: 16,
        original_price: 0,
        stock: 5,
        sku: null,
      },
    ],
    specifications: [],
    rating: 0,
    review_count: 0,
    created_at: '2024-10-17 07:57:40',
    updated_at: '2025-03-01 10:33:55',
  });

  const bottomSheetRef = useRef(null);

  const openBottomSheet = () => {
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

  const [page, setPage] = useState(0);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Layout>
        <SecondaryHeader title="" />
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topView}>
            <LinearGradient
              colors={['#d9cbe6', '#d1b8d9']}
              style={styles.glossy}
            />
            <LinearGradient
              colors={['#c1d3fe', '#abc4ff']}
              style={[styles.glossy2]}
            />
            <ScrollView
              horizontal
              pagingEnabled
              scrollEventThrottle={16}
              onScroll={event => {
                const page = Math.round(
                  event.nativeEvent.contentOffset.x /
                    event.nativeEvent.layoutMeasurement.width,
                );
                console.log(page);
                setPage(page);
              }}
              showsHorizontalScrollIndicator={false}
            >
              {product.gallery.map((item, index) => (
                <View style={styles.imageContainer} key={index + 'image'}>
                  <Image style={styles.image} source={item} />
                </View>
              ))}
            </ScrollView>
            <ScrollView
              contentContainerStyle={{
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 10,
              }}
            >
              {product.gallery.map((_, index) => (
                <View
                  key={index + 'dot'}
                  style={[
                    styles.dot,
                    index === page && {
                      backgroundColor: colors.primary,
                      width: 20,
                    },
                  ]}
                />
              ))}
            </ScrollView>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.categoryText}>{product.category}</Text>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.description}>
              {'Fresh fruits offer vibrant colors, juicy textures, and naturally sweet flavors. They provide essential vitamins, antioxidants, hydration, and fiber. Enjoy apples, berries, mangoes, oranges, pineapples, kiwis, melons, peaches, nectarines, plums, pomegranates, guavas, figs, and watermelon for a delicious, healthy boost supporting immunity and digestion.'.slice(
                0,
                200,
              )}
            </Text>
          </View>
          <ReletedProduct />
        </ScrollView>
        <View style={styles.bottomContainer}>
          <View style={styles.priceContainer}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Text style={styles.priceText}>₹{product.sizes[0].price}</Text>
              <Text style={styles.originalPriceText}>
                ₹{product.sizes[0].original_price}
              </Text>
            </View>
            <Text style={styles.weightText}>{product.sizes[0].label}</Text>
          </View>
          {product.sizes.length > 1 ? (
            <TouchableOpacity
              style={styles.addToCartBtnFull}
              onPress={openBottomSheet}
            >
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
          ) : (
            <View
              style={[
                styles.addToCartBtn,
                {
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                  gap: 5,
                },
              ]}
            >
              <TouchableOpacity
                style={styles.btnContainer}
                onPress={() => {
                  console.log(product);
                  removeFromCart({
                    item: {
                      id: product.id,
                      size: product.sizes[0].label,
                    },
                  });
                }}
              >
                <Entypo name="minus" size={21} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>
                {getQuiantity({
                  item: { id: product.id, size: product.sizes[0].label },
                })}
              </Text>
              <TouchableOpacity
                style={styles.btnContainer}
                onPress={() => {
                  addToCart({
                    cart: {
                      id: product.id,
                      size: product.sizes[0].label,
                    },
                  });
                }}
              >
                <Entypo name="plus" size={21} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </View>
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
            data={product.sizes || []}
            keyExtractor={(_, index) => 'size-' + index}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
            renderItem={({ item }, index) => (
              <CartAdd
                product={{
                  id: product.id,
                  name: product.name,
                  image: product.image,
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
    gap: 20,
    paddingBottom: 100,
  },
  topView: {
    width: '100%',
    height: 300,
  },
  imageContainer: {
    width: width - 20,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  dot: {
    width: 7.5,
    height: 7.5,
    borderRadius: 5,
    backgroundColor: '#00000050',
  },
  glossy: {
    position: 'absolute',
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.4,
    bottom: 0,
    left: 0,
    opacity: 0.3,
  },
  glossy2: {
    position: 'absolute',
    width: width * 0.45,
    height: width * 0.45,
    borderRadius: width * 0.45,
    top: 0,
    right: 0,
    opacity: 0.3,
  },
  categoryText: {
    fontSize: 22,
    fontFamily: fonts.semiBold,
    color: colors.primary,
  },
  productName: {
    fontSize: 20,
    fontFamily: fonts.semiBold,
    marginTop: -5,
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
  description: {
    fontSize: 13,
    fontFamily: fonts.regular,
    marginTop: 10,
  },
  bottomContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - 20,
    alignItems: 'center',
    paddingHorizontal: 20,
    bottom: 5,
    left: 10,
    zIndex: 1000,
  },
  priceContainer: {},
  priceText: {
    fontSize: 22,
    fontFamily: fonts.semiBold,
  },
  originalPriceText: {
    fontSize: 16,
    fontFamily: fonts.regular,
    textDecorationLine: 'line-through',
    color: '#ff000080',
  },
  weightText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: '#00000080',
    marginTop: -10,
  },
  addToCartBtnFull: {
    width: 150,
    height: 45,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  addToCartBtn: {
    backgroundColor: colors.primary,
    width: '50%',
    height: 35,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: 'red',
  },
  btnContainer: {
    width: 40,
    height: '100%',
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    marginHorizontal: 10,
  },
  addToCartText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.inputBackground,
  },
});

export default ProductDetails;
