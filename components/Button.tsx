import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

type ButtonProps = {
  backgroundColor: string;
  fontSize: number;
  color: string;
  onPress: () => void;
  children: React.ReactNode;
  style?: any;
};

export default function Button({
  backgroundColor,
  fontSize,
  color,
  onPress,
  children,
  style,
}: ButtonProps) {
  return (
    <Pressable
      style={[styles.btnStyle, { backgroundColor: backgroundColor }, style]}
      onPress={onPress}
    >
      <Text style={[styles.btnText, { color: color, fontSize: fontSize }]}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btnStyle: {
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 8,
    paddingHorizontal: 5,
  },
  btnText: {
    textAlign: "center",
    fontWeight: "600",
  },
});
