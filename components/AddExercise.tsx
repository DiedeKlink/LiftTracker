import React from "react";
import ExerciseContainer from "./ExerciseContainer";
import { useWorkoutContext } from "../context/WorkoutContext";
import ExerciseForm from "./ExerciseForm";

export default function AddExercise() {
  const { formattedExercises } = useWorkoutContext();

  return (
    <>
      <ExerciseContainer data={formattedExercises} />
      <ExerciseForm />
    </>
  );
}
