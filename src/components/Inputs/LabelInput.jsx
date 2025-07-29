import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { fonts } from '../../utils/fonts';
import { colors } from '../../utils/colors';

const LabelInput = ({label="Enter Label"}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} selectionColor={colors.primary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 5
  },
  inputContainer: {
    width: '100%',
    height: 45,
    backgroundColor: '#F8FDF8',
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  input: {
    width: '100%',
    height: '100%',
    fontSize: 13,
    fontFamily: fonts.regular,
  },
  label: {
    fontSize: 10,
    fontFamily: fonts.regular,
    marginLeft: 5
  },
});

export default LabelInput;
