import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { fonts } from './utils/fonts'

const App = () => {
  return (
    <View>
      <Text style={{
        fontFamily: fonts.bold,
        fontSize: 25
      }}>App</Text>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})