import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';

const DefaultInput = ({
  placeholder,
  height = 50,
  value,
  setValue,
  keyboardType = 'default',
  maxLength = 100,
  minLength = 0,
}) => {
  return (
    <View style={[styles.container, { height: height }]}>
      <TextInput
        value={value}
        onChangeText={text => {
          if (text.length >= minLength) setValue(text);
        }}
        placeholder={placeholder}
        selectionColor={colors.primary}
        style={styles.inputBox}
        keyboardType={keyboardType}
        placeholderTextColor={'#00000050'}
        maxLength={maxLength}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.borderColor,
    backgroundColor: colors.inputBackground,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  inputBox: {
    width: '100%',
    height: '100%',
    fontSize: 16,
    fontFamily: fonts.medium,
  },
});

export default DefaultInput;
