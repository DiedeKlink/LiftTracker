import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import Button from "./Button";
import { useWorkoutContext } from "../lib/hooks";
import Icon from "react-native-vector-icons/Feather";
import ExerciseContainer from "./ExerciseContainer";

export default function AddExercise() {
  const {
    formattedExercises,
    handleExerciseNameChange,
    exerciseName,
    filteredExercises,
    selectExercise,
    userExercises,
    removeUserExercise,
    weight,
    setWeight,
    reps,
    setReps,
    addNewExercise,
  } = useWorkoutContext();

  return (
    <>
      <ExerciseContainer data={formattedExercises} />
      <View style={styles.fixedInputGroup}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={handleExerciseNameChange}
          value={exerciseName}
          placeholder="Exercise Name"
          maxLength={50}
        />

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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
});
