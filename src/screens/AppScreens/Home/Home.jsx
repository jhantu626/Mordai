import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Layout from '../../Layout/Layout';
import { BannerCard, PrimaryHeader, SearchInput } from '../../../components';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

const categories = ['All', 'Fruits', 'Vegetables', 'Juice', 'Dairy', 'Bakery'];

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
  return (
    <Layout>
      <PrimaryHeader />
      <View style={{ marginTop: 20, gap: 20 }}>
        <SearchInput />
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {banners.map((banner, index) => {
            console.log('banner', banner);
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
          {categories.map((category, index) => {
            return (
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
            );
          })}
        </ScrollView>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  categoryCont: {
    backgroundColor: colors.inputBackground,
    marginHorizontal: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
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
});

export default Home;
