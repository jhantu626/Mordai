import { StyleSheet, View } from 'react-native';
import React from 'react';

const DottedDivider = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: 2,
    borderBottomColor: '#D9D9D9',
    borderStyle: 'dashed',
    width: '100%',
    marginVertical: 8,
  },
});

export default DottedDivider;
