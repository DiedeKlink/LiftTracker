import { FlatList, StyleSheet, Text, View } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { useWorkoutContext } from "../lib/hooks";
import { format } from "date-fns";
import Button from "../components/Button";

export default function CalendarScreen({ navigation }) {
  const { setDate, workouts } = useWorkoutContext();

  const filteredWorkoutDates = Object.keys(workouts)
    .filter((date) => workouts[date].exercises.length > 0)
    .map((date) => ({
      dateString: date,
      split: workouts[date].split,
    }));
  const workoutDates = filteredWorkoutDates;

  console.log(workoutDates);

  const markedDates = Object.keys(workouts).reduce((acc, curr) => {
    if (workouts[curr].exercises.length === 0) {
      return acc;
    }
    acc[curr] = { marked: true };
    return acc;
  }, {});

  const handleDayPress = (day) => {
    setDate(day);
    navigation.navigate("Workouts");
  };

  return (
    <View style={styles.container}>
      <Calendar markedDates={markedDates} style={styles.calendar} />
      <FlatList
        data={workoutDates}
        renderItem={({ item }) => (
          <View style={styles.dayContainer}>
            <Text style={styles.dayText}>
              {" "}
              {format(new Date(item.dateString), "dd-MM-yyyy")}
            </Text>
            <Text style={styles.splitText}>Split: {item.split}</Text>
            <Button
              backgroundColor="#f0f0f0"
              fontSize={16}
              color="#333"
              btnText="View Workout"
              onPress={() => handleDayPress(item.dateString)}
            />
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
  },
  dayText: {
    fontSize: 16,
    marginRight: 10,
  },
  splitText: {
    fontSize: 16,

    marginRight: 10,
    fontWeight: "600",
  },
});
