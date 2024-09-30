import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SplitSelectorDropdown from "./components/Dropdown";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AddExercise from "./components/AddExercise";
import TopNavBar from "./components/TopNavBar";

import { createContext, useState } from "react";
import { WorkoutProvider } from "./context/WorkoutContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <WorkoutProvider>
        <SafeAreaView style={styles.safeContainer}>
          <StatusBar />
          <TopNavBar />
          <View style={styles.container}>
            <SplitSelectorDropdown />
            <AddExercise />
          </View>
        </SafeAreaView>
      </WorkoutProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
  },
});
