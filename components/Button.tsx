import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type ButtonProps = {
    backgroundColor: string;
    fontSize: number;
    color: string;
    onPress: Function;
    btnText: string
}

export default function Button({ backgroundColor, fontSize, color, onPress, btnText }: ButtonProps) {
    return (
        <Pressable style={[styles.btnStyle, {backgroundColor: backgroundColor}]}
            onPress={onPress}>
            <Text style={[styles.btnText, {color: color, fontSize: fontSize}]}>{btnText}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    btnStyle: {
        paddingVertical: 10,
        marginVertical: 10,
        borderRadius: 8,
        paddingHorizontal: 5

    },
    btnText: {
        textAlign: 'center',
        fontWeight: '600',
   
    },
})