import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Outward() {
  return (
    <View>
             
    <View style={styles.headerBar}>
    <Text style={styles.headerText}>My Given Loans</Text>
    </View>
   
  </View>
)
}

const styles = StyleSheet.create({
headerBar: {
  backgroundColor: '#FF6B35',
  height: 60,
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: 15,
  borderBottomEndRadius:15,
  borderBottomStartRadius: 15,
},
headerText:{
  color: '#FFFFFF',
  fontSize: 20,
  fontFamily: 'Montserrat-Bold',

}
})