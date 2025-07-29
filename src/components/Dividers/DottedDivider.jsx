import { StyleSheet, View } from 'react-native';
import React from 'react';

const DottedDivider = ({borderWidth=2}) => {
  return <View style={[styles.divider,{
    borderBottomWidth: borderWidth
  }]} />;
};

const styles = StyleSheet.create({
  divider: {
    borderBottomColor: '#D9D9D9',
    borderStyle: 'dashed',
    width: '100%',
    marginVertical: 8,
  },
});

export default DottedDivider;
