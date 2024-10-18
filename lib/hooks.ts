import { useEffect, useState } from "react";
import { Workout } from "./types";
import { format } from "date-fns";
import { getItem } from "../utils/AsyncStorage";
import { popularExercises } from "../data/popularExercises";

export function useWorkouts() {
  const [date, setDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [split, setSplit] = useState<string | null>("Push");

  const [workouts, setWorkouts] = useState<Record<string, Workout>>({
    [date]: {
      split: split as string,
      exercises: [],
    },
  });

  useEffect(() => {
    getItem("workouts").then((data) => {
      if (data) {
        setWorkouts(JSON.parse(data));
      }
    });
  }, []);

  return {
    date,
    setDate,
    split,
    setSplit,
    workouts,
    setWorkouts,
  };
}

export function useUserExercises() {
  const [userExercises, setUserExercises] = useState<string[]>([]);

  const [filteredExercises, setFilteredExercises] = useState<string[]>([]);
  const totalExercises = [...popularExercises, ...userExercises];

  useEffect(() => {
    getItem("userExercises").then((data) => {
      if (data) {
        setUserExercises(JSON.parse(data));
      }
    });
  }, []);

  const removeUserExercise = (exercise: string) => {
    setUserExercises((prev) => prev.filter((ex) => ex !== exercise));
    setFilteredExercises([]);
  };

  return {
    userExercises,
    setUserExercises,
    filteredExercises,
    setFilteredExercises,
    totalExercises,
    removeUserExercise,
  };
}
