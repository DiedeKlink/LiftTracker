import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import Modal from "react-native-modal";
import { useWorkoutContext } from "../lib/hooks";
import Button from "./Button";
import { Exercise } from "../lib/types";

export interface ModalRef {
  openModal: (data: Exercise) => void;
}

const ModalComponent = forwardRef<ModalRef, {}>((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalData, setModalData] = useState<Exercise>();

  const [addSetWeight, setAddSetWeight] = useState<number | null>(null);
  const [addSetReps, setAddSetReps] = useState<number | null>(null);

  const { date, workouts, setWorkouts } = useWorkoutContext();

  const weightRef = useRef<TextInput>(null);

  const openModal = (data: Exercise) => {
    setModalData(data);
    setIsVisible(true);
    // weightRef.current?.focus(); // Remove this line
  };

  const closeModal = () => {
    setIsVisible(false);
  };

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

    setWorkouts((prev) => {
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
      onModalShow={() => weightRef.current?.focus()}
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
              ref={weightRef}
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
