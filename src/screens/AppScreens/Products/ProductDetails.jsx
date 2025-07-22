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
import React, { useCallback, useMemo, useRef, useState } from 'react';
import Layout from '../../Layout/Layout';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  CartAdd,
  ProductDetailsShimmer,
  ReletedProduct,
  SecondaryHeader,
} from '../../../components';
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
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { productService } from '../../../services/ProductService';

const { width } = Dimensions.get('window');

const ProductDetails = () => {
  const route = useRoute();
  const { id } = route.params;

  const snapPoints = useMemo(() => ['20%'], []);

  // Context
  const { addToCart, removeFromCart, getQuiantity, isCartPresent } =
    useCartContext();

  const [product, setProduct] = useState({ gallery: [], sizes: [] });
  const [page, setPage] = useState(0);

  const bottomSheetRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);

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

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const data = await productService.getProductById({ id: id });
      if (data?.success) {
        setProduct(data?.product);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProduct();
    }, []),
  );

  return isLoading ? (
    <ProductDetailsShimmer />
  ) : (
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
                setPage(page);
              }}
              showsHorizontalScrollIndicator={false}
            >
              {product.gallery.map((item, index) => (
                <View style={styles.imageContainer} key={index + 'image'}>
                  <Image style={styles.image} source={{ uri: item }} />
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
              {product.description.slice(0, 200)}
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
        snapPoints={snapPoints}
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
    backgroundColor: '#ffffff50',
    justifyContent: 'space-between',
    width: width,
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    bottom: 0,
    left: 0,
    zIndex: 1000,
    backdropFilter: 'blur(10px)',
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
