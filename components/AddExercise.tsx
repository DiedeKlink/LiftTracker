import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import uuid from "react-native-uuid";
import { popularExercises } from "../data/popularExercises";
import Button from "./Button";
import { useWorkoutContext } from "../lib/hooks";
import { Exercise } from "../lib/types";
import Icon from "react-native-vector-icons/Feather";
import { getItem, setItem } from "../utils/AsyncStorage";
import ExerciseContainer from "./ExerciseContainer";

export default function AddExercise() {
  const [exerciseName, setExerciseName] = useState<string>("");
  const [weight, setWeight] = useState<number | null>(null);
  const [reps, setReps] = useState<number | null>(null);

  const [filteredExercises, setFilteredExercises] = useState<string[]>([]);

  const [userExercises, setUserExercises] = useState<string[]>([]);

  useEffect(() => {
    getItem("userExercises").then((data) => {
      if (data) {
        setUserExercises(JSON.parse(data));
      }
    });
  }, []);

  const { date, workouts, setWorkouts, split } = useWorkoutContext();

  const totalExercises = [...popularExercises, ...userExercises];

  const addNewExercise = () => {
    if (exerciseName === "" || weight === null || reps === null) {
      alert("Fill in all fields");
      return false;
    }
    //const newExercise = `${exerciseName} ${weight}kg for ${reps} reps`
    const newExercise = {
      id: uuid.v4().toString(),
      name: exerciseName,
      sets: [
        {
          weight: weight,
          reps: reps,
        },
      ],
    };

    const newWorkout = {
      [date]: {
        split: split || "",
        exercises: [newExercise],
      },
    };

    setWorkouts((prev) => {
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

    if (
      !popularExercises.includes(exerciseName) &&
      !userExercises.includes(exerciseName)
    ) {
      setUserExercises((prev) => [...prev, exerciseName]);
    }

    setExerciseName("");
    setWeight(null);
    setReps(null);
    setFilteredExercises([]);
  };

  useEffect(() => {
    setItem("userExercises", JSON.stringify(userExercises));
  }, [workouts]);

  const removeUserExercise = (exercise: string) => {
    setUserExercises((prev) => prev.filter((ex) => ex !== exercise));
    setFilteredExercises([]);
  };

  const selectExercise = (exercise: string) => {
    setExerciseName(exercise);
    setFilteredExercises([]);
  };

  const handleExerciseNameChange = (text: string) => {
    setExerciseName(text);

    if (text) {
      setFilteredExercises(
        totalExercises.filter((exercise) =>
          exercise.toLowerCase().includes(text.toLowerCase())
        )
      );
    } else {
      setFilteredExercises([]);
    }
  };

  const reversedExercises = [...(workouts[date]?.exercises || [])].reverse();

  const formattedExercises: Exercise[] = reversedExercises.map((exercise) => ({
    name: exercise.name,
    sets: exercise.sets,
    id: exercise.id,
  }));

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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    height: "100%",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
