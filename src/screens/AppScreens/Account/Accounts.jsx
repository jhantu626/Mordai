import { ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import Layout from '../../Layout/Layout'
import { ProfileCard } from '../../../components'

const Accounts = () => {
  return (
    <Layout>
      <ScrollView style={{flex: 1}}>
        <ProfileCard/>
      </ScrollView>
    </Layout>
  )
}

export default Accounts

const styles = StyleSheet.create({})