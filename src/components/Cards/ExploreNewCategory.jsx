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
import React, { useEffect, useState } from 'react';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { fonts } from '../../utils/fonts';
import { colors } from '../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { categoryService } from '../../services/CategoryService';
import CategoryCardShimmer from '../Shimmers/CategoryCardShimmer';
import CategoryShimmer from '../Shimmers/CategoryShimmer';

const { width } = Dimensions.get('window');

const ExploreNewCategory = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const data = await categoryService.getCategories();
      console.log('categoris', data);
      setCategories(data.success ? data?.category : []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerText}>
        <Text style={styles.titleText}>Explore </Text>
        <Text style={[styles.titleText, { color: colors.primary }]}>
          New Category{' '}
        </Text>
        <Text style={styles.titleText}>{'\u{1F929}'}</Text>
      </View>
      <Text style={styles.nextTitle}>Grab New Arrivals Fast</Text>
      <View style={styles.categoryContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10, marginTop: 10 }}
          data={isLoading ? [1, 2, 3, 4] : categories}
          keyExtractor={(_, index) => 'category-item-' + index}
          scrollEnabled={!isLoading}
          renderItem={({ item, index }) =>
            isLoading ? (
              <CategoryCardShimmer />
            ) : (
              <View key={index + 'category-item'}>
                <LinearGradient
                  colors={['#d9cbe6', '#d1b8d9']}
                  //   colors={['#90EE90', '#73C973']}
                  style={styles.imageCOntainer}
                >
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      style={styles.categoryImage}
                      source={{ uri: item.image }}
                    />
                  </TouchableOpacity>
                </LinearGradient>
                <Text style={styles.text} numberOfLines={2}>
                  {item.name}
                </Text>
              </View>
            )
          }
        />
      </View>
    </View>
  );
};

export default ExploreNewCategory;

const styles = StyleSheet.create({
  container: {
    marginVertical: 25,
  },
  headerText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontFamily: fonts.bold,
  },
  nextTitle: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: '#00000050',
    marginTop: -5,
  },
  imageCOntainer: {
    width: width / 3 - 50,
    height: width / 3 - 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  categoryImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  text: {
    fontSize: 12,
    fontFamily: fonts.semiBold,
    textAlign: 'center',
    marginTop: 5,
    width: width / 3 - 50,
  },
});
