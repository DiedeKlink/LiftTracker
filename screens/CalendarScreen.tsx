import { FlatList, StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { useWorkoutContext } from "../lib/hooks";
import { format } from "date-fns";
import Button from "../components/Button";
import { RootStackParamList } from "../App";

import type { StackScreenProps } from "@react-navigation/stack";
import { useMemo } from "react";

type Props = StackScreenProps<RootStackParamList, "Calendar">;

export default function CalendarScreen({ navigation }: Props) {
  const { setDate, workouts } = useWorkoutContext();

  const filteredWorkoutDates = useMemo(() => {
    return Object.keys(workouts)
      .filter((date) => workouts[date].exercises.length > 0)
      .map((date) => ({
        dateString: date,
        split: workouts[date].split,
      }))
      .sort(
        (a, b) =>
          new Date(b.dateString).getTime() - new Date(a.dateString).getTime()
      );
  }, [workouts]);

  const markedDates = useMemo(() => {
    return Object.keys(workouts).reduce<Record<string, { marked: boolean }>>(
      (acc, curr) => {
        if (workouts[curr].exercises.length === 0) {
          return acc;
        }
        acc[curr] = { marked: true };
        return acc;
      },
      {}
    );
  }, [workouts]);

  const handleBtnPress = (day: string) => {
    setDate(day);
    navigation.navigate("Workouts");
  };

  const handleDayPress = (day: { dateString: string }) => {
    setDate(day.dateString);
    navigation.navigate("Workouts");
  };

  return (
    <View style={styles.container}>
      <Calendar
        markedDates={markedDates}
        style={styles.calendar}
        onDayPress={handleDayPress}
      />
      <FlatList
        data={filteredWorkoutDates}
        renderItem={({ item }) => (
          <View style={styles.dayContainer}>
            <Text style={styles.dayText}>
              {" "}
              {item.dateString === format(new Date(), "yyyy-MM-dd")
                ? "Today"
                : item.dateString ===
                  format(new Date(Date.now() - 86400000), "yyyy-MM-dd")
                ? "Yesterday"
                : format(new Date(item.dateString), "EE, dd MMM")}
              {/* {format(new Date(item.dateString), "dd-MM-yyyy")} */}
            </Text>
            <Text style={styles.splitText}>Split: {item.split}</Text>
            <Button
              backgroundColor="#f0f0f0"
              fontSize={16}
              color="#333"
              onPress={() => handleBtnPress(item.dateString)}
            >
              View Workout
            </Button>
          </View>
        )}
        keyExtractor={(item) => item.dateString}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  calendar: {
    marginBottom: 20,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  dayContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    paddingBottom: 10,
    justifyContent: "space-between",
  },
  dayText: {
    fontSize: 16,
    marginRight: 10,
    minWidth: 100,
  },
  splitText: {
    fontSize: 16,

    marginRight: 10,
    fontWeight: "600",
  },
});
