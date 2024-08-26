import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Icon from 'react-native-vector-icons/FontAwesome';

export default function TopNavBar() {
  return (
    <View style={styles.container}>
        <View style={styles.rowItem}>
            <Pressable style={styles.topBarBtn}>
                <Text style={styles.topBarBtnTxt}><Icon name="chevron-left" size={30} color="#333" /></Text>
            </Pressable>
        </View>
        <View style={styles.rowItem}>

            <Pressable style={styles.topBarBtn}>
                <Text style={styles.topBarBtnTxt}>Today</Text>
            </Pressable>
        </View>
        <View style={styles.rowItem}>

            <Pressable style={styles.topBarBtn}>
            <Text style={styles.topBarBtnTxt}><Icon name="chevron-right" size={30} color="#333" /></Text>

            </Pressable>
        </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        //flex: 1,
        //flexGrow: 0
        alignItems: 'center',
       borderBottomColor: '#777',
       borderBottomWidth: 1
    },
    rowItem: {
        flexGrow: 1,
    },
    topBarBtnTxt: {
        textAlign: 'center',
        fontSize: 18
    },
    topBarBtn: {
     //   backgroundColor: 'pink',
        paddingVertical: 10
    }
})