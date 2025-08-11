import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { fonts } from '../../utils/fonts';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const PopularProducts = ({ products = [] }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Popular Products✨</Text>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={products}
        keyExtractor={(_, index) => index + 'popular-product'}
        renderItem={({ item }, index) => {
          return (
            <View key={index + 'popular-product'} style={styles.innerContainer}>
              <LinearGradient
                colors={['#d9cbe6', '#d1b8d9']}
                style={styles.imageCOntainer}
              >
                <TouchableOpacity
                  style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() =>
                    navigation.navigate('ProductDetails', { id: item.id })
                  }
                >
                  <Image style={styles.image} source={{ uri: item.image }} />
                </TouchableOpacity>
              </LinearGradient>
              <Text style={styles.text} numberOfLines={2}>
                {item.name}
              </Text>
            </View>
          );
        }}

      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 10,
    paddingLeft: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 2,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  titleText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
  },
  imageCOntainer: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '110%',
    height: '110%',
    resizeMode: 'contain',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 2,
  },
  contentContainerStyle: {
    gap: 15,
    marginVertical: 10,
  },
  text: {
    fontSize: 10,
    fontFamily: fonts.regular,
    width: 50,
    textAlign: 'center',
    marginTop: 5,
  },
});

export default PopularProducts;
