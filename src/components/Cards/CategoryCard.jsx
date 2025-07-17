import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';

const CategoryCard = ({category}) => {
  return (
    <TouchableOpacity key={category.id+"innercategory"} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={category.image}
        />
      </View>
      <Text style={styles.text}>{category.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 15
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 0.7,
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  text: {
    textAlign: 'center',
    marginVertical: 2,
    fontSize: 12,
    fontFamily: fonts.medium,
  },
});

export default CategoryCard;
