import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import React from 'react';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';

const { width } = Dimensions.get('window');

// Calculate responsive dimensions
const CARD_CONTAINER_WIDTH = width / 4 - 16; // 4 cards per row with padding
const CARD_IMAGE_SIZE = CARD_CONTAINER_WIDTH * 0.8; // 80% of container width

const CategoryCard = ({ category }) => {
  return (
    <TouchableOpacity 
      key={category.id + "innercategory"} 
      style={styles.container}
      activeOpacity={0.7} // Better feedback for users
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={category.image}
          resizeMode="contain"
        />
      </View>
      <Text 
        style={styles.text}
        numberOfLines={2} // Prevent text overflow
        ellipsizeMode="tail"
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_CONTAINER_WIDTH,
    height: CARD_CONTAINER_WIDTH + 24, // Extra space for text
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4, // Reduced from 5 for better spacing
    marginVertical: 0, // Reduced from 15 for compact layout
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
    elevation: 2, // Increased for better visibility on Android
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  text: {
    textAlign: 'center',
    marginTop: 6,
    fontSize: width < 400 ? 10 : 12, // Smaller text on very small devices
    fontFamily: fonts.medium,
    color: colors.textPrimary, // Added for better contrast
    lineHeight: 14, // Better text wrapping
    width: '100%', // Ensure text doesn't overflow card
  },
});

export default CategoryCard;