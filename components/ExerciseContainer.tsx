import {
  View,
  FlatList,
  Alert,
  StyleSheet,
  Dimensions,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import Button from "./Button";
import { useWorkoutContext } from "../lib/hooks";
import { Exercise, Workout } from "../lib/types";
import { useRef } from "react";
import ModalComponent, { ModalRef } from "./ModalAddSet";

const flatlistHeight = Dimensions.get("window").height - 350;

export default function ExerciseContainer({ data }: { data: Exercise[] }) {
  const { date, workouts, setWorkouts } = useWorkoutContext();

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

  const modalRef = useRef<ModalRef>(null);

  const handleOpenModal = (id: string) => {
    // You can pass any data to the `openModal` function.
    const exercise = data.find((exercise) => exercise.id === id);

    if (!exercise) {
      Alert.alert("Error", "Exercise not found");
      return;
    }

    modalRef.current?.openModal(exercise);
  };

  return (
    <View style={styles.exerciseContainer}>
      <FlatList
        data={data || []}
        keyExtractor={(item) => item.id.toString()}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
        renderItem={({ item }: { item: Exercise }) => (
          <View style={styles.exerciseRow}>
            <Text style={styles.exerciseText}>{`${item.name}: `}</Text>

            <FlatList
              data={item.sets}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Text>
                  {item.weight}kg for {item.reps} reps
                </Text>
              )}
            />
            <Button
              backgroundColor="#f0f0f0"
              onPress={() => handleOpenModal(item.id)}
              fontSize={16}
              color="#333"
            >
              <Icon name="plus" size={15} color="#333" />
            </Button>
            <Button
              backgroundColor="#f0f0f0"
              onPress={() => removeExercise(item.id)}
              fontSize={16}
              color="#333"
            >
              <Icon name="x" size={15} color="#333" />
            </Button>
          </View>
        )}
      />
      <ModalComponent ref={modalRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  exerciseContainer: {
    height: flatlistHeight,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 12,
  },
  exerciseRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    //width: '50%'
    maxHeight: 100,
    overflow: "scroll",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  exerciseText: {
    fontSize: 16,
    marginTop: 15,
  },
});
