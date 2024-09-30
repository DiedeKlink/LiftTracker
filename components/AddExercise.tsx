import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import uuid from "react-native-uuid";
import popularExercises from "../data/popularExercises";
import Button from "./Button";
import { useWorkoutContext } from "../lib/hooks";
import { Workout } from "../lib/types";

type Exercise = {
  id: string | number[];
  name: string;
  weight: number;
  reps: number;
};

type ExerciseProps = Exercise[];

export default function AddExercise() {
  const [exerciseName, setExerciseName] = useState<string>("");
  const [weight, setWeight] = useState<number | null>(null);
  const [reps, setReps] = useState<number | null>(null);

  const [filteredExercises, setFilteredExercises] = useState<string[]>([]);

  const { date, workouts, setWorkouts, split } = useWorkoutContext();

  const addNewExercise = () => {
    if (exerciseName === "" || weight === null || reps === null) {
      alert("Fill in all fields");
      return false;
    }
    //const newExercise = `${exerciseName} ${weight}kg for ${reps} reps`
    const newExercise = {
      id: uuid.v4(),
      name: exerciseName,
      weight: weight,
      reps: reps,
    };

    const newWorkout = {
      [date]: {
        split: split,
        exercises: [newExercise],
      },
    };

    setWorkouts((prev: Record<string, Workout>) => {
      if (prev[date]) {
        return {
          ...prev,
          [date]: {
            ...prev[date],
            exercises: [...prev[date].exercises, newExercise],
          },
        };
      } else {
        return {
          ...prev,
          ...newWorkout,
        };
      }
    });

    setExerciseName("");
    setWeight(null);
    setReps(null);
    setFilteredExercises([]);
  };

  const removeExercise = (exerciseId: string) => {
    const updatedExercises = workouts[date].exercises.filter(
      (exercise: Exercise) => exercise.id !== exerciseId
    );

    setWorkouts((prev: Record<string, Workout>) => {
      return {
        ...prev,
        [date]: {
          ...prev[date],
          exercises: updatedExercises,
        },
      };
    });
  };

  const selectExercise = (exercise: string) => {
    setExerciseName(exercise);
    setFilteredExercises([]);
  };

  const handleExerciseNameChange = (text: string) => {
    setExerciseName(text);
    if (text) {
      setFilteredExercises(
        popularExercises.filter((exercise) =>
          exercise.toLowerCase().includes(text.toLowerCase())
        )
      );
    } else {
      setFilteredExercises([]);
    }
  };

  return (
    <>
      <View>
        <FlatList
          data={workouts[date]?.exercises}
          renderItem={({ item }: { item: Exercise }) => (
            <View style={styles.exerciseRow}>
              <Text>{`${item.name} ${item.weight}kg for ${item.reps} reps`}</Text>
              <Button
                backgroundColor="#f0f0f0"
                onPress={() => removeExercise(item.id as string)}
                fontSize={16}
                color="#333"
                btnText="Remove"
              />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          keyboardShouldPersistTaps="handled"
        />
      </View>
      <TextInput
        style={styles.inputStyle}
        onChangeText={handleExerciseNameChange}
        value={exerciseName}
        placeholder="Exercise Name"
      />

      {filteredExercises.length > 0 && (
        <View style={styles.autocompleteContainer}>
          <View style={styles.dropdown}>
            <View>
              {filteredExercises.map((exercise, index) => (
                <Pressable key={index} onPress={() => selectExercise(exercise)}>
                  <Text style={styles.dropdownItem}>{exercise}</Text>
                </Pressable>
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
        />
        <TextInput
          style={[styles.inputStyle, styles.inputRowStyle, styles.marginLeft]}
          placeholder="Reps"
          keyboardType="numeric"
          onChangeText={(text) => setReps(text ? parseInt(text) : null)}
          value={reps ? reps.toString() : ""}
        />
      </View>

      <Button
        backgroundColor="#32a852"
        onPress={addNewExercise}
        fontSize={16}
        color="#fff"
        btnText="Add Exercise"
      />
    </>
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
  btnStyle: {
    backgroundColor: "#32a852",
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 8,
    paddingHorizontal: 5,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
  },
  inputRowStyle: {
    flex: 1,
    flexGrow: 1,
  },
  marginLeft: {
    marginLeft: 12,
  },
  exerciseRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    //width: '50%'
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
  },
  autocompleteContainer: {
    position: "relative",
    width: "100%",
    top: 0,
    borderRadius: 8,
  },
});
