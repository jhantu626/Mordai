import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React from 'react';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';

const { width } = Dimensions.get('window');

const CARD_CONTAINER_WIDTH = width / 4 - 11;
const CARD_IMAGE_SIZE = CARD_CONTAINER_WIDTH * 0.95;

const CategoryCard = ({ category }) => {
  return (
    <TouchableOpacity
      key={category.id + 'innercategory'}
      style={styles.container}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: category.image }}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_CONTAINER_WIDTH,
    height: CARD_CONTAINER_WIDTH + 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4, // Reduced from 5 for better spacing
    marginVertical: 5, // Reduced from 15 for compact layout
  },
  imageContainer: {
    width: CARD_IMAGE_SIZE,
    height: CARD_IMAGE_SIZE,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  text: {
    textAlign: 'center',
    marginTop: 6,
    fontSize: width < 400 ? 10 : 12,
    fontFamily: fonts.medium,
    color: colors.textPrimary,
    lineHeight: 14,
    width: '100%',
  },
});

export default CategoryCard;
