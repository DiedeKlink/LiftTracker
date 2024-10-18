import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import { useWorkoutContext } from "../context/WorkoutContext";
import Button from "./Button";
import ExerciseAutocomplete from "./ExerciseAutocomplete";

export default function ExerciseForm() {
  const {
    handleExerciseNameChange,
    exerciseName,
    weight,
    setWeight,
    reps,
    setReps,
    addNewExercise,
    setFilteredExercises,
  } = useWorkoutContext();

  return (
    <View style={styles.fixedInputGroup}>
      <TextInput
        style={styles.inputStyle}
        onChangeText={handleExerciseNameChange}
        value={exerciseName}
        placeholder="Exercise Name"
        maxLength={50}
        onBlur={() => setFilteredExercises([])}
      />

      <ExerciseAutocomplete />

      <View style={styles.row}>
        <TextInput
          style={[styles.inputStyle, styles.inputRowStyle]}
          placeholder="Weight"
          keyboardType="numeric"
          onChangeText={(text) => setWeight(text ? parseFloat(text) : null)}
          value={weight ? weight.toString() : ""}
          maxLength={4}
        />
        <TextInput
          style={[styles.inputStyle, styles.inputRowStyle, styles.marginLeft]}
          placeholder="Reps"
          keyboardType="numeric"
          onChangeText={(text) => setReps(text ? parseInt(text) : null)}
          value={reps ? reps.toString() : ""}
          maxLength={3}
        />
      </View>

      <Button
        backgroundColor="#32a852"
        onPress={addNewExercise}
        fontSize={16}
        color="#fff"
      >
        Add Exercise
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 10,
  },

  row: {
    flexDirection: "row",
  },
  inputRowStyle: {
    flex: 1,
    flexGrow: 1,
  },
  fixedInputGroup: {
    position: "absolute",
    width: "100%",
    backgroundColor: "#fff",
    bottom: 0,

    left: 12,
    right: 0,

    justifyContent: "center",
  },
  marginLeft: {
    marginLeft: 12,
  },
});
