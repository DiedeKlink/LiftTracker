import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import Modal from "react-native-modal";

import Button from "./Button";

import { useModalContext } from "../context/ModalContext";
import { useSetContext } from "../context/SetContext";

const ModalComponent = forwardRef((props, ref) => {
  const { isVisible, modalData, openModal, closeModal } = useModalContext();
  const {
    addNewSet,
    addSetWeight,
    setAddSetWeight,
    addSetReps,
    setAddSetReps,
  } = useSetContext();

  const weightRef = useRef<TextInput>(null);

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }));

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
