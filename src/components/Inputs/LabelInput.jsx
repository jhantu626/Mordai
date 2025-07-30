import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { fonts } from '../../utils/fonts';
import { colors } from '../../utils/colors';

const LabelInput = ({
  label = 'Enter Label',
  value,
  setValue,
  error = '',
  minLength = 0,
  maxLenth = 100,
  keyboardType = 'default',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={text => {
            if (text.length >= minLength) {
              setValue(text);
            }
          }}
          style={styles.input}
          selectionColor={colors.primary}
          maxLength={maxLenth}
          keyboardType={keyboardType}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 5,
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
    fontSize: 11.5,
    fontFamily: fonts.regular,
    marginLeft: 5,
    color: '#00000095',
    letterSpacing: 0.5,
  },
  errorText: {
    fontSize: 11.5,
    fontFamily: fonts.regular,
    marginLeft: 5,
    color: 'red',
    letterSpacing: 0.5,
  },
});

export default LabelInput;
