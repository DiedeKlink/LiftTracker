import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AddExercise from "../components/AddExercise";
import SplitSelectorDropdown from "../components/Dropdown";
import TopNavBar from "../components/TopNavBar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function WorkoutScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.safeContainer, { paddingTop: insets.top }]}>
      <StatusBar />
      <TopNavBar navigation={navigation} />

      <View style={styles.container}>
        <SplitSelectorDropdown />
        <AddExercise />
      </View>
    </SafeAreaView>
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
