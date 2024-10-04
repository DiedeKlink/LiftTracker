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
import { Exercise } from "../lib/types";
import { useRef } from "react";

import ModalComponent, { ModalRef } from "./ModalAddSet";

const flatlistHeight = Dimensions.get("window").height - 350;

export default function ExerciseContainer({ data }: { data: Exercise[] }) {
  const { removeExercise } = useWorkoutContext();

  const modalRef = useRef<ModalRef>(null);

  const handleOpenModal = (id: string) => {
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
            <View style={styles.exerciseNameWrapper}>
              <Text style={styles.exerciseText}>{`${item.name}: `}</Text>
            </View>
            <View style={styles.setRow}>
              <FlatList
                data={item.sets}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Text>
                    {item.weight}kg x {item.reps}
                  </Text>
                )}
              />
            </View>
            <Button
              backgroundColor="#f0f0f0"
              onPress={() => handleOpenModal(item.id)}
              fontSize={16}
              color="#333"
            >
              <Icon name="plus" size={15} color="#333" />
            </Button>
            <Button
              style={{ marginLeft: 10 }}
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
    paddingHorizontal: 12,
  },
  exerciseRow: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    //width: '50%'
    // maxHeight: 100,
    overflow: "scroll",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,

    alignItems: "center",
  },
  exerciseNameWrapper: {
    //height: "100%",
    //justifyContent: "center",
  },
  exerciseText: {
    fontSize: 16,

    maxWidth: 150,
    minWidth: 150,
  },
  setRow: {
    ///  flexDirection: "row",
    flex: 1,
    // flexWrap: "wrap",
  },
});
