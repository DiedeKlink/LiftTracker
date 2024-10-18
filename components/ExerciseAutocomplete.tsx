import { View, Text, StyleSheet, Pressable } from "react-native";
import { useWorkoutContext } from "../context/WorkoutContext";
import Icon from "react-native-vector-icons/Feather";

export default function ExerciseAutocomplete() {
  const {
    selectExercise,
    userExercises,
    removeUserExercise,
    filteredExercises,
  } = useWorkoutContext();
  return (
    <>
      {filteredExercises.length > 0 && (
        <View style={styles.autocompleteContainer}>
          <View style={styles.dropdown}>
            <View style={styles.filteredExercisesContainer}>
              {filteredExercises.map((exercise, index) => (
                <View key={index} style={styles.filteredExercise}>
                  <Pressable
                    style={styles.dropdownItem}
                    onPress={() => selectExercise(exercise)}
                  >
                    <Text>{exercise}</Text>
                  </Pressable>
                  {userExercises.includes(exercise) && (
                    <Pressable
                      onPress={() => removeUserExercise(exercise)}
                      style={styles.filteredExerciseRmvBtn}
                    >
                      <Icon name="x" size={15} color="#333" />
                    </Pressable>
                  )}
                </View>
              ))}
            </View>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  filteredExerciseRmvBtn: {
    paddingVertical: 5,
    borderRadius: 8,
    paddingHorizontal: 5,
    backgroundColor: "#f0f0f0",
    fontSize: 16,
    color: "#333",
    marginRight: 5,
    maxHeight: 30,
    marginTop: 5,
  },
  filteredExercise: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
    backgroundColor: "#fff",
  },
  filteredExercisesContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  marginLeft: {
    marginLeft: 12,
  },
  dropdown: {
    position: "absolute",
    width: "100%",
    backgroundColor: "white",
    borderColor: "#ddd",
    borderWidth: 1,
    borderTopWidth: 0,
    maxHeight: 200,
    overflow: "scroll",
    zIndex: 2,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
    flexGrow: 1,
  },
  autocompleteContainer: {
    position: "relative",
    width: "100%",
    top: 0,
    borderRadius: 8,
    zIndex: 1000,
    //backgroundColor: "#fff",
  },
});
