import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import { useWorkoutContext } from "../lib/hooks";

const data = [
  { label: "Push", value: "Push" },
  { label: "Pull", value: "Pull" },
  { label: "Legs", value: "Legs" },
  { label: "Chest", value: "Chest" },
  { label: "Back", value: "Back" },
  { label: "Arms", value: "Arms" },
  { label: "Other", value: "Other" },
];

const SplitSelectorDropdown = () => {
  //const [value, setValue] = useState<string | null>("Push");

  const { split, addSplit } = useWorkoutContext();
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (split || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Select Split
        </Text>
      );
    }
    return null;
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "Select Split" : "..."}
          searchPlaceholder="Search..."
          value={split}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            addSplit(item.value);
            setIsFocus(false);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SplitSelectorDropdown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingVertical: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
