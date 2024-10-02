import { forwardRef, useImperativeHandle, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { useWorkoutContext } from "../lib/hooks";
import Button from "./Button";
import { Exercise, Workout } from "../lib/types";

// This is the ref interface that will be exposed to parent.
export interface ModalRef {
  openModal: (data: Exercise) => void;
}

const ModalComponent = forwardRef<ModalRef, {}>((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalData, setModalData] = useState<Exercise>();

  const [addSetWeight, setAddSetWeight] = useState<number | null>(null);
  const [addSetReps, setAddSetReps] = useState<number | null>(null);

  const { date, workouts, setWorkouts } = useWorkoutContext();

  // This function will be callable by the parent component.
  const openModal = (data: Exercise) => {
    setModalData(data); // Use the data passed by parent.
    setIsVisible(true);

    console.log(data);
  };

  // This function will be callable by the parent component.
  const closeModal = () => {
    setIsVisible(false);
  };

  // Expose the `openModal` and `closeModal` functions to parent component.
  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }));

  const addNewSet = (exerciseId: string) => {
    if (!addSetWeight || !addSetReps) {
      alert("Fill in all fields");
      return false;
    }

    const newSet = {
      weight: addSetWeight,
      reps: addSetReps,
    };

    const updatedExercises = workouts[date].exercises.map((exercise) => {
      if (exercise.id === exerciseId) {
        return {
          ...exercise,
          sets: [...exercise.sets, newSet],
        };
      } else {
        return exercise;
      }
    });

    setWorkouts((prev: Record<string, Workout>) => {
      return {
        ...prev,
        [date]: {
          ...prev[date],
          exercises: updatedExercises,
        },
      };
    });

    setAddSetWeight(null);
    setAddSetReps(null);
    closeModal();
  };

  return (
    <Modal
      style={styles.modal}
      isVisible={isVisible}
      onBackdropPress={closeModal}
    >
      {modalData ? (
        <View style={styles.container}>
          <Text style={styles.modalText}>Add set to {modalData.name}</Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.inputStyle, styles.inputRowStyle]}
              placeholder="Weight"
              keyboardType="numeric"
              onChangeText={(text) =>
                setAddSetWeight(text ? parseFloat(text) : null)
              }
              value={addSetWeight ? addSetWeight.toString() : ""}
              maxLength={4}
            />
            <TextInput
              style={[
                styles.inputStyle,
                styles.inputRowStyle,
                styles.marginLeft,
              ]}
              placeholder="Reps"
              keyboardType="numeric"
              onChangeText={(text) =>
                setAddSetReps(text ? parseInt(text) : null)
              }
              value={addSetReps ? addSetReps.toString() : ""}
              maxLength={3}
            />
          </View>
          <View style={styles.row}>
            {/* <Button
              backgroundColor="#f0f0f0"
              onPress={closeModal}
              fontSize={16}
              color="#333"
            >
              Close
            </Button> */}
            <Button
              style={{ width: "100%" }}
              backgroundColor="#32a852"
              onPress={() => addNewSet(modalData.id)}
              fontSize={16}
              color="#fff"
            >
              Add Set
            </Button>
          </View>
        </View>
      ) : (
        <></>
      )}
    </Modal>
  );
});

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    height: "auto",
    width: "90%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 20,
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
  inputStyle: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 10,
  },
  inputRowStyle: {
    flex: 1,
    flexGrow: 1,
  },
  row: {
    flexDirection: "row",
  },
  marginLeft: {
    marginLeft: 12,
  },
});

export default ModalComponent;
