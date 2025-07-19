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
import { useNavigation } from '@react-navigation/native';

const SearchInput = ({ type = 'input', screen }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TextInput
        onPress={() => {
          if (type === 'navigation') {
            navigation.navigate(screen);
          }
        }}
        placeholder="Search"
        style={styles.textInput}
        selectionColor={'#000'}
        // multiline={true}
        placeholderTextColor={'#00000060'}
        enterKeyHint="done"
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
    height: 50,
    backgroundColor: colors.inputBackground,
    borderRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 0.5,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: fonts.medium,
    // flexWrap: 'wrap',
    height: '100%',
  },
});

export default SearchInput;
