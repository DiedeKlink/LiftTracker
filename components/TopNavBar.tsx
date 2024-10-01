import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

import Icon from "react-native-vector-icons/FontAwesome";

import { format } from "date-fns";
import { useWorkoutContext } from "../lib/hooks";

export default function TopNavBar({ navigation }) {
  const { date, handleSetDate } = useWorkoutContext();

  const dateValue = format(new Date(date), "dd-MM-yyyy");

  return (
    <View style={styles.container}>
      <View style={styles.rowItem}>
        <Pressable
          style={styles.topBarBtn}
          onPress={() => handleSetDate("minusDay")}
        >
          <Text style={styles.topBarBtnTxt}>
            <Icon name="chevron-left" size={30} color="#333" />
          </Text>
        </Pressable>
      </View>
      <View style={[styles.rowItem, styles.flexRow]}>
        <Pressable
          style={styles.topBarBtn}
          onPress={() => handleSetDate("today")}
        >
          <Text style={styles.topBarBtnTxt}>{dateValue} </Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Calendar")}>
          <Icon name="calendar" size={30} color="#333" />
        </Pressable>
      </View>
      <View style={styles.rowItem}>
        <Pressable
          style={styles.topBarBtn}
          onPress={() => handleSetDate("plusDay")}
        >
          <Text style={styles.topBarBtnTxt}>
            <Icon name="chevron-right" size={30} color="#333" />
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    //flex: 1,
    //flexGrow: 0
    alignItems: "center",
    borderBottomColor: "#777",
    borderBottomWidth: 1,
  },
  rowItem: {
    flexGrow: 1,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  topBarBtnTxt: {
    textAlign: "center",
    fontSize: 18,
  },
  topBarBtn: {
    //   backgroundColor: 'pink',
    paddingVertical: 10,
  },
});
