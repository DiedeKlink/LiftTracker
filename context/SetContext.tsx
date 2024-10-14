import React, { createContext, ReactNode, useContext, useState } from "react";
import { useWorkoutContext } from "./WorkoutContext";
import { useModalContext } from "./ModalContext";

type SetContextProps = {
  addNewSet: (exerciseId: string) => void;
  addSetWeight: number | null;
  setAddSetWeight: React.Dispatch<React.SetStateAction<number | null>>;
  addSetReps: number | null;
  setAddSetReps: React.Dispatch<React.SetStateAction<number | null>>;
};
export const SetContext = createContext<SetContextProps | undefined>(undefined);

export const SetProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [addSetWeight, setAddSetWeight] = useState<number | null>(null);
  const [addSetReps, setAddSetReps] = useState<number | null>(null);

  const { date, workouts, setWorkouts } = useWorkoutContext();
  const { closeModal } = useModalContext();

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
    <SetContext.Provider
      value={{
        addNewSet,
        addSetWeight,
        setAddSetWeight,
        addSetReps,
        setAddSetReps,
      }}
    >
      {children}
    </SetContext.Provider>
  );
};

export const useSetContext = () => {
  const context = useContext(SetContext);
  if (!context) {
    throw new Error("useSetContext must be used within an SetProvider");
  }
  return context;
};
