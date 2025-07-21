import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { fonts } from '../../utils/fonts';

const ReletedProduct = () => {
  return (
    <View>
      <Text style={{ fontSize: 14, fontFamily: fonts.medium }}>
        Releted Product
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10, marginTop: 10 }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
          <View style={styles.parentCard} key={index + 'related-product'}>
            <LinearGradient colors={['#d9cbe6', '#d1b8d9']} style={styles.card}>
              <TouchableOpacity
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  style={styles.image}
                  source={require('./../../../assets/images/product1.png')}
                />
              </TouchableOpacity>
            </LinearGradient>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 12,
                fontFamily: fonts.medium,
              }}
              numberOfLines={2}
            >
              Product 1
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  parentCard: {
    width: 70,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
  },
  card: {
    width: '100%',
    height: '80%',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default ReletedProduct;
