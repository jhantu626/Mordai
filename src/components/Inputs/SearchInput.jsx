import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { colors } from '../../utils/colors';
import Octicons from 'react-native-vector-icons/Octicons';
import { fonts } from '../../utils/fonts';

const SearchInput = () => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        style={styles.textInput}
        selectionColor={'#000'}
        multiline={true}
      />
      <TouchableOpacity>
        <Octicons name="search" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 50,
    backgroundColor: colors.inputBackground,
    borderRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: fonts.medium,
    flexWrap: 'wrap',
    height: 'auto',
  },
});

export default SearchInput;
