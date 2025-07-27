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

const ReletedProduct = ({ products, setProductId, productId }) => {
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
        {products.map(
          (item, index) =>
            item.id !== productId && (
              <View style={styles.parentCard} key={index + 'related-product'}>
                <LinearGradient
                  colors={['#d9cbe6', '#d1b8d9']}
                  style={styles.card}
                >
                  <TouchableOpacity
                    onPress={() => setProductId(item.id)}
                    style={{
                      width: '100%',
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Image style={styles.image} source={{ uri: item.image }} />
                  </TouchableOpacity>
                </LinearGradient>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 10,
                    fontFamily: fonts.medium,
                  }}
                  numberOfLines={2}
                >
                  {item?.name}
                </Text>
              </View>
            ),
        )}
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
    height: '70%',
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
